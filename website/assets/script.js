/* NoteAlarm showcase — small, dependency-free enhancements. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Header: solid after scrolling, hide on the way down, return on the way up. */
  var header = document.getElementById("siteHeader");
  if (header) {
    var lastY = window.scrollY;
    var ticking = false;

    var updateHeader = function () {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 8);

      if (!reduceMotion.matches) {
        if (y > 150 && y > lastY + 4) {
          header.classList.add("is-hidden");
        } else if (y < lastY - 4 || y < 150) {
          header.classList.remove("is-hidden");
        }
      }
      lastY = y;
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateHeader);
        }
      },
      { passive: true }
    );

    updateHeader();
  }

  /* Reveal blocks as they enter the viewport. */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (revealItems.length) {
    if ("IntersectionObserver" in window && !reduceMotion.matches) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );

      revealItems.forEach(function (el) {
        el.style.setProperty("--d", "0ms");
        observer.observe(el);
      });
    } else {
      revealItems.forEach(function (el) {
        el.classList.add("is-in");
      });
    }
  }

  /* Copy the trial address, with a fallback for browsers that block the clipboard API. */
  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy") || "";
      var label = button.querySelector("span");

      var showResult = function (ok, message) {
        if (!label) return;
        var previous = label.textContent;
        label.textContent = message || (ok ? "Copied" : "Select manually");
        window.setTimeout(function () {
          label.textContent = previous;
        }, 1800);
      };

      var fallback = function () {
        var targetSelector = button.getAttribute("data-copy-target");
        var target = targetSelector ? document.querySelector(targetSelector) : null;

        if (target && window.getSelection) {
          var range = document.createRange();
          range.selectNodeContents(target);
          var selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          showResult(false, "Selected — copy it");
          return;
        }

        var area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        var ok = false;
        try {
          ok = document.execCommand("copy");
        } catch (error) {
          ok = false;
        }
        document.body.removeChild(area);
        showResult(ok);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(
          function () {
            showResult(true);
          },
          fallback
        );
      } else {
        fallback();
      }
    });
  });

  /* Keep the footer year current. */
  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
