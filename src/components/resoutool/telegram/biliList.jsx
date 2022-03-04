/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState } from 'react';
import {searchtype} from './api'
import GridChunk from "../../chunk/grid-chunk"
import PubSub from 'pubsub-js';

function BilibiliSearchList(props) {
    const [searchType, setSearchType] = useState('video')
    const [isload, setIsload] = useState(false);
    const Listdata = props.data;
    const data = Listdata ? Listdata.data.data.result : [];
    const showtype = e => {
        e.preventDefault();
        const mid = e.target.dataset.mid;
        setSearchType(mid)
        PubSub.publish('change_type', mid); 
    }  

    const biliload = (_, Load) => {
        if (Load) {
            setIsload(true)
        } else {
            setIsload(false)
        }
    }

    useEffect(() => {
        const load = PubSub.subscribe('isBiliLoad',biliload)
    }, [])
    
    return  <div className='bili-search-list-box'>
        <div className='bili-search-type-outbox'>
            <div className='bili-search-type'>
                {searchtype.map((item, index) => {
                    return (
                        <span className='search-bili-tag-item' key={index}>
                            <a className='search-bili-tag-item-a' data-id={`${item.id}`} data-mid={item.mid} onClick={showtype} href='/' rel="noreferrer">
                                <span data-id={item.id} data-mid={item.mid}>{item.name}</span>
                            </a>
                        </span>
                    )
                })}
            </div>
        </div>
        <GridChunk isload={isload} data={data} searchtype={searchType}>
        </GridChunk>
        </div>
        
}

export default BilibiliSearchList