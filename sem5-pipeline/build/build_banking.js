// node sem5-pipeline/build/build_banking.js  → sem5-pipeline/material/Banking.docx
const path=require("path");
const {H1,P,LN,PB,build,Paragraph,TextRun,AlignmentType,TBL}=require("./lib");
const c=[];
c.push(new Paragraph({spacing:{before:1600,after:100},alignment:AlignmentType.CENTER,children:[new TextRun({text:"BANKING LAW",font:"Arial",bold:true,size:52,color:"1F4E79"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"including the Negotiable Instruments Act",font:"Arial",size:28,color:"444444"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Paper XXVIII (Optional Paper II) · LL.B Semester V · AKNU",font:"Arial",size:26,color:"666666"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:600},children:[new TextRun({text:"Twelve stories, one syllabus. Banker and customer, negotiable instruments, the Banking Regulation Act, the RBI Act, nationalisation, e-banking and offshore banking.",font:"Arial",size:22,italics:true,color:"888888"})]}));
c.push(P("**How to read this:** every episode opens with a real case told as a story (purple bar). Then the law it settled, section by section, naming the Act each section belongs to. Red bars are cases to cite; green bars are the digital angle; blue bars tell you how the topic is asked. Read the story first — the sections will stick to it."));
c.push(LN());
c.push(TBL([
["Ep","Story","Syllabus topics"],
["01","Foley v Hill","Banking defined; customer; general and special relationship; duties and rights"],
["02","Mohori Bibee","Opening accounts; kinds of accounts; joint accounts; special customers"],
["03","PNB v Surendra Prasad Sinha","Pass book; overdraft; draft; appropriation and Clayton's case; set-off; safe custody; garnishee"],
["04","Syndicate Bank v Vijay Kumar","Banker's lien; pledge; guarantee; documents of title; letters of credit; bank guarantees"],
["05","Kundan Lal Rallaram","NI Act: definition, features, negotiability vs assignability; note, bill, cheque; analogous instruments; presumptions; holder in due course"],
["06","Great Western Railway v London and County Bank","Kinds of cheques; crossing; endorsements; payment in due course; marking; refusal of payment"],
["07","Canara Bank v Canara Sales Corporation","Liabilities of parties; forgery and alteration; paying banker Sec 85, 89, 128; collecting banker Sec 131"],
["08","Dashrath Rupsingh Rathod","Dishonour of cheques Sec 138-148"],
["09","Yes Bank moratorium","Banking Regulation Act: licensing, reserves, advances, RBI and Central Government powers, moratorium and schemes"],
["10","Demonetisation case","RBI Act: constitution, currency, banker to Government, bankers' bank, monetary policy, NBFCs, promotional role"],
["11","R.C. Cooper","Nationalisation; effects; liberalisation and globalisation; recovery laws; NPAs"],
["12","Cosmos Bank heist","E-banking, IT Act, PSS Act, RBI guidelines, KYC, Ombudsman, fintech, e-rupee; offshore banking, IFSC, NRI accounts, FEMA"],
["—","Drill bank","10 Part C problems with IRAC answers + section map"]
],[700,3000,5300]));
c.push(PB());
const p1=require("./banking_part1.js"), p2=require("./banking_part2.js");
build([...c,...p1,...p2],path.resolve(__dirname,"..","material","Banking.docx"));
