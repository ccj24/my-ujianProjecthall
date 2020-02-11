import http_axios from '../utils/http/axios'
import http_wx from '../utils/http/wxhttp'
const http = mpvue_Mode === 'WX' ? http_wx : http_axios;



let BaseHost = process.env.NODE_ENV != 'development'?"http://192.168.0.119:811/":"https://market.ujianchina.net/";
// let BaseHost = "https://market.ujianchina.net/";
// let BaseHost = "http://192.168.0.86:811/";
// let BaseHost = "http://192.168.0.119:811/";





export default {
    baidu_geocoder: param => {
        //location=35.658651,139.745415
        let ak = "yCCZ5HnYGnUoRQNfd0YkTHg8lluFGQRZ";
        if (!param.coordtype) {
            param.coordtype = "gcj02ll";
        }
        return http.get(`https://api.map.baidu.com/geocoder/v2/?ak=${ak}&output=json&coordtype=gcj02ll`, param)
    },
    //普通登录(账号+密码)
    Account_Login: param => {
        return http.post(BaseHost + "api/Account/Login", param)
    },
    //登录验证码
    Account_ValidationCode: (param) => {
        return http.get(BaseHost + "api/Account/ValidationCode", param)
    },
    //获取用户信息
    User_Get: param => {
        return http.get(BaseHost + "api/User/Get", param)
    },
     //简单登录(账号+验证码)
     Account_SimpleLogin: param => {
        return http.post(BaseHost + "api/Account/SimpleLogin", param)
    },
     //微信登录(用户在微信小程序首次登录绑定账号后即可自动登录)
     Account_wxLogin: (code) => {
        return http.post(BaseHost + `api/Account/wxLogin?code=${code}&appid=${"wx6b4ba109a5fb795b"}`)
    },
}
