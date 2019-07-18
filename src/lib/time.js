// function padLeftZero(str) {
//   return (`00${str}`).substr(str.length);
// }
// export function formatDate(date, fmt) {
//   const data = new Date(date); //如果date为10位不需要乘1000
//   const Y = data.getFullYear() + '-';
//   const M = (data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1) + '-';
//   const D = (data.getDate() < 10 ? '0' + (data.getDate()) : data.getDate()) + ' ';
//   const h = (data.getHours() < 10 ? '0' + data.getHours() : data.getHours()) + ':';
//   const m = (data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()) + ':';
//   const s = (data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds());
//   return Y + M + D + h + m + s;
  // if (/(y+)/.test(fmt)) {
  //   fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}''`).substr(4 - RegExp.$1.length));
  // }
  // const o = {
  //   'M+': date.getMonth() + 1,
  //   'd+': date.getDate(),
  //   'h+': date.getHours(),
  //   'm+': date.getMinutes(),
  //   's+': date.getSeconds()
  // };
  // for (let k = 0; k < o;) {
  //   if (new RegExp(`(${k})`).test(fmt)) {
  //     const str = `${o[k]}''`;
  //     fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
  //   }
  // }
  // return fmt;
// }

