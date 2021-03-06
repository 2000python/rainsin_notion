/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect,useRef} from 'react'
import { Chip,Divider } from '@mui/material';
import HintChunk from '../chunk/hint-chunk'
import TextChunk from '../chunk/text-chunk'
import ImgChunk from '../chunk/img-chunk';
import './index.css'

import data,{right} from './API/data';
import Path from '../../api/svg';

/**
 * 图书馆信息列表 组件
 * @param {Number} data 设置列表数据
 * @param {String} hintWidth 设置hint组件宽度
 * @param {String} hintHeight 设置hint组件高度（如果不设则默认与宽相等）
 * @return {ReactComponent}
 */

export function LibraryInfoList(props) {
  const subproject = props.data ? props.data.subproject : [];
  const hintId = props.data.svg_Id ? props.data.svg_Id : 1; 
  const children = props.data.content ? props.data.content : '无数据';
  const hintWidth = props.hintWidth, hintHeight = props.hintHeight;
  
  return <>
    <HintChunk id={hintId} className='lbinfo-hint-top' width={hintHeight} height={hintHeight}>
          {children}
    </HintChunk>
    <Divider textAlign="left" className='show-chunk-divider' />
    {subproject.map((item, index) => {
      return (
        <TextChunk key={index} url={`/library/${item.classify_en}`} Class={`lbInfo-chunk-title`} content={`${item.classify}`} fontSize={16} width='95%' alpha={.2} lineheight=' _'>
           {Path[item.svg_Id - 1].node} &nbsp;&nbsp; 
        </TextChunk>
      )
    })}
  </>
}

/**
 * 格言 组件
 * @param {String} author 追加类名
 * @param {*} children 子元素
 * @param {String} content 文本内容
 * @return {ReactComponent}
 */

export function Mottos(props) {
  const content = props.content ? props.content : '';
  const author = props.author ? props.author : '无数据';
  return (
    <>
      <div className='lbinfo-motto-content'>
          <span className='motto-content'>
            {content}{props.children}
          </span>
          <span className='motto-author'>
          — {author}
          </span>
        </div>
    </>
  )
}

/**
 * 图书馆 组件
 * @return {ReactComponent}
 */

function LibraryInfo() {
  return (
    <div className='lbinfo-box'>
      <div className='lbinfo-tool'>
        {data.map((item, index) => {
          return (
            <LibraryInfoList key={index} data={item}></LibraryInfoList>
          )
        })}
      </div>
      <div className='lbinfo-motto'>
        <ImgChunk Class='lbinfo-motto-border' width="90%" height='auto' alt='书架' fillmode='cover' url='https://rainsin-1305486451.file.myqcloud.com/img/webp/notion/bookrack.webp'/>
        <Divider textAlign="left" className='motto-chunk-divider' />
        <Mottos author='王勃'>
        “老当益壮，宁移白首之心；穷且益坚，不坠青云之志。”
        </Mottos>
      </div>
      <div className='lbinfo-motto'>
        <ImgChunk Class='lbinfo-motto-border' width="90%" height='auto' alt='书架' fillmode='cover' url="https://rainsin-1305486451.file.myqcloud.com/img/webp/notion/%E8%91%A3%E5%85%B6%E6%98%8C%E6%B8%85.jpg"/>
        <Divider textAlign="left" className='motto-chunk-divider' />
        <Mottos author='易经'>
        “取法乎上，始得其中；取法乎中，始得其下。          ” 
        </Mottos>
      </div>
      <div className='lbinfo-else'>
      {right.map((item, index) => {
          return (
            <LibraryInfoList key={index} data={item}></LibraryInfoList>
          )
        })}
      </div>
    </div>
  )
}

export default LibraryInfo