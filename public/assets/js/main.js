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

    e.preventDefault();
    closeMobileMenu();
    history.pushState({sectionId:targetId},'',url.pathname);
    scrollToSectionId(targetId);
  });

  window.addEventListener('popstate',function(){
    if(!handleSectionRoute(window.location.pathname)){
      window.scrollTo({top:0,behavior:'smooth'});
      requestAnimationFrame(updateNav);
    }
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

// SPORTIGO WIDGETS
function initSportigoWidgets(){
  if(typeof initComponent !== 'function') return;
  const booking = document.getElementById('sportigo-container');
  if(booking && !booking.dataset.initialized){
    booking.dataset.initialized = 'true';
    initComponent('Appointment','sportigo-container','4cfc7c8b-a49f-4b96-b89b-4fc332bfd22d',{colored:true,readOnly:false});
  }
  const giftcard = document.getElementById('sportigo-container-giftcard');
  if(giftcard && !giftcard.dataset.initialized){
    giftcard.dataset.initialized = 'true';
    initComponent('GiftCard','sportigo-container-giftcard','4cfc7c8b-a49f-4b96-b89b-4fc332bfd22d');
  }
}
runWhenReady(initSportigoWidgets);
window.addEventListener('load', initSportigoWidgets);
let sportigoAttempts=0;
const sportigoTimer=setInterval(function(){
  initSportigoWidgets();
  sportigoAttempts++;
  if(sportigoAttempts>20||document.querySelector('[data-initialized="true"]')) clearInterval(sportigoTimer);
},500);
