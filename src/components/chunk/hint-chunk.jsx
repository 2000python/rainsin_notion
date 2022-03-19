/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react'
import TextChunk from './text-chunk'
import Path from '../../api/svg'
import './hint-chunk.css'

/**
 * 提示 组件
 * @param {Any} children 
 * @param {String} className 追加类名
 * @param {Number} width 设置组件宽度
 * @param {Number} height 设置组件高度
 * @return {ReactComponent}
 */

function HintChunk(props) {
  const children = props.children ? props.children : '';
  const ClassName = props.className ? props.className : '';
  const width = props.width ? props.width : 24, height = props.height ? props.height : width;
  return (
      <div className={`hint-chunk ${ClassName}`}>
          <div className='hint-chunk-center' >
            <TextChunk fontSize={24} lineheight=' _' svgwidth={width} svgheight={height}>
                {Path[`${props.id - 1}`].node}
              </TextChunk>
              <span>
               {children}
              </span>
          </div>
    </div>
  )
}

export default HintChunk