/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import './nav.css'
// import { Breadcrumb } from 'antd';
// import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import TextChunk from '../chunk/text-chunk';


function Nav(props) {
    // const location = useLocation();
    // const pathSnippets = location.pathname.split('/')
    return (<nav className='nav'>
        <ul className='nav-crumbs'>
            <li>
            <TextChunk content='📝&nbsp;解忧杂货店' url='/' fontSize={14}></TextChunk>
            </li>  
            <li>  
            <TextChunk content='📝&nbsp;解忧杂货店' url='/' fontSize={14}></TextChunk>
            </li>  
            <li>  
                <TextChunk content={'📝 解忧杂货店'} url='/' fontSize={14}></TextChunk>
            </li>
        </ul>
        <ul className='nav-menu'>
            <li>
                <TextChunk content='分享' url='/share' fontSize={14}></TextChunk>
            </li>
            <li>
                <TextChunk content='🔞' url='/share' fontSize={16}></TextChunk>
            </li>
            <li>
                <TextChunk content='➠' url='/share' fontSize={18}></TextChunk>
            </li>
            <li>
                <TextChunk content='➠' url='/share' fontSize={18}></TextChunk>
            </li>
        </ul>
       
    </nav>);
}

export default Nav;
