'use strict'
const storage = {
    // 存储
    setLocal: function(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    // 读取
    getLocal: function(key) {
      let value = window.localStorage.getItem(key);
      return JSON.parse(value);
    },
    // 存储
    setSession: function(key, value) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    // 读取
    getSession: function(key) {
      let value = window.localStorage.getItem(key);
      return JSON.parse(value);
    },
    // 删除
    clearOneLocal: function(key) {
      window.localStorage.removeItem(key);
    },
    clearOneSession: function(key) {
      window.sessionStorage.removeItem(key);
    },
    //删除所有
    clearAllLocal: function() {
      window.localStorage.clear();
    },
    clearAllSession: function() {
      window.sessionStorage.clear();
    }
  };
  export  {storage};