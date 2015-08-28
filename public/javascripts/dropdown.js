var dropdown = (function() {
  "use strict";

  var toggleNav       = document.getElementById("toggle-nav"),
      menuListPrimary = document.querySelector(".menu-list.primary"),
      menuListItems   = document.querySelectorAll(".menu-list.primary > .menu-item"),
      menuToggles     = document.querySelectorAll(".menu-item.primary > .menu-toggle"),
      menuSubLinks    = document.querySelectorAll(".menu-link.sub"),
      menuSubLists    = document.querySelectorAll(".menu-list.sub"),
      hoverListeners  = "mouseover mouseout",
      toggleListeners = "focus click";

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

  function hasNestedList(el) {
    if (el.nextSibling !== null && el.nextSibling.nodeName === "UL") {
      return true;
    }
    return false;
  }

  function escapeLists() {
    closeAllSubLists();
    setMenuSubLinkTabbing(-1);
    toggleNav.classList.remove("nav-opened");
    menuListPrimary.setAttribute("aria-hidden", true);
  }

  toggleNav.addEventListener(
    utilities.isTouchDevice() ? "touchstart" : "click",
    function() {
      var current_state = menuListPrimary.getAttribute("aria-hidden") || "true",
          future_state  = current_state === "false" ? true : false;

      this.classList.toggle("nav-opened");
      menuListPrimary.setAttribute("aria-hidden", future_state);
    }
  ), false;

  document.addEventListener(
    utilities.isTouchDevice() ? "touchstart" : "click",
    function(evt) {
      evt = evt || window.event;

      if (evt.target &&
          !~evt.target.className.indexOf("menu-link") &&
          evt.target.id !== "main-nav" &&
          evt.target.id !== "toggle-nav-top-line" &&
          evt.target.id !== "toggle-nav-middle-line" &&
          evt.target.id !== "toggle-nav-bottom-line" &&
          evt.target.id !== "toggle-nav" &&
          evt.target.id !== "toggle-nav-label") {
        escapeLists();
      }
    }
  ), false;

  document.addEventListener("keydown", function(evt) {
    evt = evt || window.event;

    if (evt.keyCode === utilities.keys.escape) {
      escapeLists();
    }
  }, false);

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
})();
