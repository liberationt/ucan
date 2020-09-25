/**
 * Created by jiachenpan on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
		decodeURIComponent(search)
		  .replace(/"/g, '\\"')
		  .replace(/&/g, '","')
		  .replace(/=/g, '":"')
		  .replace(/\+/g, ' ') +
		'"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
			classString.substr(0, nameIndex) +
			classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function expandAll(el) {
  const els = el
  for (let i = 0; i < els.length; i++) {
    els[i].click()
  }
}

export function computerAge(strBirthday) {
  if (strBirthday) {
    const birthdays = new Date(strBirthday.replace(/-/g, '/'))
    const d = new Date()
    const age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth() ||
			(d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0)
    return age + ''
  } else {
    return ''
  }
}

// 通过身份证截取出生日期
export function getBirthdayFromIdCard(idCard) {
  let birthday = ''
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  if (idCard != null && idCard != '' && reg.test(idCard)) {
    if (idCard.length == 15) {
      birthday = '19' + idCard.substr(6, 6)
    } else if (idCard.length == 18) {
      birthday = idCard.substr(6, 8)
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
  }
  return birthday
}

// 日期格式化 yyyy-MM-dd
export function getDate_YMD(date) {
  const myDate = new Date(date)
  const years = myDate.getFullYear()
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return years + '-' + month + '-' + day
}

// 标签选项格式转换
// ['a:0','b:1','b:2'] => {a: 0, b:0, b: 1}
export function transformTags(tags) {
  const tagsObj = {}
  tags.forEach((item, index) => {
    const [key, value] = item.split(':')
    if (key in tagsObj) {
      tagsObj[key].push(value)
    } else {
      tagsObj[key] = [value]
    }
  })
  return tagsObj
}

// 将arrayBuffer转成文件并下载
export function downloadFromBlob(blobData, fileName) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blobData, fileName)
  } else {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blobData)
    a.download = fileName
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
  }
}

// js将超过指定长度的文本以省略号显示
export function limitTextEllipsis(centent, maxLen) {
  if (centent != null && centent != '') {
    const len = centent.length // 当前HTML对象text的长度
    let str = ''
    if (len > maxLen) {
      str = centent.substring(0, maxLen) + '...'// 使用字符串截取，获取前maxLen个字符，多余的字符使用“......”代替
      return str// 将替换的值赋值给当前对象
    } else {
      return centent
    }
  } else {
    return ''
  }
}

// 表单输入数字类型
export function transformNumber(value) {
  return value.toString().replace(/[^\d]/g, '')
}

// 表单输入数字类型和字母类型
export function transformNumberLetter(value) {
  return value.replace(/[^[A-Za-z0-9]/g, '')
}

// 表单输入数字类型和一位小数
export function transformFloatNumber1(value) {
  return value.replace(/[^.[0-9]/g, '')
}

// 匹配颜色高亮
export function keywordsHighlight(str, key) {
  const reg = new RegExp('(' + key + ')', 'g')
  return str.replace(reg, "<b style='color:#D61310;'>$1</b>")
}

export function add0(m) {
  return m < 10 ? '0' + m : m
}

// 时间
export function setDateTime(date) {
  let time
  if (date === '') {
    time = new Date()
  } else {
    time = new Date(date)
  }

  const y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let mm = time.getMinutes()
  let s = time.getSeconds()
  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  if (h < 10) {
    h = '0' + h
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  if (s < 10) {
    s = '0' + s
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
}

// 多个表单校验，formRefs 是表单实例数组
export function validateForms(formRefs) {
  const objectList = []
  const results = formRefs.map(formRef =>
    new Promise((resolve, reject) => {
      formRef.validate((valid, object) => {
        if (valid) {
          resolve()
        } else {
          objectList.push(object)
          reject()
        }
      })
    })
  )
  return Promise.all(results).catch(() => {
    return Promise.reject(objectList)
  })
}

export function scrollToTop() {
  window.scrollTo(0, 0)
}

export function scrollToEl(el) {
  const rect = el.getBoundingClientRect()
  window.scrollBy(0, rect.top - 250) // 150 是因为顶部导航栏的遮挡留的
}
