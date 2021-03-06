/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect} from 'react';
import ReactPlayer from 'react-player'
import { Player } from 'video-react';
import { Divider } from '@mui/material';
import TextChunk from '../chunk/text-chunk';
import Path from '../../api/svg'
import './rubik.css';
import 'video-react/dist/video-react.css';

import Posi_data, { Basic_data, Twisty_data } from './api/data';


/**
 * 魔方提示 组件
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
      <div className={`hint-chunk-rubik ${ClassName}`}>
          <div className='hint-chunk-center-rubik' >
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

/**
 * 魔方基础提示 组件
 * @param {Any} children 
 * @param {String} className 追加类名
 * @param {Number} width 设置组件宽度
 * @param {Number} height 设置组件高度
 * @param {String} outclassName 追加最外层容器类名
 * @param {String} hintclassName 追加提示组件容器类名
 * @param {String} divideclassName 追加分割线类名（需要加!important生效）
 * @param {Number} content 设置组件内容
 * @param {Number} data 设置组件数据
 * @return {ReactComponent}
 */

function RubikBasicList(props) {
  const subproject = props.data ? props.data.subproject : [];
  const hintId = props.data.svg_Id ? props.data.svg_Id : 1; 
  const children = props.data.content ? props.data.content : '无数据';

  const className = props.className ? props.className : '';
  const outclassName = props.outclassName ? props.outclassName : '';
  const hintclassName = props.hintclassName ? props.hintclassName : '';
  const dividerWidth = props.divideclassName ? props.divideclassName : '';
  return <div key={props.data.id}>
    <HintChunk id={hintId} className={`lbinfo-hint-top ${hintclassName}`}>
          {children}
    </HintChunk>
    <Divider textAlign="left" className={`show-chunk-divider-rubik ${dividerWidth}` } />
    <div className={`${outclassName}`}>
      {subproject.map((item, index) => {
        const title = item.sketch ? item.sketch : '自己想';
      return (
        <div className={`${className}`} key={index}>
        <TextChunk key={index} url={`/rubik/${item.classify_en}`} Class={`lbInfo-chunk-title `} content={`${item.classify}`} fontSize={16} width='100%' alpha={.2} lineheight=' _' title={title}>
           {Path[item.svg_Id - 1].node} &nbsp;&nbsp; 
        </TextChunk>
        </div>
      )
    })}
    </div>
    
  </div>
}

function showData(data){
  return data.map((item, index) => {
    return (
        <RubikBasicList key={index} data={item}></RubikBasicList>
      )
  })
}

function Rubik() {
  useEffect(() => {
    
  }, []);
  return (
    <>
      <div className='rubik'>
          {/* <div className='two-two grid-rubik-box'>
                
          </div>
          <div className='three-three grid-rubik-box'></div>
          <div className='four-four grid-rubik-box'></div>
          <div className='five-five grid-rubik-box'></div>
          <div className='six-six grid-rubik-box'></div>
          <div className='seven-seven grid-rubik-box'></div>
          <div className='skewb grid-rubik-box'></div>
          <div className='pyramid grid-rubik-box'></div>
          <div className='square-1 grid-rubik-box'></div>
          <div className='megaminx grid-rubik-box'></div>
          <div className='blindfolded grid-rubik-box'></div> */}
        <div className='basic-box flex-rubik-box'>
          <Divider textAlign='center' children='基础' className='divider-width-rubik'/>
            {showData(Basic_data)}
          <Divider textAlign="center" children='异形' className='divider-width-rubik'></Divider>
            {showData(Twisty_data)}
        </div>
        <div className='img-rubik flex-rubik-box'>
          <div className='img-rubik-title'>
            公式来自于以下网站：
          </div>
          <div className='img-rubik-box'>
            <a className='img-rubik-rootCube flex-rubik-img' rel="noreferrer" href='https://www.cuberoot.me' target='_blank'>
              <img alt='cuberoot' className='img-rubik-Cube' src='https://www.cuberoot.me/wp-content/uploads/2021/06/CubeRoot-new-logo-2.png'></img>
            </a>
            <a className='img-rubik-cubeskills flex-rubik-img' rel="noreferrer" href='https://www.cubeskills.com' target='_blank'>
              <img alt='cubeskills' className='img-rubik-Cube' src='https://www.cubeskills.com/images/logos/cubeskills-logo-150.png'></img>
            </a>
            <a className='img-rubik-speedcube flex-rubik-img' rel="noreferrer" href='https://www.speedcubedb.com' target='_blank'>
              <img alt='speedcube' className='img-rubik-Cube speedcube' src='https://www.speedcubedb.com/assets/logo.png'></img>
            </a>
            <a className='img-rubik-speedcube flex-rubik-img' rel="noreferrer" href='https://www.speedcubedb.com/' target='_blank'>
              <img alt='speedcube' className='img-rubik-Cube' src='http://images.squarespace-cdn.com/content/v1/521f92a9e4b0b2615fbfec53/1430627314902-8806L2YXLLV4I5KKOWU2/Cyotheking+text+colored.png?format=1000w'></img>
            </a>
          </div>
          <div className='img-rubik-title'>
            推荐魔方学习网站：
          </div>
          <div className='img-rubik-box'>
            <a className='img-rubik-rootCube flex-rubik-img' rel="noreferrer" href='https://www.cuberoot.me' target='_blank'>
              <img alt='cuberoot' className='img-rubik-Cube' src='https://www.cuberoot.me/wp-content/uploads/2021/06/CubeRoot-new-logo-2.png'></img>
            </a>
            <a className='img-rubik-cubeskills flex-rubik-img' rel="noreferrer" href='https://www.cubeskills.com' target='_blank'>
              <img alt='cubeskills' className='img-rubik-Cube' src='https://www.cubeskills.com/images/logos/cubeskills-logo-150.png'></img>
            </a>
            <a className='img-rubik-speedcube flex-rubik-img' rel="noreferrer" href='https://www.speedcubedb.com' target='_blank'>
              <img alt='speedcube' className='img-rubik-Cube speedcube' src='https://www.speedcubedb.com/assets/logo.png'></img>
            </a>
            <a className='img-rubik-speedcube flex-rubik-img' rel="noreferrer" href='https://www.speedcubedb.com/' target='_blank'>
              <img alt='speedcube' className='img-rubik-Cube' src='http://images.squarespace-cdn.com/content/v1/521f92a9e4b0b2615fbfec53/1430627314902-8806L2YXLLV4I5KKOWU2/Cyotheking+text+colored.png?format=1000w'></img>
            </a>
            <a className='img-rubik-speedcube flex-rubik-img' rel="noreferrer" href='http://www.mf100.org' target='_blank'>
              <img alt='speedcube' className='img-rubik-Cube' src='http://www.mf100.org/include/image/logo.png'></img>
            </a>
            <a className='img-rubik-speedcube flex-rubik-img' rel="noreferrer" href='https://www.speedsolving.com' target='_blank'>
              <img alt='speedcube' className='img-rubik-Cube' src='https://www.speedsolving.com/styles/core/xenforo/speedsolving-logo.png'></img>
            </a>
          </div>
        </div>
        <div className='posi-box flex-rubik-box'>
        <Divider textAlign="center" children='正阶' className='divider-width-rubik'></Divider>
          {showData(Posi_data)}
        </div>
      
      </div>
      
      </>
  )
}

export default Rubik