document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const pager = document.getElementById("pager");

  const imagePaths = [
    "img/my.png",
    "img/my.png",
    "img/my.png",
    "img/my.png",
    "img/my.png",
    "img/my.png",
  ];
  // 👆

  let currentIndex = 0;

  function isDesktop() {
    return window.innerWidth >= 769;
  }

  function rebuildSlider() {
    slider.innerHTML = "";
    pager.innerHTML = "";

    if (isDesktop()) {
      const groups = [];
      for (let i = 0; i < imagePaths.length; i += 3) {
        groups.push(imagePaths.slice(i, i + 3));
      }

      groups.forEach((group, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";

        const groupDiv = document.createElement("div");
        groupDiv.className = "slide-group";

        group.forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = `Картинка ${index * 3 + 1}`;
          groupDiv.appendChild(img);
        });

        slide.appendChild(groupDiv);
        slider.appendChild(slide);
      });

      updatePager(groups.length);
    } else {
      imagePaths.forEach((src) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Картинка";
        slide.appendChild(img);
        slider.appendChild(slide);
      });

      updatePager(imagePaths.length);
    }

    // Обновляем позицию после перестройки
    setTimeout(() => {
      goToSlide(currentIndex, false);
    }, 50);
  }

  function updatePager(totalSlides) {
    pager.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "pager-dot";
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      pager.appendChild(dot);
    }
  }

  function getSlideWidth() {
    const firstSlide = slider.firstElementChild;
    return firstSlide ? firstSlide.offsetWidth : slider.offsetWidth;
  }

  function goToSlide(index, withAnimation = true) {
    const totalSlides = slider.children.length;
    if (totalSlides === 0) return;

    //  Зацикливание
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;

    const slideWidth = getSlideWidth();
    slider.scrollTo({
      left: currentIndex * slideWidth,
      behavior: withAnimation ? "smooth" : "auto",
    });

    updatePager(totalSlides);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Колёсико (опционально)
  slider.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY > 0) nextSlide();
    else prevSlide();
  });

  // Инициализация
  rebuildSlider();

  // Ресайз
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      rebuildSlider();
    }, 200);
  });
});
