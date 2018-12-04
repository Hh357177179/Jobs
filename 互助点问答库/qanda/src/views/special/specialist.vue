<template>
  <div class="specialist">
    <div class="special_top clearfix">
      <span class="question_type" @click="quePicker">{{questionTypes}}
        <!-- <i class="icon-xiala1 iconfont xialaIcon"></i> -->
      </span>
      <span class="answer_type" @click="ansPicker">{{answerType}}
        <!-- <i class="iconfont icon-xiala1 xialaIcon"></i> -->
      </span>
    </div>
    <div class="special_mian">
      <div class="s_main_card" @click="searchpuhlic">
        <p class="s_main_top clearfix">
          <span class="s_main_title">有关EHS人才可持续发展的建议？有关EHS人才可持续发展的建议？</span>
          <span class="type_text">分类1</span>
        </p>
        <div class="s_main_content">哈哈哈哈哈哈我是内容哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈</div>
        <div class="s_main_pic">
          <p class="s_pic">
            <img src="../../assets/image/demo.jpg" alt="">
          </p>
          <p class="pic_text">公示阶段：第6日</p>
        </div>
      </div>
      <div class="s_main_card" @click="rUnanswer">
        <p class="s_main_top clearfix">
          <span class="s_main_title">有关EHS人才可持续发展的建议？有关EHS人才可持续发展的建议？</span>
          <span class="type_text">分类1</span>
        </p>
        <div class="s_main_content">哈哈哈哈哈哈我是内容哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈</div>
        <div class="s_main_pic">
          <p class="s_pic">
            <img src="../../assets/image/demo.jpg" alt="">
          </p>
          <p class="pic_text">未回答阶段</p>
        </div>
        <p class="reward">悬赏EHS互助点：50</p>
      </div>
    </div>
    <!-- picker问题分类 -->
    <van-popup v-model="queshow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="请选择问题分类" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
    <!-- picker回答阶段 -->
    <van-popup v-model="ansShow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="请选择问答阶段" :columns="ansArr" @cancel="onCancel" @confirm="ansConfirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      questionTypes: '请选择问题分类',
      queshow: false,
      columns: ['全部', '职业健康', '消防安全', '生产安全', '危化品管理', '环境保护', '领导力', '可持续发展',],
      ansShow: false,
      ansArr: ['全部','1','2'],
      answerType: '请选择问答阶段'
    }
  },
  methods: {
    // 显示问题分类选择框
    quePicker () {
      this.queshow = true
    },
    ansPicker () {
      this.ansShow = true
    },
    // 关闭
    onCancel () {
      this.queshow = false,
      this.ansShow = false
    },
    // 选择当前问题分类值
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.questionTypes = `${value}`
      this.queshow = false
    },
     // 选择当前问题分类值
    ansConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.answerType = `${value}`
      this.ansShow = false
    },
    // 跳转未回答页面详情
    rUnanswer () {
      this.$router.push('/unanswer')
    },
    // 跳转公示详情
    searchpuhlic () {
      this.$router.push('/publicityd')
    }
  }
}
</script>

<style lang="less">
  .special_top{
    width: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    padding: 10px 30px;
    border-bottom: 1px solid #d9d9d9;
    font-size: 15px;
    span{
      border: 1px solid #d9d9d9;
      padding: 10px 0;
      border-radius: 5px;
      color: #666;
      text-align: center;
      position: relative;
      .xialaIcon{
        position: absolute;
        right: 3px;
        font-size: 15px;
        top: 12px;
      }
    }
    .question_type{
      float: left;
      width: 140px;
    }
    .answer_type{
      float: right;
      width: 140px;
    }
  }
  .special_mian{
    padding-top: 65px;
    .s_main_card{
      border-bottom: 1px solid #d9d9d9;
      padding: 5px 15px;
      .s_main_top{
        // line-height: 20px;
        .s_main_title{
          float: left;
          font-size: 16px;
          width: 80%;
          // background: #ccc;
        }
        .type_text{
          float: right;
          font-size: 14px;
          margin-top: 2px;
          color: #eb622b;
        }
      }
      .s_main_content{
        margin-top: 10px;
        font-size: 15px;
      }
      .s_main_pic{
        margin-top: 10px;
        position: relative;
        .s_pic{
          width: 180px;
          height: 120px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .pic_text{
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: 14px;
          color: #f00;
        }
      }
      .reward{
        color: #3F51B5;
        font-size: 14px;
        text-align: right;
        margin-top: 10px;
      }
    }
  }
</style>
