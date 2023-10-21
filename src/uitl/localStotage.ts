// 设置 setStorage
export const setStorage = (key,value,expire=1) => {
    if (isNaN(expire) || expire < 1) {
        console.error('有效期应为一个有效数值');
        return;
      }
      // 86_400_000一天时间的毫秒数，_是数值分隔符
      const time = expire * 86_400_000;
      const obj = {
        data: value, // 存储值
        time: Date.now(), // 存值时间戳
        expire: time // 过期时间
      };
      // 注意，localStorage不能直接存储对象类型，sessionStorage也一样
      // 需要先用JSON.stringify()将其转换成字符串，取值时再通过JSON.parse()转换回来
      localStorage.setItem(key, JSON.stringify(obj));
}


// 获取 getStorage
export const getStorage = (key) => {
    let val = localStorage.getItem(key);
  // 如果没有值就直接返回invalid无效提示
  if (!val) return 'invalid';
  // 存的时候转换成了字符串，现在转回来
  val = JSON.parse(val);
  // 存值时间戳 +  有效时间 = 过期时间戳
  // 如果当前时间戳大于过期时间戳说明过期了，删除值并返回提示
  if (Date.now() > val.time + val.expire) {
    localStorage.removeItem(key);
    return 'invalid';
  }
  return JSON.parse(val.data);
}




