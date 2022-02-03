<template>
  <div class="index" :style="BgImgSrc">
    <h1>欢迎来到小熊博客</h1>
    <div class="wrap">
      账号:&nbsp;&nbsp;<input type="text" placeholder="请填写账号" v-model="name"/><br />
      密码:&nbsp;&nbsp;<input type="password" v-model="passWord" placeholder="请填写密码" />
      <div class="btn">
        <button @click="Login">登录</button
        ><button @click="Register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BgImgSrc: {
        backgroundImage: "url(" + require("../../assets/loginbg.jpg") + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      },
      passWord:"",
      name:""
    };
  },
  methods: {
    Login() {
     this.$router.replace("/layout");
    },
    Register() {
     
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.index {
  height: 100vh;
  width: 100vw;

  overflow: hidden;
  h1 {
    color: #fff;
    text-align: center;
  }

  .wrap {
    .self-center();
    padding: 50px 30px;
    box-sizing: border-box;
    width: 350px;
    height: 220px;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    input {
      border: none;
      margin-bottom: 20px;
      height: 30px;
      width: 220px;
      padding-left: 25px;
      border-radius: 20px;
    }
    > input:nth-child(1) {
      background: url("../../assets/zh.png") no-repeat 3px;
      background-size: 20px;
      color: #fff;
    }
    > input:nth-child(3) {
      background: url("../../assets/psw.png") no-repeat 3px;
      background-size: 20px;
      color: #fff;
    }
    .btn {
      display: flex;
      justify-content: space-around;
    }
    button {
      /* color: #333; */
      width: 100px;
      border-radius: 20px;
      cursor: pointer;
    }
  }
  *::-webkit-input-placeholder {
    color: #fff;
  }
  *:-moz-placeholder {
    /* FF 4-18 */
    color: #fff;
  }
  *::-moz-placeholder {
    /* FF 19+ */
     color: #fff;
  }
  *:-ms-input-placeholder {
    /* IE 10+ */
    color: #fff;
  }
}
</style>