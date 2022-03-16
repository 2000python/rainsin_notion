/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from "react";
import Nav from "../components/nav/nav";
import axios from "axios";
import Markdown from "../components/markdown/markdown";

export default function Resume() {
    const [data, setdata] = React.useState()
    React.useEffect(() => {
        (async function () {
            const data = await axios.get('https://rainsin-1305486451.file.myqcloud.com/mark/resume.md');
            setdata(data.data);
          })()
    },[])
    return(
         <>
            <div className='wrap'>
            <div className='blog-art'>
                    <Markdown md={data}></Markdown>
                    </div>
            </div>
         </>
    )
}