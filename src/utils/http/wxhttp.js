//import wx from 'wx';//引用微信小程序wx对象
//import { bmobConfig } from '../config/bmob';//bmob配置文件
import store from '../../store'
let bmobConfig = {
  applicationId: "",
  restApiKey: ""
}
const net = {
  get(url, data) {
    // wx.showLoading 页面加载接口 titie加载显示的内容
    wx.showLoading({
      title: '加载中',//数据请求前loading，提高用户体验
    })
    // resolve 调用成功 reject调用失败
    return new Promise((resolve, reject) => {
      // 网络请求
      wx.request({
        url: url,   //请求的地址
        data: data, //发送给后台的数据
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          // 'X-Bmob-Application-Id': bmobConfig.applicationId,
          // 'X-Bmob-REST-API-Key': bmobConfig.restApiKey,
          'Content-Type': 'application/json',
          'Device': "WebApp",
          'DisplayVersion': "2.0.11",
          'SingleTicket': store.state.User.SingleTicket
        }, // 设置请求的 header  请求头
        success: function (res) {  //服务器返回数据
          // success
          // 隐藏 loading 提示框
          wx.hideLoading();
          if (res.statusCode != 200) {
            // 显示信息提示框
            wx.showToast({
              title: "网络出错，稍后再试",   //提示内容
              icon: "none"                 //图标
            });
            return false;
          }
          if(res.data&&res.data.ret)
          {
            if(res.data.ret==10000||res.data.ret==10001||res.data.ret==10002)
            {
              store.state.User.SingleTicket="";
              var pages = getCurrentPages();    //获取加载的页面
              var currentPage = pages[pages.length-1];    //获取当前页面的对象
              var url = `/pages/index/index?redirect=/${currentPage.route}`;    //当前页面url

              //拼接页面参数
              var parms="";
              for(var key in currentPage.options)
              {
                parms+=`${key}=${currentPage.options[key]}`;
              }
              if(parms.length>0)
              {
                //url转码
                let encodeparms = encodeURIComponent(`?${parms}`);
                url=url+encodeparms;
              }
              wx.redirectTo({url:url});
            }else if(res.data.ret!=0)
            {
              wx.showToast({
                title: res.data.msg,
                icon: "none"
              });
              return false;
            }
          }
          resolve(res.data);
        },
        fail: function (error) {
          // fail
          wx.hideLoading();
          reject(error);//请求失败
        },
        complete: function () {
          wx.hideLoading();
          // complete
        }
      })
    })
  },
  post(url, data) {
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'Content-Type': 'application/json',
          'Device': "WebApp",
          'DisplayVersion': "2.0.11",
          'SingleTicket': store.state.User.SingleTicket
        }, // 设置请求的 header
        success: function (res) {
          // success
          wx.hideLoading();
          if (res.statusCode != 200) {
            wx.showToast({
              title: "网络出错，稍后再试",
              icon: "none"
            });
            return false;
          }
          if (res.data.ret != 0) {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            });
            return false;
          }
          resolve(res.data);
        },
        fail: function (error) {
          // fail
          wx.hideLoading();
          reject(error);
        },
        complete: function () {
          // complete
          wx.hideLoading();
        }
      })
    })
  },
  upload(url, data, filePath, names) {
    var that = this;
    // var  i = data.i ? data.i : 0,
    // success = data.success ? data.success : 0,
    // fail = data.fail ? data.fail : 0;
    console.log(url, data, filePath, names);

    //  return new Promise((resolve, reject) => {
    //   wx.uploadFile({
    //     url: url,
    //     filePath: filePath[0],
    //     name: `${name}[${0}]`,
    //     formData: data,
    //     header: {
    //       'Content-Type': 'application/json',
    //       'Device':"WebApp",
    //       'DisplayVersion':"2.0.11",
    //       'SingleTicket':store.state.User.SingleTicket
    //     }, // 设置请求的 header
    //     success: (resp) => {


    //       resolve(resp.data);
    //     },
    //     fail: (res) => {
    //     },
    //     complete: () => {
    //     }
    //   });

    // })

    var promiseList = [];
    for (let index = 0; index < filePath.length; index++) {
      promiseList[index] = new Promise((resolve, reject) => {
        wx.uploadFile({
          url: url,
          filePath: filePath[index],
          name: names[index],
          formData: data,
          header: {
            'Accept': '*/*',
            'Device': "WebApp",
            'DisplayVersion': "2.0.11",
            'SingleTicket': store.state.User.SingleTicket
          }, // 设置请求的 header
          success: (resp) => {
            // debugger;
            resolve(JSON.parse(resp.data));
          },
          fail: (res) => {
          },
          complete: () => {
          }
        });
      })
    }
    return Promise.all(promiseList);
    // .then(function (result){
    //   resolve(result[result.length-1]);
    // })
    // .then(function(error){
    //   reject(error);
    // })


    // return new Promise((resolve, reject) => {

    //   wx.uploadFile({
    //     url: url,
    //     filePath: filePath[i],
    //     name: `${name}[${i}]`,
    //     formData: data,
    //     header: {
    //       'Content-Type': 'application/json',
    //       'Device':"WebApp",
    //       'DisplayVersion':"2.0.11",
    //       'SingleTicket':store.state.User.SingleTicket
    //     }, // 设置请求的 header
    //     success: (resp) => {
    //       success++;
    //       console.log(resp)
    //       console.log(data);
    //       //这里可能有BUG，失败也会执行这里
    //       resolve(resp.data);
    //     },
    //     fail: (res) => {
    //       fail++;
    //       console.log('fail:' + i + "fail:" + fail);
    //     },
    //     complete: () => {
    //       console.log(i);
    //       i++;
    //       if (i == filePath.length) { //当图片传完时，停止调用   
    //         console.log('执行完毕');
    //         console.log('成功：' + success + " 失败：" + fail);
    //       } else {//若图片还没有传完，则继续调用函数
    //         console.log(i);
    //         data.i = i;
    //         data.success = success;
    //         data.fail = fail;
    //         that.upload(url,data,filePath);
    //       }
    //     }
    //   });
    // })
  }
}

export default net;//暴露出来供其他文件引用