/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import Nav from '../components/nav/nav'
import Banner from '../components/banner/banner';
import Title from '../components/title/title';
import Posts from '../components/posts/posts';
import { Helmet } from "react-helmet";
import { Divider } from 'antd';
import './index.css'

function DesktopIndexPage() {
    return (<>
        <Helmet>
                <meta charSet="utf-8" />
                <title>解忧杂货店</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Nav/>
        <Banner />
        <div className='wrap'>
            <Title />
            <Divider />
            <Posts />
        </div>
    </>  
    );
}
export default DesktopIndexPage;