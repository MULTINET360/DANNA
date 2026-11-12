const invoices=[
  {date:"29/01/2026",doc:"N1-022029",purchase:14080,paid:2669,balance:11411},
  {date:"05/02/2026",doc:"N1-022080",purchase:1200,paid:0,balance:1200}
];

const products=[
  ["ARCHER Suavizante a granel",400,3200],
  ["ARCHER Desinfectante a granel",400,3200],
  ["ARCHER Limpia Vidrios a granel",200,1280],
  ["ARCHER Antigrasa a granel",200,1600],
  ["ARCHER Limpia Hornos a granel",200,1600],
  ["ARCHER Vajillero a granel",200,1600],
  ["Shampoo DJ a granel",200,1600],
  ["ARCHER Detergente lavado máquina a granel",150,1200]
];

const payments=[
  ["28/02/2026","A1R202000094",750],
  ["24/03/2026","A1R203000061",280],
  ["30/04/2026","A1R204000076",345],
  ["28/05/2026","A1R205000074",415],
  ["30/06/2026","A1R206000082",263],
  ["30/07/2026","A1R207000081",207],
  ["31/08/2026","A1R208000082",409]
];

const monthly=[
  ["Ene",14080,0],["Feb",1200,750],["Mar",0,280],["Abr",0,345],
  ["May",0,415],["Jun",0,263],["Jul",0,207],["Ago",0,409]
];

const money=value=>new Intl.NumberFormat("es-BO",{minimumFractionDigits:2,maximumFractionDigits:2}).format(value);

document.querySelector("#invoiceRows").innerHTML=invoices.map(item=>`<tr><td>${item.date}</td><td><b>${item.doc}</b></td><td class="number">Bs ${money(item.purchase)}</td><td class="number">Bs ${money(item.paid)}</td><td class="number amount-strong">Bs ${money(item.balance)}</td><td><span class="status">PENDIENTE</span></td></tr>`).join("");

const productTotal=products.reduce((sum,item)=>sum+item[2],0);
document.querySelector("#productRows").innerHTML=products.map(([name,qty,amount])=>{
  const share=amount/productTotal*100;
  return `<tr><td><b>${name}</b></td><td>Litros</td><td class="number">${money(qty).replace(",00","")}</td><td class="number amount-strong">Bs ${money(amount)}</td><td><div class="share"><div class="share-track"><div class="share-fill" style="width:${share}%"></div></div><small>${share.toFixed(1).replace(".",",")}%</small></div></td></tr>`;
}).join("");

document.querySelector("#paymentTimeline").innerHTML=payments.map(([date,receipt,amount])=>`<article class="timeline-item"><span class="date">${date}</span><strong>Bs ${money(amount)}</strong><div class="receipt">${receipt}</div><p>Aplicado a N1-022029</p></article>`).join("");

const maxMonth=Math.max(...monthly.flatMap(item=>[item[1],item[2]]));
document.querySelector("#monthlyChart").innerHTML=monthly.map(([month,purchase,payment])=>`<div class="month-group"><div class="month-bar purchase" style="height:${purchase/maxMonth*185}px"><span class="bar-value">${money(purchase)}</span></div><div class="month-bar payment" style="height:${payment/maxMonth*185}px"><span class="bar-value">${money(payment)}</span></div><span class="month-label">${month}</span></div>`).join("");

document.querySelector("#printButton").addEventListener("click",()=>window.print());
document.querySelector("#downloadButton").addEventListener("click",()=>{
  const header=["Fecha","Documento","Comprado_Bs","Pagado_Bs","Saldo_Bs","Estado"];
  const lines=invoices.map(i=>[i.date,i.doc,i.purchase.toFixed(2),i.paid.toFixed(2),i.balance.toFixed(2),"Pendiente"]);
  const csv=[header,...lines].map(row=>row.join(";")).join("\n");
  const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
  const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="estado-cuenta-danna.csv";link.click();URL.revokeObjectURL(link.href);
});
