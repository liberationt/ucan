<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="起止时间">
          <el-date-picker
            v-model="servicePeriod"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            @keyup.enter.native="onSubmit"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.idCard"
            clearable
            placeholder="请输入身份证号查询"
            style="width: 200px" @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询
          </el-button>
          <el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
          >
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" prop="createTime" min-width="90"></el-table-column>
            <el-table-column label="身份证号" prop="idCard" min-width="60"></el-table-column>
            <el-table-column label="账号信息" prop="createBy" min-width="90"></el-table-column>
            <el-table-column label="附件信息" prop="sexName" min-width="60">
              <template slot-scope="{row,$index}">
                <span style="padding-left: 20px; cursor: pointer" @click="lookDetail(row)">
                  <img src="@/assets/images/pdf.png" alt="" width="24px">
                </span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData()"
          />
        </el-main>
      </el-container>
    </el-main>
    <div class="print-page" v-if="printDailog" >
      <div class="page-body">
        <div class="print-btns">
          <div class="print-it">
            <el-button type="primary" @click="closePrint" class="base-btn">关闭
            </el-button>
          </div>
        </div>
        <h2>智能养老顾问</h2>
        <p class="time">时间：{{details.createTime}}</p>
        <div class="mes">
          <p>
            <span>姓名：{{details.content.name}}</span>
            <span>年龄：{{details.content.age}}岁</span>
          </p>
          <p>
            <span>身份证：{{idPass(details.idCard)}}</span>
            <span>户籍地址：{{details.content.address}}</span>
          </p>
        </div>
        <div class="list-table" v-if="details.content.policyInformation.length > 0">
          <div class="list-title">
            <span style="font-weight: bold">可享受的养老补贴政策</span>
            <span class="first-line" ></span>
          </div>
          <div class="list-content">
            <table>
              <tr>
                <th>政策标题</th>
                <th>政策类型</th>
                <th>发布日期</th>
              </tr>
              <tr v-for="(item,index) in details.content.policyInformation" :key="index">
                <td>{{item.title}}</td>
                <td>{{item.classify1}}</td>
                <td>{{getDate(item.pubDate)}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="list-table" v-if="details.content.serviceItems.length > 0">
          <div class="list-title">
            <span style="font-weight: bold">可享受的服务项目</span>
            <span class="second-line" ></span>
          </div>
          <div class="list-content">
            <table>
              <tr>
                <th>服务名称</th>
                <th>服务范围</th>
                <th>申请方式</th>
              </tr>
              <tr v-for="(item,index) in details.content.serviceItems" :key="index">
                <td>{{item.serviceName}}</td>
                <td>{{item.minAge}} - {{item.maxAge}}</td>
                <td>{{item.applyWay}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="list-table" v-if="details.content.pensionAgency.length > 0">
          <div class="list-title">
            <span style="font-weight: bold">可服务的机构设施</span>
            <span class="second-line" ></span>
          </div>
          <div class="list-content"  v-for="(item,index) in details.content.pensionAgency" :key="index">
            <div class="content-name">
              <span>{{item.orgName}}</span>
              <span>养老机构</span>
            </div>
            <div class="content-mes">
              <span>联系电话：{{item.phone}}</span>
              <span>地址：{{item.addr}}</span>
            </div>

          </div>
        </div>
        <div class="list-table" v-if="details.content.communityFacility.length > 0">
          <div class="list-title">
            <span style="font-weight: bold">可服务的社区设施</span>
            <span class="second-line" ></span>
          </div>
          <div class="list-content" v-for="(item,index) in details.content.communityFacility" :key="index">
            <div class="content-name">
              <span>{{item.orgName}}</span>
              <span>社区设施</span>
            </div>
            <div class="content-mes">
              <span>联系电话：{{item.phone}}</span>
              <span>地址：{{item.addr}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
  import {searchOtherList} from '@/api/pensionAdvisersCongfig/oldAge'
  import Pagination from "@/components/Pagination";
  import {getDate_YMD, setDateTime} from "@/utils/index.js";
  export default {
    name: "index",
    components: {
      Pagination
    },
    data() {
      return {
        printDailog: false, // 打印弹窗
        form: {
          suggestStartTime: '',
          suggestEndTime: '',
          idCard: '',
          pageNum: 1, // 页码
          pageSize: 10 // 数量
        },
        servicePeriod: [], // 起止时间
        tableData: [], // table表格数据
        total: 0,
        details: {}
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      // 关闭打印
      closePrint() {
        this.printDailog = false
      },
      // 格式化时间
      getDate(date) {
        if (date !== "" && date !== null) {
          return date.replace("00:00:00", "");
        } else {
          return date;
        }
      },
      // 身份证加密
      idPass(id) {
        const newId = id.split('')
        let data = ''
        newId.splice(5, 5, '*****')
        newId.forEach(item =>{
          data = data + item
        })
        return data
      },
      onSubmit() {
        if ( this.servicePeriod.length === 0 ) {
          this.form.suggestStartTime = "";
          this.form.suggestEndTime = "";
        } else {
          this.form.suggestStartTime = setDateTime(this.servicePeriod[0])
          this.form.suggestEndTime = setDateTime(this.servicePeriod[1])
        }
        // 查询重置页码为第一页
        this.form.pageNum = 1;
        this.getData()
      },
      onReset() {
        this.servicePeriod = []
        this.form = {
          suggestStartTime: '',
          suggestEndTime: '',
          idCard: '',
          pageNum: 1, // 页码
          pageSize: 10 // 数量
        }
        this.getData()
      },
      // 获取数据
      getData() {
        searchOtherList(this.form).then(res =>{
          if (res.code === 0) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        })
      },
      // 查看详情
      lookDetail(row) {
        this.details = JSON.parse(JSON.stringify(row))
        this.details.content = JSON.parse(this.details.content)
        this.printDailog = true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/styles/form.css";
  .print-page{
    width:100%;
    min-height:100%;
    position: fixed;
    background: rgba(0,0,0, .7);
    z-index: 9999;
    top:0;
    left: 0;
    bottom: -100px;
    overflow: scroll;
    padding: 20px 0;
    .page-body{
      width: 650px;
      min-height: 878px;
      margin: 20px auto 80px auto;
      padding: 50px 80px;
      background: #ffffff;
      position: relative;
      .print-btns {
        position: absolute;
        z-index: 9999;
        width: 80px;
        top: 0px;
        right: - 100px;
        .print-it {
          margin-bottom: 15px;
        }
      }
      h2{
        text-align: center;
      }
      .time{
        text-align: right;
        font-size: 14px;
        padding-bottom: 15px;
        border-bottom: 3px solid #000000;
      }
      .mes{
        margin-bottom: 25px;
        span{
          display: inline-block;
          font-size: 14px;
          vertical-align: top;
          width:170px;
          line-height: 20px;
        }
        span:nth-child(2n){
          width:315px;
        }
      }
      .list-table{
        width:100%;
        margin-bottom: 20px;
        .list-title{
          font-size: 16px;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          .first-line {
            width:315px;
            border-top: 2px dashed #333333;
            margin-left: 10px;
          }
          .second-line {
            width:345px;
            border-top: 2px dashed #333333;
            margin-left: 10px;
          }
        }
        .list-content {
          margin-top: 10px;
          width:100%;
          span {
            display: inline-block;
            vertical-align: top;
          }
          table {
            border: 1px solid #000000;
            border-collapse:collapse;
            border-spacing:0;
            width:100%;
            th {
              border: 1px solid #000000;
              font-weight: bold;
              text-align: left;
              padding: 5px 5px;
            }
            th:nth-child(1) {
              width: 240px;
            }
            td{
              border: 1px solid #000000;
              text-align: left;
              padding: 5px 5px;
            }
          }
        .content-name {
          margin-bottom: 12px;
          margin-top: 15px;
          span:nth-child(1) {
            font-weight: bold;
            width: 50%;
          }
          span:nth-child(2){
            text-align: right;
            width: 50%;
            margin-left: -5px;
          }
        }
        .content-mes {
          font-size: 14px;
          line-height: 20px;
          span:nth-child(1) {
            width: 170px
          }
          span:nth-child(2) {
            width: 315px;
          }
        }
        }
      }
    }
  }
</style>
