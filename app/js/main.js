'use strict';

$(function () {
  // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
  // 相关 issue: https://github.com/weui/weui/issues/15
  // 解决方法:
  // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
  // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
  //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
  if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function () {
      if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    });
  }

  function onRouteChange(path) {
    $('.menu-list li a').removeClass('active');
    var $navItem = $('.nav-' + path);
    if ($navItem.length > 0) {
      $navItem.addClass('active').closest('.menu-collapse').prev('.collapsed').removeClass('collapsed');
    }
    setTimeout(function () {
      $(window).scrollTop(0);
    }, 250);
  }

  $('.menu-list').on('click', 'li a', function (e) {
    $(this).toggleClass('collapsed');
  });
});

//
//# sourceMappingURL=main.js.map
