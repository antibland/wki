var utilities = (function() {
  "use strict";

  var ret = {
    loadStyleSheet: function(src) {
      if (document.createStyleSheet) {
        document.createStyleSheet(src);
      } else {
        var stylesheet = document.createElement('link');
        stylesheet.href = src;
        stylesheet.rel = 'stylesheet';
        stylesheet.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
      }
    },
    getParameterByName: function(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex   = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);

      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    loadMap: function(id, lat, lng, title) {
      var mapDiv = document.getElementById(id),
          latlng = new google.maps.LatLng(lat, lng),
          mapOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            disableDefaultUI: true
          },
          marker;

      var map = new google.maps.Map(mapDiv, mapOptions);

      marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: title
      });
    },

    supportsLocalStorage: function() {
      try {
        return 'localStorage' in window && window.localStorage !== null;
      } catch (e) {
        return false;
      }
    },

    whichAnimationEvent: function() {
      var t,
          el         = document.createElement("fakeelement"),
          animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
          };

      for (t in animations){
        if (el.style[t] !== undefined){
          return animations[t];
        }
      }
    },

    whichTransitionEvent: function() {
      var t,
          el          = document.createElement("fakeelement"),
          transitions = {
            "transition"      : "transitionend",
            "OTransition"     : "oTransitionEnd",
            "MozTransition"   : "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
          };

      for (t in transitions){
        if (el.style[t] !== undefined){
          return transitions[t];
        }
      }
    },

    getScrollHeight: function() {
      return ("scrollY" in window) ? window.scrollY : document.documentElement.scrollTop;
    },

    isTouchDevice: function() {
      return document.querySelector("html").classList.contains('touch');
    },

    loadTemplate: function(template, destination) {
      var t     = document.querySelector(template),
          clone = document.importNode(t.content, true);

      destination.setAttribute("aria-busy", "true");
      destination.appendChild(clone);
      destination.setAttribute("aria-busy", "false");
    },

    chainAnimations: function(data) {
      // TODO
    },

    preventDefault: function(e) {
      if (e.preventDefault()) {
        e.preventDefault();
      } else {
        return false;
      }
    }
  };

  return ret;
})();
