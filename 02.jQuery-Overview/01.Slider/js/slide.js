/* globals define */

define(['text!slide.html', 'jquery', 'lib/oop'], function (slideHtml, $, OOP) {
  'use strict';

  return OOP.Class.create(
    function Slide(content) {
      this.content = content;
    },
    Object,
    {
      toDom: function () {
        if (this.el) {
          return this.el;
        }

        var el = $(slideHtml),
          contentEl = $('.content', el);

        contentEl.html(this.content);

        this.el = el;

        return el;
      },
      show: function () {
        this.el.fadeIn();
      },
      hide: function () {
        this.el.fadeOut();
      }
    }
  );
});
