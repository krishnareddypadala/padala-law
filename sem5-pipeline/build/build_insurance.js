// node sem5-pipeline/build/build_insurance.js  → sem5-pipeline/material/Insurance.docx
const path=require("path");
const {H1,P,LN,PB,build,Paragraph,TextRun,AlignmentType,TBL}=require("./lib");
const c=[];
c.push(new Paragraph({spacing:{before:1600,after:100},alignment:AlignmentType.CENTER,children:[new TextRun({text:"LAW OF INSURANCE",font:"Arial",bold:true,size:52,color:"1F4E79"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Life, Fire, Marine, Burglary, Accident, Guarantee, Liability and Motor Insurance",font:"Arial",size:28,color:"444444"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Paper XXVIII (Optional Paper II) · LL.B Semester V · AKNU",font:"Arial",size:26,color:"666666"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:600},children:[new TextRun({text:"Twelve stories, one syllabus. The contract and its principles, the branches of insurance, the statutes and the regulator.",font:"Arial",size:22,italics:true,color:"888888"})]}));
c.push(P("**How to read this:** every episode opens with a real case told as a story (purple bar). Then the law it settled, section by section, naming the Act each section belongs to. Red bars are cases to cite; green bars are the digital angle; blue bars tell you how the topic is asked. Read the story first — the sections will stick to it."));
c.push(LN());
c.push(TBL([
["Ep","Story","Syllabus topics"],
["01","LIC v Raja Vasireddy","Definition and meaning; subject matter; principles; formation of the contract; history in England and India"],
["02","Carter v Boehm","Uberrima fides and Sec 45; indemnity; wager; conditional contracts; classification; construction of policies"],
["03","Macaura v Northern Assurance","Insurable interest; premium; risk; assignment"],
["04","Leyland Shipping v Norwich Union","Proximate cause; non-disclosure recap; nomination; contribution; subrogation; double and over insurance; reinsurance"],
["05","Mithoolal Nayak v LIC","Life insurance: nature, kinds, policy, conditions, risk, assignment and nomination, amounts, claims; LIC Act"],
["06","Harris v Poland","Fire insurance: meaning of fire, formation, interest, indemnity, reinstatement, causa proxima, kinds, conditions, average, rights after loss"],
["07","The Popi M","Marine insurance: adventure, interest, disclosure, policy, classification, warranties, deviation and change of voyage, perils of the sea"],
["08","The Inchmaree","Losses: actual and constructive total loss, abandonment, particular and general average, sue and labour, Inchmaree clause"],
["09","Harchand Rai","Burglary, accident and guarantee insurance; fidelity policies; insurance of debts"],
["10","After Bhopal","Liability insurance; defence of the assured; statutory subrogation; employer's liability; Public Liability Insurance Act"],
["11","Skandia v Kokilaben","Motor Vehicles Act Chapter XI-XII: compulsory insurance, insurer's defences, third-party rights, no-fault, Tribunals, compensation"],
["12","The Mundhra affair","Statutory materials: Insurance Act, LIC Act, GIBNA, Marine Insurance Act, MV Act, IRDA Act; Ombudsman; the industry"],
["—","Drill bank","10 Part C problems with IRAC answers + section map"]
],[700,3000,5300]));
c.push(PB());
const p1=require("./insurance_part1.js"), p2=require("./insurance_part2.js");
build([...c,...p1,...p2],path.resolve(__dirname,"..","material","Insurance.docx"));
