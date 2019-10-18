import Vue from 'vue'
import Router from 'vue-router'

const HeaderNormal = resolve => require(['@/components/common/HeaderNormal'], resolve)
const HeaderSpecial = resolve => require(['@/components/common/HeaderSpecial'], resolve)
const HeaderCommon = resolve => require(['@/components/common/HeaderCommon'], resolve)
const NotFound = resolve => require(['@/components/common/NotFound'], resolve)
const Index = resolve => require(['@/components/index'], resolve)
const List = resolve => require(['@/components/list'], resolve)
const Group = resolve => require(['@/components/group'], resolve)
const Event = resolve => require(['@/components/event'], resolve)
const Trade = resolve => require(['@/components/event/trade'], resolve)
//第三方
const Three = resolve => require(['@/components/three'], resolve)
const Threelogin = resolve => require(['@/components/three/na'], resolve)
const Threebd = resolve => require(['@/components/three/bd'], resolve)
const Threewb = resolve => require(['@/components/three/wb'], resolve)
// 商城
const Mall = resolve => require(['@/components/mall'], resolve)
const MallList = resolve => require(['@/components/mall/list'], resolve)
const Mallnewincreased = resolve => require(['@/components/mall/newincreased'], resolve)
const Malllogistics = resolve => require(['@/components/mall/logistics'], resolve)
const Mallinfo = resolve => require(['@/components/mall/info'], resolve)
const Mallrecord = resolve => require(['@/components/mall/record'], resolve)
const Mallsuccess = resolve => require(['@/components/mall/success'], resolve)
const Mallerror = resolve => require(['@/components/mall/error'], resolve)
const Mallgoods = resolve => require(['@/components/mall/goods'], resolve)
const Luck = resolve => require(['@/components/mall/luck'], resolve)
// 个人中心
const Personal = resolve => require(['@/components/personal'], resolve)
const PersonalCenter = resolve => require(['@/components/personal/center'], resolve)
// 我的关注
const PersonalFollow = resolve => require(['@/components/personal/follow'], resolve)
const PersonalFollowEvent = resolve => require(['@/components/personal/follow/event'], resolve)
const PersonalFollowEventForecast = resolve => require(['@/components/personal/follow/eventForecast'], resolve)
const PersonalFollowActivity = resolve => require(['@/components/personal/follow/activity'], resolve)
// 资产管理
const PersonalAssets = resolve => require(['@/components/personal/assets'], resolve)
const PersonalAssetsFuture = resolve => require(['@/components/personal/assets/future'], resolve)
const PersonalAssetsGold = resolve => require(['@/components/personal/assets/gold'], resolve)
const PersonalAssetsCash = resolve => require(['@/components/personal/assets/cash'], resolve)
const PersonalAssetsGift = resolve => require(['@/components/personal/assets/gift'], resolve)
// 我要出题
const PersonalSubject = resolve => require(['@/components/personal/subject'], resolve)
const PersonalSubjectAdd = resolve => require(['@/components/personal/subject/add'], resolve)
const PersonalSubjectDeal = resolve => require(['@/components/personal/subject/add/setDeal'], resolve)
const PersonalSubjectRecord = resolve => require(['@/components/personal/subject/record'], resolve)
const PersonalSubjectRecordDetail = resolve => require(['@/components/personal/subject/record/detail'], resolve)
// 账户设置
const PersonalAccount = resolve => require(['@/components/personal/account'], resolve)
const PersonalAccountInformation = resolve => require(['@/components/personal/account/information'], resolve)
const PersonalAccountSafe = resolve => require(['@/components/personal/account/safe'], resolve)
const PersonalAccountBind = resolve => require(['@/components/personal/account/bind'], resolve)
const PersonalAccountLevel = resolve => require(['@/components/personal/account/level'], resolve)
const PersonalAccountAddress = resolve => require(['@/components/personal/account/address'], resolve)
const PersonalAccountWeibo = resolve => require(['@/components/personal/account/weibo'], resolve)
// 我的订单
const PersonalOrder = resolve => require(['@/components/personal/order'], resolve)
const PersonalOrderposition = resolve => require(['@/components/personal/order/position'], resolve)
const PersonalOrderclear = resolve => require(['@/components/personal/order/closeOut'], resolve)
const PersonalOrderawait = resolve => require(['@/components/personal/order/await'], resolve)
//我参加的活动
const PersonalCampaign = resolve => require(['@/components/personal/campaign'], resolve)
//我最近交易的题材
const PersonalJoin = resolve => require(['@/components/personal/joinEvent'], resolve)
// 我要邀请
const PersonalInvite = resolve => require(['@/components/personal/invite'], resolve)
// 消息
const PersonalMessage = resolve => require(['@/components/personal/message'], resolve)
// 注册 登录 找回密码
const Register = resolve => require(['@/components/register'],resolve)
const Login = resolve => require(['@/components/login'],resolve)
const ResetPwd = resolve => require(['@/components/resetPwd'],resolve)
// 充值  提现  绑定支付宝
const PersonalRecharge = resolve => require(['@/components/personal/recharge'], resolve)
const PersonalWithdrawals = resolve => require(['@/components/personal/withdrawals'], resolve)
const PersonalWithdrawalsBindAlipay = resolve => require(['@/components/personal/withdrawals/bind/alipay'], resolve)
//充值协议
const RechargeDeal = resolve => require(['@/components/others/recharge'], resolve)
// 搜索
const Search = resolve => require(['@/components/search'], resolve)
// const Search = resolve => require(['@/components/search'], resolve)
// const SearchEvent = resolve => require(['@/components/search/event'], resolve)
// const SearchCriticism = resolve => require(['@/components/search/criticism'], resolve)
// const SearchActivity = resolve => require(['@/components/search/activity'], resolve)
// 关于我们  新闻动态  服务协议  常见问题  联系我们  意见反馈  下载APP
const Others = resolve => require(['@/components/others'], resolve)
const OthersAbout = resolve => require(['@/components/others/about'], resolve)
const OthersNews = resolve => require(['@/components/others/news'], resolve)
const Newsdetails = resolve => require(['@/components/others/newdetails'], resolve)
const OthersAgreement = resolve => require(['@/components/others/agreement'], resolve)
const OthersProblems = resolve => require(['@/components/others/problems'], resolve)
const OthersContact = resolve => require(['@/components/others/contact'], resolve)
const OthersFeedback = resolve => require(['@/components/others/feedback'], resolve)
const OthersDownload = resolve => require(['@/components/others/download'], resolve)
//活动
// const ActivityList = resolve => require(['@/components/activity/oldActivity/activityList'], resolve)
const ActivityHead = resolve => require(['@/components/activity/oldActivity'], resolve)
const ActivityDetail = resolve => require(['@/components/activity/oldActivity/activityDetail'], resolve)
const ActivityRank = resolve => require(['@/components/activity/oldActivity/activityRank'], resolve)
//新版活动
const newActivity = resolve => require(['@/components/activity'], resolve)
const newActivityDetail = resolve => require(['@/components/activity/detail'], resolve)
const rank = resolve => require(['@/components/activity/rank'], resolve)
//专题
const topic = resolve => require(['@/components/topic'], resolve)
//权限错误提示
const Error = resolve => require(['@/components/common/powerError'], resolve)
//运营活动
// const invitation = resolve => require(['@/components/pcActivity/invitation'], resolve)
// const newedition = resolve => require(['@/components/pcActivity/newedition'], resolve)
// const newguide = resolve => require(['@/components/pcActivity/newguide'], resolve)  
// const newinvitation = resolve => require(['@/components/pcActivity/newinvitation'], resolve)
// const chineseSelection = resolve => require(['@/components/pcActivity/chineseSelection'], resolve)
// const springFestival = resolve => require(['@/components/pcActivity/springFestival'], resolve)
// const winnerList = resolve => require(['@/components/pcActivity/winnerList'], resolve)
// const Inviting = resolve => require(['@/components/pcActivity/Inviting'], resolve)



//股票
// const shares = resolve => require(['@/components/pcActivity/shares'], resolve)
//文字
// const chinese = resolve => require(['@/components/pcActivity/chinese'], resolve)
// const solicitation = resolve => require(['@/components/pcActivity/chinese/solicitation'], resolve)
// const competition = resolve => require(['@/components/pcActivity/chinese/competition'], resolve)
// const selectionn = resolve => require(['@/components/pcActivity/chinese/selectionn'], resolve)
//文案
const Strategysharing = resolve => require(['@/components/others/problems/Strategy_sharing'], resolve)
const Loginregistration = resolve => require(['@/components/others/problems/Login_registration'], resolve)
const Marketplanning = resolve => require(['@/components/others/problems/Market_planning'], resolve)
const Clearingtransaction = resolve => require(['@/components/others/problems/Clearing_transaction'], resolve)
const Accountrecord = resolve => require(['@/components/others/problems/Account_record'], resolve)
const Currencyrecharge = resolve => require(['@/components/others/problems/Currency_recharge'], resolve)
// 申购
const Subscribe = resolve => require(['@/components/subscribe'], resolve)
const EventDetail = resolve => require(['@/components/subscribeDetail'], resolve)
const ShengouTrade = resolve => require(['@/components/subscribeDetail/trade'], resolve)
//好友助力
const HelpBox = resolve => require(['@/components/personal/assets/gift/boxHelp'], resolve)

Vue.use(Router)

export default new Router({
  history: true,
  saveScrollPosition:false,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        header: HeaderNormal,
        default: Index
      }
    },
    {
      path: '/home',
      name: 'index',
      components: {
        header: HeaderNormal,
        default: Index
      }
    },
    {
      path:'/register',
      name:'register',
      components: {
        header: HeaderNormal,
        default: Register
      }
    },
    {
      path:'/login',
      name:'login',
      components: {
        header: HeaderNormal,
        default: Login
      }
    },
    {
      path:'/reset',
      name:'resetPwd',
      components: {
        header: HeaderNormal,
        default: ResetPwd
      }
    },
    // {
    //   path:'/invitation',
    //   name:'invitation',
    //   components: {
    //     header: HeaderNormal,
    //     default: invitation
    //   }
    // },
    // {
    //   path:'/newedition',
    //   name:'newedition',
    //   components: {
    //     header: HeaderNormal,
    //     default: newedition
    //   }
    // },
    // {
    //   path:'/newguide',
    //   name:'newguide',
    //   components: {
    //     header: HeaderNormal,
    //     default: newguide
    //   }
    // },
    // {
    //   path:'/shares',
    //   name:'shares',
    //   components: {
    //     header: HeaderNormal,
    //     default: shares
    //   }
    // },
    // {
    //   path:'/newinvitation',
    //   name:'newinvitation',
    //   components: {
    //     header: HeaderNormal,  
    //     default: newinvitation
    //   }
    // },
    // {
    //   path:'/chineseSelection',
    //   components: {
    //     header: HeaderNormal,
    //     default: chineseSelection
    //   }
    // },
    // {
    //   path:'/springFestival',
    //   components: {
    //     header: HeaderNormal,
    //     default: springFestival    
    //   }
    // },
    // {
    //   path:'/winnerList',
    //   components: {
    //     header: HeaderNormal,
    //     default: winnerList    
    //   }
    // },
    // {
    //   path:'/Inviting',
    //   name:' Inviting',
    //   components: {
    //     header: HeaderNormal,  
    //     default:  Inviting
    //   }
    // },
//  {
//    path:'/HeaderCommon',
//    components: {
//      default: HeaderCommon
//    }
//  },
    // {
    //   path:'/chinese',
    //   name:'chinese',
    //   components: {
    //     header: HeaderNormal,
    //     default: chinese
    //   },
    //   children:[
    //   	{
    //   		path:'/chinese/solicitation',
    //   		component:solicitation
    //   	},
    //   	{
    //   		path:'/chinese/competition',
    //   		component:competition
    //   	},
    //   	{
    //   		path:'/chinese/selectionn',
    //   		component:selectionn
    //   	}
    //   ]
    // },
    {
      path: '/predict',
      name:'/predict',
      redirect: '/predict/all/4/1'
    },
    {
      path: '/predict/:classify',
      redirect: '/predict/:classify/4/1'
    },
    {
      path: '/predict/:classify/:type',
      redirect: '/predict/:classify/:type/1'
    },
    {
      path: '/predict/:classify/:type/:page',
      components: {
        header: HeaderNormal,
        default: List
      }
    },
    {
      path: '/criticism',
      redirect: '/criticism/all/4/1'
    },
    {
      path: '/criticism/:classify',
      redirect: '/criticism/:classify/4/1'
    },
    {
      path: '/criticism/:classify/:type',
      redirect: '/criticism/:classify/:type/1'
    },
    {
      path: '/criticism/:classify/:type/:page',
      components: {
        header: HeaderNormal,
        default: List
      }
    },
    /*{
      path: '/activity',
      components: {
        header: HeaderNormal,
        default: ActivityList
      }
    },*/
    {
      path:'/topic',
      components:{
        header: HeaderNormal,
        default:topic
      }
    },
    {
      path:'/topic/:id',
      components:{
        header: HeaderNormal,
        default:newActivityDetail
      }
    },
    {
      path:'/newActivity',
      components:{
        header: HeaderNormal,
        default:newActivity
      }
    },
    {
      path:'/newActivity/:id',
      components:{
        header: HeaderNormal,
        default:newActivityDetail
      }
    },
    {
      path:'/rank',
      components:{
        header: HeaderNormal,
        default:rank
      }
    },
    {
      path:'/powerError',
      components:{
        header: HeaderNormal,
        default:Error
      }
    },
    {
      path: '/activity/:id',
      components: {
        header: HeaderNormal,
        default: ActivityHead
      },
      children: [
      	{
      		path: '',
      		component: ActivityDetail
      	},
      	{
      		path: 'rank',
      		component: ActivityRank
      	}
      ]
    },
    {
      path: '/three',
      name:'three',
      components: {
        header: HeaderNormal,
        default: Three
      }
    },
    {
      path: '/na',
      components: {
        header: HeaderNormal,
        default: Threelogin
      }
    },
    {
      path: '/bd',
      components: {
        header: HeaderNormal,
        default: Threebd
      }
    },
    {
      path: '/wb',
      components: {
        header: HeaderNormal,
        default: Threewb
      }
    },
    {
      path: '/group/:id',
      name:'group',
      components: {
        header: HeaderNormal,
        default: Group
      }
    },
    {
      path: '/event/:id',
      components: {
        header: HeaderNormal,
        default: Event
      }
    },
    {
      path: '/event/trade/:id',
      components: {
        header: HeaderNormal,
        default: Trade
      }
    },
    //充值协议
    {
      path: '/rechargedeal',
      components: {
        header: HeaderNormal,
        default: RechargeDeal
      }
    },
    //申购
    {
      path: '/subscribe/',
      components: {
        header: HeaderNormal,
        default: Subscribe
      }
    },
    //申购详情
     {
      path: '/subscribeDetail/:id',
      components: {
        header: HeaderNormal,
        default: EventDetail
      }
    },
    {
      path: '/subscribeTrade/:id',
      components: {
        header: HeaderNormal,
        default: ShengouTrade
      }
    },
    //好友助力
    {
      path: '/gifthelp',
      component: HelpBox
    },
   	{
      path: '/mall',
      components: {
        header: HeaderNormal,
        default: Mall
      },
      children: [
        {
          path: 'list',
          component: MallList
        },
        {
          path: 'list/virtual',
          component: MallList
        },
        {
          path: 'list/luck/',
          component: MallList
        },
        {
          path: 'list/entity',
          component: MallList
        },
        {
          path: 'newincreased',
          component: Mallnewincreased
        },
        {
          path: 'logistics',
          component: Malllogistics
        },
        {
          path: 'info',
          component: Mallinfo
        },
        {
          path: 'record',
          component: Mallrecord
        },
        {
          path: 'success',
          component: Mallsuccess
        },
        {
          path: 'error',
          component: Mallerror
        },
        {
          path: 'goods',
          component: Mallgoods
        }
      ]
    },
    {
      path: '/personal',
      components: {
        header: HeaderNormal,
        default: Personal
      },
      children: [
        {
          path: '',
          component: PersonalCenter
        },
        {
          path: 'follow',
          component: PersonalFollow,
          children: [
            {
              path: '',
              redirect: 'predict/1'
            },
            {
              path: 'predict',
              redirect: 'predict/1'
            },
            {
              path: 'predict/:page',
              component: PersonalFollowEventForecast
            },
            {
              path: 'criticism',
              redirect: 'criticism/1'
            },
            {
              path: 'criticism/:page',
              component: PersonalFollowEvent
            },
            {
              path: 'activity',
              redirect: 'activity/1'
            },
            {
              path: 'activity/:page',
              component: PersonalFollowActivity
            }
          ]
        },
        {
          path: 'assets',
          component: PersonalAssets,
          children: [
            {
              path: '',
              component: PersonalAssetsFuture
            },
            {
              path: 'gold',
              component: PersonalAssetsGold
            },
            {
              path: 'cash',
              component: PersonalAssetsCash
            },
            {
              path: 'gift',
              component: PersonalAssetsGift
            }
          ]
        },
        {
          path: 'orders',
          component: PersonalOrder,
          children: [
            {
              path: '',
              component: PersonalOrderposition
            },
            {
              path: 'await',
              component: PersonalOrderawait
            },
            {
              path: 'clear',
              component: PersonalOrderclear
            }
          ]
        },
        {
        	path: 'campaign',
          component: PersonalCampaign
        },
        {
        	path: 'join',
          component: PersonalJoin
        },
        {
          path: 'subjectdeal',
          component: PersonalSubjectDeal
        },
        {
          path: 'subject',
          component: PersonalSubject,
          children: [
            {
              path: '',
              component: PersonalSubjectAdd
            },
            {
              path: 'record',
              redirect: 'record/1'
            },
            {
              path: 'record/:page',
              component: PersonalSubjectRecord
            }
          ]
        },
        {
          path: 'subject/record/detail/:id',
          component: PersonalSubjectRecordDetail
        },
        // 账户设置
        {
          path: 'account',
          component: PersonalAccount,
          children: [
            {
              path: '',
              component: PersonalAccountInformation
            },
            {
              path: 'safe',
              component: PersonalAccountSafe
            },
            {
              path: 'bind',
              component: PersonalAccountBind
            },
//          {
//            path:'weibo',
//            component:PersonalAccountWeibo
//          },
            {
              path: 'level',
              component: PersonalAccountLevel
            },
            {
              path: 'address',
              component: PersonalAccountAddress
            }
          ]
        },
        {
          path: 'invite',
          component: PersonalInvite
        },
        {
          path: 'message',
          component: PersonalMessage
        },
        {
          path: 'recharge',
          component: PersonalRecharge
        },
        {
          path: 'withdrawals',
          component: PersonalWithdrawals
        },
        {
          path: 'withdrawals/bind/alipay',
          component: PersonalWithdrawalsBindAlipay
        }
      ]
    },
    {
      path: '/search/:key',
      name: 'search',
      components: {
        header: HeaderNormal,
        default: Search
      }
    },
    {
      path: '/others',
      components: {
        header: HeaderNormal,
        default: Others
      },
      children: [
        {
          path: '',
          component: OthersAbout
        },
        {
          path: 'news',
          component: OthersNews
        },
        {
          path: 'newdetails',
          component: Newsdetails
        },
        {
          path: 'agreement',
          component: OthersAgreement
        },
        {
          path: 'newincreased',
          component: Mallnewincreased
        },
        {
          path: 'contact',
          component: OthersContact
        },
        {
          path: 'feedback',
          component: OthersFeedback
        },
        {
          path: 'download',
          component: OthersDownload
        },
        {
          path: 'problems',
          components: {
            default: OthersProblems
          },
          children: [
             {
                path: '',
                component: Strategysharing
              },
              {
                path: '/problems/Strategy_sharing',
                component: Strategysharing
              },
              {
                path: '/problems/Login_registration',
                component: Loginregistration
              },
              {
                path: '/problems/Market_planning',
                component: Marketplanning
              },
              {
                path: '/problems/Clearing_transaction',
                component: Clearingtransaction
              },
              {
                path: '/problems/Account_record',
                component: Accountrecord
              },
              {
                path: '/problems/Currency_recharge',
                component: Currencyrecharge
              }
           ]
        }
      ]
    },
    {
      path: '*',
      components: {
        header: HeaderNormal,
        default: NotFound
      }
    }
  ]
})
