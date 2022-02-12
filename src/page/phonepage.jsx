/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import Nav from '../components/nav/nav'
import Banner from '../components/banner/banner';
import Title from '../components/title/title';
import Posts from '../components/posts/posts';
import TextChunk from '../components/chunk/text-chunk';
import { Divider } from 'antd';
import './index.css'

function PhoneIndexPage() {
    return (<>
        <Nav/>
        <Banner />
        <TextChunk fontSize={20}>手机页面还没弄，不知道以后还会不会弄。</TextChunk>
    </>  
    );
}
export default PhoneIndexPage;