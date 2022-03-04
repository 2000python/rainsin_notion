/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import './banner.css'

function Banner(props) {
    const bannerImg = props.ImgUrl ? props.ImgUrl : 'https://rainsin-1305486451.file.myqcloud.com/img/webp/%E8%B5%B5%E5%AD%9F%E9%A0%AB.webp';
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
