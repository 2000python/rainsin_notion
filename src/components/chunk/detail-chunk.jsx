/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useRef,useState} from 'react';
import './detail-chunk.css'

function Detail(props) {
  const data = props.data;
  return (
    <div>
      
    </div>
  )
}

function DetailChunk(props) {
  const className = props.className ? props.className : '';
  const data = props.data;
  const show = props.isShow;
  const [close ,setClose] = useState(false)
  const click = e => {
    setClose(true)
  }
    return close ? <></> : <div className='detail-chunk' onClick={click}>
      <div className={`detail-chunk-center ${className}`}>
          
      </div>
  </div>;
}

export default DetailChunk;