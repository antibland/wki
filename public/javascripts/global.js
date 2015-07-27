window.onload = function() {
  var toggleNav       = document.getElementById("toggle-nav"),
      menuListItems   = document.querySelectorAll(".menu-list.primary > .menu-item"),
      menuToggles     = document.querySelectorAll(".menu-item.primary > .menu-toggle"),
      menuSubLinks    = document.querySelectorAll(".menu-link.sub"),
      menuSubLists    = document.querySelectorAll(".menu-list.sub"),
      hoverListeners  = "mouseover mouseout",
      toggleListeners = "focus click";

  var productDescriptions  = document.querySelectorAll(".box-content-description");
      maxDescriptionHeight = 230;

  function closeAllSubLists() {
    var len   = menuSubLists.length;

    for (var i = 0; i < len; i++) {
      menuSubLists[i].setAttribute("aria-hidden", "true");
    }
  }

  function setMenuSubLinkTabbing(state) {
    var len      = menuSubLinks.length,
        tabState = state || 0;

    for (var i = 0; i < len; i++) {
      menuSubLinks[i].setAttribute("tabindex", tabState);
    }
  }

  function subListsAreOpen() {
    return document.querySelectorAll(".menu-list.sub[aria-hidden=false]").length;
  }

  function hasNestedList(el) {
    if (el.nextSibling !== null && el.nextSibling.nodeName === "UL") {
      return true;
    }
    return false;
  }

  toggleNav.addEventListener("click", function() {
    this.classList.toggle("nav-opened");
  });

  document.addEventListener("keydown", function(evt) {
    evt = evt || window.event;

    if (evt.keyCode === 27 && subListsAreOpen()) {
      closeAllSubLists();
      setMenuSubLinkTabbing(-1);
    }
  });

  hoverListeners.split(" ").forEach(function(evt) {
    var subList, ariaState;

    [].forEach.call(menuListItems, function(el) {
      el.addEventListener(evt, function() {

        closeAllSubLists();

        if (el.querySelector(".menu-list.sub")) {
          subList = el.querySelector(".menu-list.sub");
          ariaState = evt === "mouseover" ? "false" : "true";
          subList.setAttribute("aria-hidden", ariaState);
        }
      }, false);
    });
  });

  toggleListeners.split(" ").forEach(function(evt) {
    [].forEach.call(menuToggles, function(el) {
      el.addEventListener(evt, function(inner_evt) {
        if (evt === "click" && hasNestedList(el)) {
          inner_evt.preventDefault();
        }

        closeAllSubLists();
        setMenuSubLinkTabbing();

        if (el.parentNode.querySelector(".menu-list.sub")) {
          var subList = el.parentNode.querySelector(".menu-list.sub");
          subList.setAttribute("aria-hidden", "false");
        } else {
          setMenuSubLinkTabbing(-1);
        }
      }, false);
    })
  });

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

  window.addEventListener("resize", setContentScroll);
  setContentScroll();
};
