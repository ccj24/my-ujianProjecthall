
function setCookie(c_name, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
  //console.log(document.cookie)
}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=")
      if (c_start != -1) {
          c_start = c_start + c_name.length + 1
          let c_end = document.cookie.indexOf(";", c_start)
          if (c_end == -1) c_end = document.cookie.length
          return unescape(document.cookie.substring(c_start, c_end))
      }
  }
  return ""
}

function delCookie(c_name) {
  setCookie(c_name, "", -1)
}


function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  setCookie,
  getCookie,
  delCookie
}