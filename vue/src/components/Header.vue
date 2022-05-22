<template>
<div style="height: 50px; line-height: 50px; border-bottom:1px solid #ccc;display: flex">
<div style="width: 200px; padding-left: 30px; font-weight: 700; color: deepskyblue">后台管理系统</div>
  <div style="flex: 1"></div>
  <div style="width:100px">
    <el-dropdown style="height: 50px; line-height: 50px;">
    <span class="el-dropdown-link;">
     周绍华
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/login')">退出</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>
