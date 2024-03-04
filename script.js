function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

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
      }, 27);
    },
  });

  tl.from("#loader .line", {
    opacity: 0,
    duration: 0.2,
    // delay: 2.6,
  });

  tl.to("#loader", {
    y: "-120%",
    duration: 2,
    delay: 2.5,
  });

  tl.from("#nav", {
    opacity: 0,
  });

  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero3 span,#hero4 h1", {
    y: 120,
    stagger: 0.2,
  });
}

function cursorAnimation() {
  Shery.makeMagnet("#nav-item h4");
  const cursor = document.querySelector("#cursor");

  window.addEventListener("mousemove", (dets) => {
    const posX = dets.clientX;
    const posY = dets.clientY;

    cursor.style.left = `${posX}px`;
    cursor.style.top = `${posY}px`;

    gsap.to("#cursor", {
      top: `${posY}px`,
      left: `${posX}px`,
    });
  });

  let videoContainer = document.querySelector("#video-container");
  let video = document.querySelector("#video-container video");

  let videoCursor = document.querySelector("#video-cursor");

  videoContainer.addEventListener("mouseenter", () => {
    videoContainer.addEventListener("mousemove", (dets) => {
      const Y = dets.clientY - 305;
      const X = dets.clientX - 550;

      gsap.to("#cursor", {
        opacity: 0,
      });

      gsap.to("#video-cursor", {
        top: `${Y}px`,
        left: `${X}px`,
      });
    });

    videoContainer.addEventListener("mouseleave", () => {
      gsap.to("#cursor", {
        opacity: 1,
      });

      gsap.to;
      "#video-container #video-cursor",
        {
          top: "-15%",
          right: "15%",
        };
    });

    let flag = 0;

    videoContainer.addEventListener("click", () => {
      if (flag === 0) {
        video.play();
        video.style.opacity = 1;

        videoCursor.innerHTML = `<i class="ri-pause-fill"></i>`;

        gsap.to("#video-cursor", {
          scale: 0.5,
        });

        flag = 1;
      } else {
        video.pause();
        video.style.opacity = 0;

        videoCursor.innerHTML = `<i class="ri-play-fill"></i>`;

        gsap.to("#video-cursor", {
          scale: 1,
        });

        flag = 0;
      }
    });
  });
}

function sheryAnimation() {
  Shery.imageEffect(".image-box", {
    style: 5,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: "9996999", range: [-9999999, 9999999] },
      aspect: { value: 0.7272786988409361 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.69, range: [0, 10] },
      metaball: { value: 0.37, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}

sheryAnimation();
locomotiveAnimation();
cursorAnimation();
loaderAnimation();

document.addEventListener("mousemove", (dets) => {
  gsap.to("#flag", {
    top: dets.y - 250,
    left: dets.x - 430,
  });
});

document.querySelector("#hero3").addEventListener("mouseenter", () => {
  gsap.to("#flag", {
    opacity: 1,
  });
});

document.querySelector("#hero3").addEventListener("mouseleave", () => {
  gsap.to("#flag", {
    opacity: 0,
  });
});

let text = document.querySelector("#textillate");

text.addEventListener("mouseenter", function () {
  $("#textillate").textillate({ in: { effect: "fadeIn" } });
});

text.addEventListener("mouseleave", function () {
  $("#textillate").textillate({ out: { effect: "fadeOut" } });

  text.style.fontFamily = "silkserif-lightitalic";
});
