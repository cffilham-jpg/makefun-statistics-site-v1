// All displayed statistical values live here. Approximate supporting data are explicitly identified.
export const years = [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
export const series = {
  population: { values:[255.6,258.7,261.9,265,268.1,270.2,272.7,275.5,278.7,283.5], source:'BPS / World Bank', year:'2015–2024', unit:'million people' },
  gdp: { values:[861,932,1016,1042,1119,1059,1186,1319,1371,1402], source:'World Bank', year:'2015–2024', unit:'US$ billion, current prices' },
  inflation: { values:[3.35,3.02,3.61,3.13,2.72,1.68,1.87,5.51,2.61,1.6], source:'BPS', year:'2015–2024', unit:'%, December year-on-year' },
  unemployment: { values:[6.18,5.61,5.5,5.34,5.28,7.07,6.49,5.86,5.32,4.9], source:'BPS', year:'2015–2024', unit:'%, August, rounded' },
  life: { values:[70.8,70.9,71.1,71.2,71.3,73.0,73.2,73.4,73.7,73.9], source:'BPS', year:'2015–2024', unit:'years; methodology break in 2020' },
  infant: { values:[24,23,22,21,20,19,18,17,16], source:'World Bank / Kemenkes', year:'2015–2023', unit:'per 1,000 live births, rounded estimates' },
  sectors: { values:[[13.5,40,46.5],[13.5,39.3,47.2],[13.2,39.4,47.4],[12.8,39.8,47.4],[12.7,39,48.3],[13.7,38.3,48],[13.3,39.3,47.4],[12.4,41.4,46.2],[12.5,40.2,47.3],[13,41,46]], source:'BPS', year:'2015–2024', unit:'% of GDP, rounded broad sectors' },
  growth: { values:[4.9,5.0,5.1,5.2,5.0,-2.1,3.7,5.3,5.0,5.0], source:'BPS', year:'2015–2024', unit:'% real annual GDP growth' }
};
export const facts = {
  population:{value:283.5,display:'283.5',unit:'million people',source:'BPS',year:'mid-2024'},
  gdp:{value:1.402,display:'$1.40',unit:'trillion GDP',source:'World Bank',year:2024},
  perCapita:{value:4900,display:'$4,900',unit:'GDP per capita · approx.',source:'World Bank',year:2024},
  life:{value:73.9,display:'73.9',unit:'years life expectancy',source:'BPS',year:2024},
  literacy:{value:96.9,display:'96.9%',unit:'literacy · ages 15+',source:'BPS',year:2024},
  internet:{value:221,display:'221m',unit:'internet users · ~79%',source:'APJII',year:2024},
  area:{value:1904569,source:'BPS',year:2024,unit:'km²'},
  urban:{value:57,source:'BPS',year:2024,unit:'%'},
  annualGrowth:{value:0.8,source:'BPS',year:2024,unit:'% per year, approximate'},
  provinces:{value:38,source:'BPS',year:2024},
  capital:{value:'Jakarta',source:'BPS',year:2024}
};
export const literacy = {labels:['15–24','25–44','45–59','60+'],values:[99.8,99.3,96.3,85.3],source:'BPS',year:2024,unit:'%, rounded age-group estimates'};
export const enrolment = {labels:['7–12 years','13–15 years','16–18 years','19–23 years'],values:[99.2,96.2,74.6,29.0],source:'BPS / Kemendikbud',year:2024,unit:'% attending school, rounded'};
const weights = [8.1,8.3,8.4,8.2,8.2,8.1,7.9,7.5,6.9,6.4,5.6,4.8,4.0,3.1,2.2,1.3,1.0];
const weightTotal = weights.reduce((a,b)=>a+b,0);
export const pyramid = {source:'Illustrative distribution calibrated to BPS total',year:2024,unit:'million people',groups:weights.map((v,i)=>{
  const total=v/weightTotal*facts.population.value;
  const maleShare=i<12?0.509:0.47;
  return {label:i===16?'80+':String(i*5)+'–'+String(i*5+4),male:total*maleShare,female:total*(1-maleShare)};
})};
// Province figures are rounded 2024 reference estimates. GRDP is current-price million rupiah/person.
const provinceRows = [
 ['Aceh','Banda Aceh',5.6,56835,44,1.5],
 ['North Sumatra','Medan',15.6,72460,71,1.2],
 ['West Sumatra','Padang',5.8,42013,61,1.2],
 ['Riau','Pekanbaru',6.7,89936,159,1.4],
 ['Jambi','Jambi',3.8,49027,84,1.2],
 ['South Sumatra','Palembang',8.9,91592,78,1.3],
 ['Bengkulu','Bengkulu',2.1,19919,45,1.2],
 ['Lampung','Bandar Lampung',9.4,33575,52,1.0],
 ['Bangka Belitung Islands','Pangkalpinang',1.6,16424,65,1.4],
 ['Riau Islands','Tanjungpinang',2.2,8269,158,1.5],
 ['Jakarta','Jakarta',10.7,661,344,0.6],
 ['West Java','Bandung',50.3,35378,56,1.1],
 ['Central Java','Semarang',38.3,32801,46,0.9],
 ['Yogyakarta','Yogyakarta',3.8,3133,48,0.8],
 ['East Java','Surabaya',41.8,48036,76,0.7],
 ['Banten','Serang',12.4,9353,73,1.2],
 ['Bali','Denpasar',4.5,5590,62,1.0],
 ['West Nusa Tenggara','Mataram',5.7,18632,31,1.5],
 ['East Nusa Tenggara','Kupang',5.7,46447,24,1.6],
 ['West Kalimantan','Pontianak',5.7,147307,49,1.3],
 ['Central Kalimantan','Palangka Raya',2.8,153565,81,1.8],
 ['South Kalimantan','Banjarbaru',4.3,38744,68,1.2],
 ['East Kalimantan','Samarinda',4.1,127347,215,1.9],
 ['North Kalimantan','Tanjung Selor',0.8,70101,174,2.0],
 ['North Sulawesi','Manado',2.7,13892,66,1.0],
 ['Central Sulawesi','Palu',3.2,61841,118,1.5],
 ['South Sulawesi','Makassar',9.5,46717,73,1.0],
 ['Southeast Sulawesi','Kendari',2.8,38068,65,1.7],
 ['Gorontalo','Gorontalo',1.2,11257,44,1.1],
 ['West Sulawesi','Mamuju',1.5,16595,40,1.5],
 ['Maluku','Ambon',1.9,46914,31,1.4],
 ['North Maluku','Sofifi',1.4,31983,64,1.7],
 ['West Papua','Manokwari',0.6,60275,102,1.8],
 ['Southwest Papua','Sorong',0.6,39123,61,1.8],
 ['Papua','Jayapura',1.1,82881,58,1.8],
 ['South Papua','Merauke',0.6,117849,43,1.8],
 ['Central Papua','Nabire',1.5,61073,168,1.8],
 ['Highland Papua','Wamena',1.4,51126,20,1.8]
];
export const provinces = provinceRows.map(([name,capital,population,area,grdp,growth])=>({name,capital,population,area,grdp,growth,density:Math.round(population*1e6/area),source:'BPS',year:2024,note:'Rounded reference estimates; GRDP indicative'}));
export const nationalGrdp = {value:78.6,source:'BPS',year:2024,unit:'million rupiah per person, approximate'};
export const releases = [
 {tag:'PEOPLE',title:'A growing nation, an urban future',text:'Explore age structure and the provinces people call home.',route:'population',date:'2024 reference · BPS'},
 {tag:'ECONOMY',title:'Inside a $1.40 trillion economy',text:'A decade of output, prices and employment in perspective.',route:'economy',date:'2024 reference · World Bank / BPS'},
 {tag:'WELLBEING',title:'Longer lives. Wider opportunity.',text:'Track health outcomes and access to education.',route:'health-education',date:'2023–2024 reference · BPS / Kemenkes'}
];
export const sourceRows = [
 ['Population & territory','BPS · population projections and regional statistics','Mid-year 2024; annual','Resident population; land area in km². Provincial figures are rounded reference estimates, not an additive census table.'],
 ['National accounts','World Bank · GDP (current US$); BPS · national accounts','2015–2024; annual','GDP is output at current prices. Dollar changes also reflect exchange rates. 2024 is an approximate reference figure. Real growth removes price changes.'],
 ['Labour & prices','BPS · Sakernas and consumer price index','August / December; annual extract','Open unemployment is a share of the labour force. Inflation is December versus December a year earlier.'],
 ['Health','BPS · life expectancy; World Bank / Kemenkes · infant mortality','2015–2024 / 2015–2023; annual','Life expectancy is years a newborn can expect at current mortality rates. BPS life-expectancy methodology changes in 2020; do not treat the jump as one-year progress. Infant mortality is rounded.'],
 ['Education','BPS · Susenas; Kemendikbud · education statistics','2024; annual','Literacy means reading and writing a simple statement, ages 15+. Enrolment is attendance by age, not completion. Age-group literacy values are contextual estimates.'],
 ['Digital access','APJII · internet survey','2024; survey release','About 221 million users and about 79% penetration are rounded survey estimates; their survey base differs from the BPS mid-year population.'],
 ['Age structure & regions','BPS total; editorial calculations','2024 reference','The pyramid is an illustrative 5-year distribution summing exactly to 283.5 million, not an official age-sex table. Province density is population divided by area. GRDP per capita is an indicative current-price estimate in rupiah, not US-dollar GDP per capita.']
];
