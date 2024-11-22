<template>
  <div class="login_page">
    <div class="bg"></div>
    <div class="login_box">
      <div class="box_bg"></div>
      <div class="logo_title">
        <p>DNA指纹库</p>
      </div>
      <div class="info_box">
        <h1>{{ showRegister ? "注册账户" : "欢迎登陆" }}</h1>
        <el-form ref="loginFormRef" :model="userInfo" :rules="loginRules">
          <el-form-item label="" prop="username">
            <div class="form_item">
              <el-input type="text" v-model="userInfo.username" clearable placeholder="请输入用户名" />
            </div>
          </el-form-item>
          <el-form-item label="" prop="password">
            <div class="form_item">
              <el-input type="password" v-model="userInfo.password" clearable placeholder="请输入密码" show-password />
            </div>
          </el-form-item>
          <el-form-item label="" prop="passwordAgain" v-if="showRegister">
            <div class="form_item">
              <el-input type="password" v-model="userInfo.passwordAgain" clearable placeholder="请确认密码" show-password />
            </div>
          </el-form-item>
          <el-form-item label="" prop="verifyCode" v-if="!showRegister" :rules="[{ required: true, message: '请输入验证码' } ]">
            <div class="form_item">
              <el-input class="verify_code" type="text" v-model="userInfo.verifyCode" clearable placeholder="请输入验证码" />
              <div class="get_code" @click="getVerifyCode">{{ userInfo.code }}</div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form_item">
              <el-button type="submit" @click="login">{{ showRegister ? "注册" : "登陆" }}</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form_item remember_box">
              <span class="register" @click="showRegister = !showRegister">{{ showRegister ? "已有账号？" : "没有账号？" }}</span>
              <span class="forget_password">已有帐号，忘记密码？</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { postRegister, getUserInfo, postLogin } from "../api/user";
const router = useRouter();
const showRegister = ref(false);
const loginFormRef = ref();
const userInfo = ref({
  username: "",
  password: "",
  passwordAgain: "",
  verifyCode: "",
  phone: "",
  email: "",
  code: "",
});
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  /*   phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }], */
  // verifyCode: [{ required: false, message: "请输入验证码", trigger: "blur" }],
});
const login = () => {
  console.log(11, loginFormRef.value.validate());
  if (showRegister.value) {
    // 注册逻辑
    loginFormRef.value.validate((valid: any) => {
      if (valid) {
        console.log(22, userInfo.value);
        let obj = {
          username: userInfo.value.username,
          password: userInfo.value.password,
          confirm_password: userInfo.value.passwordAgain,
          // role_ids: [1, 2, 3],
        };
        postRegister(obj).then((res) => {
          console.log("注册====", res);
          showRegister.value = false;
        });
      }
    });
    showRegister.value = false;
  } else {
    loginFormRef.value.validate((valid: any) => {
      if (valid && userInfo.value.verifyCode === userInfo.value.code) {
        let obj = {
          username: userInfo.value.username,
          password: userInfo.value.password,
        };
        // console.log(33, postLogin(obj));
        postLogin(obj).then((res) => {
          console.log("res.data====", res);
          if (res.code === 0) {
            localStorage.setItem("token", res.data.access_token);
            router.push({
              name: "IndexPage",
            });
          }
        });
      }
    });
  }
};
const getVerifyCode = () => {
  userInfo.value.code = Math.random().toString(10).substring(2, 6);
};
onMounted(() => {
/*     let obj = {
    username: "vdgdge456ww5",
    password: "123456",
    confirm_password: "123456",
  };
  postRegister(obj).then((res) => {
    console.log("res.data====", res.data);
  }); */
  getUserInfo().then((res) => {
    console.log("res.data====", res.data);
  });
  userInfo.value.code = Math.random().toString(10).substring(2, 6);
});
</script>
<style scoped lang="scss">
@mixin layout($align, $justify) {
  display: flex;
  align-items: $align;
  justify-content: $justify;
}
.login_page {
  width: 100%;
  height: 100%;
  position: relative;
  isolation: isolate;
  @include layout(center, center);
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/8.jpg");
    background-size: cover;
    background-position: center;
    filter: blur(1px);
    z-index: -1;
    opacity: 0.8;
    overflow: hidden;
  }
  .login_box {
    box-shadow: 1px 1px 10px 4px #00000080;
    border-radius: 10px;
    background-color: #ffffff3b;
    position: relative;
    isolation: isolate;
    .box_bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("../assets/8.jpg");
      background-size: cover;
      background-position: center;
      z-index: -1;
      overflow: hidden;
      border-radius: 10px;
    }
    .logo_title {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      text-align: center;
      font-size: 3rem;
      color: #ffffff;
      font-weight: bold;
      text-shadow: 1px 1px 10px #000000;
      letter-spacing: 3px;
      opacity: 0.9;
      width: 62%;
    }
    .info_box {
      position: absolute;
      top: 50%;
      right: 3%;
      transform: translate(0, -50%);
      width: 30%;
      max-width: 490px;
      min-width: 300px;
      height: auto;
      background-color: #c2d0d1e3;
      border-radius: 50px 0 50px 0;
      padding: 1.7rem;
      box-sizing: border-box;
      h1 {
        font-size: 1.7rem;
        margin: 10px 0 40px 0;
      }
      .form_item {
        width: 100%;
        @include layout(center, space-between);
        :deep .el-form-item {
          margin-bottom: 10px !important;
        }
        :deep .el-input__wrapper {
          background-color: #ffffffbd !important;
          box-shadow: none !important;
        }
        .el-input {
          width: 100%;
          height: 45px;
          font-size: 0.7rem;
          margin: 5px 0;
          box-sizing: border-box;
          outline: none;
          background-color: #ffffff69;
          border: 1px solid #9393935c;
          border-radius: 5px;
          --el-input-focus-border: #ffffff;
          --el-input-focus-border-color: #ffffff;
          :deep .el-input__icon {
            width: 20px;
            font-size: 18px;
          }
        }
        :deep .el-input__inner::placeholder {
          font-size: 15px;
        }
        :deep .el-form-item__error {
          color: #ffaf18;
        }
        :deep input:-internal-autofill-selected {
          -webkit-text-fill-color: #808080;
          transition: background-color 1000s ease-out 0.5s;
        }
        :deep .el-input__inner {
          color: #000000;
        }
        button {
          width: 100%;
          height: 50px;
          height: 45px;
          background-color: green;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 0.8rem;
          margin-top: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          &:hover {
            opacity: 0.7;
          }
        }
        .verify_code {
          width: calc(100% - 90px);
          border-radius: 5px 0 0 5px !important;
        }
        .get_code {
          width: 90px;
          height: 41px;
          background-color: rgb(239 241 240);
          border-radius: 0 5px 5px 0;
          letter-spacing: 1.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: gray;
          border: 1px solid #e0e2e8;
        }
      }
      .remember_box {
        margin: 25px 0;
        font-size: 0.7rem;
        .register {
          color: #0053ab;
          cursor: pointer;
        }
        input {
          height: 16px;
          width: 16px;
          margin-right: 8px;
        }
      }
      .forget_password {
        cursor: pointer;
      }
    }
  }
}
@media screen and (min-width: 501px) {
  .login_box {
    width: 80%;
    max-width: 1500px;
    height: 40%;
    max-height: 450px;
  }
}
@media screen and (max-width: 500px) {
  .login_box {
    width: 90%;
    height: 40%;
  }
}
</style>
