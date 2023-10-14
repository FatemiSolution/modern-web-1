let timeout ;
// using locomotive.js to make the scrolling smooth 
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
// setting page animation using gsap 
function firstPageAnim(){
    let tl = gsap.timeline();
    // for navbar componenets 
    tl.from("#nav",{
        y:'-20',
        opacity: 0,
        durataion:2,
        ease: Expo.easeInout,
    })
    // for boundingelem components whos value are already defined in style.css 
    .to('.boundingelem',{
        y:0,
        durataion:2,
        ease: Expo.easeInout,
        stagger:.2,

    })
    // for headerFooter components 
    .from("#heroFooter",{
        y:'-20',
        opacity: 0,
        durataion:2,
        ease: Expo.easeInout
    })
}
// jab mouse move ho toh circle skew hojai maximum skew aur minimum skew define kerna hai, on moving the mouse the skew value increase and decrease when stopped
function circleSkew(){
    // defining default scale value 
    let xscale = 1;
    let yscale = 1;
    // defining  initial value after mouse has stopped moving 
    let xinitial = 0;
    let yinitial = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        var xdiff = dets.clientX - xinitial;
        var ydiff = dets.clientY - yinitial;
        xscale= gsap.utils.clamp(.7,1.3,xdiff);
        yscale= gsap.utils.clamp(.8,1.2,ydiff);
        xinitial = dets.clientX;
        yinitial = dets.clientY;

        circleMouseFollower(xscale,yscale);

       timeout = this.setTimeout(function(){
        document.querySelector('#minicircle').style.transform =`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;

        },100)
    })};
// creating circle mouse follower 
function circleMouseFollower(xscale,yscale){
    // getting mouse position 
    window.addEventListener('mousemove',function(dets){
    //   setting transformation on the circle 
        document.querySelector('#minicircle').style.transform =`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
firstPageAnim();
circleMouseFollower();
circleSkew();

// teeno element pr mouse move lagao 
// jab mouse move ho to pata kro mouse position
// mouse ki X and Y position k badle image show kro and move kro
// move krte waqt rotate kro and jese mouse tez move kre rotation bhi tez ho jai just like mouse follower

document.querySelectorAll('.elem').forEach(function(elem){

    let diffrot;
    let rotate;
    // code for disappearing images when mouse leaves
 elem.addEventListener('mouseleave', function(dets) {
    gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        durataion:0.5,
      });
    
 });
    // code for appearing images when mouse enter
 elem.addEventListener('mousemove', function(dets) {
    // getting the exact position of the mouse inside the div 
  let diff = dets.clientY - elem.getBoundingClientRect().top;
//   subtracting the current distance with the previous distance
    diffrot = dets.clientX -rotate;
    // giving the previous distance
    rotate = dets.clientX;
// code for appearing the image when mouse enter the div 
    gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        duration: 0.5,
        // code for moving the image
       top: diff,
       left:dets.clientX,
    //    code  for rotating the image 
       rotate: gsap.utils.clamp(-20,20,diffrot),
      });
    
 });
});