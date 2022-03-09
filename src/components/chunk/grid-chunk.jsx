/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect} from 'react'
import ListitemChunk from './listitem-chunk';
import FilmsChunk from './films-chunk';
import { Empty,Spin  } from 'antd';
import './grid-chunk.css';
import { LoadingOutlined } from '@ant-design/icons';

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

// function VideoBilibili(props) {
//     const data = props.data ? props.data : []
//     return (
//         <>
//             <ListitemChunk data={data}></ListitemChunk>
//         </>
//     )
// }
// function MediaFt(props) {
//     const data = props.data ? props.data : []
//     return (
//         <>
//             <FilmsChunk data={data}></FilmsChunk>
//         </>
//     )
// }

// function GridChunk(props) {
//     const outClass = props.outclass ? props.outclass : "";
//     const type = props.searchtype;

    

//     return props.isload ? <div className={`grid-chunk-bili-load ${outClass}`}>
//       <Spin indicator={antIcon}></Spin>
//     </div> : props.data.length == false ? <div className={`grid-chunk-bili-load ${outClass}`}><Empty description='没有数据' /></div> :
//         <div className={`grid-chunk ${outClass}`}>
//           {props.data.map((item, index) => {
//               if (type === item.result_type) {
//                  return (item.data.map((e, i) => {
//                       if (type === 'video') {
//                           return <>
//                               <div className='is-video-item' key={i}>
//                                 <VideoBilibili data={e}></VideoBilibili>
//                               </div>
//                           </>
//                       } else if (type === 'media_ft') {
//                           return <><div className='is-video-item' key={i}>
//                                 <MediaFt data={e}></MediaFt>
//                               </div></>
//                       } else if (type === 'media_bangumi') {
//                           return <><div className='is-video-item' key={i}>
//                                 <MediaFt data={e}></MediaFt>
//                               </div></>
//                       }
                   
//                 }))
//               }
//           })}
//       </div>
// }

// export default GridChunk