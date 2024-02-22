function loaderAnimation() {
  const tl = gsap.timeline();

  gsap.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from("#loader-count, .line", {
    onStart: function () {
      var loaderCounter = document.querySelector("#loader-count h5");

      var count = 0;
      var timer = setInterval(function () {
        if (count === 100) {
          clearInterval(timer);
        }

        loaderCounter.innerHTML = count++;
      }, 30);
    },
  });

  tl.from("#loader .line", {
    opacity: 0,
    duration: 0.4,
    //   delay: 4,
  });

  tl.to("#loader", {
    y: "-120%",
    delay: 3,
    duration: 1,
  });

  tl.from("#nav", {
    opacity: 0,
  });

  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero3 span,#hero4 h1", {
    y: 120,
    stagger: 0.2,
  });
}

loaderAnimation();

document.addEventListener("mousemove", (dets) => {
  gsap.to("#cursor", {
    top: dets.y,
    left: dets.x,
  });
});

Shery.makeMagnet("#nav-item h4");
