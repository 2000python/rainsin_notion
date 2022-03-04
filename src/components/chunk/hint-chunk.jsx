/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect,useRef} from 'react'
import TextChunk from './text-chunk'
import Path from '../../api/svg'
import './hint-chunk.css'

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