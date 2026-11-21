const f="Narrative-only browser-local export. No upload, external sharing, publication, media release, account, financial, or rights action occurs.";function b(e){const o=String(e);return/[",\n]/.test(o)?`"${o.replaceAll('"','""')}"`:o}function z(e){const o=[["field","value"],["title",e.title],["route",e.route],["scope",e.scope],["boundary",f],["editorial_model",e.editorialModel??""],["selected_record",e.selectedRecord??""],["creator_notes",e.creatorNotes??""],[],["section_number","section_title","record_status","summary"]],n=e.sections.map(a=>[a.number,a.title,a.status,a.summary]);return[...o,...n].map(a=>a.map(t=>b(t??"")).join(",")).join(`\r
`)}function m(e){const o={"→":"->","←":"<-","×":"x","—":"-","–":"-","•":"-","…":"...","’":"'","‘":"'","“":'"',"”":'"'};return e.replace(/[→←×—–•…’‘“”]/g,n=>o[n]??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^\x20-\x7E]/g,"?")}function T(e){return m(e).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}function j(e,o=84){const n=m(e).trim().split(/\s+/).filter(Boolean);if(!n.length)return[""];const a=[];let t="";return n.forEach(i=>{const r=t?`${t} ${i}`:i;r.length>o&&t?(a.push(t),t=i):t=r}),t&&a.push(t),a}function v(e){const o=[{text:e.title,size:18,gap:26},{text:"NARRATIVE-ONLY ROUTE EXPORT",size:10,gap:17},{text:`Route: ${e.route}`,size:10,gap:15},{text:`Scope: ${e.scope}`,size:10,gap:15},{text:`Boundary: ${f}`,size:9,gap:14},...e.editorialModel?[{text:`Editorial model: ${e.editorialModel}`,size:9,gap:14}]:[],...e.selectedRecord?[{text:`Selected record: ${e.selectedRecord}`,size:9,gap:14}]:[],...e.creatorNotes?[{text:`Creator notes: ${e.creatorNotes}`,size:9,gap:16}]:[],{text:"Planning records",size:13,gap:20},...e.sections.flatMap(t=>[{text:`${String(t.number).padStart(2,"0")} | ${t.title}`,size:11,gap:15},{text:`Status: ${t.status}`,size:9,gap:13},{text:t.summary,size:9,gap:15}])],n=[[]];let a=720;return o.forEach(t=>{const i=j(t.text),r=Math.max(t.gap,i.length*t.gap);a<r+18&&n.at(-1)?.length&&(n.push([]),a=720),i.forEach(c=>{n.at(-1)?.push({text:c,size:t.size,gap:t.gap}),a-=t.gap})}),n}function w(e){const o=v(e),n=o.map((s,l)=>4+l*2),a=new Map;a.set(1,"<< /Type /Catalog /Pages 2 0 R >>"),a.set(2,`<< /Type /Pages /Kids [${n.map(s=>`${s} 0 R`).join(" ")}] /Count ${o.length} >>`),a.set(3,"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),o.forEach((s,l)=>{const p=n[l],u=p+1,g=["BT",...s.flatMap((d,R)=>[`/F1 ${d.size} Tf`,`1 0 0 1 52 ${760-s.slice(0,R).reduce(($,h)=>$+h.gap,0)} Tm`,`(${T(d.text)}) Tj`]),"ET"].join(`
`);a.set(p,`<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R >> >> /MediaBox [0 0 612 792] /Contents ${u} 0 R >>`),a.set(u,`<< /Length ${g.length} >>
stream
${g}
endstream`)});let t=`%PDF-1.4
`;const i=[0],r=3+o.length*2;for(let s=1;s<=r;s+=1)i[s]=t.length,t+=`${s} 0 obj
${a.get(s)}
endobj
`;const c=t.length;t+=`xref
0 ${r+1}
0000000000 65535 f 
`;for(let s=1;s<=r;s+=1)t+=`${String(i[s]).padStart(10,"0")} 00000 n 
`;return t+=`trailer
<< /Size ${r+1} /Root 1 0 R >>
startxref
${c}
%%EOF`,new Blob([t],{type:"application/pdf"})}function x(e,o){const n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=o,document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function N(e,o){x(w(e),o)}function P(e,o){const n=z(e);x(new Blob([n],{type:"text/csv;charset=utf-8"}),o)}export{P as a,N as d};
