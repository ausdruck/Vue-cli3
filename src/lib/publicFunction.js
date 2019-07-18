/*eslint-disable */
import './emm'
function  getUserinfo() {
    // if (Config.DEV != "true") {
    // var userCode;
    //  userCode= localStorage.getItem("userCode");
    // // if (!Config.DEV == "true") {
    // if (!userCode || userCode + "" == "null" || userCode == "") {

    // console.log("进入公共方法的userInfo请求")
    var userInfo = {
        userName: '',
        userCode: '',
        binding: '',
        segNo: '',
        segName: '',
        userId:'',
        access_token:''
    };
    // console.log(new Date().valueOf())
    if (location.origin.indexOf("http://localhost") != -1) {
        // console.log('当前是Chrome调试页面')
        return new Promise((resolve, reject) => {
            // console.log('当前是Chrome调试页面的return')
            // if (!userInfo) {
            userInfo.userName = '系统管理员';
            userInfo.userCode = 'admin';
            userInfo.binding = '';
            userInfo.segNo = 'C001011';
            userInfo.segName = '上海欧冶材料技术有限责任公司';
            userInfo.userId= '319';
            userInfo.access_token='aoi0mj3a0a55394i7nm4cqc2an946nmq'
            // console.log(userInfo)
            // console.log('进入Chrome调试返回userInfo')
            resolve(userInfo);
// /segNo=C001011&userCode=783286&pageNumber=1&perSize=8&userName=顾裕俊
            // } else {
            //     reject('errData')
            // }
        })
    }
    else {
        console.log('真机调试输出')
        return new Promise((resolve, reject) => {
            JQAPI.getUserInfo(function (data) {
                // console.log(data)
                if (data && data != "" && data != null) {
                    // userInfo = JSON.parse(data);
                    userInfo.userName = JSON.parse(data).userName;
                    userInfo.userCode = JSON.parse(data).userCode;
                    userInfo.binding = JSON.parse(data).binding;
                    userInfo.userId = JSON.parse(data).userId;
                    userInfo.access_token = JSON.parse(data).access_token;
                    // localStorage.setItem("userName", userInfo.userName);
                    // localStorage.setItem("userCode", userInfo.userCode);
                    // localStorage.setItem("binding", userInfo.binding);
                    // console.log("JQAPI里的"+new Date().valueOf())
                    JQAPI.getSegmentInfo(function (segData) {
                        if (segData && segData != "" && segData != null) {
                            userInfo.segNo = JSON.parse(segData).segNo;
                            userInfo.segName = JSON.parse(segData).segName;
                        }
                        resolve(userInfo);
                    },function () {

                    })
                }

            }, function () {
                // console.log("getUserInfo获取失败");
                reject();
//
            })
        })
    }
    // }else {
    //   return new Promise((resolve, reject)=>{
    //     var userInfo;
    //     if(userCode && userCode + "" != "null" && userCode !=""){
    //       userInfo={
    //         userName:localStorage.getItem("userName"),
    //         userCode:localStorage.getItem("userCode"),
    //         binding:localStorage.getItem("binding")
    //       }
    //       resolve(userInfo)
    //     } else {
    //      reject()
    //     }
    //   })
    // }
}

/**
 *segNo
 */
function  getSeginfo() {
    // if (Config.DEV != "true") {
    var segInfo;
    return new Promise((resolve, reject) => {
        JQAPI.getSegmentInfo(function (data) {
            if (data && data != "" && data != null) {
                segInfo = JSON.parse(data);
                resolve(segInfo);
            }
        }, function () {
            console.log("getUserInfo获取失败");
            reject()
        })
    })
    // }
    // else {
    //   console.log("走进这个segNo方法")
    //   return new Promise((resolve, reject) => {
    //     if (Config.DEV == "true") {
    //       var userData = {
    //         segNo: 'C001',
    //         segName: "宝山公司"
    //       }
    //       resolve(userData)
    //     } else {
    //       reject("报错了")
    //     }
    //   })
    // }
}
function getFromnbapp() {
    return '-(来自欧冶随身行)'
}
export { getUserinfo ,getFromnbapp }
