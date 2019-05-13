import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let Ax = axios.create({
  // baseURL: 'http://g17x033694.51mypc.cn'
  baseURL: 'http://api.lyzjshop.com/'
})

// 响应拦截
Ax.interceptors.response.use(
  response => {
    // if (response.data.status == 200) {
      return response.data.data
    // }
  },
  error => {
    console.log(error)
  }
)

// 获取商城卡券列表
export function GetCouponList (params) {
  return Ax.post(`/Coupon/GetCouponList`, params)
}

// 获取卡券详情
export function GetCouponById (params) { 
  return Ax.post(`/Coupon/GetCouponById`, params)
}

// 我的卡券列表
export function GetCouponListByUser(params) { 
  return Ax.post(`/Coupon/GetCouponListByUser`, params)
 }

//  我的卡卷详情
 export function GetConponByUser(params) { 
   return Ax.post(`/Coupon/GetConponByUser`, params)
  }

  // 获取用户信息
  export function GetUser(params) { 
    return Ax.post(`/UserInfo/GetUser`, params)
   }

  //  申请代理商
  export function AgentApply(params) { 
    return Ax.post(`/Agent/AgentApply`, params)
   }

  //  卡卷提现
  export function CouponExtract(params) { 
    return Ax.post(`/Coupon/CouponExtract`, params)
   }
  //  卡券兑换
   export function CouponExchange(params) {
    return Ax.post(`/Coupon/CouponExchange`, params)
   }

  //  卡券下单
  export function downOrder(params) { 
    return Ax.post(`/Coupon/CouponOrder`, params)
   }

  //  卡卷退款
  export function CouponRefund(params) {
    return Ax.post(`/Coupon/CouponRefund`, params)
  }

  // 卡卷提现
  export function CouponDonation (params) {
    return Ax.post(`/Coupon/CouponDonation`, params)
  }

  // 获取微信配置
  // export function getWxInfo(params) { 
  //   return Ax.post(`/WeiXin/GetInfo`, params)
  //  }

export default Ax