/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState,useContext ,useMemo} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import Banner from '../../components/banner/banner';
import Title from '../../components/title/title';
import axios from 'axios';
import { useLocation, useParams} from 'react-router-dom';
import blogindexData from '../indexdata/api';
import SegmentChunk from '../../components/chunk/segment-chunk';

const titleData = [
  {
    id: 1,
    icon: '🖥 ',
    title: '求知',
    detail: '前端真的真的很好玩',
  },
  {
    id: 2,
    icon: '📜 ',
    title: '思考',
    detail: '随便写着玩',
  },
  {
    id: 3,
    icon: '🪢 ',
    title: '开心',
    detail: '干啥啥不行',
  },
  {
    id: 4,
    icon: '🛸 ',
    title: '好奇',
    detail: '阴谋论、UFO、鲍勃拉扎、51区',
  },
]

function BlogIndex(props) {
  const page = useContext(Context);
  const { mid } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://rainsin.yicp.top/?classify_id=' + mid).then(
      (response) => {
      setData(response.data)
      }).catch((reject) => {
      setData([])
    })
    const gettitle = () => {
      let ans = '';
      titleData.forEach((item) => {
        if (item.id === Number(mid)) {
          ans = item.title
        }
      })
      return ans
    }
    page.push_Title(gettitle());
  },[])
  useEffect(() => {
    console.log(data);
  })
  const img = {
    backgroundImage: `url(https://rainsin-1305486451.file.myqcloud.com/img/55.jpg)`,
    backgroundPosition: 'center 45%',
  }
  return (
      <>
      <Banner imgStyle={img} ></Banner>
      <div className='wrap'>
        {titleData.map((item) => {
          return item.id === Number(mid) ? <Title icon={item.icon} Ititle={item.title} detail={item.detail}></Title> : ''
        })}
        {data.map((item, index) => {
          return <>
            <SegmentChunk databaseName={item.class} mid={mid} cid={item.cid} childData={item.childData}></SegmentChunk>
          </>
        })}
        
      </div>
      
    </>
  )
}
export default observer(BlogIndex)