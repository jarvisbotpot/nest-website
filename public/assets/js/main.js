function runWhenReady(fn){
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',fn,{once:true});
  }else{
    fn();
  }
}

const sectionRoutes={
  '/spazio-privato/':'cosa',
  '/come-funziona/':'funziona',
  '/servizi/':'servizi',
  '/equipment/':'equipment',
  '/trainer/':'trainer',
  '/gift-card/':'giftcard',
  '/prenota/':'prenotazione',
  '/faq/':'faq',
  '/contatti/':'contatti'
};

function normalizePath(path){
  if(!path||path==='/') return '/';
  return path.endsWith('/') ? path : path + '/';
}

function getSectionIdForPath(path){
  const normalized=normalizePath(path);
  if(sectionRoutes[normalized]) return sectionRoutes[normalized];
  const route=Object.keys(sectionRoutes).find(function(routePath){
    return normalized.endsWith(routePath);
  });
  return route ? sectionRoutes[route] : null;
}

function scrollToSectionId(sectionId, behavior='smooth'){
  const target=document.getElementById(sectionId);
  if(!target) return false;
  target.scrollIntoView({block:'start',behavior});
  requestAnimationFrame(updateNav);
  return true;
}

function handleSectionRoute(path, behavior='smooth'){
  const sectionId=getSectionIdForPath(path);
  if(!sectionId) return false;
  return scrollToSectionId(sectionId,behavior);
}

function detectAppStoreDevice(){
  const ua=navigator.userAgent||navigator.vendor||'';
  if(/android/i.test(ua)) return 'android';
  if(/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1) return 'ios';
  return 'desktop';
}

function initAppStoreTargeting(){
  const device=detectAppStoreDevice();
  document.documentElement.dataset.appDevice=device;
  document.querySelectorAll('.app-store-actions').forEach(function(actions){
    actions.dataset.device=device;
    actions.querySelectorAll('[data-store-target]').forEach(function(link){
      const target=link.dataset.storeTarget;
      link.hidden=(device==='ios'||device==='android')&&target!==device;
    });
  });
}
runWhenReady(initAppStoreTargeting);

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

    const targetId=getSectionIdForPath(url.pathname);
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

  const initialTarget=window.__NEST_TARGET_SECTION__||getSectionIdForPath(window.location.pathname);
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

runWhenReady(function(){
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
const defaultConsent={marketing:false};
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
  const marketing=document.getElementById('cookieMarketing');
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
  const marketing=document.getElementById('cookieMarketing');
  document.getElementById('cookieAccept')?.addEventListener('click',function(){
    saveCookieConsent({marketing:true});
  });
  document.getElementById('cookieReject')?.addEventListener('click',function(){
    saveCookieConsent({marketing:false});
  });
  document.getElementById('cookieClose')?.addEventListener('click',function(){
    saveCookieConsent({marketing:false});
  });
  document.getElementById('cookieCustomize')?.addEventListener('click',function(){
    if(panel) panel.hidden=!panel.hidden;
  });
  document.getElementById('cookieSave')?.addEventListener('click',function(){
    saveCookieConsent({marketing:!!marketing?.checked});
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

const nestContactShield={
  salt:'b/JtBAPRfrYOU6U680kSfA==',
  iv:'2Pe00mZ3mfW5J7j3',
  data:'CSiF8f7zXg5qGhqnFoFU88gEkhQ4v9XvzmjIELinMgRSttLU1bnhkn9bJNRiC23yNR7IRpn1e8mJqLosQlc925B54ZXD9l8='
};
let nestContactCache=null;
let nestContactArmedAt=0;

function bytesFromBase64(value){
  return Uint8Array.from(atob(value),function(char){return char.charCodeAt(0);});
}
function contactKeyMaterial(){
  return ['NEST','Pavia','Private Space','Exclusive Training','Viale Lodi','Moruzzi','contatti','2026','shield-v2'].join('|');
}
async function decryptNestContacts(){
  if(nestContactCache) return nestContactCache;
  if(!window.crypto?.subtle) throw new Error('contact_crypto_unavailable');

  const encoder=new TextEncoder();
  const material=await crypto.subtle.importKey('raw',encoder.encode(contactKeyMaterial()),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey(
    {name:'PBKDF2',salt:bytesFromBase64(nestContactShield.salt),iterations:180000,hash:'SHA-256'},
    material,
    {name:'AES-GCM',length:256},
    false,
    ['decrypt']
  );
  const decrypted=await crypto.subtle.decrypt(
    {name:'AES-GCM',iv:bytesFromBase64(nestContactShield.iv)},
    key,
    bytesFromBase64(nestContactShield.data)
  );
  nestContactCache=JSON.parse(new TextDecoder().decode(decrypted));
  return nestContactCache;
}
function armNestContact(e){
  if(e.isTrusted===false) return;
  if(!e.target.closest('[data-nest-contact]')) return;
  nestContactArmedAt=Date.now();
}
function isNestContactGesture(e){
  if(e.isTrusted===false) return false;
  if(navigator.webdriver===true) return false;
  if(!document.hasFocus()) return false;
  return Date.now()-nestContactArmedAt<2500;
}
function buildContactUrl(type,contacts){
  if(type==='email') return ['ma','il','to',':'].join('')+contacts.mailbox;
  if(type==='whatsapp') return ['https://','wa','.me','/'].join('')+contacts.whats;
  return '';
}
function formatWhatsNumber(value){
  const digits=String(value||'').replace(/\D/g,'');
  if(digits.startsWith('39')&&digits.length===12){
    return '+39 '+digits.slice(2,5)+' '+digits.slice(5,8)+' '+digits.slice(8);
  }
  return digits?('+'+digits):'';
}
function getContactDisplayValue(type,contacts){
  if(type==='email') return contacts.mailbox;
  if(type==='whatsapp') return formatWhatsNumber(contacts.whats);
  return '';
}
function revealContactValue(button,type,contacts){
  const wrapper=button.closest('.protected-contact');
  const display=wrapper?.querySelector('[data-nest-contact-display="'+type+'"]');
  const value=getContactDisplayValue(type,contacts);
  if(display&&value){
    display.textContent=value;
    wrapper.classList.add('is-revealed');
  }
  button.dataset.nestContactReveal='false';
  button.textContent=type==='email'?'Scrivi email':'Apri WhatsApp';
  button.setAttribute('aria-label',type==='email'?'Scrivi a '+value:'Apri WhatsApp al numero '+value);
}
function setContactBusy(button,busy){
  button.disabled=busy;
  button.classList.toggle('is-resolving',busy);
}
function initProtectedContacts(){
  const buttons=document.querySelectorAll('[data-nest-contact]');
  if(!buttons.length) return;
  buttons.forEach(function(button){
    const type=button.dataset.nestContact;
    const reveal=button.dataset.nestContactReveal==='true';
    button.setAttribute('aria-label',type==='email'
      ?(reveal?'Mostra email NEST':'Scrivi a NEST via email')
      :(reveal?'Mostra numero WhatsApp NEST':'Apri WhatsApp per contattare NEST'));
  });
  document.addEventListener('pointerdown',armNestContact,true);
  document.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' ') armNestContact(e);
  },true);
  document.addEventListener('click',async function(e){
    const button=e.target.closest('[data-nest-contact]');
    if(!button||!isNestContactGesture(e)) return;

    const type=button.dataset.nestContact;
    const revealOnly=button.dataset.nestContactReveal==='true';
    const pendingWindow=!revealOnly&&type==='whatsapp'?window.open('','_blank'):null;
    setContactBusy(button,true);
    try{
      const contacts=await decryptNestContacts();
      if(revealOnly){
        revealContactValue(button,type,contacts);
        return;
      }
      const url=buildContactUrl(type,contacts);
      if(!url) return;
      if(type==='whatsapp'){
        if(pendingWindow){
          pendingWindow.opener=null;
          pendingWindow.location.href=url;
        }else{
          window.location.href=url;
        }
      }else{
        window.location.href=url;
      }
    }catch(error){
      if(pendingWindow) pendingWindow.close();
    }finally{
      setContactBusy(button,false);
    }
  });
}
runWhenReady(initProtectedContacts);
