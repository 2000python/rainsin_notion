/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
/**
 * 搜索磁力 组件
 * @param {String} s 平台
 * @param {*} q 关键词
 * @param {String} p 页数
 * @return {Json}
 */
import axios from "axios";

export async function getMagnet(s = 'btsow', q, p = 1) {
  const value = await axios.get(`http://127.0.0.1:7001/getmagnet?s=${s}&q=${q}&p=${p}`)
  return value
}

function getMagnetParam(){
    const data='<tbody><tr><td>btfuk</td><td>BTFUk</td><td><ahref="//api.jucili.com/api.php?s=btfuk&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>sukebei</td><td>Sukebei</td><td><ahref="//api.jucili.com/api.php?s=sukebei&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>nyaa</td><td>Nyaa</td><td><ahref="//api.jucili.com/api.php?s=nyaa&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>u3c3</td><td>U3C3</td><td><ahref="//api.jucili.com/api.php?s=u3c3&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>magnet</td><td>Magnet</td><td><ahref="//api.jucili.com/api.php?s=magnet&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>btsow</td><td>BTSOW</td><td><ahref="//api.jucili.com/api.php?s=btsow&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>btdigg</td><td>BTDigg</td><td><ahref="//api.jucili.com/api.php?s=btdigg&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>magnetdl</td><td>MagnetDL</td><td><ahref="//api.jucili.com/api.php?s=magnetdl&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>52bt</td><td>52BT</td><td><ahref="//api.jucili.com/api.php?s=52bt&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>1024bt</td><td>1024BT</td><td><ahref="//api.jucili.com/api.php?s=1024bt&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>2048bt</td><td>2048BT</td><td><ahref="//api.jucili.com/api.php?s=2048bt&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>91bt</td><td>91BT</td><td><ahref="//api.jucili.com/api.php?s=91bt&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>sbt</td><td>SbtMagnet</td><td><ahref="//api.jucili.com/api.php?s=sbt&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>bthub</td><td>BTHub</td><td><ahref="//api.jucili.com/api.php?s=bthub&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cililian</td><td>磁力链</td><td><ahref="//api.jucili.com/api.php?s=cililian&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>btfox</td><td>磁力狐</td><td><ahref="//api.jucili.com/api.php?s=btfox&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilimao</td><td>磁力猫</td><td><ahref="//api.jucili.com/api.php?s=cilimao&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>chiliw</td><td>吃力网</td><td><ahref="//api.jucili.com/api.php?s=chiliw&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>wxcili</td><td>无限磁力</td><td><ahref="//api.jucili.com/api.php?s=wxcili&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>yihuag</td><td>移花宫</td><td><ahref="//api.jucili.com/api.php?s=yihuag&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilimm</td><td>磁力妹妹</td><td><ahref="//api.jucili.com/api.php?s=cilimm&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilidi</td><td>磁力帝</td><td><ahref="//api.jucili.com/api.php?s=cilidi&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilixq</td><td>磁力星球</td><td><ahref="//api.jucili.com/api.php?s=cilixq&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilitt</td><td>磁力天堂</td><td><ahref="//api.jucili.com/api.php?s=cilitt&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilizz</td><td>磁力蜘蛛</td><td><ahref="//api.jucili.com/api.php?s=cilizz&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>zhongzis</td><td>种子搜</td><td><ahref="//api.jucili.com/api.php?s=zhongzis&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilishu</td><td>磁力树</td><td><ahref="//api.jucili.com/api.php?s=cilishu&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilihai</td><td>磁力海</td><td><ahref="//api.jucili.com/api.php?s=cilihai&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr><tr><td>cilisou</td><td>磁力搜</td><td><ahref="//api.jucili.com/api.php?s=cilisou&q=images&p=1"target="_blank"rel="noopenernoreferrer">访问</a></td></tr></tbody></table>';
    const exp = /(?<=\<td\>).{1,10}(?=\<\/td\>)/g
    const ss = data.match(exp);
    let key=[], value=[],obj=[];
    ss.forEach((item, index) => {
      if (index % 2 === 0) {
        key.push(item)
      } else {
        value.push(item)
      }
    })
    key.map((v, i) => {
      obj[i] = {
        id: `${i}`,
        param: `${key[i]}`,
        name: `${value[i]}`
      }
    })
    return obj;
}
const magnetParam = getMagnetParam();
  
export default magnetParam;