# FOIA Around, Find Out: Charlie Kirk Edition [Utah State GRAMA]

The Tyler Robinson preliminary hearing (State v. Robinson, Utah Fourth District) put specific documents, videos, and logs on the record — and exposed gaps between sworn testimony and the paperwork. Utah's public-records law, GRAMA (Government Records Access and Management Act, Utah Code § 63G-2), lets anyone request the underlying records. Pick a finding; the site drafts the request.

Sister site to [FOIA Around, Find Out](https://github.com/walkingwormfood/foia-around-find-out) (federal). Same architecture: one `index.html` renderer + one `foia-data.js` data file, client-side only, no tracking, CC0.

## Why a separate site

Federal FAFO already has 52 findings across 20+ agencies — dense enough. State records are a different statute, different deadlines, different appeal paths, and a whole new set of per-entity gotchas. This site covers **Utah state and local entities only**, on **this case only**. Federal hooks (FBI, DOJ) stay on federal FAFO.

## The discipline

- **Narrow by default** — named logs, work orders, retention schedules, reports, with date ranges. Broad requests get denied as overbroad.
- **A denial still counts.** There's a pending capital prosecution; anything evidentiary draws a § 63G-2-305(10)(a) protected-records claim. GRAMA requires the denial to be written, describe what's withheld, and cite the exact provision (§ 63G-2-205(2)) — the withholding itself goes on paper, and it's appealable (§ 63G-2-401: 30 days to the entity's chief administrative officer; then the Government Records Office director or district court — SB 277 (2025) abolished the State Records Committee and replaced it with the GRO).
- **Administrative records are the soft target.** Retention schedules, work orders, severance agreements, deployment logs, and access logs are not investigation records.
- **Keep it about the records.** No contact with witnesses, jurors, or families.

## Data model

`foia-data.js`: `investigations[]` (a credited finding + the narrow requests it motivates) tagged by category and entity, `agencies[]` (Utah entities with verified submission routes), `entities[]` (the people/orgs findings touch — the connect-the-dots layer), `boilerplate` (GRAMA cites). A request with a `response` field displays the outcome inline once an entity answers.

## Run locally

Any static server: `python -m http.server --directory .` — no build, no dependencies.
