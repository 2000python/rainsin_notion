/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState,useRef, useContext, useMemo } from 'react';
import axios from 'axios';
import TextChunk,{TextButtonChunk} from './text-chunk';
import Tag from '../tag/tag';
import './music-chunk.css'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import list_data from '../nav/api';
import { Link } from 'react-router-dom';
import BetterScroll from 'better-scroll';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Loading from '../loading';

const classNames = require('classnames');

const music_tag = [
  {
    id: 1,
    name: '周杰伦',
    color: 'yellow'
  },
  {
    id: 2,
    name: '七里香',
    color: 'green'
  },
  {
    id: 3,
    name: '仙剑奇侠传',
    color: 'yellow'
  },
  {
    id: 4,
    name: '米兰的小铁匠',
    color: 'green'
  },
  {
    id: 5,
    name: '乱舞春秋',
    color: 'blue'
  },
  {
    id: 6,
    name: '印第安老斑鸠',
    color: 'purple'
  },
  {
    id: 7,
    name: '任然',
    color: 'pink'
  },
  {
    id: 8,
    name: '以父之名',
    color: 'red'
  },
  {
    id: 9,
    name: '花海',
    color: 'brown'
  },
  {
    id: 10,
    name: '依然范特西',
    color: 'yellow'
  },
  {
    id: 11,
    name: '一路向北',
    color: 'blue'
  },
  {
    id: 12,
    name: '11月的萧邦',
    color: 'green'
  },
]

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const MusicPlayerSlider = observer(function MusicPlayerSliderUI() {
  const theme = useTheme();
  const context = useContext(Context);
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  useMemo(() => {
    const p = document.getElementsByTagName('audio');
    if (paused) {
      console.log(p);
    } else {
      console.log(p);
    }
  },[paused])
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="can't win - Chilling Sunday"
              src="/static/images/sliders/chilling-sunday.jpg"
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Jun Pulse
            </Typography>
            <Typography noWrap>
              <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&:before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
  );
})


/**
 * 音乐列表项目 组件
 * @param {Array} data 数据
 * @return {ReactComponent}
 */

function MusicListItem(props) {
  const context = React.useContext(Context);
  const [isS, setIss] = useState(false);
  const item_ref = useRef(null)
  const data = props.data ? props.data : [];
  const paly_item = e => {
    e.preventDefault()
    context.set_music_now_src(data.mp3)
  }
  const handleS = () => {
    if (isS) {
      setIss(false)
      context.set_music_palylistdata_add_del('delete',data)
    } else {
      setIss(true)
      context.set_music_palylistdata_add_del('add', data)
    }
  }
  return <>
    <Link to='/' ref={item_ref} data-obj={data} className='music-list-thead-detial' onClick={paly_item}>
            <li>
              <TextButtonChunk alpha={.9} onClick={handleS} isPreventDefault={true} isStopPropagation={true}>
          {isS ? <svg t="1651068879181" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2058" width="200" height="200"><path d="M726.976697 393.184142c-12.54369-12.447359-32.831716-12.320065-45.248112 0.25631L448.447252 629.248757l-103.26354-106.112189c-12.352748-12.703669-32.60809-12.927295-45.248112-0.639914-12.672705 12.320065-12.959978 32.60809-0.639914 45.248112l126.016611 129.503454c0.063647 0.096331 0.192662 0.096331 0.25631 0.192662 0.063647 0.063647 0.096331 0.192662 0.159978 0.25631 2.016073 1.983389 4.512082 3.19957 6.880796 4.544765 1.247144 0.672598 2.239699 1.792447 3.519527 2.303346 3.872168 1.599785 8.000645 2.399677 12.096439 2.399677 4.06483 0 8.12794-0.799892 11.967424-2.33603 1.247144-0.512619 2.208735-1.536138 3.392232-2.176052 2.399677-1.343475 4.895686-2.528692 6.944443-4.544765 0.063647-0.063647 0.096331-0.192662 0.192662-0.25631 0.063647-0.096331 0.159978-0.127295 0.25631-0.192662l256.223626-259.008628C739.647682 425.888563 739.520387 405.631501 726.976697 393.184142z" p-id="2059" fill="#e6e6e6"></path><path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z" p-id="2060" fill="#e6e6e6"></path></svg>
            : <svg t="1647442124461" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="56930" width="200" height="200"><path d="M818.655 971.545h-613.312c-84.303 0-152.886-66.343-152.886-147.89v-623.306c0-81.549 68.585-147.89 152.886-147.89h613.312c84.303 0 152.886 66.342 152.886 147.89v623.306c0 81.548-68.585 147.89-152.886 147.89zM205.345 123.155c-45.318 0-82.19 34.628-82.19 77.191v623.306c0 42.564 36.869 77.191 82.19 77.191h613.312c45.318 0 82.19-34.627 82.19-77.191v-623.306c0-42.563-36.869-77.191-82.19-77.191h-613.312z" fill="#e6e6e6" p-id="56931"></path></svg>}
              </TextButtonChunk>
            </li>
          
            <li>
              {data.songName}
            </li>

            <li>
              {data.artist}
            </li>
        </Link>
  </>
}

/**
 * 音乐列表 组件
 * @return {ReactComponent}
 */

function MusicList() {
  const context = React.useContext(Context);
  React.useEffect(() => {
    context.set_search_data_list(list_data);
    context.set_music_list()
  },[context.music.searchlistdata])
  return <>
    <div className='music-list'>
      <ul className='music-list-thead-first'>
        <li>
        <TextButtonChunk alpha={0.9} Class='music-list-font-color music-list-search-list-box' svgwidth={18} title='添加到播放列表'>
            <svg t="1647439329902" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55804" width="200" height="200"><path d="M842 62H182c-66 0-120 54-120 120v660c0 66 54 120 120 120h660c66 0 120-54 120-120V182c0-66-54-120-120-120z m30 750c0 33-27 60-60 60H212c-33 0-60-27-60-60V212c0-33 27-60 60-60h600c33 0 60 27 60 60v600z" fill="#e6e6e6" p-id="55805"></path><path d="M737 467H557V287c0-24.8-20.2-45-45-45s-45 20.2-45 45v180H287c-24.8 0-45 20.2-45 45s20.2 45 45 45h180v180c0 24.8 20.2 45 45 45s45-20.2 45-45V557h180c24.8 0 45-20.2 45-45s-20.2-45-45-45z" fill="#e6e6e6" p-id="55806"></path></svg>
            {context.music_unfold ? '添加到' : ''}
        </TextButtonChunk>
        </li>
        <div>
        <li>
              <TextButtonChunk alpha={0.9} Class='music-list-font-color music-list-search-list-box' svgwidth={24} content='搜索列表'>
              <svg t="1647313946609" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1186" width="200" height="200"><path d="M736 352a32 32 0 0 1 31.264 25.088c4.384 18.816 9.792 32.256 15.232 39.712l2.336 3.008c0.8 0.896 1.088 1.024 1.28 1.024 46.624 0 65.76 39.68 65.088 101.024a32 32 0 0 1-64-0.704c0.192-16.32-1.344-28.16-3.776-34.944l-0.608-1.504-1.92-0.032a65.088 65.088 0 0 1-12.896-2.24V736c0 57.824-66.816 96-144 96S480 793.824 480 736s66.816-96 144-96c29.184 0 56.864 5.44 80.032 15.36L704 384.704c0-1.408 0.032-2.816 0.192-4.224L704 384a32 32 0 0 1 32-32zM416 704a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h192z m208 0c-46.528 0-80 19.136-80 32s33.472 32 80 32 80-19.136 80-32-33.472-32-80-32zM544 448a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h320z m256-256a32 32 0 0 1 0 64H224a32 32 0 1 1 0-64h576z" p-id="1187" fill="#e6e6e6"></path></svg>
              </TextButtonChunk>
            </li>
            <li>
              <TextButtonChunk alpha={0.9} Class='music-list-font-color' content='播放列表' svgwidth={24}>
              <svg t="1647313903483" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="980" width="200" height="200"><path d="M608.352 442.176a64 64 0 0 1 33.92 9.728l163.648 102.272a64 64 0 0 1 0 108.544l-163.648 102.272a64 64 0 0 1-97.92-54.272v-204.544a64 64 0 0 1 64-64zM448 704a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h224z m160.352-197.824v204.544l163.648-102.272-163.648-102.272zM448 448a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h224z m352-256a32 32 0 0 1 0 64H224a32 32 0 1 1 0-64h576z" p-id="981" fill="#dbdbdb"></path></svg>
              </TextButtonChunk>
            </li>
        </div>
          </ul> 
        <div className='music-list-thead'>  
          <ul className='music-list-thead-detial'>
            <li>
              <TextButtonChunk>
              <svg t="1647062973284" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3143" width="200" height="200"><path d="M818.655 971.545h-613.312c-84.303 0-152.886-66.343-152.886-147.89v-623.306c0-81.549 68.585-147.89 152.886-147.89h613.312c84.303 0 152.886 66.342 152.886 147.89v623.306c0 81.548-68.585 147.89-152.886 147.89zM205.345 123.155c-45.318 0-82.19 34.628-82.19 77.191v623.306c0 42.564 36.869 77.191 82.19 77.191h613.312c45.318 0 82.19-34.627 82.19-77.191v-623.306c0-42.563-36.869-77.191-82.19-77.191h-613.312z" fill="#515151" p-id="3144"></path></svg>
              </TextButtonChunk>
            </li>
          
            <li>
              歌曲
            </li>

            <li>
              歌手
            </li>
            {context.music_unfold ? <>
              <li>专辑</li>
              <li>操作</li>
            </>
              
              :
              <></>
            }
          </ul>
          
        </div>
        <div className='music-list-tbody'>
        {context.music.list_data ? context.music.list_data.map((item,index) => <MusicListItem key={index} cid={item.copyrightId} data={item}></MusicListItem>) : <Loading></Loading>}
        </div>
      </div>
  </>
}
//播放器控件
export const MusicControl = observer({
  //控件展开类名
  musicControlUnfoldClass: {
    music: 'music-box-unfold',
    music_palyer: 'music-palyer-box-unfold',
    play_box_state: 'play-state-box-unfold',
    play_box_progress_bar: "play-progress-box-unfold",
    music_list_table:'music-list-table-unfold',
  },
  //控件收缩类名
  musicControlShrinkClass: {
    music: 'music-box-shrink',
    music_palyer: 'music-palyer-box-shrink',
    play_box_state: 'play-state-box-shrink',
    play_box_progress_bar: "play-progress-box-shrink",
    music_list_table:'music-list-table-shrink',
  },
})
//播放器组件
  /**
   * 音乐播放器 组件
   * @return {ReactComponent}
   */

function ReactAudioPlayer(props) {
  const context = React.useContext(Context)
  const player = useRef();
  useEffect(() => {
    context.get_player(player.current);
    context.Player.addEventListener('loadedmetadata', (event) => {
      context.set_audio_time()
    })
    
  },[])
  return <>
      <audio {...props} ref={player}>
    </audio>
    <MusicPlayerSlider></MusicPlayerSlider>
    </>
}

  /**
   * 音乐块 组件
   * @return {ReactComponent}
   */

async function handleSearch(e,key, limit = 30, offset = 1, type = 2) {
  return await axios(`http://rainsin.yicp.top/music?key=${key}&limit=${limit}&offset=${offset}&type=${type}`)
}

function MusicChunk(props) {
  const [searchValue, setSearchValue] = useState('');
  const onUnfold = props.onUnfold ? props.onUnfold : null;
  const methods = React.useContext(Context);
  const search_tag = (e, key, limit = 30, offset = 1, type = 2) => {
    (async function () {
      const data = await axios(`http://rainsin.yicp.top/music?key=${e.target.textContent}&limit=${limit}&offset=${offset}&type=${type}`)
    })(methods, axios, limit, offset, type);
  }
  // useEffect(() => {
  //   let limit=20, offset=1, type=2,key='周杰伦'
  //   (async function () {
  //     const data = await axios(`http://rainsin.yicp.top/music?key=${key}&limit=${limit}&offset=${offset}&type=${type}`)
  //     setListData(data.data.data.musics)
  //   })(methods, axios,limit=20, offset=1, type=2,key);
  // },[])
  const isPlay = () => {
    methods.change_music_play();
  }
  const isPause = () => {
    methods.change_music_play();
  }
  useEffect(() => {
    (
      async function () {
        const color = await axios.get(`http://rainsin.yicp.top/getImg?url=${methods.music.album_img_url}`);
        methods.music.album_main_color = `rgb(${color.data.join()})`
      }
    )()
  }, []);
  useEffect(() => {
    methods.Player.addEventListener("playing", function(){
        methods.set_music_play(true);
    });
    methods.Player.addEventListener("pause", function(){
      methods.set_music_play(false);
  });
  }, [])
  useEffect(() => {
    searchInput.current.addEventListener('keydown', (e) => {
      if (document.activeElement.id === 'search' && e.key === "Enter") {
        
      }
    })
  },[])
  const searchInput = useRef(null)
  const search = () => {

  }
  return <>
    <div className={'music-chunk ' + methods.music_unfold_class.border_radius_init}>
      <div className='music-chunk-meck' style={{backgroundImage:'url('+ methods.music.album_img_url +')'}}></div>
      <div className={'music-chunk-content ' + methods.music_control_class.music} >
        <div className='music-chunk-content-unfold'>
          <input ref={searchInput} id='search' type='search' value={searchValue} placeholder='输入歌名/歌手' onChange={e => setSearchValue(e.target.value)}></input>
          {/* <Button variant="contained" onClick={search}>搜索</Button> */}
        </div>
      <div className='music-chunk-tag'>
        {music_tag.map((item, index) => {
          return <TextChunk onClick={search_tag} key={index} isPreventDefault={true} fontSize={17} lineheight='_'><Tag color={item.color}>{item.name}</Tag></TextChunk>
        })}
        </div>
          <div className={'album-list-box ' + + methods.music_unfold_class.music_list_table}>
            <MusicList></MusicList>
        </div>
        <div className={'react-audio-player-box ' + methods.music_control_class.music_palyer}>
        <ReactAudioPlayer
        className='react-audio-player'
        src={ methods.music.src}
        autoPlay={true}
        onPlay={isPlay}
        onPause={isPause}
        header='反方向的钟'
      />
        </div> 
      </div>
      
      </div>
      
  </>
}

export default observer(MusicChunk);