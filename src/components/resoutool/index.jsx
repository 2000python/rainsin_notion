/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useState,useEffect} from 'react'
import { Document, Page, pdfjs, Outline } from "react-pdf";
import TextChunk from '../chunk/text-chunk';
import MusicChunk from '../chunk/music-chunk';
import TextboxChunk from '../chunk/textbox-chunk';
import BarChunk from '../chunk/bar-chunk'
import { Divider } from 'antd';
import Tag from '../tag/tag';
import Magnet from './magnet'
import './index.css'

function ResourceInfo() {
  //   const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }
  //   useEffect(() => {
  //       pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  //   },[])
  return (
    <div className='resource-info'>
      <div className='resource-info-music'>
        <div className='resource-info-music-box'>
          <BarChunk isTag={false} content='搜音乐🎵 ' fontsize={35}>
            <MusicChunk />
            <TextboxChunk fontsize={18}>
              付费的歌就算了，如果非要听的话，可以给你分享几个软件:<br/>
              <TextChunk fontSize={17} target='_blank' lineheight='_' url='https://github.com/lyswhut/lx-music-desktop'><Tag color='yellow'>Lx music(Linux\Windows\MacOS)</Tag></TextChunk>
              <TextChunk fontSize={17} target='_blank' lineheight='_' url='https://github.com/lyswhut/lx-music-mobile'><Tag color='blue'>Lx music mobile</Tag></TextChunk>
            </TextboxChunk>
          </BarChunk>
        </div>
        
      </div>
      <div className='resource-info-magnet'>
        <div className='resource-info-magnet-box'>
          <BarChunk isTag={false} content='搜磁力🧲 ' fontsize={35}>
          <Magnet></Magnet>
          </BarChunk>
        </div>
      </div>
      <div className='resource-info-clouddesk'>

      </div>
      <div className='resource-info-other'>

      </div>
      </div>
  )
}

export default ResourceInfo