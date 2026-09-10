// node sem5-pipeline/build/build_media.js  → sem5-pipeline/material/Media.docx
const path=require("path");
const {H1,P,LN,PB,build,Paragraph,TextRun,AlignmentType,TBL}=require("./lib");
const c=[];
c.push(new Paragraph({spacing:{before:1600,after:100},alignment:AlignmentType.CENTER,children:[new TextRun({text:"MEDIA LAW",font:"Arial",bold:true,size:52,color:"1F4E79"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"including the Right to Information",font:"Arial",size:28,color:"444444"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Paper XXIX (Optional Paper III) · LL.B Semester V · AKNU",font:"Arial",size:26,color:"666666"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:600},children:[new TextRun({text:"Twelve stories, one syllabus. The press, films, broadcasting, the internet, the right to information — and the cases that drew the lines.",font:"Arial",size:22,italics:true,color:"888888"})]}));
c.push(P("**How to read this:** every episode opens with a real case told as a story (purple bar). Then the law it settled, article by article and section by section, naming the Act each section belongs to. Red bars are cases to cite; green bars are the digital angle; blue bars tell you how the topic is asked. Read the story first — the sections will stick to it."));
c.push(LN());
c.push(TBL([
["Ep","Story","Syllabus topics"],
["01","Bennett Coleman","Mass media — types; ownership patterns of press, films, radio and television; visual vs non-visual media and their impact"],
["02","Sakal Papers","Art 19(1)(a) and freedom of the press; Art 19(2); the newspaper cases; Price and Page Schedule; Newsprint Control; pre-censorship; advertisement and free speech"],
["03","Rajagopal (Auto Shankar)","Defamation, obscenity, blasphemy, sedition, hate speech, contempt of court"],
["04","Tata Press (Yellow Pages)","Working Journalists Act — wages and service conditions; advertising revenue and Government advertising; press and the MRTP Act; registration; Press Council"],
["05","K.A. Abbas","Films and free speech; why pre-censorship for films; Cinematograph Act 1952 (as amended 2023); the film cases; judicial review"],
["06","Cricket Association of Bengal","Radio and television — Government monopoly; Chanda and Verghese Committees; Prasar Bharati Act; effect of TV; commercial ads; internal scrutiny; judicial review of DD — freedom to telecast"],
["07","Tamas","Constitutional restrictions on broadcasting; Art 246 and the Seventh Schedule; taxation of the media; licensing and licence fees"],
["08","MKSS at Beawar","Development of RTI in India — the right to know, secrecy laws, the movement, State Acts, FOI Act 2002, RTI Act 2005"],
["09","Aditya Bandopadhyay","RTI Act 2005 section by section; the 2019 and 2023 amendments; implementation"],
["10","Subhash Chandra Agarwal","RTI decisions of the Supreme Court, the CIC and the State Commissions"],
["11","R.K. Anand (the BMW sting)","Stings, trial by media, privacy, paid news, self-regulation, advertising law, reporting restrictions, sources"],
["12","Shreya Singhal","IT Act, IT Rules 2021, internet shutdowns (Anuradha Bhasin), DPDP Act, fake news and platforms"],
["—","Drill bank","10 Part C problems with IRAC answers + section map"]
],[700,3000,5300]));
c.push(PB());
const p1=require("./media_part1.js"), p2=require("./media_part2.js");
build([...c,...p1,...p2],path.resolve(__dirname,"..","material","Media.docx"));
