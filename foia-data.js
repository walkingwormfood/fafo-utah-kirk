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
    statuteFederal: "Freedom of Information Act, 5 U.S.C. \u00a7 552",
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
      "Expedited response: I request the 5-business-day expedited response under Utah Code § 63G-2-204(4)(b). Expedited " +
      "release benefits the public rather than a person: these records concern a pending public prosecution that is the " +
      "subject of widespread and ongoing public attention, and I am primarily engaged in disseminating information — I " +
      "will make the records available to the general public through a public records docket — the circumstance " +
      "§ 63G-2-204(5) presumes to benefit the public.",
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
  boilerplateFederal: {
    burden_carveout:
      "To minimize processing burden, I am not requesting classified information, sensitive security or " +
      "law-enforcement methodologies, or private personal information unrelated to official government business. " +
      "This request seeks records of official government activity only.",
    fee_waiver:
      "Fee waiver: I request a waiver of all fees under 5 U.S.C. \u00a7 552(a)(4)(A)(iii). Disclosure meets each factor of the " +
      "public-interest standard: (1) the subject specifically concerns the identifiable government operations, programs, or " +
      "investigations described in this request; (2) disclosure is meaningfully informative about those operations and how " +
      "they are conducted; (3) it will contribute to public understanding at large, not merely my own, because I will make " +
      "the records available to the general public; and (4) it is likely to contribute significantly to public understanding " +
      "of how federal authority is exercised and how government programs and investigations are authorized and conducted. " +
      "This request is not in my commercial interest and is not made for a commercial purpose. If a fee waiver is denied, " +
      "please notify me before incurring any costs over $25.",
    deadline:
      "I look forward to your determination on this request within the 20 business days provided by " +
      "5 U.S.C. \u00a7 552(a)(6)(A)(i).",
    expedited:
      "Expedited processing: I request expedited processing under 5 U.S.C. \u00a7 552(a)(6)(E) on two grounds. " +
      "(1) There is an urgency to inform the public about actual or alleged federal government activity, and I am a " +
      "person primarily engaged in disseminating information: I publish the government records I obtain through a " +
      "public records docket available to the general public. (2) This request concerns a matter of widespread and " +
      "exceptional media interest in which there exist possible questions about the government\u2019s integrity that " +
      "affect public confidence. I certify that the foregoing is true and correct to the best of my knowledge and belief.",
    segregability:
      "If any portion of a responsive record is withheld, please cite the specific FOIA exemption claimed and release " +
      "all reasonably segregable non-exempt portions, as required by 5 U.S.C. \u00a7 552(b).",
    no_records:
      "If no responsive records exist, I request written confirmation of that fact, including a description of the " +
      "search conducted.",
    format:
      "Please provide responsive records in electronic format (searchable PDF or native file) by email where possible.",
    closing:
      "Please confirm receipt and provide a tracking number. I am happy to clarify or reasonably narrow this request " +
      "if that would speed processing.\n\nSincerely,\n{{NAME}}\n{{EMAIL}}"
  },

  /* Utah entities. email: null => portal/form-only (copy + deep-link).
   * Submission routes verified July 2026 (per-entity audit; quirks in submitNote). */
  agencies: [
    { id: "fbi", name: "Federal Bureau of Investigation", email: null, fed: true,
      portal: "https://efoia.fbi.gov",
      submitNote: "FBI takes FOIA only through its eFOIPA portal (efoia.fbi.gov); its email address is for questions only.",
      portalNote: "eFOIPA works best as one subject per submission — don't combine requests. The link lands on the eFOIPA home page: click through the agreement step to reach the form (it's an interactive app behind reCAPTCHA, so there's no deep link and no scripted filing — a human clicks it through). Choose the request type for records about a topic/organization (not about yourself), and paste the portal version into the request-description box; the form collects your name, address, and fee preference in its own fields." },
    { id: "atfagency", name: "Bureau of Alcohol, Tobacco, Firearms and Explosives", email: null, fed: true,
      portal: "https://dojatf.secureocp.com/app/Home.aspx",
      submitNote: "This button opens ATF's FOIA Public Access Portal directly (dojatf.secureocp.com). Register or Sign In, then submit the request — ATF takes FOIA ONLY through this portal and no longer accepts email (verified Jul 2026); the registration confirmation comes from noreply@ains.com, so safelist it. Paste the request text into the description field; the portal collects your name, address, and fee preference in its own fields. Requester Service Center: 202-648-8740. Expect Exemption 7(A) claims while the related prosecution is pending — and don't count on the denial fixing what records exist: the Jul 20, 2026 full denial of 2026-01995 came with no document inventory and no segregability finding." },
    { id: "dod", name: "U.S. Department of Defense (OSD / Joint Staff — WHS)", email: null, fed: true,
      portal: "https://pal.whs.mil/",
      submitNote: "This button opens the OSD/Joint Staff FOIA Public Access Link portal directly (pal.whs.mil) — the actual request form, skipping the WHS info page. This office (OSW/JS FOID) processes records held by the Office of the Secretary of Defense/Joint Staff, which explicitly includes Public Affairs and the OSD-level offices — so it's the right one for both DoD asks here (OSD strategic-communications contracting and DoD public-affairs activity). Paste the request text into the form. DoD's own fee-waiver factors are at 32 C.F.R. § 286.28(d), and its expedite standard at 32 C.F.R. § 286.28 — the request's statutory § 552 language covers you, but you can cite the DoD reg if the form asks. If a record turns out to belong to a different DoD component (e.g., Department of the Army), WHS refers it, or file that component via FOIA.gov. KNOWN ISSUE (Jul 2026): PAL's account registration is broken for at least some requesters — account creation completes without a password step and sends no registration email, and the password-recovery flow reports success but never delivers (while PAL's identification-code emails from donotreply@mail.mil deliver fine). A written fix request is pending with the OSD/JS Requester Service Center (sent Jul 26, 2026, tied to case 26-F-2781) asking for a server-side reset or confirmation that all correspondence and records will be delivered by email. Until resolved: file via FOIA.gov or the portal form works without login; treat email as the record." },
    { id: "epa", name: "U.S. Environmental Protection Agency", email: null, fed: true,
      portal: "https://www.epa.gov/foia",
      submitNote: "EPA takes FOIA electronically — via its FOIAXpress public access link (epa.gov/foia) or FOIA.gov — or by mail to the National FOIA Office. FOIAonline is retired; email submission is not offered." },
    { id: "navsea", name: "U.S. Navy — Naval Sea Systems Command (NAVSEA)", email: "NAVSEAFOIA@navy.mil", fed: true,
      portal: "https://www.securerelease.us",
      submitNote: "NAVSEA — the parent command of NSWC Crane — accepts FOIA by email (NAVSEAFOIA@navy.mil), the SecureRelease portal (securerelease.us), FOIA.gov, or mail (Commander, NAVSEA, SEA 00A5, FOIA/Privacy Program Division, 1333 Isaac Hull Ave SE, Washington Navy Yard, DC 20376-2101). Requester Service Center: 202-781-4124." },
    { id: "usss", name: "U.S. Secret Service", email: null, fed: true,
      portal: "https://www.securerelease.us/create-request",
      formAnswers: [
        { label: "Agency (SecureRelease step 1 — USSS is not a top-level option; pick this, then United States Secret Service as the component)", value: "Department of Homeland Security" }
      ],
      submitNote: "As of Oct 2025, USSS takes FOIA only through its SecureRelease portal (securerelease.us) or by mail — no email. The portal is DHS-wide: step 1 asks for Agency (Department of Homeland Security) then Component (United States Secret Service) — the same path the Jul 25, 2026 filing took." },
    { id: "uvu", name: "Utah Valley University (records office)", email: null,
      portal: "https://uvu.nextrequest.com/",
      submitNote: "UVU takes GRAMA requests through its NextRequest portal (uvu.nextrequest.com); UVU Policy 133 also accepts written requests to the GRAMA officer (grama@uvu.edu). Fees per Policy 133: $25/hr compiling and redaction, copy charges, prepayment possible over $50; ~10 business days; denials appeal to the VP of Finance and Administration within 30 days.",
      portalNote: "NextRequest auto-creates an account from the email you enter on submission." },
    { id: "uvupd", name: "UVU Police Department", email: "uvpdrecords@uvu.edu",
      portal: "https://www.uvu.edu/police/",
      submitNote: "UVU PD takes records requests directly by email (uvpdrecords@uvu.edu, verified on the department's records page) or in person (GT 331, Gunther Trades Building, Orem campus). Minimum fee $20 for police records." },
    { id: "usu", name: "Utah State University (records office / USU PD)", email: "grama@usu.edu",
      portal: "https://www.usu.edu/legal/grama/",
      submitNote: "USU takes GRAMA through the online form at usu.edu/legal/grama, routed to the USU Records Manager — grama@usu.edu is the office's published contact (verified Aug 7, 2026 against USU's own GRAMA page and Policy 548). 10 business days; reasonable-fee authority; all fees payable before release. USU PD records go through this same central route." },
    { id: "dfcm", name: "Utah Division of Facilities Construction and Management (DFCM)", email: null,
      portal: "https://openrecords.utah.gov/",
      submitNote: "DFCM is a state agency under the Dept. of Government Operations — file GRAMA through the state Open Records Portal (openrecords.utah.gov) naming DFCM, or via dfcm.utah.gov/contact-us/. UVU's own Dec 15, 2025 denial letter formally directed requesters to DFCM under § 63G-2-204(4)(b)(iii) for the courtyard work records." },
    { id: "dps", name: "Utah Department of Public Safety (SBI, Aero Bureau)", email: null,
      portal: "https://publicsafetyutah.govqa.us/WEBAPP/_rs/SupportHome.aspx",
      submitNote: "DPS runs a department-wide GovQA Records Center — submission starts with a division picker; no records email is published, the portal is the route. Fees and payment run through the portal.",
      portalNote: "Pick the division that holds the record: State Bureau of Investigation for investigative/deployment records, or the video/GRAMA request category. The Aero Bureau isn't its own picker entry — if absent, file under the department-level GRAMA option and name the Aero Bureau in the text. The form's 'Involved Parties' field is how records staff route and locate the file: name the record's author or subject (examiner, deputy, witness), the defendant, and the victim, each with their role; unknown names can be described ('interviewing detective, name unknown — identification is part of the request'). The form also demands a file attachment — a driver-license photo satisfies it (.jpeg or .pdf, not .heic) — and an occurrence date: September 10, 2025, not the hearing date." ,
      formAnswers: [
        { label: "Incident involved fatality?", value: "Yes — the September 10, 2025 homicide at Utah Valley University" },
        { label: "Relationship to incident", value: "Member of the Media — records are published to a free, non-commercial public docket" },
        { label: "Citation number", value: "None — this is a records request, not citation-related" },
        { label: "Case number", value: "Unknown to requester — please locate via the involved parties and date of occurrence" }
      ] },
    { id: "ucso", name: "Utah County Sheriff's Office", email: null,
      portal: "https://utah-county-ut.nextrequest.com/",
      submitNote: "UCSO GRAMA goes through Utah County's NextRequest portal — field-tested Jul 9, 2026: the SheriffRecords@utahcounty.gov address on the sheriff's records page auto-replies that it's UNMONITORED and routes you to NextRequest. Quirks: photo ID before release; reports start at $15; body/dash cam $20 per case plus staff time; 10 business days. Records office: 3075 North Main, Spanish Fork (801-851-4500).",
      portalNote: "NextRequest auto-creates an account from the email you enter on submission. If you're not the subject of the record, the confirmation email lists ID-upload options — for public records (logs, retention schedules) none is needed." },
    { id: "ucao", name: "Utah County Attorney's Office", email: "ucao@utahcounty.gov",
      portal: "https://utah-county-ut.nextrequest.com/",
      submitNote: "Utah County's GRAMA process is centralized in the County Attorney's Office — email ucao@utahcounty.gov or the NextRequest portal; the county web form requires a photo-ID upload. Mail: 100 East Center Street, Suite 2100, Provo. Expect § 63G-2-305(10) claims on anything touching the open prosecution — the written denial is still the point." },
    { id: "wcso", name: "Washington County Sheriff's Office", email: null,
      portal: "https://news.washeriff.net/public-services/grama-request/",
      submitNote: "WCSO takes GRAMA through its own web form (no login) — no records email is published, don't trust addresses from aggregator sites. Quirks: ALL fields are required, including date of birth and daytime phone; reports minimum $5; DO NOT PREPAY — payment instructions come by email after processing; 10 working days. Office: 620 South 5300 West, Hurricane (435-656-6500). Field-tested through a full response cycle Jul 22, 2026: substantive replies come from records@washeriff.net (Records Officer Sherrie Maxwell) as a letter PDF; expect fee-waiver denial on anything requiring redaction (lowest-paid-capable-employee rate, first 15 minutes free) and a hold — redaction does not begin until you reply accepting the fee. Replies are \"valid and on file for 30 days\"; appeals go to Sheriff Barry Golding as CAO within 30 days, by mail to 750 S 5300 W, Hurricane, UT 84737.",
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
    { id: "slcda", name: "Salt Lake City Department of Airports (SLC Corp)", email: null,
      portal: "https://www.slc.gov/recorder/grama/",
      submitNote: "ROUTE NOT YET AUDITED — Salt Lake City Corporation GRAMA intake runs through the City Recorder (slc.gov/recorder/grama; the city has used a NextRequest-style portal). Verify the current intake and that the Department of Airports doesn't take GRAMA directly before filing. The airport is a city department, so its landing reports and access logs are city records under GRAMA." },
    { id: "gov", name: "Office of the Governor of Utah", email: "aduncan@utah.gov", emailSubject: "GRAMA Request",
      portal: "https://openrecords.utah.gov",
      submitNote: "Email the records officer directly: Adam Duncan (aduncan@utah.gov, 801-538-1046), Public Records Officer, Governor's Office, State Capitol Complex, SLC 84114 — verified via the state Open Records Portal directory, Jul 15, 2026. The central portal does NOT take the request itself for this entity (it redirects to an 'Agency GRAMA Website' whose button is a dead link as of Jul 15, 2026). § 63G-2-204 requires your name, mailing address, email, and daytime phone in the request body." },
    { id: "ome", name: "Utah Office of the Medical Examiner (DHHS)", email: null,
      portal: "https://secured.utah.gov/ut-archives/Forms/Page/ut-archives/orp/0",
      formAnswers: [
        { label: "Agency Name — type \"medical examiner\" into the search and pick this entry (read off the live portal Aug 4, 2026)", value: "Department of Health and Human Services (DHHS) > Clinical Services (DHHS) > Office of the Medical Examiner (DHHS)" }
      ],
      submitNote: "ME case records (autopsy, toxicology, investigative reports) are NOT ordinary GRAMA records — Utah Code § 26B-8-217 restricts them to next of kin, legal representatives, treating physicians, and law enforcement, and § 26B-8-217(8) bars other disclosure absent a court order. The requests here deliberately target administrative paper (transmittal, chain-of-custody, personnel, permits) instead. ROUTE (per OME’s own Families page, verified Aug 4, 2026): mail the letter — notarized, or with their record-request form — to Utah Office of the Medical Examiner, 4451 South 2700 West, Taylorsville, UT 84129; the office commits to responding within 3 business days of receipt for reports. In person: same address, Mon–Fri 8–5 with photo ID. The my.utah.gov e-ordering lane is only for § 26B-8-2 authorized requesters (next-of-kin, guardians, attorneys with a signed release or court order) ordering case reports — not the lane for these administrative GRAMA asks. Phone: (801) 816-3850. Expect the office to test the 217 boundary in its response.",
      portalNote: "FILE HERE: the button opens the Open Records Portal (openrecords.utah.gov redirects here). In the Agency Name search, type \"medical examiner\" and pick the entry shown in the copy row below, then click Request Records — the form itself opens on ut.accessgov.com under your Utah ID login. Paste the request text into the description box. The portal lists OME’s public records officers directly: Anna Bond (abond@utah.gov) and Danielle Youngdell (dyoungdell@utah.gov), 801-816-3870 — a named-officer email lane if the form misbehaves. Reference material, not a filing lane: OME’s own Families page (ome.utah.gov/for-families/) documents its report-request process for next-of-kin — its Record Request Form (ome.utah.gov/wp-content/uploads/Record-Request-Form-2026.pdf) and mailing address (4451 South 2700 West, Taylorsville, UT 84129) work as a parallel paper channel if the portal stalls, and the page’s 3-business-day response commitment is quotable." },
    { id: "provo", name: "Provo Police Department (City of Provo)", email: null,
      portal: "https://www.provo.gov/697/Police-GRAMA-Request",
      submitNote: "Provo takes police GRAMA requests through its own records page (provo.gov/697 — Police GRAMA Request); Records Office 801-852-6231. Route verified Aug 2, 2026." },
    { id: "pgpd", name: "Pleasant Grove Police Department", email: null,
      portal: "https://www.pgcityutah.gov/departments/police/index.php",
      submitNote: "CONFIRM ADDRESS BEFORE SENDING — no dedicated records email surfaced in the Aug 2, 2026 verification pass. Check pgcityutah.gov for the records officer/city recorder or call 801-785-3506 (108 South 100 East, Pleasant Grove, UT 84062)." },
    { id: "uvdispatch", name: "Utah Valley Dispatch Special Service District", email: null,
      portal: "https://openrecords.utah.gov/",
      submitNote: "File via the state Open Records portal (entity: Utah Valley Dispatch Special Service District). If the district is not listed on the portal, email its administrative office with the letter attached and ask for the records officer's direct contact — the email trail is the record." },
    { id: "af89aw", name: "U.S. Air Force — 89th Airlift Wing (Joint Base Andrews)", email: null, fed: true,
      portal: "https://www.foia.af.mil/",
      submitNote: "Air Force eFOIA — address to the 89th Airlift Wing FOIA Office, Joint Base Andrews, MD, or file via FOIA.gov. Avoid any Login.gov-gated path — the email confirmation trail is the record." },
    { id: "ncis", name: "Naval Criminal Investigative Service", email: "ncis_foia@ncis.navy.mil", fed: true,
      submitNote: "Email is the record: ncis_foia@ncis.navy.mil, Attn: FOIA (Code 00LJF), 27130 Telegraph Road, Quantico, VA 22134; 571-305-9092." }
  ],

  entities: [
    { id: "fbi", name: "Federal Bureau of Investigation", type: "org" },
    { id: "atf", name: "Bureau of Alcohol, Tobacco, Firearms and Explosives", type: "org" },
    { id: "dod", name: "U.S. Department of Defense", type: "org" },
    { id: "charlie-kirk", name: "Charlie Kirk", type: "person" },
    { id: "erika-kirk", name: "Erika Kirk", type: "person" },
    { id: "usss", name: "U.S. Secret Service", type: "org" },
    { id: "amodei", name: "Rep. Mark Amodei", type: "person" },
    { id: "kolvet", name: "Andrew Kolvet", type: "person" },
    { id: "kash-patel", name: "Kash Patel", type: "person" },
    { id: "aes", name: "Accurate Energetic Systems (AES)", type: "company" },
    { id: "nswc-crane", name: "NSWC Crane Division", type: "org" },
    { id: "nds", name: "National Design Studio", type: "org" },
    { id: "eop", name: "Executive Office of the President", type: "org" },
    { id: "epstein", name: "Jeffrey Epstein", type: "person" },
    { id: "robinson", name: "Tyler Robinson", type: "person" },
    { id: "davis", name: "Agent Brian Davis (SBI)", type: "person" },
    { id: "bagley", name: "Officer Bagley", type: "person" },
    { id: "schneider", name: "Agent Ben Schneider (SBI)", type: "person" },
    { id: "brooksby", name: "Ex-Sheriff Nate Brooksby", type: "person" },
    { id: "twiggs", name: "Lance Twiggs", type: "person" },
    { id: "mitchell", name: "Mike Mitchell", type: "person" },
    { id: "neff", name: "Blake Neff (Charlie Kirk Show)", type: "person" },
    { id: "uvu-ent", name: "UVU", type: "org" },
    { id: "jeff-long", name: "Chief Jeff Long (UVU PD)", type: "person" },
    { id: "robertson", name: "Officer Alan Robertson (USU PD)", type: "person" },
    { id: "haycock", name: "Officer Christopher Haycock (USU PD)", type: "person" },
    { id: "sbi", name: "Utah SBI / DPS", type: "org" },
    { id: "wcso-ent", name: "Washington County SO", type: "org" },
    { id: "fbi-ent", name: "FBI", type: "org" },
    { id: "tpusa", name: "TPUSA", type: "org" },
    { id: "flock", name: "Flock Safety (ALPR vendor)", type: "company" },
    { id: "mccoy", name: "Mikey McCoy (Kirk chief of staff)", type: "person" },
    { id: "phillip", name: "Danny Phillip (Kirk's assistant)", type: "person" },
    { id: "mitchell-curtis", name: "Officer Mitchell Curtis (Pleasant Grove PD)", type: "person" },
    { id: "foster-curtis", name: "Foster Curtis (NCIS OIG → Richmond IG)", type: "person" },
    { id: "amoroso", name: "Dr. Deidra Amoroso (Utah Chief ME)", type: "person" },
    { id: "guardo", name: "Dr. Andrew Guardo (Deputy Chief ME)", type: "person" },
    { id: "ucao-ent", name: "Utah County Attorney’s Office", type: "org" },
    { id: "pag", name: "Presidential Airlift Group / WHMO", type: "org" }
  ],

  investigations: [
    {
      id: "k9-no-results",
      challenge: "Tracking dogs were run for whoever jumped from the roof and found nothing.",
      short: "K9s: no results",
      categories: ["Crime scene handling"],
      entities: ["uvu-ent", "sbi", "mitchell-curtis"],
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
          filed: "PENDING — filed via NextRequest as Utah County request #26-2812, Jul 13, 2026. Identified via the county's Jul 15 closure of #26-2833 (an accidental duplicate) under § 63G-2-201(7)(a)(iv): 'A response will be provided through request 26-2812.' Response due ~Jul 27 — the parallel track to the Orem denial now on appeal."
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
              refinement: "Request text unchanged — the cure is procedural: the complete § 204 requester block (name, full street/city/state/ZIP, daytime phone, email) now leads the letter, filed once. The generator letterhead carries these fields for every Utah request going forward." },
            { label: "re-filed (cured) Jul 16, 2026, 12:29 p.m. by email to records@orem.gov",
              records: "I request the K9 deployment or utilization records for any City of Orem canine unit deployed in connection with the Utah Valley University incident response on September 10–11, 2025 — including handler logs identifying each unit, its certification/discipline, its tasking, and the recorded outcome.",
              outcome: "Answered informally the SAME DAY by the records officer (Angela): 'anything related to September 10, 2025 cannot be released since it's an active investigation... out of our hands till the trial is over,' with future requests directed to orem.gov/recordsrequest/. An active-investigation withholding (cf. Utah Code § 63G-2-305) stated without the formal written determination GRAMA requires (§ 63G-2-205).",
              refinement: "None — the request stood as filed; the formal written determination remained owed on this re-file, and it arrived Jul 21." }
          ],
          refined: true,
          ask_no_records: true,
          filed: "ON APPEAL + ROUND-TWO REFILE — narrowed K9 deployment/utilization request (handler logs, certification/discipline, tasking, outcome) emailed Aug 2, 2026 and re-sent Aug 4, 2026 (10:56 and 11:31 a.m.) to records@orem.gov. Original round: DENIED — twice in one day — and ON APPEAL. Jul 21, 2026, 11:43 a.m.: Orem issued its formal written denial — the Utah County Attorney's Office 'has requested that these records be classified as Protected under Utah Code § 63G-2-305(10)'; 'the City is compelled to classify... As such, your request is herein formally denied.' A formal cure was sent at 12:45 p.m. the same day; Orem re-denied at 1:50 p.m. — 65 minutes later — on a denial form listing the record as 'K9 inquiry' and the ground as 'Active Case,' citing no subsection of § 305(10) and making no interference finding. GRAMA appeal filed with City Manager (CAO) Brenn Bybee the same evening under § 63G-2-401; determination due ~Aug 5, 2026 (Pioneer Day-adjusted). All further questions were pointed at the Utah State Bureau of Investigation."
        },
        {
          agencyId: "pgpd",
          summary: "Pleasant Grove PD — Freya/Loki K9 logs + certifications, Officer Curtis assignment records, firearm found-property log",
          subject: "GRAMA Request: K9 deployment and certification records, officer assignment records, and found-property log, September 10–11, 2025",
          records: "I request: (1) K9 deployment and search logs for the department’s K9s \"Freya\" and \"Loki\" for September 10–11, 2025, in connection with the response at or near the Utah Valley University campus — including the areas searched, search results, and the identity of any agency or official who requested a search or re-search; (2) current-as-of-September-2025 training and certification records for K9s Freya and Loki; (3) the hire date, position, and assignment records for Officer Mitchell Curtis (records that are public under Utah Code § 63G-2-301(2)(b), including name, title, and employment history within the department); and (4) the evidence or found-property log entry for the firearm recovered in the vicinity of the UVU campus on September 10–11, 2025, including the date, time, location, and recovering officer recorded in that entry. For context: the Utah County Sheriff’s Office, in its response to request #26-2812, indicated that K9 records should be sought from the individual deploying agencies. This request follows that direction. If no responsive records exist for any numbered item, I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026. CONFIRM ADDRESS FIRST: no dedicated records email surfaced in verification — check pgcityutah.gov for the records officer/city recorder or call 801-785-3506 before sending. Utah County’s K9 denial on #26-2812 explicitly invited this per-agency request."
        }
      ]
    },
    {
      id: "paved-scene",
      challenge: "The lead detective says he never authorized paving the crime scene.",
      short: "Scene paved over",
      categories: ["Crime scene handling"],
      entities: ["uvu-ent", "davis"],
      investigator: "Ian Carroll · Baron Coleman",
      investigatorLinks: [
        { label: "Carroll on day two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" }
      ],
      status: "confirmed",
      finding: "The courtyard ground under the medical tent was paved over within days of the shooting — the case's lead investigator testified he didn't authorize it, doesn't know who did, and learned it happened from the news. The excavation contractor (Dan Merrill) has separately said on camera the work was ordered by \"the FBI and the Governor of Utah.\" In July 2026 the paper arrived: Judicial Watch's GRAMA appeal (State Records Committee case 2026-004) pried loose UVU's own cleanup file, Bates UVU 25-326. It shows an emergency cleanup order placed September 11 — procurement policy bypassed — while the scene was still under external law-enforcement control by UVU's own sworn account (AVP of Facilities Frank Young: scene released back to UVU \"on or about Friday, September 12\"). The cleanup vendor texted \"this job is complete… Sorry for the circumstances\" on September 12, the same day the scene came back. That evening's texts: \"Am I good to turn sprinklers all back on?\" → \"Chief says let the water flow!\" → \"The cops just called me into the fountain area… i bet we can just wash it all down\" — while the washdown of a remaining \"eight inch puddle\" (\"the solution to pollution is dilution\") was deferred with \"No, tomorrow. The FBI is still there. I guess.\" DFCM texted UVU offering to \"proceed right away on getting a firm under contract\"; a 20×30 paver pad went in by September 16 behind 182 feet of State Fairpark fencing, in gray (\"They made me change the paver color this morning\" — \"they\" unnamed; \"Red is too much\").",
      implication: "Somebody ordered a homicide scene altered while the investigation was open, without the lead investigator's knowledge — and the produced records now put the alteration's paper trail in specific places. UVU's appeal response swears UVUPD \"did not have control of the handling of the crime scene\" and on that basis never searched police emails or texts at all — while its own produced texts show \"Chief says\" authorizing the water and \"the cops\" summoning the crew to the fountain. The cleanup vendor's identity and the check that paid it are withheld in full (§ 305(11)/(12)); the purchase order was created January 14, 2026 — four months post-hoc; Young's sworn search used the single term \"pavers\" and found zero emails. And UVU swears it neither paid for nor performed the paving — which places the contract, the firm, and the invoices at DFCM, exactly where UVU's own denial letter directs requesters.",
      sources: [
        { label: "Day 2 testimony (cross)", url: "" },
        { label: "Dan Merrill on-camera statement (aired via Coleman / Liberty Lockdown)", url: "" },
        { label: "JW production 1 — the cleanup/paving texts, verbatim (Bates UVU 25-326:0001–0011)", url: "https://www.judicialwatch.org/wp-content/uploads/2026/06/Utah-Valley-University-Charlie-Kirk-records-prod-1-2026.pdf" },
        { label: "JW production 2 — SRC appeal 2026-004: UVU's response, the Fowler & Young declarations, the $6,090.52 invoice + emergency-payment file + Jan 14, 2026 purchase order", url: "https://www.judicialwatch.org/wp-content/uploads/2026/06/Utah-Valley-University-Charlie-Kirk-records-prod-2-2026.pdf" }
      ],
      requests: [
        {
          agencyId: "uvu",
          summary: "UVU — the work orders and authorizations for the tent removal and paving",
          subject: "GRAMA Request: facilities records for courtyard work following September 10, 2025",
          records: "I request, for the period September 10 – October 15, 2025: (1) all work orders, purchase orders, and contractor invoices concerning removal of the medical tent and any resurfacing, paving, concreting, or landscaping of the courtyard area adjacent to the Sorensen Center / Hall of Flags at Utah Valley University; and (2) the written authorization or approval for that work, including the requesting office and any record of coordination with, or clearance from, any law-enforcement agency before the work proceeded.",
          ask_no_records: true,
          filed: "PENDING — filed via NextRequest as UVU request #26-212, received Jul 13, 2026; acknowledged Jul 15 with the full request text quoted back. 10-business-day clock, stretched by the Jul 24 Pioneer Day closure — response due ~Jul 27–28. NOTE: UVU #26-217 (Jul 15) is an accidental identical re-file — expect a § 63G-2-201(7) duplicate closure; no action needed on it. NOTE 2: Judicial Watch's parallel request 25-326 (SRC appeal 2026-004, supplemental production Mar 12, 2026, published Jul 10) already produced the cleanup texts, both sworn declarations, and the $6,090.52 emergency-payment file — the #26-212 response can now be graded against that production; anything UVU withholds here that JW already holds is a scoreable inconsistency."
        },
        {
          agencyId: "dfcm",
          summary: "DFCM — courtyard work orders, authorizations, and contractor invoices (UVU’s own referral)",
          subject: "GRAMA Request: work orders and authorizations for UVU courtyard surface work, September–October 2025",
          records: "Utah Valley University, in response to a prior request, referred records concerning courtyard surface work to your division. I request, for the period September 10 through October 31, 2025: (1) work orders for paving, resurfacing, concrete work, or other surface alteration of the courtyard area at Utah Valley University adjacent to the Losee Center; (2) the authorization or approval records for that work, including the requesting office and stated justification; and (3) contractor invoices or purchase orders for that work. If no responsive records exist, I request written confirmation of that fact, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026, ready to file via openrecords.utah.gov (entity: Division of Facilities Construction and Management, Dept. of Government Operations). UVU itself referred the work-order question here."
        },
        {
          agencyId: "gov",
          summary: "Governor's office — any direction or coordination on the scene restoration",
          subject: "GRAMA Request: records concerning courtyard restoration work at Utah Valley University, September 2025",
          records: "I request, for the period September 10 – October 15, 2025, any record held by the Office of the Governor — including correspondence, directives, meeting notes, or coordination records with Utah Valley University, the FBI, or the Utah Department of Public Safety — concerning the removal of the medical tent and the excavation, resurfacing, or concreting of the courtyard area at Utah Valley University where the September 10, 2025 shooting occurred. The excavation contractor has stated publicly that this work was ordered by the FBI and the Governor of Utah; this request seeks the records of any such direction or coordination. If no such records exist, I request written confirmation of that fact.",
          ask_no_records: true,
          filed: "INVOICED — filed Jul 16, 2026, 11:29 a.m. by email to the Governor's records officer (Adam Duncan, aduncan@utah.gov). Response Jul 17, 2026: EXPEDITE DENIED and FEE WAIVER DENIED, both on the same ground — failed to show the request 'benefits the public rather than the person' under § 63G-2-204(4)(a); records officer wrote it was 'unclear how you intend to use records' and how the Utah public would access the intended publication. Prepayment required before any processing: invoice No. 260716AB1 / GO-071726-0087 = $276 (4.6 hrs staff time @ $60) + $75 out-of-state filing fee = $351.00, due Aug 3, 2026. Fee-waiver-denial OVERRIDE FILED Jul 17, 2026, addressed to CAO Jon Pierpont — but MISROUTED: it went only to Duncan, as his own Jul 20 replies confirmed. RESENT directly to Pierpont (jonpierpont@utah.gov, cc Duncan) Jul 21, 2026 with the Jul 17 timeliness preserved — decision pending. Override cures Duncan's sole stated deficiency (names the free non-commercial public docket as the publication) and stacks all three G-302(5) waiver grounds; asks for a written per-ground explanation if re-denied. OVERRIDE DENIED — Aug 5, 2026 letter over Chief of Staff Jon S. Pierpont's signature (sent via Director of Scheduling Tiffeni Wall): all four arguments rejected. The office's theory: it is \"exempt from Section 203 of GRAMA,\" so its own Record Management Policy G-302(5) — not the statute — governs fees and waivers. The quotable line: \"It remains unclear how a requester outside the state of Utah with no apparent press or media role will provide a heightened benefit to the Utah public.\" The policy styles the CAO's override decision as final; the $351 invoice stands. Strategy fork now live: pay, narrow, or contest the §-203-exemption fee theory. Both Pierpont letters archived from the Aug 5 email."
        }
      ]
    },
    {
      id: "me-chain",
      challenge: "The ME logged up to seven bullet fragments; the case counts four.",
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
          formAnswers: [
            { label: "Request title (the form cuts at 50 characters)", value: "Evidence chain-of-custody, Sept 2025" },
            { label: "Date range of records", value: "09/10/2025 to present" }
          ],
          records: "I request, concerning the Office of the Medical Examiner case arising from the September 10, 2025 death at Utah Valley University: (1) the evidence transmittal or release forms documenting transfers of physical evidence (including bullet or projectile fragments, fingerprint records, and photographic media) to any law-enforcement agency; and (2) the log identifying the agencies or officials who provided investigative information incorporated into the case file's administrative cover documentation. I am NOT requesting the autopsy report, photographs, or any medical findings — administrative transfer records only.",
          ask_no_records: true,
          filed: "PENDING — FILED Aug 4, 2026, 1:28 p.m. via the Open Records Portal (ut.accessgov.com form; title \"Evidence chain-of-custody, Sept 2025\"); submission-confirmation PDF banked in foia-mail. NOTE: the portal recorded the mailing address state as Utah instead of Texas (dropdown default) — correct it if the portal allows, or note it in any follow-up. 10-business-day clock from receipt."
        }
      ]
    },
    {
      id: "transport-suv-contents",
      short: "What was left in the transport SUV?",
      challenge: "Photos show a charred object in the SUV that carried Kirk — no inventory of the vehicle's contents is public.",
      categories: ["Physical evidence", "Crime scene handling"],
      entities: ["charlie-kirk", "mccoy", "sbi"],
      investigator: "Candace Owens (Ep 359) + unsolicited viewer identifications",
      investigatorLinks: [
        { label: "Candace — Ep 359 (the photos, the emails, the burn test)", url: "https://www.youtube.com/watch?v=X3VKJVJ7cN4" }
      ],
      status: "reported",
      finding: "Ep 359 shows photos from inside the SUV that carried Charlie Kirk from UVU to the hospital, including an unidentified charred object Owens had earlier described as \"a burnt piece of cardboard with blood.\" A convergent wave of unsolicited viewer identifications — fashion-industry workers, home sewers, and an anonymous self-described plastic/reconstructive-surgery nurse — say it is the burnt remains of a polyester shirt, the nurse adding that melted polyester chars like cardboard and that the black material reads as burned skin (\"they likely ripped off his shirt and ripped off his skin\"). Owens' team partially replicated the appearance by burning a 50%-polyester shirt on camera; Baron Coleman states Kirk's shirt that day was 100% polyester; a full-poly retest is pending, and Owens says she is trying to obtain the items left in the vehicle. (Status reported: the photos are real and shown; the shirt identification is a crowd-sourced hypothesis she flags as such herself.) Separately, a Jul 25, 2026 livestream (Danks) claims — documents asserted but not yet shown — that the vehicle has since been altered and sold: interior carpet cut out, rear seat removed, sold at auction for roughly $62,000 to a Southern California buyer, with a vehicle-history report said to document it. Carried as attributed discourse pending the paper. The Aug 5, 2026 watch-party stream advanced that chain with claimed photo metadata: the SUV at a Magna, Utah auction yard on September 16, 2025 — six days after the shooting — then cleaned, sold in December, serviced at a California dealer, and held in a GM lot tagged \"investigation,\" possibly listed on a foreign export site since. Blake Neff is quoted telling the host the SUV is \"not part of the crime scene anymore\" and that he doesn't know who drove Kirk in. The host says an interview is coming with the person who physically cleaned the vehicle. Still attributed discourse — but now with a checkable date-and-place chain.",
      implication: "Whether the identification is right is secondary to a records question nobody has answered: was the private vehicle that transported the victim ever processed as evidence at all? A homicide victim's clothing is itemized somewhere — an agency property/evidence intake log, or the medical examiner's personal-effects inventory — and a vehicle that carried a shooting victim either has a processing record or it doesn't. If no agency processed the vehicle or logged its contents, that absence is itself the finding. And if the alteration-and-auction claim proves out, the questions compound: which agency released the vehicle, was it processed first, and what preservation duty attached before a private party stripped and sold it mid-prosecution. The release-without-processing record targeted below is also the record that dates any alteration against the evidence clock.",
      sources: [
        { label: "Ep 359 [1:55–7:47] — the photos, the email pattern (mother-of-10 seamstress, the nurse email read in full), the burn-test side-by-side (transcript + digest in the library, re-verified against a fresh scrape Jul 20 2026)", url: "https://www.youtube.com/watch?v=X3VKJVJ7cN4" },
        { label: "Danks livestream, Jul 25 2026 — the alteration/auction claim (transcript banked in the library; the cited vehicle-history document has not been produced)", url: "https://www.youtube.com/watch?v=XKjDIDF1Pjk" },
        { label: "Watch-party stream, Aug 5 2026 — the Magna auction-yard photos/metadata claims, the Neff \"not part of the crime scene anymore\" quote, the SUV-cleaner interview teased (transcript banked in the library)", url: "https://www.youtube.com/watch?v=lis_Cnf96Qw" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — the vehicle-processing and property/evidence intake records for the transport vehicle",
          subject: "GRAMA Request: evidence and property records concerning the vehicle used to transport the victim, September 10, 2025",
          records: "I request, concerning the September 10, 2025 Utah Valley University homicide investigation: (1) the property or evidence intake log entries for any items recovered from, or documented inside, the sport-utility vehicle used to transport the victim from the campus to the hospital; (2) the record of any forensic processing, photography, or examination of that vehicle, or the record of its release without processing (including to whom it was released and when); (3) any record authorizing, noting, or conditioning the vehicle's subsequent alteration, sale, or disposal, including any preservation instruction or litigation-hold notice concerning the vehicle; and (4) the photograph log for any images taken of the vehicle's interior. I am requesting administrative intake, processing, and release records — not medical records and not the photographs' evidentiary content where restricted. Please also retain this correspondence and all records related to the processing of this request, including the records described above. If no agency processed the vehicle or logged its contents, I request written confirmation of that fact, including a description of the search conducted.",
          parties: "Tyler James Robinson (defendant); Charlie Kirk (victim, transported in the vehicle); the vehicle's registered owner or custodian and the recipient of any release (identification is part of the request).",
          formAnswers: [
            { label: "Date of occurrence", value: "09/10/2025" },
            { label: "Time of occurrence", value: "approximately 12:20–1:00 p.m. (transport from campus to hospital); processing and release thereafter" }
          ],
          ask_no_records: true
        },
        {
          agencyId: "ome",
          summary: "Medical Examiner — the personal-effects/clothing inventory (not the autopsy)",
          subject: "GRAMA Request: personal-effects and clothing inventory records, September 2025 case",
          formAnswers: [
            { label: "Request title (the form cuts at 50 characters)", value: "Personal effects inventory, Sept 2025" },
            { label: "Date range of records", value: "09/10/2025 to present" }
          ],
          records: "I request, concerning the Office of the Medical Examiner case arising from the September 10, 2025 death at Utah Valley University: the personal-effects or clothing inventory documenting what clothing or clothing remnants accompanied the decedent or were subsequently received, and the transmittal or release records for any clothing item transferred to a law-enforcement agency or laboratory. I am NOT requesting the autopsy report, photographs, or any medical findings — administrative inventory and transfer records only. (This complements the evidence-transmittal request already drafted to this office concerning bullet fragments; this request concerns clothing and personal effects specifically.) Please also retain this correspondence and all records related to the processing of this request.",
          ask_no_records: true
        },
        {
          agencyId: "fbi",
          summary: "FBI — the custody paper: FD-597 receipts for hospital footage and security-team clothing, and the SUV disposition record",
          subject: "FOIA Request: property receipts and disposition records, September 10, 2025 Utah Valley University investigation",
          records: "In connection with the FBI’s investigation of the September 10, 2025 shooting at Utah Valley University, I request: (1) the property receipt(s) (FD-597) or equivalent chain-of-custody records for surveillance footage obtained from Timpanogos Regional Hospital in Orem, Utah on or after September 10, 2025; (2) the property receipt(s) (FD-597) or equivalent records for clothing collected from members of the event security team; and (3) the disposition records for the sport utility vehicle used to transport the victim — including any release, return, cleaning authorization, or transfer-of-custody record. Each item names a discrete, routinely generated custody record; this is not a broad search for investigative files. I am not seeking general email correspondence, interview records, or the investigative file. If no responsive record exists for any numbered item, please confirm that in writing for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026 — file via eFOIPA (existing account), one subject per submission. Expect Exemption 7(A); the denial itself becomes citable — a written refusal to produce even the custody receipts for a \"cleaned and resold\" vehicle is its own exhibit."
        }
      ]
    },
    {
      id: "me-departures",
      short: "Two ME departures + the autopsy authorization",
      challenge: "The chief medical examiner who signed off on the autopsy resigned with no stated reason; her deputy left for a New York county post. And did any county attorney or the AG formally request the autopsy at all?",
      categories: ["Personnel & credibility"],
      entities: ["amoroso", "guardo"],
      investigator: "Candace Owens (Ep 366/369) · Baron Coleman (the statute point)",
      investigatorLinks: [
        { label: "Owens Ep 369, Jul 31 2026 — the medical-examiner discovery (transcript banked in the library)", url: "https://www.youtube.com/watch?v=iB-YtO3UZOg" }
      ],
      status: "reported",
      finding: "Dr. Deidra Amoroso, Utah’s Chief Medical Examiner (tenure beginning July 1, 2024), who signed off on the Kirk autopsy, has resigned with no stated reason. Dr. Andrew Guardo, promoted to Deputy Chief Medical Examiner in 2024, has also departed — his appointment as Dutchess County, New York Medical Examiner was announced on or about March 11, 2026. Corroboration for the chief's exit (Coleman Ep 155, Aug 6): her LinkedIn now shows a July 2026 end date at the OME. Coleman’s statute point sharpens the third ask: whether a county attorney or the Attorney General ever submitted a written request for this autopsy is itself a discrete record — and so is its documented absence. The claimed \"fed overseeing the autopsy\" makes the chief’s separation file doubly relevant. New (Aug 3, via Danks): Brian Harpole — head of event security that day, on the Shawn Ryan Show — says he pressed a Timpanogos doctor on autopsy timing (\"a day, a day and a half\"), was beside Kirk’s chief of staff when the Vice President called asking \"what do you need\" and answered \"we need an autopsy now,\" and insists \"it was done — get the report when it comes out\" — an on-record claim that an autopsy and a report exist, sitting against TPUSA’s own earlier no-autopsy signals. It lands exactly on the paper this card requests. Rides as attributed discourse until the paper lands.",
      implication: "Five pieces of administrative and personnel paper test the claims without touching the § 26B-8-217-restricted autopsy file: the separation records for both doctors, the written autopsy authorization or written confirmation none exists, the body custody and transport log from Timpanogos to the ME facility, and the burial-transit/disposition permit — the paper answer to the cremation question, since permits state the disposition and name the receiving jurisdiction. Separation records are generally more reachable than anything in the case file.",
      sources: [
        { label: "Owens Ep 366, Jul 27 2026 — the Amoroso resignation", url: "https://www.youtube.com/watch?v=HZvwbfePe7o" },
        { label: "Owens Ep 369, Jul 31 2026 — the ME thread continued", url: "https://www.youtube.com/watch?v=iB-YtO3UZOg" },
        { label: "Danks, Aug 3 2026 — Harpole on Shawn Ryan: \"we need an autopsy now... it was done\" (transcript banked)", url: "https://www.youtube.com/watch?v=JkDwK0ND0Kc" },
        { label: "Coleman Ep 155, Aug 6 2026 — the LinkedIn end-date corroboration (transcript banked in the library)", url: "https://www.youtube.com/watch?v=sIfblNrwkk4" }
      ],
      requests: [
        {
          agencyId: "ome",
          summary: "DHHS/OME — Amoroso + Guardo separation records, the autopsy authorization (or its absence), body custody log, disposition permit",
          subject: "GRAMA Request: separation records for Dr. Deidra Amoroso and Dr. Andrew Guardo, autopsy authorization record, body custody log, and disposition permit — September 10, 2025 decedent",
          formAnswers: [
            { label: "Request title (the form cuts at 50 characters)", value: "ME separations + autopsy authorization" },
            { label: "Date range of records", value: "07/01/2024 to present" }
          ],
          records: "I request: (1) the resignation letter, any separation agreement, and personnel action forms documenting the departure of Dr. Deidra Amoroso, Chief Medical Examiner (tenure beginning July 1, 2024); (2) the personnel action forms documenting the 2024 promotion of Dr. Andrew Guardo to Deputy Chief Medical Examiner and the personnel action forms and separation records documenting his subsequent departure from the Office of the Medical Examiner (Dr. Guardo’s appointment as Dutchess County, New York Medical Examiner was announced on or about March 11, 2026); (3) the written request or authorization from a county attorney, district attorney, or the Attorney General for the autopsy of the decedent in the September 10, 2025 Utah Valley University shooting — if no such written request exists, I request written confirmation of that fact; (4) the body custody and transport log for that decedent from Timpanogos Regional Hospital to the Office of the Medical Examiner facility, September 10, 2025; and (5) the burial-transit or disposition permit issued for that decedent, including the disposition stated on the permit and the receiving jurisdiction. Each item names a discrete, catalogued document; this is not a broad search. I am not requesting the autopsy report itself or any medical-examiner case file material restricted by statute. If no responsive record exists for any numbered item, I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026, ready to file via openrecords.utah.gov (entity: Department of Health and Human Services). Every item is administrative or personnel paper — deliberately outside the § 26B-8-217 restriction on ME case records."
        }
      ]
    },
    {
      id: "brooksby-severance",
      challenge: "The sheriff whose office owns the turn-in timeline left with a ~$100k severance.",
      short: "Brooksby's severance",
      categories: ["Personnel & credibility"],
      entities: ["brooksby", "wcso-ent"],
      investigator: "Baron Coleman · public reporting",
      investigatorLinks: [
        { label: "Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "Washington County Sheriff Nate Brooksby resigned March 27, 2026 amid sexual-harassment and investigation-interference allegations, with a reported ~$100,000 severance — and the official turn-in timeline in the state's biggest case begins and ends with him. New (Coleman Ep 155, Aug 6): the interference allegation has a specific shape — a Washington County deputy was criminally charged with unlawfully accessing and disclosing criminal-investigation records, and which investigation was involved has never been stated.",
      implication: "Public-employee separation agreements are generally public records under GRAMA once finalized. The severance agreement and the scope of the interference allegations bear directly on the credibility of the turn-in narrative he anchored. And the deputy's charging documents are public court records — no GRAMA needed, pull via Xchange — that either name the investigation the interference touched or conspicuously don't.",
      sources: [
        { label: "Utah reporting, late March 2026", url: "" },
        { label: "Coleman Ep 155, Aug 6 2026 — the deputy's unlawful-access/disclosure charge tied to the interference claims (transcript banked in the library)", url: "https://www.youtube.com/watch?v=sIfblNrwkk4" }
      ],
      requests: [
        {
          agencyId: "washco",
          summary: "Washington County — the separation agreement and severance terms",
          subject: "GRAMA Request: separation/severance agreement for former Sheriff Nate Brooksby",
          records: "I request the separation agreement, severance agreement, or settlement agreement between Washington County and former Sheriff Nate Brooksby executed on or about March 2026, including the monetary terms and any confidentiality or non-disparagement provisions. Finalized settlement and severance agreements of public employees are public records under GRAMA.",
          ask_no_records: true,
          filed: "PENDING — FILED Aug 4, 2026, 2:29 p.m. by email to grama@washco.utah.gov — the separation/severance agreement for former Sheriff Nate Brooksby. 10-business-day clock."
        },
        {
          agencyId: "washco",
          summary: "Washington County — the outcome record of the internal investigation",
          subject: "GRAMA Request: disposition of internal investigation concerning the former sheriff",
          records: "I request the record of final disposition or outcome of any internal or independent investigation of former Sheriff Nate Brooksby that concluded, was closed, or was pending at his March 2026 resignation — including the categories of allegations examined (as characterized in the disposition record) and the finding, if any. I am not requesting witness statements or the investigative file itself, only the disposition record.",
          ask_no_records: true,
          filed: "PENDING — FILED Aug 4, 2026, 2:29 p.m. by email to grama@washco.utah.gov — the disposition/outcome record of the internal investigation. 10-business-day clock."
        }
      ]
    },
    {
      id: "curtis-ncis",
      short: "The rookie’s father: 21 years NCIS, then Richmond IG",
      challenge: "The officer who found the gun is a 2025 rookie. His father left NCIS’s Inspector General office as a division chief three months before the shooting to become Richmond, Virginia’s interim IG. Federal service histories are routinely releasable.",
      categories: ["Personnel & credibility"],
      entities: ["foster-curtis", "mitchell-curtis"],
      investigator: "Candace Owens (Ep 367)",
      investigatorLinks: [
        { label: "Owens Ep 367, Jul 29 2026 — the rookie cop who found the gun (transcript banked in the library)", url: "https://www.youtube.com/watch?v=Vu6Y24pqhZs" }
      ],
      status: "reported",
      finding: "Ep 367: Mitchell Curtis, Pleasant Grove PD — a 2025 UVU graduate — found the rifle after bomb-dog Freya had already searched that field clean and a federal official ordered a re-search. His father, Foster Curtis, served approximately 21 years with NCIS, ending as a division chief within the NCIS Office of the Inspector General, and separated on or about June 2, 2025 — three months before the shooting — to become Richmond, Virginia’s interim Inspector General after incumbent James Osuna was abruptly fired (\"NDAs were signed\"). Rides as attributed discourse until the service records land.",
      implication: "The federal end is cheap paper: positions, titles, grades, duty stations, dates of service, and the nature and date of separation are releasable for federal employees under FOIA and 5 C.F.R. § 293.311 — no investigative file required. The Richmond end is Virginia FOIA, a citizens-only statute — parked until a Virginia-resident requester or collaborator exists. The Pleasant Grove side of the same thread — Freya’s logs, Curtis’s hire and assignment records, the found-property log — runs on the K9 card, where the county’s own denial invited the per-agency ask.",
      sources: [
        { label: "Owens Ep 367, Jul 29 2026 — the Curtis family thread", url: "https://www.youtube.com/watch?v=Vu6Y24pqhZs" }
      ],
      requests: [
        {
          agencyId: "ncis",
          summary: "NCIS — Foster Curtis: positions, grades, duty stations, dates of service, and separation record",
          subject: "FOIA Request: position, grade, and separation history for former NCIS employee Foster Curtis",
          records: "I request the publicly releasable federal employment information for former NCIS employee Foster Curtis, who served approximately 21 years with NCIS and separated on or about June 2, 2025 from a position as a division chief within the NCIS Office of the Inspector General: (1) his positions and titles held, grades, duty stations, and dates of service (information releasable for federal employees under FOIA and 5 C.F.R. § 293.311); and (2) the effective date and nature of his separation. This is a request for the discrete, routinely releasable employment-data record of a single named former employee; it is not a broad search. If no responsive records exist, please confirm that in writing, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026 — email ncis_foia@ncis.navy.mil (Attn: FOIA, Code 00LJF, Quantico). The Richmond IG records are Virginia FOIA — citizens-only — and stay parked until a Virginia-resident requester exists."
        }
      ]
    },
    {
      id: "flock-alpr-preservation",
      short: "Flock ALPR: preserved or purged?",
      challenge: "Flock's cameras blanketed 9/10 — did any agency preserve the reads before the ~30-day auto-purge?",
      categories: ["Missing & deleted footage"],
      entities: ["robinson", "flock", "sbi", "davis", "wcso-ent"],
      investigator: "Tucker Carlson Network (Flock monologue) · Flock's ~30-day retention",
      investigatorLinks: [
        { label: "Tucker Carlson Network — 'This Is How You Get a Revolution' (Flock LPRs)", url: "https://www.youtube.com/watch?v=r8WiovU29MM" }
      ],
      status: "reported",
      finding: "Flock Safety automated license-plate readers blanket the Orem/UVU area and the I-15 corridor; the network captured plate reads of vehicles moving on September 10, 2025 and the days after — the UVU approach, the hospital drive, and the route south to Washington County. But Flock's default retention is ~30 days: raw reads auto-delete unless an agency places a legal/preservation hold or saves them to a case. Flock is a private vendor and can't be GRAMA'd — but per Flock's own policy the agency customer, not Flock, OWNS the data, and a purged read is permanently unrecoverable (\"not by the customer, not by Flock, not by AWS\"). The September 2025 reads are now well past 30 days, so unless a hold was placed that fall they are already gone — and only the agencies' own records show whether that happened.",
      implication: "Three government records answer it: (1) any preservation/legal hold sent to Flock — its ABSENCE means the most-surveilled day in Utah's history was left to auto-delete; (2) the Flock search/audit log — every plate query investigators ran, exposing whether Robinson's, Qureshi's, or the hospital-drive vehicle was ever checked; (3) the Flock contract, which sets retention and data-sharing. If reads were preserved and show a timeline at odds with the state's, that is Brady material; if they were not, that is spoliation. Either way the paper is dispositive.",
      sources: [
        { label: "Tucker Carlson Network — Flock monologue (Harris County: ~3,700 LPRs, 500+ murders in 2025)", url: "https://www.youtube.com/watch?v=r8WiovU29MM" },
        { label: "Flock Safety — LPR data hard-deleted on a rolling ~30-day default (AWS S3 lifecycle); customer owns the data; purged reads unrecoverable", url: "https://www.flocksafety.com/blog/how-does-flock-handle-license-plate-data-deletion" },
        { label: "Flock Safety — LPR Policy (retention default + agency configuration)", url: "https://www.flocksafety.com/legal/lpr-policy" },
        { label: "Have I Been Flocked? — privacy activists mass-FOIAing Flock audit-log data (methodology ally)", url: "https://haveibeenflocked.com" },
        { label: "Elizabeth Lane TV, Aug 2026 — the Flock/Axon surveillance-stack walkthrough (transcript banked)", url: "https://www.youtube.com/watch?v=yZQYxAkU9VY" }
      ],
      requests: [
        {
          agencyId: "uvupd",
          summary: "UVU PD — Flock preservation hold + search/audit log + vendor contract",
          subject: "GRAMA Request: Flock/ALPR preservation hold, search-audit log, and vendor contract — September 2025 UVU homicide investigation",
          records: "I request three categories of records concerning UVU Police Department's use of Flock Safety automated license-plate-reader (ALPR) data in connection with the September 10, 2025 Utah Valley University homicide investigation, on and around the UVU campus: (1) any preservation request, legal hold, or litigation-hold notice sent to Flock Safety (or any ALPR vendor) to prevent deletion of reads related to this investigation, including the date sent and the plates or date range covered; (2) the ALPR search/audit log for September 10 – October 15, 2025 showing queries run in connection with this investigation — querying user, plate or search term, timestamp, and stated reason/case number (unrelated third-party queries may be redacted); and (3) the department's current contract, service agreement, or data-processing agreement with Flock Safety, including data-retention settings and any data-sharing or network-access terms. The contract is a standing public record; if the investigation-related items are withheld under § 63G-2-305, I request the segregable public portions and a written denial citing the provision. If no preservation hold exists, I request written confirmation of that fact.",
          ask_no_records: true,
          filed: "NOT FILED — queued; the absence of a preservation hold is itself the finding."
        },
        {
          agencyId: "orem",
          summary: "Orem PD — Sept 10 ALPR detections + images + hotlist alerts + network audit + retention/hold",
          subject: "GRAMA Request: Flock Safety ALPR detections, images, and network audit logs, September 10, 2025",
          records: "I request: (1) automated license plate reader (ALPR) detection records — timestamp, camera identifier and location, plate read, and associated vehicle image — captured on September 10, 2025 between 11:00 a.m. and 3:00 p.m. by Flock Safety (or other ALPR) cameras operated by or accessible to the Orem Police Department and located on or adjacent to the road corridors connecting the Utah Valley University campus and Timpanogos Regional Hospital; (2) any hotlist alert or notification records generated from those detections; (3) the Flock Safety \"Network Audit\" report (or equivalent system audit log) for the period September 10, 2025 to the date of this request, showing every search or query run against September 10, 2025 detection data — including the querying user, that user’s agency or organization (including any federal agency), the date of the query, and the stated reason; and (4) the agency’s ALPR data retention policy and any preservation, evidence, or litigation hold applied to September 10, 2025 ALPR data. If no responsive records exist for any numbered item — in particular, if no hold was applied and the detection data has been purged under a rolling retention period — I request written confirmation of that fact for that item, including a description of the search conducted and the date the data was purged. Because ALPR data is subject to short rolling retention, I ask that all potentially responsive records — expressly including any surviving September 10, 2025 ALPR detection data and the complete network audit logs — be preserved immediately upon receipt of this request and for the duration of processing and of any administrative appeal or review.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026, ready to file; TIME-CRITICAL (rolling retention). Supersedes the earlier hold-only queued variant: the Aug 2 draft adds the detection records, images, and hotlist alerts for the hospital-corridor window (11:00 a.m.–3:00 p.m.), per the Jul 31 lead brief — it catches both the shuttle and the SUV drive."
        },
        {
          agencyId: "provo",
          summary: "Provo PD — Sept 10 ALPR detections + images + hotlist alerts + network audit + retention/hold",
          subject: "GRAMA Request: Flock Safety ALPR detections, images, and network audit logs, September 10, 2025",
          records: "I request: (1) automated license plate reader (ALPR) detection records — timestamp, camera identifier and location, plate read, and associated vehicle image — captured on September 10, 2025 between 11:00 a.m. and 3:00 p.m. by Flock Safety (or other ALPR) cameras operated by or accessible to the Provo Police Department and located on or adjacent to the road corridors connecting the Utah Valley University campus and Timpanogos Regional Hospital; (2) any hotlist alert or notification records generated from those detections; (3) the Flock Safety \"Network Audit\" report (or equivalent system audit log) for the period September 10, 2025 to the date of this request, showing every search or query run against September 10, 2025 detection data — including the querying user, that user’s agency or organization (including any federal agency), the date of the query, and the stated reason; and (4) the agency’s ALPR data retention policy and any preservation, evidence, or litigation hold applied to September 10, 2025 ALPR data. If no responsive records exist for any numbered item — in particular, if no hold was applied and the detection data has been purged under a rolling retention period — I request written confirmation of that fact for that item, including a description of the search conducted and the date the data was purged. Because ALPR data is subject to short rolling retention, I ask that all potentially responsive records — expressly including any surviving September 10, 2025 ALPR detection data and the complete network audit logs — be preserved immediately upon receipt of this request and for the duration of processing and of any administrative appeal or review.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026, ready to file; TIME-CRITICAL (rolling retention). Supersedes the earlier hold-only queued variant: the Aug 2 draft adds the detection records, images, and hotlist alerts for the hospital-corridor window (11:00 a.m.–3:00 p.m.), per the Jul 31 lead brief — it catches both the shuttle and the SUV drive."
        },
        {
          agencyId: "ucso",
          summary: "Utah County SO — Sept 10 ALPR detections + images + hotlist alerts + network audit + retention/hold",
          subject: "GRAMA Request: Flock Safety ALPR detections, images, and network audit logs, September 10, 2025",
          records: "I request: (1) automated license plate reader (ALPR) detection records — timestamp, camera identifier and location, plate read, and associated vehicle image — captured on September 10, 2025 between 11:00 a.m. and 3:00 p.m. by Flock Safety (or other ALPR) cameras operated by or accessible to the Utah County Sheriff’s Office and located on or adjacent to the road corridors connecting the Utah Valley University campus and Timpanogos Regional Hospital; (2) any hotlist alert or notification records generated from those detections; (3) the Flock Safety \"Network Audit\" report (or equivalent system audit log) for the period September 10, 2025 to the date of this request, showing every search or query run against September 10, 2025 detection data — including the querying user, that user’s agency or organization (including any federal agency), the date of the query, and the stated reason; and (4) the agency’s ALPR data retention policy and any preservation, evidence, or litigation hold applied to September 10, 2025 ALPR data. If no responsive records exist for any numbered item — in particular, if no hold was applied and the detection data has been purged under a rolling retention period — I request written confirmation of that fact for that item, including a description of the search conducted and the date the data was purged. Because ALPR data is subject to short rolling retention, I ask that all potentially responsive records — expressly including any surviving September 10, 2025 ALPR detection data and the complete network audit logs — be preserved immediately upon receipt of this request and for the duration of processing and of any administrative appeal or review.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026, ready to file; TIME-CRITICAL (rolling retention). Supersedes the earlier hold-only queued variant: the Aug 2 draft adds the detection records, images, and hotlist alerts for the hospital-corridor window (11:00 a.m.–3:00 p.m.), per the Jul 31 lead brief — it catches both the shuttle and the SUV drive."
        },
        {
          agencyId: "dps",
          summary: "DPS/UHP — Sept 10 ALPR detections + images + hotlist alerts + network audit + statewide-network access",
          subject: "GRAMA Request: Flock Safety ALPR detections, images, and network audit logs, September 10, 2025",
          records: "I request: (1) automated license plate reader (ALPR) detection records — timestamp, camera identifier and location, plate read, and associated vehicle image — captured on September 10, 2025 between 11:00 a.m. and 3:00 p.m. by Flock Safety (or other ALPR) cameras operated by or accessible to the Utah Department of Public Safety / Utah Highway Patrol and located on or adjacent to the road corridors connecting the Utah Valley University campus and Timpanogos Regional Hospital, including I-15 mainline and interchange cameras between the Orem and Provo exits; (2) any hotlist alert or notification records generated from those detections; (3) the Flock Safety \"Network Audit\" report (or equivalent system audit log) for the period September 10, 2025 to the date of this request, showing every search or query run against September 10, 2025 detection data — including the querying user, that user’s agency or organization (including any federal agency), the date of the query, and the stated reason; and (4) the agency’s ALPR data retention policy and any preservation, evidence, or litigation hold applied to September 10, 2025 ALPR data. If no responsive records exist for any numbered item — in particular, if no hold was applied and the detection data has been purged under a rolling retention period — I request written confirmation of that fact for that item, including a description of the search conducted and the date the data was purged. Because ALPR data is subject to short rolling retention, I ask that all potentially responsive records — expressly including any surviving September 10, 2025 ALPR detection data and the complete network audit logs — be preserved immediately upon receipt of this request and for the duration of processing and of any administrative appeal or review.",
          parties: "Tyler James Robinson (defendant); Charlie Kirk (victim); the records custodian of SBI’s ALPR/Flock account (identification is part of the request).",
          formAnswers: [
            { label: "Date of occurrence", value: "09/10/2025" },
            { label: "Time of occurrence", value: "full day — September 10, 2025, with the retention/audit window running through October 15, 2025" }
          ],
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026, ready to file; TIME-CRITICAL (rolling retention). CORRECTION Aug 4: P014173 was briefly carded here, but its GovQA acknowledgment quotes the backpack-seizure request — P014173 belongs to the backpack card. This Flock/UHP draft has no acknowledgment on record and is still unfiled."
        },
        {
          agencyId: "wcso",
          summary: "Washington County SO — Flock preservation hold + search/audit log + vendor contract (I-15 south / surrender area)",
          subject: "GRAMA Request: Flock/ALPR preservation hold, search-audit log, and vendor contract — September 2025 UVU homicide investigation",
          records: "I request three categories of records concerning the Washington County Sheriff's Office use of Flock Safety automated license-plate-reader (ALPR) data in connection with the September 10-12, 2025 Utah Valley University homicide investigation, in Washington County and along the I-15 corridor south, including the area of the September 11 surrender: (1) any preservation request, legal hold, or litigation-hold notice sent to Flock Safety (or any ALPR vendor) to prevent deletion of reads related to this investigation, including the date sent and the plates or date range covered; (2) the ALPR search/audit log for September 10 – October 15, 2025 showing queries run in connection with this investigation — querying user, plate or search term, timestamp, and stated reason/case number (unrelated third-party queries may be redacted); and (3) the office's current contract, service agreement, or data-processing agreement with Flock Safety, including data-retention settings and any data-sharing or network-access terms. The contract is a standing public record; if the investigation-related items are withheld under § 63G-2-305, I request the segregable public portions and a written denial citing the provision. If no preservation hold exists, I request written confirmation of that fact.",
          ask_no_records: true,
          filed: "NOT FILED — queued; the absence of a preservation hold is itself the finding."
        }
      ]
    },
    {
      id: "second-suv",
      short: "The second SUV",
      challenge: "Neff, on tape, can't say where the second SUV went between the SLC landing and UVU.",
      categories: ["Timeline contradictions", "Witness statements"],
      entities: ["neff", "phillip", "mccoy", "tpusa", "charlie-kirk"],
      investigator: "Candace Owens (Ep 359 — the X-space audio)",
      investigatorLinks: [
        { label: "Candace — Ep 359 (X-space audio played at length)", url: "https://www.youtube.com/watch?v=X3VKJVJ7cN4" }
      ],
      status: "confirmed",
      finding: "On a recorded X space played in Ep 359, Blake Neff — who flew into Salt Lake City (not Provo) on Charlie Kirk's jet the morning of September 10 — says he rode in the SECOND of two SUVs Mikey McCoy rented, skipped Charlie's final restaurant interview, and cannot say where his vehicle went, who drove it, or who rode with him: \"We drove somewhere and because I wasn't going to that event, we just like parked and we marked time until the actual Utah Valley event\"; \"I actually have no idea where they parked it\"; \"I don't remember the specific people in my car.\" When a participant supplies \"It was just you and Danny Philip,\" he allows: \"That might be who it was.\" (The gap itself is confirmed — it's his own voice; what filled it is the open question.) Context from Owens' prior call-log reporting: Danny Phillip — Kirk's assistant, hired straight out of Ohio State in May 2025 — appears on Mikey McCoy's phone immediately before the 12:02 shot and for ~10 minutes after.",
      implication: "Roughly a two-hour window between wheels-down and the event, and the only account from inside the second vehicle is \"we marked time\" somewhere unknown. Nobody's memory is required to close it: the airport end is a city facility that generates records — the general-aviation landing report fixes the aircraft and the exact arrival time, and any ramp/gate vehicle-access record fixes when and where the SUVs met it — and the campus end issued event parking credentials. Neff also said no authority has asked him these questions (\"Why would I be asked the questions like that by the authorities?\") — so the paper trail is the only account being built at all.",
      sources: [
        { label: "Ep 359 [13:29–15:19] — the X-space exchange, verbatim; [11:54–12:50] the two-SUV logistics; [17:07–17:22] the McCoy–Phillip call-log claims (transcript + digest in the library, re-verified against a fresh scrape Jul 20 2026)", url: "https://www.youtube.com/watch?v=X3VKJVJ7cN4" }
      ],
      requests: [
        {
          agencyId: "slcda",
          summary: "SLC Airports — the GA landing report + ramp vehicle-access records for the morning arrival",
          subject: "GRAMA Request: general-aviation arrival and ramp vehicle-access records, morning of September 10, 2025",
          records: "I request, for Salt Lake City International Airport on September 10, 2025, between 6:00 a.m. and 12:00 noon: (1) the general-aviation / itinerant landing report or landing-fee record for that window — the routine operational record identifying arriving aircraft and arrival times; and (2) any AOA gate log, vehicle-escort record, or ramp vehicle-access record documenting ground vehicles admitted to a fixed-base-operator ramp to meet an arriving general-aviation aircraft during that window. I am requesting routine airfield operations records for a six-hour window on a single morning; I am not seeking security-system technical details, and vehicle records unrelated to general-aviation arrivals may be redacted.",
          ask_no_records: true
        },
        {
          agencyId: "uvu",
          summary: "UVU — event parking credentials and lot assignments issued for the TPUSA event",
          subject: "GRAMA Request: event parking credentials and lot assignments, September 10, 2025 event",
          records: "I request, concerning the September 10, 2025 Turning Point USA event at Utah Valley University: the parking passes, vehicle placards, or parking-credential records issued for the event, and the lot-assignment or reserved-parking coordination records identifying which vehicles (by organization, not by attendee) were authorized to park where. I am not requesting attendee lists or any student records. (This complements, and does not duplicate, the event-agreement and staff-roster request already on file as UVU #26-221.)",
          ask_no_records: true
        }
      ]
    },
    {
      id: "tpusa-contact",
      challenge: "Robinson reportedly met TPUSA reps at the quad the morning of the shooting.",
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
          ask_no_records: true,
          filed: "CLOSED — released Jul 31, 2026: 8 pages, Bates UVU 26-221-0001 through -0008. The production: the 25Live Event Confirmation for \"Turning Point Club–The American Comeback\" (Student Center Courtyard, Sep 10, reserved 7:00 a.m.–6:00 p.m., expected head count 200, resources including ES Event Set-Up Staff, a Power Distribution Box, and an \"ES Procedure: Commercial Film Requests\") plus the event-services coordination text thread, Aug 19 – Sep 9, 2025, names redacted under § 63G-2-305(11)/(12) and FERPA. Three no-records determinations, each appealable: (1) no facility-use contract; (2) no credentialing/access/staff roster for TPUSA setup personnel; (3) no vendor or contractor list — determinations (2) and (3) sit oddly against a confirmation that books setup staff and film-request procedure, and against texts referencing a filming request form, a 25Live reference number, and a written amplified-sound approval. The thread also documents the fountain: Aug 19 — \"Do you happen to know if we can turn off the fountain in the UVU courtyard?\" / \"Yes it can be turned off!\" (-0002); Sep 9, 2:26 p.m. — \"Who should I talk to to get the fountain turned off tomorrow?\" / \"I've already reached out to grounds! It will be off all day tomorrow\" (-0007). Appeal window on the no-records items: 30 days to UVU's CAO, ~Aug 30, 2026. The follow-on request for the named-but-not-produced paper is drafted below."
        },
        {
          agencyId: "uvupd",
          summary: "UVU PD — quad-area camera footage covering the morning contact window",
          subject: "GRAMA Request: quad/amphitheater camera footage, morning of September 10, 2025",
          records: "I request unedited exports of Utah Valley University camera footage covering the quad/amphitheater area where the September 10, 2025 event was being set up, for 8:15 a.m. – 10:30 a.m. that morning — the window in which preliminary-hearing testimony placed the defendant making contact with event representatives. If this footage has been provided to or seized by an investigating agency, I request the transfer record identifying that agency.",
          ask_no_records: true,
          filed: "FILED Aug 3, 2026 by email to uvpdrecords@uvu.edu — unedited quad/amphitheater exports, 8:15–10:30 a.m. Sept 10 (the window testimony places the defendant contacting event reps), with the transfer-record fallback if seized. Expect the § 63G-2-106 \"security measures\" wall UVU raised Aug 3 on #26-229/#26-230 — the appeal will target § 106’s categorical use."
        },
        {
          agencyId: "uvu",
          existing: true,
          summary: "UVU — the event paper set named in its own #26-221 release: fountain work order, MEAC assessment, film request + 25Live record, amplified-sound approval",
          subject: "GRAMA Request: fountain work order, MEAC assessment, film request form and 25Live record, and amplified-sound approval — September 10, 2025 event",
          records: "Each of the following records is identified in, or directly referenced by, the records UVU released on July 31, 2026 in response to request #26-221 (Bates UVU 26-221-0001 through -0008). I request: (1) the grounds or facilities work order, service request, or other record for turning off the courtyard fountain for the September 10, 2025 event — the shutoff was requested through UVU grounds on or about September 9, 2025 (\"I've already reached out to grounds! It will be off all day tomorrow,\" Bates 26-221-0007) — and any work order or record for restoring fountain operation on or after September 12, 2025; (2) the Major Event Assessment Committee (MEAC) risk assessment or review record for that event, conducted on or about August 25, 2025 (Bates 26-221-0003); (3) the film request form and the 25Live reservation record for that event, including any attachments describing the \"total footprint of the set\" and camera placement (Bates 26-221-0005); and (4) the written amplified-sound approval issued on or about September 8, 2025 for that event (Bates 26-221-0006 – -0007). Each item names a discrete, catalogued document already identified in UVU’s own production; this is not a broad search. If no responsive record exists for any numbered item, I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026; updated Aug 7, 2026 after the Jul 31 release landed and pinned every item to a Bates page: fountain shutoff through grounds Sep 9, off all day Sep 10 (-0007, -0002); MEAC meeting Aug 25 (-0003); film request + 25Live reference number (-0005); written amplified-sound approval sent Sep 8 (-0006/-0007). The fountain item now also reaches the reactivation side — the Sep 12 \"Chief says let the water flow!\" / \"cops just called me into the fountain area\" washdown texts in the JW production (see the paved-scene card). Ready to file via NextRequest (or grama@uvu.edu)."
        },
        {
          agencyId: "uvupd",
          summary: "UVU PD — the \"all approved\" paper: event sign-off, security/operations plan, staffing assignments",
          subject: "GRAMA Request: pre-event coordination and approval records for the September 10, 2025 event",
          records: "The event-coordination correspondence released by UVU on July 31, 2026 in response to request #26-221 states that the September 10, 2025 event organizers were \"connecting with our campus police\" and that the arrangement \"was all approved.\" I request, for the period August 15 through September 10, 2025: (1) the UVU Police Department’s written approval or sign-off record for the September 10, 2025 event; (2) the event security plan or operations plan prepared by or for the department for that event; and (3) the department’s staffing or post assignment record for that event. Each item names a discrete record generated in ordinary pre-event planning; this is not a broad search. If no responsive record exists for any numbered item — in particular, if no written approval or security plan exists — I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026, ready to file to uvpdrecords@uvu.edu. Either the approval paper exists, or \"it was all approved\" was said without any."
        }
      ]
    },
    {
      id: "dod-erika-messaging",
      short: "Pentagon boosted Erika",
      challenge: "Claim: the Pentagon juiced Erika Kirk's #1 trend — with no proof shown.",
      categories: ["Kirk assassination & coverup"],
      entities: ["erika-kirk", "charlie-kirk", "dod"],
      investigator: "Candace Owens",
      investigatorLinks: [
        { label: "Candace — Ep 352", url: "https://www.youtube.com/watch?v=3QJqtW_NOSI" }
      ],
      status: "reported",
      finding: "Candace Owens alleges the Department of Defense (\"Department of War\") orchestrated messaging to artificially boost Erika Kirk to the #1 social-media trend; she cites no documentary evidence.",
      implication: "A claim that a federal department ran a domestic messaging/influence effort around a private individual. If true, public-affairs guidance or social-media records would exist. Single-source, on-air allegation with no evidence shown — this request is what would confirm or refute it.",
      sources: [
        { label: "Candace Owens, Ep 352", url: "https://www.youtube.com/watch?v=3QJqtW_NOSI" }
      ],
      requests: [
        {
          agencyId: "dod",
          summary: "DoD — any public-affairs/social-media activity re Erika Kirk",
          subject: "FOIA Request: Department of Defense public-affairs or social-media records concerning Erika Kirk",
          records: "I request a copy of any public-affairs guidance, social-media activity log, or messaging directive concerning Erika Kirk issued by or within the Department of Defense, from September 1, 2025 to the date this request is processed. To keep this request narrow and minimize search burden, I am not seeking general email correspondence.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "c37-pag-denial",
      short: "C-37 99-0404 — the Presidential Airlift Group denial",
      challenge: "A routine flight-records FOIA came back denied at the discretion of the Presidential Airlift Group. A second request either corroborates the anomaly or produces a second appealable denial citing the same irregular authority.",
      categories: ["Kirk assassination & coverup"],
      entities: ["pag", "eop"],
      investigator: "Baron Coleman (the FOIA) · Danks (the report)",
      investigatorLinks: [
        { label: "Danks, Jul 27 2026 — Coleman’s Fort Huachuca FOIA and the PAG denial (transcript banked in the library)", url: "https://www.youtube.com/watch?v=InWAoVUD1PA" }
      ],
      status: "reported",
      finding: "Baron Coleman’s FOIA for flight records of C-37 tail 99-0404 — operations at or involving Fort Huachuca, Arizona on September 8–9, 2025, normally a routine ask through the 89th Airlift Wing’s squadrons — came back denied at the discretion of the Presidential Airlift Group. By Coleman’s elimination logic, PAG discretion over the records means White House Military Office tasking. The thread pairs with the WHMO misdirected-email anomaly (the \"Erika Kirk video trending\" email Candace Owens says she received within an hour of the Hilton event). Rides as attributed discourse until the paper lands.",
      implication: "A parallel request from a second requester is the cheapest possible test: either the 89th produces the schedule, manifests, and tasking records — or it issues a second written denial citing the same irregular authority, which corroborates the anomaly on paper and is appealable. The tasking/authorization item names the record that identifies which office directed the missions; the request asks that any PAG/WHMO-directed withholding be stated in writing in the determination.",
      sources: [
        { label: "Danks, Jul 27 2026 — the Coleman FOIA read-through", url: "https://www.youtube.com/watch?v=InWAoVUD1PA" }
      ],
      requests: [
        {
          agencyId: "af89aw",
          summary: "89th AW — flight schedule, manifests, and tasking authority for C-37 99-0404, Sept 8–9, 2025 (the parallel to Coleman’s denied request)",
          subject: "FOIA Request: flight schedule, manifests, and tasking authority for C-37 tail 99-0404, September 8–9, 2025",
          records: "I request, for the aircraft with tail number 99-0404 for September 8–9, 2025: (1) the flight schedule and mission records for its operations at or involving Fort Huachuca, Arizona; (2) the passenger manifests for those flights; and (3) the tasking or authorization record identifying the office that requested or directed those missions. Each item names a discrete, routinely generated record; this is not a broad search. If any item is withheld at the direction or discretion of the Presidential Airlift Group or the White House Military Office, I request that the withholding authority be stated in writing in the determination. If no responsive records exist for any item, please confirm that in writing, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026 — file via Air Force eFOIA or FOIA.gov to the 89th AW FOIA Office, Joint Base Andrews; avoid any Login.gov-gated path — the email trail is the record."
        }
      ]
    },
    {
      id: "kolvet-eeob-visit",
      short: "Kolvet at the White House",
      challenge: "Kirk's producer was at the White House the day before the Epstein files dropped.",
      categories: ["Kirk assassination & coverup"],
      entities: ["kolvet", "charlie-kirk", "kash-patel", "eop", "epstein"],
      investigator: "Candace Owens",
      investigatorLinks: [
        { label: "Candace — Ep 352", url: "https://www.youtube.com/watch?v=3QJqtW_NOSI" }
      ],
      status: "reported",
      finding: "Candace Owens reports that Andrew Kolvet, Charlie Kirk's producer, was at the White House / Eisenhower Executive Office Building the day before the DOJ released the Epstein files — while a Charlie Kirk show was pre-recorded (with Kash Patel) to make it appear he was in Arizona.",
      implication: "If a Kirk-world figure took a White House meeting the day before a major Epstein-files release, entry records would document it. Strong caveat: courts have ruled White House visitor logs held by the Secret Service are often NOT agency records subject to FOIA, so this may be denied on that ground (EEOB-tenant agencies like OMB are a separate avenue). Single-source, on-air account.",
      sources: [
        { label: "Candace Owens, Ep 352", url: "https://www.youtube.com/watch?v=3QJqtW_NOSI" },
        { label: "Credibility context (Ep 359, Jul 14 2026): Kolvet's own tweet, read on air, concedes two elements of Owens' Kolvet-sourced Netanyahu account — TPUSA declined a Netanyahu show appearance, and Kirk later took a Netanyahu call at Bill Ackman's house — while disputing her 'take TPUSA to the next level' claim. Doesn't bear on the EEOB visit directly; logged for weighing her single-source Kolvet reporting.", url: "https://www.youtube.com/watch?v=X3VKJVJ7cN4" }
      ],
      requests: [
        {
          agencyId: "usss",
          component: "U.S. Secret Service (in SecureRelease's component picker)",
          summary: "Secret Service — EEOB/White House entry records for Andrew Kolvet",
          subject: "FOIA Request: White House complex / EEOB access records for Andrew Kolvet",
          records: "I request a copy of any entry, exit, visitor, or access records for Andrew Kolvet at the White House complex and the Eisenhower Executive Office Building on the date of, and the day before, the Department of Justice's public release of the Epstein files (please insert the specific calendar date before filing). I am not seeking general email correspondence.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 25, 2026 via SecureRelease (DHS → U.S. Secret Service component); acknowledged the same day as FOIA File Number 2026-USSSFOIA-01640 ('reviewing your submission to determine appropriate next steps'). The card's caveat stands: WAVES/ACR-type entry records held by USSS have been held non-agency records under FOIA, so a denial on that ground is the expected first move — itself documentable, with the EEOB-tenant-agency lane (OMB et al.) as the follow-on."
        },
        {
          agencyId: "usss",
          summary: "Secret Service — the refile with real dates: WAVES/access records + appointment requests, Jul 26–Aug 1, 2026, for Kolvet, Minez, and TPUSA counsel",
          subject: "FOIA Request: WAVES/access records and appointment requests, White House complex, July 26 – August 1, 2026",
          records: "I request, for the period July 26 through August 1, 2026: (1) WAVES (Workers and Visitors Entry System) and ACR access records for the White House complex, including the Eisenhower Executive Office Building, for the following individuals: Andrew Kolvet (Turning Point USA), Marina Minez (Turning Point USA Chief Marketing Officer), and Turning Point USA’s in-house counsel; and (2) the visitor appointment request records submitted for those individuals for that period, including the requesting office and sponsoring official. This request is bounded to a single named week and three named individuals; it is not a broad search. If the Secret Service’s position is that responsive records are presidential records outside its custody, I request that determination in writing, identifying the system of records to which the request was applied. If no responsive records exist, please confirm that in writing, including a description of the search conducted. I request that all records potentially responsive to this request be preserved for the duration of processing and of any administrative appeal or review — expressly including WAVES records otherwise subject to periodic transfer or deletion.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026. The refile with real dates: the Jul 26–Aug 1 window is anchored to Candace’s Jul 27 tip (\"meeting tomorrow, maybe Wednesday\") and Netanyahu’s Jul 27 DC arrival — adjust if a firmer date surfaces. Email FOIA@usss.dhs.gov preferred over SecureRelease — email is the record."
        }
      ]
    },
    {
      id: "memorial-nsse",
      short: "Was the memorial an NSSE?",
      challenge: "Was Kirk's Glendale memorial a National Special Security Event — and who held security lead?",
      categories: ["Kirk assassination & coverup"],
      entities: ["charlie-kirk", "erika-kirk", "usss", "amodei"],
      investigator: "Ana Escobar (Fort Banana: Connecting the Dots, Part 1)",
      investigatorLinks: [
        { label: "Ana Escobar — Fort Banana: Connecting the Dots (Part 1)", url: "https://www.youtube.com/watch?v=OEsx7hpIFic" }
      ],
      status: "reported",
      finding: "Ana Escobar builds an inference chain connecting the Butler rally, the presidential inauguration, and Charlie Kirk's September 21, 2025 memorial at State Farm Stadium in Glendale as Secret Service events, pivoting on Rep. Mark Amodei's seat on the House Appropriations Subcommittee on Homeland Security — which funds the Secret Service — toward a claim about who shaped the memorial's security. (Re-verified against her transcript Jul 20 2026: the NSSE framing is hers verbatim; she explicitly hedges — \"I'm not trying to make any kind of allegations.\" Two corrections to her chain: Amodei doesn't just sit on that subcommittee, he CHAIRS it; and Butler was a campaign rally, not an NSSE.) The underlying checkable fact is narrower and real: the memorial's actual DHS designation is reported as SEAR Level 1 — Special Event Assessment Rating, Secret Service security lead — not an NSSE, and the designation paperwork is a record either way.",
      implication: "Whether the memorial was an NSSE or a SEAR-rated event is a discrete, documentable fact. The designation determination, the lead-agency assignment, and the operational-plan summary are records. The designation — or its absence — either supports or deflates the 'same story as Butler' framing. (The Amodei-appropriations-to-Secret-Service motive chain is Escobar's explicitly speculative inference; this request tests the one underlying fact, not the theory.)",
      sources: [
        { label: "Ana Escobar — Fort Banana (Part 1): the NSSE / Amodei-appropriations through-line (transcript re-pulled live Jul 20 2026)", url: "https://www.youtube.com/watch?v=OEsx7hpIFic" }
      ],
      requests: [
        {
          agencyId: "usss",
          summary: "Secret Service — NSSE/SEAR designation and security-lead records for the Glendale memorial",
          subject: "FOIA Request: NSSE or SEAR designation and operational security-lead records for the September 2025 Charlie Kirk memorial, Glendale, Arizona",
          records: "I request records sufficient to show whether the memorial service for Charlie Kirk held on or about September 21, 2025 at State Farm Stadium in Glendale, Arizona was designated a National Special Security Event (NSSE) or assigned a Special Event Assessment Rating (SEAR) level, including the designation determination, request, or notification, and any record identifying the federal agency assigned operational security lead for the event. I am requesting the designation and lead-agency records only, not tactical operational details whose release could reasonably endanger safety. To keep this request narrow and minimize search burden, I am not seeking general email correspondence.",
          ask_no_records: true,
          filed: "PENDING — FILED Aug 4, 2026 via SecureRelease (DHS → United States Secret Service); acknowledged same day as FOIA File Number 2026-USSSFOIA-01703. Fee-waiver and expedite determinations to come separately per the ack. FOIA Public Liaison: Kevin Tyrrell, (202) 220-1819; FOIA@usss.dhs.gov."
        }
      ]
    },
    {
      id: "backpack-stop-testing",
      short: "The bus-stop backpack",
      challenge: "A backpack on the shooter's flight route went to the FBI lab — then someone stopped the testing.",
      categories: ["Physical evidence", "Crime scene handling"],
      entities: ["robinson", "charlie-kirk", "sbi", "fbi-ent"],
      investigator: "Preliminary-hearing record (courtroom audio via Candace Eps 360–361)",
      investigatorLinks: [
        { label: "Candace Ep 360 — the Filomena seizure testimony, played", url: "https://www.youtube.com/watch?v=puuMVxEu5NU" },
        { label: "Candace Ep 361 — the Baker lab-notes cross, played", url: "https://www.youtube.com/watch?v=mLvJqdxS-FY" }
      ],
      status: "confirmed",
      finding: "Two witnesses, both on courtroom audio. Sgt. Jennifer Filomena (State Bureau of Investigation) testified that officers canvassing the shooter's flight route deemed the Fulton Library a potential crime scene because of unattended items at the bus stops — \"a backpack, a jacket, as well as some gloves, and there may have been some other things\" — seized them, and sent them to the FBI lab for processing \"along with some information that the suspect may have shed some of these items as he fled.\" Asked whether she later told the lab the items weren't connected and testing should stop: \"I don't remember communicating that\" — but agreed the FBI/ATF lab notes recording that communication would not be inconsistent with what she knows. FBI examiner Amanda Baker testified the backpack was exhibit 9, was processed for DNA, and then \"no comparisons needed\" once it was \"potentially left behind by a bystander\" — at which point the cross-examiner read her own lab notes at page 20: the backpack \"belongs to Kirk's detail.\" Baker: \"that was not my communication log. That was someone else within the laboratory.\" Nobody named the detail member, the note's author, or who ordered the stop.",
      implication: "Whoever the backpack belonged to, the paper trail is administrative and discrete: the seizure/property record for the bus-stop items, the communication that told the FBI lab to stand down, the lab-note entry attributing the backpack to the protective detail, and — if the items were returned to an owner — the release record naming them. Testing that stops because \"the person was on Charlie's team\" is exactly the kind of determination that has to be written down somewhere; either the record exists or the stop was undocumented, and both answers are findings.",
      sources: [
        { label: "Ep 360 [9:57–11:23] — Filomena: seizure, FBI lab, \"pull a plug,\" the FBI/ATF notes exchange (verbatim, re-read Jul 20 2026)", url: "https://www.youtube.com/watch?v=puuMVxEu5NU" },
        { label: "Ep 361 [16:27–20:42] — Baker: exhibit 9, DNA processing halted, the page-20 \"Kirk's detail\" note authored by \"someone else within the laboratory\" (verbatim, re-read Jul 20 2026)", url: "https://www.youtube.com/watch?v=mLvJqdxS-FY" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — the seizure/property records and the stand-down communication for the bus-stop items",
          subject: "GRAMA Request: property and evidence records concerning items seized at the Fulton Library bus stops, September 10, 2025",
          records: "I request, concerning the September 10, 2025 Utah Valley University homicide investigation: (1) the property or evidence seizure records for the unattended items collected at or near the Fulton Library bus stops (a backpack, jacket, and gloves, and any other items in that seizure group); (2) any record of a communication from the State Bureau of Investigation to the FBI laboratory concerning whether those items were connected to the case or whether analysis should be discontinued; (3) the record of any determination that the items belonged to a member of the decedent's protective detail or to any other identified person; and (4) if the items were released or returned, the release record showing to whom and when. Personal identifiers of uninvolved private persons may be redacted; the existence, date, and authorship of the determination records is the request. If no record of the discontinuation communication exists, I request written confirmation of that fact. Please also retain this correspondence and all records related to the processing of this request.",
          parties: "Tyler James Robinson (defendant); Charlie Kirk (victim); the SBI official who communicated with the FBI laboratory, and the protective-detail member to whom any determination attributed the items (names unknown — identification is part of both).",
          formAnswers: [
            { label: "Date of occurrence", value: "09/10/2025" },
            { label: "Time of occurrence", value: "midday, in the hours after the shooting (bus-stop items collected during the response)" }
          ],
          ask_no_records: true,
          filed: "PENDING — FILED Aug 4, 2026 via the DPS GovQA Records Center as P014173-080426; acknowledged same day with the request text quoted back (property/evidence seizure records for the unattended items at the Fulton Library bus stops — backpack, jacket, gloves). Records Center status: Assigned / In Progress."
        },
        {
          agencyId: "fbi",
          summary: "FBI — the lab communication log and the page-20 note attributing the backpack to Kirk's detail",
          subject: "FOIA Request: laboratory communication log and case-note records concerning exhibit 9 (backpack), Utah Valley University homicide investigation",
          records: "I request, concerning FBI laboratory processing in the September 10, 2025 Utah Valley University homicide investigation (State v. Robinson, Utah Fourth District No. 251403576): (1) the laboratory communication log entries concerning the backpack designated exhibit 9 and its contents, including the communication that DNA comparisons were no longer needed; (2) the case-note entry (referenced at the July 2026 preliminary hearing as appearing at page 20 of the examiner's notes) recording that the backpack belonged to the decedent's protective detail, together with records sufficient to show which agency or official communicated that information to the laboratory; and (3) any record of the laboratory's disposition of the item thereafter. Names of laboratory personnel may be redacted; the originating agency and role of the communicating official is the request. Expect and please state any Exemption 7(A) withholding in writing with the volume of records withheld.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "panguitch-alibi",
      challenge: "Two restaurant staff put Robinson three hours from the scene that night.",
      short: "The Panguitch alibi",
      categories: ["Timeline contradictions", "Witness statements"],
      entities: ["robinson", "twiggs", "fbi-ent", "sbi"],
      investigator: "Diligent Denizen · Baron Coleman · Candace Owens",
      investigatorLinks: [
        { label: "Diligent Denizen — the on-camera staff interview (posted Jul 12)", url: "https://x.com/DiligentDenizen/status/2076405974597063038" },
        { label: "Diligent Denizen — VIDEO of the physical receipt (Jul 16, 957K views): two eyewitnesses ID Robinson 8:55–9:47pm; his read — the 2h57m Panguitch→Orem drive makes the ~11pm Orem texts impossible, so \"the texts, the confession, and Lance Twiggs' testimony are ALL FAKE\"", url: "https://x.com/DiligentDenizen/status/2077905879341433104" },
        { label: "Diligent Denizen — full Cowboy's Smokehouse visit (Jul 19): owner hands over the receipt (\"IS the ticket in question\") + full on-camera eyewitness interview", url: "https://x.com/DiligentDenizen/status/2078967048521036149" },
        { label: "Coleman Ep. 143 — the timeline math against the state's own texts", url: "https://www.youtube.com/watch?v=yBDB-mpI-Xw" },
        { label: "Interview video, archived", url: "https://web.archive.org/web/20260713050144/https://video.twimg.com/ext_tw_video/2076405353022095360/pu/vid/avc1/1280x720/CBzgt2rfdWeCpsLE.mp4" }
      ],
      status: "contested",
      finding: "Two staff at Cowboy's Smokehouse in Panguitch — on camera, one of whom personally took Robinson's card at checkout near the 10 p.m. close — say they served him the evening of September 10 and are \"100%\" on the ID (face, voice, mannerisms; more certain than Lance Twiggs was about the stairwell figure). They reported it to the FBI, who took contact information and never followed up; the sighting reached Candace Owens months ago. Neither the prosecution nor the defense has ever contacted the restaurant. The math: fastest route Panguitch→UVU is ~2h46m, so a ~9:50 p.m. departure puts the earliest Orem arrival at ~12:36 a.m. — while the state's text-message exhibits have \"Robinson\" texting Twiggs from outside UVU, watching a lingering cop, with the first message at 11:00 p.m. DD's original Jul 12 post — preserved in the Jul 18 receipts batch as fxtwitter + syndication captures with full note text and server timestamps — runs the math in his own words: \"Panguich is 2 hours 49 minutes from UVU\"; \"If he left at 10pm the fastest he could be at UVU is 12:47am\"; against a text timeline he characterizes as \"watching & waiting for the police to leave hours before 12:36am-ish on the 11th as is in the texts.\" (Coleman's Ep 146 detail on that clock reading: Robinson was flagged down by a cop while waiting at a red light at 12:36 a.m. that night — flagged down, not \"pulled over\" [3:18:22–28].) A card payment record with a hard timestamp exists at a named business. Update (Jul 19, re-verified against the scrape Jul 20): the owner of Cowboy's Smokehouse set a copy of that receipt in front of Diligent Denizen — \"IS the ticket in question\" — arranged the on-camera (face-cropped) eyewitness interview, disclosed the restaurant had no working camera the night of the sighting, and said the store is fielding harassing calls. The owner himself, who wasn't there that night, says he doesn't think it was Robinson though it \"makes sense it could be\" — the ID rests on the two staff eyewitnesses, one of whom printed the receipt for the FBI. Counterweight (Jul 18–19, from the Jul 20 trend grab): the restaurant itself has now spoken. An \"Official Statement\" posted by Cowboy Smokehouse/Steakhouse on Facebook — circulating as a screenshot, surfaced in a reply to Owens (@_midGRAY; receipts midgray-cowboy-smokehouse-statement-2078627259246579841 fxtwitter + syndication + photo1.jpg) — reads, verbatim as visible in the image: \"Based on the information currently available to us, we have no evidence establishing whether Tyler Robinson was at our restaurant around September 10, 2025. We have responded truthfully to those who have questioned us, based on the information available to us at the time. We have fully cooperated, and will continue to cooperate, with the authorities conducting this investigation. Because this is an active matter, we cannot and will not comment further.\" That gives the alibi no institutional backing — and Owens' receipted reply concedes the ground while reframing it: because the restaurant has no operable cameras, \"the owner cannot definitively state that Tyler was at his restaurant on September 10th\"; there were three servers that night; \"the server that actually served Tyler Robinson was certain it was him\"; the owner then pulled the receipt and found \"at the very least— someone with the name of Tyler Robinson had paid with his credit/debit card\"; the restaurant reported it to the Feds, and \"The Feds hardly cared.\" That is a documented narrative shift against the DD layer above — from two 100%-certain eyewitnesses to ONE server certain plus a name-match on a receipt, with the owner explicitly unable to confirm. What the receipts document is the screenshot's circulation and Owens' response to it; the statement's authenticity rests on the screenshot alone pending the restaurant's original Facebook post. (Status contested: the DD interview layer is on tape and archived; the restaurant's statement-as-screenshot now sits directly against it; the sighting itself remains a witness claim outside the court record — which is exactly the problem the records requests attack.)",
      implication: "If the tip is wrong, the case file shows it was run down and excluded — routine. If the tip was never run down, a 100%-ID alibi sighting with a checkable payment record sat in the FBI's intake while the state built a timeline it contradicts. Either way the paper answers: the tip/lead log entry, and any record of follow-up, are discrete administrative records on the state side. (The FBI intake itself is federal — that request lives on the federal FAFO.) Coleman's read of the same facts: \"either the texts are fabricated... or someone was pretending to be Tyler.\" The Jul 18 receipts batch pins the remaining checkables that live outside GRAMA: the Smokehouse's own merchant/POS records for the night of September 10 (a private business — discovery territory, not a records request), and whether prosecution or defense ever contacted the restaurant — testable against the witness lists and discovery filings on the public court docket in State v. Robinson. The Jul 20 trend grab adds two more: (1) the restaurant's ORIGINAL Facebook statement — the circulating version is a screenshot; pull the timestamped original from the restaurant's own page. It is now the pivotal document of the alibi fight. (2) For weighing the card's loudest current advocate: the filed Harpole v. Owens complaint, which Owens characterizes in a receipted post (\"Brian Harpole explicitly claims he had to go on Shawn Ryan to refute my claims... he lost business and revenue for which I am to blame\"; receipt realcandaceo-harpole-lawsuit-readback-2078627672758886911) and her detractors characterize the other way — the complaint itself is a public court record, checkable directly; Paramount Tactical's parent post tags @dhillonlaw (Dhillon Law Group — possible counsel identification).",
      sources: [
        { label: "On-camera interview (3:09), receipts + Wayback archives in the library", url: "https://web.archive.org/web/20260713050134/https://cdn.syndication.twimg.com/tweet-result?id=2076405974597063038&token=a" },
        { label: "Receipts batch (captured Jul 18, REFS written Jul 20): DD's Jul 12 post as fxtwitter + syndication JSONs — full note text, server timestamps, as-captured stats (336K views) — plus a 102-post snapshot of the account's timeline the same day. The post's claims (witness ID, FBI report, debit-card payment, drive-time math) remain DD's assertions; what the receipts fix is exactly what he said, when", url: "https://x.com/DiligentDenizen/status/2076405974597063038" },
        { label: "Ep. 143 segment [20:45–34:30]", url: "https://www.youtube.com/watch?v=yBDB-mpI-Xw" },
        { label: "The Cowboy Smokehouse \"Official Statement\" as it circulated (Jul 18): a screenshot of a Facebook post, posted in a reply to Owens by @_midGRAY — receipts midgray-cowboy-smokehouse-statement-2078627259246579841 (fxtwitter + syndication JSONs + the screenshot as photo1.jpg); trend grab in the library: X trend 2026-07-20 - Acting-alone debate reignites - POSTS.md. \"[W]e have no evidence establishing whether Tyler Robinson was at our restaurant around September 10, 2025.\" Screenshot only — the restaurant's original Facebook post is the authentication, and pulling it is an open lead", url: "https://x.com/_midGRAY/status/2078627259246579841" },
        { label: "Owens' receipted response (Jul 19, two posts — receipts realcandaceo-three-servers-reported-feds-2078632931958870381 and realcandaceo-tick-tock-three-servers-2078638277523841385): no operable cameras, so the owner \"cannot definitively state\"; three servers that night, the one who served him \"certain\"; an owner-pulled receipt with \"at the very least\" a Tyler Robinson name-match on the card payment; reported to the Feds, who \"hardly cared.\" Her assertions, on the record verbatim — the concession and the reframing in the same posts", url: "https://x.com/RealCandaceO/status/2078638277523841385" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — the lead/tip log entry for the Panguitch sighting (absence is the finding)",
          subject: "GRAMA Request: lead or tip records concerning a reported September 10, 2025 sighting in Panguitch, Utah",
          records: "I request, concerning the Utah Valley University homicide investigation: (1) the lead, tip, or information-report log entry documenting receipt of information that the suspect was seen at a restaurant in Panguitch, Utah on the evening of September 10, 2025 — whether received directly, from the FBI, or from any other agency; and (2) any record documenting investigative follow-up on that information, including any interview of the reporting witnesses or any records request to the business, or a record of the decision not to follow up. Witness personal identifiers may be redacted. If no responsive records exist, I request written confirmation of that fact, including a description of the search conducted.",
          ask_no_records: true,
          filed: "TWO OF THE BATCH DENIED — P012986 and P012989 denied Aug 1, 2026 by SBI Records Manager Tina Rodriguez as \"exempt from disclosure\"; the email notice’s \"for the following reasons:\" is followed by nothing — the actual grounds are visible only inside the GovQA portal, and which two of the five asks those numbers map to is pending a portal login. P012987 remains the batch’s one live request (Records Center, Aug 4, 2026: Assigned / In Progress). Original batch: filed Jul 16, 2026 via GovQA — P012986/87/89/92/95 (exhibit 12.1/12.4 tasking records, Panguitch tip log, Discord evidence intake, ballistics + GSR reports, latent prints 11B–11D)."
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
      id: "ucao-blanket-hold",
      short: "The UCAO blanket hold — one letter to rule them all",
      challenge: "A Utah County deputy attorney sent another county’s sheriff a notice pre-classifying ALL Kirk-shooting records as protected — category-wide, no record-by-record determination, \"until further written notice.\" How many entities got one?",
      categories: ["Kirk assassination & coverup"],
      entities: ["ucao-ent", "wcso-ent"],
      investigator: "Produced by WCSO itself, Aug 3 2026, in response to this docket’s McBride-letter request",
      investigatorLinks: [],
      status: "confirmed",
      finding: "In hand: a \"Notice of Records Restriction Due to Ongoing Investigation\" from the Utah County Attorney’s office (Deputy Attorney Katrina Cole, on letterhead listing County Attorney Jeffrey S. Gray and division chiefs including Ryan McBride), sent to the Washington County Sheriff’s Office: under § 63G-2-305(10), ALL \"printed and electronic correspondence, arrest records, witness statements, reports, notes, recordings, internal communications, interviews, body camera footage, or other records related to the shooting of Charlie Kirk on September 10, 2025\" are to be withheld \"until further written notice from this office,\" with staff told to \"notify our office immediately before taking any action\" on any request. WCSO’s temporary records clerk produced it Aug 3, 2026 with the note that she \"did not know this letter existed,\" called to confirm it is \"still active,\" and will release nothing Robinson-related until trial ends. The same notice was cited the same day to deny this docket’s WCSO CAD-log and Mitchell-interview requests.",
      implication: "GRAMA classification is record-by-record and belongs to the record’s custodian — § 305(10) protects records whose release would actually interfere, not every record an outside prosecutor labels in advance, and segregability (§ 63G-2-308) survives any classification. A standing instruction from one county’s prosecutor to another county’s sheriff — \"notify our office before taking any action\" — is itself a records-suppression paper trail, and it is now in hand. The follow-on ask writes itself: every such notice UCAO has issued, the full recipient list, and the authorization behind the campaign. Each additional recipient is another denial letter that traces back to one desk.",
      sources: [
        { label: "The notice itself — produced by WCSO Aug 3, 2026 (banked in the library’s foia-mail archive)", url: "" }
      ],
      requests: [
        {
          agencyId: "ucao",
          summary: "UCAO — every Notice of Records Restriction issued on this case, the recipient list, and the authorization behind them",
          subject: "GRAMA Request: notices of records restriction issued concerning the September 10, 2025 UVU shooting",
          records: "I request: (1) each \"Notice of Records Restriction\" or similar letter issued by or on behalf of the Utah County Attorney’s office concerning records related to the September 10, 2025 shooting at Utah Valley University — including the notice signed by Deputy Attorney Katrina Cole and sent to the Washington County Sheriff’s Office, a copy of which I hold; (2) the distribution or recipient list for such notices — each governmental entity to which one was sent, with dates; (3) any written responses or notifications received from recipient entities under the notices’ instruction to \"notify our office immediately\" upon receiving a records request; and (4) the record documenting the decision to issue the notices — the requesting official, authorization, and date. Each item names discrete administrative correspondence of the office; this is not a request for investigative files. If no responsive record exists for any numbered item, I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 3, 2026, ready to file to ucao@utahcounty.gov / UCAOrecords@utahcounty.gov. The office’s own notice invites the ask: correspondence ABOUT restricting records is not itself a restricted investigative record."
        }
      ]
    },
    {
      id: "hospital-searcher",
      challenge: "Someone searched hospitals for Charlie Kirk within hours — and the police audio ties his vehicle to the FBI.",
      short: "The hospital searcher",
      categories: ["Timeline contradictions"],
      entities: ["fbi-ent", "charlie-kirk", "bagley", "sbi"],
      investigator: "Baron Coleman (Ep. 147 — police audio)",
      investigatorLinks: [
        { label: "Coleman Ep. 147 — the hospital police audio (full transcript read + archived Jul 20 2026)", url: "https://www.youtube.com/watch?v=DzzvnsEXOOk" }
      ],
      status: "reported",
      finding: "Per the police-scanner audio Coleman walks through: on September 10 a man went into Utah Valley Hospital asking for Charlie Kirk — \"when confronted, he took off running, got in that car and jetted out of there.\" A BOLO with his photo went to the area hospitals; radio described him as HEAVIER SET with two normal hands, best-guess vehicle an older Nissan Armada. Later, while units staked out Zechariah Qureshi's apartment, an Armada rolled up on them and dispatch relayed \"Armada is FBI\" — a second arrival was \"with the marshals\" — followed by on-air confusion distinguishing FBI from SBI. The conflations resolved on the audio: Qureshi had come to police attention over alleged social-media posts about Kirk that he was deleting, NOT hospital visits (at one point scanner traffic had him \"in tactical gear going hospital to hospital\" — wrongly); and the one-armed man, Andrew Piscaldo, got \"official confirmation... not involved.\" Separately: a visitor at Timpanogos Regional documented caution tape and police cars going up ~1:20 p.m. and the hospital still locked down 5:19–5:40 p.m. (\"told me I can't leave\"), with ME vehicles and tactical officers arriving ~5:40 per local news. The lockdown PRE-DATES the searcher radio traffic (~2:49 p.m.), and a nurse in Coleman's chat notes area-wide lockdown is standard procedure during a shooting — so the lockdown corroborates the scene, not the searcher.",
      implication: "A man searching hospitals for the victim — whom the same night's dispatch traffic ties to an FBI vehicle, and who fled when confronted instead of showing a badge — is either in the records or he isn't. And the build cuts against the shooter: Officer Bagley, the first officer to the Losee roof, described the roof figure as \"not heavy set,\" while the hospital searcher was \"heavier set\" on the radio. The dispatch/CAD audio for the hospital calls, any report identifying the search subject or his agency, and the lockdown-coordination records are discrete records; if he was federal, the no-records response itself becomes the finding.",
      sources: [
        { label: "Coleman Ep. 147 police audio (whisper transcript archived to sov-library; claims re-verified against the full transcript Jul 20 2026)", url: "https://www.youtube.com/watch?v=DzzvnsEXOOk" },
        { label: "Timpanogos Regional witness posts (caution tape ~1:20 p.m.; still locked down 5:19–5:40 p.m.) + local-news ME/tactical arrival clip", url: "" },
        { label: "Officer Bagley preliminary-hearing testimony — roof figure described as \"not heavy set\"", url: "" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — dispatch/CAD for the hospital-search calls + any report identifying the subject",
          subject: "GRAMA Request: dispatch/CAD records concerning an individual searching hospitals for the victim, September 10, 2025",
          records: "I request the computer-aided dispatch (CAD) and radio log records, and any incident or information report, concerning reports on September 10, 2025 of an individual going between hospitals (including Utah Valley Hospital and Timpanogos Regional Hospital) seeking the location of Charlie Kirk in connection with the Utah Valley University homicide investigation — including any record identifying that individual or their agency, any BOLO or lookout issued, and any record of the resulting hospital-lockdown coordination. Unrelated calls for service may be redacted. If no responsive records exist, I request written confirmation of that fact, including a description of the search conducted. Please also retain this correspondence and all records related to the processing of this request.",
          parties: "Tyler James Robinson (defendant); Charlie Kirk (victim, subject of the searches); the individual reported going between hospitals (identification is part of the request).",
          formAnswers: [
            { label: "Date of occurrence", value: "09/10/2025" },
            { label: "Time of occurrence", value: "afternoon–evening of September 10, 2025, following the ~12:23 p.m. shooting" }
          ],
          ask_no_records: true
        },
        {
          agencyId: "orem",
          summary: "Orem PD — dispatch/incident records for the hospital lockdown, Sept 10",
          subject: "GRAMA Request: dispatch and incident records concerning a hospital lockdown, September 10, 2025",
          records: "I request the dispatch/CAD and any incident report records held by the Orem Police Department concerning the lockdown of, or law-enforcement response to, Timpanogos Regional Hospital (and any other Orem-area hospital) on September 10, 2025 in connection with reports of an individual searching for Charlie Kirk — including the reason for the lockdown, the agency that requested it, and any record identifying the individual whose conduct prompted it. If no responsive records exist, I request written confirmation of that fact.",
          ask_no_records: true,
          filed: "PENDING — FILED Aug 4, 2026, 2:30 p.m. by email to records@orem.gov — dispatch and incident records concerning the hospital lockdown, September 10, 2025. Same office that stonewalled the K9 ask — but a lockdown incident record is administrative dispatch paper. 10-business-day clock."
        }
      ]
    },
    {
      id: "noble-report",
      challenge: "Officer omitted that the doorbell witness saw a bald driver and three passengers.",
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
          records: "I request the investigative report, or interview summary, documenting the interview of the homeowners whose Nest doorbell camera captured a vehicle associated with the Utah Valley University homicide investigation parked on their street overnight September 10–11, 2025 — the report whose contents (including the description of the vehicle's driver and occupants) were confirmed by a testifying officer during the preliminary hearing in State v. Robinson. Witness personal identifiers may be redacted; the substance of the recorded descriptions is the request. Please also retain this correspondence and all records related to the processing of this request.",
          parties: "Tyler James Robinson (defendant); Charlie Kirk (victim); the interviewed homeowners (identifiers may be redacted); the interviewing officer or agent (name unknown — the testifying officer confirmed the report's contents at the preliminary hearing).",
          formAnswers: [
            { label: "Date of occurrence", value: "09/10/2025" },
            { label: "Time of occurrence", value: "overnight September 10–11, 2025 (the vehicle was parked on the street overnight; the interview followed)" }
          ],
          ask_no_records: true
        },
        {
          agencyId: "dps",
          summary: "DPS/SBI — the ORIGINAL Nest export and its metadata (the courtroom copy was cut and degraded)",
          subject: "GRAMA Request: original doorbell-video files and export metadata, September 2025 investigation",
          records: "Concerning the residential Nest doorbell video of a vehicle parked overnight September 10–11, 2025, portions of which were played at the July 2026 preliminary hearing in State v. Robinson: I request (1) records sufficient to show the acquisition of the video from the homeowners or from the camera vendor's cloud service — the date acquired, the file count, and the acquiring officer or agency; (2) the technical metadata of the files as acquired (native resolution, duration, timestamps, and any export or processing history); and (3) records documenting any editing, clipping, or re-encoding of the video between acquisition and its courtroom presentation, including who prepared the version played in court. I am requesting acquisition and processing records, not the video content itself, so no protected-content withholding should be necessary; the courtroom copy contained visible cuts and was materially degraded relative to the camera's native quality, and the processing chain is the question. (Verbatim basis: Ep 141 [20:43–22:15], re-verified Jul 20 2026.) Please also retain this correspondence and all records related to the processing of this request.",
          parties: "Tyler James Robinson (defendant); Charlie Kirk (victim); the acquiring officer or evidence technician (name unknown — identification is part of the request).",
          formAnswers: [
            { label: "Date of occurrence", value: "09/10/2025" },
            { label: "Time of occurrence", value: "overnight September 10–11, 2025 (the recording window; acquisition followed)" }
          ],
          ask_no_records: true
        }
      ]
    },
    {
      id: "dna-elimination",
      challenge: "The roommate's DNA was on the evidence too — labeled only an “elimination sample.”",
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
        { label: "DNA-day testimony (day 3 afternoon), incl. the elimination-sample characterization", url: "" },
        { label: "Coleman Ep 146 context on this card's item: only the screwdriver DISASSEMBLY theory was abandoned (\"that wasn't the feds, that was Governor Cox\") — the assembled-on-the-roof account stands [2:38:17–2:38:36] — and the screwdriver itself, \"the only thing that places him on the roof,\" has never been shown [3:17:52–3:18:00]", url: "https://www.youtube.com/watch?v=jTCL1rt-52Q" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/crime lab — the full-contributor DNA reports and the elimination-standard designation",
          subject: "GRAMA Request: DNA analysis reports and reference-standard designations, State v. Robinson evidence",
          records: "I request, concerning laboratory DNA analyses in the Utah Valley University homicide investigation: (1) the DNA examination report(s) for the towel and the screwdriver referenced in July 2026 preliminary-hearing testimony, including all contributor findings for each item; and (2) the case record designating which individuals' reference samples were treated as elimination standards in those analyses, and the basis recorded for each designation. Both items were the subject of public preliminary-hearing testimony. Please also retain this correspondence and all records related to the processing of this request.",
          parties: "Tyler James Robinson (defendant); Charlie Kirk (victim); the crime-lab DNA examiner(s) of record for the towel and screwdriver analyses, including any examiner whose verification results differed (names unknown — identification is part of the request).",
          formAnswers: [
            { label: "Date of occurrence", value: "09/10/2025" },
            { label: "Time of occurrence", value: "full day — evidence collected September 10–11, 2025; laboratory analyses followed" }
          ],
          ask_no_records: true
        }
      ]
    },
    {
      id: "state-plane",
      challenge: "Investigators landed south hours after the earliest claimed custody time.",
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
        { label: "Day 3 testimony; public flight tracking", url: "" },
        { label: "Sam Parker — WCSO Attorney confirmed a Sept 11 Washington County arrest; Robinson Mirandized 6:25 PM (1.5 hrs before the 7:57 PM Discord message); Parker poses Davis's ~10 PM WCSO arrival as unaccounted-for given the 3+ hr drive — connecting that gap to this card's night flight is our inference, not Parker's claim", url: "https://x.com/BasedSamParker/status/2055008839985135940" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS Aero Bureau — flight log and manifest for the Sept 11 flight south",
          subject: "GRAMA Request: DPS aircraft flight records, September 11–12, 2025",
          records: "I request the flight log, tasking record, and passenger manifest for any Utah Department of Public Safety aircraft flight from the Salt Lake City area to St. George or Washington County on September 11, 2025 (including the flight arriving at approximately 11:37 p.m.), and any return flight through September 12, 2025 — including the time the flight was requested and by whom. Please also retain this correspondence and all records related to the processing of this request.",
          parties: "Tyler James Robinson (defendant, reported transported subject); the requesting official and flight crew (names unknown — identification is part of the request).",
          formAnswers: [
            { label: "Date of occurrence", value: "09/11/2025" },
            { label: "Time of occurrence", value: "evening — flight arriving approximately 11:37 p.m.; any return through September 12, 2025" }
          ],
          ask_no_records: true,
          filed: "PENDING — FILED Aug 4, 2026 via the DPS GovQA Records Center as P014180-080426; acknowledged same day with the request text quoted back (flight log, tasking record, and passenger manifest for the Sept 11, 2025 SLC’-to-St. George flight arriving ~11:37 p.m., any return through Sept 12, who requested it and when). Preservation ask rode with it."
        }
      ]
    },
    {
      id: "bagley-bodycam",
      challenge: "The first officer's bodycam died the moment he reached the roof.",
      short: "Bodycam died on the roof",
      categories: ["Missing & deleted footage", "Crime scene handling"],
      entities: ["bagley", "uvu-ent"],
      investigator: "Baron Coleman · Ian Carroll",
      investigatorLinks: [
        { label: "Carroll on day one/two", url: "https://www.youtube.com/watch?v=r8JjODn8-dY" },
        { label: "Coleman Ep. 141", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "The first officer to reach the shooter's rooftop (Officer Bagley) testified his body camera's battery died as he reached the roof — 27 minutes 35 seconds of footage, his only recording that day — that he was accompanied up by an armed man in civilian clothes with a badge whose name and agency he never got, and that he searched the prone position and roof edge and found no spent shell casing. New (Coleman Ep 155, Aug 6, from the hearing record itself): Bagley no longer works at UVU PD — on the stand he identified himself as a senior officer at Spanish Fork PD, about five months into that job, placing his departure from UVU PD around March 2026, mid-controversy.",
      implication: "Body-camera systems log battery events, docking, and uploads independently of the footage — the metadata says whether the unit died or was powered off. Someone armed was on the key rooftop before it was processed. And the state's own first responder found no brass at the sniper position.",
      sources: [
        { label: "Day 1 testimony (cross by Kathryn Nester; courtroom audio aired Jul 8)", url: "" },
        { label: "Coleman Ep 155, Aug 6 2026 — Bagley's own on-the-stand identification as Spanish Fork PD (transcript banked in the library)", url: "https://www.youtube.com/watch?v=sIfblNrwkk4" }
      ],
      requests: [
        {
          agencyId: "uvupd",
          summary: "UVU PD — Bagley's bodycam footage plus the device's audit/battery logs",
          subject: "GRAMA Request: body-worn camera footage and device audit logs, September 10, 2025",
          records: "I request: (1) all body-worn camera footage recorded on September 10, 2025 by the UVU police officer who first accessed the Losee Center rooftop; (2) the device audit log for that officer's body-worn camera for September 10, 2025 — including power-on/power-off events, battery-depletion events, docking and upload timestamps; and (3) the department's body-worn camera policy in effect on that date, including battery-management and activation requirements.",
          ask_no_records: true,
          filed: "PENDING, two rounds. Round one: UVU #26-215 — EXPEDITE DENIED Jul 16, 2026, on the same § 63G-2-204(4)(a) 'failed to meet that burden' public-benefit finding UVU issued across the deck; the standard 10-business-day clock still runs, substantive response due ~Jul 27. Round two, filed Jul 21, 2026 directly to UVU PD by email (uvpdrecords@uvu.edu): the rooftop officer's BWC footage + the device audit log (power/battery events) + the BWC policy, expedite requested; due ~Aug 5."
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
          ask_no_records: true,
          filed: "PENDING, two rounds. Round one: UVU #26-214 — EXPEDITE DENIED Jul 16, 2026, on the § 63G-2-204(4)(a) 'failed to meet that burden' public-benefit finding; substantive response due ~Jul 27. Round two: filed via NextRequest as UVU #26-231, Jul 17, 2026; acknowledged Jul 17; EXPEDITE DENIED (same finding); 10-business-day clock, due ~Aug 1."
        },
        {
          agencyId: "uvupd",
          summary: "UVU PD — follow-on round: native parent file + Axon device audit trail + screwdriver property record",
          subject: "GRAMA Request: body-worn camera recording, Axon device audit trail, and evidence record for rooftop recovery, September 10, 2025",
          records: "I request: (1) the complete native body-worn camera recording from Officer Bagley’s Axon Body 4 camera for September 10, 2025, 12:00 p.m. to 1:30 p.m., with original metadata intact — expressly including the full parent file of the approximately 27-minute-35-second clip previously referenced in public proceedings; (2) the Axon Evidence (evidence.com) device audit trail for that camera for September 10, 2025 — including power-on/power-off events, recording start and stop events, battery and fault log entries, and docking/upload records — which will document the reported cessation of recording at approximately 12:44 p.m.; (3) any device malfunction, outage, or repair report filed for that camera unit for September 2025; and (4) the evidence or property record for the screwdriver recovered on the Losee Center rooftop on September 10, 2025 (referenced as prosecution exhibits 12.1 and 12.4), including the date, time, location, and recovering officer recorded in that entry. Each item names a discrete, catalogued record; this is not a broad search. If no responsive record exists for any numbered item — in particular, if no device audit trail or malfunction report exists for the camera — I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 2, 2026, ready to file to uvpdrecords@uvu.edu. The audit-trail ask proves or kills the \"camera turned off right before the screwdriver find\" claim — the evidence.com log records every stop event with a timestamp."
        },
        {
          agencyId: "uvupd",
          summary: "UVU PD — Bagley's employment dates (public under § 301(2)(b)) to paper the March 2026 departure",
          subject: "GRAMA Request: employment dates and position records, Officer Bagley",
          records: "I request the records classified public under Utah Code § 63G-2-301(2)(b) concerning the UVU Police Department employment of Officer Bagley — the officer who first accessed the Losee Center rooftop on September 10, 2025 and testified at the July 2026 preliminary hearing in State v. Robinson: name, job title, job description, dates of employment (the beginning and ending dates in particular), and relevant education and qualifications. At that hearing the officer identified himself as currently employed by another Utah department; the ending date of his UVU PD employment is the specific fact sought. These classifications are affirmatively public under § 301(2)(b) and require no balancing test. Please also retain this correspondence and all records related to the processing of this request. If any item is withheld, I request written citation of the specific statutory basis.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 7, 2026, ready to file to uvpdrecords@uvu.edu. Converts the Ep 155 departure fact into a record: name, title, and employment dates are public classifications — a denial has nothing to stand on."
        }
      ]
    },
    {
      id: "sept11-rifle-removal",
      short: "The Sept 11 morning rifle walk-out",
      challenge: "An eyewitness filmed a handcuffed man walked off UVU grounds at ~10:30 a.m. September 11 while an officer separately carried a tagged rifle to a vehicle — before Robinson’s surrender, after media were cleared from the area. Whose rifle, whose arrest, and where’s the paper?",
      categories: ["Crime scene handling", "Witness statements"],
      entities: ["uvu-ent"],
      investigator: "Elizabeth Lane TV (eyewitness \"Chelsea,\" SLC, on stream with her video)",
      investigatorLinks: [
        { label: "The War on X stream, Aug 2026 — the eyewitness segment (transcript banked in the library)", url: "https://www.youtube.com/watch?v=3DMcnAcaIHA" }
      ],
      status: "reported",
      finding: "An in-studio eyewitness (\"Chelsea,\" Salt Lake City) describes and shows video: at roughly 10:30 a.m. on September 11, 2025 — less than 24 hours after the shooting, before Tyler Robinson’s surrender, while the suspect was officially still at large — a man identified on the stream as Russell Kennington was walked off the UVU grounds in handcuffs while a bald officer separately carried a rifle bearing an evidence tag to a vehicle, staged so the man and the rifle were never in frame together. She says police first cleared all media across the street and ordered her out of the area, making hers the only camera on it (\"a million% sure\" the rifle carried an evidence tag); she has not appeared on any witness list. The stream adds that Kennington posted his own video walking UVU on September 10. Rides as attributed discourse until the records land.",
      implication: "If a person was detained and a tagged rifle recovered on campus the morning of September 11, ordinary policing generated paper: an incident or arrest report, a property/evidence log entry for the rifle, a scene log, and whatever order cleared the media. Either that paper exists — identifying a second detained person and a second rifle the public record never mentions — or no responsive records exist in writing, which is its own finding for an armed detention filmed on video. The found-rifle timeline in the K9 card (Freya’s clean search, the ordered re-search) runs through the same morning.",
      sources: [
        { label: "The War on X — eyewitness account + video, and the Kennington self-posted Sept 10 video claim", url: "https://www.youtube.com/watch?v=3DMcnAcaIHA" }
      ],
      requests: [
        {
          agencyId: "uvupd",
          summary: "UVU PD — Sept 11 morning incident/detention records, the tagged-rifle property entry, scene log, and the media-clearance order",
          subject: "GRAMA Request: incident, detention, and property records — UVU campus, morning of September 11, 2025",
          records: "I request, for September 11, 2025, 8:00 a.m. to 1:00 p.m., concerning the UVU campus: (1) any incident report, detention or arrest record, or field-interview record for any individual detained on or escorted from the campus grounds; (2) the property or evidence log entry for any firearm recovered from or transported off the campus grounds in that window, including the recovering officer and receiving custody; (3) the crime-scene or perimeter log for the areas under control that morning; and (4) any order, instruction, or radio-traffic record directing media or the public to leave the area adjacent to the scene during that window. Each item names a discrete, routinely generated record; this is not a broad search. If no responsive record exists for any numbered item, I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 3, 2026, ready to file to uvpdrecords@uvu.edu. Item (2) is the sharp end: a tagged rifle on video either has a property entry or it does not."
        }
      ]
    },
    {
      id: "purged-911-call",
      short: "The purged 911 call — open-line records",
      challenge: "A 3–5 minute open-line 911 call from the transport vehicle — \"get that off of him\" — is allegedly absent from every released call batch. Open-line calls are logged differently from engaged calls; that seam is exactly where a call escapes a records search.",
      categories: ["Missing & deleted footage", "Timeline contradictions"],
      entities: ["mccoy", "phillip"],
      investigator: "Candace Owens (Ep 366 tip) · Coleman/Owens (hospital window, independently)",
      investigatorLinks: [
        { label: "Owens Ep 366, Jul 27 2026 — the 911-call tip (transcript banked in the library)", url: "https://www.youtube.com/watch?v=HZvwbfePe7o" }
      ],
      status: "reported",
      finding: "Candace Owens’s July 27, 2026 tip: a 3–5 minute open-line 911 call was placed from the vehicle carrying Kirk to Timpanogos Regional Hospital — voices saying \"We got him, we are taking him to the hospital,\" then \"get that off of him\" — and that call is absent from every released 911 batch. Open-line and abandoned calls are logged and retained differently from engaged calls, which is precisely how such a call could escape productions built from engaged-call queries. Separately, two independent sources (Coleman and Owens threads) describe activity at Timpanogos Regional Hospital in the 10:00–11:30 a.m. window — before the shooting — whose GRAMA-able surface is the dispatch record: inter-facility transfer runs and any hospital diversion or status-change notifications. The tip rides as attributed discourse until records land.",
      implication: "The dispatch district’s own systems answer this without anyone’s testimony: the CAD event log for the transport window, an open-line/abandoned-call category search run as its own record type, the 10:00–11:30 a.m. transfer and diversion records, and — decisive either way — the retention schedule and deletion/purge audit trail. If the call existed and was purged, the purge trail is itself the record. The standing preservation language matters most on this card.",
      sources: [
        { label: "Owens Ep 366, Jul 27 2026 — the open-line call tip", url: "https://www.youtube.com/watch?v=HZvwbfePe7o" },
        { label: "Owens Ep 369, Jul 31 2026 — the Timpanogos eyewitness (hospital window)", url: "https://www.youtube.com/watch?v=iB-YtO3UZOg" },
        { label: "Coleman Ep 153, Aug 2 2026 — the diversion-radio-traffic point and the L3 trauma-routing problem (transcript banked)", url: "https://www.youtube.com/watch?v=RjJPLB5e82w" }
      ],
      requests: [
        {
          agencyId: "uvdispatch",
          summary: "UV Dispatch SSD — CAD logs, open-line/abandoned 911 records, hospital transfer/diversion records, retention + purge audit trail",
          subject: "GRAMA Request: open-line and abandoned 911 call records, CAD event logs, and retention audit trail, September 10, 2025",
          records: "I request: (1) the CAD (computer-aided dispatch) event log and incident history for the transport of the shooting victim from the Utah Valley University campus to Timpanogos Regional Hospital on September 10, 2025, for the window 12:00 p.m. to 2:00 p.m.; (2) all abandoned-call and open-line call records — including audio and call-detail records — received between 12:00 p.m. and 2:00 p.m. on September 10, 2025 and associated with, or geolocated along, the route between the UVU campus and Timpanogos Regional Hospital. I specifically request that open-line and abandoned calls be searched as their own record category, since these are logged differently from engaged calls and may not have been captured by prior productions; (3) CAD records of inter-facility transfer runs dispatched between 10:00 a.m. and 11:30 a.m. on September 10, 2025 involving Timpanogos Regional Hospital, and any hospital diversion notification or status-change records for Timpanogos Regional Hospital for the same window; and (4) the district’s retention schedule for 911 audio and CAD records, and any deletion or purge audit trail showing whether any September 10, 2025 call or CAD records have been deleted, overwritten, or purged, and if so when and under what authority; and (5) dispatch radio traffic recordings and radio log entries for the 12:00 p.m.–2:00 p.m. transport window and the 10:00–11:30 a.m. transfer window, including any hospital diversion or status-change announcements — if a hospital is on diversion, dispatch radio traffic states it. If no responsive records exist for any numbered item — in particular, if no open-line or abandoned call exists for the transport window — I request written confirmation of that fact for that item, including a description of the search conducted. I ask that all potentially responsive records — expressly including all September 10, 2025 911 audio, call-detail records, and CAD data, and the deletion/purge audit trail itself — be preserved immediately upon receipt of this request and for the duration of processing and of any administrative appeal or review.",
          ask_no_records: true,
          filed: "PENDING — filed via openrecords.utah.gov (entity: Utah Valley Dispatch Special Service District), early Aug 2026. Reference number and clock start pending the district’s acknowledgment — the state portal is the record trail. The preservation paragraph rode with it; retention clocks were the enemy, which is why this one went in first."
        }
      ]
    },
    {
      id: "twiggs-location",
      challenge: "Two sworn records put Twiggs's first interview in two different buildings.",
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
          summary: "St. George PD — facility records for the night of Sept 11–12 (JOINT: one SGPD filing covers this and the Twiggs-first-interview card — do not double-file)",
          subject: "GRAMA Request: interview room and visitor logs, night of September 11–12, 2025",
          records: "I request the interview-room usage log, visitor log, and lobby/desk log for the St. George Police Department for September 11, 2025, 10:00 p.m. through September 12, 2025, 8:00 a.m., including any record of use of department facilities by another agency (FBI, Utah DPS/SBI, or Washington County Sheriff's Office) during that window. Names of uninvolved members of the public may be redacted.",
          ask_no_records: true,
          filed: "PENDING — EXPEDITE DENIED Aug 4, 2026 on both #26-4511 and #26-4512 (§ 63G-2-204(4) \"personal interests\" boilerplate — against a request whose text states the records will be published to the general public); the denial letter also promises a response \"as promptly as possible\" within the 10-business-day clock, and is appealable to the City Manager (61 South Main St., St. George) within 30 days. Originally: FILED Aug 3, 2026 via NextRequest as St. George #26-4511 / #26-4512 (the joint facility-records pair; assigned to Julie Clegg, Police Records). Filed with the public-portion legal-authority statement (§ 63G-2-201/308), the $25-capped fee waiver, and the § 204(4)(b) expedite — acknowledged same day."
        },
        {
          agencyId: "wcso",
          summary: "WCSO — the same facility records for the same window (JOINT: one WCSO filing covers this and the Twiggs-first-interview card — do not double-file)",
          subject: "GRAMA Request: interview room and visitor logs, night of September 11–12, 2025",
          records: "I request the interview-room usage log, visitor log, and any facility-use record for the Washington County Sheriff's Office for September 11, 2025, 10:00 p.m. through September 12, 2025, 8:00 a.m., including any record of facility use by another agency (FBI or Utah DPS/SBI) during that window. Names of uninvolved members of the public may be redacted.",
          ask_no_records: true,
          filed: "FILED Aug 3, 2026, 4:02 p.m. via WCSO’s web form — administrative facility records only (visitor/lobby log, interview-room schedule or officer-assist record incl. the FBI Special Agent Lang ~0100 interview, and any record of Lance Twiggs’ presence), Sept 11 9:00 p.m. – Sept 12 6:00 a.m. Expressly not interview content. JOINT — one WCSO filing covers this card and its twin."
        },
      ]
    },
    {
      id: "twiggs-first-interview",
      short: "Twiggs's first interview — where?",
      challenge: "Testimony says St. George PD; the sworn warrants say FBI at Washington County. Both can't be right.",
      categories: ["Witness statements", "Timeline contradictions"],
      entities: ["twiggs", "davis", "fbi-ent", "wcso-ent"],
      investigator: "Baron Coleman (Ep 141)",
      investigatorLinks: [
        { label: "Coleman Ep. 141 — the testimony vs. the sworn statements, side by side", url: "https://www.youtube.com/watch?v=yBDB-mpI-Xw" }
      ],
      status: "confirmed",
      finding: "Agent Brian Davis testified that Lance Twiggs — Robinson's roommate — was interviewed twice, and that \"the first time was the early morning hours of September 12th and that occurred at St. George Police Department.\" Coleman's on-air response: the sworn statements submitted to a judge in the same case say \"on 9/12/2025 at approximately 0100 hours, FBI Special Agent Lang conducted an interview with the boyfriend of Tyler Robinson at the Washington County Sheriff's Office.\" Same interview, same night — two different buildings and two different agencies on the record, and the first-interview record itself has never been produced: the hearing used a recorded statement taken in April 2026 instead. (Both quotes verbatim from the Ep 141 read-through, re-verified Jul 20 2026.)",
      implication: "Which building Twiggs was actually in at 1 a.m. on September 12 is answerable without touching the interview's content. Police facilities log who comes through them — visitor logs, interview-room schedules, officer-assist records for a federal agency using local space. One of the two records fights confirms its version; if neither facility has any record of hosting the interview, that absence is the sharper finding.",
      sources: [
        { label: "Ep 141 [1:37:23–1:38:14] — Davis: \"St. George Police Department\" vs. the sworn statement: \"Special Agent Lang... at the Washington County Sheriff's Office\" (verbatim)", url: "https://www.youtube.com/watch?v=yBDB-mpI-Xw" }
      ],
      requests: [
        {
          agencyId: "sgpd",
          summary: "St. George PD — did the first Twiggs interview happen in your building? (JOINT: file once with the Twiggs-location card — one SGPD request covers both)",
          subject: "GRAMA Request: facility and interview-room records, early morning September 12, 2025",
          records: "I request, for the period September 11, 2025, 9:00 p.m. through September 12, 2025, 6:00 a.m.: (1) any visitor log, lobby log, or facility sign-in record for the St. George Police Department; (2) any interview-room schedule, booking-area log, or officer-assist record reflecting an interview conducted at the facility during that window, including any interview conducted by or with the assistance of a federal agency; and (3) any record reflecting the presence of Lance Twiggs at the facility during that window. I am requesting administrative facility records only — not the content of any interview. If no responsive records exist, I request written confirmation of that fact; sworn testimony in State v. Robinson places an interview at your facility during this window, so the absence of any record would itself be significant.",
          ask_no_records: true,
          filed: "PENDING — EXPEDITE DENIED Aug 4, 2026 on both #26-4511 and #26-4512 (§ 63G-2-204(4) \"personal interests\" boilerplate — against a request whose text states the records will be published to the general public); the denial letter also promises a response \"as promptly as possible\" within the 10-business-day clock, and is appealable to the City Manager (61 South Main St., St. George) within 30 days. Originally: FILED Aug 3, 2026 via NextRequest as St. George #26-4511 / #26-4512 (the joint facility-records pair; assigned to Julie Clegg, Police Records). Filed with the public-portion legal-authority statement (§ 63G-2-201/308), the $25-capped fee waiver, and the § 204(4)(b) expedite — acknowledged same day."
        },
        {
          agencyId: "wcso",
          summary: "WCSO — or did it happen in yours, with FBI Special Agent Lang? (JOINT: file once with the Twiggs-location card — one WCSO request covers both)",
          subject: "GRAMA Request: facility and interview-room records, early morning September 12, 2025",
          records: "I request, for the period September 11, 2025, 9:00 p.m. through September 12, 2025, 6:00 a.m.: (1) any visitor log, lobby log, or facility sign-in record for the Washington County Sheriff's Office; (2) any interview-room schedule or officer-assist record reflecting an interview conducted at the facility during that window by or with the assistance of the Federal Bureau of Investigation (sworn statements in State v. Robinson identify FBI Special Agent Lang conducting an interview at approximately 0100 hours); and (3) any record reflecting the presence of Lance Twiggs at the facility during that window. I am requesting administrative facility records only — not the content of any interview. If no responsive records exist, I request written confirmation of that fact.",
          ask_no_records: true,
          filed: "FILED Aug 3, 2026, 4:02 p.m. via WCSO’s web form — administrative facility records only (visitor/lobby log, interview-room schedule or officer-assist record incl. the FBI Special Agent Lang ~0100 interview, and any record of Lance Twiggs’ presence), Sept 11 9:00 p.m. – Sept 12 6:00 a.m. Expressly not interview content. JOINT — one WCSO filing covers this card and its twin."
        }
      ]
    },
    {
      id: "long-production-refile",
      short: "Chief Long's released file — re-request it",
      challenge: "113 pages of the police chief's communications were already released to another requester — with 682 redactions. Previously released means re-requestable.",
      categories: ["Kirk assassination & coverup"],
      entities: ["jeff-long", "uvu-ent"],
      investigator: "Daily Caller News Foundation · Blaze News · Danks (panel read-through)",
      investigatorLinks: [
        { label: "DCNF — the 113-page production reported, Apr 6 2026", url: "https://dailycaller.com/2026/04/06/exclusive-utah-valley-university-charlie-kirk-assassination-tyler-robinson-redactions/" },
        { label: "Blaze — UVU relents slightly after the publicness-presumption push: 19 screenshots", url: "https://www.theblaze.com/news/utah-valley-university-is-working-very-hard-to-hide-the-truth-about-charlie-kirks-assassination" }
      ],
      status: "reported",
      finding: "UVU has already produced Chief Jeff Long's communications about the shooting — to other requesters. The Daily Caller News Foundation received a 113-page production in April 2026 covering the days around September 10, carrying 682 individual redactions across 96 of its pages; after Blaze News pressed UVU on GRAMA's presumption that a chief's messages are public absent a specific exemption, the university released 19 further screenshots (eight of them campus-wide alert texts). A Jul 25, 2026 livestream (Danks) read from what he described as a downloaded copy of a Long production and attributed to it three specifics: UVU's standing payment into a pooled EMS/police services fund that could have summoned extra ambulance and patrol coverage for the event; Sens. Mike Lee and John Curtis arriving at UVU police around 10:35 p.m. on September 9 asking to talk \"about a plan\"; and an urgent 2:30 p.m. September 9 attempt to get a message to Kirk through UVU police or security. Those three claims ride as attributed discourse until the pages are in hand.",
      implication: "Records an agency has already located, processed, redacted, and released to one requester are re-requestable by anyone — no new search, no new redaction judgment, and no plausible active-case wall over pages already sitting in a newsroom. The re-request also captures what the articles can't show: the request-and-response correspondence, which maps all 682 redactions to their claimed statutes — the withholding pattern itself, scoreable against what UVU produced to Judicial Watch in SRC 2026-004. Filed from another requester's production and logged here so the docket tracks what UVU already considers releasable against what it withholds from everyone else.",
      sources: [
        { label: "DCNF reporting on the production (113 pages, 682 redactions across 96)", url: "https://dailycaller.com/2026/04/06/exclusive-utah-valley-university-charlie-kirk-assassination-tyler-robinson-redactions/" },
        { label: "Danks livestream, Jul 25 2026 — the read-through and the three content claims (transcript banked in the library)", url: "https://www.youtube.com/watch?v=XKjDIDF1Pjk" }
      ],
      requests: [
        {
          agencyId: "uvu",
          existing: true,
          summary: "UVU — the previously-released Long production, plus the exemption trail",
          subject: "GRAMA Request: copy of records previously released in response to the Daily Caller News Foundation request for Chief Long's communications",
          records: "I request: (1) a complete copy, in electronic form, of all records previously released by Utah Valley University in response to the GRAMA request submitted by the Daily Caller News Foundation seeking communications of UVU Police Chief Jeff Long concerning the September 10, 2025 shooting — reported by the Daily Caller on April 6, 2026 as a production of approximately 113 pages; (2) a copy of the records subsequently released to Blaze News concerning the same subject matter (reported as 19 screenshots); and (3) the request-and-response correspondence for each: the requester's request text, UVU's determination letters, and any exemption log or index of withholdings. Because items (1) and (2) consist of records UVU has already located, processed, redacted, and released, no new search or redaction should be required, and no basis for withholding exists beyond the redactions already applied. I request a fee waiver: release primarily benefits the public — the records will be published on a free, non-commercial public docket — and duplication of an existing electronic production imposes minimal burden. Please also retain this correspondence and all records related to the processing of this request, including the productions described above. If any portion is denied, I request written citation of the specific statutory basis for each withholding.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 26, 2026 via NextRequest as UVU request #26-242 (confirmation 7:50 p.m.; request-as-filed PDF saved). 10-business-day clock → ~Aug 10; expect UVU's standard extraordinary-circumstances letter stretching to ~Aug 17. Because the request is for an already-processed production, any fee quote beyond ~1 hour or any re-redaction beyond the 682 already applied is itself a documentable move."
        }
      ]
    },
    {
      id: "cut-footage",
      challenge: "The state's courtroom videos have cuts visible in their own timestamps.",
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
          ask_no_records: true,
          filed: "DENIED — CLOSED Aug 3, 2026, on a triple wall: \"not reasonably specific\" (UVU says the courtroom exhibit \"is not a UVU record\" so it cannot tell what video is meant — for segments played with visible timestamps in open court), § 63G-2-106 (the entire campus camera system declared \"security measures\" not subject to GRAMA at all), and in the alternative § 63G-2-305(12) and § 305(10). The § 106 move is categorical — it would exempt every frame of campus video ever recorded; that is the appealable overreach. Appeal: 30 days to UVU’s CAO, VP Val Peterson (petersva@uvu.edu, CC ccollings@uvu.edu). Originally: filed via NextRequest as UVU #26-230, Jul 17, 2026; acknowledged Jul 17. EXPEDITE DENIED (same public-benefit finding as #26-229). 10-business-day clock, due ~Aug 1."
        },
        {
          agencyId: "uvu",
          summary: "UVU — parking garage access-control log for the morning of Sept 10",
          subject: "GRAMA Request: parking structure access-control records, morning of September 10, 2025",
          records: "I request the access-control log (key-card, key-pass, gate, or license-plate-recognition entries) for the Utah Valley University parking structure adjacent to the Losee Center for September 10, 2025, 8:00 a.m. – 10:00 a.m. Entries of uninvolved third parties may be redacted; the request is for the log covering the vehicle entry shown at 8:29 a.m. in exhibits at the State v. Robinson preliminary hearing.",
          ask_no_records: true,
          filed: "PENDING — filed via NextRequest as UVU #26-220, Jul 16, 2026; acknowledged Jul 16 with the request text quoted back. 10-business-day clock, extended by the Jul 24 Pioneer Day closure — due ~Jul 30–31."
        }
      ]
    },
    {
      id: "motive-testimony",
      challenge: "The official motive's key witness never delivered it under oath.",
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
          ask_no_records: true,
          filed: "INVOICED — filed Jul 16, 2026, 1:10 p.m. by email to the Governor's records officer (Adam Duncan, aduncan@utah.gov). Response Jul 17, 2026: EXPEDITE DENIED and FEE WAIVER DENIED, same public-benefit finding as the courtyard request (§ 63G-2-204(4)(a); 'unclear how you intend to use records' / how the Utah public accesses the publication). Prepayment required before any processing: invoice No. 260716AB2 / GO-071726-0088 = $540 (9.0 hrs staff time @ $60) + $75 out-of-state filing fee = $615.00, due Aug 3, 2026. Fee-waiver-denial OVERRIDE FILED Jul 17, 2026, addressed to CAO Jon Pierpont — but MISROUTED: it went only to Duncan, as his own Jul 20 replies confirmed. RESENT directly to Pierpont (jonpierpont@utah.gov, cc Duncan) Jul 21, 2026 with the Jul 17 timeliness preserved — decision pending. Override cures Duncan's sole stated deficiency (names the free non-commercial public docket as the publication) and stacks all three G-302(5) waiver grounds; also flags on the record that this request was priced at nearly 2x the courtyard request for a narrower ask. OVERRIDE DENIED — Aug 5, 2026, the twin Pierpont letter (same reasoning, near-identical language, same \"requester outside the state of Utah with no apparent press or media role\" line; the 2x-pricing flag drew no response). The $615 invoice stands. Same fork as 260716AB1: pay, narrow, or contest the office's theory that its § 203 exemption lets its own policy displace GRAMA's fee-waiver standards."
        }
      ]
    },
    {
      id: "wcso-intake-video",
      challenge: "The video of Robinson's turn-in — where the timeline starts — was deleted.",
      short: "Deleted turn-in video",
      categories: ["Missing & deleted footage"],
      entities: ["robinson", "davis", "brooksby", "wcso-ent"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 141 — Days Two and Three", url: "https://www.youtube.com/watch?v=FT8kJN3n_cA" }
      ],
      status: "confirmed",
      finding: "No longer \"reportedly\": WCSO confirmed the destruction in writing on July 22, 2026 (Records Officer Sherrie Maxwell). There is no video of the Patrol Building lobby or hallways from Robinson's turn-in — \"the video was not clipped and exported, therefore it was deleted between 14-30 days after it was recorded\" (and Robinson \"was never at Purgatory Correctional Facility\"). There are \"no records documenting the deletion, overwriting, or non retention of the video.\" And Washington County has no retention schedule of its own for Patrol-building video — the office \"adhere[s] to\" the Utah State schedule GRS-2021, which it attached. The schedule it attached does not say 14–30 days: GRS-2021's disposition is \"Retain until resolution of issue, and then destroy records,\" and its own scope note excludes \"incidents requiring further evaluation.\" On day four of the prelim, the state still exhibited surrender footage cropped so tightly the timestamps were cut out, with Robinson facing away from the camera.",
      implication: "The honest frame first: deletion inside a routine auto-purge window is only anomalous if a preservation duty had attached by then — and that is precisely what no record now shows either way. That triple absence is the records finding, not an accusation: the footage of the most consequential arrest in Utah's history is gone; nothing documents when it was deleted or on whose authority; and the schedule WCSO cites as governing prescribes retention until the issue is resolved, not a 14–30-day purge — so whatever setting actually erased the video, no produced record ties it to schedule authority. That leaves the \"Tyler Robinson and Video\" email thread — who asked about the footage, when, and whether anyone was told to preserve it inside the day-14–30 window — as the only surviving record of what happened to it. It is now in redaction.",
      sources: [
        { label: "Day 3 testimony, Agent Brian Davis (State v. Robinson prelim)", url: "" },
        { label: "WCSO written response, Jul 22, 2026 — signed Sherrie Maxwell, Records Officer, GRS-2021 attached (letter + schedule preserved in the library's foia-mail archive)", url: "" },
        { label: "Sam Parker — 13 officials who (he argues) knew Robinson was already in WCSO custody at the 7:51 PM Sept 11 presser (\"NOW YOU KNOW WHY THEY 'LOST' ALL THE SURVEILLANCE VIDEO\")", url: "https://x.com/BasedSamParker/status/2053915544420508047" }
      ],
      requests: [
        {
          agencyId: "wcso",
          summary: "WCSO — the intake video, its retention schedule, and the deletion paper trail",
          subject: "GRAMA Request: lobby/intake video of September 11, 2025 and its retention/deletion records",
          records: "I request: (1) all video recorded by lobby, intake, sally-port, or booking-area cameras at the Washington County Sheriff's Office facility in Hurricane, Utah between 8:00 p.m. September 11, 2025 and 5:00 a.m. September 12, 2025; (2) the records retention schedule applicable to facility video during that period; and (3) any record documenting the deletion, overwriting, or non-retention of video from that period — including the date of deletion, the system or person that performed it, and any authorization, litigation-hold notice, or preservation request in effect at the time; and (4) all correspondence concerning any prior records request for this video — the request, the response, and any internal discussion of it. If the video no longer exists, items (2) through (4) are the request.",
          ask_no_records: true,
          filed: "ANSWERED IN PART Jul 22, 2026 — REDACTION UNDERWAY; the $65.22 fee is PAID (payment form returned Aug 1, CORE processed Aug 3) — the \"Tyler Robinson and Video\" thread is due on completion of redaction, unless the UCAO blanket notice is now raised against it. Filed Jul 9, 2026, 1:11 p.m. via WCSO's web form (re-filed identically Jul 12; Jul 9 operative). The written response (Records Officer Sherrie Maxwell) disposed of items (1)–(3) on their face: no video (never clipped or exported; deleted 14–30 days after recording), no county-own retention schedule (state GRS-2021 attached instead), and no records documenting the deletion, overwriting, or non-retention. Item (4) survives: every email request and reply \"with the words, 'Tyler Robinson and Video'\" — with only narrow PII redactions pre-announced (home addresses, § 63G-2-305(51); personal email addresses, § 63G-2-302(2)(d)) — notably NOT the § 63G-2-305(10) active-case wall Orem and Utah County have used. Fee waiver DENIED (\"extensive search... significant use of staff time\"); terms: hourly rate of the lowest-paid employee able to do the work, first 15 minutes free, \"It will exceed $25,\" over 4 hours of redaction anticipated, exact cost to be advised by Jul 30; completion anticipated Jul 30; records released on receipt of fee. Maxwell would not begin redacting without a go-ahead — \"proceed\" sent Jul 25, 2026, in-thread, with an explicit preservation ask covering the processing correspondence and all records concerning the video, its deletion, retention settings, and related inquiries; fee amount due ~Jul 30. The reply is \"valid and on file for 30 days\"; any portion is appealable to Sheriff Barry Golding as CAO within 30 days (§ 63G-2-205) — the fee appeal stays live until the amount is known. DO NOT PREPAY beyond the advised amount."
        },
        {
          agencyId: "wcso",
          summary: "WCSO — the retention setting that actually erased the video, and any schedule authority for it (the gap the Jul 22 letter opened)",
          subject: "GRAMA Request: video-management-system retention configuration and schedule-appraisal records, Patrol Building cameras",
          records: "I request: (1) the record of the retention or auto-purge configuration of the video-management system serving the Patrol Building lobby and hallway cameras as in effect September 11 – October 11, 2025 — the setting that produced the 14–30-day deletion described in the office's July 22, 2026 GRAMA response — including any configuration page, vendor documentation of the deployed setting, or configuration-change log; (2) any record designating, classifying, or appraising Patrol-building video under Utah General Retention Schedule GRS-2021 — whose disposition is \"retain until resolution of issue, and then destroy records\" and whose description excludes incidents requiring further evaluation — or under any other schedule, including GRS-2027; and (3) any preservation request, litigation-hold notice, or clip/export request received or generated between September 11, 2025 and October 11, 2025 concerning Patrol-building video. If no responsive record exists for any item, I request written confirmation of that fact.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 26, 2026 by email; receipt acknowledged Aug 3 with the request text quoted back. A belt-and-suspenders web-form copy (Aug 2, 5:48 p.m.) was flagged \"duplicate request\" by Records on Aug 3 — the email version is the live one. Watch for the UCAO blanket-notice denial landing here too: a retention-configuration record is administrative, not investigative — if § 305(10) is claimed on a VMS settings page, that is its own exhibit."
        }
      ]
    },
    {
      id: "custody-timeline",
      challenge: "Four different custody times sit in the official record.",
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
          filed: "DENIED — CLOSED Jul 23, 2026. Filed Jul 9, 2026 via NextRequest, request #26-2775 (§ 204 profile demanded on pain of closure; cured Jul 10). Utah County closed the request Jul 23: the booking records are \"denied as this case is currently under investigation and classified as protected under Utah Code § 63G-2-305(10)(a)(b) and (c),\" with an invitation to re-file \"once the criminal case is resolved.\" The same § 305(10) wall Orem used on the K9 records, now on the booking sheet. Appeal available to the CAO (Utah County Administrator) within 30 days — recordsappeals@utahcounty.gov or 100 East Center Street Ste HCH 317C, Provo — reviewed under Utah County Code § 2.03.080. (Filing lessons kept: SheriffRecords@utahcounty.gov auto-replies that it's unmonitored — the portal is the real intake — and NextRequest accounts need the full § 204 profile up front.)"
        },
        {
          agencyId: "wcso",
          summary: "WCSO — dispatch/CAD log for the night of the turn-in",
          subject: "GRAMA Request: CAD/dispatch records, evening of September 11, 2025",
          records: "I request the computer-aided dispatch (CAD) log entries and radio log records for the Washington County Sheriff's Office for September 11, 2025, 6:00 p.m. through September 12, 2025, 6:00 a.m., concerning the arrival, custody, or processing of any individual in connection with the Utah Valley University homicide investigation. Redaction of unrelated calls for service is acceptable.",
          ask_no_records: true,
          filed: "DENIED Aug 3, 2026 — WCSO now cites the UCAO blanket restriction notice: records \"classified as Protected Records under UCA § 63G-2-305(10)\" because release \"would create a danger of depriving a person of a right to a fair trial,\" pending \"until the trial is complete.\" A prosecutor’s office in another county pre-classifying these records category-wide, with no record-by-record determination — see the UCAO blanket-hold card. Appeal to the CAO (Sheriff) within 30 days. Originally: filed Jul 15, 2026, 12:26 p.m. via WCSO's web form (copy requested; fee waiver and expedited asserted; § 204 profile complete). Confirmation received same hour. Response due within 10 working days (~Jul 29). DO NOT PREPAY."
        }
      ]
    },
    {
      id: "mitchell-statements",
      challenge: "The facilitator's real interview was swapped for a statement written months later.",
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
          records: "I request the report, recording log entry, or interview summary documenting the interview of the individual who facilitated Tyler Robinson's arrival at the Washington County Sheriff's Office, conducted in the early morning hours of September 12, 2025. The individual is publicly identified in Day 3 preliminary-hearing testimony in State v. Robinson as Mike Mitchell, a retired law-enforcement officer; the interview concerns the Utah Valley University homicide investigation, and the interviewing deputy’s or detective’s name — unknown — is part of the records requested. Personal identifiers other than the interviewers' names and the date, time, location, and duration of the interview may be redacted — the existence, custodian, and metadata of the original interview record are the core of this request.",
          filed: "DENIED Aug 3, 2026 — WCSO now cites the UCAO blanket restriction notice: records \"classified as Protected Records under UCA § 63G-2-305(10)\" because release \"would create a danger of depriving a person of a right to a fair trial,\" pending \"until the trial is complete.\" A prosecutor’s office in another county pre-classifying these records category-wide, with no record-by-record determination — see the UCAO blanket-hold card. Appeal to the CAO (Sheriff) within 30 days. Originally: filed Jul 16, 2026, 1:19 p.m. via WCSO's web form (§ 204 block in the body; fee waiver and expedited asserted; OTHER entitlement). Confirmation received same hour; request number pending. Response due within 10 working days (~Jul 31, Pioneer Day-adjusted).",
          ask_no_records: true
        }
      ]
    },
    {
      id: "fifth-letter",
      challenge: "A prosecutor told deputies not to mention Robinson invoking the Fifth.",
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
          ask_no_records: true,
          filed: "ANSWERED — WITH A DIFFERENT LETTER, Aug 3, 2026, and the answer is bigger than the ask: Records produced not the McBride letter but a Utah County Attorney \"Notice of Records Restriction\" (Deputy Attorney Katrina Cole, undated) directing WCSO to withhold ALL records \"related to the shooting of Charlie Kirk\" under § 63G-2-305(10) \"until further written notice,\" and to notify UCAO before acting on any request. The temporary records clerk, in writing: \"I did not know this letter existed... I will not be releasing anymore records related to Tyler Robinson until the trial is completed.\" The notice itself is now in hand (banked in foia-mail) — see the UCAO blanket-hold card. Originally: filed Jul 16, 2026, 1:21 p.m. via WCSO's web form (§ 204 block in the body; fee waiver and expedited asserted; OTHER entitlement). Confirmation received same hour; request number pending. Response due within 10 working days (~Jul 31, Pioneer Day-adjusted)."
        }
      ]
    },
    {
      id: "crane-aes-xs-device",
      short: "Crane–AES explosives contract",
      challenge: "A Navy contract links the destroyed AES plant to a Crane weapons program.",
      categories: ["Kirk assassination & coverup"],
      entities: ["aes", "nswc-crane", "dod", "charlie-kirk"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "\"Explosive\" Documents FOIA; AES Documents Produced — Ep 135 (document walkthrough begins ~29:00)", url: "https://www.youtube.com/watch?v=l3lKV39xOjs&t=1742s" }
      ],
      status: "reported",
      finding: "Baron Coleman — a Tennessee lawyer who does FOIA and records work about 60 miles from the plant — obtained, via a Navy FOIA answered June 23, 2026, a 33-page production on a contract between Naval Surface Warfare Center, Crane Division (Crane, Indiana) and Accurate Energetic Systems (AES) — the McEwen, Tennessee explosives plant destroyed with 16 dead on October 10, 2025 — for a firm-fixed-price \"demolition charge, AP, extra small mini\" (~$440,000 total; quantity and unit price redacted), ordered around April 1, 2025 with a firm August 25, 2025 delivery date. He found the award on SAM.gov two days after the blast and reads the production on air page by page. The production applied the rare exemption B7F (disclosure \"could reasonably be expected to endanger the life or physical safety of any individual\") to the project code, the operational-requirement name, and quantities; the statement of work permitted additive manufacturing (3D printing) with dimensional-tolerance deviations accepted \"provided assembly may be completed\"; and the item's sensitivity category is 1.1D — the mass-casualty tier. Coleman reads the explosive as Composition C4 off a partly redacted line (a TriggerSmart researcher has said PETN; Coleman concedes the point is unresolved). The day after the AES blast, news broke that EPA had cited the Crane installation in September 2025 for mishandling hazardous waste and explosives.",
      implication: "A buy of a miniature anti-personnel charge on a hard deadline, whose very requirement name is withheld as life-endangering — followed within weeks by the destruction of its manufacturer. What the production withholds is what the procurement file must still contain: if the award was made without full and open competition, a Justification & Approval names the requirement and why AES (whether one exists is itself a finding — the production shows firm-fixed-price but not the competition status); the DD Form 250 receiving report shows who accepted delivery and when; post-October-10 contract modifications show how the government closed out a contract with a vendor that had ceased to exist; and EPA's own violation file fixes the regulator's paper on conditions at Crane. (The contract facts are read off the produced FOIA documents as shown on-screen by Coleman — the full transcript and digest are preserved in the FAFO library. His \"prototype, not standard Navy inventory\" read of the 3D-print clause is his inference, and any connection to the Kirk assassination is his explicitly-labeled hypothesis, disclaimed on air at least three times — these requests test the record, not the hypothesis.)",
      sources: [
        { label: "Baron Coleman, Ep 135 — the Navy's 33-page production read on air (full transcript + digest in the FAFO library)", url: "https://www.youtube.com/watch?v=l3lKV39xOjs&t=1742s" },
        { label: "SAM.gov — AES federal award records (the public anchor the thread rests on)", url: "https://sam.gov" }
      ],
      requests: [
        {
          agencyId: "navsea",
          summary: "NAVSEA — the J&A / sole-source justification + requirements document for the Crane–AES \"extra small\" charge",
          subject: "FOIA Request: Justification & Approval and requirements document for NSWC Crane contract with Accurate Energetic Systems (demolition charge, AP, extra small mini)",
          records: "I request a copy of the Justification and Approval (J&A) for other than full and open competition, or any limited-source or sole-source justification, supporting the contract awarded in or around April 2025 by Naval Surface Warfare Center, Crane Division to Accurate Energetic Systems, LLC (McEwen, Tennessee) for the item described in the statement of work as \"demolition charge, AP, extra small mini,\" together with the purchase request or requirements document stating the operational requirement the procurement supported. To keep this request narrow and minimize search burden, I am not seeking general email correspondence.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 21, 2026 by email to NAVSEAFOIA@navy.mil; confirmed in the sent-mail record. No acknowledgment yet. Determination due ~Aug 18, 2026."
        },
        {
          agencyId: "navsea",
          summary: "NAVSEA — acceptance record + any post-explosion modification/close-out of the same contract",
          subject: "FOIA Request: DD Form 250 and post-October 2025 modifications for NSWC Crane contract with Accurate Energetic Systems",
          records: "I request a copy of the material inspection and receiving report (DD Form 250) or equivalent acceptance record, and any contract modification, termination notice, or close-out document dated after October 10, 2025, for the contract awarded in or around April 2025 by Naval Surface Warfare Center, Crane Division to Accurate Energetic Systems, LLC (McEwen, Tennessee) for the item described as \"demolition charge, AP, extra small mini.\" To keep this request narrow and minimize search burden, I am not seeking general email correspondence.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 21, 2026 by email to NAVSEAFOIA@navy.mil; confirmed in the sent-mail record. No acknowledgment yet. Determination due ~Aug 18, 2026."
        },
        {
          agencyId: "epa",
          summary: "EPA — the September 2025 notice of violation to Crane for hazardous-waste/explosives handling",
          subject: "FOIA Request: EPA notice of violation and inspection report concerning Naval Support Activity Crane (September 2025)",
          records: "I request a copy of the notice of violation or enforcement notice issued by the U.S. Environmental Protection Agency in or around September 2025 to Naval Support Activity Crane and/or Crane Army Ammunition Activity (Crane, Indiana) concerning the handling, storage, or management of hazardous waste and explosives, together with the underlying RCRA inspection report and any written response from the Navy or Army, dated between June 1, 2025 and the date this request is processed. To keep this request narrow and minimize search burden, I am not seeking general email correspondence.",
          ask_no_records: true,
          filed: "PENDING — filed Jul 21, 2026 via FOIA.gov (confirmation 3042521); EPA case number 2026-EPA-06621 assigned the same day. Determination due ~Aug 18, 2026."
        }
      ]
    },
    {
      id: "nest-doorbell-vehicle",
      short: "Nest caught the vehicle",
      challenge: "A doorbell filmed the suspect vehicle; only a report about it reached court.",
      categories: ["Kirk assassination & coverup"],
      entities: ["fbi", "charlie-kirk"],
      investigator: "Preliminary-hearing record (State v. Robinson)",
      investigatorLinks: [],
      status: "confirmed",
      finding: "A testifying officer at the preliminary hearing confirmed the contents of an investigative report documenting the interview of homeowners whose Nest doorbell camera captured a vehicle associated with the Utah Valley University homicide investigation parked on their street overnight September 10\u201311, 2025 \u2014 including recorded descriptions of the vehicle's driver and occupants.",
      implication: "A vehicle parked overnight near the scene, with witness descriptions of its occupants on file, is either accounted for in the state's timeline or it isn't. The interview report is a discrete, named record whose existence was confirmed under oath; its substance \u2014 who was described, and whether that description was ever run down \u2014 is the question.",
      sources: [
        { label: "Preliminary-hearing testimony, State v. Robinson (Utah Fourth District No. 251403576)" }
      ],
      requests: [
        {
          agencyId: "fbi",
          summary: "FBI \u2014 the Nest-doorbell homeowner interview report (vehicle parked overnight near the scene)",
          subject: "FOIA Request: interview report concerning doorbell-camera footage of a vehicle, Utah Valley University homicide investigation",
          records: "I request, concerning the September 10, 2025 Utah Valley University homicide investigation (State v. Robinson, Utah Fourth District No. 251403576): the investigative report, FD-302, or interview summary documenting the interview of the homeowners whose Nest doorbell camera captured a vehicle parked on their street overnight September 10\u201311, 2025 \u2014 the report whose contents, including the recorded descriptions of the vehicle's driver and occupants, were confirmed by a testifying officer at the July 2026 preliminary hearing. Witness personal identifiers may be redacted; the substance of the recorded descriptions is the request. To keep this request narrow, I am not seeking general case-file correspondence.",
          ask_no_records: true,
          filed: "PENDING \u2014 filed Jul 16, 2026 via the FBI's eFOIPA portal (efoia.fbi.gov); intake confirmation received same day, FOIPA request number to follow ('correspondence will be forthcoming'). Filing quirk to watch: the as-filed text carried Utah GRAMA citations (fee waiver under Utah Code \u00a7 63G-2-203(4)(a), Utah response deadlines) rather than 5 U.S.C. \u00a7 552 \u2014 the FBI will process it as FOIA regardless, but expect the fee-waiver justification to be read against the federal standard; the $25 cap stands either way. If the waiver is denied on that basis, the cure is a corrected justification citing \u00a7 552(a)(4)(A)(iii), not a re-file."
        }
      ]
    },
    {
      id: "fbi-kirk-tipline",
      short: "Fake FBI tip-line preview",
      challenge: "A federal “Kirk tip-line” preview was built — the real .gov was never registered.",
      categories: ["Kirk assassination & coverup", "NDS takeover"],
      entities: ["nds", "fbi", "charlie-kirk"],
      investigator: "The Drey Dossier",
      investigatorLinks: [
        { label: "NDS servers map", url: "https://thedreydossier.github.io/NDS_servers_map/" },
        { label: "Substack", url: "https://thedreydossier.substack.com" }
      ],
      status: "confirmed",
      finding: "The National Design Studio built a preview of an \"FBI Charlie Kirk tip-line\" site (fbi-kirk-tipline.previews.ndstudio.gov, with a certificate on record) — while the public domain fbi-kirk-tipline.gov was never registered.",
      implication: "A White House design office stood up infrastructure for an FBI tip line on the Kirk case that never publicly launched. Whether it reflects a real, authorized FBI program — and who directed it — is a records question. (A preview is not a launched program; the certificate was set to expire June 11, 2026, so its renewal or lapse signals whether the program continued.)",
      sources: [
        { label: "crt.sh (cert 24970208643)", url: "https://crt.sh" },
        { label: "CISA dotgov-data", url: "https://github.com/cisagov/dotgov-data" }
      ],
      requests: [
        {
          agencyId: "fbi",
          summary: "FBI — records of any Charlie Kirk tip-line site/program + NDS role",
          subject: "FOIA Request: FBI \"Charlie Kirk\" tip-line website or program and any National Design Studio involvement",
          records: "I request a copy of any interagency agreement, task order, statement of work, or written authorization between the FBI and the National Design Studio concerning an FBI \"Charlie Kirk\" tip-line website or program (including any site at fbi-kirk-tipline.gov), dated from September 1, 2025 to the date this request is processed. To keep this request narrow, I am not seeking general email correspondence; if no such records exist, I request written confirmation of that fact.",
          ask_no_records: true,
          filed: "FILED — via the FBI eFOIPA portal (efoia.fbi.gov), Jul 18–20, 2026 (eFOIPA receipts carry no filing date; the request-as-filed receipt PDF is saved on the Hearth). FOIPA number pending — same as the OG copy of this request, which is the filing of record."
        }
      ]
    },
    {
      id: "atf-dna-consumed",
      short: "DNA consumed in testing",
      challenge: "9 evidence samples were used up in testing — none saved for the defense to retest.",
      categories: ["Kirk assassination & coverup"],
      entities: ["atf", "charlie-kirk"],
      investigator: "Day 5 courtroom record, State v. Robinson prelim",
      investigatorLinks: [
        { label: "Sister site: FAFO Utah — Charlie Kirk Edition", url: "https://fafo-utah-kirk.pages.dev/" }
      ],
      status: "confirmed",
      finding: "ATF's DNA section chief (Katelyn Oliver) testified on the final day of the Robinson preliminary hearing that NINE evidence samples were entirely consumed in testing — no split preserved for independent defense retesting, against the practice recommended since the 1996 NRC report — that the reported \"1 trillion times more likely\" figures are a reporting CAP, and that elimination testing showed \"support for inclusion\" of the defendant's father on the rifle bolt and of Lance Twiggs on the Dremel tool.",
      implication: "The federal lab records behind the state's DNA case are ATF records: the three reports, the case notes containing the permission-to-consume authorization, and the elimination-sample paperwork. The anticipated Exemption 7(A) wall arrived Jul 20, 2026 — but as a blanket full denial with no document inventory and no segregability finding, it fixes nothing on paper about what records exist or what was destroyed. That silence is itself a ground of the pending appeal.",
      sources: [
        { label: "Day 5 courtroom audio (whisper transcript), Jul 10 2026 — direct and cross of ATF examiner Katelyn Oliver", url: "" }
      ],
      requests: [
        {
          agencyId: "atfagency",
          summary: "ATF — the DNA reports, the consumption authorization, and the elimination-sample records",
          subject: "FOIA Request: ATF DNA laboratory records concerning the Utah Valley University homicide investigation",
          records: "I request, concerning ATF Forensic Science Laboratory DNA analyses performed for the September 10, 2025 Utah Valley University homicide investigation (State v. Robinson, Utah Fourth District No. 251403576), whose author testified publicly at the July 10, 2026 preliminary hearing: (1) the three DNA examination reports authored by the DNA section chief (admitted in court as exhibits 30 and 34, plus the elimination-sample report referenced as report 157); (2) the case-file record authorizing complete consumption of samples 1.4, 1.6, 1.9, 1.10, 1.12, 2.1, 3.1, 4.1, and 5.1, including the permission-to-consume communication referenced in testimony; and (3) the records of elimination-sample requests made to household members and to investigating agents, including whether the agents' samples were ever provided. These records were described in public testimony; I am not seeking the underlying DNA profiles or any person's genetic data.",
          ask_no_records: true,
          filed: "DENIED IN FULL \u2014 ON APPEAL. Filed Jul 17, 2026 via ATF\u2019s FOIA Public Access Portal (dojatf.secureocp.com) \u2014 requester category News Media; fee waiver requested (\u00a7 552(a)(4)(A)(iii)); expedited processing requested under 28 C.F.R. \u00a7 16.5(e)(1)(ii) AND (iv); date range 09/10/2025\u201307/31/2026 \u2014 logged as ATF 2026-01995. Jul 20, 2026: denied IN FULL under 5 U.S.C. \u00a7 552(b)(7)(A) \u2014 'the investigation relating to your request is still open' \u2014 signed Hirsh D. Kravitz, Chief, Information and Privacy Governance Division. The portal's 'documents delivered' notice was the determination letter itself: no document inventory, no segregability finding \u2014 the denial confirms nothing about which of the requested records exist, itself now an appeal ground. Administrative appeal A-2026-01952 filed via FOIA STAR Jul 21, 2026, with expedited processing requested under Standard 4; OIP response due Aug 18, 2026. Jul 22: OIP acknowledged the appeal (letter dated Jul 21, Priscilla Jones), flagging delay from the Oct 1–Nov 12, 2025 appropriations lapse — and found the expedite request unperfected for lack of a certified statement under 28 C.F.R. § 16.5(e)(3); perfected the same day with a 28 U.S.C. § 1746 certification via FOIA STAR."
        }
      ]
    },
    {
      id: "second-roof-round",
      challenge: "A round of the wrong caliber turned up on a second roof.",
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
        { label: "Day 2 + Day 3 testimony; Friday testimony (roof location); Paramount Tactical 3D rendering", url: "" },
        { label: "Source-relationship note (Jul 19, receipted: andrewkolvet-karen-faceplant-2078678266853064733 fxtwitter + syndication; trend grab: X trend 2026-07-20 - Acting-alone debate reignites - POSTS.md): TPUSA spokesman Andrew Kolvet, on the record — \"Paramount Tactical is not an 'affiliate.' He's not paid. We don't coordinate. He's his own man.\" No card on this deck carries the circulating paid-operatives claim, so the denial is logged here, where Paramount Tactical's rendering is a named source: TPUSA's own account of that source's relationship to it. Whatever the truth, both sides are now on the record", url: "https://x.com/AndrewKolvet/status/2078678266853064733" }
      ],
      requests: [
        {
          agencyId: "dps",
          summary: "DPS/SBI — Schneider's report on the .223 round and its disposition",
          subject: "GRAMA Request: report and evidence records for round recovered on UVU computer science building roof, September 10, 2025",
          filed: "PENDING — this ask is already in flight as DPS reference P013306-072126 (Records Center status Aug 4, 2026: Assigned / In Progress), filed Jul 21, 2026 via the GovQA portal (confirmed in the acknowledgment: Schneider's report on the unfired round, the evidence/property-log entry or the record of the decision not to log it, and the identity of the rifle-cycling officer). Acknowledged Jul 21; 10-business-day clock, Pioneer Day skipped — response due ~Aug 5. Its sibling P013307-072126 (same day) carries the rooftop/overwatch post assignments by building and agency. Do not re-file from this card.",
          records: "I request: (1) the report authored or contributed to by Agent Ben Schneider (State Bureau of Investigation) documenting the discovery, photographing, collection, and disposition of an unfired round found on the roof of the computer science building at Utah Valley University on or about September 10, 2025; (2) the evidence or property log entry for that round, or the record documenting a decision not to take it into evidence; and (3) any record identifying the officer whose rifle-cycling was determined to account for it.",
          ask_no_records: true
        },
        {
          agencyId: "dps",
          summary: "DPS — rooftop overwatch deployment records for Sept 10 at UVU",
          subject: "GRAMA Request: overwatch/counter-sniper deployment records, UVU, September 10, 2025",
          records: "I request any deployment record, post assignment, or after-action record identifying law-enforcement personnel assigned to rooftop, overwatch, or counter-sniper positions on or around the Utah Valley University campus on September 10, 2025, including which buildings were occupied and by which agency. I am not requesting tactical methodologies — unit, position, and agency identification only.",
          filed: "PENDING — this ask is already in flight as DPS reference P013307-072126 (Records Center status Aug 4, 2026: Assigned / In Progress), filed Jul 21, 2026 via the GovQA portal (verbatim scope confirmed against the acknowledgment: deployment, post-assignment, or after-action records for rooftop/overwatch/counter-sniper positions, by building and agency). 10-business-day clock, Pioneer Day skipped — response due ~Aug 5. Do not re-file from this card.",
          ask_no_records: true
        }
      ]
    },
    {
      id: "exhibit-121",
      challenge: "The judge tossed the roof-descent video as edited; it was shown anyway.",
      short: "The “4K” exhibit",
      categories: ["Video evidence"],
      entities: ["robinson", "uvu-ent", "tpusa"],
      investigator: "Ian Carroll · Brandy & Billy (in the courtroom)",
      investigatorLinks: [
        { label: "Final recap — the exhibit history, walked through the transcript", url: "https://www.youtube.com/watch?v=R7mdXcBfQTw" },
        { label: "Coleman Ep 146 — the Bongino \"grainy\" clip [36:37–42:37]", url: "https://www.youtube.com/watch?v=jTCL1rt-52Q" }
      ],
      status: "confirmed",
      finding: "Day one, the judge REJECTED the state's video montage of the roof descent — exhibit 12.1 — because it was edited (zoom-ins, added circling), and ordered an unedited version remade overnight (exhibit 12.4). On the final day, after the cameras were off, the judge granted the victim representative's (Erika Kirk's) attorney's request to play “the totality of, I believe it is, state exhibit 12.1 — 8 give or take 2 minutes” to the ~14 in-person seats only, confirming on the record it would not be televised. Per the transcript, the “enhanced” video is the same surveillance footage at the same resolution, zoomed in a video editor. Two journalists in the room posted immediately: no high-quality zoomed footage, no sound, the crouching figure “could be anyone” — while accounts with ~10M collective followers claimed it showed the shot. The Jul 18 receipts batch now names those accounts, verbatim, from Diligent Denizen's screenshot collage: Nick Sortor (\"High-quality surveillance video... showing Tyler Robinson TAKING THE SHOT... Robinson is SCREWED\"), Jack Posobiec (\"You can see him take the shot\"), Andrew Kolvet quoting Posobiec (\"You see him taking the shot. You see it all.\"), Gunther Eagleman (\"Surveillance video just dropped showing Tyler Robinson pulling the trigger... Game over.\"), Graham Allen (\"The zoomed in video shows him taking the shot. It's over.\"), plus Insider Wire, TONY™, and 0HOUR1. And the counter-voice is the Bureau's own: in a clip Coleman plays in Ep 146, then-FBI deputy director Dan Bongino repeatedly calls the roof video \"obviously grainy\" — \"not a crime scene camera... camera's quite far away\" — and says it can't even settle whether the figure had the gun in hand. The Jul 20 trend grab adds a named face to the what-does-the-video-show claim lane: Rob O'Neill, the former SEAL Team 6 member, on Newsmax — speaking to the RELEASED shooting video, not the roof exhibit — \"I've been in a lot of shootings... I've never seen a shirt move like that, that looks like an explosion to me.\" The same shirt-movement anomaly claim previously circulated by an anonymous analysis account, now voiced by a named, credentialed figure on national TV — and still an opinion unaccompanied by analysis.",
      implication: "A video the public was told is conclusive was shown once, off camera, and “isn't going to be released publicly.” The native source exports and the paper trail of the exhibit work — who performed the zoom and editing, with what software, from which camera files — are discrete records on both ends: UVU owns the cameras, and the state made the exhibits.",
      sources: [
        { label: "Hearing transcript: 12.1 rejected as edited day one; final-day playback colloquy (not televised)", url: "" },
        { label: "Brandy & Billy, posted from the courtroom (relayed with wristbands shown)", url: "https://www.youtube.com/watch?v=R7mdXcBfQTw" },
        { label: "Ian Carroll's post as captured (Jul 12, receipts batch): \"the court transcripts clearly say that it was exhibit 12.1 which was already introduced and rejected by judge Graff. They made exhibit 12.4 out of the same footage and showed it the next morning\" — his characterization of the court record, checkable against the transcript and exhibit list", url: "https://x.com/IanCarrollShow/status/2076432748684935635" },
        { label: "The influencer collage, preserved (DD's Jul 13 quote-post + image; the syndication JSON also preserves that the post was edited twice after publication)", url: "https://x.com/DiligentDenizen/status/2076769716291445154" },
        { label: "Ep 146 [36:37–42:37] — Dan Bongino (then FBI deputy director) on clip: the video is \"obviously grainy,\" \"not a crime scene camera... camera's quite far away\"; working theory had the figure dropping and retrieving a fully-assembled firearm because the video can't show it in hand", url: "https://www.youtube.com/watch?v=jTCL1rt-52Q" },
        { label: "Rob O'Neill on Newsmax, via the clip that carried the Jul 19–20 X trend (full raw JSON: RESCRAPE 2026-07-20 VladTheInflator 2078977593597120930; trend grab: X trend 2026-07-20 - Acting-alone debate reignites - POSTS.md — both in the library): \"I've never seen a shirt move like that, that looks like an explosion to me\" — his characterization of the released shooting video; credentialed opinion, no accompanying analysis. Checkable: the full Newsmax segment (show, air date, segment) has not been identified — the circulating clip is the only basis", url: "https://x.com/VladTheInflator/status/2078977593597120930" }
      ],
      requests: [
        {
          agencyId: "uvupd",
          summary: "UVU PD — native export of the camera segments behind exhibits 12.1/12.4",
          subject: "GRAMA Request: unedited surveillance exports, Losee Center roof and courtyard cameras, midday September 10, 2025",
          records: "I request unedited, native-format exports (original resolution and metadata intact) of Utah Valley University surveillance video for September 10, 2025, 12:10 p.m. – 12:35 p.m., from the camera or cameras whose footage was used to create the video exhibits designated 12.1 and 12.4 at the public preliminary hearing in State v. Robinson — the footage covering the Losee Center roofline and descent point. If the original recordings have been provided to or seized by an investigating agency, I request the transfer or evidence-receipt record identifying that agency and the date of transfer.",
          ask_no_records: true,
          filed: "DENIED — CLOSED Aug 3, 2026 under § 63G-2-106: all records \"relating to\" UVU’s camera system are \"security measures\" and \"not subject to GRAMA\" — categorically; § 305(12) and § 305(10) claimed in the alternative. No segregability finding, and the transfer/evidence-receipt fallback item (who holds the originals) was never addressed. Appeal: 30 days to UVU’s CAO, VP Val Peterson (petersva@uvu.edu, CC ccollings@uvu.edu). Originally: filed via NextRequest as UVU #26-229, Jul 17, 2026; acknowledged Jul 17. EXPEDITE DENIED — UVU: request 'failed to meet that burden' of demonstrating public benefit under § 63G-2-204(4a); the standard 10-business-day clock still applies, due ~Aug 1 (Pioneer Day)."
        },
        {
          agencyId: "dps",
          summary: "DPS/SBI — the paper trail of the exhibit work: who made 12.1 and 12.4, from what, with what",
          records: "I request, concerning the video exhibits designated 12.1 and 12.4 at the July 2026 preliminary hearing in State v. Robinson: (1) the work request, lab request, or tasking record for the creation, enhancement, magnification, or editing of those exhibits, identifying the person, unit, or vendor that performed the work and the software used; (2) the record identifying the source video files used (camera, export date, and file hash or comparable integrity record, if maintained); and (3) any record documenting the revision of the exhibit after July 7, 2026 — the overnight remake ordered when the original version was ruled edited. I am not requesting the video content itself in this item — the records documenting how the exhibits were made.",
          subject: "GRAMA Request: records documenting the creation of video exhibits 12.1 and 12.4, State v. Robinson",
          ask_no_records: true,
          filed: "TWO OF THE BATCH DENIED — P012986 and P012989 denied Aug 1, 2026 by SBI Records Manager Tina Rodriguez as \"exempt from disclosure\"; the email notice’s \"for the following reasons:\" is followed by nothing — the actual grounds are visible only inside the GovQA portal, and which two of the five asks those numbers map to is pending a portal login. P012987 remains the batch’s one live request (Records Center, Aug 4, 2026: Assigned / In Progress). Original batch: filed Jul 16, 2026 via GovQA — P012986/87/89/92/95 (exhibit 12.1/12.4 tasking records, Panguitch tip log, Discord evidence intake, ballistics + GSR reports, latent prints 11B–11D)."
        }
      ]
    },
    {
      id: "discord-timing",
      challenge: "The worldwide Discord “confessions” never surfaced at the hearing.",
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
          ask_no_records: true,
          filed: "TWO OF THE BATCH DENIED — P012986 and P012989 denied Aug 1, 2026 by SBI Records Manager Tina Rodriguez as \"exempt from disclosure\"; the email notice’s \"for the following reasons:\" is followed by nothing — the actual grounds are visible only inside the GovQA portal, and which two of the five asks those numbers map to is pending a portal login. P012987 remains the batch’s one live request (Records Center, Aug 4, 2026: Assigned / In Progress). Original batch: filed Jul 16, 2026 via GovQA — P012986/87/89/92/95 (exhibit 12.1/12.4 tasking records, Panguitch tip log, Discord evidence intake, ballistics + GSR reports, latent prints 11B–11D)."
        }
      ]
    },
    {
      id: "ballistics-inconclusive",
      challenge: "The recovered fragment couldn't be matched to the rifle — and measured too small for it.",
      short: "Ballistics inconclusive",
      categories: ["Physical evidence"],
      entities: ["robinson", "sbi"],
      investigator: "Baron Coleman",
      investigatorLinks: [
        { label: "Ep. 142 — Day Four", url: "https://www.youtube.com/watch?v=6ZZ_e53ZDnY" },
        { label: "Rob O'Neill (SEAL Team 6, killed bin Laden) on Newsmax: \"I've killed more than a hand full of people and this thing looked shady off the bat... I've never seen a shirt move like that, that looks like an explosion to me\" (quotes re-verified against the scrape Jul 20 2026)", url: "https://x.com/VladTheInflator/status/2078977593597120930" }
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
          ask_no_records: true,
          filed: "TWO OF THE BATCH DENIED — P012986 and P012989 denied Aug 1, 2026 by SBI Records Manager Tina Rodriguez as \"exempt from disclosure\"; the email notice’s \"for the following reasons:\" is followed by nothing — the actual grounds are visible only inside the GovQA portal, and which two of the five asks those numbers map to is pending a portal login. P012987 remains the batch’s one live request (Records Center, Aug 4, 2026: Assigned / In Progress). Original batch: filed Jul 16, 2026 via GovQA — P012986/87/89/92/95 (exhibit 12.1/12.4 tasking records, Panguitch tip log, Discord evidence intake, ballistics + GSR reports, latent prints 11B–11D)."
        }
      ]
    },
    {
      id: "prints-excluded",
      challenge: "Three prints below the roof descent point were tested — and excluded Robinson.",
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
          records: "I request, concerning the Utah Valley University homicide investigation (victim Charlie Kirk; defendant Tyler James Robinson, State v. Robinson): (1) the SBI latent-print examination report (examiner Elisa Farmer) covering the latent prints designated 11B, 11C, and 11D recovered from the window glass below the roof descent point, whose conclusions — including the exclusion of the defendant as the source — were stipulated on the public record at the July 9, 2026 preliminary hearing; and (2) any record of database searches (AFIS/NGI) or comparisons run to identify the actual source of those three prints, including the result or a record that no such search was run.",
          ask_no_records: true,
          filed: "TWO OF THE BATCH DENIED — P012986 and P012989 denied Aug 1, 2026 by SBI Records Manager Tina Rodriguez as \"exempt from disclosure\"; the email notice’s \"for the following reasons:\" is followed by nothing — the actual grounds are visible only inside the GovQA portal, and which two of the five asks those numbers map to is pending a portal login. P012987 remains the batch’s one live request (Records Center, Aug 4, 2026: Assigned / In Progress). Original batch: filed Jul 16, 2026 via GovQA — P012986/87/89/92/95 (exhibit 12.1/12.4 tasking records, Panguitch tip log, Discord evidence intake, ballistics + GSR reports, latent prints 11B–11D)."
        }
      ]
    },
    {
      id: "robertson-usu",
      challenge: "The armed \"unknown man\" who went up to the roof with Bagley has a name, an agency, and a reason to have filed reports.",
      short: "The red-hat man: USU PD",
      categories: ["Personnel & credibility", "Witness statements"],
      entities: ["robertson", "haycock", "bagley", "uvu-ent"],
      investigator: "Candace Owens (Ep 371) · NissCee.Social",
      investigatorLinks: [
        { label: "Owens Ep 371, Aug 5 2026 — the why-he-was-there sourcing and the on-air correction", url: "https://www.youtube.com/watch?v=1CFDtD0IgEg" },
        { label: "NissCee — the identification walk-through (watch, bracelet, tattoo, the USU bio)", url: "https://www.youtube.com/watch?v=ZgKyZUvvpwg" }
      ],
      status: "reported",
      finding: "The man in the red hat and khaki shorts — armed, badge on his bag, in civilian clothes — who accompanied Officer Bagley to the Losee Center roof has been identified: Alan Robertson, a Utah State University campus police officer, formerly of San Bernardino PD; the man in the blue shirt alongside him is identified as Christopher Haycock, also USU campus police (NissCee, from a viewer identification: matching watch, bracelet, and tattoo; the two are co-workers and Facebook friends; Robertson's bio is on the USU site). Owens Ep 371 supplies the why, from sourcing she says was unusually unanimous: Kirk had an event at USU scheduled ten days later, and the two were at UVU on September 10 doing their own agency's advance threat assessment — \"not there in coordination with Charlie's security or in coordination with UVU police on that day\" — then jumped in to help when the shooting happened; \"because of their presence [they] would have had to make police reports.\" Her audience vetting closed the personal lead: the emails all defended him (left San Bernardino voluntarily, on good terms, to raise his kids), she corrected the record on air, and considers him a good cop; the empty Brady-list entry she had flagged was never explained. NissCee's noted coincidence: USU is the university Tyler Robinson attended before dropping out. The residue: with Robertson accounted for as a known officer, Bagley's sworn testimony that he never got the man's name or agency gets stranger, not better — Owens: \"it's giving shady Bagley.\" A live viewer claimed Bagley slipped and said \"Allen\" once on the stand; she promised to verify and has not reported back.",
      implication: "An out-of-jurisdiction advance team at a homicide scene generates paper at its home agency: the threat assessment for the USU event, the assignment or deployment record putting the two officers at UVU that day, and the reports their presence obligated. None of it is UVU's file or the prosecution's — it is USU's own administrative paper, outside the active-case wall. And the same production tests Bagley's can't-identify testimony from the records side: if USU's reports document contact or coordination with UVU PD personnel on the roof, the \"unknown armed man\" account has a problem.",
      sources: [
        { label: "Ep 371 [24:24–25:54] — the threat-assessment sourcing and no-coordination confirmation; [30:07–31:02] — the correction, the \"Allen\" slip claim (transcript banked in the library)", url: "https://www.youtube.com/watch?v=1CFDtD0IgEg" },
        { label: "NissCee [12:14–13:38] — the Robertson/Haycock identification (transcript banked in the library)", url: "https://www.youtube.com/watch?v=ZgKyZUvvpwg" }
      ],
      requests: [
        {
          agencyId: "usu",
          summary: "USU — the threat assessment, the deployment record, and the after-action reports for the two officers at UVU Sept 10",
          subject: "GRAMA Request: threat-assessment, deployment, and incident records — officers assisting at Utah Valley University, September 10, 2025",
          records: "I request, concerning Utah State University Police Department officers Alan Robertson and Christopher Haycock: (1) the threat assessment, site survey, or event-security planning record prepared in advance of the Turning Point USA event scheduled at Utah State University for on or about September 20, 2025; (2) the assignment, deployment, or travel record documenting either officer's presence at or near Utah Valley University on September 10, 2025 in connection with that advance work; (3) any incident report, supplemental report, or after-action statement filed by either officer concerning assistance rendered at the Utah Valley University shooting scene on September 10, 2025, including any record of contact or coordination with UVU police personnel that day; and (4) the records classified public under Utah Code § 63G-2-301(2)(b) for each officer — name, job title, and dates of employment. Each item names a discrete, routinely generated record; this is not a broad search, and I am not requesting any other agency's investigation file. Please also retain this correspondence and all records related to the processing of this request, including the records described above. If no responsive record exists for any numbered item, I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 7, 2026, ready to file via USU's GRAMA form (usu.edu/legal/grama) or grama@usu.edu. Owens' own sourcing says the presence obligated police reports — either they exist at USU, or their documented absence is the finding."
        }
      ]
    },
    {
      id: "sept9-bodyguard-stop",
      challenge: "The day before the shooting, campus security stopped a man scoping the campus. He claimed to be Mike Lee's bodyguard — Lee had already canceled, and has no bodyguard.",
      short: "Sept 9: the \"bodyguard\" stop",
      categories: ["Witness statements", "Timeline contradictions"],
      entities: ["uvu-ent", "jeff-long"],
      investigator: "Candace Owens (Ep 371, sourced) · Danks (Long-production read-through)",
      investigatorLinks: [
        { label: "Owens Ep 371, Aug 5 2026 — the source's account", url: "https://www.youtube.com/watch?v=1CFDtD0IgEg" },
        { label: "Danks livestream, Jul 25 2026 — the Long-production September 9 entries", url: "https://www.youtube.com/watch?v=XKjDIDF1Pjk" }
      ],
      status: "reported",
      finding: "Owens Ep 371 [10:44–11:53], from a source: after the assassination, Sen. Mike Lee was contacted about something unusual on campus the day before. On September 9, a man \"who looked remarkably suspicious... behaving oddly... kind of scoping the place out\" was moving about the UVU campus; when campus security approached him, he said he was Senator Mike Lee's bodyguard, checking the area to ensure the senator's safety ahead of the event. Two problems: Lee had already canceled his appearance by then, and — per her follow-up digging — Lee has no security team at all. September 9 keeps generating paper elsewhere in the docket: the Chief Long production (Danks read-through) describes Sens. Lee and Curtis arriving at UVU police around 10:35 p.m. that night asking to talk \"about a plan\" — later walked back to \"GOP reps who played like they knew more than they did\" — and a 2:30 p.m. urgent attempt to get a message to Kirk through UVU police or security. Same campus, same day, same senator's name — this time invoked by someone whose story doesn't hold.",
      implication: "A campus-security stop is not a memory — it's a record. The field-interview or contact card, the dispatch/incident log entry, and the camera coverage of the encounter each exist or don't, and either answer matters: a documented stop of a false \"senator's bodyguard\" the day before the assassination is evidence, and an undocumented one is a security-process finding. One tight request tests the source's story, the Long-production chain, and preservation at once.",
      sources: [
        { label: "Ep 371 [10:44–11:53] — the stop, the bodyguard claim, the canceled-appearance and no-detail points (transcript banked in the library)", url: "https://www.youtube.com/watch?v=1CFDtD0IgEg" },
        { label: "Long production per Danks read-through — the 10:35 p.m. senators visit and 2:30 p.m. message attempt (see the Chief Long re-request card; pages pending on UVU #26-242)", url: "https://www.youtube.com/watch?v=XKjDIDF1Pjk" }
      ],
      requests: [
        {
          agencyId: "uvupd",
          summary: "UVU PD — the Sept 9 field-interview/stop record, incident log, visitor log, and camera coverage",
          subject: "GRAMA Request: field-interview and incident records, September 9, 2025",
          records: "I request, for September 9, 2025, at the Utah Valley University campus: (1) any field-interview record, contact card, stop record, or incident report concerning an individual contacted or questioned by UVU police or campus security after being observed moving about the campus — including any individual who identified himself as a member of a U.S. senator's security or protective detail; (2) the dispatch or incident log entries for that day referencing a suspicious person, a security contact, or a protective-detail claim; (3) any visitor, guest, or contact log entry associated with that contact; and (4) surveillance video covering the contact, if its location and time are identifiable from items (1)–(2) — or, if not, written confirmation of the retention status of September 9, 2025 campus video. I also request any sign-in, visitor, or incident record of the visit of two U.S. senators or persons identifying as their representatives to UVU police on the evening of September 9, 2025. Please also retain this correspondence and all records related to the processing of this request, including the records and video described above — September 9, 2025 video in particular may be subject to routine overwrite. If no responsive record exists for any numbered item, I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 7, 2026, ready to file to uvpdrecords@uvu.edu. Expect the § 63G-2-106 categorical wall on the video item (as raised on #26-229/#26-230) — the field-interview and log items are the core ask and are ordinary police paper."
        }
      ]
    },
    {
      id: "site-box-truck",
      challenge: "A box truck with a satellite antenna sat blocked in on the construction site along the escape path.",
      short: "The box truck on the dig site",
      categories: ["Crime scene handling", "Video evidence"],
      entities: ["uvu-ent"],
      investigator: "Baron Coleman (Ep 155) + viewer analysis",
      investigatorLinks: [
        { label: "Coleman Ep 155, Aug 6 2026 — the truck walk-through and the viewer split", url: "https://www.youtube.com/watch?v=sIfblNrwkk4" }
      ],
      status: "reported",
      finding: "Coleman Ep 155 (Aug 6): parked — blocked in — on the construction site adjacent to the suspect's escape path on September 10 was a box truck that doesn't read like construction equipment: satellite antenna, air-conditioning unit, a human-sized side door, and windowed French rear doors. His audience split into two camps: an insulation-blower truck — or, per viewers with law-enforcement backgrounds, \"that's exactly our old mobile command post.\" Separately, a USA Today clip from September 11 has an excavator operator on that same site saying he believes he spoke with the suspect. The truck is on footage; what it was is the open question.",
      implication: "Both readings terminate in records. If an agency staged a command or communications vehicle there, a deployment, staging, or vehicle-assignment record says so. If it was the contractor's truck, the site contractor's records identify it — and the contractor's crew roster identifies the excavator operator who says he spoke with the suspect: a witness with a name and an employer. The site records and the command-vehicle logs are different agencies' paper; ask both.",
      sources: [
        { label: "Ep 155 — the truck segment and the USA Today excavator-operator clip as aired (transcript banked in the library)", url: "https://www.youtube.com/watch?v=sIfblNrwkk4" }
      ],
      requests: [
        {
          agencyId: "uvu",
          summary: "UVU — the construction project's contractor identity and site-access records for Sept 8–12",
          subject: "GRAMA Request: construction project and site-access records, area adjacent to the Losee Center, September 2025",
          records: "I request, concerning the construction project active in September 2025 on the site adjacent to the Losee Center at Utah Valley University — the site crossed during the September 10, 2025 suspect's departure route: (1) the record identifying the project's general contractor and any excavation subcontractor, including the contract or purchase order under which the work proceeded; (2) any site-access, vehicle, or equipment record for September 8–12, 2025, including any record of a vehicle authorized to park or remain on the site other than the contractor's own equipment; and (3) any correspondence or coordination record between the university (or the project's managing agency) and any law-enforcement agency concerning that site for September 10–12, 2025. Please also retain this correspondence and all records related to the processing of this request. If no responsive record exists for any numbered item, I request written confirmation of that fact for that item, including a description of the search conducted.",
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 7, 2026. If the project ran under DFCM rather than UVU (as the courtyard paving did), UVU's § 63G-2-204 referral obligation points the request there — and the referral letter itself names the managing agency, which is half the answer."
        },
        {
          agencyId: "dps",
          summary: "DPS — any mobile command post / communications vehicle deployment at UVU, Sept 10–11",
          subject: "GRAMA Request: mobile command post deployment records, September 10–11, 2025",
          records: "I request, for September 10–11, 2025: any deployment, staging, or utilization record for a Department of Public Safety mobile command post, mobile communications vehicle, or similar specialized vehicle at or near the Utah Valley University campus — including the staging location and the requesting or authorizing official. I am requesting the deployment/staging record only, not the vehicle's technical specifications or communications content. Please also retain this correspondence and all records related to the processing of this request. If the department deployed no such vehicle, I request written confirmation of that fact, including a description of the search conducted.",
          parties: "Tyler James Robinson (defendant); Charlie Kirk (victim). The record's subject is the department's own vehicle deployment for the September 10, 2025 incident response.",
          formAnswers: [
            { label: "Date of occurrence", value: "09/10/2025" }
          ],
          ask_no_records: true,
          filed: "NOT FILED — DRAFTED Aug 7, 2026, ready to file via the DPS GovQA Records Center. A no-records answer narrows the truck to the contractor or another agency; a responsive record names who staged what where."
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
      question: "Answered Jul 22, 2026 — and the answer opened a second gap: the video is gone, no record documents the deletion, and the schedule WCSO cites (GRS-2021) says \"retain until resolution of issue,\" not 14–30 days. The surviving \"Tyler Robinson and Video\" email thread is in redaction; the system's actual retention setting is the follow-on ask.",
      findings: ["wcso-intake-video"],
      requests: [{ inv: "wcso-intake-video", idx: 0 }, { inv: "wcso-intake-video", idx: 1 }] },
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
      question: "Two witnesses, a 100% ID, a card payment with a hard timestamp — reported to the FBI, never followed up per the witnesses, never contacted by either side. The restaurant's own statement now says it has no evidence either way, and Owens' account has narrowed to one server plus a name-match — which makes the lead-log question sharper, not moot. If the tip was run down and excluded, the log shows it. If it wasn't, the state built a timeline nobody tested against it.",
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
      requests: [{ inv: "dna-elimination", idx: 0 }] },
    { id: "gap-second-suv", label: "Where did the second SUV go?",
      question: "Two rented SUVs met Kirk's jet in Salt Lake City the morning of 9/10. The one without Charlie \"drove somewhere... parked and marked time,\" per its own passenger — who says he can't recall where, who drove, or who rode along. The airport's landing report and ramp-access records, and UVU's event parking credentials, close a two-hour window memory won't.",
      findings: ["second-suv", "tpusa-contact"],
      requests: [{ inv: "second-suv", idx: 0 }, { inv: "second-suv", idx: 1 }] },
    { id: "gap-suv-processed", label: "Was the transport SUV processed?",
      question: "Photos show a charred object — plausibly the victim's burned shirt — left in the vehicle that carried Kirk to the hospital. A homicide victim's clothing is itemized somewhere. Either an intake log and processing record exist for that vehicle, or nobody ever processed it.",
      findings: ["transport-suv-contents", "me-chain"],
      requests: [{ inv: "transport-suv-contents", idx: 0 }, { inv: "transport-suv-contents", idx: 1 }] },
    { id: "gap-backpack-owner", label: "Whose backpack was at the bus stop?",
      question: "A backpack, jacket, and gloves on the shooter's flight route went to the FBI lab — then testing stopped, on a lab note (page 20) saying the backpack \"belongs to Kirk's detail,\" written by someone the examiner can't name. Who on the detail, who wrote the note, and who ordered the stand-down are all records.",
      findings: ["backpack-stop-testing"],
      requests: [{ inv: "backpack-stop-testing", idx: 0 }, { inv: "backpack-stop-testing", idx: 1 }] },
    { id: "gap-twiggs-interview-where", label: "Where was Twiggs's first interview?",
      question: "Sworn testimony: St. George PD. Sworn warrant statements: FBI Special Agent Lang at the Washington County Sheriff's Office. Same 1 a.m. interview, two buildings, two agencies — and the record of it has never been produced. Facility logs settle it.",
      findings: ["twiggs-first-interview", "custody-timeline"],
      requests: [{ inv: "twiggs-first-interview", idx: 0 }, { inv: "twiggs-first-interview", idx: 1 }] },
    { id: "gap-nest-original", label: "Where's the original Nest file?",
      question: "The courtroom copy of the doorbell video was cut mid-sequence and visibly degraded — and the homeowner's signed statement (bald driver, three passengers) says she could see things the played version doesn't show. The native cloud export, its metadata, and the processing chain answer whether that's compression or curation.",
      findings: ["noble-report", "cut-footage"],
      requests: [{ inv: "noble-report", idx: 1 }] }
  ]
};
