import http_axios from '../utils/http/axios'
import http_wx from '../utils/http/wxhttp'
const http = mpvue_Mode === 'WX' ? http_wx : http_axios;

let BaseHost = process.env.NODE_ENV == 'development' ? "http://192.168.0.119:801/" : "https://app.ujianchina.net/";

// let BaseHost = "http://192.168.0.86:801/";
// let BaseHost = "https://app.ujianchina.net/";
// let BaseHost = "http://192.168.0.119:801/";



export default {
    Account_Login: param => {
        return http.post(BaseHost + "api/Account/Login", param)
    },
    // 获取当前登录用户信息
    User_Get: param => {
        return http.get(BaseHost + "api/User/Get", param)
    },
    //获取项目详情。用于展示项目详细信息界面。 
    Project_GetDetailed: Projectid => {
        return http.get(BaseHost + "api/Project/GetDetailed?Projectid=" + Projectid)
    },

    // 获取项目红包 
    Project_ProjectRedPacket: param => {
        return http.get(BaseHost + "api/RedPacket/ProjectRedPacket", param)
    },

    //获取项目日志列表
    Project_GetList: param => {
        return http.get(BaseHost + "api/ProjectLog/GetList", param)
    },
    // BIM视频列表 api/ProjectBIMVideo/GetList
    Project_BIMVideo: param => {
        return http.get(BaseHost + "api/ProjectBIMVideo/GetList", param)
    },
    //项目航拍视频接口
    Project_AerialVideo: param => {
        return http.get(BaseHost + "api/ProjectAerialVideo/GetList", param)
    },
    // 项目监控视频接口
    Project_MonitoringVideo: param => {
        return http.get(BaseHost + "api/ProjectMonitoringVideo/GetList", param)
    },
    // 获取项目成员列表
    Project_ProjectMember: param => {
        return http.get(BaseHost + "api/ProjectMember/Get", param)
    },
    // 获取部门
    Project_GetDepKeyword: param => {
        return http.get(BaseHost + "api/CommonInfo/GetDepKeyword", param)
    },
    // 获取项目日志详情
    Project_ProjectLog: param => {
        return http.get(BaseHost + "api/ProjectLog/Get", param)
    },
    // 审核项目日志
    ProjectLog_SetAudit: param => {
        return http.post(BaseHost + "api/ProjectLog/SetAudit", param)
    },
    //获取指定用户所属的企业列表
    Project_Enterprise: param => {
        return http.get(BaseHost + "api/Enterprise/Get", param)
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
    Project_ProjectGetList: param => {
        return http.get(BaseHost + "api/Project/GetList", param)
    },
    // 获取与用户有关的申请记录。包括他人申请加入你管理的项目，你申请加入别人的项目  
    Project_MemberApply: param => {
        return http.get(BaseHost + "api/ProjectMemberApply/GetApplyHistory", param)
    },  
    // 获取用户消息提醒总数
    User_GetUserRemind: param => {
        return http.get(BaseHost + "api/User/GetUserRemind", param)
    },
    // 处理申请状态
    ProjectMemberApply_SetState: param => {
        return http.post(BaseHost + "api/ProjectMemberApply/SetState", param)
    },
    // 获取职位关键字集合。 职位ParentId为部门标识, 级联关系
    User_GetPostKeyword: param => {
        return http.get(BaseHost + "api/CommonInfo/GetPostKeyword", param)
    },
    // 用户申请加入项目
    use_Apply: param => {
        return http.post(BaseHost + "api/ProjectMemberApply/Apply", param)
    },
    // 获取项目首页店铺(广告)
    Advert_ShopList: param => {
        return http.get(BaseHost + "api/Advert/GetProjectHomeShopList", param)
    },
    // 获取项目首页需求推荐(广告)
    Advert_DemandValList: param => {
        return http.get(BaseHost + "api/Advert/GetProjectDemandValList", param)
    },
    // 获取项目打赏排行
    ProjectRedPacketRank: param => {
        return http.get(BaseHost + "api/RedPacket/ProjectRedPacketRank", param)
    },
    // 获取项目人员进出记录
    GetDoorPeopleList: param => {
        return http.get(BaseHost + "api/Project/GetDoorPeopleList", param)
    },
    // 获取用户发起的任务 UserId、UserName、Portrait为"任务接收人"的用户信息
    Task_List: param => {
        return http.get(BaseHost + "api/Task/GetAddTaskList", param)
    },
    // 获取用户收到需要答复的任务 UserId、UserName、Portrait为"任务发起人"的用户信息
    Task_GetReplyTaskList: param => {
        return http.get(BaseHost + "api/Task/GetReplyTaskList", param)
    },
    // 发红包、打赏红包
    RedPacket: param => {
        return http.post(BaseHost + " api/RedPacket/GiveRedPacket", param)
    },
    // 获取当前登录用户钱包余额
    Purse_Balance: param => {
        return http.get(BaseHost + "api/Purse/Balance", param)
    },
    // 获取红包祝福语列表
    RedPacket_CommonInfo: param => {
        return http.get(BaseHost + "api/CommonInfo/RedPacketRemarksKeyword", param)
    },
    // 获取用户收到的红包
    RedPacketDetail: param => {
        return http.get(BaseHost + "api/RedPacketDetail/Get", param)
    },
     // 新增项目日志
     ProjectLog_Add: (param,paths,filenames)=> {
         if(paths&&paths.length>0&&filenames&&filenames.length>0)
         {
            return http.upload(BaseHost + "api/ProjectLog/Add?t=json", param,paths,filenames)
         }else
         {
            return http.post(BaseHost + "api/ProjectLog/Add", param)
         }
    },
    //新增日志评论
    ProjectLogComment_Add: param => {
        return http.post(BaseHost + "api/ProjectLogComment/Add", param)
    },
    //删除日志评论
    ProjectLogComment_Delete: param => {
        return http.post(BaseHost + "api/ProjectLogComment/Delete?notecomid="+param)
    },
    // 日志统计列表
    ProjectLog_LogStatistics: param => {
        return http.get(BaseHost + "api/ProjectLog/LogStatistics", param)
    },
    //编辑项目日志
    ProjectLog_Update: param => {
        return http.post(BaseHost + "api/ProjectLog/Update",param)
    },
}