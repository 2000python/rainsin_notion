/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState,useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import Banner from '../../components/banner/banner';
import Title from '../../components/title/title';
import { useLocation, useParams} from 'react-router-dom';
import blogindexData from '../indexdata/api';
import SegmentChunk from '../../components/chunk/segment-chunk';

function BlogIndex(props) {
  const page = useContext(Context);
  const { mid } = useParams();
  const location = useLocation();
  const [imgurl, setImgurl] = useState();
  const [childData, setChild] = useState();
  const [title, setTitle] = useState({
    icon: '',
    Ititle: '',
    detail: '',
  });
  useEffect(() => {
    page.selectBlog_ListData(mid);
    blogindexData.forEach((item, index) => {
      if (mid === item.class) {
        page.push_Title(item.title.Ititle);
        page.push_Path(location);
        page.push_Icon(item.title.icon)
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
      <Banner imgStyle={img} ></Banner>
      <div className='wrap'>
        <Title icon={title.icon} Ititle={title.Ititle} detail={title.detail}></Title>
        {page.blog_detail_list_data.map((item, index) => {
          return <>
            <SegmentChunk databaseName={item.class} mid={mid} cid={item.cid} childData={item.childData}></SegmentChunk>
          </>
        })}
        
      </div>
      
    </>
  )
}
export default observer(BlogIndex)