/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
// import Nav from '../components/nav/nav'
import Banner from '../components/banner/banner';
import Title from '../components/title/title';
import Posts from '../components/posts/posts';
import LibraryInfo from '../components/libraryInfo';
import { Chip,Divider } from '@mui/material';
import './index.css'
import Rubik from '../components/rubik-cube/rubik';
// import DetailChunk from '../components/chunk/detail-chunk';

function DesktopIndexPage() {
    return (<>
        <Banner imgStyle={{backgroundImage:'url(https://rainsin-1305486451.file.myqcloud.com/img/webp/notion/%E9%BA%BB%E4%BB%99%E5%A7%91.jpg)',backgroundPosition: 'center center',backgroundSize: 'cover'}}/>
        <div className='wrap'>
            <Title />
            <Divider textAlign="right"><Chip label="奇思妙想" /></Divider>
            <Posts />
            <Divider className='desktop-page-post_down' textAlign="center"  ><Chip label="图书管理员" /></Divider>
            <LibraryInfo />
            {/* <Divider className='desktop-page-post_down' textAlign="left"><Chip label="大海捞针" /></Divider> */}
            {/* <ResourceInfo></ResourceInfo> */}
            <Divider className='desktop-page-post_down'  textAlign='center'><Chip label="魔方公式收集（来自魔方根）" /></Divider>
            <Rubik></Rubik>
            {/* <DetailChunk></DetailChunk> */}
            <Divider  textAlign='right' ><Chip label="作品集" /></Divider>
        </div>
    </>  
    );
}
export default DesktopIndexPage;