<template>
  <div class="index">
    <h1>欢迎来到小熊博客</h1>
    <div class="wrap">
      账号:&nbsp;&nbsp;<input
        type="text"
        placeholder="请填写账号"
        v-model="name"
      /><br />
      密码:&nbsp;&nbsp;<input
        type="password"
        v-model="passWord"
        placeholder="请填写密码"
      />
      <div class="btn">
        <button @click="Login">登录</button
        ><button @click="Register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from "@/api/logIn";
import showMessage from "@/utils/showMessage.js";
export default {
  data() {
    return {
      isLoading: true,
      passWord: "123",
      name: "小白",
      timer: null,
    };
  },

  methods: {
    async Login() {
      const res = await getUser(this.name, this.passWord);
      /* this.$store.dispatch("project/fetchProject"); */
      /* console.log(this.$store);
      console.log(res.data.data.code); */
      if (res.data.data.code == "200") {
        showMessage({
          content: res.data.data.msg,
          type: res.data.data.type,
          duration: 1500,
        });
        this.timer = setTimeout(() => {
          this.$router.replace("/layout");
        }, 1500);
      }
    },
    Register() {
      this.$router.replace("/register");
    },
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.index {
  height: 100vh;
  width: 100vw;
  background-image: url(../../assets/loginbg.jpg);
  background-size: cover;
  overflow: hidden;

  h1 {
    color: #fff;
    text-align: center;
    margin-top: 40px;
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

  input:focus::-webkit-input-placeholder {
    color: transparent;
    /* transparent是全透明黑色(black)的速记法，即一个类似rgba(0,0,0,0)这样的值 */
  }

  /* Mozilla Firefox 4 to 18 */

  input:focus:-moz-placeholder {
    color: transparent;
  }

  /* Mozilla Firefox 19+ */

  input:focus::-moz-placeholder {
    color: transparent;
  }

  /* Internet Explorer 10+ */

  input:focus:-ms-input-placeholder {
    color: transparent;
  }
}
</style>
