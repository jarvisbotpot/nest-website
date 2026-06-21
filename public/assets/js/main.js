function runWhenReady(fn){
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',fn,{once:true});
  }else{
    fn();
  }
}

function patchSportigoSvgClassName(){
  const proto=window.SVGAnimatedString&&window.SVGAnimatedString.prototype;
  if(!proto) return;
  if(!proto.includes){
    Object.defineProperty(proto,'includes',{
      configurable:true,
      value:function(search,start){return String(this.baseVal||'').includes(search,start);}
    });
  }
  if(!proto.trim){
    Object.defineProperty(proto,'trim',{
      configurable:true,
      value:function(){return String(this.baseVal||'').trim();}
    });
  }
}
patchSportigoSvgClassName();

const sectionRoutes={
  '/spazio-privato/':'cosa',
  '/come-funziona/':'funziona',
  '/servizi/':'servizi',
  '/trainer/':'trainer',
  '/chi-siamo/':'chisiamo',
  '/gift-card/':'giftcard',
  '/prenota/':'prenotazione',
  '/faq/':'faq',
  '/contatti/':'contatti'
};

function withSportigoOriginCacheBust(value){
  if(typeof value!=='string'||!value.includes('standalone.api.sportigo.fr/api/proxy-image')) return value;
  const url=new URL(value,window.location.href);
  url.searchParams.set('_nest_origin',window.location.origin);
  return url.toString();
}

const nativeFetch=window.fetch;
if(nativeFetch){
  window.fetch=function(input,init){
    if(typeof input==='string'){
      return nativeFetch.call(this,withSportigoOriginCacheBust(input),init);
    }
    if(input instanceof Request){
      const nextUrl=withSportigoOriginCacheBust(input.url);
      if(nextUrl!==input.url) input=new Request(nextUrl,input);
    }
    return nativeFetch.call(this,input,init);
  };
}

const nativeSetAttribute=Element.prototype.setAttribute;
Element.prototype.setAttribute=function(name,value){
  if(this.tagName==='IMG'&&name&&name.toLowerCase()==='src'){
    value=withSportigoOriginCacheBust(value);
  }
  return nativeSetAttribute.call(this,name,value);
};

const imageSrcDescriptor=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
if(imageSrcDescriptor&&imageSrcDescriptor.set&&imageSrcDescriptor.get){
  Object.defineProperty(HTMLImageElement.prototype,'src',{
    configurable:true,
    enumerable:imageSrcDescriptor.enumerable,
    get:imageSrcDescriptor.get,
    set:function(value){
      imageSrcDescriptor.set.call(this,withSportigoOriginCacheBust(value));
    }
  });
}

function normalizePath(path){
  if(!path||path==='/') return '/';
  return path.endsWith('/') ? path : path + '/';
}

function scrollToSectionId(sectionId, behavior='smooth'){
  const target=document.getElementById(sectionId);
  if(!target) return false;
  target.scrollIntoView({block:'start',behavior});
  requestAnimationFrame(updateNav);
  return true;
}

function handleSectionRoute(path, behavior='smooth'){
  const sectionId=sectionRoutes[normalizePath(path)];
  if(!sectionId) return false;
  return scrollToSectionId(sectionId,behavior);
}

// CURSOR
const cursor=document.getElementById('cursor');
const follower=document.getElementById('cursorFollower');
let mx=0,my=0,fx=0,fy=0;
const darkCursorSelector=[
  '#hero',
  '#highlight-quote',
  '#parallax-gallery',
  '#prenotazione',
  '.exp-card',
  '.gc-overlay.active',
  'footer'
].join(',');
function isDarkBackground(color){
  const match=color&&color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if(!match||match[4]==='0') return false;
  const r=Number(match[1]);
  const g=Number(match[2]);
  const b=Number(match[3]);
  return (r*0.299+g*0.587+b*0.114)<96;
}
function isOnDarkSurface(element){
  if(!element) return false;
  if(element.closest(darkCursorSelector)) return true;
  let node=element;
  while(node&&node!==document.body){
    if(isDarkBackground(getComputedStyle(node).backgroundColor)) return true;
    node=node.parentElement;
  }
  return false;
}
function updateCursorContrast(){
  const hovered=document.elementFromPoint(mx,my);
  document.body.classList.toggle('cursor-on-dark',isOnDarkSurface(hovered));
}
if(cursor&&follower){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;
    my=e.clientY;
    cursor.style.transform=`translate(${mx-4}px,${my-4}px)`;
    updateCursorContrast();
  });
  (function tick(){fx+=(mx-fx)*0.1;fy+=(my-fy)*0.1;follower.style.transform=`translate(${fx-15}px,${fy-15}px)`;requestAnimationFrame(tick);})();
}

// NAV
const navbar=document.getElementById('navbar');
function updateNav(){
  if(!navbar||!document.getElementById('hero')) return;
  const scrolled=window.scrollY>50;
  navbar.classList.toggle('scrolled',scrolled);
  const heroBottom=document.getElementById('hero').getBoundingClientRect().bottom;
  document.body.classList.toggle('light-bg',scrolled||heroBottom<=60);
  updateCursorContrast();
}
window.addEventListener('scroll',updateNav,{passive:true});
updateNav();

runWhenReady(function(){
  document.addEventListener('click',function(e){
    const link=e.target.closest('a');
    if(!link||!link.href) return;

    const url=new URL(link.href,window.location.href);
    if(url.origin!==window.location.origin) return;

    const targetId=sectionRoutes[normalizePath(url.pathname)];
    if(!targetId) return;
    if(!document.getElementById(targetId)) return;

    e.preventDefault();
    closeMobileMenu();
    history.pushState({sectionId:targetId},'',url.pathname);
    trackMetaPageView();
    scrollToSectionId(targetId);
  });

  window.addEventListener('popstate',function(){
    if(!handleSectionRoute(window.location.pathname)){
      window.scrollTo({top:0,behavior:'smooth'});
      requestAnimationFrame(updateNav);
    }
    trackMetaPageView();
  });

  const initialTarget=window.__NEST_TARGET_SECTION__||sectionRoutes[normalizePath(window.location.pathname)];
  if(initialTarget) {
    requestAnimationFrame(function(){scrollToSectionId(initialTarget,'auto');});
  }
});

// HERO ANIMATION — GSAP cinematic entrance
let heroAnimated=false;
function animateHero(){
  if(heroAnimated) return;
  if(window.gsap){
    heroAnimated=true;
    const tl=gsap.timeline({defaults:{ease:'power3.out'}});
    // eyebrow fades + slides up
    tl.to('#h-ey',{opacity:1,y:0,duration:0.8},0.3)
    // each word of the title slams up with stagger
    .to('.hero-word',{
      opacity:1,y:0,
      duration:0.9,
      stagger:0.12,
      ease:'power4.out'
    },0.6)
    // subtitle
    .to('#h-su',{opacity:1,y:0,duration:0.7},1.4)
    // CTA
    .to('#h-ct',{opacity:1,y:0,duration:0.6},1.7)
    // stats numbers count up
    .to('.hero-stat-num',{opacity:1,y:0,duration:0.5,stagger:0.08},1.9)
    .to('.hero-stat-label',{opacity:1,duration:0.4,stagger:0.08},2.1);
  }
}
runWhenReady(animateHero);
window.addEventListener('load',animateHero,{once:true});

// PARALLAX HERO
const heroBg=document.getElementById('heroBg');
window.addEventListener('scroll',()=>{
  if(heroBg&&window.scrollY<window.innerHeight) heroBg.style.transform=`scale(1.15) translateY(${window.scrollY*0.4}px)`;
},{passive:true});

// REVEAL ON SCROLL
const revEls=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('visible');});},{threshold:0.08,rootMargin:'0px 0px -50px 0px'});
  revEls.forEach(el=>revObs.observe(el));
}else{
  revEls.forEach(el=>el.classList.add('visible'));
}

// EXPANDING CARDS TRAINER
const expCards=document.querySelectorAll('.exp-card');
const expGrid=document.getElementById('expandingCards');
expCards.forEach((card,i)=>{
  card.addEventListener('mouseenter',()=>activateCard(i));
  card.addEventListener('click',()=>activateCard(i));
});
function activateCard(i){
  if(!expGrid||!expCards[i]) return;
  expCards.forEach(c=>c.classList.remove('active'));
  expCards[i].classList.add('active');
  expGrid.className='expanding-cards active-'+i;
}

// FAQ ACCORDION
document.querySelectorAll('.faq-question').forEach(q=>{
  q.addEventListener('click',()=>{
    const isOpen=q.classList.contains('open');
    document.querySelectorAll('.faq-question.open').forEach(oq=>{
      oq.classList.remove('open');
      oq.parentElement.querySelector('.faq-answer').classList.remove('open');
    });
    if(!isOpen){q.classList.add('open');q.parentElement.querySelector('.faq-answer').classList.add('open');}
  });
});

// GIFT CARD OVERLAY
function openGiftCard(){
  const ov=document.getElementById('gcOverlay');
  if(ov){ov.classList.add('active');document.body.style.overflow='hidden';}
}
function closeGiftCard(){
  const ov=document.getElementById('gcOverlay');
  if(ov){ov.classList.remove('active');document.body.style.overflow='';}
}
runWhenReady(function(){
  const ov=document.getElementById('gcOverlay');
  const back=document.getElementById('gcBack');
  document.querySelectorAll('[data-open-gift-card]').forEach(function(btn){
    btn.addEventListener('click',openGiftCard);
  });
  if(back) back.addEventListener('click',closeGiftCard);
  if(ov) ov.addEventListener('click',function(e){if(e.target===this) closeGiftCard();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') closeGiftCard();});

  // HIGHLIGHT TEXT ON SCROLL
  const words=document.querySelectorAll('.highlight-word');
  if(words.length){
    function updateHighlight(){
      const sec=document.getElementById('highlight-quote');
      if(!sec) return;
      const rect=sec.getBoundingClientRect();
      const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight+rect.height*0.4)));
      const litCount=Math.floor(progress*words.length*1.6);
      words.forEach((w,i)=>{if(i<litCount) w.classList.add('lit');});
    }
    window.addEventListener('scroll',updateHighlight,{passive:true});
    updateHighlight();
  }

  // PARALLAX GALLERY
  const track=document.getElementById('pagTrack');
  if(track){
    let current=0;
    const slides=document.querySelectorAll('.pag-slide');
    const thumbs=document.querySelectorAll('.pag-thumb');
    const total=slides.length;
    const prevBtn=document.getElementById('pagPrev');
    const nextBtn=document.getElementById('pagNext');
    const viewport=document.getElementById('pagViewport');

    window.goToSlide=function(n){
      current=Math.max(0,Math.min(total-1,n));
      track.style.transform=`translateX(-${current*100}%)`;
      thumbs.forEach((t,i)=>t.classList.toggle('active',i===current));
      if(prevBtn) prevBtn.disabled=current===0;
      if(nextBtn) nextBtn.disabled=current===total-1;
    };
    window.pagNav=function(dir){goToSlide(current+dir);};

    document.querySelectorAll('[data-pag-nav]').forEach(function(btn){
      btn.addEventListener('click',function(){
        window.pagNav(Number(btn.dataset.pagNav));
      });
    });
    thumbs.forEach(function(thumb,i){
      thumb.addEventListener('click',function(){
        window.goToSlide(Number(thumb.dataset.pagSlide ?? i));
      });
    });

    // Touch / trackpad swipe
    let touchStartX=0, touchStartY=0, isDragging=false;
    let swiping=false;

    viewport.addEventListener('touchstart',function(e){
      touchStartX=e.touches[0].clientX;
      touchStartY=e.touches[0].clientY;
      isDragging=true;
    },{passive:true});
    viewport.addEventListener('touchend',function(e){
      if(!isDragging) return;
      const dx=e.changedTouches[0].clientX-touchStartX;
      const dy=e.changedTouches[0].clientY-touchStartY;
      if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>40){
        goToSlide(dx<0?current+1:current-1);
      }
      isDragging=false;
    },{passive:true});

    // Trackpad horizontal scroll — immediato, nessun timer
    viewport.addEventListener('wheel',function(e){
      if(Math.abs(e.deltaX)<Math.abs(e.deltaY)) return;
      e.preventDefault();
      if(swiping) return;
      if(Math.abs(e.deltaX)>15){
        swiping=true;
        goToSlide(e.deltaX>0?current+1:current-1);
        setTimeout(function(){swiping=false;},600);
      }
    },{passive:false});

    window.addEventListener('scroll',function(){
      if(!viewport) return;
      const rect=viewport.getBoundingClientRect();
      const shift=((rect.top+rect.height/2)-window.innerHeight/2)*0.12;
      slides.forEach(function(slide){
        const img=slide.querySelector('.pag-img');
        if(img) img.style.transform=`translateY(${shift}px)`;
      });
    },{passive:true});
  }
});

// HAMBURGER MENU
function closeMobileMenu() {
  const mobileMenu=document.getElementById('mobileMenu');
  const hamburger=document.getElementById('hamburger');
  if(mobileMenu) mobileMenu.classList.remove('open');
  if(hamburger) hamburger.classList.remove('open');
  if(hamburger) hamburger.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}
runWhenReady(function() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if(hamburger&&mobileMenu) {
    hamburger.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded',isOpen?'true':'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
  if(mobileMenu){
    mobileMenu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click',closeMobileMenu);
    });
  }
});

// COOKIE CONSENT
const consentKey='nest_cookie_consent_v1';
const defaultConsent={functional:false,marketing:false};
let lastMetaPageViewUrl='';
function getCookieConsent(){
  try{
    const saved=localStorage.getItem(consentKey);
    return saved?{...defaultConsent,...JSON.parse(saved)}:null;
  }catch(e){
    return null;
  }
}
function saveCookieConsent(consent){
  const nextConsent={...defaultConsent,...consent,updatedAt:new Date().toISOString()};
  try{
    localStorage.setItem(consentKey,JSON.stringify(nextConsent));
  }catch(e){}
  applyCookieConsent(nextConsent);
  window.dispatchEvent(new CustomEvent('nest:consent-changed',{detail:nextConsent}));
}
function loadScriptOnce(id,src,onload){
  const existing=document.getElementById(id);
  if(existing){
    if(onload) existing.addEventListener('load',onload,{once:true});
    return existing;
  }
  const script=document.createElement('script');
  script.id=id;
  script.async=true;
  script.src=src;
  if(onload) script.addEventListener('load',onload,{once:true});
  document.head.appendChild(script);
  return script;
}
function loadMetaPixel(){
  const pixelId=window.NEST_META_PIXEL_ID;
  if(!pixelId) return false;
  if(window.fbq){
    fbq('consent','grant');
    return true;
  }
  (function(f,b,e,v,n,t,s){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments);};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];
    t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
  })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('consent','grant');
  fbq('init',pixelId);
  return true;
}
function trackMetaPageView(){
  const consent=getCookieConsent();
  if(!consent?.marketing||!window.NEST_META_PIXEL_ID) return;
  if(!loadMetaPixel()) return;
  const pageUrl=window.location.pathname+window.location.search;
  if(lastMetaPageViewUrl===pageUrl) return;
  lastMetaPageViewUrl=pageUrl;
  if(window.fbq) fbq('track','PageView');
}
function trackMetaEvent(eventName,params={}){
  const consent=getCookieConsent();
  if(!consent?.marketing||!eventName||!window.NEST_META_PIXEL_ID) return;
  loadMetaPixel();
  if(window.fbq) fbq('track',eventName,params);
}
function applyCookieConsent(consent){
  const banner=document.getElementById('cookieBanner');
  const preferences=document.getElementById('cookiePreferences');
  if(banner) banner.hidden=true;
  if(preferences) preferences.hidden=false;
  if(consent.marketing){
    trackMetaPageView();
  }else if(window.fbq){
    fbq('consent','revoke');
  }
}
function openCookieBanner(showPanel=false){
  const banner=document.getElementById('cookieBanner');
  const preferences=document.getElementById('cookiePreferences');
  const panel=document.getElementById('cookiePanel');
  const saved=getCookieConsent()||defaultConsent;
  const functional=document.getElementById('cookieFunctional');
  const marketing=document.getElementById('cookieMarketing');
  if(functional) functional.checked=!!saved.functional;
  if(marketing) marketing.checked=!!saved.marketing;
  if(panel) panel.hidden=!showPanel;
  if(banner) banner.hidden=false;
  if(preferences) preferences.hidden=true;
}
function initCookieBanner(){
  const banner=document.getElementById('cookieBanner');
  if(!banner) return;
  const saved=getCookieConsent();
  const preferences=document.getElementById('cookiePreferences');
  const panel=document.getElementById('cookiePanel');
  const functional=document.getElementById('cookieFunctional');
  const marketing=document.getElementById('cookieMarketing');
  document.getElementById('cookieAccept')?.addEventListener('click',function(){
    saveCookieConsent({functional:true,marketing:true});
  });
  document.getElementById('cookieReject')?.addEventListener('click',function(){
    saveCookieConsent({functional:false,marketing:false});
  });
  document.getElementById('cookieClose')?.addEventListener('click',function(){
    saveCookieConsent({functional:false,marketing:false});
  });
  document.getElementById('cookieCustomize')?.addEventListener('click',function(){
    if(panel) panel.hidden=!panel.hidden;
  });
  document.getElementById('cookieSave')?.addEventListener('click',function(){
    saveCookieConsent({functional:!!functional?.checked,marketing:!!marketing?.checked});
  });
  preferences?.addEventListener('click',function(){openCookieBanner(true);});
  if(saved){
    applyCookieConsent(saved);
  }else{
    openCookieBanner(false);
  }
}
runWhenReady(initCookieBanner);

function initCookiePreferencesFooterGuard(){
  const preferences=document.getElementById('cookiePreferences');
  const footer=document.querySelector('footer');
  if(!preferences||!footer) return;

  function updateByRect(){
    const rect=footer.getBoundingClientRect();
    preferences.classList.toggle('footer-hidden',rect.top<window.innerHeight-12);
  }

  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(function(entries){
      preferences.classList.toggle('footer-hidden',entries.some(function(entry){return entry.isIntersecting;}));
    },{threshold:0,rootMargin:'0px 0px -12px 0px'});
    observer.observe(footer);
  }else{
    window.addEventListener('scroll',updateByRect,{passive:true});
    window.addEventListener('resize',updateByRect);
    updateByRect();
  }
}
runWhenReady(initCookiePreferencesFooterGuard);

document.addEventListener('click',function(e){
  const target=e.target.closest('[data-meta-event]');
  if(!target) return;
  trackMetaEvent(target.dataset.metaEvent,{
    content_name:target.textContent.trim().replace(/\s+/g,' '),
    content_category:target.dataset.metaSource||'site_interaction'
  });
});

// DYNAMIC SPORTIGO SLOTS PREVIEW
const sportigoPublicKey='4cfc7c8b-a49f-4b96-b89b-4fc332bfd22d';
const sportigoServiceUrl='https://standalone.api.sportigo.fr/api/sportigo/service';
let selectedSlotsDate='';
let pendingSportigoDate='';
function formatDateForSportigo(date){
  return new Intl.DateTimeFormat('en-CA',{
    timeZone:'Europe/Rome',
    year:'numeric',
    month:'2-digit',
    day:'2-digit'
  }).format(date);
}
function addDays(date,days){
  const next=new Date(date);
  next.setDate(next.getDate()+days);
  return next;
}
function parseSportigoDate(value){
  const match=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(!match) return new Date();
  return new Date(Number(match[1]),Number(match[2])-1,Number(match[3]),12);
}
function addDaysToSportigoDate(value,days){
  return formatDateForSportigo(addDays(parseSportigoDate(value),days));
}
function getSportigoDateBounds(){
  const today=new Date();
  return {
    min:formatDateForSportigo(today),
    max:formatDateForSportigo(addDays(today,90))
  };
}
function clampSportigoDate(value){
  const bounds=getSportigoDateBounds();
  if(!value) return bounds.min;
  if(value<bounds.min) return bounds.min;
  if(value>bounds.max) return bounds.max;
  return value;
}
function getItalyNowValue(){
  const parts=new Intl.DateTimeFormat('sv-SE',{
    timeZone:'Europe/Rome',
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12:false
  }).formatToParts(new Date());
  const value=Object.fromEntries(parts.map(function(part){return [part.type,part.value];}));
  return `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}:${value.second}`;
}
function normalizeSportigoSlot(slot){
  const availablePlaces=Math.max(0,Number(slot.maxMember||0)-Number(slot.reservation||0));
  return {
    id:slot.id,
    disciplineId:slot.disciplineId,
    discipline:slot.discipline,
    startDate:slot.startDate,
    endDate:slot.endDate,
    hourStart:slot.hourStart,
    hourEnd:slot.hourEnd,
    duration:Number(slot.disciplineDuration||0),
    availablePlaces,
    maxMember:Number(slot.maxMember||0),
    reservation:Number(slot.reservation||0)
  };
}
async function fetchSportigoSlots(options={}){
  const today=new Date();
  const dateStart=options.dateStart||formatDateForSportigo(today);
  const dateEnd=options.dateEnd||formatDateForSportigo(addDays(today,7));
  const response=await fetch(sportigoServiceUrl,{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({
      url:'/planningdx',
      method:'post',
      data:{
        dateStart,
        dateEnd
      },
      secretKey:sportigoPublicKey
    })
  });
  if(!response.ok) throw new Error('slots_unavailable');
  const data=await response.json();
  const nowValue=getItalyNowValue();
  const slots=Array.isArray(data)?data:[];
  return slots
    .filter(function(slot){return slot.startDate>=nowValue;})
    .map(normalizeSportigoSlot)
    .filter(function(slot){return slot.availablePlaces>0;})
    .sort(function(a,b){return a.startDate.localeCompare(b.startDate);})
    .slice(0,options.limit||slots.length);
}
function formatSlotDay(startDate){
  const date=new Date(startDate.replace(' ','T'));
  if(Number.isNaN(date.getTime())) return startDate.split(' ')[0]||'';
  return new Intl.DateTimeFormat('it-IT',{weekday:'short',day:'2-digit',month:'short'}).format(date);
}
function formatSelectedSlotDate(value){
  return new Intl.DateTimeFormat('it-IT',{weekday:'long',day:'2-digit',month:'long'}).format(parseSportigoDate(value));
}
function formatSlotsUpdated(value){
  const date=new Date(value);
  if(Number.isNaN(date.getTime())) return '';
  return `Aggiornato alle ${new Intl.DateTimeFormat('it-IT',{hour:'2-digit',minute:'2-digit'}).format(date)}`;
}
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"']/g,function(char){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char];
  });
}
function renderSlotsMessage(message,withPreferences=false){
  const body=document.getElementById('slotsPreviewBody');
  const updated=document.getElementById('slotsUpdated');
  if(!body) return;
  body.innerHTML=`<div class="slots-empty">${message}${withPreferences?'<br><button type="button" data-open-cookie-preferences>Gestisci cookie</button>':''}</div>`;
  if(updated) updated.textContent='';
}
function updateSlotsDateControls(){
  selectedSlotsDate=clampSportigoDate(selectedSlotsDate);
  const input=document.getElementById('slotsDateInput');
  const label=document.getElementById('slotsDateLabel');
  const bounds=getSportigoDateBounds();
  if(input){
    input.min=bounds.min;
    input.max=bounds.max;
    input.value=selectedSlotsDate;
  }
  if(label) label.textContent=formatSelectedSlotDate(selectedSlotsDate);
  document.querySelectorAll('[data-slots-quick-offset]').forEach(function(button){
    const quickDate=addDaysToSportigoDate(bounds.min,Number(button.dataset.slotsQuickOffset||0));
    button.dataset.slotsQuick=quickDate;
    button.classList.toggle('is-active',quickDate===selectedSlotsDate);
  });
}
function renderSlotsList(slots){
  const groups=[
    {label:'Mattina',match:function(slot){return Number(slot.hourStart.split(':')[0])<12;}},
    {label:'Pomeriggio',match:function(slot){const hour=Number(slot.hourStart.split(':')[0]);return hour>=12&&hour<18;}},
    {label:'Sera',match:function(slot){return Number(slot.hourStart.split(':')[0])>=18;}}
  ];
  return groups.map(function(group){
    const groupSlots=slots.filter(group.match);
    if(!groupSlots.length) return '';
    return `<div class="slots-time-group">
      <span class="slots-time-label">${group.label}</span>
      <div class="slots-time-grid">
        ${groupSlots.map(function(slot){
          const places=slot.availablePlaces===1?'Ultimo posto':`${slot.availablePlaces} posti`;
          return `<button type="button" class="slot-card" data-slot-date="${escapeHtml(slot.startDate.split(' ')[0])}" data-slot-time="${escapeHtml(slot.hourStart)}" data-meta-event="ViewContent" data-meta-source="slot_preview">
            <span class="slot-card-day">${escapeHtml(formatSlotDay(slot.startDate))}</span>
            <span class="slot-card-time">${escapeHtml(slot.hourStart)}</span>
            <span class="slot-card-meta"><span>${escapeHtml(slot.duration)} min</span><span class="slot-card-badge">${escapeHtml(places)}</span></span>
          </button>`;
        }).join('')}
      </div>
    </div>`;
  }).join('');
}
async function loadDynamicSlots(){
  const body=document.getElementById('slotsPreviewBody');
  const updated=document.getElementById('slotsUpdated');
  if(!body) return;
  selectedSlotsDate=clampSportigoDate(selectedSlotsDate||formatDateForSportigo(new Date()));
  updateSlotsDateControls();
  const consent=getCookieConsent();
  if(!consent?.functional){
    renderSlotsMessage('Abilita i cookie funzionali per vedere gli slot disponibili.',true);
    return;
  }
  body.innerHTML='<div class="slots-loading">Caricamento slot</div>';
  if(updated) updated.textContent='';
  try{
    const slots=await fetchSportigoSlots({dateStart:selectedSlotsDate,dateEnd:selectedSlotsDate,limit:80});
    if(!slots.length){
      renderSlotsMessage('Nessuno slot disponibile in questa data.');
      return;
    }
    body.innerHTML=renderSlotsList(slots);
    if(updated) updated.textContent=`${formatSlotsUpdated(new Date().toISOString())} · ${formatSelectedSlotDate(selectedSlotsDate)}`;
  }catch(e){
    renderSlotsMessage('Slot non disponibili ora. Riprova tra poco.');
  }
}
function initDynamicSlots(){
  if(!document.getElementById('slotsPreview')) return;
  selectedSlotsDate=clampSportigoDate(selectedSlotsDate||formatDateForSportigo(new Date()));
  updateSlotsDateControls();
  document.getElementById('slotsRefresh')?.addEventListener('click',loadDynamicSlots);
  document.getElementById('slotsDateInput')?.addEventListener('change',function(e){
    selectedSlotsDate=clampSportigoDate(e.target.value);
    loadDynamicSlots();
  });
  document.querySelectorAll('[data-slots-date-shift]').forEach(function(button){
    button.addEventListener('click',function(){
      selectedSlotsDate=clampSportigoDate(addDaysToSportigoDate(selectedSlotsDate,Number(button.dataset.slotsDateShift||0)));
      loadDynamicSlots();
    });
  });
  document.querySelectorAll('[data-slots-quick]').forEach(function(button){
    button.addEventListener('click',function(){
      selectedSlotsDate=clampSportigoDate(button.dataset.slotsQuick);
      loadDynamicSlots();
    });
  });
  document.addEventListener('click',function(e){
    const slotButton=e.target.closest('[data-slot-date]');
    if(!slotButton) return;
    selectedSlotsDate=clampSportigoDate(slotButton.dataset.slotDate);
    updateSlotsDateControls();
    focusSportigoBookingDate(selectedSlotsDate);
    document.querySelector('.sportigo-widget-frame')?.scrollIntoView({behavior:'smooth',block:'start'});
  });
  loadDynamicSlots();
}
runWhenReady(initDynamicSlots);
window.addEventListener('nest:consent-changed',loadDynamicSlots);

// SPORTIGO WIDGETS
function loadSportigoScript(){
  loadScriptOnce('sportigo-standalone','https://standalone.api.sportigo.fr/component-standalone.js',initSportigoWidgets);
}
function getSportigoBookingData(dateString){
  return {
    colored:true,
    readOnly:false,
    readonly:false,
    displayMode:'dayList',
    fromDate:clampSportigoDate(dateString||selectedSlotsDate||formatDateForSportigo(new Date())),
    hideCoach:true,
    hideDiscipline:true,
    forceBookBtn:true
  };
}
function getSportigoFrame(container){
  return container?.closest('.sportigo-widget-frame');
}
function resetSportigoFrame(container){
  const frame=getSportigoFrame(container);
  if(!frame) return;
  frame.classList.remove('has-consent-message');
  frame.classList.toggle('is-ready',container?.dataset.initialized==='true');
}
function markSportigoReady(container){
  const frame=getSportigoFrame(container);
  if(frame) frame.classList.add('is-ready');
}
function showSportigoConsentMessage(container){
  if(!container||container.dataset.consentMessage==='true') return;
  const frame=getSportigoFrame(container);
  if(frame) frame.classList.add('has-consent-message');
  container.dataset.consentMessage='true';
  container.dataset.initialized='';
  container.innerHTML='<div class="sportigo-consent-message"><div><strong>Consenso funzionale richiesto</strong>Per usare prenotazioni e gift card devi abilitare i cookie funzionali.<br><button type="button" data-open-cookie-preferences>Gestisci cookie</button></div></div>';
}
function replaceSportigoContainer(container){
  const next=container.cloneNode(false);
  container.replaceWith(next);
  return next;
}
function mountSportigoAppointment(dateString,force=false){
  let booking=document.getElementById('sportigo-container');
  if(!booking) return;
  if(booking.dataset.initialized==='true'&&!force) return;
  if(force&&booking.dataset.initialized==='true') booking=replaceSportigoContainer(booking);
  booking.dataset.initialized='true';
  booking.dataset.consentMessage='';
  booking.innerHTML='';
  initComponent('Appointment','sportigo-container',sportigoPublicKey,getSportigoBookingData(dateString));
  markSportigoReady(booking);
}
function focusSportigoBookingDate(dateString){
  pendingSportigoDate=clampSportigoDate(dateString);
  const consent=getCookieConsent();
  if(!consent?.functional){
    openCookieBanner(true);
    return;
  }
  if(typeof initComponent !== 'function'){
    loadSportigoScript();
    return;
  }
  mountSportigoAppointment(pendingSportigoDate,true);
}
function initSportigoWidgets(){
  const consent=getCookieConsent();
  const booking = document.getElementById('sportigo-container');
  const giftcard = document.getElementById('sportigo-container-giftcard');

  if(!consent?.functional){
    showSportigoConsentMessage(booking);
    showSportigoConsentMessage(giftcard);
    return;
  }
  resetSportigoFrame(booking);
  resetSportigoFrame(giftcard);
  if(typeof initComponent !== 'function'){
    loadSportigoScript();
    return;
  }
  if(typeof initComponent !== 'function') return;
  mountSportigoAppointment(pendingSportigoDate||selectedSlotsDate||formatDateForSportigo(new Date()));
  if(giftcard && !giftcard.dataset.initialized){
    giftcard.dataset.initialized = 'true';
    giftcard.dataset.consentMessage='';
    giftcard.innerHTML='';
    initComponent('GiftCard','sportigo-container-giftcard',sportigoPublicKey);
    markSportigoReady(giftcard);
  }
}
runWhenReady(initSportigoWidgets);
window.addEventListener('load', initSportigoWidgets);
window.addEventListener('nest:consent-changed', initSportigoWidgets);
document.addEventListener('click',function(e){
  if(e.target.closest('[data-open-cookie-preferences]')) openCookieBanner(true);
});
let sportigoAttempts=0;
const sportigoTimer=setInterval(function(){
  initSportigoWidgets();
  sportigoAttempts++;
  if(sportigoAttempts>20||document.querySelector('[data-initialized="true"]')) clearInterval(sportigoTimer);
},500);
