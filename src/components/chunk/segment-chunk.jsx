/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import './segment-chunk.css'
import TextChunk from './text-chunk';
import EnumChunk from './enum-chunk';

import {classifyId} from '../../page/blog/api/data'

function SegmentChunk(props) {
    const databaseName = props.databaseName ? props.databaseName : '未分类', childData = props.childData ? props.childData : [];
    const databaseCid = props.cid ? props.cid : 1; 
    return (
        <div className='segment-chunk'>
            <div className='segment-chunk-nav'>
                <TextChunk isPreventDefault={true} fontSize={18} svgwidth={18} Class='segment-chunk-nav-svg' content={databaseName}>
                    {classifyId.map(item => {
                        if (item.cid === databaseCid) {
                            return (
                                <>
                                    {item.node}
                                </>
                            )
                        }
                    })}
                    &nbsp;
                </TextChunk>
            </div>
            <div className='grid-segment-chunk'>
                {childData.map((data, index) => {
                    return <>
                        <EnumChunk data={data} ></EnumChunk>
                    </>
                })}
            </div>   
      </div>   
  )
}

export default SegmentChunk