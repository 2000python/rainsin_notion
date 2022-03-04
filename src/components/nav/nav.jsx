/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { useLocation,useMatch } from 'react-router-dom';
import './nav.css';
// import { Breadcrumb } from 'antd';
// import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import TextChunk from '../chunk/text-chunk';


function Nav(props) {
    const [pathStack, setPathstack] = useState([
        {
            pathname: '/',
            search: '',
            state: null,
            title: ' 🧠 解忧杂货店',
        }
    ])
    const location = useLocation();

    const setTitle = (_,data) => {
        const nowPath = {...location,title: ` ${data.icon}  ${data.Ititle}`};
        setPathstack(prev => {
            for (let item = prev.length-1; item >= 0; item--) {
                return prev[item].pathname === nowPath.pathname ? prev : [...prev, nowPath]
            }
        })
    }
    useEffect(() => {
        PubSub.subscribe('PageTitle',setTitle)
    },[])
    
    useEffect(() => {
        console.log(pathStack);
    })


    
    return (<nav className='nav'>
        <div className='nav-center-box'>
            <div className='nav-crumbs'>
                {pathStack.map((item, index) => {
                    return item.pathname === '/' ? <><TextChunk Class='nav-patn-box' content={item.title} url={item.pathname} fontSize={14}></TextChunk></> :
                        <>
                        &nbsp; /&nbsp; <TextChunk content={item.title} url={item.pathname} fontSize={14}></TextChunk>
                        </>
                })}
            
        </div>
        <div className='nav-menu'>

            <TextChunk Class='nav-center' content='分享' url='/share' fontSize={14}></TextChunk>


            <TextChunk Class='nav-center' content='简历' url='/share' fontSize={14}></TextChunk>


            <TextChunk Class='nav-center' content='➠' url='/share' fontSize={18}></TextChunk>


            <TextChunk Class='nav-center' content='➠' url='/share' fontSize={18}></TextChunk>

        </div>
        </div>
    </nav>);
}

export default Nav;
