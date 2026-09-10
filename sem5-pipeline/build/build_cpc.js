// node sem5-pipeline/build/build_cpc.js  → sem5-pipeline/material/CPC.docx
const path=require("path");
const {H1,P,LN,PB,build,Paragraph,TextRun,AlignmentType,TBL}=require("./lib");
const c=[];
c.push(new Paragraph({spacing:{before:1600,after:100},alignment:AlignmentType.CENTER,children:[new TextRun({text:"CIVIL PROCEDURE CODE AND LIMITATION ACT",font:"Arial",bold:true,size:48,color:"1F4E79"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Paper XXV · LL.B Semester V · AKNU",font:"Arial",size:26,color:"666666"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:600},children:[new TextRun({text:"Twelve stories, one syllabus. Code of Civil Procedure 1908 and Limitation Act 1963, with the 1976, 1999, 2002 and 2015 amendments.",font:"Arial",size:22,italics:true,color:"888888"})]}));
c.push(P("**How to read this:** every episode opens with a real case told as a story (purple bar). Then the law it settled, section by section and Order by Order. Red bars are cases to cite; green bars are the digital angle; blue bars tell you how the topic is asked. Read the story first — the sections will stick to it."));
c.push(LN());
c.push(TBL([
["Ep","Story","Syllabus topics"],
["01","Sangram Singh","Nature and history of civil procedure; features; definitions; jurisdiction Sec 9 (Dhulabhai)"],
["02","Patel Roadways","Parties Order I; frame Order II; place of suing Sec 15-21; summons Order V; discovery Order XI"],
["03","Daryao","Res sub judice Sec 10; res judicata Sec 11; foreign judgments Sec 13-14, 44A"],
["04","Arivandandam","Pleadings Order VI; plaint Order VII; written statement, set-off, counter-claim Order VIII; issues Order XIV"],
["05","Salem Advocate Bar Association","Appearance Order IX; Order X, XII, XIII; witnesses Order XVI; hearing Order XVIII; affidavits; adjournments Order XVII"],
["06","Dalpat Kumar","Judgment and decree Order XX; injunctions Order XXXIX; receivers Order XL; Order XXXVIII; costs; Sec 151; restitution Sec 144"],
["07","Jolly George Varghese","Execution Sec 36-74 and Order XXI: courts, modes, arrest, attachment, sale, objections"],
["08","Geeta Iron and Brass Works","Suits against Government Sec 79-82; foreign States Sec 83-87B; Sec 91-93; interpleader; Sec 75-78, 94-95"],
["09","Bandhua Mukti Morcha","Commissions Order XXVI and PIL; minors Order XXXII; indigent Order XXXIII; Order XXII; Order XXIII"],
["10","Santosh Hazari","Appeals Sec 96-112, Order XLI, XLIII, XLV; reference, review, revision Sec 113-115; Art 227"],
["11","Katiji","Limitation Act 1963: Sec 3-27 — bar, sufficient cause, disability, computation, acknowledgment, adverse possession"],
["12","Afcons Infrastructure","Amendments 1976/1999/2002/2015; Sec 89 ADR; summary suits Order XXXVII; Mediation Act 2023; e-courts"],
["—","Drill bank","10 Part C problems with IRAC answers + map of the Orders"]
],[700,3000,5300]));
c.push(PB());
const p1=require("./cpc_part1.js"), p2=require("./cpc_part2.js");
build([...c,...p1,...p2],path.resolve(__dirname,"..","material","CPC.docx"));
