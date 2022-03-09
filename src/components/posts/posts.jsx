/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Drawer } from '@mui/material'
import { Route,Routes,Outlet,useParams,useLocation} from 'react-router-dom';
import ShowChunk from '../chunk/show-chunk';
import BarChunk from '../chunk/bar-chunk';
import TextboxChunk from '../chunk/textbox-chunk';
import TextChunk from '../chunk/text-chunk';
import ImgChunk from '../chunk/img-chunk';
import MusicChunk from '../chunk/music-chunk';

import './posts.css'

import artData, { IsOpen } from './data/api';
import Tag from '../tag/tag';

// export function Drawer(props) {
//     const isShow = props.show ? 'drawer-show' : 'drawer-close';
//     const { mid } = useParams();
//     useEffect(() => {
//         console.log(mid);
//     })
//     return (
//         <>
//             <div className={`drawer-wrap ${isShow}`}>
//                 <div className='drawer-mock'>
//                 </div>
//                 {mid}
//           </div>
//         </>
//     )
// }

function Posts(props) {
    const data = artData;
    const [Visible, setVisible] = useState({
        wechat: false,
        tg: false,
    });
    const drawerShow = {
        wechat: e => setVisible({ wechat: true }),
        tg: e =>  setVisible({ tg: true })
    }
    const drawerClose = {
        wechat: e => setVisible({ wechat: false }),
        tg: e => setVisible({ tg: false })
    }
    const drawerstyle = {
       justifyContent: 'center'
    }
    return <>
        <div className='blog-posts'>
            <div className='left-posts-chunk'>
                <BarChunk isTag={false} content='ABOUT ME' fontsize={40}>
                        <MusicChunk></MusicChunk>
                        <TextboxChunk fontsize={18}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🐟 🌅 ✌ ，🇨🇳 一个不止于code的程序猿 👨‍💻 ，🛸 喜欢一些奇奇怪怪的东西 👽 ，🎼 一个老Jay迷 🎧，也是一个喜欢听秦腔的老秦人 👺，喜欢玩魔方，都会一点但是都不精通。
                        </TextboxChunk>
                        <TextboxChunk fontsize={18}>
                            <TextChunk isPreventDefault={true} Class='bar-textbox-font-color bar-post-aboutme-contact-local'  width='100%' fontSize={14} onClick={drawerShow.wechat}>
                            <svg t="1644514117658" className="local-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2185" width="14" height="14"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#28C445" p-id="2186"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#28C445" p-id="2187"></path></svg> WeChat: Ohh-TiamoN   
                            </TextChunk>
                            <TextChunk isPreventDefault={true} Class='bar-textbox-font-color bar-post-aboutme-contact-local'  width='100%' fontSize={14}>
                            <svg t="1644516323578" className="local-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3489" width="14" height="14"><path d="M544.059897 959.266898h-64.949141c-228.633593 0-415.697442-187.063849-415.697442-415.697442v-64.949141c0-228.633593 187.063849-415.697442 415.697442-415.697442h64.949141c228.633593 0 415.697442 187.063849 415.697442 415.697442v64.949141C959.756315 772.203049 772.692466 959.266898 544.059897 959.266898z" fill="#DB4437" p-id="3490"></path><path d="M305.878574 312.986386h409.365735v387.916361H305.878574V312.986386z" fill="#E67C73" p-id="3491"></path><path d="M310.328379 312.986386h-9.35524c-22.818308 0-41.416161 19.167133-41.416161 42.807621V658.095125c0 23.640488 18.528229 42.807622 41.416161 42.807622h21.951077V420.55373l187.637225 149.370534 187.637225-149.370534v280.349017h21.951077c22.886909 0 41.416161-19.168157 41.416162-42.807622V355.794007c0-23.640488-18.574304-42.807622-41.416162-42.807621h-9.35524L510.561441 484.262947 310.328379 312.986386z" fill="#FFFFFF" p-id="3492"></path></svg> mail: 2000python@gmail.com    
                            </TextChunk>
                            <TextChunk Class='bar-textbox-font-color bar-post-aboutme-contact-local' width='100%' url='https://github.com/2000python' fontSize={14} target='_blank'>
                            <svg t="1644516039423" className="local-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2990" width="14" height="14"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="2991"></path></svg> GitHub: 2000python
                            </TextChunk>
                            <TextChunk isPreventDefault={true} Class='bar-textbox-font-color bar-post-aboutme-contact-local'  width='100%' fontSize={14} onClick={drawerShow.tg} >
                            <svg t="1644517067553" className="local-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5019" width="14" height="14"><path d="M679.428571 746.857143l84-396q5.142857-25.142857-6-36t-29.428571-4L234.285714 501.142857q-16.571429 6.285714-22.571428 14.285714t-1.428572 15.142858 18.285715 11.142857l126.285714 39.428571 293.142857-184.571428q12-8 18.285714-3.428572 4 2.857143-2.285714 8.571429l-237.142857 214.285714-9.142857 130.285714q13.142857 0 25.714285-12.571428l61.714286-59.428572 128 94.285715q36.571429 20.571429 46.285714-21.714286z m344.571429-234.857143q0 104-40.571429 198.857143t-109.142857 163.428571-163.428571 109.142857-198.857143 40.571429-198.857143-40.571429-163.428571-109.142857-109.142857-163.428571T0 512t40.571429-198.857143 109.142857-163.428571T313.142857 40.571429 512 0t198.857143 40.571429 163.428571 109.142857 109.142857 163.428571 40.571429 198.857143z" p-id="5020"></path></svg>Tg: @Tiamon_we
                            </TextChunk>
                        </TextboxChunk>
                    
                </BarChunk>

            </div>
            <ul className='right-posts-chunk'>
                {data.map((item, index) => {
                    const length = Math.floor((data.length - 1 ) / 2);
                    return index <= length ? <li key={index}>
                        <ShowChunk title={`${item.title}`} Class='showchunk-grid' url={item.url}>
                            <TextChunk  Class='show-chunk-title' url={item.classrouter} content={`${item.title}`} fontSize={16} width='100%' alpha={.2} />
                        </ShowChunk>
                    </li> : ''
                })}
            </ul>
            <ul className='right-posts-chunk'>
            {data.map((item, index) => {
                    const length = Math.floor((data.length - 1 ) / 2);
                    return index > length ? <li key={index}>
                        <ShowChunk title={`${item.title}`} Class='showchunk-grid' url={item.url}>
                            <TextChunk Class='show-chunk-title' url={item.classrouter} content={`${item.title}`} fontSize={16} width='100%' alpha={.2} />
                        </ShowChunk>
                    </li> : ''
                })}
            </ul>
        </div>

        <Drawer onClose={drawerClose.wechat} visible={Visible.wechat} title="这是我的微信，来和我击剑呀 🤺" width={900} >
            <div className='post-drawer-center'>
                <div>
                    <ImgChunk url='https://rainsin-1305486451.file.myqcloud.com/img/QR/wechatQR.jpg'></ImgChunk>
                </div>
            </div>
        </Drawer>
        <Drawer onClose={drawerClose.tg} visible={Visible.tg} title="这是我的tg，来和我击剑呀 🤺" width={900}>
        <div className='post-drawer-center'>
                <div>
                    <ImgChunk url='https://rainsin-1305486451.file.myqcloud.com/img/QR/tgQR.png'></ImgChunk>
                </div>
            </div>
        </Drawer>
  </>;
}

export default Posts;
