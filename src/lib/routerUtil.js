import * as CookieUtil from './cookie';

/**
 * 获取url中的get和hash参数
 *    url注意防止页面的业务参数和uid token重名
 *    url避免get参数和hash参数键值重名，错误事例：?a=1#a=1
 *    不支持键值相同的参数解析，如：?a=1&a=2
 *
 * @returns {{}}
 */
const getCurrentParams = () => {
  const search = location.search.length > 0 ? location.search.substr(1) : '';
  const hashStr = location.hash.length > 0 ? location.hash.substr(1) : '';
  const result = {};
  let paramsStr = '';
  if (search && search.trim() !== '') {
    paramsStr = search.trim();
  }
  if (hashStr && hashStr.trim() !== '') {
    paramsStr += `&${hashStr.trim()}`;
  }
  if (paramsStr) {
    const paramsArray = paramsStr.split('&');
    let param;
    paramsArray.forEach((item) => {
      param = item.split('=');
      if (param[1] && param[1].trim() !== 'undefined') {
        result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
      }
    });
  }
  if (!result.uid || !result.token) {
    const uid = CookieUtil.get('uid');
    const token = CookieUtil.get('token');
    if (uid && token) {
      Object.assign(result, {
        uid,
        token,
      });
    }
  } else {
    // uid token写入cookie
    // CookieUtil.remove('uid');
    // CookieUtil.remove('token');
    CookieUtil.set('uid', result.uid, { path: '/' });
    CookieUtil.set('token', result.token, { path: '/' });
  }
  return result;
};
/**
 * 获取地址栏特定某个参数对应的值
 * @param param 字符串 'uid'
 * 例子： getUrlParam('uid');
 */
const getUrlParam = (param) => {
  const params = getCurrentParams();
  if (params && params[param]) {
    return params[param];
  }
  return undefined;
};

/**
 * 根据文件名和参数获取url地址
 * @param fileName '文件名'
 * @param params 对象{ uid: 'xx',token: 'ss' }
 * @param { Boolean } isHttp 是否强制改为http链接, 后期名片修复样式问题后可清除
 * @param { Object } hashes hashes请求参数
 * 例子： getPageUrl('releaseColumnPreview', { uid: '133', token: 'fdsafdsa' },
 *    false, { uid: '133', token: 'fdsafdsa' });
 */
const getUrl = (fileName, params, hashes) => {
  const origin = location.origin.replace(':55000', '');
  const publicBasePath = require('../../config/router.env');
  let version;
  if (process.env.NODE_ENV.indexOf('production') !== -1 || process.env.NODE_ENV.indexOf('test') !== -1) {
    version = publicBasePath.baseVersionRouter;
  } else {
    version = '/';
  }
  let paramsStr = '';
  if (params) {
    paramsStr = Object.keys(params)
      .filter(key => !!params[key] || typeof params[key] === 'number') // 值可能为零
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    if (paramsStr) {
      paramsStr = `?${paramsStr}`;
    }
  }
  let hashStr = '';
  if (hashes) {
    hashStr = Object.keys(hashes)
      .filter(key => !!hashes[key] || typeof hashes[key] === 'number') // 值可能为零
      .map(key => `${key}=${encodeURIComponent(hashes[key])}`)
      .join('&');
    if (hashes) {
      hashStr = `#${hashStr}`;
    }
  }
  return `${origin}${version}${fileName}.html${paramsStr}${hashStr}`;
};

/**
 * 页面跳转
 * @param fileName '文件名'
 * @param params 对象{ uid: 'xx',token: 'ss' }
 * @param { Boolean } isHttp 是否强制改为http链接, 后期名片修复样式问题后可清除
 * @param { Object } hashes hashes请求参数
 * 例子： goNewHTML('releaseColumnPreview', { uid: '', token: '' });
 */
const goNewHTML = (fileName, params, hashes) => {
  location.href = getUrl(fileName, params, hashes);
};
const goWebHTML = (url) => {
  location.href = `${location.origin}/${url}`;
};
export { getCurrentParams, getUrlParam, goNewHTML, goWebHTML, getUrl };
