// padala.law — subjects by semester.
// Subject fields: id, name, paper, emoji, topics[{n,t,s}]
//   optional : label when the paper is one of two alternatives (both are hosted)
//   en       : true when English episodes exist / are planned as audio/<id>/story-NN-en.m4a
//   notes    : true when notes/<id>.js exists (built by sem5-pipeline/build/notes_html.js)
const SEMESTERS = [
  {
    id: "sem4", name: "Semester IV", short: "Sem IV",
    subjects: [
      {
        id: "pil", name: "Public International Law", paper: "Paper XVII", emoji: "⚖️",
        topics: [
          {n:"01", t:"The S.S. Lotus Case", s:"Nature of international law, Lotus principle, bases of state jurisdiction, Article 97 UNCLOS"},
          {n:"02", t:"North Sea Continental Shelf", s:"Sources of international law, Article 38 ICJ, custom, state practice and opinio juris"},
          {n:"03", t:"Birth of Bangladesh 1971", s:"Statehood, Montevideo criteria, recognition — constitutive vs declaratory, de facto vs de jure"},
          {n:"04", t:"Abu Salem Extradition", s:"Extradition, double criminality, rule of speciality, political offence exception"},
          {n:"05", t:"Assange & the Embassy", s:"Territorial vs diplomatic asylum, non-refoulement, embassy inviolability Article 22"},
          {n:"06", t:"Devyani Khobragade", s:"Diplomatic privileges and immunities, Vienna Convention 1961, consular vs diplomatic immunity"},
          {n:"07", t:"Enrica Lexie", s:"Law of the sea, territorial sea, innocent passage, contiguous zone, EEZ, high seas"},
          {n:"08", t:"Danube Dam (Gabčíkovo)", s:"Law of treaties, pacta sunt servanda, jus cogens, termination grounds Articles 60–62"},
          {n:"09", t:"Korea 1950 & the Empty Chair", s:"UN organs, Security Council, veto and double veto, Uniting for Peace, ICJ jurisdiction"},
          {n:"10", t:"Corfu Channel", s:"State responsibility, attribution, reparation, Chorzów Factory, diplomatic protection"}
        ]
      },
      {
        id: "labour", name: "Labour & Industrial Law II", paper: "Paper XVI", emoji: "\u{1F477}",
        topics: [
          {n:"01", t:"Bijay Cotton Mills", s:"Constitutional validity of Minimum Wages Act 1948, theories and concepts of wages"},
          {n:"02", t:"Payment of Wages Act 1936", s:"Wage periods, authorised deductions Section 7, fines, remedies"},
          {n:"03", t:"Jalan Trading & Bonus", s:"Payment of Bonus Act 1965, allocable surplus, set on and set off, eligibility"},
          {n:"04", t:"Saurashtra Salt", s:"Employees Compensation Act 1923, notional extension, disablement, quantum"},
          {n:"05", t:"ESI Social Insurance", s:"ESI Act 1948, six benefits, contributions, ESI Court"},
          {n:"06", t:"EPF, Pension & Gratuity", s:"EPF Act 1952 schemes, Pension Scheme 1995, Gratuity Act 1972, forfeiture"},
          {n:"07", t:"Factories Act & Welfare", s:"Philosophy of labour welfare, health safety welfare, women and child labour"},
          {n:"08", t:"Contract Labour: Air India & SAIL", s:"Contract Labour Act 1970, abolition Section 10, automatic absorption controversy"},
          {n:"09", t:"Bandhua Mukti Morcha", s:"Bonded Labour Abolition Act 1976, Article 23 forced labour, PIL, rehabilitation"},
          {n:"10", t:"Migrant & Unorganised Workers", s:"Inter-State Migrant Workmen Act 1979, Unorganised Workers Act 2008, welfare boards"}
        ]
      },
      {
        id: "tax", name: "Principles of Taxation Law", paper: "Paper XVIII", emoji: "\u{1F4B0}",
        topics: [
          {n:"01", t:"No Tax Without Law", s:"Article 265, Article 246 and Seventh Schedule, direct vs indirect tax, tax vs fee"},
          {n:"02", t:"Raja Benoy & Agricultural Income", s:"Section 2(1A), Section 10(1) exemption, basic operations test, partial integration"},
          {n:"03", t:"Vodafone & Residential Status", s:"Section 6 residence tests, Section 5 incidence, previous year, assessee"},
          {n:"04", t:"McDowell to Azadi Bachao", s:"Tax planning vs avoidance vs evasion, colourable device, GAAR, substance over form"},
          {n:"05", t:"Five Heads of Income", s:"Section 14 heads, income from salary Sections 15–17, perquisites, deductions"},
          {n:"06", t:"Returns & Assessment", s:"Section 139 returns, self/summary/scrutiny/best judgment assessment, reassessment 147"},
          {n:"07", t:"Authorities & Appeals", s:"CBDT hierarchy, Commissioner Appeals, ITAT, Section 260A, revision 263 and 264"},
          {n:"08", t:"Penalties & Prosecution", s:"Section 270A under-reporting, Section 276C evasion, search Section 132, survey 133A"},
          {n:"09", t:"Wealth Tax: Rise and Fall", s:"Wealth Tax Act 1957, net wealth, assets and exemptions, 2015 abolition"},
          {n:"10", t:"GST: One Nation One Tax", s:"101st Amendment, GST Council Article 279A, CGST SGST IGST, input tax credit"}
        ]
      },
      {
        id: "ipr", name: "IPR Litigation", paper: "Paper XIX", emoji: "\u{1F4A1}",
        topics: [
          {n:"01", t:"R.G. Anand v Delux Films", s:"Idea-expression dichotomy, subject matter Section 13, substantial similarity test"},
          {n:"02", t:"DU Photocopy Case", s:"Fair dealing, Section 52 exceptions, educational use and course packs"},
          {n:"03", t:"Ownership & Assignment", s:"First owner Section 17, assignment 18, licence 30, term 22, moral rights 57"},
          {n:"04", t:"Video Piracy & Remedies", s:"Section 51 infringement, civil remedies 55, Anton Piller and John Doe orders, Section 63"},
          {n:"05", t:"Cadila & Deceptive Similarity", s:"Trade Marks Act 1999, Section 9 and 11 grounds, likelihood of confusion, registration"},
          {n:"06", t:"Whirlpool & Passing Off", s:"Classical trinity, trans-border reputation, Section 27(2), infringement vs passing off"},
          {n:"07", t:"Novartis & Glivec", s:"Patentability, novelty inventive step utility, Section 3(d) anti-evergreening"},
          {n:"08", t:"Bayer v Natco", s:"Compulsory licence Section 84 three grounds, rights of patentee and limits"},
          {n:"09", t:"Bajaj v TVS", s:"Patent infringement suit, interim injunction, Section 108 reliefs, revocation 64"},
          {n:"10", t:"TRIPS, Berne & Global IP", s:"TRIPS minimum standards, national treatment, Doha Declaration, WIPO, biopiracy"}
        ]
      },
      {
        id: "land", name: "Land Laws", paper: "Paper XX", emoji: "\u{1F333}",
        topics: [
          {n:"01", t:"Kameshwar Singh & Zamindari", s:"Permanent Settlement, Ryotwari, Mahalwari, abolition, First Amendment, Ninth Schedule"},
          {n:"02", t:"Eminent Domain & Escheat", s:"Public purpose and compensation, Article 300A, escheat Article 296, meaning of land"},
          {n:"03", t:"Singur Land Acquisition", s:"LA Act 1894 procedure Sections 4–17, solatium, 2013 Act consent and SIA"},
          {n:"04", t:"Land Ceiling", s:"AP Land Reforms Act 1973, standard holding, ULCRA 1976 and its 1999 repeal"},
          {n:"05", t:"Land to the Tiller", s:"AP Tenancy Act 1956, fair rent, lease period, eviction protection, pre-emption"},
          {n:"06", t:"Samatha & Scheduled Areas", s:"AP Land Transfer Regulation 1959/1970, prohibition on transfer to non-tribals"},
          {n:"07", t:"Assigned Lands & Land Grabbing", s:"AP Assigned Lands Act 1977, Land Grabbing Act 1982, Special Courts"},
          {n:"08", t:"Godavarman & Forests", s:"Forest Conservation Act 1980, dictionary meaning of forest, AP Forest Act 1967"},
          {n:"09", t:"Niyamgiri & Forest Rights", s:"Forest Rights Act 2006, individual and community rights, Gram Sabha consent"},
          {n:"10", t:"Revenue Administration", s:"VRO to Collector hierarchy, ROR and pattadar passbooks, Part C problem answers"}
        ]
      }
    ]
  },
  {
    id: "sem5", name: "Semester V", short: "Sem V",
    subjects: [
      {
        id: "evidence", name: "Law of Evidence", paper: "Paper XXVII", emoji: "\u{1F50D}", en: true, notes: true,
        topics: [
          {n:"01", t:"The Poisoned Bride", s:"Sharad Birdhichand Sarda — Facts, facts in issue, relevant facts, presumptions (Sec 3, 4 / BSA 2)"},
          {n:"02", t:"Words in the Heat of the Moment", s:"Res Gestae & Conspiracy — Res gestae Sec 6-8 (Gentela Vijayavardhan Rao — bus burning, statements hours later not res gestae)"},
          {n:"03", t:"I Was With Him When He Died", s:"Admissions & Confessions — Pakala Narayana Swami definition of confession"},
          {n:"04", t:"The Tip of the Iceberg", s:"Pulukuri Kottaya & Section 27 — Sec 27 five conditions"},
          {n:"05", t:"The Last Words", s:"Dying Declarations — Sec 32(1)"},
          {n:"06", t:"The Handwriting Man & the Electronic Examiner", s:"Expert Evidence — Sec 45 expert opinion"},
          {n:"07", t:"The Terrorists Threatened Me", s:"Hearsay & the Best Evidence Rule — Subramaniam v Public Prosecutor"},
          {n:"08", t:"The Six-Year Courtroom Drama", s:"Section 65B — Anvar P.V. v Basheer (2014)"},
          {n:"09", t:"Who May Speak", s:"Witnesses & Privileges — Sec 118 competency"},
          {n:"10", t:"The Witness Who Turned", s:"Best Bakery & Examination of Witnesses — Zahira Sheikh retrial"},
          {n:"11", t:"The Golden Thread & the Kitchen Fire", s:"Burden of Proof & Presumptions — Woolmington"},
          {n:"12", t:"The Sugar Mill's Promise", s:"Estoppel & the New Sakshya Adhiniyam — Sec 115 essentials and kinds"}
        ]
      },
  {
    id: "crpc", name: "Law of Crimes II (CrPC)", paper: "Paper XXVI", emoji: "👮", en: true, notes: true,
    topics: [
      {n:"01", t:"The FIR That Could Not Be Refused", s:"Lalita Kumari — criminal justice systems, Arts 14/20/21/22, features of the Code, definitions, FIR Sec 154-157"},
      {n:"02", t:"Eleven Rules in the Lock-up", s:"D.K. Basu & Arnesh Kumar — arrest Sec 41-60, 70-80, rights of the arrested, preventive powers 149-153"},
      {n:"03", t:"The Right to Stay Silent", s:"Nandini Satpathy — Sec 160-162 statements, 164 confessions, 167 remand, 172-176 diary, report, inquest"},
      {n:"04", t:"The Midnight Search", s:"Pooran Mal — search and seizure Sec 91-103, 165-166B, proclamation and attachment 82-89"},
      {n:"05", t:"The Chief Minister's Complaint", s:"Bhajan Lal — jurisdiction 177-189, cognizance 190-194, bars 195-199, complaints 200-210, Sec 482"},
      {n:"06", t:"Bail, Not Jail", s:"Gurbaksh Singh Sibbia — bail Sec 436-450, anticipatory bail 438, undertrials 436A"},
      {n:"07", t:"Shah Bano's Twenty-Five Rupees", s:"Shah Bano — maintenance Sec 125-128 and the 1986 Act, security 106-124, unlawful assembly, Sec 133-144, 145-148"},
      {n:"08", t:"The Last Jury", s:"Nanavati — fair trial, charge 211-224, sessions, warrant, summons and summary trials, plea bargaining"},
      {n:"09", t:"Tried Twice?", s:"Maqbool Hussain — Sec 300 double jeopardy, compounding 320, withdrawal 321, pardon 306-308, unsound mind, limitation 467-473, irregularities"},
      {n:"10", t:"Rarest of the Rare", s:"Bachan Singh — judgment 353-365, death confirmation 366-371, appeals 372-394, revision 395-405, transfer, execution and remission 413-435"},
      {n:"11", t:"The Boy Who Was Not Tried as a Man", s:"Nirbhaya juvenile & Pratap Singh — juvenile justice history, IPC 82-83, JJ Acts 1986, 2000, 2015"},
      {n:"12", t:"A Second Chance", s:"Ramji Missar — Probation of Offenders Act 1958, Sec 360-361, parole, Malimath Committee, 2005/2008 amendments, BNSS"}
    ]
  },
  {
    id: "cpc", name: "Civil Procedure Code & Limitation", paper: "Paper XXV", emoji: "⚖️", en: true, notes: true,
    topics: [
      {n:"01", t:"The Handmaid of Justice", s:"Sangram Singh — nature and history of civil procedure, features of the Code, definitions, jurisdiction Sec 9"},
      {n:"02", t:"The Carrier Who Chose the Court", s:"Patel Roadways — parties Order I, frame of suit Order II, place of suing Sec 15-21, summons Order V, discovery Order XI"},
      {n:"03", t:"The Same Fight Twice", s:"Daryao — res sub judice Sec 10, res judicata Sec 11 and its Explanations, foreign judgments Sec 13-14, 44A"},
      {n:"04", t:"The Vexatious Plaint", s:"Arivandandam — pleadings Order VI, plaint Order VII, written statement, set-off and counter-claim Order VIII, issues Order XIV"},
      {n:"05", t:"The Day of Hearing", s:"Salem Advocate Bar Association — Order IX appearance and ex parte, Order X, XII, XIII, XVI witnesses, Order XVIII hearing and affidavits, Order XVII adjournments"},
      {n:"06", t:"Prima Facie, Balance, Irreparable", s:"Dalpat Kumar — judgment and decree Order XX, injunctions Order XXXIX, receivers Order XL, attachment before judgment, costs, Sec 151, restitution Sec 144"},
      {n:"07", t:"The Decree Must Bite", s:"Jolly George Varghese — execution Sec 36-74 and Order XXI: courts, modes, arrest, attachment, sale, objections"},
      {n:"08", t:"Suing the Sarkar", s:"Geeta Iron and Brass Works — suits against Government Sec 79-82 and Sec 80 notice, foreign States Sec 83-87B, public nuisance and charities Sec 91-93, interpleader, Sec 75-78, 94-95"},
      {n:"09", t:"The Court's Eyes and Ears", s:"Bandhua Mukti Morcha — commissions Order XXVI and socio-legal commissions in PIL, minors Order XXXII, indigent persons Order XXXIII, Order XXII, Order XXIII"},
      {n:"10", t:"The Second Look", s:"Santosh Hazari — appeals Sec 96-112 and Order XLI, XLIII, XLV, reference, review and revision Sec 113-115, Art 227"},
      {n:"11", t:"Time Bars the Door", s:"Katiji — Limitation Act 1963 Sec 3-27: bar, sufficient cause, legal disability, computation, acknowledgment, continuing wrongs, adverse possession"},
      {n:"12", t:"Settling Outside the Court", s:"Afcons Infrastructure — the 1976, 1999, 2002 and 2015 amendments, Sec 89 ADR, summary suits Order XXXVII, Mediation Act 2023, e-courts"}
    ]
  },
{
    id: "banking", name: "Banking Law & Negotiable Instruments", paper: "Paper XXVIII", emoji: "🏦", optional: "Optional II (alternative: Insurance)", en: true, notes: true,
    topics: [
      {n:"01", t:"The Banker Is Not a Trustee", s:"Foley v Hill — what banking is, who is a customer, debtor-creditor and the special relationships, duties and rights"},
      {n:"02", t:"The Minor Who Signed", s:"Mohori Bibee — opening accounts, KYC, kinds of accounts, joint accounts, and the special customers"},
      {n:"03", t:"The Fixed Deposit and the Time-Barred Loan", s:"PNB v Surendra Prasad Sinha — pass book, overdraft, drafts, appropriation and Clayton's case, set-off, safe custody, garnishee orders"},
      {n:"04", t:"The Banker's Lien on the Fixed Deposit", s:"Syndicate Bank v Vijay Kumar — lien, pledge, guarantee, documents of title, letters of credit and bank guarantees"},
      {n:"05", t:"Paper That Passes Like Money", s:"Kundan Lal Rallaram — the NI Act, negotiability vs assignability, note, bill and cheque, analogous instruments, presumptions, holder in due course"},
      {n:"06", t:"Not Negotiable", s:"Great Western Railway v London and County Bank — kinds of cheques, crossing, endorsements, payment in due course, marking, refusal of payment"},
      {n:"07", t:"The Forged Cheque", s:"Canara Bank v Canara Sales Corporation — liabilities of parties, forgery and alteration, paying banker's and collecting banker's protection"},
      {n:"08", t:"Cheque Bounce", s:"Dashrath Rupsingh Rathod — Sec 138 to 148: offence, presumption, notice, jurisdiction, companies, trial, compounding, appeal"},
      {n:"09", t:"The Bank That Was Frozen", s:"Yes Bank moratorium — Banking Regulation Act: licensing, reserves, advances, RBI and Government powers, moratorium and schemes"},
      {n:"10", t:"The Bank of Banks", s:"Demonetisation case — RBI Act: constitution, currency, banker to Government, bankers' bank, monetary policy, NBFCs, promotional role"},
      {n:"11", t:"The Day the Banks Became the People's", s:"R.C. Cooper — nationalisation 1955-1980, effects, liberalisation and globalisation, recovery laws, NPAs"},
      {n:"12", t:"Banking Without the Bank", s:"Cosmos Bank heist — e-banking, IT Act, PSS Act, RBI guidelines, KYC, Ombudsman, fintech, e-rupee; offshore banking, IFSC, NRI accounts, FEMA"}
    ]
  }
    ]
  }
];

// Flat list, kept for scripts that only need subjects.
const SUBJECTS = SEMESTERS.flatMap(m => m.subjects);
