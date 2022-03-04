/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect,useState} from 'react'
import Nav from '../../components/nav/nav'
import Banner from '../../components/banner/banner';
import Title from '../../components/title/title';
import PubSub from 'pubsub-js';
import { useHistory, useLocation, useParams, useMatch } from 'react-router-dom';
import blogindexData from '../indexdata/api';
import SegmentChunk from '../../components/chunk/segment-chunk';

import blogTechData from './api/data';

function BlogIndex(props) {
  const { mid } = useParams();
  const [imgurl, setImgurl] = useState();
  const [childData, setChild] = useState();
  const [title, setTitle] = useState({
    icon: '',
    Ititle: '',
    detail: '',
  })
    useEffect(() => {
      blogindexData.forEach((item, index) => {
        if (mid === item.class) {
          PubSub.publish('PageTitle',item.title)
          setChild(item.childData);
          setImgurl(item.banner.url);
          setTitle({
            icon: item.title.icon,
            Ititle: item.title.Ititle,
            detail: item.title.detial,
          })
          }
        })
    },[])
  const img = {
    backgroundImage: `url(${imgurl})`,
    backgroundPosition: 'center 45%',
  }
  return (
      <>
      <Nav></Nav>
      <Banner imgStyle={img} ></Banner>
      <div className='wrap'>
        <Title icon={title.icon} Ititle={title.Ititle} detail={title.detail}></Title>
        {blogTechData.map((item, index) => {
          return <>
            <SegmentChunk databaseName={item.class} cid={item.cid} childData={item.childData}></SegmentChunk>
          </>
        })}
        
      </div>
      
    </>
  )
}
export default BlogIndex