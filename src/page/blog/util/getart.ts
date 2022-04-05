/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import axios from "axios";

const getArt = (classify:string,id:number):string => {
    let data
    (async function () {
        data = await axios.get(`../detail/${classify}/${id}.md`);
    })()
    return data
}

export default getArt
