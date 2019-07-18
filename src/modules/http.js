import axios from 'axios';
import QS from 'qs';
import { Toast, Indicator } from 'mint-ui'
axios.defaults.timeout = 5000;//设置超时时间单位毫秒
axios.defaults.headers.post = {
    'x-code': 'OYGH01',
    'x-version': '8.0.9',
    'x-channel': 'h5',
    'x-timestamp': new Date().valueOf(),
    'Data-Type': 'json'
}
/*
    参数
        urlapi      请求地址;
        params      请求参数;
        address     是否使用不处理的传入url;
        type        自定义Content-Type;
        load        是否显示加载框
    示例
        this.$http.get({
            url:'jg-service/v3/jgapi/undefined/queryForceProcessOrder/',
            params:{
                userCode: 178806
            },
            address:true
        }).then(res=>{
            console.log(res)
        })
        this.$http.post({
            url: 'http://10.60.148.120:9001/nbapp/api/v1/obiboard/findObiBoardList',
            params:{
                boardName: "",
                id: "",
                ownerCode: "178806" 
            },
            address:false 
        }).then(res=>{
            console.log(res)
        })
*/
const http = {
    get(opte) {
        if (opte.load == true) {
            Indicator.open("加载中...");
        }
        let url
        if (opte.address == true) {
            url = `${process.env.VUE_APP_BASE_API}${opte.url}`
        } else {
            url = opte.url
        }
        if (opte.type == true) {
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: opte.params
            }).then(res => {
                resolve(res.data);
                    Indicator.close();
            }).catch(err => {
                reject(err.data);
                    Indicator.close();
                Toast('请求超时,请稍后再试！！')
            })
        });
    },
    post(opte) {
        if (opte.load == true) {
            Indicator.open("加载中...");
        }
        let url
        if (opte.address == true) {
            url = `${process.env.VUE_APP_BASE_API}${opte.url}`
        } else {
            url = opte.url
        }
        if (opte.type == true) {
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return new Promise((resolve, reject) => {
            axios.post(url, QS.parse(opte.params))
                .then(res => {
                    resolve(res.data);
                        Indicator.close();
                })
                .catch(err => {
                    reject(err.data);
                        Indicator.close();
                    Toast('请求超时,请稍后再试！！')
                })
        });
    }
}
export default http;