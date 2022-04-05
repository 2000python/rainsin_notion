/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import ImgChunk from './img-chunk';
import Tag from '../tag/tag';
import { encode, decode } from 'js-base64';
import './enum-chunk.css';


/**
 * 菜单块 组件
 * @param {Array} data 组件需要数据
 * @param {Number} mid 
 * @return {ReactComponent}
 */

function EnumChunk(props) {
  const data = props.data ? props.data : new Error('没有数据');
  const [tag, settag] = React.useState([]), [urlMid, setMid] = React.useState();
  const mid = props.mid
    React.useEffect(() => {
      settag(data.tag.split('/'));
      setMid(data.id);
    },[])
  return (
    <div className='enum-chunk'>
      <Link to={'/blog/detail/'+ urlMid} className='enum-chunk-item '>
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
            {tag.map((item) => {
              return <>
              <Tag className='enum-chunk-item-content-tag-mag' color='blue' content={item} fontsize={12}></Tag>
              </>
            })}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default EnumChunk