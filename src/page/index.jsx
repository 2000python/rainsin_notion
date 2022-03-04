/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import DesktopIndexPage from './desktoppage';
import PhoneIndexPage from './phonepage';
import './index.css'
import useViewport from '../api/viewportContext';


function IndexPage() {
    const { width } = useViewport();
    const breakpoint = 960;
    return width > breakpoint ? <DesktopIndexPage/> : <PhoneIndexPage/>;
}

export default IndexPage;
