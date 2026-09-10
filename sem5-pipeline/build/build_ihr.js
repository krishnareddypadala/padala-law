// node sem5-pipeline/build/build_ihr.js  → sem5-pipeline/material/IHR.docx
const path=require("path");
const {H1,P,LN,PB,build,Paragraph,TextRun,AlignmentType,TBL}=require("./lib");
const c=[];
c.push(new Paragraph({spacing:{before:1600,after:100},alignment:AlignmentType.CENTER,children:[new TextRun({text:"INTERNATIONAL HUMAN RIGHTS",font:"Arial",bold:true,size:52,color:"1F4E79"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"with International Humanitarian Law and the Indian mechanism",font:"Arial",size:28,color:"444444"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:"Paper XXIX (Optional Paper III) · LL.B Semester V · AKNU",font:"Arial",size:26,color:"666666"})]}));
c.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:600},children:[new TextRun({text:"Twelve stories, one syllabus. From Nuremberg to the NHRC — the ideas, the instruments, the institutions and the cases.",font:"Arial",size:22,italics:true,color:"888888"})]}));
c.push(P("**How to read this:** every episode opens with a real case or event told as a story (purple bar). Then the law it settled, article by article, naming the instrument each article belongs to. Red bars are cases to cite; green bars are the digital angle; blue bars tell you how the topic is asked. Read the story first — the articles will stick to it."));
c.push(LN());
c.push(TBL([
["Ep","Story","Syllabus topics"],
["01","Nuremberg","Meaning of human rights; jurisprudential dimensions; evolution of the concept"],
["02","Rwanda 1994","Three generations; sovereignty vs human rights; human rights and the UN Charter and organs; promotion and protection"],
["03","Hansa Mehta and the UDHR","Universal Declaration — drafting, contents, legal status; Tehran 1968; Vienna 1993"],
["04","Toonen v Australia","ICCPR and ICESCR — rights, machinery, Optional Protocols; India and the Covenants"],
["05","Soering v UK","European Convention and Court; European Social Charter; EU Charter and Court of Justice"],
["06","Velásquez Rodríguez","American Convention; African Charter; Arab and ASEAN; comparison"],
["07","The Forgotten Prisoners (Amnesty)","Commission/Council, OHCHR, treaty bodies, ILO, UNICEF, UNHCR, NGOs, ICRC"],
["08","Bhanwari Devi (Vishaka)","CEDAW and women's rights; the 1959 Declaration and the CRC; India's law on women and children"],
["09","Niyamgiri","Indigenous peoples (ILO 107/169, UNDRIP); refugees (1951 Convention, India's practice); other vulnerable groups"],
["10","Solferino","IHL — principles, Geneva Conventions, POWs, civilians, common Art 3, women and IHL; Geneva Conventions Act 1960"],
["11","Kulbhushan Jadhav","ICJ, ad hoc tribunals, ICC, European courts as enforcement; universal jurisdiction"],
["12","Chandrima Das (Howrah)","Constitutional mechanism; PIL; Protection of Human Rights Act 1993 — NHRC, SHRCs, Human Rights Courts"],
["—","Drill bank","10 Part C problems with IRAC answers + article map"]
],[700,3000,5300]));
c.push(PB());
const p1=require("./ihr_part1.js"), p2=require("./ihr_part2.js"), p3=require("./ihr_part3.js");
build([...c,...p1,...p2,...p3],path.resolve(__dirname,"..","material","IHR.docx"));
