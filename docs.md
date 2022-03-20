<!--
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
-->
# 组件列表
## 1. 文本组件
### 1.1 锚点文本组件
```js
/**
 * 锚点文本 组件
 * @param {String} Class 追加类名
 * @param {Number} fontSize 设置字体大小
 * @param {node} children 子元素
 * @param {Number} alpha  遮罩透明度(0-1)
 * @param {Number} width 盒子宽度
 * @param {*} content 文本内容
 * @param {String} target 跳转
 * @param {boolean} isPreventDefault 是否阻止默认事件
 * @param {function} onClick  点击事件
 * @param {function} dbClick  双击事件
 * @param {function} MouseOver  鼠标移到事件
 * @param {function} MouseOut  鼠标移出事件
 * @param {Number} svgwidth  svg宽
 * @param {Number} svgheight  svg高 默认与svgwidth相等
 * @param {Object} data  HTML元素的data Set属性
 * @param {Number} lineheight  _
 * @return {ReactComponent}
 */
```
该组件被用于具有单击或双击事件的导航场景，内容可以是svg，文本和emoji。
