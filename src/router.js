var routes = [
  {
    path: 'pages/home/index',
    name: 'home',
    config: {
      navigationBarTitleText: '主页',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
 
  {
    path: 'pages/home/Projectpicture',
    name: 'home-picture',
    config: {
      navigationBarTitleText: '项目图片',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/ProjectBIM',
    name: 'home-ProjectBIM',
    config: {
      navigationBarTitleText: 'BIM',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/ProjectVR',
    name: 'home-ProjectVR',
    config: {
      navigationBarTitleText: '全景预览',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/Projectmonitoring',
    name: 'home-monitoring',
    config: {
      navigationBarTitleText: '监控',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/Aerialphoto',
    name: 'home-Aerialphoto',
    config: {
      navigationBarTitleText: '航拍',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/Projectmember',
    name: 'home-Projectmember',
    config: {
      navigationBarTitleText: '项目成员',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/Welfarelist',
    name: 'home-Welfarelist',
    config: {
      navigationBarTitleText: '红包详情',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/details',
    name: 'home-details',
    config: {
      navigationBarTitleText: '详细资料',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/Logdetails',
    name: 'home-Logdetails',
    config: {
      navigationBarTitleText: '日志',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/home/Remark',
    name: 'home-Remark',
    config: {
      navigationBarTitleText: '备注',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
  },
  {
    path: 'pages/data/index',
    name: 'data',
    config: {
      navigationBarTitleText: '资料',
      enablePullDownRefresh: false
    },
  },
  {
    path: 'pages/Thelog/index',
    name: 'Thelog',
    config: {
      navigationBarTitleText: '日志',
      enablePullDownRefresh: true, 
      onReachBottomDistance: 50
    },
  },

  {
    path: 'pages/meeting/index',
    name: 'meeting',
    config: {
      navigationBarTitleText: '会议',
      enablePullDownRefresh: false
    },
  },


]
module.exports = routes
