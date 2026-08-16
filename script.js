const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
const progress=document.querySelector('.scroll-progress');

toggle.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));

const revealItems=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}
  });
},{threshold:.12});
revealItems.forEach(item=>observer.observe(item));

function updateProgress(){
  const height=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${height>0?(window.scrollY/height)*100:0}%`;
}
window.addEventListener('scroll',updateProgress,{passive:true});
updateProgress();


// Ambient cursor glow for desktop.
const cursorGlow=document.querySelector('.cursor-glow');
if(cursorGlow){
  window.addEventListener('pointermove',(e)=>{
    cursorGlow.style.left=e.clientX+'px';
    cursorGlow.style.top=e.clientY+'px';
  },{passive:true});
}

// Add a subtle active state to the navigation while scrolling.
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('#nav a')];
const sectionObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(section=>sectionObserver.observe(section));
