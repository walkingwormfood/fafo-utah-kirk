/* Anonymous field-report drop box (Cloudflare Pages Function).
 * Receives {inv, req, agency, ref, dated, note} from the site's report form and
 * files it as a GitHub issue labeled "field-report" for human review — nothing
 * appears on the site until it's verified and merged into foia-data.js.
 * Secret: GH_TOKEN — fine-grained PAT, Issues:RW on walkingwormfood/fafo-utah-kirk only.
 */

const REPO = "walkingwormfood/fafo-utah-kirk";

function corsHeaders(request) {
  const o = request.headers.get("origin") || "";
  const ok = o === "https://walkingwormfood.github.io" ||
             o === "http://localhost:5602" ||
             o === "https://fafo-utah-kirk.pages.dev" ||
             o.endsWith(".fafo-utah-kirk.pages.dev");
  return {
    "access-control-allow-origin": ok ? o : "https://fafo-utah-kirk.pages.dev",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type"
  };
}

const resp = (code, obj, cors) =>
  new Response(JSON.stringify(obj), { status: code, headers: { ...cors, "content-type": "application/json" } });

export async function onRequestOptions({ request }) {
  return new Response(null, { headers: corsHeaders(request) });
}

export async function onRequestPost({ request, env }) {
  const cors = corsHeaders(request);
  let b;
  try { b = await request.json(); } catch { return resp(400, { error: "bad json" }, cors); }
  if (b.website) return resp(200, { ok: true }, cors);   // honeypot: bots get a polite lie

  const s = v => (typeof v === "string" ? v.trim() : "");
  const inv = s(b.inv).slice(0, 80), req = s(b.req).slice(0, 160), agency = s(b.agency).slice(0, 100);
  const ref = s(b.ref).slice(0, 80), dated = s(b.dated).slice(0, 60), note = s(b.note).slice(0, 4000);
  if (!ref || !inv) return resp(400, { error: "reference number required" }, cors);

  const title = `Field report: ${agency || "unknown entity"} — ref ${ref}`;
  const body = [
    "Anonymous field report from the site. **Verify before merging into foia-data.js** — reference numbers can be checked against the entity's portal where one exists.",
    "",
    `**Finding:** ${inv}`,
    `**Request:** ${req}`,
    `**Entity:** ${agency}`,
    `**Reference #:** ${ref}`,
    `**Filed:** ${dated || "(not given)"}`,
    note ? `\n**Update / response text:**\n\n${note}` : ""
  ].join("\n");

  const gh = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.GH_TOKEN}`,
      accept: "application/vnd.github+json",
      "user-agent": "fafo-field-report"
    },
    body: JSON.stringify({ title, body, labels: ["field-report"] })
  });
  if (!gh.ok) return resp(502, { error: "drop box unavailable" }, cors);
  return resp(200, { ok: true }, cors);
}
