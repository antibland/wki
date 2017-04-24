var utilities = (function() {
  "use strict";

  var ret = {
    keys: {
      tab   : 9,
      enter : 13,
      escape: 27,
      up    : 38,
      down  : 40
    },
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
    loadMap: function(id, lat, lng, title, zoom) {
      var mapDiv = document.getElementById(id),
          latlng = new google.maps.LatLng(lat, lng),
          mapOptions = {
            zoom: zoom || 17,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            mapTypeControl: false
          },
          marker;

      var map = new google.maps.Map(mapDiv, mapOptions);

      marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: title
      });

      return map;
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
      return 'ontouchstart' in document.documentElement;
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
    },

    setSessionStorage: function(key, val) {
      sessionStorage.setItem(key, val);
    },

    getSessionStorage: function(key) {
      return sessionStorage.getItem(key);
    }
  };

  return ret;
})();
