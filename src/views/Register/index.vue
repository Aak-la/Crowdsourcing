<template>
	<div class="index">
		<h1>请填写注册信息</h1>
		<div class="wrap">
			登录账号:&nbsp;&nbsp;<input type="text" placeholder="请填写账号" v-model="name" /><br />
			登录密码:&nbsp;&nbsp;<input type="password" v-model="passWord" placeholder="请填写密码" />
			<div class="btn">
				<button @click="Register">立即注册</button> <button @click="logIn">去登录</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		register
	} from "@/api/register"
	import showMessage from "@/utils/showMessage.js";
	export default {
		data() {
			return {
				isLoading: true,
				name: "小叶",
				passWord: "12345",
			};
		},

		methods: {
			async Register() {
				let isRegister = true
				if (this.name.length == 0) {
					confirm("用户名不能为空");
					return isRegister =false;
				}
				if (this.passWord.length == 0) {
					confirm("密码不能为空");
					return isRegister =false;
				}
				if (isRegister) {
					const resp = await register(this.name, this.passWord)
					if (resp) {
						showMessage({
							content: resp[0].msg,
							type: "info",
							duration: 1500,
						})
						this.name = ""
						this.passWord = ""
					}
				}
			},
			logIn(){
				this.$router.replace("/");
			}
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
			margin-top: 90px
		}

		.wrap {
			.self-center();
			padding: 50px 30px;
			box-sizing: border-box;
			width: 450px;
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

			>input:nth-child(1) {
				background: url("../../assets/zh.png") no-repeat 3px;
				background-size: 20px;
				color: #fff;
			}

			>input:nth-child(3) {
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
