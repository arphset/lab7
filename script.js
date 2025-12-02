document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const pager = document.getElementById("pager");

  const imageCount = 8;
  for (let i = 1; i <= imageCount; i++) {
    const slide = document.createElement("div");
    slide.className = "slide";
    const img = document.createElement("img");
    img.src = `https://picsum.photos/600/300?random=${i}`;
    img.alt = `Изображение ${i}`;
    slide.appendChild(img);
    slider.appendChild(slide);
  }

  let currentIndex = 0;

  function updatePager() {
    pager.innerHTML = "";
    for (let i = 0; i < imageCount; i++) {
      const dot = document.createElement("div");
      dot.className = "pager-dot";
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      pager.appendChild(dot);
    }
  }

  function goToSlide(index) {
    if (index < 0 || index >= imageCount) return;
    currentIndex = index;
    slider.scrollTo({
      left: index * slider.clientWidth,
      behavior: "smooth",
    });
    updatePager();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  slider.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  });

  updatePager();

  window.addEventListener("resize", () => {
    slider.scrollTo({
      left: currentIndex * slider.clientWidth,
      behavior: "auto",
    });
  });
});
