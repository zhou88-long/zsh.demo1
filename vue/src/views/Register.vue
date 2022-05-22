<template>
  <div class="container">
    <div class="title">欢迎注册</div>
    <el-form ref="form" :model="form" size="normal">
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.confirm"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
// import '@/assets/css/login.css'
import request from "@/utils/request";

export default {
  name: "Register",
  methods: {
    register() {
      if (this.form.password !== this.form.confirm) {
        this.$message({
          type: "error",
          massage: '2次密码输入不一致'
        })
        return
      }
            request.post("/api/user/register", this.form).then(res => {
              console.log(res)
              if (res.code === '0') {
                this.$message({
                  type: "success",
                  massage: "注册成功"
                })
                this.$router.push("/login")//登陆成功之后进行跳转，跳转到主页
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

<style scoped>

</style>
