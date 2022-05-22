<template>
  <div style="padding:10px">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
<!--      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>-->
    </div>
    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入内容" style="width: 20%;"></el-input>
      <el-button type="primary" style="margin:0 10px" @click="load">搜索</el-button>


    </div>
    <el-table :data="tableData"
              stripe border
              style="width: 100%"
              size="small">
      <el-table-column
          prop="id"
          label="id"
          sortable
      />
      <el-table-column
          prop="username"
          label="用户名"
      />
      <el-table-column
          prop="password"
          label="密码"/>
      <el-table-column
          prop="sex"
          label="性别"/>
      <el-table-column
          prop="age"
          label="年龄"/>
      <el-table-column
          prop="address"
          label="地址"/>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <!--二次确认的效果-->
          <el-popconfirm title="确定删除吗?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger" size="small" >删除
              </el-button>
            </template>
          </el-popconfirm>

        </template>

      </el-table-column>
    </el-table>
    <div style="margin:10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total='total'
      />
    </div>
    <div>

      <el-dialog v-model="dialogVisible"
                 title="提示"
                 width="30%"
      >
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"/>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="form.password"/>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男"/>
            <el-radio v-model="form.sex" label="女"/>
          </el-form-item>
          <el-form-item label="用户年龄">
            <el-input v-model="form.age"/>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address" type="textarea"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
<!--        点击确认之后就可以保存信息，然后保存之后需要重新加载-->
        <el-button type="primary" @click="save">确认</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>


import request from "@/utils/request";
import mock from "mockjs";
var Random=mock.Random;
export default {
  name: 'Home',
  data() {
    return {
      form: {},
      dialogVisible: false,
      search: '',
      total: 10,
      currentPage: 1,
      pageSize: 10,
      tableData: []
    }
  },
  created() {
    this.load()

  },
  components: {

  },
  methods: {
    load() {
      request.get("/api/user", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }

      }).then(res => {
        console.log(res)
        this.tableData = res.data.records,
        this.total = res.data.total
      })
    },
    add() {
      //打开弹出表单之后要设置清空数据
      this.dialogVisible = true
      this.form = {}

    },
    save() {//前台的数据保存，并且通过axios将数据传递给后台
      if (this.form.id) {//更新
        request.put("/api/user", this.form).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              type: "success",
              massage: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              massage: res.msg//返回错误信息
            })
          }
          this.load()//保存之后重新加载
          this.dialogVisible = false//加载之后不显示
        })
        localStorage.setItem("form",JSON.stringify(this.list))
      } else {//添加数据
        request.post("/api/user", this.form).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              type: "s",
              massaguccesse: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              massage: res.msg
            })
          }
          this.load()
          this.dialogVisible = false
        })
      }
    },
    handleEdit(row) {
      //为了避免再取消修改时，数据发生变化，使用深拷贝（改变数据之后，修改之前的数据不会在数据栏里面改变）,
      //这样就可以使得编辑的数据与表格里面的数据是隔开的
      //将数据转换成一个字符串  JSON是前后端交换数据的数据格式
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true//打开弹窗，当你点击确定的时候会发生错误，因为此时的数据的id是同一个值，是不对的，所以要使用更新

    },
    handleDelete(id) {
      console.log(id)
      request.delete("/api/user/" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            massage: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            massage: res.msg
          })
        }
        this.load()//删除之后重新加载表格的数据
      })
    },
    handleSizeChange(pageSize) {//改变当前页面的个数触发
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {//改变当前页码触发
      this.currentPage = pageNum
      this.load()

    }
  }
}
</script>

