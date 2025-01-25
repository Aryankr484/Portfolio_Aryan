function locomotiveAnimation(){
      const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy metho#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    }
var tl=gsap.timeline();
tl.from('#intro',{
    y:100,
    duration:1,
    delay:0.5,
    opacity:0

});
tl.from('#page2-part2',{
    x:100,
    duration:1,
    delay:1,
    opacity:0,
    scrollTrigger:{
        trigger:"page2-part2",
        scroller:"#main",
        start:"top 40%",
    }
});
tl.from('#page2-part3',{
  x:-100,
  duration:1,
  delay:1,
  opacity:0,
  
});
locomotiveAnimation()