// node sem5-pipeline/build/build_crpc.js  → sem5-pipeline/material/CrPC.docx
// Needs the `docx` npm package on NODE_PATH (e.g. NODE_PATH=../.scratch/node_modules).
const path=require("path");
const {H1,P,LN,PB,build,Paragraph,TextRun,AlignmentType,TBL}=require("./lib");
const c=[];
c.push(new Paragraph({spacing:{before:1600,after:100},alignment:AlignmentType.CENTER,children:[new TextRun({text:"LAW OF CRIMES – II",font:"Arial",bold:true,size:52,color:"1F4E79"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Criminal Procedure Code · Juvenile Justice · Probation of Offenders",font:"Arial",size:28,color:"444444"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Paper XXVI · LL.B Semester V · AKNU",font:"Arial",size:26,color:"666666"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:600},children:[new TextRun({text:"Twelve stories, one syllabus. Code of Criminal Procedure 1973 with Bharatiya Nagarik Suraksha Sanhita 2023 cross-references.",font:"Arial",size:22,italics:true,color:"888888"})]}));
c.push(P("**How to read this:** every episode opens with a real case told as a story (purple bar). Then the law it settled, section by section, with the BNSS 2023 number beside the CrPC number. Red bars are cases to cite; green bars are the digital angle; blue bars tell you how the topic is asked. Read the story first — the sections will stick to it."));
c.push(LN());
c.push(TBL([
["Ep","Story","Syllabus topics"],
["01","Lalita Kumari","Criminal justice systems; Arts 14, 20-22; features of the Code; machinery; definitions; FIR 154-157"],
["02","D.K. Basu / Arnesh Kumar","Arrest 41-60, 70-80; rights of arrested; preventive powers 149-153"],
["03","Nandini Satpathy","Questioning 160-162; 164 confessions; 167 remand; 172-176 diary, report, inquest"],
["04","Pooran Mal","Search and seizure 91-103, 165-166B; proclamation and attachment 82-89"],
["05","Bhajan Lal","Jurisdiction 177-189; cognizance 190-194; bars 195-199; complaints 200-210; Sec 482"],
["06","Gurbaksh Singh Sibbia","Bail 436-450; anticipatory bail 438; Hussainara Khatoon; Satender Antil"],
["07","Shah Bano","Maintenance 125-128 and 1986 Act; security 106-124; unlawful assemblies; 133-144; 145-148"],
["08","Nanavati","Fair trial; charge 211-224; sessions, warrant, summons, summary trials; plea bargaining"],
["09","Maqbool Hussain","Sec 300; compounding 320; withdrawal 321; pardon 306-308; unsound mind 328-339; limitation 467-473; irregularities; evidence 272-283"],
["10","Bachan Singh","Judgment 353-365; death confirmation 366-371; appeals 372-394; revision 395-405; transfer 406-412; execution and remission 413-435"],
["11","Nirbhaya juvenile / Pratap Singh","Juvenile justice history; IPC 82-83; JJ Acts 1986, 2000, 2015"],
["12","Ramji Missar","Probation of Offenders Act 1958; Sec 360-361; parole; Malimath Committee; 2005/2006/2008 amendments; BNSS"],
["—","Drill bank","10 Part C problems with IRAC answers + CrPC→BNSS table"]
],[700,3000,5300]));
c.push(PB());
const p1=require("./crpc_part1.js"), p2=require("./crpc_part2.js");
const out=path.resolve(__dirname,"..","material","CrPC.docx");
build([...c,...p1,...p2],out);
