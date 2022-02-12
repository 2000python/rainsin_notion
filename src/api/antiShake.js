/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
const antiShake = (func,wait = 50) => {
    let clock = 0;
    return function (...args){
      //如果设置了计时器，则清空计时器
      if(clock) clearTimeout(clock);
      //设置计时器
      clock = setTimeout(()=>{func.apply(this,args)},wait)
    }
 }
export default antiShake;