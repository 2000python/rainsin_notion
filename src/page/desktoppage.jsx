/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import Nav from '../components/nav/nav'
import Banner from '../components/banner/banner';
import Title from '../components/title/title';
import Posts from '../components/posts/posts';
import LibraryInfo from '../components/libraryInfo';
import { Divider } from 'antd';
import './index.css'

function DesktopIndexPage() {
    return (<>
        <Nav/>
        <Banner />
        <div className='wrap'>
            <Title />
            <Divider orientation="right" children='文章分类'/>
            <Posts />
            <Divider className='desktop-page-post_down' orientation="left" children='图书管理员' />
            <LibraryInfo />
            <Divider orientation="left" children='暂时没想好' />
        </div>
    </>  
    );
}
export default DesktopIndexPage;