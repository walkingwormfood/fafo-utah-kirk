/* FAFO Utah — Charlie Kirk Edition — data
 * Pure data, no dependencies. Drives index.html. Forked from FOIA Around, Find Out (federal).
 * Utah's public-records law is GRAMA — the Government Records Access and Management Act,
 * Utah Code § 63G-2. Same discipline as federal FAFO: NARROW BY DEFAULT — ask for specific
 * named instruments (logs, work orders, retention schedules, agreements, deployment records),
 * NOT "all documents/communications". Expect § 63G-2-305 (protected records / ongoing
 * investigation) denials on anything evidentiary — that's fine: GRAMA requires a WRITTEN
 * denial citing the exact provision (§ 63G-2-205), which puts the withholding itself on paper.
 * The human reviews and submits. Placeholders: {{NAME}} {{EMAIL}} {{ADDRESS}} {{DATE}}
 */
const FOIA = {
  meta: {
    product: "FOIA Around, Find Out: Charlie Kirk Edition [Utah State GRAMA]",
    tagline: "The Tyler Robinson preliminary hearing: sworn testimony isn't matching the paperwork. Pick a finding — we'll draft the GRAMA request.",
    statute: "Government Records Access and Management Act (GRAMA), Utah Code § 63G-2-101 et seq",
    portal: "https://openrecords.utah.gov",
    submit_note: "GRAMA requests go to each entity's records officer — there is no single statewide intake, and every entity below has its own quirks (audited July 2026, shown while you draft). Where a records email is verified you get one-click email (✉); everywhere else it's copy + the entity's own form or portal (↗) — mostly NextRequest and GovQA instances that auto-create an account from your email. Deadline: 10 business days, or 5 where expedited response benefits the public (Utah Code § 63G-2-204(4)). Denied? You have 30 days to appeal to the entity's chief administrative officer (§ 63G-2-401); silence for 10 business days counts as a denial too (§ 63G-2-204(9)). After that: the Government Records Office director or district court (§ 63G-2-402/403 — the old State Records Committee was abolished in 2025; some counties have their own local appeals board that must be used first). FEDERAL records on this case (FBI, DOJ) are over at the original FAFO — this site is Utah state and local only.",
    narrowing_note: "Each request is deliberately narrow — a specific log, work order, retention schedule, or named report, with a date range. Two reasons: broad requests get denied as overbroad, and this case has a pending capital prosecution, so anything evidentiary will draw a protected-records denial under Utah Code § 63G-2-305(10)(a) (release could interfere with an investigation). That denial must be in writing, describe what's withheld, cite the exact provision, and name the appeal officer (§ 63G-2-205(2)) — the withholding itself goes on paper, and it's appealable. Administrative records (retention schedules, work orders, severance agreements, deployment logs, access logs) are NOT investigation records and are much harder to lawfully withhold.",
    do_not: "This tool only drafts a letter — it submits nothing and collects nothing you type. Don't fire identical mass copies at one office; records officers deprioritize duplicates. Pick the angle that fits you. And keep it about the records: no contact with witnesses, jurors, or families — the paperwork is the point."
  },

  boilerplate: {
    burden_carveout:
      "To minimize processing burden, I am not requesting any record whose release is restricted by court order, " +
      "juror information, or private personal information unrelated to official government activity. " +
      "This request seeks records of official government activity only.",
    fee_waiver:
      "Fee waiver: I request that this request be fulfilled without charge under Utah Code § 63G-2-203(4)(a), " +
      "which encourages an entity to waive fees when release of the record primarily benefits the public rather " +
      "than a person. These records concern the investigation and prosecution of a matter of intense and " +
      "legitimate statewide and national public interest, and the requested records will be made available to " +
      "the general public. This request is not made for commercial purposes. " +
      "If a fee waiver is denied, please notify me before incurring any costs over $25.",
    deadline:
      "GRAMA requires a response as soon as reasonably possible, and no later than 10 business days after receipt " +
      "(Utah Code § 63G-2-204(4)(a)) — or 5 business days where expedited response benefits the public.",
    expedited:
      "Expedited response: I request the 5-business-day expedited response under Utah Code § 63G-2-204(4)(b), as " +
      "expedited release of these records benefits the public rather than a person — they concern a pending public " +
      "prosecution that is the subject of widespread and ongoing public attention, and they will be made available " +
      "to the general public — the circumstance § 63G-2-204(5) presumes to benefit the public.",
    segregability:
      "If any record or portion is withheld, GRAMA requires a written denial notice describing the record withheld, " +
      "citing the specific exempting provision, and stating the right to appeal with the chief administrative " +
      "officer's name and address (Utah Code § 63G-2-205(2)); I also request release of all segregable portions " +
      "not subject to the claimed restriction.",
    no_records:
      "If no responsive records exist, I request written confirmation of that fact, including a description of the " +
      "search conducted.",
    reason_public:
      "These records document official government activity in a matter of intense and legitimate public interest — " +
      "the investigation and prosecution arising from the September 10, 2025 events at Utah Valley University. " +
      "I am requesting them as a member of the public, and the records will be made available to the general public. " +
      "This request is not made for commercial purposes.",
    entitlement_public:
      "The requested items are public records under Utah Code § 63G-2-201 — records of official government activity " +
      "that are not private, controlled, or protected. No special relationship to the record is required for access " +
      "to public records. If any portion is claimed non-public, I request release of the segregable public portions " +
      "(§ 63G-2-308) and a written denial citing the specific exempting provision and my appeal rights (§ 63G-2-205(2)).",
    format:
      "Please provide responsive records in electronic format (searchable PDF or native file — for video, the " +
      "native export with original metadata) by email where possible.",
    closing:
      "Please confirm receipt and provide a reference number. I am happy to clarify or reasonably narrow this request " +
      "if that would speed processing.\n\nSincerely,\n{{NAME}}\n{{EMAIL}}"
  },

  /* Utah entities. email: null => portal/form-only (copy + deep-link).
   * Submission routes verified July 2026 (per-entity audit; quirks in submitNote). */
  agencies: [
    { id: "uvu", name: "Utah Valley University (records office)", email: null,
      portal: "https://uvu.nextrequest.com/",
      submitNote: "UVU takes GRAMA requests through its NextRequest portal (uvu.nextrequest.com); UVU Policy 133 also accepts written requests to the GRAMA officer (grama@uvu.edu). Fees per Policy 133: $25/hr compiling and redaction, copy charges, prepayment possible over $50; ~10 business days; denials appeal to the VP of Finance and Administration within 30 days.",
      portalNote: "NextRequest auto-creates an account from the email you enter on submission." },
    { id: "uvupd", name: "UVU Police Department", email: "uvpdrecords@uvu.edu",
      portal: "https://www.uvu.edu/police/",
      submitNote: "UVU PD takes records requests directly by email (uvpdrecords@uvu.edu, verified on the department's records page) or in person (GT 331, Gunther Trades Building, Orem campus). Minimum fee $20 for police records." },
    { id: "dps", name: "Utah Department of Public Safety (SBI, Aero Bureau)", email: null,
      portal: "https://publicsafetyutah.govqa.us/WEBAPP/_rs/SupportHome.aspx",
      submitNote: "DPS runs a department-wide GovQA Records Center — submission starts with a division picker; no records email is published, the portal is the route. Fees and payment run through the portal.",
      portalNote: "Pick the division that holds the record: State Bureau of Investigation for investigative/deployment records, or the video/GRAMA request category. The Aero Bureau isn't its own picker entry — if absent, file under the department-level GRAMA option and name the Aero Bureau in the text." },
    { id: "ucso", name: "Utah County Sheriff's Office", email: null,
      portal: "https://utah-county-ut.nextrequest.com/",
      submitNote: "UCSO GRAMA goes through Utah County's NextRequest portal — field-tested Jul 9, 2026: the SheriffRecords@utahcounty.gov address on the sheriff's records page auto-replies that it's UNMONITORED and routes you to NextRequest. Quirks: photo ID before release; reports start at $15; body/dash cam $20 per case plus staff time; 10 business days. Records office: 3075 North Main, Spanish Fork (801-851-4500).",
      portalNote: "NextRequest auto-creates an account from the email you enter on submission. If you're not the subject of the record, the confirmation email lists ID-upload options — for public records (logs, retention schedules) none is needed." },
    { id: "ucao", name: "Utah County Attorney's Office", email: "ucao@utahcounty.gov",
      portal: "https://utah-county-ut.nextrequest.com/",
      submitNote: "Utah County's GRAMA process is centralized in the County Attorney's Office — email ucao@utahcounty.gov or the NextRequest portal; the county web form requires a photo-ID upload. Mail: 100 East Center Street, Suite 2100, Provo. Expect § 63G-2-305(10) claims on anything touching the open prosecution — the written denial is still the point." },
    { id: "wcso", name: "Washington County Sheriff's Office", email: null,
      portal: "https://news.washeriff.net/public-services/grama-request/",
      submitNote: "WCSO takes GRAMA through its own web form (no login) — no records email is published, don't trust addresses from aggregator sites. Quirks: ALL fields are required, including date of birth and daytime phone; reports minimum $5; DO NOT PREPAY — payment instructions come by email after processing; 10 working days. Office: 620 South 5300 West, Hurricane (435-656-6500).",
      portalNote: "The form requires your full name, date of birth, mailing address, daytime phone, and email in its own fields. Select \"I request a copy of the following record.\" Under \"I believe I am entitled to access the record because,\" select OTHER — the entitlement box below is written for that field.",
      formMap: [
        { label: "\"Please describe the record\" box", parts: ["records", "no_records", "format"] },
        { label: "\"Please detail the reason for your request\" box", parts: ["reason"] },
        { label: "\"If OTHER please provide details\" box (after selecting OTHER above it)", parts: ["entitlement"] }
      ] },
    { id: "washco", name: "Washington County (Clerk/Auditor — personnel records)", email: "grama@washco.utah.gov",
      portal: "https://www.washco.utah.gov/departments/clerk/grama-records-request/",
      submitNote: "The county Clerk/Auditor is the records officer — email grama@washco.utah.gov (verified on the county GRAMA page), the county's request form, or Utah's Open Records Portal (the county explicitly endorses it). Mail: Clerk/Auditor, c/o Records Officer, 111 East Tabernacle Street, St. George, UT 84770. Severance and settlement agreements of public employees are generally public once finalized." },
    { id: "sgpd", name: "St. George Police Department (City of St. George)", email: null,
      portal: "https://cityofstgeorgepoliceut.nextrequest.com/",
      submitNote: "St. George routes GRAMA through one NextRequest portal covering the City Recorder, Police, and Fire (sgcity.org/grama redirects there). No email route is published — records@sgcity.org circulates on aggregator sites but appears on no official page. Fees: first 15 minutes free, then hourly ($21–$50/hr depending on record type); PD Records 435-627-4301.",
      portalNote: "NextRequest auto-creates an account from the email you enter on submission." },
    { id: "orem", name: "Orem Police Department (City of Orem)", email: "records@orem.gov",
      portal: "https://orem.gov/police-records-request/",
      submitNote: "Orem PD takes records requests via its JotForm (linked from orem.gov/police-records-request — heads-up: the form may require a Google-account sign-in) or by email/walk-in at the records counter: records@orem.gov, verified on the city's police-records page (Mon–Fri 8:30–5:30). Don't use policerecords@orem.org from older pages — that domain is retired. No published fee schedule; the city quotes fees and waits for your agreement before processing." },
    { id: "gov", name: "Office of the Governor of Utah", email: "aduncan@utah.gov", emailSubject: "GRAMA Request",
      portal: "https://openrecords.utah.gov",
      submitNote: "Email the records officer directly: Adam Duncan (aduncan@utah.gov, 801-538-1046), Public Records Officer, Governor's Office, State Capitol Complex, SLC 84114 — verified via the state Open Records Portal directory, Jul 15, 2026. The central portal does NOT take the request itself for this entity (it redirects to an 'Agency GRAMA Website' whose button is a dead link as of Jul 15, 2026). § 63G-2-204 requires your name, mailing address, email, and daytime phone in the request body." },
    { id: "ome", name: "Utah Office of the Medical Examiner (DHHS)", email: null,
      portal: "https://ome.utah.gov/",
      submitNote: "ME case records (autopsy, toxicology, investigative reports) are NOT ordinary GRAMA records — Utah Code § 26B-8-217 restricts them to next of kin, legal representatives, treating physicians, and law enforcement, and § 26B-8-217(8) bars other disclosure absent a court order. The request here deliberately targets administrative transmittal/chain-of-custody paperwork instead, and routes as a GRAMA request to DHHS; expect the office to test the 217 boundary in its response. OME: 4451 South 2700 West, Taylorsville; (801) 816-3850.",
      portalNote: "If filing online, use Utah's Open Records Portal (openrecords.utah.gov) addressed to the Department of Health and Human Services, since ome.utah.gov's own request flow is built for next-of-kin report requests." }
  ],

  entities: [
    { id: "robinson", name: "Tyler Robinson", type: "person" },
    { id: "davis", name: "Agent Brian Davis (SBI)", type: "person" },
    { id: "bagley", name: "Officer Bagley", type: "person" },
    { id: "schneider", name: "Agent Ben Schneider (SBI)", type: "person" },
    { id: "brooksby", name: "Ex-Sheriff Nate Brooksby", type: "person" },
    { id: "twiggs", name: "Lance Twiggs", type: "person" },
    { id: "mitchell", name: "Mike Mitchell", type: "person" },
    { id: "neff", name: "Blake Neff (Charlie Kirk Show)", type: "person" },
    { id: "uvu-ent", name: "UVU", type: "org" },
    { id: "sbi", name: "Utah SBI / DPS", type: "org" },
    { id: "wcso-ent", name: "Washington County SO", type: "org" },
    { id: "fbi-ent", name: "FBI", type: "org" },
    { id: "tpusa", name: "TPUSA", type: "org" }
  ],

  investigations: [
    {
      id: "wcso-intake-video",
      short: "Deleted turn-in video",
      categories: ["Missing & deleted footage"],
      entities: ["robinson", "davis", "brooksby", "wcso-ent"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141 — Days Two and Three", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "The Washington County Sheriff's Office video of Robinson's turn-in — the moment the official timeline starts — was reportedly deleted, per day-three testimony. A news organization's request was refused, then answered with a 30-day-retention deletion claim — yet on day four the state exhibited surrender footage cropped so tightly the timestamps were cut out, with Robinson facing away from the camera.",
      implication: "Government video of the most consequential arrest in Utah's history was not preserved — or was it? The retention schedule, the deletion authorization, the county's handling of the earlier request, and any litigation-hold notice are all administrative records, and the contradiction between \"deleted\" and the pleadings is exactly what they'd resolve.",
      sources: [
        { label: "Day 3 testimony, Agent Brian Davis (State v. Robinson prelim)", url: "" }
      ],
      requests: [
        {
          agencyId: "wcso",
          summary: "WCSO — the intake video, its retention schedule, and the deletion paper trail",
          subject: "GRAMA Request: lobby/intake video of September 11, 2025 and its retention/deletion records",
          records: "I request: (1) all video recorded by lobby, intake, sally-port, or booking-area cameras at the Washington County Sheriff's Office facility in Hurricane, Utah between 8:00 p.m. September 11, 2025 and 5:00 a.m. September 12, 2025; (2) the records retention schedule applicable to facility video during that period; and (3) any record documenting the deletion, overwriting, or non-retention of video from that period — including the date of deletion, the system or person that performed it, and any authorization, litigation-hold notice, or preservation request in effect at the time; and (4) all correspondence concerning any prior records request for this video — the request, the response, and any internal discussion of it. If the video no longer exists, items (2) through (4) are the request.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 9, 2026, 1:11 p.m. via WCSO's web form (copy requested; fee waiver and expedited response asserted; OTHER entitlement). WCSO confirmation email received same hour. Re-filed identically Jul 12, 2026, 1:18 p.m. (second WCSO confirmation received) — treat Jul 9 as the operative filing date; response due within 10 working days (~Jul 23). DO NOT PREPAY — payment instructions come by email."
        }
      ]
    },
    {
      id: "custody-timeline",
      short: "Four custody times",
      categories: ["Timeline contradictions"],
      entities: ["robinson", "davis", "brooksby", "wcso-ent", "fbi-ent"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141 — Days Two and Three", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "Four different custody times exist in the official record: 9:00 p.m. (Agent Davis's day-three testimony, hearsay), 10:00 p.m. (Utah County booking sheet, and FBI Director Patel's public \"33 hours\" statement), 10:26 p.m. (\"approximately 2226 hours\" — all 16 search warrants), and a 4:00 a.m. formal arrest (testimony).",
      implication: "The booking sheet is sworn \"under criminal penalty.\" The warrants are sworn. The testimony was sworn. They can't all be right, and the primary-source records that would reconcile them — booking records, dispatch logs — are specific, dated documents.",
      sources: [
        { label: "16 search warrants (2226 hours); UCSO inmate booking sheet; Day 3 testimony", url: "" }
      ],
      requests: [
        {
          agencyId: "ucso",
          summary: "Utah County — the complete booking record behind the contradictory times",
          subject: "GRAMA Request: booking and intake records for inmate booked September 12, 2025",
          records: "I request the complete booking and intake record for Tyler James Robinson, booked into the Utah County Jail on or about September 12, 2025 — including the booking sheet, any amendments or corrections to it, the intake log entry, and any record reconciling the arrest date/time fields it contains. I am not requesting medical or classification records.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 9, 2026 via NextRequest, request #26-2775. Utah County demanded a completed requester profile (§ 63G-2-204: name, mailing address, email, daytime phone) on pain of closure; cured Jul 10, same day. 10-business-day clock running. (Filing lessons: SheriffRecords@utahcounty.gov auto-replies that it's unmonitored — the portal is the real intake — and NextRequest accounts need the full § 204 profile up front.)"
        },
        {
          agencyId: "wcso",
          summary: "WCSO — dispatch/CAD log for the night of the turn-in",
          subject: "GRAMA Request: CAD/dispatch records, evening of September 11, 2025",
          records: "I request the computer-aided dispatch (CAD) log entries and radio log records for the Washington County Sheriff's Office for September 11, 2025, 6:00 p.m. through September 12, 2025, 6:00 a.m., concerning the arrival, custody, or processing of any individual in connection with the Utah Valley University homicide investigation. Redaction of unrelated calls for service is acceptable.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 15, 2026, 12:26 p.m. via WCSO's web form (copy requested; fee waiver and expedited asserted; § 204 profile complete). Confirmation received same hour. Response due within 10 working days (~Jul 29). DO NOT PREPAY."
        }
      ]
    },
    {
      id: "bagley-bodycam",
      short: "Bodycam died on the roof",
      categories: ["Missing & deleted footage", "Crime scene handling"],
      entities: ["bagley", "uvu-ent"],
      investigator: "Baron Coleman · Ian Carroll",
      investigatorLinks: [
        { label: "Carroll on day one/two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" },
        { label: "Coleman Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "The first officer to reach the shooter's rooftop (Officer Bagley) testified his body camera's battery died as he reached the roof — 27 minutes 35 seconds of footage, his only recording that day — that he was accompanied up by an armed man in civilian clothes with a badge whose name and agency he never got, and that he searched the prone position and roof edge and found no spent shell casing.",
      implication: "Body-camera systems log battery events, docking, and uploads independently of the footage — the metadata says whether the unit died or was powered off. Someone armed was on the key rooftop before it was processed. And the state's own first responder found no brass at the sniper position.",
      sources: [
        { label: "Day 1 testimony (cross by Kathryn Nester; courtroom audio aired Jul 8)", url: "" }
      ],
      requests: [
        {
          agencyId: "uvupd",
          summary: "UVU PD — Bagley's bodycam footage plus the device's audit/battery logs",
          subject: "GRAMA Request: body-worn camera footage and device audit logs, September 10, 2025",
          records: "I request: (1) all body-worn camera footage recorded on September 10, 2025 by the UVU police officer who first accessed the Losee Center rooftop; (2) the device audit log for that officer's body-worn camera for September 10, 2025 — including power-on/power-off events, battery-depletion events, docking and upload timestamps; and (3) the department's body-worn camera policy in effect on that date, including battery-management and activation requirements.",
          ask_no_records: true
        },
        {
          agencyId: "ucso",
          summary: "Utah County SO — the bodycam that was rolling during the rifle recovery (confirmed on day 4 to exist)",
          subject: "GRAMA Request: body-worn camera footage of evidence recovery, wooded area near UVU, September 10, 2025",
          records: "I request the body-worn camera footage recorded by the Utah County Sheriff's Office officer(s) present at the recovery of a rifle from the wooded area northeast of the Utah Valley University campus on September 10, 2025, at approximately 6:00 p.m. On July 9, 2026, the state's crime-scene sergeant testified at the public preliminary hearing in State v. Robinson that an officer's body camera was recording during that recovery. I also request the associated evidence/property record for the recovered items.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 12, 2026, 2:51 p.m. via NextRequest, request #26-2791 (Utah County). Response due July 28. Confirmation received on submission; no invoice due. Photo-ID upload applies only to subject-of-record requests — this is a public-records ask."
        },
        {
          agencyId: "uvupd",
          summary: "UVU PD — scene access log and multi-agency deployment roster for Sept 10",
          subject: "GRAMA Request: crime scene access log and assisting-agency roster, September 10, 2025",
          records: "I request: (1) the crime scene access/entry log maintained for the Losee Center rooftop and the courtyard scene at Utah Valley University on September 10–11, 2025; and (2) any roster, mutual-aid record, or deployment list identifying the law-enforcement agencies and personnel (including plainclothes personnel) present on the UVU campus on September 10, 2025 in connection with the incident response.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "second-roof-round",
      short: "The .223 on the other roof",
      categories: ["Physical evidence"],
      entities: ["schneider", "davis", "sbi", "uvu-ent"],
      investigator: "Baron Coleman · Ian Carroll",
      investigatorLinks: [
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" },
        { label: "Coleman Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "contested",
      finding: "A .223 round was found September 10 on the computer science building roof — a different caliber than the charged rifle — documented by SBI Agent Ben Schneider, written off as an officer cycling his rifle, with testimony that there was \"no line of sight\" to the tent. A drone-photogrammetry rendering (Paramount Tactical) shows a direct line of sight at ~320–350 yards. Friday's testimony pinned the location — \"the far east side\" of the computer science building roof — and left the underlying question standing: why an officer with a loaded rifle was on that roof at all, after George Zinn was already in custody and the campus response had moved on.",
      implication: "Either an officer left a live round on a rooftop and the scene wasn't preserved, or the round mattered and wasn't treated as evidence. Schneider's report, the evidence log, and any overwatch deployment records are all discrete named documents. (Status contested: the round and its official accounting are testimony; the line-of-sight dispute is outside analysis.)",
      sources: [
        { label: "Day 2 + Day 3 testimony; Friday testimony (roof location); Paramount Tactical 3D rendering", url: "" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — Schneider's report on the .223 round and its disposition",
          subject: "GRAMA Request: report and evidence records for round recovered on UVU computer science building roof, September 10, 2025",
          records: "I request: (1) the report authored or contributed to by Agent Ben Schneider (State Bureau of Investigation) documenting the discovery, photographing, collection, and disposition of an unfired round found on the roof of the computer science building at Utah Valley University on or about September 10, 2025; (2) the evidence or property log entry for that round, or the record documenting a decision not to take it into evidence; and (3) any record identifying the officer whose rifle-cycling was determined to account for it.",
          ask_no_records: true
        },
        {
          agencyId: "dps",
          summary: "DPS — rooftop overwatch deployment records for Sept 10 at UVU",
          subject: "GRAMA Request: overwatch/counter-sniper deployment records, UVU, September 10, 2025",
          records: "I request any deployment record, post assignment, or after-action record identifying law-enforcement personnel assigned to rooftop, overwatch, or counter-sniper positions on or around the Utah Valley University campus on September 10, 2025, including which buildings were occupied and by which agency. I am not requesting tactical methodologies — unit, position, and agency identification only.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "k9-no-results",
      short: "K9s: no results",
      categories: ["Crime scene handling"],
      entities: ["uvu-ent", "sbi"],
      investigator: "Ian Carroll · Candace Owens",
      investigatorLinks: [
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" }
      ],
      status: "confirmed",
      finding: "The lead investigator confirmed on cross that canines were deployed on September 10 — possibly to track the individual who jumped from the roof — and produced no results he was aware of.",
      implication: "K9 deployments generate handler logs: which units, what tasking (tracking vs. detection), what outcome. \"Dogs found nothing\" was a contested claim for months; the logs would settle what was deployed and what it produced.",
      sources: [
        { label: "Day 2 testimony (cross)", url: "" }
      ],
      requests: [
        {
          agencyId: "ucso",
          summary: "Utah County — K9 deployment logs for the UVU response",
          subject: "GRAMA Request: K9 unit deployment records, UVU campus, September 10–11, 2025",
          records: "I request the K9 deployment or utilization records for any canine unit deployed to the Utah Valley University campus or surrounding area on September 10–11, 2025 — including the handler log or deployment report identifying each unit, its certification/discipline (tracking, article search, explosives, or firearms detection), its tasking, and the recorded outcome of each deployment.",
          ask_no_records: true,
          filed: "PENDING — filed via NextRequest as Utah County request #26-2812, Jul 13, 2026. Identified via the county's Jul 15 closure of #26-2833 (an accidental duplicate) under § 63G-2-201(7)(a)(iv): 'A response will be provided through request 26-2812.'"
        },
        {
          agencyId: "orem",
          summary: "Orem PD — same K9 records for its units, if deployed",
          subject: "GRAMA Request: K9 unit deployment records, UVU response, September 10–11, 2025",
          records: "I request the K9 deployment or utilization records for any City of Orem canine unit deployed in connection with the Utah Valley University incident response on September 10–11, 2025 — including handler logs identifying each unit, its certification/discipline, its tasking, and the recorded outcome.",
          history: [
            { label: "filed Jul 15, 2026 by email to records@orem.gov",
              records: "I request the K9 deployment or utilization records for any City of Orem canine unit deployed in connection with the Utah Valley University incident response on September 10–11, 2025 — including handler logs identifying each unit, its certification/discipline, its tasking, and the recorded outcome.",
              outcome: "DENIED same day by Records Specialist Angela Campbell (801-229-7298): (1) missing § 63G-2-204 requester information — full mailing address and daytime phone; (2) duplicate submission.",
              refinement: "Request text unchanged — the cure is procedural: the complete § 204 requester block (name, full street/city/state/ZIP, daytime phone, email) now leads the letter, filed once. The generator letterhead carries these fields for every Utah request going forward." }
          ],
          refined: true,
          ask_no_records: true,
          filed: "RE-FILED (cured) Jul 16, 2026 by email to records@orem.gov — complete § 63G-2-204 requester block (full mailing address + daytime phone), single copy, replacing all prior submissions. 10-business-day clock (~Jul 30). Original denial preserved in the progression above."
        }
      ]
    },
    {
      id: "paved-scene",
      short: "Scene paved over",
      categories: ["Crime scene handling"],
      entities: ["uvu-ent", "davis"],
      investigator: "Ian Carroll · Baron Coleman",
      investigatorLinks: [
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" }
      ],
      status: "confirmed",
      finding: "The courtyard ground under the medical tent was paved over within days of the shooting — the case's lead investigator testified he didn't authorize it, doesn't know who did, and learned it happened from the news. The excavation contractor (Dan Merrill) has separately said on camera the work was ordered by \"the FBI and the Governor of Utah.\"",
      implication: "Somebody ordered a homicide scene altered while the investigation was open, without the lead investigator's knowledge — and a named contractor points at the Governor's office. Work orders, contractor invoices, and the authorizing communications are routine administrative records on both ends.",
      sources: [
        { label: "Day 2 testimony (cross)", url: "" },
        { label: "Dan Merrill on-camera statement (aired via Coleman / Liberty Lockdown)", url: "" }
      ],
      requests: [
        {
          agencyId: "uvu",
          summary: "UVU — the work orders and authorizations for the tent removal and paving",
          subject: "GRAMA Request: facilities records for courtyard work following September 10, 2025",
          records: "I request, for the period September 10 – October 15, 2025: (1) all work orders, purchase orders, and contractor invoices concerning removal of the medical tent and any resurfacing, paving, concreting, or landscaping of the courtyard area adjacent to the Sorensen Center / Hall of Flags at Utah Valley University; and (2) the written authorization or approval for that work, including the requesting office and any record of coordination with, or clearance from, any law-enforcement agency before the work proceeded.",
          ask_no_records: true,
          filed: "PENDING — filed via NextRequest as UVU request #26-212, received Jul 13, 2026; acknowledged Jul 15 with the full request text quoted back. 10-business-day clock, stretched by the Jul 24 Pioneer Day closure — response due ~Jul 27–28. NOTE: UVU #26-217 (Jul 15) is an accidental identical re-file — expect a § 63G-2-201(7) duplicate closure; no action needed on it."
        },
        {
          agencyId: "gov",
          summary: "Governor's office — any direction or coordination on the scene restoration",
          subject: "GRAMA Request: records concerning courtyard restoration work at Utah Valley University, September 2025",
          records: "I request, for the period September 10 – October 15, 2025, any record held by the Office of the Governor — including correspondence, directives, meeting notes, or coordination records with Utah Valley University, the FBI, or the Utah Department of Public Safety — concerning the removal of the medical tent and the excavation, resurfacing, or concreting of the courtyard area at Utah Valley University where the September 10, 2025 shooting occurred. The excavation contractor has stated publicly that this work was ordered by the FBI and the Governor of Utah; this request seeks the records of any such direction or coordination. If no such records exist, I request written confirmation of that fact.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "noble-report",
      short: "Omitted doorbell report",
      categories: ["Witness statements", "Video evidence"],
      entities: ["robinson", "sbi"],
      investigator: "Baron Coleman · Ian Carroll",
      investigatorLinks: [
        { label: "Coleman Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" },
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" }
      ],
      status: "confirmed",
      finding: "On cross, the officer who presented the Nest doorbell footage admitted the homeowners' report describes the driver of Robinson's car as bald, with three other people in the car — and that he omitted both facts on direct while presenting the clip as Robinson returning alone.",
      implication: "The interview report provably exists — the witness confirmed its contents under oath. It will draw a protected-records claim while the prosecution is pending, but the written denial must say so and cite the provision, and the request puts the report's existence and custodian on paper.",
      sources: [
        { label: "Day 2 cross-examination (played on both streams)", url: "" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — the interview report described under oath (expect a written 305 denial)",
          subject: "GRAMA Request: report of witness interview concerning residential doorbell video, September 2025",
          records: "I request the investigative report, or interview summary, documenting the interview of the homeowners whose Nest doorbell camera captured a vehicle associated with the Utah Valley University homicide investigation parked on their street overnight September 10–11, 2025 — the report whose contents (including the description of the vehicle's driver and occupants) were confirmed by a testifying officer during the preliminary hearing in State v. Robinson. Witness personal identifiers may be redacted; the substance of the recorded descriptions is the request.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "cut-footage",
      short: "Edited courtroom video",
      categories: ["Video evidence"],
      entities: ["robinson", "uvu-ent"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141 — the timestamp walk-through", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "contested",
      finding: "The state's courtroom video compilations contain undisclosed edits, verifiable from the on-screen timestamps: a missing 1:16 in the 11:53 a.m. clip (11:53:17 → 11:54:33), stairwell cuts spliced out of chronological order (11:56:00–:24, :25–:59, then :01–:04), and a 55-minute garage gap (8:29 arrival, 9:24 stairwell) presented as continuous.",
      implication: "The timestamps are on the public courtroom feed — the edits are checkable by anyone. Whether they're sloppy or deceptive, the unedited source exports with native metadata are the record that answers it. (Status contested: the cuts are verifiable; intent is commentary.)",
      sources: [
        { label: "Courtroom feed timestamps, days 2–3", url: "" }
      ],
      requests: [
        {
          agencyId: "uvupd",
          summary: "UVU PD — unedited native exports of the specific clipped segments (campus security video)",
          subject: "GRAMA Request: unedited surveillance video exports, specified cameras and times, September 10, 2025",
          records: "I request unedited, native-format exports (with original metadata intact) of Utah Valley University surveillance video for September 10, 2025 from: (1) the camera covering the campus approach shown in court with timestamps 11:53:00 a.m. – 11:56:00 a.m.; (2) the parking-structure stairwell camera shown with timestamps 11:55:00 a.m. – 11:58:00 a.m.; and (3) the parking-structure camera covering the vehicle that arrived at 8:29 a.m., for 8:29 a.m. – 9:35 a.m. These segments were exhibited publicly at the preliminary hearing in State v. Robinson; I request the unedited sources of the same segments.",
          ask_no_records: true
        },
        {
          agencyId: "uvu",
          summary: "UVU — parking garage access-control log for the morning of Sept 10",
          subject: "GRAMA Request: parking structure access-control records, morning of September 10, 2025",
          records: "I request the access-control log (key-card, key-pass, gate, or license-plate-recognition entries) for the Utah Valley University parking structure adjacent to the Losee Center for September 10, 2025, 8:00 a.m. – 10:00 a.m. Entries of uninvolved third parties may be redacted; the request is for the log covering the vehicle entry shown at 8:29 a.m. in exhibits at the State v. Robinson preliminary hearing.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "exhibit-121",
      short: "The “4K” exhibit",
      categories: ["Video evidence"],
      entities: ["robinson", "uvu-ent", "tpusa"],
      investigator: "Ian Carroll · Brandy & Billy (in the courtroom)",
      investigatorLinks: [
        { label: "Final recap — the exhibit history, walked through the transcript", url: "https://www.youtube.com/watch?v=R7mdXcBfQTw" }
      ],
      status: "confirmed",
      finding: "Day one, the judge REJECTED the state's video montage of the roof descent — exhibit 12.1 — because it was edited (zoom-ins, added circling), and ordered an unedited version remade overnight (exhibit 12.4). On the final day, after the cameras were off, the judge granted the victim representative's (Erika Kirk's) attorney's request to play “the totality of, I believe it is, state exhibit 12.1 — 8 give or take 2 minutes” to the ~14 in-person seats only, confirming on the record it would not be televised. Per the transcript, the “enhanced” video is the same surveillance footage at the same resolution, zoomed in a video editor. Two journalists in the room posted immediately: no high-quality zoomed footage, no sound, the crouching figure “could be anyone” — while accounts with ~10M collective followers claimed it showed the shot.",
      implication: "A video the public was told is conclusive was shown once, off camera, and “isn't going to be released publicly.” The native source exports and the paper trail of the exhibit work — who performed the zoom and editing, with what software, from which camera files — are discrete records on both ends: UVU owns the cameras, and the state made the exhibits.",
      sources: [
        { label: "Hearing transcript: 12.1 rejected as edited day one; final-day playback colloquy (not televised)", url: "" },
        { label: "Brandy & Billy, posted from the courtroom (relayed with wristbands shown)", url: "https://www.youtube.com/watch?v=R7mdXcBfQTw" }
      ],
      requests: [
        {
          agencyId: "uvupd",
          summary: "UVU PD — native export of the camera segments behind exhibits 12.1/12.4",
          subject: "GRAMA Request: unedited surveillance exports, Losee Center roof and courtyard cameras, midday September 10, 2025",
          records: "I request unedited, native-format exports (original resolution and metadata intact) of Utah Valley University surveillance video for September 10, 2025, 12:10 p.m. – 12:35 p.m., from the camera or cameras whose footage was used to create the video exhibits designated 12.1 and 12.4 at the public preliminary hearing in State v. Robinson — the footage covering the Losee Center roofline and descent point. If the original recordings have been provided to or seized by an investigating agency, I request the transfer or evidence-receipt record identifying that agency and the date of transfer.",
          ask_no_records: true
        },
        {
          agencyId: "dps",
          summary: "DPS/SBI — the paper trail of the exhibit work: who made 12.1 and 12.4, from what, with what",
          records: "I request, concerning the video exhibits designated 12.1 and 12.4 at the July 2026 preliminary hearing in State v. Robinson: (1) the work request, lab request, or tasking record for the creation, enhancement, magnification, or editing of those exhibits, identifying the person, unit, or vendor that performed the work and the software used; (2) the record identifying the source video files used (camera, export date, and file hash or comparable integrity record, if maintained); and (3) any record documenting the revision of the exhibit after July 7, 2026 — the overnight remake ordered when the original version was ruled edited. I am not requesting the video content itself in this item — the records documenting how the exhibits were made.",
          subject: "GRAMA Request: records documenting the creation of video exhibits 12.1 and 12.4, State v. Robinson",
          ask_no_records: true
        }
      ]
    },
    {
      id: "tpusa-contact",
      short: "TPUSA contact that morning",
      categories: ["Witness statements", "Video evidence"],
      entities: ["robinson", "tpusa", "uvu-ent", "neff"],
      investigator: "Baron Coleman · Buckley Carlson · Ian Carroll",
      investigatorLinks: [
        { label: "Bombshells crossover (Liberty Lockdown)", url: "https://www.youtube.com/watch?v=Fk4RFSn6gqs" },
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" },
        { label: "Final recap — the Neff Twitter Space clip", url: "https://www.youtube.com/watch?v=R7mdXcBfQTw" }
      ],
      status: "confirmed",
      finding: "Testimony on both day two and day three placed Robinson making contact with TPUSA representatives at the quad the morning of the shooting, while the event was being set up — the SBI lead officer's timeline words were “met with TPUSA representatives.” The state did not name the representatives, and no footage of the contact has been shown. Then Charlie Kirk Show representative Blake Neff, on a recorded Twitter Space during hearing week, first said he didn't know who it was — “and even if I did, I wouldn't tell you, because you guys would just harass that person” — and then added: “and I know that that person didn't do anything.”",
      implication: "The accused spoke with people from the victim's own organization hours before the shooting, and eleven months of official narrative never mentioned it. UVU hosted the event — its event-services coordination records, credentialing lists, and vendor rosters would name the people the testimony didn't.",
      sources: [
        { label: "Day 2 timeline testimony; day 3 testimony (per Coleman/Carroll coverage)", url: "" }
      ],
      requests: [
        {
          agencyId: "uvu",
          summary: "UVU — event coordination and credentialing records naming the TPUSA advance staff",
          subject: "GRAMA Request: event coordination records for the September 10, 2025 TPUSA event",
          records: "I request, concerning the September 10, 2025 Turning Point USA event at Utah Valley University: (1) the event agreement, facility-use contract, and coordination correspondence between UVU event services (or student engagement) and TPUSA advance or event staff; (2) any credentialing, access, or staff roster provided to UVU identifying TPUSA personnel present on campus for event setup that morning; and (3) the vendor or contractor list for the event, including audio/visual contractors. I am not requesting attendee lists or any student records.",
          ask_no_records: true
        },
        {
          agencyId: "uvupd",
          summary: "UVU PD — quad-area camera footage covering the morning contact window",
          subject: "GRAMA Request: quad/amphitheater camera footage, morning of September 10, 2025",
          records: "I request unedited exports of Utah Valley University camera footage covering the quad/amphitheater area where the September 10, 2025 event was being set up, for 8:15 a.m. – 10:30 a.m. that morning — the window in which preliminary-hearing testimony placed the defendant making contact with event representatives. If this footage has been provided to or seized by an investigating agency, I request the transfer record identifying that agency.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "twiggs-location",
      short: "Twiggs: which building?",
      categories: ["Timeline contradictions", "Witness statements"],
      entities: ["twiggs", "davis", "fbi-ent", "wcso-ent"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "Agent Davis testified Lance Twiggs was first interviewed in the early hours of September 12 at the St. George Police Department — but the sworn warrant affidavit says FBI Special Agent Lang interviewed him at ~1:00 a.m. at the Washington County Sheriff's Office.",
      implication: "Where a key witness was interviewed, and by whom, should not change between a sworn affidavit and sworn testimony. Facility records — interview room logs, visitor logs — would establish which building he was actually in.",
      sources: [
        { label: "Day 3 testimony vs. warrant affidavit", url: "" }
      ],
      requests: [
        {
          agencyId: "sgpd",
          summary: "St. George PD — facility records for the night of Sept 11–12",
          subject: "GRAMA Request: interview room and visitor logs, night of September 11–12, 2025",
          records: "I request the interview-room usage log, visitor log, and lobby/desk log for the St. George Police Department for September 11, 2025, 10:00 p.m. through September 12, 2025, 8:00 a.m., including any record of use of department facilities by another agency (FBI, Utah DPS/SBI, or Washington County Sheriff's Office) during that window. Names of uninvolved members of the public may be redacted.",
          ask_no_records: true
        },
        {
          agencyId: "wcso",
          summary: "WCSO — the same facility records for the same window",
          subject: "GRAMA Request: interview room and visitor logs, night of September 11–12, 2025",
          records: "I request the interview-room usage log, visitor log, and any facility-use record for the Washington County Sheriff's Office for September 11, 2025, 10:00 p.m. through September 12, 2025, 8:00 a.m., including any record of facility use by another agency (FBI or Utah DPS/SBI) during that window. Names of uninvolved members of the public may be redacted.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "panguitch-alibi",
      short: "The Panguitch alibi",
      categories: ["Timeline contradictions", "Witness statements"],
      entities: ["robinson", "twiggs", "fbi-ent", "sbi"],
      investigator: "Diligent Denizen · Baron Coleman · Candace Owens",
      investigatorLinks: [
        { label: "Diligent Denizen — the on-camera staff interview (posted Jul 12)", url: "https://x.com/DiligentDenizen/status/2076405974597063038" },
        { label: "Coleman Ep. 143 — the timeline math against the state's own texts", url: "https://www.youtube.com/watch?v=yBDB-mpI-Xw" },
        { label: "Interview video, archived", url: "https://web.archive.org/web/20260713050144/https://video.twimg.com/ext_tw_video/2076405353022095360/pu/vid/avc1/1280x720/CBzgt2rfdWeCpsLE.mp4" }
      ],
      status: "contested",
      finding: "Two staff at Cowboy's Smokehouse in Panguitch — on camera, one of whom personally took Robinson's card at checkout near the 10 p.m. close — say they served him the evening of September 10 and are \"100%\" on the ID (face, voice, mannerisms; more certain than Lance Twiggs was about the stairwell figure). They reported it to the FBI, who took contact information and never followed up; the sighting reached Candace Owens months ago. Neither the prosecution nor the defense has ever contacted the restaurant. The math: fastest route Panguitch→UVU is ~2h46m, so a ~9:50 p.m. departure puts the earliest Orem arrival at ~12:36 a.m. — while the state's text-message exhibits have \"Robinson\" texting Twiggs from outside UVU, watching a lingering cop, with the first message at 11:00 p.m. A card payment record with a hard timestamp exists at a named business. (Status contested: the interview is on tape and archived; the sighting itself is a witness claim outside the court record — which is exactly the problem the records requests attack.)",
      implication: "If the tip is wrong, the case file shows it was run down and excluded — routine. If the tip was never run down, a 100%-ID alibi sighting with a checkable payment record sat in the FBI's intake while the state built a timeline it contradicts. Either way the paper answers: the tip/lead log entry, and any record of follow-up, are discrete administrative records on the state side. (The FBI intake itself is federal — that request lives on the federal FAFO.) Coleman's read of the same facts: \"either the texts are fabricated... or someone was pretending to be Tyler.\"",
      sources: [
        { label: "On-camera interview (3:09), receipts + Wayback archives in the library", url: "https://web.archive.org/web/20260713050134/https://cdn.syndication.twimg.com/tweet-result?id=2076405974597063038&token=a" },
        { label: "Ep. 143 segment [20:45–34:30]", url: "https://www.youtube.com/watch?v=yBDB-mpI-Xw" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — the lead/tip log entry for the Panguitch sighting (absence is the finding)",
          subject: "GRAMA Request: lead or tip records concerning a reported September 10, 2025 sighting in Panguitch, Utah",
          records: "I request, concerning the Utah Valley University homicide investigation: (1) the lead, tip, or information-report log entry documenting receipt of information that the suspect was seen at a restaurant in Panguitch, Utah on the evening of September 10, 2025 — whether received directly, from the FBI, or from any other agency; and (2) any record documenting investigative follow-up on that information, including any interview of the reporting witnesses or any records request to the business, or a record of the decision not to follow up. Witness personal identifiers may be redacted. If no responsive records exist, I request written confirmation of that fact, including a description of the search conducted.",
          ask_no_records: true
        },
        {
          agencyId: "ucao",
          summary: "Utah County Attorney — any record the prosecution received or ran down the Panguitch tip",
          subject: "GRAMA Request: records concerning a reported alibi sighting, State v. Robinson",
          records: "I request any record held by the Utah County Attorney's Office documenting receipt of, or follow-up on, information that the defendant in State v. Robinson was seen in Panguitch, Utah on the evening of September 10, 2025 — including any referral from a law-enforcement agency, any internal memorandum, and any record of contact or attempted contact with the business or the reporting witnesses. If no responsive records exist, I request written confirmation of that fact.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "motive-testimony",
      short: "Motive without a witness",
      categories: ["Witness statements"],
      entities: ["twiggs", "robinson"],
      investigator: "Ian Carroll",
      investigatorLinks: [
        { label: "Final recap — the Twiggs testimony, played", url: "https://www.youtube.com/watch?v=R7mdXcBfQTw" }
      ],
      status: "confirmed",
      finding: "The official motive — Robinson radicalized by Kirk's rhetoric about trans people, with his transitioning partner at the center of it — was seeded in official statements within days of the arrest. At the hearing, its centerpiece witness appeared only in a pre-filmed, partially redacted video (the defense's attempt to put Twiggs on the stand live was blocked), and in it Twiggs testified he had personally never heard Robinson talk about Charlie Kirk, and that the two didn't really discuss gender identity or LGBTQ issues — politics was Robinson relaying radio news from the work carpool. Asked to identify Robinson from the same blurry FBI-website stills the public saw, he answered: “I wouldn't say with 100% certainty, just because of camera quality... that looks like him in terms of the shoes.”",
      implication: "The person the motive story is about, under oath, doesn't tell it. So where did it come from? Public officials made specific motive claims to national audiences within 72 hours — and briefings to an elected official are administrative records with authors and dates, not investigation files.",
      sources: [
        { label: "Twiggs video testimony as played at the hearing (defense-noted redactions)", url: "" }
      ],
      requests: [
        {
          agencyId: "gov",
          summary: "Governor's office — the briefing materials behind the September motive statements",
          subject: "GRAMA Request: briefing records preceding the Governor's September 2025 public statements on the UVU homicide suspect",
          records: "I request, for the period September 11–16, 2025, the briefing document(s), talking points, or written summaries provided to the Governor or the Governor's communications staff by any law-enforcement agency prior to the Governor's public statements characterizing the suspect's motive, ideology, or the suspect's roommate, together with a record identifying the providing agency and date of each. I am not requesting investigation records held by a law-enforcement agency — the request is for the briefing records as held by the Office of the Governor.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "discord-timing",
      short: "Discord confessions vanish",
      categories: ["Timeline contradictions", "Witness statements"],
      entities: ["robinson", "sbi", "fbi-ent"],
      investigator: "Baron Coleman · Ian Carroll",
      investigatorLinks: [
        { label: "Final recap — why the Discord messages matter now", url: "https://www.youtube.com/watch?v=R7mdXcBfQTw" }
      ],
      status: "contested",
      finding: "The Discord messages in which Robinson supposedly confessed to friends before turning himself in — reported worldwide in September 2025 — were never entered or mentioned at the preliminary hearing. Coleman's public hypothesis for the disappearance: the messages may have been sent after Robinson was already in police custody, which would make them worse than useless to the state. (Status contested: their absence from the hearing is the record; the timing hypothesis is unproven — and testable.)",
      implication: "The hypothesis rises or falls on acquisition metadata, not content: when investigators sent legal process to Discord, what date range the production covered, and when it came back are administrative facts about the evidence trail. If the messages post-date the earliest custody time, the four-custody-times problem stops being a paperwork quirk.",
      sources: [
        { label: "September 2025 reporting on the Discord messages vs. the hearing record (no mention)", url: "" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — the acquisition paper trail for the Discord records (dates, not content)",
          subject: "GRAMA Request: records documenting acquisition of Discord records, UVU homicide investigation",
          records: "I request, concerning the Utah Valley University homicide investigation of September 10, 2025: (1) the evidence-intake or property log entry documenting receipt of records from Discord Inc. (or from a federal agency relaying them), including the date of receipt; and (2) the transmittal or cover record accompanying that production, identifying the date of the preservation request or legal process and the date range of the records produced. I am NOT requesting the content of any message — only the log and transmittal records documenting when the records were sought and received.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "mitchell-statements",
      short: "Mitchell re-papered",
      categories: ["Witness statements", "Timeline contradictions"],
      entities: ["mitchell", "brooksby", "wcso-ent"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "Mike Mitchell — the retired-cop family friend who facilitated the turn-in — was interviewed the morning of September 12, but the state introduced instead a handwritten statement he wrote alone at the St. George courthouse on March 31, 2026: four days after Sheriff Brooksby's resignation became public.",
      implication: "Why re-paper a turn-in witness's account six months later, days after the sheriff who ran the turn-in resigned under investigation-interference allegations? The two statements are discrete, dated records; so is whatever arranged the March 31 session.",
      sources: [
        { label: "Day 3 testimony; Brooksby resignation reporting (Mar 2026)", url: "" }
      ],
      requests: [
        {
          agencyId: "wcso",
          summary: "WCSO — the original September 12 Mitchell interview records",
          subject: "GRAMA Request: records of witness interview conducted September 12, 2025",
          records: "I request the report, recording log entry, or interview summary documenting the interview of the individual who facilitated Tyler Robinson's arrival at the Washington County Sheriff's Office, conducted in the early morning hours of September 12, 2025. Personal identifiers other than the interviewers' names and the date, time, location, and duration of the interview may be redacted — the existence, custodian, and metadata of the original interview record are the core of this request.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "brooksby-severance",
      short: "Brooksby's severance",
      categories: ["Personnel & credibility"],
      entities: ["brooksby", "wcso-ent"],
      investigator: "Baron Coleman · public reporting",
      investigatorLinks: [
        { label: "Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "Washington County Sheriff Nate Brooksby resigned March 27, 2026 amid sexual-harassment and investigation-interference allegations, with a reported ~$100,000 severance — and the official turn-in timeline in the state's biggest case begins and ends with him.",
      implication: "Public-employee separation agreements are generally public records under GRAMA once finalized. The severance agreement and the scope of the interference allegations bear directly on the credibility of the turn-in narrative he anchored.",
      sources: [
        { label: "Utah reporting, late March 2026", url: "" }
      ],
      requests: [
        {
          agencyId: "washco",
          summary: "Washington County — the separation agreement and severance terms",
          subject: "GRAMA Request: separation/severance agreement for former Sheriff Nate Brooksby",
          records: "I request the separation agreement, severance agreement, or settlement agreement between Washington County and former Sheriff Nate Brooksby executed on or about March 2026, including the monetary terms and any confidentiality or non-disparagement provisions. Finalized settlement and severance agreements of public employees are public records under GRAMA.",
          ask_no_records: true
        },
        {
          agencyId: "washco",
          summary: "Washington County — the outcome record of the internal investigation",
          subject: "GRAMA Request: disposition of internal investigation concerning the former sheriff",
          records: "I request the record of final disposition or outcome of any internal or independent investigation of former Sheriff Nate Brooksby that concluded, was closed, or was pending at his March 2026 resignation — including the categories of allegations examined (as characterized in the disposition record) and the finding, if any. I am not requesting witness statements or the investigative file itself, only the disposition record.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "fifth-letter",
      short: "The Fifth-Amendment letter",
      categories: ["Personnel & credibility"],
      entities: ["robinson", "wcso-ent"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "A letter from prosecutor Ryan McBride to the Washington County Sheriff instructs personnel not to mention Robinson's invocation of his Fifth Amendment rights — Coleman displayed it on stream.",
      implication: "The letter has been publicly displayed, which undercuts any confidentiality claim over the document itself. Both ends of the correspondence — the prosecutor's office and the sheriff's office — hold copies.",
      sources: [
        { label: "Displayed on Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      requests: [
        {
          agencyId: "wcso",
          summary: "WCSO — its copy of the McBride letter and any reply",
          subject: "GRAMA Request: correspondence from the Utah County prosecutor concerning statements by sheriff's office personnel",
          records: "I request the letter sent by or on behalf of prosecutor Ryan McBride (Utah County) to the Washington County Sheriff or Sheriff's Office concerning statements by sheriff's office personnel about Tyler Robinson's invocation of his Fifth Amendment rights, together with any written response or internal distribution memo. A version of this letter has already been publicly displayed; I request the office's copy as held.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "ballistics-inconclusive",
      short: "Ballistics inconclusive",
      categories: ["Physical evidence"],
      entities: ["robinson", "sbi"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 142 — Day Four", url: "https://www.youtube.com/watch?v=6ZZ_e53ZDnY" }
      ],
      status: "confirmed",
      finding: "Day-four testimony: the comparison of the recovered bullet-jacket fragment to the charged rifle was \"inconclusive\" — it \"could not be identified or excluded\" — and the examiner measured the fragment at .286–.301 inches, below the .308-inch bullet diameter of a .30-06. A GSR analysis was performed on the car and never introduced.",
      implication: "The state's physical case never connects the fragment to the rifle. The lab reports behind the measurement, the inconclusive comparison, and the unintroduced GSR analysis are discrete, numbered lab records (Exhibit 6/6A, lab item 25 W41). Expect a § 63G-2-305(10) denial while the prosecution is pending — the written denial documents what the lab holds.",
      sources: [
        { label: "VERIFIED against day-4 courtroom audio: ATF examiner Samantha Carner (defense witness); Exhibit 32 read into the record — \"cannot be identified or excluded... inconclusive\"; her measured range .286–.301\"", url: "" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/crime lab — the firearms report and the never-introduced GSR analysis",
          subject: "GRAMA Request: firearms comparison report and gunshot-residue analysis, State v. Robinson evidence",
          records: "I request, concerning laboratory analyses in the Utah Valley University homicide investigation of September 10, 2025: (1) the firearms examination report documenting the measurement of the recovered bullet-jacket fragment (lab item referenced in preliminary-hearing testimony as 25 W41 / Exhibit 6) and the comparison of that fragment to the recovered rifle, including the reported result; and (2) the gunshot-residue (GSR) analysis performed on the Dodge Challenger associated with the case, including the result. Both analyses were referenced in public preliminary-hearing testimony on July 9, 2026.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "prints-excluded",
      short: "Prints exclude Robinson",
      categories: ["Physical evidence"],
      entities: ["robinson", "sbi", "fbi-ent"],
      investigator: "Day 4 courtroom record",
      investigatorLinks: [
        { label: "Day 4 court stream (TriggerSmart)", url: "https://www.youtube.com/watch?v=t1Dl8_AkFU8" }
      ],
      status: "confirmed",
      finding: "A stipulation read into the day-four record: SBI latent-print examiner Elisa Farmer found three latent prints of comparable value on the window glass below the roof descent point — and EXCLUDED Tyler Robinson as the source of all three. Subsequent FBI re-examinations were inconclusive. The state's counter, via its crime-scene sergeant: the enhanced video shows the suspect never touched the glass.",
      implication: "Someone else's prints are on the glass at the descent point, by the state's own stipulation. The latent-print report, the FBI re-examination records, and any effort to identify whose prints they are — all discrete, named records. If nobody ever ran the prints against anyone but Robinson, that absence is itself the finding.",
      sources: [
        { label: "Day 4 courtroom audio: stipulation read into the record (prints 11B, 11C, 11D); sergeant's \"did not touch\" testimony", url: "" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — the latent-print report and any identification efforts on the excluded prints",
          subject: "GRAMA Request: latent print examination report, State v. Robinson evidence",
          records: "I request, concerning the Utah Valley University homicide investigation: (1) the SBI latent-print examination report (examiner Elisa Farmer) covering the latent prints designated 11B, 11C, and 11D recovered from the window glass below the roof descent point, whose conclusions — including the exclusion of the defendant as the source — were stipulated on the public record at the July 9, 2026 preliminary hearing; and (2) any record of database searches (AFIS/NGI) or comparisons run to identify the actual source of those three prints, including the result or a record that no such search was run.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "dna-elimination",
      short: "Roommate DNA, “elimination”",
      categories: ["Physical evidence"],
      entities: ["robinson", "twiggs", "sbi"],
      investigator: "Ian Carroll",
      investigatorLinks: [
        { label: "Final recap — the DNA day, summarized", url: "https://www.youtube.com/watch?v=R7mdXcBfQTw" }
      ],
      status: "confirmed",
      finding: "Wednesday's DNA testimony put Robinson's DNA on the rifle, the cartridges, the screwdriver, and the towel — and Lance Twiggs's DNA on the towel and the screwdriver too. Twiggs was presented as an “elimination sample”: his DNA was expected on household items and should be disregarded when found. Every one of those items traces to the residence the two shared.",
      implication: "An elimination designation is a decision, and decisions leave records. The lab reports showing all contributors on each item, and the case record designating whose reference samples were treated as elimination standards (versus investigated as alternative access), are discrete, numbered lab documents. Expect a § 63G-2-305(10) denial while the prosecution is pending — the written denial still puts what the lab holds on paper.",
      sources: [
        { label: "DNA-day testimony (day 3 afternoon), incl. the elimination-sample characterization", url: "" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/crime lab — the full-contributor DNA reports and the elimination-standard designation",
          subject: "GRAMA Request: DNA analysis reports and reference-standard designations, State v. Robinson evidence",
          records: "I request, concerning laboratory DNA analyses in the Utah Valley University homicide investigation: (1) the DNA examination report(s) for the towel and the screwdriver referenced in July 2026 preliminary-hearing testimony, including all contributor findings for each item; and (2) the case record designating which individuals' reference samples were treated as elimination standards in those analyses, and the basis recorded for each designation. Both items were the subject of public preliminary-hearing testimony.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "state-plane",
      short: "The night flight south",
      categories: ["Timeline contradictions"],
      entities: ["davis", "sbi"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "Agent Davis testified he flew to St. George the night of September 11 — a state aircraft landed there at ~11:37 p.m. — putting lead investigators in Washington County hours after the earliest claimed custody time.",
      implication: "State aircraft generate flight logs and passenger manifests. Who flew south that night, and when the flight was tasked, is a hard timestamp against the shifting custody timeline.",
      sources: [
        { label: "Day 3 testimony; public flight tracking", url: "" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS Aero Bureau — flight log and manifest for the Sept 11 flight south",
          subject: "GRAMA Request: DPS aircraft flight records, September 11–12, 2025",
          records: "I request the flight log, tasking record, and passenger manifest for any Utah Department of Public Safety aircraft flight from the Salt Lake City area to St. George or Washington County on September 11, 2025 (including the flight arriving at approximately 11:37 p.m.), and any return flight through September 12, 2025 — including the time the flight was requested and by whom.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "me-chain",
      short: "Seven fragments vs. four",
      categories: ["Physical evidence"],
      entities: ["davis", "sbi"],
      investigator: "Ian Carroll",
      investigatorLinks: [
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" }
      ],
      status: "confirmed",
      finding: "The lead investigator testified the ME report's front page recites investigative information that didn't come from his team — and on day four, the firearms examiner testified the medical examiner documented potentially SEVEN bullet fragments while she received FOUR, a discrepancy she learned of only \"a few months ago.\"",
      implication: "Three fragments of the bullet that killed Charlie Kirk are unaccounted for between the autopsy table and the firearms lab. The transmittal and chain-of-custody paperwork — who transferred what to whom, when — is administrative record-keeping, and it's exactly where both the missing-fragments and whose-information-is-on-the-front-page questions live.",
      sources: [
        { label: "Day 2 testimony; Day 4 cross VERIFIED against courtroom audio (\"potentially seven fragments from the medical examiner in a photo\"; Exhibit 6 as received: one jacket fragment + four lead fragments)", url: "" }
      ],
      requests: [
        {
          agencyId: "ome",
          summary: "Medical Examiner — the transmittal and chain-of-custody paperwork (not the autopsy)",
          subject: "GRAMA Request: evidence transmittal and chain-of-custody records, September 2025 case",
          records: "I request, concerning the Office of the Medical Examiner case arising from the September 10, 2025 death at Utah Valley University: (1) the evidence transmittal or release forms documenting transfers of physical evidence (including bullet or projectile fragments, fingerprint records, and photographic media) to any law-enforcement agency; and (2) the log identifying the agencies or officials who provided investigative information incorporated into the case file's administrative cover documentation. I am NOT requesting the autopsy report, photographs, or any medical findings — administrative transfer records only.",
          ask_no_records: true
        }
      ]
    }
  ],

  /* The holes in the case — records everyone can see are missing from the public
   * account. Each gap links to the findings that imply it and to the specific
   * requests aimed at it. The graph view renders gaps as dashed nodes and lights
   * them up as requests go out (glow) and come back (solid). */
  gaps: [
    { id: "gap-wcso-video", label: "Where's the turn-in video?",
      question: "\"Deleted\" under a 30-day retention claim, per testimony — yet the state exhibited cropped surrender footage on day four. The retention schedule, deletion authorization, and litigation-hold paper trail say which story is true.",
      findings: ["wcso-intake-video"],
      requests: [{ inv: "wcso-intake-video", idx: 0 }] },
    { id: "gap-custody-time", label: "Which custody time is real?",
      question: "9:00 p.m., 10:00 p.m., 10:26 p.m., and a 4:00 a.m. formal arrest — all sworn, all different. The booking record and CAD logs are the primary sources that reconcile them.",
      findings: ["custody-timeline", "state-plane", "twiggs-location"],
      requests: [{ inv: "custody-timeline", idx: 0 }, { inv: "custody-timeline", idx: 1 }] },
    { id: "gap-badge-man", label: "Who's the badge-man?",
      question: "An armed man in civilian clothes with a badge went up to the sniper rooftop with Officer Bagley — name and agency never obtained, per Bagley's own testimony. The scene access log and deployment rosters would name him.",
      findings: ["bagley-bodycam"],
      requests: [{ inv: "bagley-bodycam", idx: 2 }, { inv: "second-roof-round", idx: 1 }] },
    { id: "gap-recovery-bodycam", label: "Where's the recovery bodycam?",
      question: "The state's crime-scene sergeant confirmed on day four that an officer's body camera was rolling during the rifle recovery. Nobody outside the case has seen a frame of it.",
      findings: ["bagley-bodycam"],
      requests: [{ inv: "bagley-bodycam", idx: 1 }] },
    { id: "gap-fragments", label: "Where are 3 fragments?",
      question: "The medical examiner documented potentially seven bullet fragments; the firearms lab received four. Three fragments of the bullet that killed Charlie Kirk are unaccounted for between the autopsy table and the lab.",
      findings: ["me-chain", "ballistics-inconclusive"],
      requests: [{ inv: "me-chain", idx: 0 }] },
    { id: "gap-prints", label: "Whose prints are 11B/C/D?",
      question: "Three latent prints on the window glass below the descent point exclude Robinson, by stipulation. Were they ever run against anyone else — or only against him?",
      findings: ["prints-excluded"],
      requests: [{ inv: "prints-excluded", idx: 0 }] },
    { id: "gap-gsr", label: "What did the GSR say?",
      question: "A gunshot-residue analysis was performed on the Dodge Challenger and never introduced. A result helpful to the state usually gets introduced.",
      findings: ["ballistics-inconclusive"],
      requests: [{ inv: "ballistics-inconclusive", idx: 0 }] },
    { id: "gap-tpusa-names", label: "Who were the TPUSA reps?",
      question: "Testimony placed Robinson in contact with TPUSA representatives at the quad the morning of the shooting. The state didn't name them; no footage has been shown. UVU's event credentialing records would.",
      findings: ["tpusa-contact"],
      requests: [{ inv: "tpusa-contact", idx: 0 }, { inv: "tpusa-contact", idx: 1 }] },
    { id: "gap-paving-order", label: "Who ordered the paving?",
      question: "The lead investigator didn't authorize the courtyard work and learned of it from the news; the contractor says \"the FBI and the Governor of Utah.\" Somebody's signature is on the work order.",
      findings: ["paved-scene"],
      requests: [{ inv: "paved-scene", idx: 0 }, { inv: "paved-scene", idx: 1 }] },
    { id: "gap-noble-occupants", label: "Who was in the car?",
      question: "The homeowners' report describes the driver of Robinson's car as bald, with three other people in the car — omitted on direct while the clip was presented as Robinson returning alone. Who were the four?",
      findings: ["noble-report"],
      requests: [{ inv: "noble-report", idx: 0 }] },
    { id: "gap-cut-minutes", label: "What's in the cut minutes?",
      question: "1:16 missing from the 11:53 clip, stairwell cuts out of order, a 55-minute garage gap presented as continuous. The unedited native exports answer whether it's sloppy or deceptive.",
      findings: ["cut-footage"],
      requests: [{ inv: "cut-footage", idx: 0 }] },
    { id: "gap-exhibit-14", label: "What did the 14 see?",
      question: "The “conclusive” video was shown once, off camera, to 14 in-person seats — and per the journalists in the room, it “isn't going to be released publicly.” The native camera exports and the exhibit-creation paper trail answer what it actually shows.",
      findings: ["exhibit-121"],
      requests: [{ inv: "exhibit-121", idx: 0 }, { inv: "exhibit-121", idx: 1 }] },
    { id: "gap-panguitch", label: "Was the Panguitch tip run down?",
      question: "Two witnesses, a 100% ID, a card payment with a hard timestamp — reported to the FBI, never followed up per the witnesses, never contacted by either side. If it was run down and excluded, the log shows it. If it wasn't, the state built a timeline nobody tested against it.",
      findings: ["panguitch-alibi", "custody-timeline", "noble-report"],
      requests: [{ inv: "panguitch-alibi", idx: 0 }, { inv: "panguitch-alibi", idx: 1 }] },
    { id: "gap-motive-author", label: "Who wrote the motive?",
      question: "The state's own centerpiece witness never heard Robinson mention Charlie Kirk — yet officials told the country the motive within 72 hours. Somebody briefed them. The briefing records have authors and dates.",
      findings: ["motive-testimony"],
      requests: [{ inv: "motive-testimony", idx: 0 }] },
    { id: "gap-discord-when", label: "When were the Discord messages sent?",
      question: "The most-reported confessions of September 2025 never appeared at the hearing. If the acquisition records show they post-date custody, the timeline problem becomes the case's problem.",
      findings: ["discord-timing", "custody-timeline"],
      requests: [{ inv: "discord-timing", idx: 0 }] },
    { id: "gap-elimination", label: "Eliminated — or never examined?",
      question: "The roommate's DNA is on the towel and the screwdriver, and the lab was told to expect and disregard it. Was alternative access ever examined, or designated away?",
      findings: ["dna-elimination"],
      requests: [{ inv: "dna-elimination", idx: 0 }] }
  ]
};
