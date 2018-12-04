// const util = require('../../utils/util.js')
const conf = {
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = conf.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        'calendar.hasEmptyGrid': true,
        'calendar.empytGrids': empytGrids,
      });
    } else {
      this.setData({
        'calendar.hasEmptyGrid': false,
        'calendar.empytGrids': [],
      });
    }
  },

  //calculateDays(year, month) {
  calculateDays(year, month) {

    const termdate = new Date(); //计算新的月份和年份
    const termArr = []
    for (let i = 0; i <= 12; i++) {
      let days = [];
      
      
      let month = termdate.getMonth()+1
      termdate.setMonth(month,1)
     // console.log("dd",termdate.getMonth())
 
      
     
       
      const thisMonthDays = conf.getThisMonthDays(termdate.getFullYear(), termdate.getMonth());

      for (let j = 1; j <= thisMonthDays; j++) {
        //判断是否是当天        
        days.push({
          day: j,
          choosed: false,

        });
      }
    
      
      let termMonth = termdate.getMonth() == 0 ?  12 : termdate.getMonth()
   
      termArr.push({
        arrIndex: i,
        year: termdate.getFullYear(),
        month: termMonth,
        days: days
      })


    }

    this.setData({
      'calendar.termArr': termArr
    });
  },

  //改变月份
  handleCalendar(e) {
    console.log("改变月份")

    //const handle = e.currentTarget.dataset.handle;
 
    const monthIndex = e.detail.current

    const curYear = this.data.calendar.curYear;
    const curMonth = this.data.calendar.curMonth;
    const baseMonth = new Date().getMonth() + 1
    const baseYear = new Date().getFullYear()
    let newMonth = 0

    let newYear = baseYear;
    if (newMonth < 1) {

      newMonth = 12;

      newMonth = baseMonth + monthIndex;
      newYear = baseYear
    }

    if (newMonth >= 12) {
      newYear = baseYear + 1;
      newMonth = 1;
      newMonth = baseMonth + monthIndex - 12
    }
 

    conf.calculateDays.call(this);
    conf.calculateEmptyGrids.call(this, newYear, newMonth);

    wx.setStorageSync('dateinfo', {
      year: newYear,
      month: newMonth
    })
    this.setData({
      'calendar.curYear': newYear,
      'calendar.curMonth': newMonth,
      monthIndex: e.detail.current,
      'calendar.monthIndex': monthIndex
    });

   
    const year = wx.getStorageSync('dateinfo').year
    const month = wx.getStorageSync('dateinfo').month

    this.getActiveState(year, month).then(() => {
      this.setActionState(monthIndex)
    })


    //调用设定状态方法


  },



  //单击某个日期
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const arrindex = e.currentTarget.dataset.arrindex;
    const termArr = this.data.calendar.termArr;
    const dayss = termArr[arrindex].days;
    const year = termArr[arrindex].year;
    const month = termArr[arrindex].month;

    for (let i = 0; i < termArr.length; i++) {
      for (let d in termArr[i].days) {
        termArr[i].days[d].choosed = false
      }
    }
    dayss[idx].choosed = !dayss[idx].choosed;
    this.setData({
      'calendar.termArr': termArr,

    });

    // console.log(""+this.data.calendar.curYear + this.data.calendar.curMonth + e.currentTarget.dataset.day)
    this.getTripActive(year + "-" + month + "-" + e.currentTarget.dataset.day)
  },

  chooseYearAndMonth() {
    let pickerYear = [];
    let pickerMonth = [];
    for (let i = 1900; i <= 2100; i++) {
      pickerYear.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      pickerMonth.push(i);
    }
    this.setData({
      'calendar.showPicker': true,
    });


  },
};

function _getCurrentPage() {
  const pages = getCurrentPages();
  const last = pages.length - 1;
  return pages[last];
}



export default () => {
  const self = _getCurrentPage();
  const date = new Date();

  const curYear = date.getFullYear();
  const curMonth = date.getMonth() + 1;

  //const termMonth = termdate.setMonth(termdate.getMonth()+12)

  const weeksCh = ['日', '一', '二', '三', '四', '五', '六'];

  self.setData({
    calendar: {
      monthIndex: self.data.monthIndex,
      curYear,
      curMonth,
      weeksCh,
      hasEmptyGrid: false,
    }
  });
  if(!self.data.calendar.monthIndex){
    wx.setStorageSync('dateinfo', {
      year: curYear,
      month: curMonth
    })
  }

  if(wx.getStorageSync('dateinfo')==""){
    conf.calculateEmptyGrids.call(self, curYear, curMonth);
  }
  else{
    const year = wx.getStorageSync('dateinfo').year
    const month = wx.getStorageSync('dateinfo').month
    conf.calculateEmptyGrids.call(self, year, month);
  }

 
  conf.calculateDays.call(self, curYear, curMonth)
  self.tapDayItem = conf.tapDayItem.bind(self);
  self.handleCalendar = conf.handleCalendar.bind(self);
  self.chooseYearAndMonth = conf.chooseYearAndMonth.bind(self);



};