const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
});

function firstPageAnimation(){
    let tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem",{
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            stager:0.2
        })
        .from("#herofooter",{
            y: -10,
            opacity: 0,
            duration: 1.5,
            
            delay: -1,
            ease: Expo.easeInOut
        })
}

function circleSkew(){
    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;
    window.addEventListener("mousemove", function(dets){
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollow(xscale, yscale);
    });
}

circleSkew();
function circleMouseFollow(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}

circleMouseFollow();
firstPageAnimation();

document.querySelectorAll(".elem").forEach(function (elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(dets){
        
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.7
        });
    });

    elem.addEventListener("mousemove", function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power1,
            top: diff,
            left: dets.clientX,
            rotate : gsap.utils.clamp(-20,20,diffrot*.8),
        });
    });
});