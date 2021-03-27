
(function () {
  let slider = function (sliderElement) {

    let pages = [];
    let currentSlide = 1;
    let isChanging = false;
    let keyUp = {38:1, 33:1};
    let keyDown = {40:1, 34:1};
  
    let init = function () {
      whatWheel = 'onwheel' in document.createElement('div')
        ? 'wheel'
        : document.onmousewheel !== undefined
          ? 'mousewheel'
          : 'DOMMouseScroll';
      window.addEventListener(whatWheel, function (e) {
        let direction = e.wheelDelta || e.deltaY;
        if (direction > 0) {
          changeSlide(-1);
        } else {
          changeSlide(1);
        }
      });
  

      window.addEventListener('keydown', function (e) {
        if (keyUp[e.keyCode]) {
          changeSlide(-1);
        } else if (keyDown[e.keyCode]) {
          changeSlide(1);
        }
      });
  
      detectChangeEnd() && document.querySelector(sliderElement).addEventListener(detectChangeEnd(), function () {
        if (isChanging) {
          setTimeout(function() {
            isChanging = false;
            window.location.hash = document.querySelector('[data-slider-index="' + currentSlide + '"]').id;
          }, 400);
        }
      });  
      let index = 1;
      [].forEach.call(document.querySelectorAll(sliderElement + ' > *'), function (section) {
        section.classList.add('slider__page');
        pages.push(section);
        section.setAttribute('data-slider-index', index++);
      });

      document.querySelector('a[data-slider-target-index = "' + currentSlide +'"]').classList.add('pagination__item--active');
      let touchStartPos = 0;
      let touchStopPos = 0;
      let touchMinLength = 90;
      document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
          let touch = e.touches[0] || e.changedTouches[0];
          touchStartPos = touch.pageY;
        }
      });
      document.addEventListener('touchend', function (e) {
        e.preventDefault();
        if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
          let touch = e.touches[0] || e.changedTouches[0];
          touchStopPos = touch.pageY;
        }
        if (touchStartPos + touchMinLength < touchStopPos) {
          changeSlide(-1);
        } else if (touchStartPos > touchStopPos + touchMinLength) {
          changeSlide(1);
        }
      });
    };
   
    let detectChangeEnd = function () {
      let transition;
      let e = document.createElement('foobar');
      let transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
  
      for(transition in transitions) {
        if (e.style[transition] !== undefined) {
          return transitions[transition];
        }
      }
      return true;
    };
  
  
    // handle css change
    let changeCss = function (obj, styles) {
      for (let _style in styles) {
        if (obj.style[_style] !== undefined) {
          obj.style[_style] = styles[_style];
        }
      }
    };
  
    // handle page/section change
    let changeSlide = function (direction) {
  
      // already doing it or last/first page, staph plz
      if (isChanging || (direction == 1 && currentSlide == pages.length) || (direction == -1 && currentSlide == 1)) {
        return;
      }
  
      // change page
      currentSlide += direction;
      isChanging = true;
      changeCss(document.querySelector(sliderElement), {
        transform: 'translate3d(0, ' + -(currentSlide - 1) * 100 + '%, 0)'
      });
  
      // change dots
      document.querySelector('a.pagination__item--active').classList.remove('pagination__item--active');
      document.querySelector('a[data-slider-target-index="' + currentSlide +'"]').classList.add('pagination__item--active');
    };
  
    // go to spesific slide if it exists
    let gotoSlide = function (where) {
      let target = document.querySelector(where).getAttribute('data-slider-index');
      if (target != currentSlide && document.querySelector(where)) {
        changeSlide(target - currentSlide);
      }
    };
  
    // if page is loaded with hash, go to slide
    if (location.hash) {
      setTimeout(function () {
        window.scrollTo(0, 0);
        gotoSlide(location.hash);
      }, 1);
    }
  

    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('onload', init(), false);
    }

    return {
      gotoSlide: gotoSlide
    }
  };
  let mySlider = slider('.layout');

})();
