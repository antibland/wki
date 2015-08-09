window.onload = function() {
  var productDescriptions  = document.querySelectorAll(".box-content-description");
      maxDescriptionHeight = 230;

  function setContentScroll() {
    [].forEach.call(productDescriptions, function(el) {
      var content       = el.querySelector("span"),
          contentHeight = content.offsetHeight;

      if (contentHeight > maxDescriptionHeight) {
        el.classList.add('with-scroll');
      } else {
        el.classList.remove("with-scroll");
      }
    });
  }

  window.addEventListener("resize", setContentScroll, false);
  setContentScroll();
};
