//引入axios
import axios from 'axios'
import store from '../../store'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
      return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  if(mpvue_Mode != 'WX')
  {
    let router = require('../../routerH5').default;
    // console.log(router)
    if(response.data.ret==10000||response.data.ret==10001||response.data.ret==10002)
    {
      router.push({path:"/pages/index/index"})
    }
  }
    return response
}, err => {
    if (err && err.response) {
      console.log(err)
    } else {
      err.message = "连接到服务器失败"
    }
    // message.err(err.message)
      return Promise.resolve(err.response)
})

axios.defaults.baseURL = '/'
//设置默认请求头
// axios.defaults.headers = {
//     'X-Requested-With': 'XMLHttpRequest',
//     'Device':"WebApp",
//     'SingleTicket':store.state.User.SingleTicket
// }
axios.defaults.timeout = 10000

export default {
  //get请求
    get (url,param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'get',
          headers:{
            'X-Requested-With': 'XMLHttpRequest',
            'Device':"WebApp",
            'DisplayVersion':"2.0.11",
            'SingleTicket':store.state.User.SingleTicket
          },
          url,
          params: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          if(res)
            resolve(res.data)
        })
      })
    },
  //post请求
    post (url,param) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'post',
          headers:{
            'X-Requested-With': 'XMLHttpRequest',
            'Device':"WebApp",
            'DisplayVersion':"2.0.11",
            'SingleTicket':store.state.User.SingleTicket
          },
          url,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          if(res)
            resolve(res.data);
        })
      })
     }
  }