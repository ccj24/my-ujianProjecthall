import http_axios from '../utils/http/axios'
import http_wx from '../utils/http/wxhttp'
const http = mpvue_Mode === 'WX' ? http_wx : http_axios;

// let BaseHost = "https://market.ujianchina.net/";
// let BaseHost = "http://192.168.0.86:811/";
let BaseHost = "http://192.168.0.119:811/";




export default {
    baidu_geocoder: param => {
        //location=35.658651,139.745415
        let ak = "yCCZ5HnYGnUoRQNfd0YkTHg8lluFGQRZ";
        if (!param.coordtype) {
            param.coordtype = "gcj02ll";
        }
        return http.get(`https://api.map.baidu.com/geocoder/v2/?ak=${ak}&output=json&coordtype=gcj02ll`, param)
    },
    Account_Login: param => {
        return http.post(BaseHost + "api/Account/Login", param)
    },
   
}