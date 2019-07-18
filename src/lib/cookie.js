/**
 * @description   cookie 管理中心
 * @author        yq 920819339@qq.com
 * @date          2017-09-21 14:38:03
 */
import Cookies from 'js-cookie';

export const remove = key => Cookies.remove(key);

export const set = (key, value, options) => Cookies.set(key, value, options);

export const get = key => Cookies.get(key);

export const getJson = key => Cookies.getJSON(key);

