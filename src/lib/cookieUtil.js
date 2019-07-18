/**
 * Created by administrato on 2017/6/16.
 */
/*eslint-disable */
import tool from './assertType';

function getBaseHref() {
  const oBase = document.getElementsByTagName('base')[0];
  if (!oBase) {
    return '';
  }
  const href = oBase.getAttribute('href');
  return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, '') : '';
}

function cookieWriter(key, value, options) {
  let path;
  let expires;
  let defaultPath = getBaseHref();
  options = options || {};

  path = tool.isDefined(options.path) ? options.path : defaultPath;
  if (tool.isUndefined(value)) {
    expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
  }
  if (tool.isString(expires)) {
    expires = new Date(expires);
  }
  let str = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  str += expires ? ';expires=' + expires.toUTCString() : '';
  str += path ? ';path=' + path : '';
  str += options.domain ? ';domain=' + options.domain : '';
  str += options.secure ? ';secure' : '';
  document.cookie = str;
}

function cookiesReader() {
  let currentCookie = document.cookie || '',
    index, lastCookies = {}, name;

  let cookieArray = currentCookie.split('; ');
  cookieArray.forEach((cookie) => {
    index = cookie.indexOf('=');
    if (index > 0) {
      name = decodeURIComponent(cookie.substring(0, index));
      lastCookies[name] = decodeURIComponent(cookie.substring(index + 1));
    }
  });
  return lastCookies;
}

function getCookieByKey(key) {
  const lastCookies = cookiesReader();
  for (let i in lastCookies) {
    if (i === key) {
      return lastCookies[i];
    }
  }
  return '';
}

function toJson(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

const $cookie = {
  // 获取cookie
  get: key => getCookieByKey(key),
  // 获取cookie对象
  getObject: key => {
    return getCookieByKey(key) ? JSON.parse(getCookieByKey(key)) : null;
  },
  // 获取全部cookies，allParse 是否完全解析josn
  getAll: (allParse) => {
    if (!allParse) {
      return cookiesReader();
    }
    const lastCookies = cookiesReader();
    lastCookies.map(lastCookie => toJson(lastCookie));
    return lastCookies;
  },
  // 设置或者修改cookie，value是字符串
  put: (key, value, options) => {
    cookieWriter(key, value, options);
  },
  // 设置或者修改cookie,value是对象
  putObject: (key, value, options) => {
    value = JSON.stringify(value);
    cookieWriter(key, value, options);
  },
  // 移除cookie
  remove: (key, options) => {
    cookieWriter(key, undefined, options);
  },
  // 移除全部cookies
  removeAll: (options) => {
    const cookies = cookiesReader();
    // let keys = Object.keys(cookies);
    Object.keys(cookies).forEach((key) => {
      this.remove(key, options);
    });
  }
};
export default $cookie;
