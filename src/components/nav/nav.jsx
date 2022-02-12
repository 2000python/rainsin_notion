/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState } from 'react';
import './nav.css'
// import { Breadcrumb } from 'antd';
// import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import TextChunk from '../chunk/text-chunk';


function Nav(props) {
    // const location = useLocation();
    // const pathSnippets = location.pathname.split('/')
    return (<nav className='nav'>
        <div className='nav-center-box'>
        <div className='nav-crumbs'>
        
            <TextChunk content='📝&nbsp;解忧杂货店' url='/' fontSize={14}></TextChunk>
                         
                        
            <TextChunk content='📝&nbsp;解忧杂货店' url='/' fontSize={14}></TextChunk>
                         
                        
            <TextChunk content={'📝 解忧杂货店'} url='/' fontSize={14}></TextChunk>
            
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
