<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="user"
        class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title>基础设置</template>
        <el-menu-item index="1-1">客栈管理</el-menu-item>
        <el-menu-item index="1-2">支付管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="user">
        <template #title>用户管理</template>
        <el-menu-item index="user" :route="{path:'/'}">信息管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>财务管理</template>
        <el-menu-item index="data">财务报表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>系统管理</template>
        <el-menu-item index="1-1">角色管理</el-menu-item>

      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>
