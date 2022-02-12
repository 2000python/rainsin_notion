/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect} from 'react'
import TextChunk from './text-chunk'
import Path from '../../api/svg'
import './hint-chunk.css'

function HintChunk(props) {
  const children = props.children ? props.children : '';
  const ClassName = props.className ? props.className : ''
  return (
      <div className={`hint-chunk ${ClassName}`}>
          <div className='hint-chunk-center'>
            <TextChunk fontSize={24} lineheight=' _' >
                {Path[props.id - 1].node}
              </TextChunk>
              <span>
               {children}
              </span>
          </div>
    </div>
  )
}

export default HintChunk