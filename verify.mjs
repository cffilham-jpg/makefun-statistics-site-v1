// Browser checks only; not loaded by the site or the dossier packager.
import assert from 'node:assert/strict';
import {mkdirSync,readFileSync,statSync} from 'node:fs';
const modulePath=process.env.PLAYWRIGHT_MODULE||'/opt/hatch/skills/spaces/ts-runtime/dist/node_modules/playwright/index.mjs';
const {chromium}=await import(modulePath);
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome',args:['--no-sandbox']});
const origin='http://127.0.0.1:8080';
const errors=[],remote=[],requests=[];
const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('request',r=>{requests.push(r.url());if(new URL(r.url()).origin!==origin)remote.push(r.url());});
await page.goto(origin,{waitUntil:'networkidle'});
const initialRequests=requests.length;
const routes=['/','/population','/economy','/health-education','/regions','/sources'];
async function clickRoute(route){
  await page.locator('nav a[href="#'+route+'"]').click();
  await page.locator('nav a[href="#'+route+'"][aria-current="page"]').waitFor({state:'attached'});
}
for(const route of routes){
  await clickRoute(route);
  await page.waitForFunction(hash=>location.hash.slice(1)===hash||hash==='/'&&!location.hash,route);
  assert.equal(await page.locator('main h1').count(),1);
  assert.equal(await page.locator('nav a[aria-current="page"]').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Desktop overflow on '+route);
}
await clickRoute('/population');
assert.equal(await page.locator('tbody tr').count(),10);
await page.locator('[data-table-sort="name"]').click();
assert.match(await page.locator('tbody tr').first().innerText(),/Banten/);
await page.locator('[data-table-sort="population"]').click();
assert.match(await page.locator('tbody tr').first().innerText(),/West Java/);
await page.locator('[data-table-sort="population"]').click();
assert.match(await page.locator('tbody tr').first().innerText(),/Riau/);
await clickRoute('/economy');
for(let y=2015;y<=2024;y++){
  await page.selectOption('#economy-year',String(y));
  assert.match(await page.locator('.mini-stats').innerText(),new RegExp(String(y)));
  assert.equal(await page.locator('main svg').count(),4);
  const svgMarkup=await page.locator('main').innerHTML();
  assert.equal(svgMarkup.includes('NaN'),false,'Invalid geometry in '+y);
  const chartLabels=await page.locator('main svg text').allTextContents();
  if(y<2024)assert.equal(chartLabels.includes(String(y+1)),false,'Future year visible in '+y);
}
await clickRoute('/regions');
assert.equal(await page.locator('.province-card').count(),38);
await page.fill('#province-search','bandung');
assert.equal(await page.locator('.province-card').count(),1);
assert.match(await page.locator('.province-card').innerText(),/West Java/);
await page.fill('#province-search','not a province');
assert.equal(await page.locator('.province-card').count(),0);
await page.locator('#clear-search').click();
assert.equal(await page.locator('.province-card').count(),38);
for(const key of ['name','population','area','density']){
  await page.selectOption('#province-sort',key);
  const expected={name:'Aceh',population:'West Java',area:'Central Kalimantan',density:'Jakarta'};
  assert.match(await page.locator('.province-card').first().innerText(),new RegExp(expected[key]));
}
await page.selectOption('#province-sort','population');
await page.locator('.province-card').first().click();
await page.locator('.detail-pop').waitFor();
assert.equal(await page.locator('.detail h2').innerText(),'West Java');
assert.match(await page.locator('.detail').innerText(),/Bandung/);
assert.match(await page.locator('.detail').innerText(),/0.71×/);
await page.locator('.detail-top a').click();
await page.locator('.detail-pop').waitFor({state:'detached'});
assert.equal(await page.locator('.detail-pop').count(),0);
// A route transition performs no new request: all content is local module data.
assert.equal(requests.length,initialRequests,'Unexpected runtime network request');
assert.deepEqual(remote,[]);assert.deepEqual(errors,[]);
console.log('Desktop: six navigation links, table sort, all ten economy years, 38 provinces, search, all sort orders and profile passed. Runtime requests: 0; external requests: 0; errors: 0.');
if(process.argv.includes('--capture')){
  mkdirSync('screenshots',{recursive:true});
  const shots=JSON.parse(readFileSync('shots.json','utf8'));
  for(const shot of shots){
    await page.setViewportSize(shot.viewport);
    await page.goto(origin+'/'+shot.path,{waitUntil:'networkidle'});
    await page.screenshot({path:'screenshots/'+shot.file,type:'jpeg',quality:88,fullPage:false});
    console.log(shot.file+' '+statSync('screenshots/'+shot.file).size+' bytes');
  }
}
await page.setViewportSize({width:390,height:844});
for(const route of routes){
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  await clickRoute(route);
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Phone overflow on '+route);
}
await page.locator('.menu-toggle').click();await clickRoute('/regions');
await page.locator('.province-card').first().click();
await page.locator('.detail-pop').waitFor();
assert.equal(await page.locator('.detail h2').innerText(),'West Java');
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);
console.log('Phone: collapsing menu, all six routes, province profile and overflow checks passed.');
await browser.close();
