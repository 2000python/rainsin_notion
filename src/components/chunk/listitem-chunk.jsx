/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect,useRef} from 'react'
import ImgChunk from './img-chunk'
import './listitem-chunk.css'

/**
 * 列表项目 组件
 * @param {Array} data 数据
 * @return {ReactComponent}
 */

function ListitemChunk(props) {
    const data = props.data ? props.data : []
    const imgUrl = data.upic;
    const span = useRef()
    useEffect(() => {
        span.current.innerHTML = data.title
    })
  return (
      <div className='listitem-chunk'>
          <a className='listitem-chunk-img ' style={{ backgroundImage: `url(http://rainsin.yicp.top/img)` }}>
              <div className='listitem-chunk-img-box'>
                <img>
                  
                  </img>
                  <div className='listitem-chunk-img-time'>
                    {data.duration}
                  </div>
              </div>
          </a>
          <a className='listitem-chunk-title' ref={span}></a>
    </div>
  )
}

export default ListitemChunk