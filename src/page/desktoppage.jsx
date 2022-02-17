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
import ResourceInfo from '../components/resoutool';

function DesktopIndexPage() {
    return (<>
        <Nav/>
        <Banner />
        <div className='wrap'>
            <Title />
            <Divider orientation="right" children='奇思妙想'/>
            <Posts />
            <Divider className='desktop-page-post_down' orientation="center" children='图书管理员' />
            <LibraryInfo />
            <Divider orientation="left" children='大海捞针' />
            <ResourceInfo></ResourceInfo>
            <Divider orientation="left" children='魔方公式收集' />
            虽然菜，但公式还是要分享！
        </div>
    </>  
    );
}
export default DesktopIndexPage;