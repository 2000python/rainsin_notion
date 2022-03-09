/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import { makeAutoObservable } from 'mobx';
import blogTechData,{blogNotesData,blogCuriousData,blogOtherData} from '../page/blog/api/data';

export const store = makeAutoObservable({
  page_title: ['解忧杂货店'],
  page_path:[{
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
  tianyi_obj: null,
  aliyun_obj: null,
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
  pop_Path(history) {
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
  get_tainyi_obj(fun) {
    this.tianyi_obj = fun();
  },
  get_aliyun_obj(fun) {
    this.aliyun_obj = fun();
  }
})