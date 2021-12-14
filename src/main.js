document.addEventListener("DOMContentLoaded", function () {
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

  // search button animation on hover and mousemove
  const searchButtonText = document.querySelector(
    "[data-element='search-button-text']"
  );

  const {
    height,
    x: buttonX,
    y: buttonY,
  } = searchButtonText.getBoundingClientRect();
  //   console.log(searchButtonText.getBoundingClientRect());
  //   console.table(x, y);

  const searchButtonMaximumDeviation = {
    bottom: buttonY + height,
    left: buttonX - height,
    right: buttonX + height,
    top: buttonY - height,
  };

  console.log(
    buttonX + height,
    searchButtonMaximumDeviation.right,
    searchButtonText.getBoundingClientRect()
  );

  //   let searchButtonPosition = [];
  searchButtonText.addEventListener(
    "mousemove",
    function ({ currentTarget, clientX, clientY }) {
      const posX = clientX - buttonX;
      const posY = clientY - buttonY;

      console.table(
        searchButtonMaximumDeviation,
        searchButtonText.getBoundingClientRect()
      );

      if (
        clientY > searchButtonMaximumDeviation.bottom ||
        clientY < searchButtonMaximumDeviation.top ||
        clientX > searchButtonMaximumDeviation.right ||
        clientX < searchButtonMaximumDeviation.left
      ) {
        console.log("out");
        //   } else {
        setTimeout(() => {
          currentTarget.style.transform = `translate(${posX}px, ${posY}px)`;
        }, 100);
      }
    }
  );
});
