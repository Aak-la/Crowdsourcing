<template>
  <div class="about-container">
    <div class="content">
      <div class="user-info">
        <div class="avatar">
          <el-avatar :size="60" :src="avatar"></el-avatar>
        </div>
        <div class="title">
          <div class="user-name">{{ name }}</div>
          <div class="recommended">
            <i class="el-icon-plus"></i>&nbsp;
            <span>我就任性你管不着</span>
          </div>
          <div class="recommended">
            <i class="el-icon-plus"></i>&nbsp;
            <span>我就任性你管不着</span>
          </div>
        </div>
        <div class="action-box">
          <div class="link-box">
            <i class="el-icon-s-comment"></i>
            <i class="el-icon-s-comment"></i>
            <i class="el-icon-s-comment"></i>
          </div>
          <div class="link-btn">
            <el-button type="info" plain @click="modifyTheInformation"
              >编辑个人信息</el-button
            >
          </div>
        </div>
      </div>
      <div class="columns">
        <ul class="columns-nav">
          <RouterLink :to="{}"><li>动态</li></RouterLink>
          <RouterLink :to="{}"><li>文章</li></RouterLink>
          <RouterLink :to="{}"><li>专栏</li></RouterLink>
          <RouterLink :to="{}"><li>沸点</li></RouterLink>
          <RouterLink :to="{}"><li>收藏集</li></RouterLink>
        </ul>
      </div>
      <router-view></router-view>
    </div>
    <div class="sidebar">
      <div class="information">
        <div class="focusOn">
          <div class="focusOn-title">评论条数</div>
          <div class="focusOn-title">关注个数</div>
          <div class="focusOn-number">9</div>
          <div class="focusOn-number">9</div>
        </div>
      </div>
      <div class="theLabel">
        <div class="item"><span>点赞数</span><span>20</span></div>
        <div class="item"><span>关注标签</span><span>20</span></div>
        <div class="item"><span>加入时间</span><span>20</span></div>
      </div>
    </div>
  </div></template
>

<script>
import { createLogger, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["name", "avatar"]),
  },
  methods: {
    modifyTheInformation() {
      this.$router.push({ name: "information" });
    },
  },
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f6f6f6;
  .content {
    width: 100%;
    height: 100%;
    min-width: 600px;
    .columns {
      background-color: #ffffff;
      width: 80%;
      margin: 0 auto;
      .columns-nav {
        list-style: none;
        display: flex;
        li {
          width: 80px;
          font-size: 17px;
          padding: 15px;
        }
      }
    }
  }
  .sidebar {
    width: 30%;
    height: 100%;
    min-width: 260px;
    max-width: 315px;
    box-sizing: border-box;
    .information {
      padding: 40px;
      background-color: #ffffff;
      margin-left: 6px;
      .focusOn {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .focusOn-title,
        .focusOn-number,
        .focusOn-title,
        .focusOn-number {
          width: 87px;
          font-size: 17px;
          text-align: center;
          padding: 5px;
          box-sizing: border-box;
        }
      }
    }
    .theLabel {
      padding: 30px;
      box-sizing: border-box;
      .item {
        display: flex;
        font-size: 18px;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
  .user-info {
    width: 80%;
    background-color: #ffffff;
    justify-content: space-between;
    margin: 0 auto;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    .title {
      width: 65%;
      .user-name {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .recommended {
        font-size: 15px;
        margin: 10px 0;
      }
    }
    .action-box {
      .link-box {
        margin-bottom: 50px;
      }
    }
  }
}
</style>
