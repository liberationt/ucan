<template>
  <el-container>
    <el-main class="tableContainer">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item name="baseItem_1">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />基本信息 </span>
            </div>
          </template>
          <el-form
            ref="form_base"
            key="form_base"
            :model="form"
            :rules="isEditForm ? rulesForm : null"
            label-width="100px"
          >
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '姓名' : '姓名：'">
                  <el-input
                    v-if="isEditForm"
                    v-model.trim="form.fullName"
                    disabled
                    clearable
                    placeholder="请输入姓名"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.fullName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '性别' : '性别：'">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.sexName"
                    clearable
                    disabled
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.sexName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '身份证' : '身份证：'">
                  <el-input
                    v-if="isEditForm"
                    ref="idCard"
                    v-model.trim="form.idCard"
                    disabled
                    clearable
                    placeholder="请输入身份证"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.idCard }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '联系方式' : '联系方式：'">
                  <el-input
                    v-if="isEditForm"
                    ref="idCard"
                    v-model.trim="form.contactDetails"
                    disabled
                    clearable
                    placeholder=""
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.contactDetails }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '户籍地' : '户籍地：'">
                  <el-input
                    v-if="isEditForm"
                    ref="idCard"
                    v-model.trim="form.censusAreaCodeLevelName"
                    disabled
                    clearable
                    placeholder="请输入户籍地"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.censusAreaCodeLevelName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="baseItem_1">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />养老补贴 </span>
            </div>
          </template>
          <el-form :model="form">
            <el-table :data="PensionList" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-if="isEditForm"
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                      @change="pickData"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        @keyup.enter.native="editContent"
                        @keyup.native="
                          transformNumber(
                            scope.row.subsidyMoney,
                            'subsidyMoney',
                            scope.$index
                          )
                        "
                      />
                      <el-select
                        v-if="scope.row.subsidyElementName != '长护险补贴'"
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in companyOptions"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <el-select
                        v-else
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in companyOptions2"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span />
                    <span
                      v-if="scope.row.subsidyUnit == 'hour/month'"
                    >时/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/month'"
                    >元/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/year'"
                    >元/年</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/time'"
                    >元/次</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/quarter'"
                    >元/季度</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="isShow6" name="baseItem_2">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />救助补贴 </span>
            </div>
          </template>
          <el-form :model="form">
            <el-table :data="SalvageList" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-if="isEditForm"
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        @keyup.enter.native="editContent"
                        @keyup.native="
                          transformNumber1(
                            scope.row.subsidyMoney,
                            'subsidyMoney',
                            scope.$index
                          )
                        "
                      />
                      <el-select
                        v-if="scope.row.subsidyElementName != '支内回沪补贴'"
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in companyOptions"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <el-select
                        v-else
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in companyOptions3"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/month'"
                    >元/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/year'"
                    >元/年</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/time'"
                    >元/次</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/quarter'"
                    >元/季度</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="isShow7" name="baseItem_3">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />残疾补贴 </span>
            </div>
          </template>
          <el-form :model="form">
            <el-table :data="DisabilityList" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-if="isEditForm"
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        @keyup.enter.native="editContent"
                        @keyup.native="
                          transformNumber2(
                            scope.row.subsidyMoney,
                            'subsidyMoney',
                            scope.$index
                          )
                        "
                      />
                      <el-select
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in companyOptions"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/month'"
                    >元/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/year'"
                    >元/年</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/time'"
                    >元/次</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/quarter'"
                    >元/季度</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="isShow8" name="baseItem_4">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />优抚补贴 </span>
            </div>
          </template>
          <el-form :model="form">
            <el-table :data="PreferentialList" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-if="isEditForm"
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        @keyup.enter.native="editContent"
                        @keyup.native="
                          transformNumber3(
                            scope.row.subsidyMoney,
                            'subsidyMoney',
                            scope.$index
                          )
                        "
                      />
                      <el-select
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in companyOptions"
                          :key="item.dictLabel"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/month'"
                    >元/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/year'"
                    >元/年</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/time'"
                    >元/次</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/quarter'"
                    >元/季度</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="isShow11" name="baseItem_5">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />计生补贴 </span>
            </div>
          </template>
          <el-form :model="form">
            <el-table :data="familyList" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="年龄段">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-select
                      v-if="scope.row.subsidyElementName == '助餐补贴'"
                      v-model="scope.row.ageRange"
                      placeholder="请选择"
                      clearable
                      :disabled="modelType === 'look'"
                      @change="getMoney(scope.row)"
                      @keyup.enter.native="editContent"
                    >
                      <el-option
                        v-for="item in generationSubsidyOptions"
                        :key="item.dictValue + Math.random()"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                    <el-select
                      v-else-if="scope.row.subsidyElementName == '农村奖扶金'"
                      v-model="scope.row.ageRange"
                      :disabled="modelType === 'look'"
                      placeholder="请选择"
                      @keyup.enter.native="editContent"
                    >
                      <el-option
                        v-for="item in generationSubsidyOptions1"
                        :key="item.dictValue + Math.random()"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                    <el-select
                      v-else
                      v-model="scope.row.ageRange"
                      :disabled="modelType === 'look'"
                      placeholder="请选择"
                      clearable
                      @change="getMoneys1(scope.row)"
                      @keyup.enter.native="editContent"
                    >
                      <el-option
                        v-for="item in generationSubsidyOption"
                        :key="item.dictValue + Math.random()"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-if="scope.row.subsidyElementName == '农村奖扶金'"
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                      @change="getMoneys(scope.row)"
                    />
                    <el-date-picker
                      v-else
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                        @keyup.enter.native="editContent"
                      />
                      <el-select
                        v-if="scope.row.subsidyElementName == '助餐补贴'"
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in SubsidyOption"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <el-select
                        v-else-if="scope.row.subsidyElementName == '农村奖扶金'"
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in SubsidyOption1"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <el-select
                        v-else
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in companyOptions"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan_day'"
                    >元/天</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/month'"
                    >元/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/year'"
                    >元/年</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/time'"
                    >元/次</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'yuan/quarter'"
                    >元/季度</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-form :model="form">
            <el-table :data="familyList1" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="年龄段">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.ageRange"
                    :disabled="modelType === 'look'"
                    placeholder="请选择"
                    clearable
                    @change="getMoneyAge(scope.row)"
                    @keyup.enter.native="editContent"
                  >
                    <el-option
                      v-for="item in generationSubsidyOptions"
                      :key="item.dictValue + Math.random()"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴次数（次）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                        @keyup.enter.native="editContent"
                      />
                      <el-select
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in companyOptions4"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span>次/年</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="isShow12" name="baseItem_7">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />失独补贴 </span>
            </div>
          </template>
          <el-form :model="form">
            <el-table :data="ShiDuList" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-if="isEditForm"
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        @keyup.enter.native="editContent"
                        @keyup.native="
                          transformNumber7(
                            scope.row.subsidyMoney,
                            'subsidyMoney',
                            scope.$index
                          )
                        "
                      />
                      <el-select
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in gitSubsidy"
                          :key="item.dictLabel"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_month'"
                    >次/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_quarter'"
                    >次/季度</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_year'"
                    >次/年</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="isShow13" name="baseItem_8">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />失地补贴 </span>
            </div>
          </template>
          <el-form :model="form">
            <el-table :data="ShiDiList" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-if="isEditForm"
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        @keyup.enter.native="editContent"
                        @keyup.native="
                          transformNumber8(
                            scope.row.subsidyMoney,
                            'subsidyMoney',
                            scope.$index
                          )
                        "
                      />
                      <el-select
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in gitSubsidy"
                          :key="item.dictLabel"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_month'"
                    >次/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_quarter'"
                    >次/季度</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_year'"
                    >次/年</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="isShow14" name="baseItem_9">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />礼品补贴 </span>
            </div>
          </template>
          <el-form :model="form">
            <el-table :data="LiPingList" style="width: 100%">
              <el-table-column label="补贴名称" prop="subsidyElementName" />
              <el-table-column label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-date-picker
                      v-if="isEditForm"
                      v-model="scope.row.subsidyDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择享受补贴时间"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        @keyup.enter.native="editContent"
                        @keyup.native="
                          transformNumber9(
                            scope.row.subsidyMoney,
                            'subsidyMoney',
                            scope.$index
                          )
                        "
                      />
                      <el-select
                        v-model="scope.row.subsidyUnit"
                        placeholder="请选择"
                        clearable
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in gitSubsidy"
                          :key="item.dictLabel"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <span v-else>
                    <span>{{ scope.row.subsidyMoney }}</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_month'"
                    >次/月</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_quarter'"
                    >次/季度</span>
                    <span
                      v-if="scope.row.subsidyUnit == 'time_year'"
                    >次/年</span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="baseItem_5">
          <template slot="title">
            <div class="titleSlider">
              <span> <i class="titleTip" />一次性补贴 </span>
            </div>
          </template>
          <el-form :model="form" :rules="isEditForm ? rulesForm : null">
            <el-table :data="DisposableList" style="width: 100%">
              <el-table-column label="补贴名称">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <el-input
                      v-model.trim="scope.row.subsidyElementName"
                      placeholder="请输入补贴名称"
                      clearable
                      @keyup.enter.native="editContent"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyElementName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="contactsName" label="何时享受补贴">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm" prop="subsidyRemark">
                    <el-input
                      v-model="scope.row.subsidyRemark"
                      placeholder="请输入享受补贴时间"
                      clearable
                      @keyup.enter.native="editContent"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyRemark }}</span>
                </template>
              </el-table-column>
              <el-table-column label="补贴金额（元）">
                <template slot-scope="scope">
                  <el-form-item v-if="isEditForm">
                    <div style="display: flex">
                      <el-input
                        v-model="scope.row.subsidyMoney"
                        placeholder="请输入补贴金额"
                        clearable
                        max-length="10"
                        @keyup.enter.native="editContent"
                        @keyup.native="
                          transformNumber4(
                            scope.row.subsidyMoney,
                            'subsidyMoney',
                            scope.$index
                          )
                        "
                      />
                    </div>
                  </el-form-item>
                  <span v-else>{{ scope.row.subsidyMoney }}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="isEditForm"
                label="操作"
                min-width="60"
                align="center"
                fixed="right"
              >
                <template slot-scope="scope">
                  <span
                    class="table-btn"
                    style="cursor: pointer"
                    @click="tableOperations(scope.row, scope.$index)"
                  >删除</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <div v-if="isEditForm" class="addBtnDiv">
            <span @click="addTableRows()">添加补贴</span>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <el-button
            type="warning"
            class="base-btn btnMarginLeft15"
            @click="editContent('form_base')"
          >确定</el-button>
          <el-button
            class="cancel-btn btnMarginLeft15"
            @click="cancelDetailsPage"
          >取消</el-button>
        </div>
        <div v-else>
          <el-button
            type="warning"
            class="base-btn"
            @click="toEditType"
          >编辑</el-button>
          <el-button
            class="cancel-btn"
            @click="closeDetailsPage"
          >返回</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import {
  userDetailsData,
  submitDataAdd,
  submitDataEdit,
  relationData
} from '@/api/userInfoConfig/elderInfo'
import { validateID, uniqueID, echoPerson } from '@/api/userInfoConfig/index'
import { echoCheckInPeople } from '@/api/facilitiesConfig/checkInPeople'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
// import { getEditAuthority } from '@/api/user'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { getSubsidyDetails, saveSubsidyDetails } from '@/api/userInfoConfig/subsidyConfig'
import Address from '@/components/Address'
import {
  computerAge,
  getBirthdayFromIdCard,
  validateForms,
  scrollToTop,
  scrollToEl
} from '@/utils/index'
import {
  verifyFullName,
  verifyIdCard,
  verifyHomePhone,
  verifyMobile
} from '@/utils/validate'
import { closeSelectedTag } from '@/utils/rooterJump'
import { transformNumber } from '@/utils/index'

const Base64 = require('js-base64').Base64

export default {
  components: { Address },
  data() {
    return {
      hasEdit: false,
      isShow1: true,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      isShow5: true,
      isShow6: true,
      isShow7: true,
      isShow8: true,
      isShow9: true,
      isShow10: true,
      isShow11: true,
      isShow12: true,
      isShow13: true,
      isShow14: true,
      isShow15: true,
      props: { multiple: true, checkStrictly: true },
      // 表单只能输入数字
      dataList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '敬老卡津贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '居家养老补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '长护险补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '助餐补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList1: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '低保补贴',
          subsidyMoney: '',
          subsidyTitleName: '救助补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '支内回沪补贴',
          subsidyMoney: '',
          subsidyTitleName: '救助补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList2: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '重残无业市补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '重残无业区补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人交通补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人护理补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人居家养护补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人生活补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList3: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '优抚补贴',
          subsidyMoney: '',
          subsidyTitleName: '优抚补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList4: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '',
          subsidyMoney: '',
          subsidyTitleName: '一次性补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList7: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '失独补贴',
          subsidyMoney: '',
          subsidyTitleName: '失独补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList8: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '失地补贴',
          subsidyMoney: '',
          subsidyTitleName: '失地补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList9: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '礼品补贴',
          subsidyMoney: '',
          subsidyTitleName: '礼品补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      generationSubsidyOption: [],
      generationSubsidyOptions: [],
      generationSubsidyOptions1: [],
      companyOptions4: [],
      SubsidyOption: [], // 助餐补贴单位
      SubsidyOption1: [], // 农村奖单位i
      familyDataList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '特别扶助金（伤残）',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '特别扶助金（死亡）',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '助餐补贴',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '农村奖扶金',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: 'all'
        }
      ],
      familyDataList1: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '体检补贴',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        }
      ],
      // 单位
      companyOptions: [],
      companyOptions2: [],
      companyOptions3: [],
      gradeOptions: [],
      homeCarOptions: [],
      // 残疾
      categoryOptions: [],
      defoLevelOptions: [],
      defoTypeOptions: [],
      // 救助
      categoryOptions1: [],
      familyTypeOptions: [],
      defoCodeOptions: [],
      familyOptions: [],
      // 计生
      birthControlFamily: [], // 计生家庭
      birthControlSubsidy: [], // 计生补助
      // 优抚
      preferOptions: [],
      employmentOptions: [], // 就业情况
      medicalOptions: [], // 医疗
      pensionOptions: [], // 养老
      // tableRowIndex: '',//当前编辑的表格行号
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      // 下拉框的数据
      sexOptions: [], // 性别
      nationOptions: [], // 民族
      maritalStatusOptions: [], // 婚姻状况
      politicalOptions: [], // 政治面貌
      educationOptions: [], // 文化程度
      residenceTypeOptions: [], // 户口性质
      populationTypeOptions: [], // 人口类别
      statusOptions: [], // 老人状态
      ageLevelOptions: [], // 年龄分类
      liveStatusOptions: [], // 居住情况
      censusStatusOptions: [], // 户籍情况
      // assessTypeOptions: [], // 评估类型
      defoLevelInfoOptions: [], // 残疾等级
      assessLevelOptions: [], // 评估等级
      assessLevelOptionsAll: [], // 评估等级-长护险和居家养老评估
      categoryTypeOptions: [], // 救助类别
      pensionModeOptions: [], // 养老方式
      pensionAssistOptions: [], // 养老辅助
      defoRelatedAttrOptions: [], // 残疾相关属性
      deformityTypeOptions: [],
      // 表单
      form: {
        personId: '', // 当前用户id
        idCard: '', // 身份证
        fullName: '', // 姓名
        sexName: '', // 性别（纯文本）
        contactDetails: '', // 手机号码
        personSubsidyInfoList: []
      },
      // 养老补贴
      PensionList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '敬老卡津贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '居家养老补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '长护险补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '助餐补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 补贴
      SalvageList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '低保补贴',
          subsidyMoney: '',
          subsidyTitleName: '救助补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '支内回沪补贴',
          subsidyMoney: '',
          subsidyTitleName: '救助补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 残疾
      DisabilityList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '重残无业市补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '重残无业区补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人交通补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人护理补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人居家养护补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人生活补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 优抚
      PreferentialList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '优抚补贴',
          subsidyMoney: '',
          subsidyTitleName: '优抚补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      familyList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '特别扶助金（伤残）',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '特别扶助金（死亡）',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '助餐补贴',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '农村奖扶金',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: 'all'
        }
      ], // 计生
      familyList1: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '体检补贴',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        }
      ],
      // 失独补贴
      ShiDuList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '失独补贴',
          subsidyMoney: '',
          subsidyTitleName: '失独补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 失地补贴
      ShiDiList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '失地补贴',
          subsidyMoney: '',
          subsidyTitleName: '失地补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 礼品补贴
      LiPingList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '礼品补贴',
          subsidyMoney: '',
          subsidyTitleName: '礼品补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 一次性
      DisposableList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '',
          subsidyMoney: '',
          subsidyTitleName: '一次性补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 表格当前操作行的数据
      activeRowData: null,
      // form 表单的验证规则
      rulesForm: {
        // 姓名
        fullName: [
          {
            required: true,
            trigger: 'blur',
            message: '姓名不能为空，请输入！'
          },
          { trigger: 'blur', validator: verifyFullName }
        ],
        // 身份证
        idCard: [
          // trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
          // 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
          {
            required: true,
            trigger: 'MANUAL_TRIGGER',
            message: '身份证不能为空，请输入！'
          },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard },
          {
            trigger: 'MANUAL_TRIGGER',
            validator: (rule, value, callback) => {
              validateID(value)
                .then((response) => {
                  if (response.code === 0) {
                    callback()
                  } else {
                    if (response.msg === '该信息非当前企业拥有') {
                      callback('老人信息已存在，请重新输入。')
                    } else {
                      callback(response.msg)
                    }
                  }
                })
                .catch(() => {
                  callback(new Error('身份证检验接口调用失败！'))
                })
            }
          }
        ],

        address: [
          {
            trigger: 'blur',
            max: 50,
            message: '详细地址长度不得超过50个字符，请重新输入！'
          }
        ],
        subsidyMoney: [
          {
            trigger: 'blur',
            pattern: /^(\d{1,9}(\.\d{1,2})?1000000000)$/,
            message: '请输入正确格式！'
          }
        ]
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: [
        'baseItem_1',
        'baseItem_2',
        'baseItem_3',
        'baseItem_4',
        'baseItem_5',
        'baseItem_7',
        'baseItem_8',,
        'baseItem_9'
      ], // 折叠面板默认打开name参数
      areaCodeOptions: [], // 行政区域树节点数据
      defaultProps: {
        children: 'children',
        label: 'areaName',
        value: 'areaCode'
      },
      lazy: true, // 懒加载
      // 自适应
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      // 自适应
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      },
      flag: null, // 用来判断是表格添加时还是编辑时
      areaCode: [[], []], // 区域行政的全部ID
      modelType: '', // 查看：look  编辑：edit  新增：add
      editAuthority: false,
      gitSubsidy: []
    }
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  async mounted() {
    this.hasEdit = this.$route.query.hasEdit
    this.modelType = this.$route.query.modelType
    // 当前用户id
    const _userId_ = this.$route.params.id || ''
    /**
     * 查看
     */
    await this.getSelect()
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      // 请求当前用户信息
      getSubsidyDetails(_userId_)
        .then((response) => {
          this.formatData(response)
        })
        .catch(() => {
          this.$message.error('获取用户信息失败！')
        })
    } else {
      this.isEditForm = true
      this.getData(_userId_)
    }
  },
  methods: {
    pickData(value) {},
    transformNumber(value, obj, index) {
      this.dataList = this.PensionList
      this.dataList[index][obj] = transformNumber(value)
      this.$set(this.PensionList, index, this.dataList[index])
    },
    transformNumber1(value, obj, index) {
      this.dataList1 = this.SalvageList
      this.dataList1[index][obj] = transformNumber(value)
      this.$set(this.SalvageList, index, this.dataList1[index])
      // this.familyDateList1 = this.familyList1;
      // this.familyDateList1[index][obj] = transformNumber(value);
      // this.$set(this.familyList1, index, this.familyDateList1[index]);
    },
    transformNumber2(value, obj, index) {
      this.dataList2 = this.DisabilityList
      this.dataList2[index][obj] = transformNumber(value)
      this.$set(this.DisabilityList, index, this.dataList2[index])
    },
    transformNumber3(value, obj, index) {
      this.dataList3 = this.PreferentialList
      this.dataList3[index][obj] = transformNumber(value)
      this.$set(this.PreferentialList, index, this.dataList3[index])
    },
    transformNumber4(value, obj, index) {
      this.dataList4 = this.DisposableList
      this.dataList4[index][obj] = transformNumber(value)
      this.$set(this.DisposableList, index, this.dataList4[index])
    },
    transformNumber7(value, obj, index) {
      this.dataList7 = this.ShiDuList
      this.dataList7[index][obj] = transformNumber(value)
      this.$set(this.ShiDuList, index, this.dataList7[index])
    },
    transformNumber8(value, obj, index) {
      this.dataList8 = this.ShiDiList
      this.dataList8[index][obj] = transformNumber(value)
      this.$set(this.ShiDiList, index, this.dataList8[index])
    },
    transformNumber9(value, obj, index) {
      this.dataList9 = this.LiPingList
      this.dataList9[index][obj] = transformNumber(value)
      this.$set(this.LiPingList, index, this.dataList9[index])
    },
    transformNumber6() {
      this.familyDataList = this.familyList
      this.familyDataList[index][obj] = transformFloatNumber1(value)
      this.$set(this.familyList, index, this.familyDataList[index])
    },
    getMoney(row) {
      if (row.ageRange == '60_meal') {
        row.subsidyMoney = 9
        row.subsidyUnit = 'yuan_day'
      }
      // else{
      //   row.subsidyMoney=''
      //   row.subsidyUnit=''
      // }
    },
    getMoneyAge(row) {
      if (row.ageRange == '60_meal') {
        row.subsidyMoney = 1
        row.subsidyUnit = 'times/year'
      }
    },
    getMoneys(row) {
      row.subsidyMoney = 1600
      row.subsidyUnit = 'yuan/year'
    },
    getMoneys1(row) {
      if (row.subsidyElementName === '特别扶助金（伤残）') {
        if (row.ageRange === '45_59_subsidy') {
          row.subsidyMoney = 660
        } else if (row.ageRange === '60_69_subsidy') {
          row.subsidyMoney = 710
        } else if (row.ageRange !== '') {
          row.subsidyMoney = 760
        }
      } else if (row.subsidyElementName === '特别扶助金（死亡）') {
        if (row.ageRange === '45_59_subsidy') {
          row.subsidyMoney = 820
        } else if (row.ageRange === '60_69_subsidy') {
          row.subsidyMoney = 870
        } else if (row.ageRange !== '') {
          row.subsidyMoney = 920
        }
      }
    },
    // 异步事件同步化
    async getData(id) {
      await this.getSelect()
      if (this.modelType === 'edit') {
        await this.editGetData(id)
      } else if (this.modelType === 'add') {
      }
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前用户信息
        getSubsidyDetails(id)
          .then((response) => {
            this.formatData(response)
          })
          .catch(() => {
            this.$message.error('获取用户信息失败！')
          })
      })
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'sys_sex', // 性别
        'nation_type', // 民族
        'biz_marital_status', // 婚姻状况
        'politics_status', // 政治面貌
        'edu_level', // 文化程度
        'biz_residence_type', // 户口性质
        'people_category', // 人口类别
        'biz_age_level', // 年龄类别
        'biz_live_status', // 居住情况
        'biz_assess_type', // 评估类型
        'biz_assess_level', // 评估等级
        'biz_old_person_status', // 老人状态
        'pension_mode', // 养老方式
        'pension_assist', // 养老辅助
        'defo_related_attr', // 残疾相关属性
        'biz_census_status', // 户籍情况
        'medical_insurance', // 医疗保险
        'job_status', // 就业
        'endowment_insurance', // 养老保险
        // 残疾标签
        'defo_level', // 残疾等级
        'category', // 残疾人员类别
        'defo_type', // 残疾类型
        // 救助标签
        'h_category', // 救助类别
        'family_type', // 家庭
        'sys_Yes_No', // 覆盖
        'monthly_capita', // 月收入
        // 优抚
        'entitled_groups', // 优抚类别
        // 单位
        'home_unit',
        'ch_unit',
        'help_unit',
        'birthControl_family',
        'birthControl_subsidy',
        'generationSubsidy',
        'meal_allowance',
        'assistance_subsidy',
        'bonus_all',
        'rural_awards',
        'medical_subsidies',
        'git_subsidy',
        'is_enjoy'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey)
          .then((response) => {
            const dict = response.data
            for (const key in dict) {
              switch (key) {
                case 'sys_sex':
                  this.sexOptions = dict[key]
                  break
                case 'nation_type':
                  this.nationOptions = dict[key]
                  break
                case 'biz_marital_status':
                  this.maritalStatusOptions = dict[key]
                  break
                case 'politics_status':
                  this.politicalOptions = dict[key]
                  break
                case 'edu_level':
                  this.educationOptions = dict[key]
                  break
                case 'biz_residence_type':
                  this.residenceTypeOptions = dict[key]
                  break
                case 'people_category':
                  this.populationTypeOptions = dict[key]
                  this.form.populationType = 'p_this city'
                  break
                case 'biz_age_level':
                  this.ageLevelOptions = dict[key]
                  break
                case 'biz_live_status':
                  this.liveStatusOptions = dict[key]
                  break
                case 'biz_census_status':
                  this.censusStatusOptions = dict[key]
                  break
                case 'biz_assess_level':
                  this.gradeOptions = dict[key]
                  break
                case 'is_enjoy':
                  this.homeCarOptions = dict[key]
                  break
                case 'biz_assess_type':
                  this.assessTypeOptions = dict[key]
                  break
                case 'biz_assess_level':
                  this.assessLevelOptionsAll = dict[key]
                  break
                case 'biz_old_person_status':
                  this.statusOptions = dict[key]
                  break

                case 'pension_mode':
                  this.pensionModeOptions = dict[key]
                  break
                // 养老辅助
                case 'pension_assist':
                  this.pensionAssistOptions = dict[key]
                  break
                // 残疾相关属性
                case 'defo_related_attr':
                  this.defoRelatedAttrOptions = dict[key]
                  break
                // 就业
                case 'job_status':
                  this.employmentOptions = dict[key]
                  break
                // 医疗
                case 'medical_insurance':
                  this.medicalOptions = dict[key]
                  break
                // 养老
                case 'endowment_insurance':
                  this.pensionOptions = dict[key]
                  break
                // 残疾等级
                case 'defo_level':
                  this.defoLevelOptions = dict[key]
                  break
                // 残疾人员类别
                case 'category':
                  this.categoryOptions = dict[key]
                  break
                // 残疾类型
                case 'defo_type':
                  this.defoTypeOptions = dict[key]
                  break
                // 救助类型
                case 'h_category':
                  this.categoryOptions1 = dict[key]
                  break
                case 'family_type':
                  this.familyTypeOptions = dict[key]
                  break
                case 'sys_Yes_No':
                  this.defoCodeOptions = dict[key]
                  break
                case 'monthly_capita':
                  this.familyOptions = dict[key]
                  break
                // 优抚
                case 'entitled_groups':
                  this.preferOptions = dict[key]
                  break
                case 'home_unit':
                  this.companyOptions = dict[key]
                  break
                case 'ch_unit':
                  this.companyOptions2 = dict[key]
                  break
                case 'help_unit':
                  this.companyOptions3 = dict[key]
                  break
                case 'birthControl_family':
                  this.birthControlFamily = dict[key]
                  break
                // 计生补助
                case 'birthControl_subsidy':
                  this.birthControlSubsidy = dict[key]
                  break
                // 年龄段
                case 'generationSubsidy':
                  this.generationSubsidyOption = dict[key]
                  break
                // 助餐补贴
                case 'meal_allowance':
                  this.generationSubsidyOptions = dict[key]
                  break
                case 'assistance_subsidy':
                  this.SubsidyOption = dict[key]
                  break
                // 农村奖扶金年龄段
                case 'bonus_all':
                  this.generationSubsidyOptions1 = dict[key]
                  break
                case 'rural_awards':
                  this.SubsidyOption1 = dict[key]
                  break
                case 'medical_subsidies':
                  this.companyOptions4 = dict[key]
                  break
                case 'git_subsidy':
                  this.gitSubsidy = dict[key]
                  break
              }
            }
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    tabsStep(tabsName) {
      this.activeTabs = tabsName
    },
    addTableRows() {
      this.DisposableList.push({
        id: '',
        subsidyDate: '',
        subsidyElementName: '',
        subsidyMoney: '',
        subsidyTitleName: '一次性补贴',
        subsidyUnit: '',
        subsidyRemark: ''
      })
    },
    tableOperations(row, index) {
      // 删除
      this.$confirm('是否确认删除该一次性补贴?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.DisposableList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 确定按钮-提交form表单
    editContent() {
      // const formRefs = ['form_base', 'form_address', 'form_contact'].map(key => this.$refs[key])
      // validateForms(formRefs).then(() => {
      // 数据处理
      const _form = this.form
      const regs = /^[0-9]*$/
      let arrList = []
      this.PensionList.forEach((item) => {
        if ((item.subsidyMoney != '' && item.subsidyMoney != null) || (item.subsidyDate != '' && item.subsidyDate != null) || (item.id != '' && item.id != null)) {
          arrList.push(item)
        }
      })
      this.SalvageList.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyDate != '' && item.subsidyDate != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })
      this.DisabilityList.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyDate != '' && item.subsidyDate != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })
      this.PreferentialList.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyDate != '' && item.subsidyDate != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })
      this.ShiDuList.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyDate != '' && item.subsidyDate != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })
      this.ShiDiList.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyDate != '' && item.subsidyDate != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })
      this.LiPingList.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyDate != '' && item.subsidyDate != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })

      this.DisposableList.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyRemark != '' && item.subsidyRemark != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })
      this.familyList.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyRemark != '' && item.subsidyRemark != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })
      this.familyList1.forEach((item) => {
        if (
          (item.subsidyMoney != '' && item.subsidyMoney != null) ||
          (item.subsidyRemark != '' && item.subsidyRemark != null) || (item.id != '' && item.id != null)
        ) {
          arrList.push(item)
        }
      })
      _form.personSubsidyInfoList = arrList
      if (arrList && arrList.length) {
        arrList.forEach(item => {
          item.personId = this.form.personId
        })
      }
      // 编辑
      saveSubsidyDetails(_form).then((response) => {
        arrList = []
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: '编辑补贴信息保存成功!'
          })
          // 关闭页面
          this.closeDetailsPage()
        } else {
          this.$message.error(
            '编辑补贴信息操作失败，失败原因是：' + response.msg
          )
        }
      })
        .catch(() => {
          arrList = []
          this.$message.error('编辑补贴信息操作失败!')
        })
    },
    // 取消按钮
    cancelDetailsPage() {
      this.$confirm('该页面的信息尚未保存，确定要关闭页面吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.closeDetailsPage()
        })
        .catch(() => {})
    },
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/subsidyConfig/personnelSubsidy')
    },
    // 查看详情页面，点击编辑按钮
    toEditType() {
      this.$router.push({
        path: `/personnelSubsidy/details/${this.$route.params.id}`,
        query: {
          modelType: 'edit',
          _title: `编辑${this.form.fullName}`,
          menu: this.$route.query.menu
        }
      })
    },
    // 处理接口数据供表单使用
    formatData(response) {
      this.form = response.data
      if (response.data.personSubsidyInfoList.length) {
        const PensionList = []
        const SalvageList = []
        const DisabilityList = []
        const PreferentialList = []
        const ShiDuList = []
        const ShiDiList = []
        const LiPingList = []
        const DisposableList = []
        const familyList = []
        response.data.personSubsidyInfoList.forEach((item) => {
          if (item.subsidyTitleName == '养老补贴') {
            PensionList.push(item)
          }
          if (item.subsidyTitleName == '救助补贴') {
            SalvageList.push(item)
          }
          if (item.subsidyTitleName == '残疾补贴') {
            DisabilityList.push(item)
          }
          if (item.subsidyTitleName == '优抚补贴') {
            PreferentialList.push(item)
          }
          if (item.subsidyTitleName == '失独补贴') {
            ShiDuList.push(item)
          }
          if (item.subsidyTitleName == '失地补贴') {
            ShiDiList.push(item)
          }
          if (item.subsidyTitleName == '礼品补贴') {
            LiPingList.push(item)
          }
          if (item.subsidyTitleName == '一次性补贴') {
            DisposableList.push(item)
          }
          if (item.subsidyTitleName == '计生补贴') {
            familyList.push(item)
          }
        })
        this.PensionList.forEach((item) => {
          PensionList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList = _.cloneDeep(this.PensionList)
        this.familyList.forEach((item) => {
          familyList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
              item.ageRange = items.ageRange
            }
          })
        })
        this.familyList1.forEach((item) => {
          familyList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
              item.ageRange = items.ageRange
            }
          })
        })
        this.familyDataList = _.cloneDeep(this.familyList)
        this.familyDataList1 = _.cloneDeep(this.familyList1)
        this.SalvageList.forEach((item) => {
          SalvageList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList1 = _.cloneDeep(this.SalvageList)
        this.DisabilityList.forEach((item) => {
          DisabilityList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList2 = _.cloneDeep(this.DisabilityList)
        this.PreferentialList.forEach((item) => {
          PreferentialList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList3 = _.cloneDeep(this.PreferentialList)
        this.ShiDuList.forEach((item) => {
          ShiDuList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList7 = _.cloneDeep(this.ShiDuList)
        this.ShiDiList.forEach((item) => {
          ShiDiList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList8 = _.cloneDeep(this.ShiDiList)
        this.LiPingList.forEach((item) => {
          LiPingList.forEach((items) => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList9 = _.cloneDeep(this.LiPingList)
        const disposableTab = []
        DisposableList.forEach((item) => {
          disposableTab.push({
            subsidyMoney: item.subsidyMoney,
            subsidyUnit: item.subsidyUnit,
            id: item.id,
            subsidyDate: item.subsidyDate,
            subsidyRemark: item.subsidyRemark,
            subsidyElementName: item.subsidyElementName,
            subsidyTitleName: item.subsidyTitleName
          })
        })
        this.DisposableList = disposableTab
        this.dataList4 = this.DisposableList
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/form.css";

.tableContainer {
  margin-top: 20px;
}

.titleSlider {
  width: 100%;
  height: 100%;
  position: relative;
}

.titleSlider > span {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
  padding: 0 10px 0 20px;
  height: 47px;
  font-size: 16px;
  font-weight: 600;
}

.titleSlider > span .titleTip {
  position: absolute;
  top: 50%;
  left: 10px;
  margin-top: -9px;
  width: 3px;
  height: 18px;
  background-color: #0078d4;
  display: inline-block;
}

.titleSlider::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  border-top: 1px dashed #e1e1e1;
  content: "";
}

table tr:nth-child(even) {
  background-color: transparent;
}

.addBtnDiv {
  border: 1px dashed #e1e1e1;
  border-top: none;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.addBtnDiv > span {
  cursor: pointer;
  color: #0078d4;
}

.el-collapse-item__arrow {
  margin-right: 30px !important;
}

.el-footer {
  padding-top: 24px;
  padding-right: 0;
}

.el-footer > div {
  overflow: hidden;
}

.el-footer > div > button {
  float: right;
}

.base-btn {
  margin-left: 15px;
}

.cancel-btn {
  border: 1px solid #2b579a;
  color: #2b579a;
}

.remarkSpan {
  padding: 10px 20px;
  margin: 0;
}

/*.XXX{margin-bottom: 16px !important;}*/
/*.XXX .el-form-item__error{width: 200px;}*/
</style>
