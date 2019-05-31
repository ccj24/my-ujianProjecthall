
import toast from '../components/Toast'
export default {
    alert(title){
       if( mpvue_Mode === 'WX' )
       {
        wx.showToast({
            title: title,
            icon: "none"
          });
       }else {
        toast.toast(title);
       }
    }
}