const baseUrl = "https://ssl.zhaodaka.net/pengqu/";

const dateFormat = date => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return year + "-" + month + "-" + day;
  //+ " " + hour + ":" + minute + ":" + second
};

const timeFormat = date => {
  let hour = date.getHours();
  let minute = date.getMinutes();
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  return `${hour}:${minute}`;
};

const showMsg = function(msg) {
  wx.showToast({
    title: msg,
    mask: true,
    icon: "none"
  });
};

//验证手机格式函数
const isPoneAvailable = phone => {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(phone)) {
    return false;
  } else {
    return true;
  }
};

//总验证函数
/**
 * 
 * @param {数据对象}} formdata 
 * @param {验证字段,规则} param1 
 * 
 *范例
 *  Validate (data, {
  rules: {
    name: {
      required: true,
      message: '请选择权限组',
    },
    phone: {
      required: true,
      phone: true,
      message: ['请选择权限组', '手机格式不对'],
    },
  },
}).then(()=>{}){}.catch(){}
 * 
 */
const Validate = (formdata, { rules = {} } = {}) => {
  let err = null;
  if (!formdata) {
    console.log("请填写验证数据");
    err = {
      msg: "请填写验证数据"
    };
    return Promise.reject(err);
  }
  for (let key in formdata) {
    for (let rulefiled in rules) {
      //判断是否为空
      if (rules[rulefiled] && rules[rulefiled].required == true) {
        if (formdata[rulefiled] == "") {
          err = {
            msg: rules[rulefiled].message
          };

          return Promise.reject(err);
        }
      }
      //判断是否相等

      //规则验证
      if (rules[rulefiled].phone && rules[rulefiled].phone == true) {
        if (isPoneAvailable(formdata[rulefiled]) == false) {
          if (Array.isArray(rules[rulefiled].message)) {
            err = {
              msg: rules[rulefiled].message[1]
            };
          } else {
            err = {
              msg: rules[rulefiled].message
            };
          }

          return Promise.reject(err);
        }
      }
    }
  }
  return Promise.resolve(formdata);
};

module.exports = {
  dateFormat: dateFormat,
  timeFormat: timeFormat,
  Validate: Validate,
  baseUrl: baseUrl,
  showMsg: showMsg
};
