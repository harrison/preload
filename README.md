# 自动加载插件

## 参数
| 参数名 | 类型  | 说明 | 默认值 |
| ---- | :---: | :---: | ---: |
| showLoadImgSrc |  Boolean   | 是否打印当前加载图片地址 | false |
| preloadImageList |  Array   | 额外加载的图片地址 | []|
| processing |  Function   | 加载中进度反馈 | function(){}|
| complate |  Function   | 加载完成后回调函数 | function(){}|

## 用法

### 引入插件
``` javascript
// 调试版
<script type="text/javascript" src="https://qn.mktcreator.cn/common/js/Preload.js"></script>
// 压缩生产版
<script type="text/javascript" src="https://qn.mktcreator.cn/common/js/Preload.min.js"></script>
```

### 初始化插件
``` javascript
// 最简用法
let preload = new Preload({})
// 如无需自定义功能默认传递空对象
```

### showLoadImgSrc参数说明
此参数为调试参数，设置为true则每加载一张图片后都会console图片url
``` javascript
let preload = new Preload({
    showLoadImgSrc: true
})
```

### preloadImageList参数说明
插件默认读取dom元素中的div的background-image属性，从而获取所有需要加载的图片，例如分享小图和除div以外元素包裹的图片无法读取到，或使用v-if条件的div不会渲染到页面也无法读取到，解决办法就是可以使用preloadImageList参数，传递图片url地址数组，来实现自动预加载
示例：
``` javascript
let preload = new Preload({
    preloadImageList: [
      'http://abc.com/1.png',
      'http://abc.com/2.png'
    ]
})
```

### processing参数说明
此参数为加载进程中回调函数，一般用于loading页面显示加载进度百分比，返回的参数为加载百分比，需乘100取整后使用，用法如下：
``` javascript
let preload = new Preload({
    processing: function (progress) {
        console.log(parseInt(progress * 100) + '%')
    }
})
```

### complate参数说明
此参数为加载完成后回调参数，一般用于在加载完成后隐藏Loading页面显示主页面
回调参数可接可不接，为加载的图片对象数组
``` javascript
let preload = new Preload({
    complate: function () {
        console.log('Loading complate!')
    }
})

// 接收图片对象数组
let preload = new Preload({
    complate: function (imgObj) {
        console.log(imgObj)
    }
})
```