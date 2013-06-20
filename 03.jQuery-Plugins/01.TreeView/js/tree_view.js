
(function ($, window, document, undefined) {
  'use strict';

  $.fn.treeView = function () {
    this.
      addClass('tree_view').
      find('ul').
        addClass('subtree_view').
        hide().
        prev().
          addClass('subtree_root');

    this.on('click', '.subtree_root', function () {
      $(this).next().slideToggle();
    });

    return this;
  };
})(jQuery, window, document);
