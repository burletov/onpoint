"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null)
{ if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { let i = 0; let F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } let it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { let step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (let i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  let paginationItem = document.querySelectorAll('.pagination__item');
  paginationItem.forEach(function (select) {
    select.addEventListener('click', function (e) {
      paginationItem.forEach(function (select) {
        select.classList.remove('pagination__item--active');
      });
      e.target.classList.add('pagination__item--active');
    });
  });
  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset;
    let arrow = document.querySelector('.arrow');

    if (!scrollTop == 0) {
      arrow.style.opacity = '0';
    } else {
      arrow.style.opacity = '1';
    }
  });
  let anchors = document.querySelectorAll('a[href*="#"]');

  let _iterator = _createForOfIteratorHelper(anchors),
      _step;

  try {
    let _loop = function _loop() {
      let anchor = _step.value;
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        let blockID = anchor.getAttribute("href").substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  function rangeValue() {
    let rng = document.querySelector('.range__slide');
    let rngVal = document.querySelector('.range__value');
    let rngSlider = document.querySelector('.slider');
    rngVal.style.width = rng.value + '%';

    if (rng.value == 100 || rng.value == 80) {
      rngSlider.style.transform = 'translateX(0%)';
    } else if (rng.value == 60 || rng.value == 45) {
      rngSlider.style.transform = 'translateX(33.3%)';
    } else if (rng.value == 25 || rng.value == 0) {
      rngSlider.style.transform = 'translateX(66.7%)';
    }
  }

  let rngInp = document.querySelector('.range__slide');
  rngInp.addEventListener('input', rangeValue, false);
})();