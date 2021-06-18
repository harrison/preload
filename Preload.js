;
(function (global) {
  //开启严格模式
  "use strict";

  /**
   * 构造函数
   * @param {Object} config 配置项
   * @param {Boolean} showLoadImgSrc 当前加载图片地址 default:false不显示 true显示
   * @param {Array} preloadImageList 额外加载的图片 default: []
   * @param {Func} processing 加载中进度反馈 default: function(){}
   * @param {Func} complate 加载完成后回调函数 default: function(){}
   */
  function Preload(config) {
    this._init_(config);
  };


  //原型上提供方法
  Preload.prototype = {
    // 初始化
    _init_: function (config) {
      let preloadImageList = config.preloadImageList ? config.preloadImageList : [];
      let processing = config.processing ? config.processing : function () {};
      let complate = config.complate ? config.complate : function () {};
      this.showLoadImgSrc = config.showLoadImgSrc ? true : false;
      // 遍历获取所有背景图
      if ($('div').length > 0) {
        $.each($('div'), function (index, val) {
          var img = $(val).css('background-image').replace(/^url\((['"]?)(.*)\1\)$/, '$2');
          img = $.trim(img);
          if (img && img.match(/[^/]+(jpg|png|gif)/)) {
            preloadImageList.push(img);
          }
        });
      }

      this.preloadimages(preloadImageList, complate, processing);
    },
    preloadimages: function (obj, complete_cb, progress_cb) {
      let _this = this;
      obj = Array.from(new Set(obj));
      var loaded = 0;
      var toload = 0;
      var images = obj instanceof Array ? [] : {};
      toload = obj.length;
      for (var i = 0; i < obj.length; i++) {
        images[i] = new Image();
        images[i].crossOrigin = "Anonymous";
        images[i].setAttribute('crossOrigin', 'anonymous');
        images[i].src = obj[i];
        images[i].url = obj[i];
        if (_this.showLoadImgSrc) {
          console.log(images[i].src); //可输出当前加载图片的地址
        }
        images[i].onload = load;
        images[i].onerror = load;
        images[i].onabort = load;
      }
      if (obj.length == 0) {
        complete_cb(images);
      }

      function load() {
        ++loaded;
        if (progress_cb) {
          progress_cb(loaded / toload);
        }
        if (loaded >= toload) {
          complete_cb(images);
        }
      }
    },


  };

  if (typeof module !== 'undefined' && module.exports) { //兼容CommonJs规范 
    module.exports = Preload;
  } else if (typeof define === 'function') { //兼容AMD/CMD规范
    define(function () {
      return Preload;
    })
  } else { //注册全局变量，兼容直接使用script标签引入插件
    global.Preload = Preload;
  }


})(this);