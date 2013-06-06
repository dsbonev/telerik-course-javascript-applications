/* globals define */

define(['image', 'lib/oop'], function (Image, OOP) {
  'use strict';

  return OOP.Object.create(Object.prototype, {
    initialize: function (containerEl, imageData) {
      this.el = containerEl;
      this.previewEl = this._appendPreviewEl();
      this.listEl = this._appendListEl();
      this.images = this._appendImages(imageData);
      this._appendButtons();
      this._preview(0);

      return this;
    },
    _appendPreviewEl: function() {
      var previewEl = document.createElement('img');
      previewEl.classList.add('preview_image');

      var previewContainerEl = document.createElement('div');
      previewContainerEl.classList.add('preview_container');
      previewContainerEl.appendChild(previewEl);
      this.el.appendChild(previewContainerEl);

      return previewEl;
    },
    _appendListEl: function(imageData) {
      var listEl = document.createElement('ul');
      listEl.classList.add('image_list');
      this.el.appendChild(listEl);

      listEl.addEventListener('click', function (event) {
        if (event.target.tagName.toLowerCase() == 'img') {
          this._preview(event.target.getAttribute('data-index'));
        }
      }.bind(this), false);

      return listEl;
    },
    _appendImages: function(imageData) {
      var images = [];

      imageData.forEach(function (imageDatum, index) {
        var imageEl = document.createElement('img');
        imageEl.src = imageDatum.thumbnailUrl;
        imageEl.setAttribute('data-url', imageDatum.url);
        imageEl.alt = (imageEl.title = imageDatum.title);
        imageEl.classList.add('image_item');
        imageEl.setAttribute('data-index', index);
        images.push(imageEl);

        var imageListItemEl = document.createElement('li');
        imageListItemEl.classList.add('image_item_container');
        imageListItemEl.appendChild(imageEl);

        this.listEl.appendChild(imageListItemEl);
      }.bind(this));

      return images;
    },
    _appendButtons: function () {
      var previousButton = this._createButton();
      previousButton.classList.add('previous_button');
      previousButton.title = 'previous';
      this.el.appendChild(previousButton);
      previousButton.addEventListener('click', function (event) {
        this._preview(this.currentIndex - 1);
      }.bind(this), false);

      var nextButton = this._createButton();
      nextButton.classList.add('next_button');
      nextButton.title = 'next';
      this.el.appendChild(nextButton);
      nextButton.addEventListener('click', function (event) {
        this._preview(this.currentIndex + 1);
      }.bind(this), false);
    },
    _createButton: function () {
      var button = document.createElement('a');
      button.classList.add('button');
      button.href = '#';
      return button;
    },
    _preview: function (index) {
      index = parseInt(index, 10);
      if (index < 0 || index >= this.images.length) {
        return;
      }

      this.previewEl.src = this.images[index].getAttribute('data-url');

      if (this.currentIndex !== undefined) {
        this.images[this.currentIndex].classList.remove('current');
      }

      this.currentIndex = index;
      this.images[this.currentIndex].classList.add('current');
      this.listEl.scrollLeft = (this.images[this.currentIndex].parentNode.offsetLeft);
    }
  });
});
