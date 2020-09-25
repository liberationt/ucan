import { getQuestionnaireList } from '@/api/evaluationManagement/questionnaire.js'
export default {
  methods: {
    // 过滤获取指定问卷tab信息
    getTargetTypeQuestionnaireInfo(type) {
      return new Promise((resolve, reject) => {
        getQuestionnaireList().then(res => {
          const { data } = res
          if (!data) return false
          if (type) {
            const filterData = data.filter(item => item.questionnaireType === type)
            resolve(filterData)
          } else {
            resolve(data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    fmtSortCode(index) {
      const codeLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      return index <= 25 ? codeLetter[index] : '0' + codeLetter[index - 26]
    },
    fmtOptionName(index) {
      const optsMap = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D'
      }
      return optsMap[index] ? optsMap[index] : optsMap[1]
    }
  }
}
