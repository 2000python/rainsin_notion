/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useState,useContext} from 'react'
import { encode, decode } from 'js-base64';
import axios from 'axios';
import MarkdownNavbar from 'markdown-navbar';
import {  useLocation, useParams, useMatch } from 'react-router-dom';
import Nav from '../../../components/nav/nav';
import Markdown from '../../../components/markdown/markdown';
import 'markdown-navbar/dist/navbar.css';
import { Context } from '../../..';
import './index.css'
// import mark from 'https://rainsin-1305486451.file.myqcloud.com/mark/%E6%89%8B%E5%86%99%E9%A2%98.md'

function BlogDetail() {
  const art = useParams();
  const store = useContext(Context)
  const location = useLocation();
  const [data,setData] = useState()
  const [artUrl,setArtUrl]=React.useState(),[blogTitle,setBlogtitle]=useState(); 
    React.useEffect(() => {
      
      (async function () {
        const data = await axios.get('https://rainsin-1305486451.file.myqcloud.com/mark/%E6%89%8B%E5%86%99%E9%A2%98.md');
        setData(data.data);
      })()
      setArtUrl(decode(art.art_mid));
      setBlogtitle(art.art_title)
    })
  React.useEffect(() => {
      store.push_Title(art.art_title);
      store.push_Icon('');
    store.push_Path(location)
  },[])
  return (
    <>
      <div className='blog-art'>
        <div className='blog-art-bar'>
          <MarkdownNavbar headingTopOffset={1} ordered={false} source={data}></MarkdownNavbar>
        </div>
        <div className='blog-art-wrap'>
          <div className='blog-art-wrap-content'>
            <Markdown md={data}></Markdown>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default BlogDetail