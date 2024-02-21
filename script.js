const tl = gsap.timeline();

gsap.from(".line h1", {
  y: 150,
  stagger: 0.25,
  duration: 0.6,
  delay: 0.5,
});

tl.from("#loader-count, .line #line-h2", {
  opacity: 0,
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
