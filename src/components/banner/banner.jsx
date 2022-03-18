/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import './banner.css'

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
