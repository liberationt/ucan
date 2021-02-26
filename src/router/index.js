import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { menuList } from '@/api/user'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import qs from 'qs'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import systemConfigRouter from './modules/systemConfig'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
function recursionRouter(dataRoter, isChild) {
  const newRouter = []
  // const chilrenRoutes = []
  dataRoter.forEach((item, index) => {
    if (isChild) {
      const temp = {
        path: '',
        component: resolve => require([`@/views${item.url}/index`], resolve),
        name: item.name,
        meta: {
          title: item.name,
          icon: item.icon
        },
        children: []
      }
      newRouter.push(temp)
    } else {
      const temp = {
        path: item.url,
        component: resolve => require([`@/layout`], resolve),
        name: item.name,
        meta: {
          title: item.name,
          icon: item.icon,
          index: true
        },
        children: []
      }
      newRouter.push(temp)
    }
    if (item.children && item.children !== null) {
      item.children.forEach((list, num) => {
        if (list.type === 'C') {
          const childTmp = {
            path: list.url,
            name: list.name,
            component: resolve => require([`@/views${list.url}/index`], resolve),
            meta: {
              title: list.name,
              btns: list.children,
              icon: list.icon,
              id: list.id,
              index: true
            }
          }
          newRouter[index].children.push(childTmp)
        } else if (list.type === 'M') {
          const newArr = []
          newArr.push(list)
          newRouter[index].children.push(recursionRouter(newArr, true)[0])
        }
      })
    }
  })
  return newRouter
}

function getList() {
  menuList(store.state.user.token).then((res) => {
    if (res) {
      // this.menusList = res.menus
      store.commit('user/SET_NAME', res.name)
      store.commit('user/SET_DATA', res)
      store.dispatch('user/updateSysUserConfig', res.sysUserConfig)
      const allRouter = recursionRouter(res.menus)
      const miss = { path: '*', redirect: '/404', hidden: true }
      const home = {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '首页',
        meta: { icon: '&#xe645' },
        children: [{
          path: 'dashboard',
          component: resolve => require(['@/views/dashboard/index'], resolve),
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard', index: true }
        }]
      }
      allRouter.unshift(home)
      allRouter.push(miss)
      if (allRouter.length <= 0) { // 没有动态路由
        return
      }
      // for (let index = 0; index < allRouter.length; index++) {
      // 	router.options.routes.push(allRouter[index])
      // 	// 将请求的路由先存放到options对象中
      // }
      // router.addRoutes(router.options.routes)
      const myRouter = []
      for (let index = 0; index < allRouter.length; index++) {
        myRouter.push(allRouter[index])
        // 将请求的路由先存放到options对象中
      }
      router.addRoutes(myRouter)
      router.addRoutes(asyncRoutes)
      // 将完整需要显示的路由添加进去
      store.commit('permission/GET_DYNAMICS', allRouter)
      store.commit('permission/GET_ROUTES', allRouter)
    }
  }).catch(error => {
    console.log(error)
  })
}

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () =>
					import ('@/views/redirect/index')
      }],
    meta: {
      title: '友康养老云'
    }
  },
  {
    path: '/login',
    component: () =>
			import ('@/views/login/index'),
    hidden: true,
    meta: {
      title: '友康养老云'
    }
  },
  {
    path: '/auth-redirect',
    component: () =>
			import ('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
			import ('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () =>
			import ('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/systemManagement',
    component: () =>
			import ('@/layout'),
    meta: {
      title: '系统管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/user/updatePassword',
        component: () =>
					import ('@/views/systemConfig/user/updatePassword'),
        hidden: true,
        meta: {
          title: '修改密码'
        },
        name: 'updatePassword'
      },
      {
        path: '/dictionary/list',
        component: () =>
					import ('@/views/systemConfig/dictionary/list'),
        name: 'list',
        meta: { title: '字典标签' },
        hidden: true
      },
      {
        path: '/userInfo/index',
        component: () =>
					import ('@/views/userManagement/userInfo/index'),
        hidden: true,
        meta: { title: '账号信息' },
        name: 'userInfo'
      },
      {
        path: '/message/messageDetails',
        component: () =>
					import ('@/views/systemConfig/message/messageDetails'),
        hidden: true,
        meta: { title: '消息列表' },
        name: 'messageDetails'
      }
    ]
  },
  {
    path: '/userInformationManagement',
    component: () =>
			import ('@/layout'),
    meta: {
      title: '用户信息管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/elderlyInfo/details',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/elderlyInfo/details'),
        name: 'addElderly',
        meta: { title: '新增老人' },
        hidden: true
      },
      {
        path: '/elderlyInfo/details/:id',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/elderlyInfo/details'),
        name: 'elderlyDetails',
        meta: { title: '老人详情' },
        hidden: true
      },
      {
        path: '/disabledInfo/details',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/disabledInfo/details'),
        name: 'addDisabled',
        meta: { title: '新增残疾人' },
        hidden: true
      },
      {
        path: '/callinInfo/details/:id',
        component: () =>
          import ('@/views/callcenter/callout/details'),
        name: 'addDisabled',
        meta: { title: '电话呼入处理plus' },
        hidden: true
      },
      {
        path: '/callinInfo/teltoolbar/:id',
        component: () =>
          import ('@/views/callcenter/callout/teltoolbar'),
        name: 'addDisabled',
        meta: { title: '电话toolbar' },
        hidden: true
      },
      {
        path: '/callinInfo/details',
        component: () =>
          import ('@/views/callcenter/callout/details'),
        name: 'addDisabled',
        meta: { title: '电话呼入处理' },
        hidden: true
      },
      {
        path: '/disabledInfo/details/:id',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/disabledInfo/details'),
        name: 'disabledDetails',
        meta: { title: '残疾人详情' },
        hidden: true
      },
      {
        path: '/socialAssistanceInfo/details',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/socialAssistanceInfo/details'),
        name: 'addSocialAssistance',
        meta: { title: '新增社会救助' },
        hidden: true
      },
      {
        path: '/socialAssistanceInfo/details/:id',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/socialAssistanceInfo/details'),
        name: 'socialAssistanceDetails',
        meta: { title: '社会救助详情' },
        hidden: true
      },
      {
        path: '/exServicemanInfo/details',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/exServicemanInfo/details'),
        name: 'addExServiceman',
        meta: { title: '新增优抚人员' },
        hidden: true
      },
      {
        path: '/exServicemanInfo/details/:id',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/exServicemanInfo/details'),
        name: 'exServicemanDetails',
        meta: { title: '优抚人员详情' },
        hidden: true
      },
      {
        path: '/helpPoorInfo/details',
        component: () =>
          import ('@/views/streetPlatform/userInfoConfig/helpPoorInfo/details'),
        name: 'addHelpPoor',
        meta: { title: '新增扶贫人员' },
        hidden: true
      },
      {
        path: '/helpPoorInfo/details/:id',
        component: () =>
          import ('@/views/streetPlatform/userInfoConfig/helpPoorInfo/details'),
        name: 'helpPoorDetails',
        meta: { title: '扶贫人员详情' },
        hidden: true
      },
      {
        path: '/poorInfo/details',
        component: () =>
          import ('@/views/streetPlatform/userInfoConfig/poorInfor/details'),
        name: 'poorInfo',
        meta: { title: '新增贫困人员' },
        hidden: true
      },
      {
        path: '/poorInfo/details/:id',
        component: () =>
          import ('@/views/streetPlatform/userInfoConfig/poorInfor/details'),
        name: 'poorInfo',
        meta: { title: '贫困人员详情' },
        hidden: true
      },
      {
        path: '/extremelyPoorInfor/details',
        component: () =>
          import ('@/views/streetPlatform/userInfoConfig/extremelyPoorInfor/details'),
        name: 'extremelyPoorInfor',
        meta: { title: '新增特困人员' },
        hidden: true
      },
      {
        path: '/extremelyPoorInfor/details/:id',
        component: () =>
          import ('@/views/streetPlatform/userInfoConfig/extremelyPoorInfor/details'),
        name: 'extremelyPoorInfor',
        meta: { title: '特困特员详情' },
        hidden: true
      },
      // {
      // 	path: '/familyPlanInfo/details',
      // 	component: () =>
      // 		import ('@/views/userInfoConfig/familyplanInfo/details'),
      // 	name: 'familyPlanInfo',
      // 	meta: {title: '计生人员信息管理'},
      // 	hidden: true
      // },
      {
        path: '/familyPlanInfo/details/:id',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/familyplanInfo/details'),
        name: 'familyPlanInfo',
        meta: { title: '计生人员信息管理' },
        hidden: true
      },
      {
        path: '/pensionInfo/details/:id',
        component: () =>
					import ('@/views/streetPlatform/userInfoConfig/pensionInfo/details'),
        name: 'pensionInfo',
        meta: { title: '居家养老服务管理' },
        hidden: true
      },
      {
        path: '/personnelSubsidy/details/:id',
        component: () =>
					import ('@/views/streetPlatform/subsidyConfig/personnelSubsidy/details'),
        name: 'personnelSubsidy',
        meta: { title: '补贴信息管理' },
        hidden: true
      }
    ]
  },
  {
    path: '/organizationTypeManagement',
    component: () =>
			import ('@/layout'),
    meta: {
      title: '机构类型管理',
      icon: 'settings'
    },
    children: [
      // 养老机构-1010
      // 长者照护之家-1011
      {
        path: '/pensionAgency/details/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/pensionAgency/details'),
        name: 'pensionAgencyDetails',
        meta: { title: '养老机构' },
        hidden: true
      },
      // 池州养老机构 - 1010_chizhou
      {
        path: '/pensionAgency/chiZhouDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/pensionAgency/chiZhouDetails'),
        name: 'chiZhouPensionAgencyDetails',
        meta: { title: '池州养老机构' },
        hidden: true
      },
      // 日间照护机构-2010
      {
        path: '/communityFacilities/dayCareFacilitiesDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/dayCareFacilitiesDetails'),
        name: 'dayCareFacilitiesDetails',
        meta: { title: '日间照护机构' },
        hidden: true
      },
      // 综合为老服务中心-2011
      // 邻里汇-2012
      {
        path: '/communityFacilities/comprehensiveDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/comprehensiveDetails'),
        name: 'comprehensiveDetails',
        meta: { title: '综合为老服务中心' },
        hidden: true
      },
      // 老年活动室-2013
      {
        path: '/communityFacilities/elderlyActivityRoomDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/elderlyActivityRoomDetails'),
        name: 'elderlyActivityRoomDetails',
        meta: { title: '老年活动室' },
        hidden: true
      },
      // 社区为老服务站 -2024
      {
        path: '/communityFacilities/communityForOldServe/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/communityForOldServe'),
        name: 'communityForOldServe',
        meta: { title: '社区为老服务站' },
        hidden: true
      },
      // 助餐点-2014
      // 社区长者食堂-2015
      {
        path: '/communityFacilities/helpMealsDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/helpMealsDetails'),
        name: 'helpMealsDetails',
        meta: { title: '助餐点' },
        hidden: true
      },
      // 护理站-2016
      {
        path: '/communityFacilities/nursingStationDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/nursingStationDetails'),
        name: 'nursingStationDetails',
        meta: { title: '护理站' },
        hidden: true
      },
      // 社区养老组织-2017
      {
        path: '/communityFacilities/communityPensionOrganizationDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/communityPensionOrganizationDetails'),
        name: 'communityPensionOrganizationDetails',
        meta: { title: '社区养老组织' },
        hidden: true
      },
      // 健康小屋-2018
      {
        path: '/communityFacilities/healthHutDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/healthHutDetails'),
        name: 'healthHutDetails',
        meta: { title: '健康小屋' },
        hidden: true
      },
      // 社区卫生服务设施 -2020
      {
        path: '/communityFacilities/healthService/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/healthService'),
        name: 'healthService',
        meta: { title: '社区卫生服务设施' },
        hidden: true
      },
      // 村民互助点  -2021
      // 社区养老服务站  -2022
      // 养老服务指导中心 -2023
      // 池州日间照护机构 -2010_chizhou
      // 综合为老服务中心 -2011_chizhou
      {
        path: '/communityFacilities/chiZhouService/:id',
        component: () =>
          import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/chiZhouService'),
        name: 'chiZhouService',
        meta: { title: '村民互助点' },
        hidden: true
      },

      // 养老辅具展示点-4001
      {
        path: '/communityFacilities/assistantDeviceSiteDetails/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/communityFacilities/assistantDeviceSiteDetails'),
        name: 'assistantDeviceSiteDetails',
        meta: { title: '养老辅具展示点' },
        hidden: true
      },
      // 入住人员
      {
        path: '/checkInPeople/details',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/checkInPeople/details'),
        name: 'addCheckInPeople',
        meta: { title: '新增入住人员' },
        hidden: true
      },
      {
        path: '/checkInPeople/details/:id',
        component: () =>
					import ('@/views/streetPlatform/facilitiesConfig/checkInPeople/details'),
        name: 'checkInPeopleDetails',
        meta: { title: '入住人员详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/serviceActivityManagement',
    component: () =>
			import ('@/layout'),
    meta: {
      title: '服务活动管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/serviceProject/details/:id',
        component: () =>
					import ('@/views/streetPlatform/serviceActivityConfig/serviceProject/details'),
        name: 'serviceProject',
        meta: { title: '服务项目管理' },
        hidden: true
      },
      {
        path: '/activityProject/details/:id',
        component: () =>
					import ('@/views/streetPlatform/serviceActivityConfig/activityProject/details'),
        name: 'activityProject',
        meta: { title: '活动项目管理' },
        hidden: true
      },
      {
        path: '/insurance/details/:id',
        component: () =>
					import ('@/views/streetPlatform/serviceActivityConfig/insurance/details'),
        name: 'insurance',
        meta: { title: '长互险项目' },
        hidden: true
      },
      {
        path: '/serviceRecord/details/:id',
        component: () =>
					import ('@/views/streetPlatform/serviceActivityConfig/serviceRecord/details'),
        name: 'serviceRecord',
        meta: { title: '服务记录管理' },
        hidden: true
      }
    ]
  },
  {
    path: '/pensionAdvisersManagement',
    component: () =>
			import ('@/layout'),
    meta: {
      title: '养老顾问管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/consultantSite/details/:id',
        component: () =>
					import('@/views/streetPlatform/pensionAdvisersCongfig/consultantSite/details'),
        name: 'consultantSiteDetail',
        meta: { title: '养老顾问点详情' },
        hidden: true
      },
      {
        path: '/consultantSite/details',
        component: () =>
					import ('@/views/streetPlatform/pensionAdvisersCongfig/consultantSite/details'),
        name: 'addConsultantSite',
        meta: { title: '新增养老顾问点' },
        hidden: true
      },
      {
        path: '/consultant/details/:id',
        component: () =>
					import('@/views/streetPlatform/pensionAdvisersCongfig/consultant/details'),
        name: 'consultantDetail',
        meta: { title: '养老顾问员详情' },
        hidden: true
      },
      {
        path: '/consultant/details',
        component: () =>
					import ('@/views/streetPlatform/pensionAdvisersCongfig/consultant/details'),
        name: 'addConsultant',
        meta: { title: '新增养老顾问员' },
        hidden: true
      },
      {
        path: '/consultRecord/details/:id',
        component: () =>
					import ('@/views/streetPlatform/pensionAdvisersCongfig/consultRecord/details'),
        name: 'consultRecord',
        meta: { title: '养老活动管理' },
        hidden: true
      }
    ]
  },
  {
    path: '/policyInfoConfigManagement',
    component: () =>
			import ('@/layout'),
    meta: {
      title: '政策资讯管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/policyInformation/details/:id',
        component: () =>
					import ('@/views/streetPlatform/policyInfoConfig/policyInformation/details'),
        name: 'policyInformation',
        meta: { title: '政策资讯信息' },
        hidden: true
      },
      {
        path: '/policyInfoAudit/details/:id',
        component: () =>
					import ('@/views/streetPlatform/policyInfoConfig/policyInfoAudit/details'),
        name: 'policyInfoAudit',
        meta: { title: '政策资讯审核' },
        hidden: true
      }
    ]
  },
  {
    path: '/inteligentDeviceManagement',
    component: () =>
			import('@/layout'),
    meta: {
      title: '智能设备管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/card/details',
        component: () =>
					import('@/views/streetPlatform/inteligentDeviceConfig/card/details'),
        name: 'addCard',
        meta: { title: '新增敬老卡' },
        hidden: true
      },
      {
        path: '/card/details/:id',
        component: () =>
					import('@/views/streetPlatform/inteligentDeviceConfig/card/details'),
        name: 'cardDetails',
        meta: { title: '敬老卡详情' },
        hidden: true
      },
      {
        path: '/bankCard/details',
        component: () =>
					import('@/views/streetPlatform/inteligentDeviceConfig/bankCard/details'),
        name: 'addBankCard',
        meta: { title: '新增银行卡' },
        hidden: true
      },
      {
        path: '/bankCard/details/:id',
        component: () =>
					import('@/views/streetPlatform/inteligentDeviceConfig/bankCard/details'),
        name: 'bankCardDetails',
        meta: { title: '银行卡详情' },
        hidden: true
      },
      {
        path: '/pos/details',
        component: () =>
					import('@/views/streetPlatform/inteligentDeviceConfig/pos/details'),
        name: 'addPOS',
        meta: { title: '新增POS机' },
        hidden: true
      },
      {
        path: '/pos/details/:id',
        component: () =>
					import('@/views/streetPlatform/inteligentDeviceConfig/pos/details'),
        name: 'posDetails',
        meta: { title: 'POS机详情' },
        hidden: true
      },
      {
        path: '/equipment/details',
        component: () =>
          import('@/views/streetPlatform/inteligentDeviceConfig/equipment/details'),
        name: 'addEquipment',
        meta: { title: '新增设备' },
        hidden: true
      },
      {
        path: '/equipment/details/:id',
        component: () =>
          import('@/views/streetPlatform/inteligentDeviceConfig/equipment/details'),
        name: 'equipmentDetails',
        meta: { title: '设备详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/serviceProviderManagement',
    component: () =>
			import ('@/layout'),
    meta: {
      title: '服务商管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/serviceProvider/details',
        component: () =>
					import ('@/views/streetPlatform/serviceProviderConfig/serviceProvider/details'),
        name: 'addServiceProvider',
        meta: { title: '新增服务商' },
        hidden: true
      },
      {
        path: '/serviceProvider/details/:id',
        component: () =>
					import ('@/views/streetPlatform/serviceProviderConfig/serviceProvider/details'),
        name: 'serviceProviderDetails',
        meta: { title: '服务商详情' },
        hidden: true
      },
      {
        path: '/servicePersonal/details/:id',
        component: () =>
					import ('@/views/streetPlatform/serviceProviderConfig/servicePersonal/details'),
        name: 'servicePersonal',
        meta: { title: '服务人员管理' },
        hidden: true
      }
    ]
  },
  {
    path: '/sidekickProjectManagement',
    component: () => import ('@/layout'),
    meta: {
      title: '老伙伴项目管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/volunteerServiceProject/details/:id',
        component: () =>
					import ('@/views/sidekickProjectConfig/volunteerServiceProject/details'),
        name: 'volunteerServiceProject',
        meta: { title: '志愿者服务项目' },
        hidden: true
      },
      {
        path: '/socialOrgManagement/details/:id',
        component: () =>
					import ('@/views/sidekickProjectConfig/socialOrgManagement/details'),
        name: 'socialOrgManagement',
        meta: { title: '社会组织管理' },
        hidden: true
      },
      {
        path: '/volunteerServiceObject/details/:id',
        component: () =>
					import ('@/views/sidekickProjectConfig/volunteerServiceObject/details'),
        name: 'volunteerServiceObject',
        meta: { title: '志愿者服务对象' },
        hidden: true
      },
      {
        path: '/volunteerServiceRecord/details/:id',
        component: () =>
					import ('@/views/sidekickProjectConfig/volunteerServiceRecord/details'),
        name: 'volunteerServiceRecord',
        meta: { title: '志愿者服务记录' },
        hidden: true
      },
      {
        path: '/volunteerManagement/details/:id',
        component: () =>
					import ('@/views/sidekickProjectConfig/volunteerManagement/details'),
        name: 'volunteerManagement',
        meta: { title: '志愿者管理' },
        hidden: true
      }
      /* {
				path: '/volunteerReport/details/:id',
				component: () =>
					import ('@/views/sidekickProjectConfig/volunteerReport/details'),
				name: 'volunteerManagement',
				meta: {title: '志愿者报表'},
				hidden: true
			},*/
    ]
  },
  {
    path: '/assistiveDevices',
    component: () => import ('@/layout'),
    meta: {
      title: '养老辅具',
      icon: 'settings'
    },
    children: [
      {
        path: '/rentalPoint/details',
        component: () =>
					import ('@/views/assistivePlatform/assistiveDevices/rentalPoint/details'),
        name: 'rentalPoint',
        meta: { title: '新增租赁点' },
        hidden: true
      },
      {
        path: '/rentalPoint/details/:id',
        component: () =>
					import ('@/views/assistivePlatform/assistiveDevices/rentalPoint/details'),
        name: 'rentalPoint',
        meta: { title: '租赁点' },
        hidden: true
      },
      {
        path: '/contract/details/:id',
        component: () =>
				import ('@/views/assistivePlatform/assistiveDevices/contract/details'),
        name: 'rentalPoint',
        meta: { title: '租赁服务合同' },
        hidden: true
      }

    ]
  },
  // 辅具服务商
  {
    path: '/fjserviceProviderManagement',
    component: () => import ('@/layout'),
    meta: {
      title: '辅具服务商',
      icon: 'settings'
    },
    children: [
      {
        path: '/fjserviceProvider/details',
        component: () =>
					import ('@/views/assistivePlatform/fjServiceprovider/serviceProvider/details'),
        name: 'rentalPoint',
        meta: { title: '新增服务商' },
        hidden: true
      },
      {
        path: '/fjserviceProvider/details/:id',
        component: () =>
					import ('@/views/assistivePlatform/fjServiceprovider/serviceProvider/details'),
        name: 'fjserviceProvider',
        meta: { title: '服务商' },
        hidden: true
      },
      {
        path: '/fitMan/details/:id',
        component: () =>
				import ('@/views/assistivePlatform/fjServiceprovider/fitMan/details'),
        name: 'rentalPoint',
        meta: { title: '租赁产品' },
        hidden: true
      }
    ]
  },
  {
    path: '/rentalPointManagement',
    component: () => import ('@/layout'),
    meta: {
      title: '客户信息管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/lesseeInformation/details',
        component: () =>
					import ('@/views/assistivePlatform/rentalPointManagement/lesseeInformation/details'),
        name: 'lesseeInformation',
        meta: { title: '新增承租人' },
        hidden: true
      },
      {
        path: '/lesseeInformation/details/:id',
        component: () =>
					import ('@/views/assistivePlatform/rentalPointManagement/lesseeInformation/details'),
        name: 'lesseeInformation',
        meta: { title: '承租人' },
        hidden: true
      }
    ]
  },
  {
    path: '/assistSupplierManagement',
    component: () => import ('@/layout'),
    meta: {
      title: '辅具租赁产品',
      icon: 'settings'
    },
    children: [
      {
        path: '/productAssist/details/:id',
        component: () =>
          import ('@/views/assistivePlatform/assistSupplierConfig/productAssist/details'),
        name: 'rentalPoint',
        meta: { title: '租赁产品' },
        hidden: true
      },
      {
        path: '/supplier/details/:id',
        component: () =>
          import ('@/views/assistivePlatform/assistSupplierConfig/supplier/details'),
        name: 'supplier',
        meta: { title: '供应商' },
        hidden: true
      }
    ]
  },
  {
    path: '/maintenance',
    component: () => import ('@/layout'),
    meta: {
      title: '系统运营维护',
      icon: 'settings'
    },
    children: [
      {
        path: '/maintenance',
        component: () =>
				import ('@/views/maintenance'),
        name: 'lesseeInformation',
        meta: { title: '维护' },
        hidden: true
      }
    ]
  },
  {
    path: '/systemMonitoring',
    component: () => import ('@/layout'),
    meta: {
      title: '系统监控',
      icon: 'settings'
    },
    children: [
      {
        path: '/systemMonitoring',
        component: () =>
				import ('@/views/systemMonitoring'),
        name: 'systemMonitoring',
        meta: { title: '监控' },
        hidden: true
      }
    ]
  },
  {
    path: '/evaluationManagement',
    component: () => import ('@/layout'),
    meta: {
      title: '入院评估管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/assessor/details',
        component: () =>
					import ('@/views/evaluationManagement/basicInformation/assessor/details'),
        name: 'evaluationManagement',
        meta: { title: '新增评估师' },
        hidden: true
      },
      {
        path: '/assessor/details/:id',
        component: () =>
					import ('@/views/evaluationManagement/basicInformation/assessor/details'),
        name: 'evaluationManagement',
        meta: { title: '新增评估师' },
        hidden: true
      },
      {
        path: '/questionnaire/onsiteAssessment/details',
        component: () => import('@/views/evaluationManagement/questionnaire/onsiteAssessment/details.vue'),
        name: 'onsiteAssessmentDetails',
        meta: { title: '现场评估' },
        hidden: true
      },
      {
        path: '/questionnaire/adaptiveEvaluation/details',
        component: () => import('@/views/evaluationManagement/questionnaire/adaptiveEvaluation/details.vue'),
        name: 'adaptiveEvaluationDetails',
        meta: { title: '适应性评估' },
        hidden: true
      },
      {
        path: '/esimateApply/details/:id',
        component: () => import('@/views/evaluationManagement/esimateManage/esimateApply/details.vue'),
        name: 'EsimateApplyDetails',
        meta: { title: '评估申请' },
        hidden: true },
      {
        path: '/questionnaire/singleItemAssessment/details',
        component: () => import('@/views/evaluationManagement/questionnaire/singleItemAssessment/details.vue'),
        name: 'singleItemAssessmentDetails',
        meta: { title: '单例事项评估' },
        hidden: true
      },
      {
        path: '/questionnaire/careProjectAssessment/details',
        component: () => import('@/views/evaluationManagement/questionnaire/careProjectAssessment/details.vue'),
        name: 'careProjectAssessmentDetails',
        meta: { title: '照护项目管理' },
        hidden: true
      },
      {
        path: '/evaluationQuery/details',
        component: () => import('@/views/evaluationManagement/esimateManage/evaluationQuery/details.vue'),
        name: 'evaluationQueryDetails',
        meta: { title: '评估查询' },
        hidden: true
      },
      {
        path: '/assessmentForm/details/:id',
        component: () => import('@/views/evaluationManagement/esimateManage/assessmentForm/details.vue'),
        name: 'assessmentForm',
        meta: { title: '评估表' },
        hidden: true
      },
      {
        path: '/assessmentForm/assessReport/:id',
        component: () => import('@/views/evaluationManagement/esimateManage/assessmentForm/assessReport.vue'),
        name: 'assessReport',
        meta: { title: '评估报告' },
        hidden: true
      },
      {
        path: '/esimateReport/details/:id',
        component: () => import('@/views/evaluationManagement/esimateManage/esimateReport/details.vue'),
        name: 'esimateReport',
        meta: { title: '评估报告' },
        hidden: true
      },
      {
        path: '/assessingElderly/details/:id',
        component: () => import('@/views/evaluationManagement/basicInformation/assessingElderly/details.vue'),
        name: 'esimateReport',
        meta: { title: '评估老人' },
        hidden: true
      }
    ]
  },
  {
    path: '/messageIssueManagement',
    component: () =>
      import ('@/layout'),
    meta: {
      title: '养老顾问管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/messageIssue/details/:id',
        component: () =>
          import('@/views/streetPlatform/messageIssueConfig/messageDefend/details'),
        name: 'MessageDefenddetails',
        meta: { title: '消息详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/serverManagement',
    component: () => import ('@/layout'),
    meta: {
      title: '服务商管理',
      icon: 'settings'
    },
    children: [
      {
        path: '/projectManagement/serveProject/details',
        component: () =>
					import ('@/views/serverManagement/projectManagement/serveProject/details'),
        name: 'serveProject',
        meta: { title: '服务项目' },
        hidden: true
      },
      {
        path: '/projectManagement/serveProject/details/:id',
        component: () =>
					import ('@/views/serverManagement/projectManagement/serveProject/details'),
        name: 'serveProject',
        meta: { title: '服务项目' },
        hidden: true
      },
      {
        path: '/orderManagement/servicePlan/details/:id',
        component: () =>
        import ('@/views/serverManagement/orderManagement/servicePlan/details'),
        name: 'serveProject',
        meta: { title: '服务计划' },
        hidden: true
      },
      {
        path: '/orderManagement/servicePlan/details',
        component: () =>
					import ('@/views/serverManagement/orderManagement/servicePlan/details'),
        name: 'serveProject',
        meta: { title: '服务计划' },
        hidden: true
      },
      {
        path: '/serverManagement/servicePersonal/details',
        component: () =>
					import ('@/views/serverManagement/servicePersonal/details'),
        name: 'servicePersonal',
        meta: { title: '服务人员' },
        hidden: true
      },
      {
        path: '/serverManagement/servicePersonal/details/:id',
        component: () =>
					import ('@/views/serverManagement/servicePersonal/details'),
        name: 'servicePersonal',
        meta: { title: '服务人员' },
        hidden: true
      },
      {
        path: '/ISPManagement/details',
        component: () =>
          import ('@/views/serverManagement/ISPManagement/details'),
        name: 'ISPManagement',
        meta: { title: '新增服务商' },
        hidden: true
      },
      {
        path: '/ISPManagement/details/:id',
        component: () =>
          import ('@/views/serverManagement/ISPManagement/details'),
        name: 'serveProject',
        meta: { title: '服务商' },
        hidden: true
      },
      {
        path: '/projectManagement/mealService/details',
        component: () =>
          import ('@/views/serverManagement/projectManagement/mealService/details'),
        name: 'mealService',
        meta: { title: '服务套餐' },
        hidden: true
      },
      {
        path: '/orderManagement/orderWork/details',
        component: () =>
          import ('@/views/serverManagement/orderManagement/orderWork/details'),
        name: 'mealService',
        meta: { title: '工单详情' },
        hidden: true
      },
      {
        path: '/orderManagement/orderWork/details/:id',
        component: () =>
          import ('@/views/serverManagement/orderManagement/orderWork/details'),
        name: 'mealService',
        meta: { title: '工单详情' },
        hidden: true
      },
      {
        path: '/orderManagement/orderSetting/details',
        component: () =>
          import ('@/views/serverManagement/orderManagement/orderSetting/details'),
        name: 'mealService',
        meta: { title: '工单设置' },
        hidden: true
      },
      {
        path: '/projectManagement/mealService/details/:id',
        component: () =>
          import ('@/views/serverManagement/projectManagement/mealService/details'),
        name: 'mealService',
        meta: { title: '服务套餐' },
        hidden: true
      },
      {
        path: '/orderManagement/servicePlan/orderDetail',
        component: () =>
          import ('@/views/serverManagement/orderManagement/servicePlan/orderDetail'),
        name: 'serveProject',
        meta: { title: '服务计划' },
        hidden: true
      },
      {
        path: '/orderManagement/servicePlan/planDetail',
        component: () =>
          import ('@/views/serverManagement/orderManagement/servicePlan/planDetails'),
        name: 'serveProject',
        meta: { title: '创建计划' },
        hidden: true
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // determine whether the user has logged in

  // 从大屏过来，如果有 accessToken 退出登录
  if (getToken()) {
    const queryStr = location.search.slice(1)
    const query = qs.parse(queryStr)
    if (query.redirectType === 'screen') {
      await store.dispatch('user/logout')
    }
  }

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // const { roles } = await store.dispatch('user/getInfo')
          await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // router.addRoutes(accessRoutes)
          getList()
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from, next) => {
  if (window.location.host === 'rypg.ucanyun.com') {
    setTimeout(() => {
      var _hmt = _hmt || [];
      (function() {
        // 每次执行前，先移除上次插入的代码
        document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?a11722f9631543da5e49439ddad0adc7'
        hm.id = 'baidu_tj'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    }, 0)
  }
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function() {
      // 每次执行前，先移除上次插入的代码
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?12cac70d8115088c42e568ad67811027'
      hm.id = 'baidu_tj'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 0)
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
