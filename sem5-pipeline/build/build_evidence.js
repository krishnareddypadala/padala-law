const {H1,P,LN,PB,build,Paragraph,TextRun,AlignmentType,TBL}=require("./lib");
const c=[];
c.push(new Paragraph({spacing:{before:1600,after:100},alignment:AlignmentType.CENTER,children:[new TextRun({text:"LAW OF EVIDENCE",font:"Arial",bold:true,size:52,color:"1F4E79"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Paper XXVII · LL.B Semester V · AKNU",font:"Arial",size:26,color:"666666"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:600},children:[new TextRun({text:"Twelve stories, one syllabus. Indian Evidence Act 1872 with Bharatiya Sakshya Adhiniyam 2023 cross-references.",font:"Arial",size:22,italics:true,color:"888888"})]}));
c.push(P("**How to read this:** every episode opens with a real case told as a story (purple bar). Then the law it settled, section by section, with the BSA 2023 number beside the IEA number. Red bars are cases to cite; green bars are the digital-evidence angle; blue bars tell you how the topic is asked. Read the story first — the sections will stick to it."));
c.push(LN());
c.push(TBL([
["Ep","Story","Syllabus topics"],
["01","Sharad Birdhichand Sarda","Facts, relevancy, presumptions (3,4); direct vs circumstantial; five golden rules"],
["02","Gentela / Mirza Akbar","Res gestae 6–8; TIP 9; conspiracy 10; 11–16"],
["03","Pakala Narayana Swami","Admissions 17–23; confessions 24–26; co-accused 30; retracted"],
["04","Pulukuri Kottaya","Sec 27 discovery; digital discoveries"],
["05","Laxman / Khushal Rao","Dying declaration 32(1); 32(2)–(8); 33"],
["06","Murari Lal","Expert 45–51, 45A; character 52–55; judgments 40–44"],
["07","Subramaniam","Oral 59–60; hearsay; documentary 61–66; 91–92"],
["08","Anvar → Shafhi → Arjun Panditrao","Electronic records 65A/65B; presumptions 81A–90A; public docs 74–78; BSA 61–63"],
["09","Rameshwar / S.P. Gupta","Competency 118–121; privileges 122–129; accomplice 133"],
["10","Zahira Sheikh (Best Bakery)","Examination 135–166; leading; hostile; impeaching; refreshing memory"],
["11","Woolmington / Kans Raj","Burden 101–106; presumptions 114, 113A, 113B, 114A; judicial notice 56–58"],
["12","Motilal Padampat","Estoppel 115–117; promissory estoppel; IT Act amendments; BSA 2023"],
["—","Drill bank","10 Part C problems with IRAC answers + IEA→BSA table"]
],[700,3000,5300]));
c.push(PB());
const p1=require("./evidence_part1.js"), p2=require("./evidence_part2.js");
build([...c,...p1,...p2],"/home/claude/repo/sem5-pipeline/material/Evidence.docx");
