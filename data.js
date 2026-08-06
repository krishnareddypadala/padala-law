const SUBJECTS = [
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
];
