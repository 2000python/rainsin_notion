/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import { makeAutoObservable } from 'mobx';
import blogTechData,{blogNotesData,blogCuriousData,blogOtherData} from '../page/blog/api/data';
const store = makeAutoObservable({
  page_title: ['解忧杂货店'],
  page_path: [{
    pathname: '/',
    search: '',
    state: null,
  }],
  page_icon: ['🧠'],
  page_data: [{
    pathname: '/',
    search: '',
    state: null,
    title: '解忧杂货店',
    icon: '🧠',
  }],
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
    palylistdata: [],
    //当前播放url
    src: '',
    //当前播放歌曲专辑图片
    album_img_url: 'https://y.qq.com/music/photo_new/T002R300x300M000002C2T860Yo5Cr_1.jpg?max_age=2592000',
    album_main_color: '',
    now_paly_cid: '1',
    list_data:[],
  },
  list_state: {
    now_select_search_list: true,
    now_select_list_item: [],
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
  //得到播放器
  
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
      store.music.list_data = store.music.palylistdata
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
   change_music_paly() {
    store.music_paly = !store.music_paly;
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
    this.page_title.push(value);
    this.concat_Data()
  },
  push_Icon(value) {
    this.page_icon.push(value);
    this.concat_Data()
  },
  push_Path(value) {
    this.page_path.push(value);
    this.concat_Data()
  },
  pop_Path() {
    this.page_path.pop();
    this.page_title.pop();
    this.page_icon.pop();
    this.page_data.pop();
  },
  popIndex_Path(index,history) {
    index = Number(index);
    this.page_path = this.page_path.slice(0, index + 1);
    this.page_title = this.page_title.slice(0, index + 1);
    this.page_icon = this.page_icon.slice(0, index + 1);
    this.page_data = this.page_data.slice(0, index + 1);
    if (index + 2 === this.page_data.length) {
      history.back()
    }
  },
  concat_Data() {
    let a = this.page_path.map((item, index) => {
      let b = {...item};
      b.title = this.page_title[index];
      b.icon = this.page_icon[index]
      return b
    });
    return this.page_data = a;
  },
  selectBlog_ListData(mid) {
    switch (mid) {
      case 'technology':
        this.blog_detail_list_data = blogTechData;
        break;
      case 'notes':
        this.blog_detail_list_data = blogNotesData;
        break;
      case 'other':
        this.blog_detail_list_data = blogOtherData;
        break;
      case 'curious':
        this.blog_detail_list_data = blogCuriousData
        break;
      default:
        break;
    }
  },
  select_magnet_value(value) {
    this.magnet_param = value
  },
 })
export default store