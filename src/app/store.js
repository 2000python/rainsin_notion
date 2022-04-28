/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import { makeAutoObservable } from 'mobx';
import blogTechData,{blogNotesData,blogCuriousData,blogOtherData} from '../page/blog/api/data';
const store = makeAutoObservable({
  page_title: '解忧杂货店',
  page_icon: '🧠',
  blog_detail_list_data: [],
  magnet_param: 'u3c3',
  //音乐播放器播放状态
  music_paly: false,
  //鼠标是否经过
  music_mouse: false,
  //双击事件计时器 防止单击事件触发
  click_timer: null,
  Player: null,
  //播放器状态
  music: {
    //搜索数据
    searchlistdata: [],
    //播放列表
    palylistdata: new Map().set("60054701942",{
      "songName": "园游会",
      "isHdCrbt": null,
      "albumName": "七里香",
      "has24Bitqq": "1",
      "hasMv": "1",
      "artist": "周杰伦",
      "hasHQqq": "1",
      "albumId": "7949",
      "title": "园游会",
      "singerName": "周杰伦",
      "cover": "https://mcontent.migu.cn/newlv2/new/album/20200918/7949/s_XqFeoZdGOiPaNgY8.jpg",
      "mp3": "https://freetyst.nf.migu.cn/public%2Fproduct9th%2Fproduct42%2F2020%2F10%2F1310%2F2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF%2F%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC%2FMp3_64_22_16%2F60054701942102021.mp3?Key=e2feac9e5a07f0c2&Tim=1647421790875&channelid=01&msisdn=34aed8811de04c9ea257d8738d73e1dc",
      "hasSQqq": "1",
      "has3Dqq": null,
      "singerId": "112",
      "mvCopyrightId": "600570Y6598",
      "copyrightId": "60054701942",
      "unuseFlag": null,
      "auditionsFlag": "7",
      "auditionsLength": null,
      "mvId": "600906000000389501",
      "id": "1508",
      "lyrics": "https://tyqk.migu.cn/files/lyric/2022-01-03/b799acbcaa93434a8dea441556f4d590.lrc"
  }),
    //当前播放url
    src: '',
    //当前播放歌曲专辑图片
    album_img_url: '',
    album_main_color: '',
    
    now_paly_cid: '1',
    list_data: '',
    loop_mode: 'order',
    last_volume: 30,
    volume: 0.5,
    is_volume_show: false,
    audio_time: 0,
    current_time: 0,

    author: '',
    album: '',
    title: '',
  },
  music_search_pgt: 0,
  music_search_offset: 1,
  
  list_state: {
    now_select_search_list: true,
    now_select_list_item: new Map(),
    is_all_select: false,
    select_item_search: [],
    select_item_paly: [],
  },
  //播放器控件类名
  music_control_class: {},
  //播放器是否展开
  music_unfold: false,
  //播放器对应状态的类名
  music_unfold_class: {},
  //得到图片的主色调
  imgColor: [],
  
  magnet: {
    unfold: false,
  },
  blog_index_data: [],

  //以下为action函数
  set_music_search_pgt(value) {
    store.music_search_pgt = value
  },

  set_list_state_now_select_list_item(actions,key,value) {
    switch (actions) {
      case 'set':
        if (store.list_state.now_select_list_item.has(key)){
          return -1
        } else {
          store.list_state.now_select_list_item.set(key,value)
        }
        break;
      case 'delete':
        store.list_state.now_select_list_item.delete(key)
        break;
      default:
        return 1
    }
  }
  ,
  set_blog_index_data(value) {
    store.blog_index_data = value
  },
  //设置标题、作者、专辑、src
  set_music_title(v) {
    store.music.title = v
  },
  set_music_author(v) {
    store.music.author = v
  },
  set_music_album(v) {
    store.music.album = v
  },
  set_music_now_src(v) {
    store.music.src = v;
   },
  set_music_url_img(v) { 
    store.music.album_img_url = v
  },

  set_audio_time() {
    store.music.audio_time = store.Player.duration;
  },

  set_current_time(value, event) {
    if (event !== true) {
      store.Player.currentTime = value;
    }
    store.music.current_time = value;
  },

  set_last_volume(value) {
    store.music.last_volume = value
  },

  set_music_volume(value) {
    store.music.volume = value;
    store.Player.volume = value;
  },

  set_music_volume_show() {
    store.music.is_volume_show = !store.music.is_volume_show;
  },
  //设置磁力组件显示
  set_magnet_unfold(e) {
    store.magnet.unfold = !store.magnet.unfold;
    if (store.magnet.unfold) {
          e.style.overflow = 'hidden';
      }else{
          e.style.overflow = 'auto';
      }
  },
  set_music_palylistdata_add_del(actions, key, value) {
    switch (actions) {
      case 'set':
        if (store.music.palylistdata.has(key)) {
          return -1
        } else {
          store.music.palylistdata.set(key,value)
        }
        break;
      case 'delete':
        store.music.palylistdata.delete(key)
        break;
      default:
        return 1
    }
  },
  //设置音乐搜索数据列表
  set_search_data_list(value) {
    store.music.searchlistdata = value;
  },
  //改变音乐展示数据列表
  change_music_list() {
    store.list_state.now_select_search_list = !store.list_state.now_select_search_list;
  },
  //设置音乐展示数据列表
  set_music_list() {
    if (store.list_state.now_select_search_list) {
      store.music.list_data = store.music.searchlistdata
    } else {
      store.music.list_data = Array.from(store.music.palylistdata)
    }
  },
  //改变是否全部选择音乐项目
  change_select_all_item() {
    store.list_state.is_all_select = !store.list_state.is_all_select;
  },
  //得到音乐播放器
  get_player(e) {
    store.Player = e
  },
  //设置音乐控件跟随展开状态的类名
  set_music_control_class(class_object) {
    store.music_control_class = {
      ...class_object,
    }
  },
  //设置音乐盒子展开状态的类名
  set_music_unfold_class(class_object) {
    store.music_unfold_class = {
      ...class_object,
    }
  },
  //改变音乐盒子的展开状态
  change_music_unfold() {
    store.music_unfold = !store.music_unfold; 
  },
  //设置搜索列表数据
   set_music_search_list(musics) {
      store.music.searchlistdata = musics
  },
   //改变播放器状态
   change_music_play() {
    store.music_paly = !store.music_paly;
  },
  set_music_play(bool) {
    store.music_paly = bool;
   },
   //改变音乐播放状态
   change_nav_music_paly(e) {
     if (store.music_paly) {
       e.pause();
     } else {
       e.play();
     }
    // store.music_paly = !store.music_paly;
  },
  push_Title(value) {
    store.page_title = value;
  },
  push_Icon(value) {
    store.page_icon= value;
  },
  selectBlog_ListData(mid) {
    switch (mid) {
      case 'technology':
        store.blog_detail_list_data = blogTechData;
        break;
      case 'notes':
        store.blog_detail_list_data = blogNotesData;
        break;
      case 'other':
        store.blog_detail_list_data = blogOtherData;
        break;
      case 'curious':
        store.blog_detail_list_data = blogCuriousData
        break;
      default:
        break;
    }
  },
  select_magnet_value(value) {
    store.magnet_param = value
  },
 })
export default store