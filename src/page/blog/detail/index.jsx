/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useState} from 'react'
import { encode, decode } from 'js-base64';
import axios from 'axios';
import MarkdownNavbar from 'markdown-navbar';
import {Affix} from 'antd'
import {  useLocation, useParams, useMatch } from 'react-router-dom';
import Nav from '../../../components/nav/nav';
import Markdown from '../../../components/markdown/markdown';
import './index.css'
// import mark from 'https://rainsin-1305486451.file.myqcloud.com/mark/%E6%89%8B%E5%86%99%E9%A2%98.md'

function BlogDetail() {
  const art = useParams();
  const location = useLocation();
  const [data,setData] = useState()
    const [artUrl,setArtUrl]=React.useState(); 
    React.useEffect(() => {
      
      (async function () {
        const data = await axios.get('https://rainsin-1305486451.file.myqcloud.com/mark/%E6%89%8B%E5%86%99%E9%A2%98.md');
        setData(data.data);
        })()
        setArtUrl(decode(art.art_mid));
    })
  return (
    <>
      <div className='blog-art'>
        <div className='blog-art-wrap'>
          <Markdown md={data}></Markdown>
        </div>
        <div className='blog-art-bar'>
          <MarkdownNavbar source={data}></MarkdownNavbar>
       </div>
      </div>
    </>
  )
}

export default BlogDetail