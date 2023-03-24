<template>
    <div class="login-container">
        <img class="bgImg" src="../../assets/pexels-photo.jpeg" alt="" />
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">超市后台管理系统</h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="账户"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-tooltip
                v-model="capsTooltip"
                content="Caps lock is On"
                placement="right"
                manual
            >
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon
                            :icon-class="
                                passwordType === 'password' ? 'eye' : 'eye-open'
                            "
                        />
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleLogin"
                >登录</el-button
            >
        </el-form>
        <div class="register">
            <h5 @click="handleRegister">去注册>>></h5>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        const validateUsername = (rule, value, callback) => {
            if (value.length < 1) {
                callback(new Error('账户不能为空'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 3) {
                callback(new Error('密码不能少于三位'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '小熊',
                password: '123'
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validateUsername
                    }
                ],
                password: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validatePassword
                    }
                ]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {},
            timer: null
        }
    },

    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.$store
                        .dispatch('user/handleLogin', this.loginForm)
                        .then((res) => {
                            this.$message({
                                message: res.msg,
                                type: res.type,
                                duration: 2000
                            })
                            window.sessionStorage.setItem('token', res.token)
                            this.timer = setTimeout(() => {
                                this.$router.push('home')
                            }, 1200)
                            this.loading = false
                        })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        handleLogout() {
            this.$router.replace('/')
        },
        handleRegister() {
            this.$router.replace('/register')
        },
        destroyed() {
            clearTimeout(this.timer)
        }
    }
}
</script>

<style lang="less">
.login-container {
    .bgImg {
        position: absolute;
        width: 100vw;
        height: 100vh;
    }
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0px;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #fff;
            height: 47px;
            caret-color: #fff;
            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px #283443 inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
}

.el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
}
.login-container {
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: #eee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }
    .register {
        z-index: 999;
        color: #fff;
        cursor: pointer;
        width: 90px;
        position: relative;
        animation: dance-down 6s infinite;
        left: 70%;
    }
    @keyframes dance-down {
        0% {
            left: 70%;
        }
        25% {
            left: 71%;
        }
        50% {
            left: 70%;
        }
        75% {
            left: 71%;
        }
        100% {
            left: 70%;
        }
    }
    .tourist {
        z-index: 999;
        color: #fff;
        cursor: pointer;
        width: 90px;
        position: relative;
        animation: dance-down 6s infinite;
        left: 70%;
    }
}
</style>
