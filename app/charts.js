const teal='#137d7c', amber='#e9ac44', muted='#708481';
const label=(x,y,text,extra='')=>'<text x="'+x+'" y="'+y+'" '+extra+'>'+text+'</text>';
const wrap=(body,w,h,title)=>'<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title>'+body+'</svg>';
export function lineChart(values,labels,{unit='',height=220,color=teal}={}) {
  const w=700,h=height,left=48,right=42,top=32,bottom=h-34;
  let min=Math.floor(Math.min(...values)*0.97),max=Math.ceil(Math.max(...values)*1.02);
  if(max===min)max++;
  const x=i=>values.length===1?(left+w-right)/2:left+i*(w-left-right)/(values.length-1),y=v=>bottom-(v-min)/(max-min)*(bottom-top);
  let body='';
  for(let i=0;i<4;i++){const v=min+(max-min)*i/3,yy=y(v);body+='<path class="grid" d="M'+left+' '+yy+'H'+(w-right)+'"/>'+label(left-10,yy+4,Number(v.toFixed(1)),'text-anchor="end"');}
  const points=values.map((v,i)=>x(i)+','+y(v)).join(' ');
  body+='<polygon points="'+left+','+bottom+' '+points+' '+x(values.length-1)+','+bottom+'" fill="'+color+'" opacity=".07"/><polyline points="'+points+'" fill="none" stroke="'+color+'" stroke-width="3" stroke-linejoin="round"/>';
  values.forEach((v,i)=>{body+='<circle cx="'+x(i)+'" cy="'+y(v)+'" r="4" fill="'+color+'" stroke="white" stroke-width="2"><title>'+labels[i]+': '+v+' '+unit+'</title></circle>'+label(x(i),h-12,labels[i],'text-anchor="middle"');if(i===0||i===values.length-1)body+=label(x(i),y(v)-12,v,'text-anchor="middle" class="value-label"');});
  return wrap(body,w,h,unit+' trend: '+values.map((v,i)=>labels[i]+' '+v).join(', '));
}
export function barChart(values,labels,{unit='',height=220,color=teal}={}) {
  const w=700,h=height,base=h-35,max=Math.max(...values)*1.18,step=630/values.length;
  let body='';
  [0,0.5,1].forEach(f=>{const y=base-f*(h-65);body+='<path class="grid" d="M45 '+y+'H685"/>'+label(38,y+4,Math.round(max*f),'text-anchor="end"');});
  values.forEach((v,i)=>{const bh=v/max*(h-65),x=50+i*step;body+='<rect x="'+x+'" y="'+(base-bh)+'" width="'+(step-13)+'" height="'+bh+'" rx="4" fill="'+color+'"/><title>'+labels[i]+': '+v+'</title>'+label(x+(step-13)/2,base-bh-8,v.toLocaleString('en-US'),'text-anchor="middle" class="value-label"')+label(x+(step-13)/2,h-13,labels[i],'text-anchor="middle"');});
  return wrap(body,w,h,unit+' by year: '+values.join(', '));
}
export function stackedBar(values,labels) {
  const colors=[amber,teal,'#9dbeb6'];let x=0,body='';
  values.forEach((v,i)=>{body+='<rect x="'+x+'" y="8" width="'+v*7+'" height="52" fill="'+colors[i]+'"/>'+label(x+v*3.5,40,v+'%','text-anchor="middle" class="stack-value"');x+=v*7;});
  return wrap(body,700,70,labels.map((l,i)=>l+' '+values[i]+'%').join(', '));
}
export function donutChart(value) {
  const circumference=2*Math.PI*66;
  const body='<circle cx="110" cy="100" r="66" fill="none" stroke="'+amber+'" stroke-width="23"/><circle cx="110" cy="100" r="66" fill="none" stroke="'+teal+'" stroke-width="23" stroke-dasharray="'+circumference*value/100+' '+circumference+'" transform="rotate(-90 110 100)"/>'+label(110,101,value+'%','text-anchor="middle" class="donut-number"')+label(110,124,'urban','text-anchor="middle"')+label(226,78,'● Urban  '+value+'%','fill="'+teal+'"')+label(226,112,'● Rural  '+(100-value)+'%','fill="#986715"')+label(226,150,'Share of population');
  return wrap(body,410,200,'Urban '+value+'%, rural '+(100-value)+'%');
}
export function pyramidChart(groups) {
  const rows=[...groups].reverse(),w=600,h=365,center=300,max=14;
  let body=label(155,18,'MALE','text-anchor="middle" fill="'+teal+'"')+label(445,18,'FEMALE','text-anchor="middle" fill="#976716"');
  rows.forEach((g,i)=>{const y=29+i*17,bm=g.male/max*215,bf=g.female/max*215;body+='<rect x="'+(center-27-bm)+'" y="'+y+'" width="'+bm+'" height="12" rx="2" fill="'+teal+'"/><rect x="'+(center+27)+'" y="'+y+'" width="'+bf+'" height="12" rx="2" fill="'+amber+'"/>'+label(center,y+10,g.label,'text-anchor="middle" class="age-label"')+label(center-33-bm,y+10,g.male.toFixed(1),'text-anchor="end" class="age-value"')+label(center+33+bf,y+10,g.female.toFixed(1),'class="age-value"');});
  body+=label(155,343,'Population in millions','text-anchor="middle"')+label(445,343,'Population in millions','text-anchor="middle"');
  return wrap(body,w,h,'Illustrative population pyramid, 2024, age groups '+rows.map(g=>g.label).join(', '));
}
export function horizontalBars(values,labels) {
  let body='';values.forEach((v,i)=>{const y=16+i*45;body+=label(5,y+19,labels[i])+ '<rect x="128" y="'+y+'" width="390" height="27" rx="3" fill="#edf1eb"/><rect x="128" y="'+y+'" width="'+v*3.9+'" height="27" rx="3" fill="'+(i%2?amber:teal)+'"/>'+label(532,y+19,v.toFixed(1)+'%','class="value-label"');});
  return wrap(body,600,values.length*45+14,'Rates: '+labels.map((l,i)=>l+' '+values[i]+'%').join(', '));
}
