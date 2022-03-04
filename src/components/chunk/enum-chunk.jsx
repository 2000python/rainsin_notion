/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import ImgChunk from './img-chunk';
import Tag from '../tag/tag';
import './enum-chunk.css';

function EnumChunk(props) {
  const data = props.data ? props.data : new Error('没有数据');
    React.useEffect(() => {
        
    })
  return (
    <div className='enum-chunk'>
      <Link to='/blog/detail?id=1' className='enum-chunk-item '>
        <div className='enum-chunk-item-img-box'>
          <ImgChunk fillmode='cover' Class='enum-chunk-item-img' />
        </div>
        <div className='enum-chunk-item-content-box'>
          <div className='enum-chunk-item-content-title'>
            {data.title}
          </div>
          <div className='enum-chunk-item-content-description'>
            {data.description}
          </div>
          <div className='enum-chunk-item-content-tag'>
            <Tag className='enum-chunk-item-content-tag-mag' color='blue' content='CSS' fontsize={12}></Tag>
            <Tag className='enum-chunk-item-content-tag-mag' color='blue' content='CSS3' fontsize={12}></Tag>
            <Tag className='enum-chunk-item-content-tag-mag' color='blue' content='BFC' fontsize={12}></Tag>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default EnumChunk