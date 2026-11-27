import {renderOverview,renderPopulation,renderEconomy,renderHealthEducation,renderRegions,renderSources,regionCards,provinceDetail,provinceTable} from './views.js';
const content=document.querySelector('#content');
const navigation=document.querySelector('#navigation');
const menu=document.querySelector('.menu-toggle');
let query='',sort='population',selected='',tableSort='population',tableAscending=false,year=2024;
const pages={'/':renderOverview,'/population':renderPopulation,'/economy':()=>renderEconomy(year),'/health-education':renderHealthEducation,'/regions':()=>renderRegions(selected),'/sources':renderSources};
function wireRegions() {
  const search=document.querySelector('#province-search'),sortControl=document.querySelector('#province-sort');
  if(!search)return;
  search.value=query;sortControl.value=sort;
  const refresh=()=>{const list=regionCards(query,sort,selected);document.querySelector('#province-grid').innerHTML=list.html;document.querySelector('#result-count').textContent=list.count+' of 38 provinces';};
  search.addEventListener('input',()=>{query=search.value;refresh();});
  sortControl.addEventListener('change',()=>{sort=sortControl.value;refresh();});
  refresh();
}
function route() {
  const raw=location.hash.slice(1)||'/',parts=raw.split('/');
  const path=parts[1]==='regions'?'/regions':raw;
  try{selected=parts[1]==='regions'?decodeURIComponent(parts.slice(2).join('/')):'';}catch{selected='';}
  const render=pages[path]||renderOverview;
  content.innerHTML=render();
  document.title=(path==='/'?'Overview':path.slice(1).replaceAll('-',' & '))+' · Nusantara in Numbers';
  navigation.querySelectorAll('a').forEach(a=>{const active=a.getAttribute('href')==='#'+path;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');
  wireRegions();
  document.querySelector('#economy-year')?.addEventListener('change',e=>{year=Number(e.target.value);route();document.querySelector('#economy-year').focus();});
  if(path==='/population'){tableSort='population';tableAscending=false;}
  window.scrollTo(0,0);
}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}});
content.addEventListener('click',e=>{
  const sortButton=e.target.closest('[data-table-sort]');
  if(sortButton){const key=sortButton.dataset.tableSort;tableAscending=key===tableSort?!tableAscending:key==='name';tableSort=key;document.querySelector('#province-table').innerHTML=provinceTable(tableSort,tableAscending);document.querySelector('[data-table-sort="'+key+'"]').focus();}
  if(e.target.closest('#clear-search')){query='';document.querySelector('#province-search').value='';document.querySelector('#province-search').dispatchEvent(new Event('input'));document.querySelector('#province-search').focus();}
});
window.addEventListener('hashchange',route);
route();
