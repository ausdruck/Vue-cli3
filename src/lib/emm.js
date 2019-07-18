/**
 * 注：“成功输出”指的是接口执行成功回调函数的入参，“失败输出”指的是接口执行失败回调函数的入参
 *      失败输出统一为：
 *          {"msg":"失败信息"}
 * Created by chaozhong on 2015/11/25.
 * */

/*
 * JS API最终执行函数，JavaScript和原生功能交互桥梁
 *
 * @param apiName:字符串，接口名
 * @param param:字符串或JSON，调用接口需要传递的参数
 * @param oncallback:字符串，接口调用成功回调函数名
 * @param errorcallback:字符串，接口调用失败回调函数名
 * */
/* eslint-disable */
function _execute
(invokeID, apiName, param, successCallBackName, failedCallBackName) {
  try {
    if (param && typeof param !== 'string') {
      param = JSON.stringify(param)
    }
  } catch (e) {
    throw new Error(e.message)
  }
  var src = 'emm-services://?action=jsfunction' + '&invokeID=' + (invokeID || '') + '&apiname=' + (apiName || '')
    + "&param=" + encodeURIComponent(param || "")
    + "&oncallback=" + (successCallBackName || "")
    + "&errorcallback=" + (failedCallBackName || "");
  var element = document.createElement("iframe");
  element.setAttribute("src", src);
  element.setAttribute("style", "display:none");
  element.setAttribute("width", "0px");
  element.setAttribute("height", "0px");
  element.setAttribute("frameborder", "0px");
  document.body.appendChild(element);
  element.parentNode.removeChild(element);

  // console.info("successCallBackName", successCallBackName);
  // console.info("failedCallBackName", failedCallBackName);
  // console.info("invokeID", invokeID);
} 

/*
 * 定义全局变量，接口回调函数的引用皆保存于此
 * */
window.JQAPICallBack = {
  callBackObjects: {},
  //  接口执行成功回调
  successCallBack: function (invokeID, data) {
    this.callBackObjects[invokeID].successCallBack(data);
    delete this.callBackObjects[invokeID];
  },
  //  接口执行失败回调
  failedCallBack: function (invokeID, data) {
    this.callBackObjects[invokeID].failedCallBack(data);
    delete this.callBackObjects[invokeID];
  }
};

/*
 * JS API创建工厂，JS API每被调用一次，创建一个实例，该实例保存API回调函数的引用
 * */
function JQAPIFactory(invokeID, APIName, param, successCallBack, failedCallBack) {
  if (typeof  successCallBack !== "function" || typeof  failedCallBack !== "function") {
    throw new Error("callback must be a function.");
  }
  this.successCallBack = successCallBack;
  this.failedCallBack = failedCallBack;
  _execute(invokeID, APIName, param, "JQAPICallBack.successCallBack", "JQAPICallBack.failedCallBack");
}

window.JQAPI = {

  /**
   * 获取用户信息
   * 成功输出：（返回字段供参考）
   *   {
   *       "userId":"用户id",
   *       "userName":"用户账号",
   *       "passWord":"登录密码（EMM下无效）"
   *   }
   * */
  jqGetUserInfo: function (successCallBack, failedCallBack) {
    var invokeID = "jqGetUserInfo" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqGetUserInfo", "", successCallBack, failedCallBack);
  },


  /**
   * 获取用户信息
   * 成功输出：（返回字段供参考）
   *   {"userId":"用户id","userName":"用户账号","passWord":"加密的密码"}
   * */
  jqGetEncryptUserInfo: function (successCallBack, failedCallBack) {
    var invokeID = "jqGetEncryptUserInfo" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqGetEncryptUserInfo", "", successCallBack, failedCallBack);
  },

  /**
   * 获取SSOToken
   * 输入：
   *      {"ISAID":"业务系统ID"}
   * 成功输出：
   *   {"message":"数据获取成功","result":"success","token":{"ssoToken":"ssotoken-8421566546565656","xmasToken":"XMAS-1502424591929000"}}
   * */
  getSSOToken: function (param, successCallBack, failedCallBack) {
    var invokeID = "getSSOToken" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getSSOToken", param, successCallBack, failedCallBack);
  },

  /**
   *  IC 平台获取用户身份票据
   *  成功输出：字符串ICToken值
   */
  jqGetICToken: function (successCallBack, failedCallBack) {
    var invokeID = "jqGetICToken" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqGetICToken", "", successCallBack, failedCallBack);
  },


  /**
   * 获取Xmas Session
   * 成功输出：{"xmas_session":"session"}
   * */
  getXmasSession: function (successCallBack, failedCallBack) {
    var invokeID = "getXmasSession" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getXmasSession", "", successCallBack, failedCallBack);
  },

  /**
   * 获取设备信息
   * 成功输出： {"uuid":"设备唯一值","version":"系统版本,"platform":"系统类型","model":"设备型号","manufacture":"品牌"}
   **/
  getDeviceInfo: function (successCallBack, failedCallBack) {
    var invokeID = "getDeviceInfo" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getDeviceInfo", "", successCallBack, failedCallBack);
  },
  encrypt: function (param, successCallBack, failedCallBack) {
    var invokeID = "encrypt" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "encrypt", param, successCallBack, failedCallBack);
  },

  decrypt: function (param, successCallBack, failedCallBack) {
    var invokeID = "decrypt" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "decrypt", param, successCallBack, failedCallBack);
  },

  /**
   * 获取经纬度
   * 成功输出：{"latitude":"纬度","longitude":"经度"}
   * */
  getLatitudeAndLongitude: function (successCallBack, failedCallBack) {
    var invokeID = "getLatitudeAndLongitude" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getLatitudeAndLongitude", "", successCallBack, failedCallBack);
  },


  /**
   *  应用数据分享
   *  输入参数：{"title": "数据标题","detailID": "详情id","appcode": "应用标志","bigIcon": "大图标名称",
					"smallIcon": "小图标名称","rightDes": "底部右侧描述文字","leftDes": "底部左侧描述文字"}
   */
  sharedToChat: function (param, successCallBack, failedCallBack) {

    var invokeID = "sharedToChat" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "sharedToChat", param, successCallBack, failedCallBack);
  },

  /**
   * 文件下载
   * 输入：{"url":"下载地址","fileName":"文件名称（带后缀）","xmas-session":"xmas服务的sessionid","requestParam":"附件下载接口的详细请求参数"}
   * */
  fileDownload: function (param, successCallBack, failedCallBack) {
    var invokeID = "fileDownload" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "fileDownload", param, successCallBack, failedCallBack);
  },

  voiceDownload: function (param, successCallBack, failedCallBack) {
    var invokeID = "voiceDownload" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "voiceDownload", param, successCallBack, failedCallBack);
  },

  /**
   * 文件上传（可多文件上传）
   * 输入：{"file":["文件1URI","文件2URI"...],"url":"接口地址","xmas-session":"xmas服务的sessionid"}
   * 成功输出：返回接口执行结果
   * */
  fileUpload: function (param, successCallBack, failedCallBack) {
    var invokeID = "fileUpload" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "fileUpload", param, successCallBack, failedCallBack);
  },
  /**
   * 文件上传 xmas
   * 输入：{"file":["文件1URI","文件2URI"...],"url":"接口地址","xmas-session":"xmas服务的sessionid"}
   * 成功输出：返回接口执行结果
   * */
  xmasFileUpload: function (param, successCallBack, failedCallBack) {
    var invokeID = "xmasFileUpload" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "xmasFileUpload", param, successCallBack, failedCallBack);
  },

  /**
   * 关闭当前WebView
   * */
  close: function () {
    var invokeID = "close" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "close", "", function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   * 获取相片多选（打开相机拍摄或打开相册选取）
   * 输入：{"sourceType":"相片来源（相机或相册）","maxNum":"最大获取相片张数"}
   *     sourceType：0-相册，1-相机
   * 成功输出：JSON数组 [{"path":"相片在文件系统中的绝对路径","base64":"相片base64表示"}]
   * */
  getPicture: function (param, successCallBack, failedCallBack) {
    var invokeID = "getPicture" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getPicture", param, successCallBack, failedCallBack);
  },

  /**
   * 获取相片单选（打开相机拍摄或打开相册选取）
   *  输入："[\"camera\"]" 或 param = "[\"pic\"]"
   *  成功输出：["path":"相片在文件系统中的绝对路径","base64":"相片base64表示"]
   * */
  pickImage: function (param, successCallBack, failedCallBack) {
    var invokeID = "pickImage" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "pickImage", param, successCallBack, failedCallBack);
  },


  /**
   * 拨打电话
   *  输入："[\"8888888888\"]"
   * */
  call: function (data) {
    var invokeID = "call" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "call", data, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   * 关闭当前WebView
   * */
  back: function () {
    var invokeID = "back" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "back", "", function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },


  /**
   *  控制页面是否可以缩放
   *  输入："[\"xx\"]"，1为禁止，0为可缩放
   */
  jqSetBrowserForbidZoomControls: function (param) {
    var invokeID = "jqSetBrowserForbidZoomControls" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqSetBrowserForbidZoomControls", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   *  控制标题栏显示与否
   *  输入："[\"xx\"]"，1为显示，0为影藏
   */
  jqSetBrowserTopBarShow: function (param) {
    var invokeID = "jqSetBrowserTopBarShow" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqSetBrowserTopBarShow", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   *  控制标题栏“关闭”按钮显示与否
   *  输入："[\"xx\"]"，1为显示，0为影藏
   */
  jqSetBrowserTopBarCloseShow: function (param) {
    var invokeID = "jqSetBrowserTopBarShow" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqSetBrowserTopBarCloseShow", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   *  控制标题栏“后退”按钮显示与否
   *  输入："[\"xx\"]"，1为显示，0为影藏
   */
  jqSetBrowserTopBarBackShow: function (param) {
    var invokeID = "jqSetBrowserTopBarBackShow" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqSetBrowserTopBarBackShow", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   * 打开一个新WebView
   * 输入：["url地址"]
   * */
  openpage: function (param) {
    var invokeID = "openpage" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "openpage", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   * 图片查看（可保存图片）
   * 输入：{"pictures":[图片URI数组],"position":"当前显示图片位置","allowSave":"是否允许保存相片"}
   *   示例：{"pictures":["1.png","2.png"],"position":2,"allowSave":true}, pictures中图片地址，用http开头表示加载网络图片, file://表示本地图片
   * */
  viewPicture: function (param) {
    var invokeID = "viewPicture" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "viewPicture", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   *  开始录制语音
   */
  startVoice: function () {
    var invokeID = "startVoice" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "startVoice", "", function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   *  停止录制语音
   *  输出：{"filepath":"语音文件路径","msg":"success","time":2345} time录音时间单位s
   **/
  stopVoice: function (successCallBack, failedCallBack) {
    var invokeID = "stopVoice" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "stopVoice", "", successCallBack, failedCallBack);
  },

  /**
   *  播放录音
   *  输入：[{\"filepath\":\"path\"}]  path语音文件的本地路径
   */
  playVoice: function (param) {
    var invokeID = "playVoice" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "playVoice", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   *  停止播放录音
   */
  stopPlayVoice: function () {
    var invokeID = "stopPlayVoice" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "stopPlayVoice", "", function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   *  验证指纹
   *  输出：字符串true/false
   */
  jqOpenFingerprint: function (successCallBack, failedCallBack) {
    var invokeID = "jqOpenFingerprint" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqOpenFingerprint", "", successCallBack, failedCallBack);
  },

  /**
   *  判断是否支持指纹
   *  输出：字符串true/false
   */
  jqHasFingerprint: function (successCallBack, failedCallBack) {
    var invokeID = "jqHasFingerprint" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqHasFingerprint", "", successCallBack, failedCallBack);
  },


  /**
   *  测试方法
   */
  jqTest: function (param) {
    var invokeID = "jqTest" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqTest", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },
  /**
   *  打开pdf之类的文件
   */
  jqOpenFile: function (param) {
    var invokeID = "jqOpenFile" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqOpenFile", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },
  /*
   * 拨打电话
   *
   * */
  callnumber: function (param) {
    var invokeID = "callnumber" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "callnumber", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   *  控制系统栏显示与否
   */
  jqSetBrowserShowFullScreen: function (param) {
    var invokeID = "jqSetBrowserShowFullScreen" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqSetBrowserShowFullScreen", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },
  /**
   *  控制标题栏显示与否
   */
  jqSetBrowserTopBarShowColor: function (param) {
    var invokeID = "jqSetBrowserTopBarShowColor" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "jqSetBrowserTopBarShowColor", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },
  /**
   * 获取用户信息
   **/
  getUserInfo: function (successCallBack, failedCallBack) {
    var invokeID = "getUserInfo" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getUserInfo", "", successCallBack, failedCallBack);
  },

  /*
   * 横竖屏切换
   *
   * */
  screen_orientation: function (param) {
    var invokeID = "screen_orientation" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "screen_orientation", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },

  /**
   * 获取用户账套信息
   **/
  getSegmentInfo: function (successCallBack, failedCallBack) {
    var invokeID = "getSegmentInfo" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getSegmentInfo", "", successCallBack, failedCallBack);
  }
  ,

  /**
   * 获取用户权限信息
   **/
  getUserRole: function (successCallBack, failedCallBack) {
    var invokeID = "getUserRole" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getUserRole", "", successCallBack, failedCallBack);
  },
  /**
   * 刷新webview
   **/
  refreshWebView: function () {
    var invokeID = "refreshWebView" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "refreshWebView", "", function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },
  /**
   *GIO自定义事件收集,当审批等操作执行时调用
   * is_approve 审批与否（已办'0'、待办'1'）、approve_click 审批操作、to_page 跳转到页面
   * 使用 如:JQAPI.getGIOCustomInfo({"is_approve":"0","approve_click":"1","to_page":"用户风险异常"})
   **/
  getGIOCustomInfo: function (param) {
    var invokeID = "getGIOCustomInfo" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getGIOCustomInfo", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },
  /**
   *定位仓位位置
   * latitude 仓库纬度、longitude 仓库经度、repositoryName 仓库名称
   * 输入：{"latitude":"XXXX","longitude":"XXXX","repositoryLocation":"XXXX"}
   **/
  getRepositoryLocation: function (param) {
    var invokeID = "getRepositoryLocation" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getRepositoryLocation", param, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },
  /**
   *传递推送信息的帐套
   *
   **/

  getPushSegNo: function (successCallBack, failedCallBack) {
    var invokeID = "getPushSegNo" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getPushSegNo", "", successCallBack, failedCallBack);
  },
  /**
   *打开webview
   *
   **/
  openWebview: function (params) {
    var invokeID = "openWebview" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "openWebview", params, function () {
    }, function (msg) {
      throw new Error(msg);
    });
  },
  /**
   * 通过id获取到手机号
   *userCode
   *phoneNumber
   **/
  getPhoneNumberWithUserCode: function (param, successCallBack, failedCallBack) {
    var invokeID = "getPhoneNumberWithUserCode" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID, "getPhoneNumberWithUserCode", param, successCallBack, failedCallBack);
  },
  getPhoneBar: function () {
    var invokeID = "getPhoneBar" + new Date().getTime();
    JQAPICallBack.callBackObjects[invokeID] = new JQAPIFactory(invokeID,"getPhoneBar",'#25b8f2', function () {
    }, function (msg) {
      throw new Error(msg);
    });
  }
};

