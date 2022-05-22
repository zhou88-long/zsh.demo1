<template>
  <div class="loginbody">
    <div class="login">
      <div class="mylogin" align="center">
        <h4>登 录</h4>
        <el-form :model="form" ref="login"  label-width="0px">
          <el-form-item label="" prop="account" style="margin-top:10px">
            <el-row >
              <el-col :span="2"  >
                <span class="el-icon-s-custom"></span>
              </el-col>
              <el-col :span="22">
                <el-input  class="inps" placeholder="账号" v-model="form.username"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-row>
              <el-col :span="2">
                <span class="el-icon-lock"></span>
              </el-col>
              <el-col :span="22">
                <el-input class="inps" type="password" placeholder="密码" v-model="form.password"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-top: 55px">
            <el-button  round class="submit" @click="login" >登 录</el-button>

          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>

import request from "@/utils/request";


export default {
  name: "Login",
  methods: {
    login() {
      request.post("/api/user/login", this.form).then(res => {
        console.log(res)
        if (res.code === '0') {
          this.$message({
            type: "success",
            massage: "登录成功"
          })
          this.$router.push("/home")//登陆成功之后进行跳转，跳转到主页
        } else {
          this.$message({
            type: "error",
            massage: res.msg
          })
        }
      })
    }
  }
  ,

  data() {
    return {

      form: {}
    }
  }

}
</script>
<style lang="less" scoped>
.loginbody {

  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
}

.login {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  background-position: left top;
  background-color: #242645;
  color: #fff;
  font-family: "Source Code Pro";
  position: relative;

  background-image: url(.././assets/img/img_5.png)  ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.mylogin {
  width: 280px;
  height: 350px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, .7);
  opacity: 1;
  background: linear-gradient(230deg,
  rgba(53, 57, 74, 0) 0%,
  rgb(0, 0, 0 ) 100%);
}
.inps input{
  height: 70px;
  width: 250px;
  border: none;
  color: #fff;
  background-color:transparent;
  font-size: 12px;
}
.submit{
  background-color: transparent;
  color: #39f;
  width: 180px;

}
</style>

