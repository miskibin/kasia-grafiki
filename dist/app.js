
const specs={
'ARCHES wizytówka i logo':['ARCHES — identyfikacja','Identyfikacja wizualna','Logo, wizytówka i seria publikacji na Instagram.','Procreate'],
'AS wizytówka i logo':['AS — identyfikacja','Identyfikacja wizualna','Znak, wizytówka i bon prezentowy.','Procreate'],
'grafika ze zdjęcia':['Ilustracje ze zdjęć','Ilustracja','Portretowe interpretacje fotografii.','Procreate'],
'kartka z życzeniami':['Kartka z życzeniami','Projekt do druku','Projekt kartki w kilku odsłonach.','Procreate'],
'koszulka JUWENALIA':['Juwenalia — koszulka','Projekt odzieży','Grafika przygotowana na koszulkę.','Procreate'],
'koszulka METALICA':['Metallica — koszulka','Projekt odzieży','Autorska grafika na koszulkę inspirowaną muzyką.','Procreate'],
'logo tygodnika sejmowego':['Tygodnik Sejmowy','Projekt znaku','Znak i jego zastosowanie na stronie.','Procreate'],
'okładka Italy':['Italy — okładki','Projekt okładki','Dwie propozycje okładek o tematyce włoskiej.','Procreate'],
'okładka ksiązki':['Okładka książki','Projekt wydawniczy','Projekt przedniej i tylnej okładki.','Adobe Illustrator · Adobe Photoshop'],
'okładka planner':['Planner — okładka','Projekt wydawniczy','Okładka oraz rozkładówka plannera.','Procreate'],
'okładka Rzym':['Rzym — okładki','Projekt okładki','Okładki w dwóch formatach.','Procreate'],
'papiery firmowe wizz air':['Papiery firmowe','Identyfikacja wizualna','Zestaw materiałów firmowych: koperta, notatnik, wizytówka i znak.','Adobe Illustrator · Adobe Photoshop'],
'plakat urodzinowy':['Plakat urodzinowy','Plakat','Projekt plakatu okolicznościowego.','Canva'],
'talia kart':['Talia kart','Ilustracja · projekt do druku','Autorska talia 54 kart. Poniżej wybór kart, rewers i wizualizacje.','Procreate · Canva'],
'torba klubowa - znak':['Torba klubowa — znak','Projekt znaku','Znak zaprojektowany z myślą o torbie klubowej.','Adobe Illustrator · Adobe Photoshop'],
'ulotka Centrum Kultury we Wrocławiu':['Centrum Kultury — ulotka','Projekt do druku','Dwustronna ulotka Centrum Kultury we Wrocławiu.','Adobe Illustrator · Adobe Photoshop']};
const order=['talia kart','grafika ze zdjęcia','okładka Rzym','okładka ksiązki','papiery firmowe wizz air','kartka z życzeniami','okładka planner','ulotka Centrum Kultury we Wrocławiu','ARCHES wizytówka i logo'];
const grid=document.querySelector('#grid'),overlay=document.querySelector('#overlay'),gallery=document.querySelector('#gallery');let data={},lastFocus;
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function fileSort(a,b){const n=x=>Number((x.name.match(/^(\d+)\./)||[])[1]);return n(a)-n(b)}
function cover(files,key){if(key==='ARCHES wizytówka i logo')return files.find(f=>f.name==='Arches wizytówka (AI mockup 1).png');return files.find(f=>f.kind==='mockup'&&f.method!=='AI')||files.find(f=>f.kind==='projekt')||files[0]}
function caption(f){if(/^\d+\.png$/.test(f.name))return 'Karta '+f.name.split('.')[0];return f.name.replace(/\.[^.]+$/,'').replace(/\s*[—-]?\s*\((?:AI )?mockup[^)]*\)/ig,'').replace(/\s*[—-]\s*(?:AI )?(?:mockup|mokcup)(?:.*)?$/ig,'').replace(/\s*\(Photoshop\)/ig,'').replace(/\s*[—-]?\s*\(?projekt\)?\s*[—-]?/ig,' ').replace(/\s+/g,' ').trim()}
function openProject(key){
 const spec=specs[key],files=data[key];lastFocus=document.activeElement;
 document.querySelector('#detailCategory').textContent=spec[1];document.querySelector('#detailTitle').textContent=spec[0];document.querySelector('#detailDescription').textContent=spec[2]+' Projekt: '+spec[3]+'.';gallery.innerHTML='';
 let projects=files.filter(f=>f.kind==='projekt');
 if(key==='talia kart')projects=projects.filter(f=>!/^\d+\.png$/.test(f.name)||[1,5,9,13,19,27,39,49].includes(Number(f.name.split('.')[0])));
 if(key==='ARCHES wizytówka i logo')projects=projects.filter(f=>!/^IG /.test(f.name)&&!/^Post [456]/.test(f.name));
 projects.sort((a,b)=>{if(a.name.toLowerCase().startsWith('logo'))return -1;if(b.name.toLowerCase().startsWith('logo'))return 1;return fileSort(a,b)});
 const lead=cover(files,key);let mocks=files.filter(f=>f.kind==='mockup'&&f!==lead);let other=files.filter(f=>f.kind!=='projekt'&&f.kind!=='mockup');
 const add=(f,wide=false)=>{let cap=f.kind==='mockup'?'Wizualizacja · '+f.method:f.kind==='projekt'?'Projekt · '+spec[3]:f.kind;let fig=document.createElement('figure');if(wide)fig.className='wide';fig.innerHTML=`<img loading="lazy" src="${encodeURI(f.src)}" alt="${esc(caption(f))}"><figcaption><strong>${esc(cap)}</strong> · ${esc(caption(f))}</figcaption>`;gallery.append(fig)};
 if(lead.kind==='mockup')add(lead,true);
 for(const [label,group] of [['Projekt',projects],['Wizualizacje',mocks],['Materiały źródłowe i zastosowania',other]]){if(!group.length)continue;gallery.insertAdjacentHTML('beforeend',`<div class="gallery-group">${label}</div>`);for(const f of group)add(f)}
 overlay.classList.add('open');overlay.scrollTop=0;document.querySelector('main').inert=true;document.querySelector('header').inert=true;document.body.style.overflow='hidden';document.querySelector('#back').focus();history.replaceState(null,'','#'+encodeURIComponent(key));
}
function closeProject(){overlay.classList.remove('open');document.body.style.overflow='';document.querySelector('main').inert=false;document.querySelector('header').inert=false;history.replaceState(null,'','#prace');lastFocus?.focus()}
['back','close','endBack'].forEach(id=>document.getElementById(id).onclick=closeProject);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))closeProject()});
fetch('data.json').then(r=>r.json()).then(d=>{data=d;const keys=order.filter(k=>data[k]);document.querySelector('#count').textContent=keys.length+' projektów';keys.forEach((k,i)=>{const s=specs[k],f=cover(data[k],k),b=document.createElement('button');b.className='tile';b.setAttribute('aria-label','Otwórz projekt '+s[0]);b.innerHTML=`<div class="image">${f.method==='AI'?'<span class="mockup-label">Mockup AI</span>':''}<img loading="${i<3?'eager':'lazy'}" src="${encodeURI(f.src)}" alt="${esc(s[0])}"></div><div class="tile-text"><div><h3>${esc(s[0])}</h3><small>${esc(s[1])}</small></div><span class="num">${String(i+1).padStart(2,'0')}</span></div>`;b.onclick=()=>openProject(k);grid.append(b)});let hash=decodeURIComponent(location.hash.slice(1));if(data[hash])openProject(hash)}).catch(()=>grid.innerHTML='<p>Nie udało się załadować prac. Odśwież stronę.</p>');

const fan=document.querySelector('.card-fan');
fan.onclick=()=>{if(data['talia kart'])openProject('talia kart')};
fan.addEventListener('pointermove',e=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=fan.getBoundingClientRect();fan.style.setProperty('--x',((e.clientX-r.left)/r.width-.5)*8+'deg');fan.style.setProperty('--y',-((e.clientY-r.top)/r.height-.5)*8+'deg')});
fan.addEventListener('pointerleave',()=>{fan.style.setProperty('--x','0deg');fan.style.setProperty('--y','0deg')});
overlay.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const buttons=[...overlay.querySelectorAll('button,a')];const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
