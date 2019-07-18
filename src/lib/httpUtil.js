/**
 * @description http请求组件
 * @author yq
 * @date 2017/6/8 下午12:53
 */
import axios from 'axios';
import * as Cookies from './cookie'

// import { uidKey, tokenKey, userKey, } from '../../config/global';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Add a response interceptor
axios.interceptors.response.use((response) => {
  // Do something with response data
  if (response.status === 401 || (response.data && [401, 1301].includes(response.data.code))) {
    // TOKEN失效
    // Cookies.remove(uidKey);
    // Cookies.remove(tokenKey);
    // Cookies.remove(userKey);
    // 跳转到登录页面
    // location.href = `/login?redirect=${encodeURIComponent(location.href)}`;
    // 以下逻辑用于处理网络缓慢时的弹窗提醒
    return Promise.reject({
      code: 401,
      msg: '登录身份过期，请重新登录',
    });
  }
  return response;
  // Do something with response error
}, Promise.reject);

const HTTPERROR = {
  code: 500,
  msg: '请求失败，请稍后再试',
};

class HttpUtil {

  /**
   * http请求参数格式化方法
   * HttpUtil.formatParams({
   *    uid: 1101
   * })
   * @param opts 需要处理的json对象，例如： { uid: 1101 }
   * @param {Boolean}  deepEncode 深度encode,特殊情况下，如请求参数中包含富文本时，须深度encode
   * @returns {String}
   */
  static formatParams(opts, deepEncode) {
    if (!opts || typeof opts !== 'object') {
      throw new Error('请求参数不正确');
    }
    return deepEncode ? encodeURIComponent(encodeURIComponent(JSON.stringify(opts)))
      : encodeURIComponent(JSON.stringify(opts));
  }

  /**
   * http请求通用方法 调用方法
   * // get请求实例
   * HttpUtil.send({
   *    method: 'get'
   *    url: 'http://api.test.hrzan.com:55000/j2/fa/family/find/type,
   *    query: {
   *      token: 'bc77df1ee3f59670fbee79cfa344efc1',
   *      uid: 10423
   *    }
   * })
   * // post请求实例
   * HttpUtil.send({
   *    method: 'post'
   *    url: 'http://api.test.hrzan.com:55000/j2/fa/family/find/type,
   *    data: {
   *      token: 'bc77df1ee3f59670fbee79cfa344efc1',
   *      uid: 10423
   *    }
   * })
   * // 路径中有参数的请求, params中的key必须和路径总保持一致
   * HttpUtil.send({
   *    method: 'post'
   *    url: 'http://api.test.hrzan.com:55000/j2/user/:userId,
   *    params: {
   *      userId: 10423
   *    },
   *    data: {
   *      token: 'bc77df1ee3f59670fbee79cfa344efc1',
   *      uid: 10423
   *    }
   * })
   *  // post 图片上传
   * HttpUtil.send({
   *    headers = {
   *      'Content-Type': 'multipart/form-data'
   *    },
   *    method: 'post',
   *    encode: false,
   *    url: 'http://api.test.hrzan.com:55000/p/common/uploadImage,
   *    data: formData(文件表单数据)
   * })
   * @param opts
   * @-- {Boolean}  opts.deepEncode 深度encode，特殊情况下，如请求参数中包含富文本时，须深度encode
   * @-- {Boolean}  opts.encode 参数是否进行encode
   * @-- {String}  opts.method 请求方法
   * @-- {String}  opts.url 请求url
   * @-- {String}  opts.data 请求数据,body中的参数
   * @-- {String}  opts.query 请求数据,query中的参数
   * @returns {*}
   */
  static send(opts) {
    console.log('-------------开始请求');
    console.log(opts);
    if (!opts) {
      throw new Error('请求参数不正确');
    }
    if (!opts.method
      || !['get', 'post', 'delete', 'patch', 'put'].includes(opts.method)) {
      throw new Error('请求方式不正确');
    }
    if (!opts.url) {
      throw new Error('请求路径不能为空');
    }
    if (opts.method === 'get') {
      opts.query = Object.assign({}, opts.query);
    } else if (!opts.headers || opts.headers['Content-Type'] !== 'multipart/form-data') {
      opts.data = Object.assign({}, opts.data);
    }
    // 请求配置
    const sendOpts = {
      method: opts.method,
      url: opts.url,
      timeout: opts.timeout || 30000,
    };
    if (opts.responseType) {
      sendOpts.responseType = opts.responseType;
    }
    if (opts.headers) {
      sendOpts.headers = opts.headers;
    }
    if(opts.isacessToken) {
      // sendOpts.headers['access_token'] = '9ian565jc56630jqcmm2ai32mc9nj437';
      // sendOpts.headers['access_token'] = opts.headers['access_token'];
      sendOpts.headers = opts.headers;
    }
    // params参数处理
    if (opts.params) {
      Object.keys(opts.params)
        .forEach(key => opts.url.replace(`:${key}`, opts.params[key]));
    }
    // 是否转码，默认为true
    opts.encode = typeof opts.encode === 'boolean' ? opts.encode : true;
    if (opts.encode) {
      // url参数，如get请求中/n/qrcode?json=encodeURIComponent(JSON.stringify({ uid: 1101 }))中，query为 { uid: 1101 }
      if (opts.query) {
        sendOpts.url = opts.url.indexOf('?') === -1 ?
          `${opts.url}?json=${HttpUtil.formatParams(opts.query)}`
          : `${opts.url}&json=${HttpUtil.formatParams(opts.query)}`;
      }
      if (opts.data) {
        sendOpts.data = `${encodeURIComponent('json')}=${HttpUtil.formatParams(opts.data, opts.deepEncode)}`;
      }
    } else {
      if (opts.query) {
        const query = Object.keys(opts.query)
          .map(key => `${key}=${opts.query[key]}`)
          .join('&');
        sendOpts.url = opts.url.indexOf('?') === -1
          ? `${opts.url}?${query}`
          : `${opts.url}&${query}`;
      }
      if (opts.data) {
        sendOpts.data = opts.data;
      }
    }

    return axios(sendOpts)
      .then(result => result.data)
      .catch((error) => {
        if (error.code) {
          return Promise.reject(Object.assign(error, HTTPERROR));
        }
        // 可在此处做通用错误处理
        const errorInfo = Object.assign({ error }, HTTPERROR);
        const errMsg = error.message || '';
        if (errMsg.indexOf('Network Error') !== -1) {
          // 网络错误
          errorInfo.msg = '网路存在异常，请检查网路后再试';
        } else if (errMsg.indexOf('timeout') !== -1) {
          // 请求超时
          errorInfo.msg = '请求超时，请稍后再试';
        } else {
          // 其它
          errorInfo.msg = '请求失败，请稍后再试';
        }
        return Promise.reject(errorInfo);
      });
  }


  static newSend(opts) {
    if (!opts) {
      throw new Error('请求参数不正确');
    }
    if (!opts.method
      || !['get', 'post', 'delete', 'patch', 'put'].includes(opts.method)) {
      throw new Error('请求方式不正确');
    }
    if (!opts.url) {
      throw new Error('请求路径不能为空');
    }
    opts.handlers = {
      'x-code': 'OYGH01',
      'x-version': '8.0.9',
      'x-channel': 'h5',
      'x-timestamp': new Date().valueOf(),
      'Content-Type': 'application/json',
      'Data-Type': 'json'
    };
    if (opts.method === 'get') {
      opts.query = Object.assign({}, opts.query);
    } else if (!opts.headers || opts.headers['Content-Type'] !== 'multipart/form-data') {
      opts.data = JSON.stringify(Object.assign({}, opts.data));
    }
    // 请求配置
    const sendOpts = {
      method: opts.method,
      url: opts.url,
      timeout: opts.timeout || 30000,
    };
    axios.defaults.headers = opts.handlers;
    if (opts.isToken) {
      axios.defaults.headers['x-token'] = Cookies.get('otoken');
    }
    // axios.defaults.headers['x-token'] ='GHT:325F786CC07548B3A293E558E9F31B8B';
    if (opts.responseType) {
      sendOpts.responseType = opts.responseType;
    }
    // 是否转码，默认为false
    opts.encode = typeof opts.encode === 'boolean' ? opts.encode : false;
    if (opts.encode) {
      // url参数，如get请求中/n/qrcode?json=encodeURIComponent(JSON.stringify({ uid: 1101 }))中，query为 { uid: 1101 }
      if (opts.query) {
        sendOpts.url = opts.url.indexOf('?') === -1 ?
          `${opts.url}?${HttpUtil.formatParams(opts.query)}`
          : `${opts.url}&${HttpUtil.formatParams(opts.query)}`;
      }
      if (opts.data) {
        sendOpts.data = `${HttpUtil.formatParams(opts.data, opts.deepEncode)}`;
      }
    } else {
      if (opts.query) {
        const query = Object.keys(opts.query)
          .map(key => `${key}=${opts.query[key]}`)
          .join('&');
        sendOpts.url = opts.url.indexOf('?') === -1
          ? `${opts.url}?${query}`
          : `${opts.url}&${query}`;
      }
      if (opts.data) {
        sendOpts.data = opts.data;
      }
    }
    return axios(sendOpts).then(result => result.data)
      .catch((error) => {
        if (error.code) {
          return Promise.reject(Object.assign(error, HTTPERROR));
        }
        // 可在此处做通用错误处理
        const errorInfo = Object.assign({ error }, HTTPERROR);
        const errMsg = error.message || '';
        if (errMsg.indexOf('Netwok Error') !== -1) {
          // 网络错误
          errorInfo.msg = '网路存在异常，请检查网路后再试';
        } else if (errMsg.indexOf('timeout') !== -1) {
          // 请求超时
          errorInfo.msg = '请求超时，请稍后再试';
        } else {
          // 其它
          errorInfo.msg = '请求失败，请稍后再试';
        }
        return Promise.reject(errorInfo);
      });
  }
}

export default HttpUtil;
