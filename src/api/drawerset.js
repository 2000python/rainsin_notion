/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import data,{right} from "../components/libraryInfo/API/data";
import Posi_data,{Basic_data,Twisty_data} from "../components/rubik-cube/api/data";


let close = [];
let librarydata = []
let rubikdata = []
let drawerData = {}
function findData(basic,...value) {
    value.forEach(e => {
        e.forEach(el => {
            el.subproject.forEach(item => {
                basic.push(item.classify_en)
                console.log('basic',basic);
            })
        })
    });
    return basic
}
function lastdata(item) {
    item.forEach(i => {
        drawerData[i] = false
    })
    return drawerData
}

export const library = findData(librarydata, data, right)
export const rubik = findData(rubikdata, Posi_data, Twisty_data, Basic_data)

export const keydata = library.concat(rubik)
export const lll = lastdata(keydata)

export default findData