document.addEventListener("DOMContentLoaded", function () {
    const totalFrames = 32;
    const images = [];
    const container = document.getElementById("frameContainer");
    const contents = document.getElementsByClassName("showcontent");
    const containerMoon = document.getElementById("containerbox-moon");
    var screenHeight = window.screen.height;
    let lastScroll = 0;
    let segment = false;
  
    // Preload a subset of images based on need
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `frames/frame${String(i).padStart(3, "0")}.jpeg`;
      img.className = "frameImage";
      img.onload = () => container.appendChild(img);
      images.push(img);
    }
  
    function displayFrame(scrollFraction) {
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(scrollFraction * totalFrames)
      );
      images.forEach((img, index) => {
        img.style.display = index === frameIndex ? "block" : "none";
      });
      for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
        if (frameIndex > 0) {
          if (frameIndex < 11) {
            contents[0].style.display = "flex";
          } else if (frameIndex < 23) {
            contents[1].style.display = "flex";
          } else {
            contents[2].style.display = "flex";
          }
        }
      }
    }
  
    function scrollUpdate() {
      let containerValues = containerMoon.getBoundingClientRect();
      if (screenHeight / 1.5 > containerValues.top) {
        if (!segment) {
          segment = true;
          window.scrollTo({
            behavior: "smooth",
            top:
              window.scrollY +
              containerValues.top +
              containerValues.height / 2 / 3.5,
            left: 0,
          });
          console.log(
            "scroll",
            window.scrollY +
              containerValues.top +
              containerValues.height / 2 / 3.5
          );
        }
      } else {
        if (segment) {
          segment = false;
          // window.scrollTo({
          //   behavior: "smooth",
          //   top: Math.abs(window.scrollY - containerValues.top),
          //   left: 0,
          // });
          console.log("else part:", window.scrollY - containerValues.top);
          console.log(window.scrollY);
        }
      }
      if (segment) {
        const scrollTop =
          containerValues.top < 0 ? Math.abs(containerValues.top) : 0;
        const scrollFraction =
          scrollTop / (containerValues.height / 1.2 - window.innerHeight);
        requestAnimationFrame(() => displayFrame(scrollFraction));
      }
    }
    window.addEventListener("scroll", scrollUpdate);
    requestAnimationFrame(() => displayFrame(0)); // Initial call to display the first frame
  });