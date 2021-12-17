document.addEventListener("DOMContentLoaded", function () {
  //utils
  const addClassToElement = (element, newClass) => {
    element.classList.add(newClass);
  };

  const removeClassFromElement = (element, targetClass) => {
    if (element.classList.contains(targetClass)) {
      element.classList.remove(targetClass);
    }
  };
  // mechanism for searchbar
  const searchButtonLoupe = document.querySelector(
    "[data-element='search-button-loupe']"
  );
  const searchInput = document.querySelector("[data-element='search-input']");
  const searchBox = searchButtonLoupe.closest("[data-element='search']");

  const focusAndEnableTheInput = (input) => {
    input?.removeAttribute("readonly");
    input?.focus();
  };

  const handleClickOutsideSearchbar = (e) => {
    if (
      e.target.closest("[data-element='search']") !== searchBox &&
      searchBox.classList.contains("open")
    ) {
      searchBox.classList.remove("open");
      searchInput.setAttribute("readonly", true);
      document.removeEventListener("click", handleClickOutsideSearchbar);
    }
  };

  searchButtonLoupe.addEventListener("click", function (e) {
    searchBox.classList.add("open");
    focusAndEnableTheInput(searchInput);
    document.addEventListener("click", handleClickOutsideSearchbar);
  });

  searchInput.addEventListener(
    "input",
    function ({ target: { value }, currentTarget }) {
      if (value) {
        addClassToElement(currentTarget, "not-empty");
      } else {
        removeClassFromElement(currentTarget, "not-empty");
      }
    }
  );

  // search button animation on hover and mousemove
  const searchButtonText = document.querySelector(
    "[data-element='search-button-text']"
  );

  const {
    height,
    width,
    x: buttonX,
    y: buttonY,
  } = searchButtonText.getBoundingClientRect();

  const searchButtonCenter = {
    //prettier-ignore
    x: buttonX + (width / 2),
    //prettier-ignore
    y: buttonY - (height / 2),
  };

  const searchButtonMaximumDeviation = {
    bottom: searchButtonCenter.y + height,
    left: searchButtonCenter.x - width,
    right: searchButtonCenter.x + width,
    top: searchButtonCenter.y - height,
  };

  searchButtonText.addEventListener(
    "mousemove",
    function ({ currentTarget, clientX, clientY }) {
      const posX = clientX - searchButtonCenter.x;
      const posY = clientY - searchButtonCenter.y;

      if (
        clientY > searchButtonMaximumDeviation.bottom ||
        clientY < searchButtonMaximumDeviation.top ||
        clientX > searchButtonMaximumDeviation.right ||
        clientX < searchButtonMaximumDeviation.left
      ) {
        addClassToElement(currentTarget, "default-position");
      } else {
        removeClassFromElement(currentTarget, "default-position");
        currentTarget.style.transform = `translate(${posX}px, ${posY}px)`;
      }
    }
  );

  searchButtonText.addEventListener("mouseout", function () {
    addClassToElement(searchButtonText, "default-position");
  });
});
