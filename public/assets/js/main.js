function runWhenReady(fn){
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',fn,{once:true});
  }else{
    fn();
  }
}

function patchSportigoSvgClassNameStringMethods(){
  const proto=window.SVGAnimatedString&&window.SVGAnimatedString.prototype;
  if(!proto||window.__nestSportigoSvgClassNamePatch) return;
  window.__nestSportigoSvgClassNamePatch=true;

  function asString(value){
    return String(value?.baseVal||'');
  }

  [
    ['toString',function(){return asString(this);}],
    ['valueOf',function(){return asString(this);}],
    ['includes',function(search,start){return asString(this).includes(search,start);}],
    ['trim',function(){return asString(this).trim();}],
    ['split',function(separator,limit){return asString(this).split(separator,limit);}],
    ['toLowerCase',function(){return asString(this).toLowerCase();}],
    ['toUpperCase',function(){return asString(this).toUpperCase();}]
  ].forEach(function(entry){
    const name=entry[0];
    const value=entry[1];
    if(typeof proto[name]==='function') return;
    try{
      Object.defineProperty(proto,name,{configurable:true,value});
    }catch(e){}
  });
  try{
    if(typeof proto[Symbol.toPrimitive]!=='function'){
      Object.defineProperty(proto,Symbol.toPrimitive,{configurable:true,value:function(){return asString(this);}});
    }
  }catch(e){}
}
patchSportigoSvgClassNameStringMethods();

const sportigoDialogThemeCss=`
[role="dialog"][data-state]{
  box-sizing:border-box;
  position:fixed!important;
  z-index:1200!important;
  width:min(calc(100vw - 32px),560px)!important;
  height:auto!important;
  height:fit-content!important;
  min-height:0!important;
  max-height:calc(100vh - 88px)!important;
  padding:30px 30px 24px!important;
  gap:16px!important;
  overflow-x:hidden!important;
  overflow-y:auto!important;
  border:1px solid rgba(27,27,27,0.16)!important;
  border-radius:0!important;
  background:#F7F5F2!important;
  color:#1B1B1B!important;
  box-shadow:0 28px 80px rgba(0,0,0,0.28)!important;
  font-family:Montserrat,ui-sans-serif,system-ui,sans-serif!important;
}
[role="dialog"] *{box-sizing:border-box;font-family:inherit;}
[role="dialog"] h2{
  margin:0 42px 2px 0!important;
  color:#1B1B1B!important;
  font-size:13px!important;
  font-weight:600!important;
  line-height:1.45!important;
  letter-spacing:2px!important;
  text-transform:uppercase!important;
}
[role="dialog"] p[id^="radix-"]{
  margin:0!important;
  color:#6B6B6B!important;
  font-size:12px!important;
  font-weight:300!important;
  line-height:1.65!important;
}
[role="dialog"]>div[class*="overflow-y-auto"]{
  height:auto!important;
  max-height:none!important;
  overflow:visible!important;
  padding-right:0!important;
}
[role="dialog"]::-webkit-scrollbar{width:5px;}
[role="dialog"]::-webkit-scrollbar-track{background:rgba(27,27,27,0.06);}
[role="dialog"]::-webkit-scrollbar-thumb{background:rgba(27,27,27,0.24);}
[role="dialog"] hr{margin:18px 0!important;border-color:rgba(27,27,27,0.12)!important;}
[role="dialog"] label{
  color:#1B1B1B!important;
  font-size:10px!important;
  font-weight:600!important;
  line-height:1.3!important;
  letter-spacing:1.6px!important;
  text-transform:uppercase!important;
}
[role="dialog"] input,
[role="dialog"] select,
[role="dialog"] button[role="combobox"],
[role="dialog"] .PhoneInput{
  height:42px!important;
  border:1px solid rgba(27,27,27,0.16)!important;
  border-radius:0!important;
  background:#FFFFFF!important;
  color:#1B1B1B!important;
  box-shadow:none!important;
  font-size:12px!important;
  font-weight:400!important;
}
[role="dialog"] input::placeholder{color:#AAA5A3!important;}
[role="dialog"] .PhoneInput{
  align-items:center!important;
  overflow:hidden!important;
  padding:0 12px!important;
}
[role="dialog"] .PhoneInputCountry{
  height:100%!important;
  display:flex!important;
  align-items:center!important;
  margin-right:10px!important;
  padding-right:10px!important;
  border-right:1px solid rgba(27,27,27,0.12)!important;
}
[role="dialog"] .PhoneInputInput,
[role="dialog"] .PhoneInput input{
  height:100%!important;
  min-width:0!important;
  border:0!important;
  background:transparent!important;
  box-shadow:none!important;
  padding:0!important;
}
[role="dialog"] input:focus,
[role="dialog"] input:focus-visible,
[role="dialog"] button[role="combobox"]:focus,
[role="dialog"] button[role="combobox"]:focus-visible,
[role="dialog"] .PhoneInput:focus-within{
  outline:none!important;
  border-color:#CC8A66!important;
  box-shadow:0 0 0 1px #CC8A66!important;
}
[role="dialog"] .PhoneInputInput:focus,
[role="dialog"] .PhoneInputInput:focus-visible,
[role="dialog"] .PhoneInput input:focus,
[role="dialog"] .PhoneInput input:focus-visible,
[role="dialog"] .PhoneInputCountrySelect,
[role="dialog"] .PhoneInputCountrySelect:focus,
[role="dialog"] .PhoneInputCountrySelect:focus-visible{
  outline:none!important;
  border:0!important;
  box-shadow:none!important;
}
[role="dialog"] .PhoneInputCountrySelect{
  height:100%!important;
  min-height:0!important;
  padding:0!important;
  background:transparent!important;
}
[role="dialog"] button[type="submit"]{
  height:44px!important;
  border:1px solid #1B1B1B!important;
  border-radius:0!important;
  background:#1B1B1B!important;
  color:#FFFFFF!important;
  box-shadow:none!important;
  font-size:10px!important;
  font-weight:600!important;
  letter-spacing:2.6px!important;
  text-transform:uppercase!important;
}
[role="dialog"] button[type="submit"]:hover{
  border-color:#CC8A66!important;
  background:#CC8A66!important;
}
[role="dialog"]>button[class*="right-4"][class*="top-4"]{
  top:24px!important;
  right:24px!important;
  width:32px!important;
  height:32px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  border:1px solid rgba(27,27,27,0.16)!important;
  border-radius:0!important;
  background:#FFFFFF!important;
  color:#1B1B1B!important;
  opacity:1!important;
}
[role="dialog"]>button[class*="right-4"][class*="top-4"]:hover{
  border-color:#CC8A66!important;
  color:#CC8A66!important;
}
[role="dialog"] svg{color:currentColor;}
[role="dialog"] div[class*="items-center"][class*="gap-2"] svg{color:#CC8A66;}
[role="dialog"] div[class*="items-center"][class*="gap-2"] span{
  color:#1B1B1B!important;
  font-size:12px!important;
  font-weight:400!important;
}
@media (max-width:640px){
  [role="dialog"][data-state]{
    width:calc(100vw - 24px)!important;
    height:auto!important;
    height:fit-content!important;
    max-height:calc(100vh - 40px)!important;
    padding:22px 18px 18px!important;
  }
  [role="dialog"] h2{font-size:12px!important;letter-spacing:1.4px!important;}
  [role="dialog"]>button[class*="right-4"][class*="top-4"]{top:16px!important;right:16px!important;}
}
`;

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

function initSportigoDialogTitleGuard(){
  if(window.__nestSportigoDialogTitleGuard) return;
  if(!document.getElementById('sportigo-container')&&!document.getElementById('sportigo-container-giftcard')) return;
  window.__nestSportigoDialogTitleGuard=true;

  const nativeGetElementById=Document.prototype.getElementById;
  const observedRoots=new WeakSet();
  const visibleDialogs=new WeakMap();
  let scheduled=false;
  let lastDialogFocusIntent=0;
  let staleLockTimer=0;

  function byLabelledbySelector(id){
    return `[role="dialog"][aria-labelledby="${String(id).replace(/["\\]/g,'\\$&')}"]`;
  }

  function findInShadowRoots(id,root=document){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT);
    let node=walker.currentNode;
    while(node){
      if(node.shadowRoot){
        const found=node.shadowRoot.getElementById?.(id);
        if(found) return found;
        const nested=findInShadowRoots(id,node.shadowRoot);
        if(nested) return nested;
      }
      node=walker.nextNode();
    }
    return null;
  }

  function findDialogByLabelledby(id,root=document){
    const selector=byLabelledbySelector(id);
    const direct=root.querySelector?.(selector);
    if(direct) return direct;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT);
    let node=walker.currentNode;
    while(node){
      if(node.shadowRoot){
        const found=findDialogByLabelledby(id,node.shadowRoot);
        if(found) return found;
      }
      node=walker.nextNode();
    }
    return null;
  }

  function createHiddenDialogTitle(id,dialog){
    if(!id||nativeGetElementById.call(document,id)||findInShadowRoots(id)) return null;
    const shadowRoot=dialog?.getRootNode?.();
    const title=document.createElement('h2');
    title.id=id;
    title.textContent=dialog?.getAttribute('aria-label')||'Prenotazione Sportigo';
    title.style.cssText='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0;';
    if(shadowRoot instanceof ShadowRoot){
      shadowRoot.appendChild(title);
    }else{
      document.body.appendChild(title);
    }
    return title;
  }

  function isVisibleDialog(dialog){
    if(!dialog||!dialog.isConnected||dialog.getAttribute('aria-hidden')==='true'||dialog.hidden) return false;
    if(!dialog.hasAttribute('data-state')) return false;
    if(dialog.getAttribute('data-state')==='closed') return false;
    const style=getComputedStyle(dialog);
    if(style.pointerEvents==='none') return false;
    if(style.display==='none'||style.visibility==='hidden') return false;
    const rect=dialog.getBoundingClientRect();
    return rect.width>0&&rect.height>0;
  }

  ['pointerdown','keydown'].forEach(function(eventName){
    document.addEventListener(eventName,function(event){
      const path=event.composedPath?.()||[];
      if(path.some(function(node){
        return node?.getAttribute?.('role')==='dialog'&&isVisibleDialog(node);
      })){
        lastDialogFocusIntent=Date.now();
      }
    },true);
  });

  function getDeepActiveElement(root=document){
    let active=root.activeElement||document.activeElement;
    while(active?.shadowRoot?.activeElement){
      active=active.shadowRoot.activeElement;
    }
    return active;
  }

  function blurSportigoDialogAutoFocus(dialog){
    requestAnimationFrame(function(){
      const active=getDeepActiveElement(dialog.getRootNode?.()||document);
      if(!active||active===document.body||!dialog.contains(active)) return;
      if(Date.now()-lastDialogFocusIntent<120) return;
      active.blur?.();
    });
  }

  function hasVisibleDialog(root=document){
    const directDialog=Array.from(root.querySelectorAll?.('[role="dialog"][data-state]')||[]).find(isVisibleDialog);
    if(directDialog) return true;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT);
    let node=walker.currentNode;
    while(node){
      if(node.shadowRoot&&hasVisibleDialog(node.shadowRoot)) return true;
      node=walker.nextNode();
    }
    return false;
  }

  function closeMobileMenuForDialog(){
    const mobileMenu=document.getElementById('mobileMenu');
    const hamburger=document.getElementById('hamburger');
    if(mobileMenu) mobileMenu.classList.remove('open');
    if(hamburger) hamburger.classList.remove('open');
    if(hamburger) hamburger.setAttribute('aria-expanded','false');
  }

  function restorePageInteractivityAfterStaleDialog(){
    if(hasVisibleDialog()) return;
    document.body.classList.remove('sportigo-dialog-open');
    if(document.body.style.pointerEvents==='none') document.body.style.pointerEvents='';
    if(document.body.style.overflow==='hidden') document.body.style.overflow='';
    if(document.body.style.paddingRight) document.body.style.paddingRight='';
    Array.from(document.body.children).forEach(function(element){
      if(element.getAttribute('aria-hidden')!=='true') return;
      const style=getComputedStyle(element);
      if(style.display==='none'||element.tagName==='SCRIPT'||element.tagName==='STYLE'||element.tagName==='LINK'||element.tagName==='META') return;
      element.removeAttribute('aria-hidden');
    });
  }

  function syncDialogOpenState(){
    const visible=hasVisibleDialog();
    document.body.classList.toggle('sportigo-dialog-open',visible);
    if(visible){
      closeMobileMenuForDialog();
      if(staleLockTimer) clearTimeout(staleLockTimer);
      staleLockTimer=0;
      return;
    }
    if(staleLockTimer) clearTimeout(staleLockTimer);
    staleLockTimer=setTimeout(function(){
      staleLockTimer=0;
      restorePageInteractivityAfterStaleDialog();
    },180);
  }

  function installDialogTheme(root){
    if(!(root instanceof ShadowRoot)||root.getElementById('nest-sportigo-dialog-theme')) return;
    const style=document.createElement('style');
    style.id='nest-sportigo-dialog-theme';
    style.textContent=sportigoDialogThemeCss;
    root.appendChild(style);
  }

  function setSportigoItalianPhoneDefault(root){
    root.querySelectorAll?.('.PhoneInputCountrySelect').forEach(function(select){
      if(select.dataset.nestDefaultCountryApplied==='true') return;
      if(!select.querySelector('option[value="IT"]')) return;
      select.dataset.nestDefaultCountryApplied='true';
      if(select.value==='IT') return;
      const setter=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value')?.set;
      if(setter){
        setter.call(select,'IT');
      }else{
        select.value='IT';
      }
      select.dispatchEvent(new Event('input',{bubbles:true}));
      select.dispatchEvent(new Event('change',{bubbles:true}));
    });
  }

  Document.prototype.getElementById=function(id){
    const found=nativeGetElementById.call(this,id);
    if(found||this!==document||!id) return found;
    const shadowTitle=findInShadowRoots(String(id));
    if(shadowTitle) return shadowTitle;
    const dialog=findDialogByLabelledby(String(id));
    return dialog ? createHiddenDialogTitle(String(id),dialog) : null;
  };

  function scanRoot(root){
    if(!root) return;
    if(!observedRoots.has(root)){
      observedRoots.add(root);
      observer.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-labelledby','role','aria-hidden','hidden','style','class','data-state']});
    }
    installDialogTheme(root);
    setSportigoItalianPhoneDefault(root);
    root.querySelectorAll?.('[role="dialog"][aria-labelledby]').forEach(function(dialog){
      const visible=isVisibleDialog(dialog);
      if(visible&&!visibleDialogs.get(dialog)){
        blurSportigoDialogAutoFocus(dialog);
      }
      visibleDialogs.set(dialog,visible);
      createHiddenDialogTitle(dialog.getAttribute('aria-labelledby'),dialog);
    });
    root.querySelectorAll?.('*').forEach(function(element){
      if(element.shadowRoot) scanRoot(element.shadowRoot);
    });
  }

  function scheduleScan(){
    if(scheduled) return;
    scheduled=true;
    requestAnimationFrame(function(){
      scheduled=false;
      scanRoot(document);
      syncDialogOpenState();
    });
  }

  function scheduleTransitionScans(){
    scheduleScan();
    [60,180,420,900,1600].forEach(function(delay){
      setTimeout(scheduleScan,delay);
    });
  }

  const observer=new MutationObserver(scheduleScan);
  scanRoot(document);
  scanRoot(document.documentElement);
  scanRoot(document.body);
  syncDialogOpenState();
  ['pointerup','click','keyup','focusin'].forEach(function(eventName){
    document.addEventListener(eventName,scheduleTransitionScans,true);
  });
  setInterval(function(){
    if(document.body.classList.contains('sportigo-dialog-open')||document.body.style.pointerEvents==='none'||document.body.style.overflow==='hidden'){
      syncDialogOpenState();
    }
  },250);
}
runWhenReady(initSportigoDialogTitleGuard);

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
async function fetchSportigoSlots(){
  const today=new Date();
  const response=await fetch(sportigoServiceUrl,{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({
      url:'/planningdx',
      method:'post',
      data:{
        dateStart:formatDateForSportigo(today),
        dateEnd:formatDateForSportigo(addDays(today,7))
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
    .slice(0,8);
}
function formatSlotDay(startDate){
  const date=new Date(startDate.replace(' ','T'));
  if(Number.isNaN(date.getTime())) return startDate.split(' ')[0]||'';
  return new Intl.DateTimeFormat('it-IT',{weekday:'short',day:'2-digit',month:'short'}).format(date);
}
function formatSlotsUpdated(value){
  const date=new Date(value);
  if(Number.isNaN(date.getTime())) return '';
  return `Aggiornato alle ${new Intl.DateTimeFormat('it-IT',{hour:'2-digit',minute:'2-digit'}).format(date)}`;
}
function renderSlotsMessage(message,withPreferences=false){
  const body=document.getElementById('slotsPreviewBody');
  const updated=document.getElementById('slotsUpdated');
  if(!body) return;
  body.innerHTML=`<div class="slots-empty">${message}${withPreferences?'<br><button type="button" data-open-cookie-preferences>Gestisci cookie</button>':''}</div>`;
  if(updated) updated.textContent='';
}
async function loadDynamicSlots(){
  const body=document.getElementById('slotsPreviewBody');
  const updated=document.getElementById('slotsUpdated');
  if(!body) return;
  const consent=getCookieConsent();
  if(!consent?.functional){
    renderSlotsMessage('Abilita i cookie funzionali per vedere gli slot disponibili.',true);
    return;
  }
  body.innerHTML='<div class="slots-loading">Caricamento slot</div>';
  if(updated) updated.textContent='';
  try{
    const slots=await fetchSportigoSlots();
    if(!slots.length){
      renderSlotsMessage('Nessuno slot disponibile nei prossimi giorni.');
      return;
    }
    body.innerHTML=slots.map(function(slot){
      const places=slot.availablePlaces===1?'Ultimo posto':`${slot.availablePlaces} posti`;
      return `<button type="button" class="slot-card" data-scroll-to-booking data-meta-event="ViewContent" data-meta-source="slot_preview">
        <span class="slot-card-day">${formatSlotDay(slot.startDate)}</span>
        <span class="slot-card-time">${slot.hourStart}</span>
        <span class="slot-card-meta"><span>${slot.duration} min</span><span class="slot-card-badge">${places}</span></span>
      </button>`;
    }).join('');
    if(updated) updated.textContent=formatSlotsUpdated(new Date().toISOString());
  }catch(e){
    renderSlotsMessage('Slot non disponibili ora. Riprova tra poco.');
  }
}
function initDynamicSlots(){
  if(!document.getElementById('slotsPreview')) return;
  document.getElementById('slotsRefresh')?.addEventListener('click',loadDynamicSlots);
  document.addEventListener('click',function(e){
    if(!e.target.closest('[data-scroll-to-booking]')) return;
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
  if(booking && !booking.dataset.initialized){
    booking.dataset.initialized = 'true';
    booking.dataset.consentMessage='';
    booking.innerHTML='';
    initComponent('Appointment','sportigo-container',sportigoPublicKey,{colored:true,readOnly:false});
    markSportigoReady(booking);
  }
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
