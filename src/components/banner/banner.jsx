/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import './banner.css'

/**
 * banner 组件
 * @param {String} ImgUrl 设置图片路径（有样式此参数失效）
 * @param {Number} imgStyle 设置图片样式
 * @return {ReactComponent}
 */

function Banner(props) {
    const bannerImg = props.ImgUrl ? props.ImgUrl : 'https://rainsin-1305486451.file.myqcloud.com/img/webp/notion/%E9%BA%BB%E4%BB%99%E5%A7%91.jpg';
    const imgStyle = props.imgStyle ? props.imgStyle : {
        backgroundImage: `url(${bannerImg})`,
    }
    return <>
        <div className='banner'>
            <div className='banner-img' style={imgStyle}>
            </div>
      </div>
  </>;
}

export default Banner;
