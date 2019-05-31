class Html_Font_Size {
    constructor() {
        let self = this;
        window.onresize = function () {
            self.getRem(1080,100);
            //alert(document.getElementsByTagName('html').item(0).style.fontSize);              
        }
        self.getRem(1080,100);
    }
    setAdaption(baseFontsize) {
        baseFontsize = baseFontsize || 7.5;
        var docEl = document.getElementsByTagName('html').item(0);
        var dpr = window.devicePixelRatio,
            deviceWidth = docEl.getBoundingClientRect().width, //获得屏幕宽度
            deviceFontsize = (deviceWidth*10) / baseFontsize + "px"; //计算rem基准值
        docEl.style.fontSize = deviceFontsize; //设置rem基准值
    }
    getRem(pwidth ,prem){
        var html = document.getElementsByTagName("html")[0];
        var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
        html.style.fontSize = oWidth/pwidth*prem + "px";
    }
}

var hfs = new Html_Font_Size();
export default {
    hfs
}