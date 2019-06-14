import http_axios from '../utils/http/axios'
import http_wx from '../utils/http/wxhttp'
const http = mpvue_Mode === 'WX' ? http_wx : http_axios;

let BaseHost = process.env.NODE_ENV == 'development'?"http://192.168.0.119:801/":"https://app.ujianchina.net/";

// let BaseHost = "http://192.168.0.86:801/";
// let BaseHost = "https://app.ujianchina.net/";
// let BaseHost = "http://192.168.0.119:801/";



export default {
    Account_Login: param => {
        return http.post(BaseHost + "api/Account/Login", param)
    },
    User_Get: param => {
        return http.get(BaseHost + "api/User/Get", param)
    },
    //获取项目详情。用于展示项目详细信息界面。 
    Project_GetDetailed:Projectid=>{
        return http.get(BaseHost + "api/Project/GetDetailed?Projectid="+ Projectid)
    },

    // 获取项目红包 
    Project_ProjectRedPacket:param =>{
        return http.get(BaseHost + "api/RedPacket/ProjectRedPacket",param)
    },

    //获取项目日志列表
    Project_GetList:param =>{
        return http.get(BaseHost + "api/ProjectLog/GetList",param)
    },
    // BIM视频列表 api/ProjectBIMVideo/GetList
    Project_BIMVideo:param =>{
        return http.get(BaseHost + "api/ProjectBIMVideo/GetList",param)
    },
    //项目航拍视频接口
    Project_AerialVideo:param =>{
        return http.get(BaseHost + "api/ProjectAerialVideo/GetList",param)
    },
    // 项目监控视频接口
    Project_MonitoringVideo:param =>{
        return http.get(BaseHost + "api/ProjectMonitoringVideo/GetList",param)
    },
    // 获取项目成员列表
    Project_ProjectMember:param =>{
        return http.get(BaseHost + "api/ProjectMember/Get",param)
    },
    // 获取部门
    Project_GetDepKeyword:param =>{
        return http.get(BaseHost + "api/CommonInfo/GetDepKeyword",param)
    },
    // 获取项目日志详情
    Project_ProjectLog:param =>{
        return http.get(BaseHost + "api/ProjectLog/Get",param)
    },
    //获取指定用户所属的企业列表
    Project_Enterprise:param =>{
        return http.get(BaseHost + "api/Enterprise/Get",param)
    },

    // 设置联系人备注
    UpdateComment: param => {
        return http.post(BaseHost + "api/Contact/UpdateComment", param)
    },
    // 申请添加联系人
    Add_Contact: param => {
        return http.post(BaseHost + "api/Contact/Add?contactid=" + param.contactid)
    },
    // 获取项目列表
    Project_ProjectGetList:param =>{
        return http.get(BaseHost + "api/Project/GetList",param)
    },
    // 获取与用户有关的申请记录。包括他人申请加入你管理的项目，你申请加入别人的项目
    Project_MemberApply:param =>{
        return http.get(BaseHost + "api/ProjectMemberApply/GetApplyHistory",param)
    },
}