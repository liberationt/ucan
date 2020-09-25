/**
 * 根据机构的类型值返回对应的机构名称
 * @param instituType
 * @returns {string}
 */
export function facilityTypeFun(instituType) {
  let _type_ = ''
  switch (instituType) {
    case '2010_chizhou':
    case '2010':
      _type_ = '日间照护机构'
      break
    case '2011':
    case '2011_chizhou': //池州综合为老服务中心
      _type_ = '综合为老服务中心'
      break
    case '2012':
      _type_ = '邻里汇'
      break
    case '2013':
      _type_ = '老年活动室'
      break
    case '2014':
      _type_ = '助餐点'
      break
    case '2015':
      _type_ = '社区长者食堂'
      break
    case '2016':
      _type_ = '护理站'
      break
    case '2017':
      _type_ = '社区养老组织'
      break
    case '2018':
      _type_ = '健康小屋'
      break
    case '2019':
      _type_ = '护理院'
      break
	    case '4001':
	        _type_ = '养老辅具展示点'
	        break
    case '2020':
	        _type_ = '社区卫生服务设施'
          break
    case '2021':
          _type_ = '村民互助点'
          break
    case '2022':
          _type_ = '社区养老服务站'
          break
    case '2023':
          _type_ = '养老服务指导中心'
          break
    case '2024':
          _type_ = '社区为老服务站'
  }
  return _type_
}

/**
 * 服务信息-递归查找复选框的值
 * @param data
 * @returns {Array}
 */
export function checkboxRecursive(data, that, saveObj) {
  if (data !== null) {
    data.forEach((item) => {
      if (item.checkbox) {
        if (item.children) {
          item.children.forEach((items) => {
            if (items.ifSelected) {
              const obj = {
                'id': items.id,
                'pid': items.pid,
                'orgName': that.form.orgName,
                'orgType': that.form.orgType,
                'serviceKey': items.serviceKey,
                'serviceValue': items.serviceValue,
                'subsidyValue': items.subsidyValue,
                'elementType': items.elementType
              }
              saveObj.push(obj)
            }
          })
        }
        if (item.elementType === 'labelRedio') {
          if (item.ifSelected) {
            const obj = {
              'id': item.id,
              'pid': item.pid,
              'orgName': that.form.orgName,
              'orgType': that.form.orgType,
              'serviceKey': item.serviceKey,
              'serviceValue': item.serviceValue,
              'subsidyValue': item.subsidyValue,
              'elementType': item.elementType
            }
            saveObj.push(obj)
          }
        }
      } else {
        if (item.elementType === 'subsidyForm' || item.elementType === 'inputCheckboxLabel') {
          if (item.ifSelected) {
            const obj = {
              'id': item.id,
              'pid': item.pid,
              'orgName': that.form.orgName,
              'orgType': that.form.orgType,
              'serviceKey': item.serviceKey,
              'serviceValue': item.serviceValue,
              'subsidyValue': item.subsidyValue,
              'elementType': item.elementType
            }
            saveObj.push(obj)
            if (item.children) {
              item.children.forEach((items) => {
                const obj = {
                  'id': items.id,
                  'pid': items.pid,
                  'orgName': that.form.orgName,
                  'orgType': that.form.orgType,
                  'serviceKey': items.serviceKey,
                  'serviceValue': items.serviceValue,
                  'subsidyValue': items.subsidyValue,
                  'elementType': items.elementType
                }
                saveObj.push(obj)
              })
            }
          }
        }
        // inputLabel 必须要存入数据库 不管是否选定值
        else if (item.elementType === 'inputLabel') {
          let obj = {
            'id': item.id,
            'pid': item.pid,
            'orgName': that.form.orgName,
            'orgType': that.form.orgType,
            'serviceKey': item.serviceKey,
            'serviceValue': item.serviceValue,
            'subsidyValue': item.subsidyValue,
            "elementType":item.elementType,
          };
          saveObj.push(obj);
          checkboxRecursive(item.children,that,saveObj);
        }
        else if (item.elementType === 'inputLabelRadio' || item.elementType === 'inputCheckbox' || item.elementType === 'inputCheckboxTimeHHmm') {
          if (item.ifSelected) {
            let obj = {
              'id': item.id,
              'pid': item.pid,
              'orgName': that.form.orgName,
              'orgType': that.form.orgType,
              'serviceKey': item.serviceKey,
              'serviceValue': item.serviceValue,
              'subsidyValue': item.subsidyValue,
              "elementType": item.elementType,
            };
            saveObj.push(obj);
            checkboxRecursive(item.children, that, saveObj);
          }
        }
        else {
          checkboxRecursive(item.children, that, saveObj)
        }
      }
    })
  }
  return saveObj
}
