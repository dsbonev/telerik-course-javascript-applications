/* globals define */

define(['jquery', 'lib/oop', 'text!slider.html', 'text!slider.css'],
  function($, OOP, html, css) {
  'use strict';

  return OOP.Class.create(
    function Slider(slides) {
      this.slides = slides;
    },
    Object,
    {
      toDom: function () {
        if (this.el) {
          return this.el;
        }

        var el = $(html),
          contentEl = $('.content', el),
          styleEl = $('<style>' + css + '</style>');

        el.append(styleEl);

        this.slides.forEach(function (slide) {
          contentEl.append(slide.toDom());
        });

        this.el = el;

        var currentIndex = 0;

        this.showSlide(currentIndex);

        var showNext = function () {
          this.hideSlide(currentIndex);

          currentIndex += 1;

          if (currentIndex >= this.slides.length) {
            currentIndex = 0;
          }

          this.showSlide(currentIndex);
        }.bind(this);

        this.el.on('click', '.next', showNext);

        var showPrevious = function () {
          this.hideSlide(currentIndex);

          currentIndex -= 1;

          if (currentIndex < 0) {
            currentIndex = this.slides.length - 1;
          }

          this.showSlide(currentIndex);
        }.bind(this);

        this.el.on('click', '.previous', showPrevious);

        var timer = setTimeout(function () {
          showNext();
          timer = setTimeout(function () {
            showNext();
          }, 5000);
        }, 5000);

        return el;
      },
      showSlide: function (index) {
        this.slides[index].show();
        this.slides[index].el.addClass('current');
      },
      hideSlide: function (index) {
        this.slides[index].hide();
        this.slides[index].el.removeClass('current');
      }
    }
  );
});
