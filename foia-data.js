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
    { id: "ucso", name: "Utah County Sheriff's Office", email: "SheriffRecords@utahcounty.gov",
      portal: "https://utah-county-ut.nextrequest.com/",
      submitNote: "UCSO Records takes requests by email (SheriffRecords@utahcounty.gov, verified on the sheriff's records page) or Utah County's NextRequest portal. Quirks: photo ID before release; reports start at $15; body/dash cam $20 per case plus staff time; 10 business days. Records office: 3075 North Main, Spanish Fork (801-851-4500)." },
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
    { id: "gov", name: "Office of the Governor of Utah", email: null,
      portal: "https://openrecords.utah.gov",
      submitNote: "State agency — file through Utah's Open Records Portal (openrecords.utah.gov, UtahID account required) addressed to the Office of the Governor. Direct records-officer contact unverified; the portal is the reliable route." },
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
    { id: "uvu-ent", name: "UVU", type: "org" },
    { id: "sbi", name: "Utah SBI / DPS", type: "org" },
    { id: "wcso-ent", name: "Washington County SO", type: "org" },
    { id: "fbi-ent", name: "FBI", type: "org" },
    { id: "tpusa", name: "TPUSA", type: "org" }
  ],

  investigations: [
    {
      id: "wcso-intake-video",
      categories: ["Missing & deleted footage"],
      entities: ["robinson", "davis", "brooksby", "wcso-ent"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141 — Days Two and Three", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "The Washington County Sheriff's Office video of Robinson's turn-in — the moment the official timeline starts — was reportedly deleted, per day-three testimony. A news organization's records request for it was refused, then answered with a 30-day-retention deletion claim — while court pleadings reportedly suggest the footage exists in law-enforcement hands.",
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
          ask_no_records: true
        }
      ]
    },
    {
      id: "custody-timeline",
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
          ask_no_records: true
        },
        {
          agencyId: "wcso",
          summary: "WCSO — dispatch/CAD log for the night of the turn-in",
          subject: "GRAMA Request: CAD/dispatch records, evening of September 11, 2025",
          records: "I request the computer-aided dispatch (CAD) log entries and radio log records for the Washington County Sheriff's Office for September 11, 2025, 6:00 p.m. through September 12, 2025, 6:00 a.m., concerning the arrival, custody, or processing of any individual in connection with the Utah Valley University homicide investigation. Redaction of unrelated calls for service is acceptable.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "bagley-bodycam",
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
      categories: ["Physical evidence"],
      entities: ["schneider", "davis", "sbi", "uvu-ent"],
      investigator: "Baron Coleman · Ian Carroll",
      investigatorLinks: [
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" },
        { label: "Coleman Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "contested",
      finding: "A .223 round was found September 10 on the computer science building roof — a different caliber than the charged rifle — documented by SBI Agent Ben Schneider, written off as an officer cycling his rifle, with testimony that there was \"no line of sight\" to the tent. A drone-photogrammetry rendering (Paramount Tactical) shows a direct line of sight at ~320–350 yards.",
      implication: "Either an officer left a live round on a rooftop and the scene wasn't preserved, or the round mattered and wasn't treated as evidence. Schneider's report, the evidence log, and any overwatch deployment records are all discrete named documents. (Status contested: the round and its official accounting are testimony; the line-of-sight dispute is outside analysis.)",
      sources: [
        { label: "Day 2 + Day 3 testimony; Paramount Tactical 3D rendering", url: "" }
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
          ask_no_records: true
        },
        {
          agencyId: "orem",
          summary: "Orem PD — same K9 records for its units, if deployed",
          subject: "GRAMA Request: K9 unit deployment records, UVU response, September 10–11, 2025",
          records: "I request the K9 deployment or utilization records for any City of Orem canine unit deployed in connection with the Utah Valley University incident response on September 10–11, 2025 — including handler logs identifying each unit, its certification/discipline, its tasking, and the recorded outcome.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "paved-scene",
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
          ask_no_records: true
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
      id: "tpusa-contact",
      categories: ["Witness statements", "Video evidence"],
      entities: ["robinson", "tpusa", "uvu-ent"],
      investigator: "Baron Coleman · Buckley Carlson · Ian Carroll",
      investigatorLinks: [
        { label: "Bombshells crossover (Liberty Lockdown)", url: "https://www.youtube.com/watch?v=Fk4RFSn6gqs" },
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" }
      ],
      status: "confirmed",
      finding: "Testimony on both day two and day three placed Robinson making contact with TPUSA representatives at the quad the morning of the shooting, while the event was being set up — a fact never previously disclosed. The state did not name the representatives, and no footage of the contact has been shown.",
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
      id: "mitchell-statements",
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
      id: "state-plane",
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
      categories: ["Physical evidence"],
      entities: ["davis", "sbi"],
      investigator: "Ian Carroll",
      investigatorLinks: [
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" }
      ],
      status: "confirmed",
      finding: "The lead investigator testified the medical examiner report's front page recites investigative information that didn't come from his team; the autopsy evidence — fingerprints, photos, bullet fragments — reached him on a CD via chain of custody.",
      implication: "The autopsy report itself is statutorily restricted — but the chain-of-custody and transmittal paperwork around it (who transferred what to whom, when) is administrative record-keeping, and it's exactly where the \"whose information is on the front page\" question lives.",
      sources: [
        { label: "Day 2 testimony", url: "" }
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
  ]
};
