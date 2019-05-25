// pages/q_post/index.js
var util = require('../../utils/util.js')
const db = wx.cloud.database()
const app = getApp()
let promise = require('./Promise.js')
let academic = null
let major = null
let subject = null
// 2019/5/25 3:15 钟纯情
// 需要在此处加上预期回复时间

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    max: 300,
    now: 0,
    title: '',
    content: '',
    userInfo: {},
    imagesList: new Array(),
    tempFilePaths: new Array(),
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...',
    _focus: false,
    multiArray: [
      [
        '外国语学院', '计算机科学与技术学院', '理学院', '材料科学与工程学院', '测控技术与通信学院', '电气与电子工程学院', '化学与环境工程学院', '机械动力工程学院', '建筑工程学院', '软件与微电子学院', '自动化学院', '综合性学科'
      ],
      [
        '朝鲜语', '日语', '俄语', '英语'
      ],
      [
        '朝语精读', '视听', '会话', '泛读', '写作', '朝汉翻译', '报刊选读', '文学作品选读', '韩国文学史', '韩国社会文化', '韩国影视作品欣赏'
      ]
    ],
    multiIndex: [0, 0, 0],
    tags: [],
    data: '',
  },
  showIcon: function() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  readOnlyChange: function() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onEditorReady: function() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
    }).exec()
  },

  undo: function() {
    this.editorCtx.undo()
  },
  redo: function() {
    this.editorCtx.redo()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var academicindex = e.detail.value[0]
    var majorindex = e.detail.value[1]
    var subjectindex = e.detail.value[2]
    academic = this.data.multiArray[0][academicindex]
    major = this.data.multiArray[1][majorindex]
    subject = this.data.multiArray[2][subjectindex]
    // console.log(academic,major,subject)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['朝鲜语', '日语', '俄语', '英语'];
            data.multiArray[2] = ['朝语精读', '视听', '会话', '泛读', '写作', '朝汉翻译', '报刊选读', '文学作品选读', '韩国文学史', '韩国社会文化', '韩国影视作品欣赏'];
            break;
          case 1:
            data.multiArray[1] = ['计算机科学与技术'];
            data.multiArray[2] = ['C++程序设计', 'Java语言', 'UML建模基础', '离散数学', '数字逻辑', '数据结构', '计算机组成原理', '汇编语言程序设计', '操作系统', '计算机网络', 'Linux系统应用', '计算机系统结构', '算法设计与分析', '数据库系统基础', '软件工程', 'Oracle数据库', '嵌入式系统设计', '数字图像处理'];
            break;
          case 2:
            data.multiArray[1] = ['材料物理', '光电信息科学与工程', '信息与计算科学', '应用物理学'];
            data.multiArray[2] = ['数学物理方法', '力学与理论力学', '热力学与统计物理', '电磁学与电动力学', '原子物理与量子力学', '固体物理', '材料性能测试', '物理化学', '电介质物理', '材料科学基础', '材料物理性能', '功能材料', '复合材料', '薄膜材料', '电子技术', '计算机原理'];
            break;
          case 3:
            data.multiArray[1] = ['金属材料工程', '无机非金属材料'];
            data.multiArray[2] = ['物理化学', '电工学', '机械原理', '工程力学', '冶金原理', '金属学原理', '机械设计', '传输原理', '逐渐形成理论', '材料分析技术', '热处理原理', '热加工测控技术', '铸造合金及熔炼', '铸造工艺学', '机电成型一体化', '热处理工艺', '热处理设备', '金属材料学', '金属力学性能', '材料加工过程数学化'];
            break;
          case 4:
            data.multiArray[1] = ['安全工程', '测控技术及仪器', '通信工程'];
            data.multiArray[2] = ['安全管理', '安全原理', '安全系统工程', '安全人机工程', '传热学与工程热力学', '安全评价', '危险化学品安全', '防火防爆技术', '机械安全技术', '特种设备安全技术', '安全检测技术', '电气安全技术', '可靠性工程', '安全CAD'];
            break;
          case 5:
            data.multiArray[1] = ['电气工程及其自动化', '电子信息工程'];
            data.multiArray[2] = ['电路', '电磁场', '电子技术', '工程制图CAD技术', '自动控制原理', '工程力学', '机械设计基础', '信号与系统', '电力电子技术', '电机学', '电气工程创新实践课', '单片机原理及应用', '工厂电气控制技术', '电气测试技术', '电力工程', '电机设计', '控制电机', '电机运动控制', '电机测试技术', '大电机技术', '电力系统暂态分析', '发电厂电气部分', '电力系统继电保护', '电力系统自动化', '电源变换技术', '运动控制系统', '电能质量及控制', '电力电子电路分析与仿真', '电动汽车新技术', '电气绝缘结构设计原理', '电气绝缘测试及诊断技术', '高电压试验技术', '电力系统过电压及保护', '高压电器', '电缆材料', '电力电缆', '电气绝缘测试技术', '通信电缆', '电缆工艺原理', '光纤与光缆', '工业通信与网络技术', '计算机控制技术', 'PLC电气控制与组态设计', '电介质物理学', '电介质化学', '数控加工与编程技术', 'TRIZ创新方法', '电机结构工艺学', '电机实践与仿真', '高电压技术', '电力系统通信技术', '新能源发电及控制技术', '电气CAD技术', '电力变压器电磁计算', '物理场有限元分析', '聚合物绝缘材料结构分析', '电缆测试技术', '电缆机械设备', '单片机高级语言编程', '电机工程应用软件', 'EDA技术', 'DSP原理及应用', '嵌入式系统设计与应用', '电路计算机辅助设计'];
            break;
          case 6:
            data.multiArray[1] = ['材料化学', '环境工程', '制药工程', '化学工程与工艺'];
            data.multiArray[2] = ['无机化学', '有机化学', '分析化学', '物理化学(一)', '高分子化学', '结构化学基础', '化工基础', '新材料创新设计与应用', '材料科学基础', '高分子物理', '材料物理', '材料合成与制备', '材料加工与成型', '分子结构解析', '材料测试方法', '高分子合成方法与工艺', '高分子功能材料', '聚合物基复合材料', '有机合成方法与路线', '有机功能材料', '有机功能材料设计与模拟', '电镀工艺', '材料表面加工', '表面涂装技术', '化工制图', '环境化学', '化工仪表及自动化', '生物化学', '工业催化', '计算机在材料化学中的应用', '电池原理与制造技术', '复合材料设计与制备', '材料表面与界面', '绝缘材料', '聚合物基体合成工艺', '材料设计', '生物医学材料', '功能复合材料', '塑料助剂', '杂化材料', '高等无机化学', '高等有机化学', '化工原理', '物理化学(二)'];
            break;
          case 7:
            data.multiArray[1] = ['车辆工程', '机械电子工程', '机械设计制造及其自动化', '能源与动力'];
            data.multiArray[2] = ['现代工程制图', '理论力学', '材料力学', '电工学', '工程材料与热成型技术', '机械设计基础', '流体与过程热力学', '互换性与技术测量', '机械制造基础', '机械控制工程基础', '汽车液压与气压传动技术', '汽车试验学', '汽车构造', '汽车理论', '汽车设计', '汽车电器与电子技术', '汽车发动机原理', '汽车NVH技术', '汽车车身设计基础', '汽车制造工业工程', '汽车电子控制技术', '新能源汽车技术', '车载网络技术', '汽车碰撞技术基础', '汽车回收与再生', '汽车排放控制及节能技术'];
            break;
          case 8:
            data.multiArray[1] = ['工程力学', '建筑学', '土木工程'];
            data.multiArray[2] = ['工程数学', '理论力学', '材料力学', '结构力学', '弹性力学', '振动力学', '有限元法', '数据结构', '工程计算软件及应用'];
            break;
          case 9:
            data.multiArray[1] = ['集成电路设计', '软件工程'];
            data.multiArray[2] = ['结构化程序设计(C)', '面向对象程序设计(C)', '电路', '数字电子技术', '数据结构与算法', '信号与系统', 'Verilog与数字系统设计', '模拟电子技术', '数字信号处理', '计算机组成原理与体系结构', '操作系统(双语)', '微电子电路-I、II', '版图设计', '数字IC设计(双语)', '基于FPGA的系统设计与应用', '模拟IC设计', '高级模拟IC设计', '数模混合IC设计', '低功耗设计', '高级数字IC设计', '布局与布线(双语)', '集成电路时序分析(双语)', '半导体物理', '晶体管原理', '嵌入式系统设计', 'ASIC设计(双语)', '逻辑综合技术(双语)', '电子系统设计', 'VLSI设计', '高速IC设计', 'SoC设计技术', '传感器接口集成电路', '基于运放的电路设计', '测试与可测试型设计', '微处理器设计', 'EDA软件设计', '计算机网络与通信', '脚本语言及应用', 'IP核设计与应用', '集成电路验证技术'];
            break;
          case 10:
            data.multiArray[1] = ['电子信息科学与技术'];
            data.multiArray[2] = ['电路', '模拟电子技术', '数字电路与逻辑设计', '微机原理与应用', '信号与系统', '信息论基础', '高频电子线路', '通信原理', '数字信号处理', '单片机原理及应用'];
            break;
          case 11:
            data.multiArray[1] = ['数学', '英语', '其他'];
            data.multiArray[2] = ['高等数学-I', '高等数学-II', '线性代数', '复变函数', '概率论与数理统计', '考研数学', '其他'];
            break;
            // 综合性学科分类，例如高数，大英等,一级名称为综合性学科，二级名称为高数，大学英语，三级对应高数一，高数二，考研数学，大学英语1，大学英语二，考研英语
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            /*外国语学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*外-朝语-课*/
                data.multiArray[2] = ['朝语精读', '视听', '会话', '泛读', '写作', '朝汉翻译', '报刊选读', '文学作品选读', '韩国文学史', '韩国社会文化', '韩国影视作品欣赏'];
                break;
              case 1:
                /*外-日语-课*/
                data.multiArray[2] = ['基础日语', '日语精读', '日语视听', '日语会话', '日文写作', '日本文学作品选读', '日语语法', '日语概说', '日本文学史', '科技日语阅读', '科技日语翻译', '日本贸易实务', '商务日语'];
                break;
              case 2:
                /*外-俄语-课*/
                data.multiArray[2] = ['基础俄语', '高级俄语', '语音', '语法', '视听', '会话', '阅读', '应用文写作', '俄苏文学史及作品选读', '俄罗斯概况', '笔译', '口译', '报刊选读', '经贸俄语', '国际贸易实务', '商务俄语口译', '科技俄语笔译', '科技俄语口译', '科技俄语阅读', '俄罗斯影视作品欣赏', '俄罗斯国情专题'];
                break;
              case 3:
                /*外-英语-课*/
                data.multiArray[2] = ['基础英语', '高级英语', '阅读', '听力', '口语', '写作', '语言学', '英国文学', '美国文学', '科技英语阅读', '科技英语翻译', '外贸英语'];
                break;

            }
            break;
          case 1:
            /*计算机学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /* 计-计-课*/
                data.multiArray[2] = ['C++程序设计', 'Java语言', 'UML建模基础', '离散数学', '数字逻辑', '数据结构', '计算机组成原理', '汇编语言程序设计', '操作系统', '计算机网络', 'Linux系统应用', '计算机系统结构', '算法设计与分析', '数据库系统基础', '软件工程', 'Oracle数据库', '嵌入式系统设计', '数字图像处理'];
                break;
            }
            break;
          case 2:
            /*理学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*理-材-课*/
                data.multiArray[2] = ['数学物理方法', '力学与理论力学', '热力学与统计物理', '电磁学与电动力学', '原子物理与量子力学', '固体物理', '材料性能测试', '物理化学', '电介质物理', '材料科学基础', '材料物理性能', '功能材料', '复合材料', '薄膜材料', '电子技术', '计算机原理'];
                break;
              case 1:
                /*理-光-课*/
                data.multiArray[2] = ['近代物理基础', '数学物理方法', '物理光学与应用光学', '电路', '电子技术', '固体物理', '激光原理与技术', '光学系统设计', '光通信原理与技术', '光电检测技术', '光电信息工程实验'];
                break;
              case 2:
                /*理-信-课*/
                data.multiArray[2] = ['数学分析', '几何与高代', '概率论与数理统计', '信息科学基础', '信息与编码', '数值分析', '数学建模', '优化与运筹', '计算机图形学', 'VC++程序设计', '图像处理', '软件工程'];
                break;
              case 3:
                /*理-应-课*/
                data.multiArray[2] = ['子物理与量子力学', '电磁学与电动力学', '力学与理论力学', '热学与热力学统计物理', '固体物理', '光学', '传感器原理', '半导体物理', '计算物理', '现代测试技术', '信息材料以及现代物理专业实验'];
                break;
            }
            break;
          case 3:
            /*材料学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*材-金-课*/
                data.multiArray[2] = ['物理化学', '电工学', '机械原理', '工程力学', '冶金原理', '金属学原理', '机械设计', '传输原理', '逐渐形成理论', '材料分析技术', '热处理原理', '热加工测控技术', '铸造合金及熔炼', '铸造工艺学', '机电成型一体化', '热处理工艺', '热处理设备', '金属材料学', '金属力学性能', '材料加工过程数学化'];
                break;
              case 1:
                /*材-无-课*/
                data.multiArray[2] = ['工程力学', '材料科学概论', '无机化学', '分析化学', '物理化学', '固体物理', '无机材料物理性能', '无机材料科学基础', '无机材料测试方法', '结晶学', '电工电子学', '粉体工程', '复合材料', '陶瓷工艺学', '玻璃水泥工艺学', '晶体材料', '功能材料', '纳米科学与技术', '功能陶瓷', '光通讯技术', '光纤光缆材料及制造技术', '人工晶体', '计算机在材料科学中的应用'];
                break;
            }
            break;
          case 4:
            /*测控学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*测-安-课*/
                data.multiArray[2] = ['安全管理', '安全原理', '安全系统工程', '安全人机工程', '传热学与工程热力学', '安全评价', '危险化学品安全', '防火防爆技术', '机械安全技术', '特种设备安全技术', '安全检测技术', '电气安全技术', '可靠性工程', '安全CAD'];
                break;
              case 1:
                /*测-测-课*/
                data.multiArray[2] = ['电子技术', '微机原理', '信号与系统', '测控电路', '传感技术', '控制技术与系统', '数字信号分析与处理', '误差理论与数据处理', '智能仪器设计', '光电技术', '数字图像处理', '测试技术', '光学信息技术', '电子技术', '工程光学', '微机原理', '信号与系统', '测控电路', '传感技术', '控制技术与系统', '数字信号分析与处理', '误差理论与数据处理', '智能仪器设计等专业课和专业平台课', '开设电气测量', '数字系统设计', '虚拟仪器与测量总线', '现代电子测量技术与仪器', '电力测试技术及系统', '电子技术', '工程光学', '微机原理', '信号与系统', '测控电路', '传感技术', '控制技术与系统', '数字信号分析与处理', '误差理论与数据处理', '智能仪器设计等专业课和专业平台课', '开设工业控制总线技术', '自动控制仪表及装置', '自动检测技术及仪表', '数字化测量与自动显示技术'];
                break;
              case 2:
                /*测-通-课*/
                data.multiArray[2] = ['通信电子线路', '信号与系统', '数字信号分析与处理', '通信原理', '现代程控交换技术', '数据传输技术', '微波与天线', '计算机通信与网络安全', '移动通信技术', '光纤通信技术', '数字系统设计', '语音及图像处理'];
                break;
            }
            break;
          case 5:
            /*电气学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*电-电气-课*/
                data.multiArray[2] = ['电路', '电磁场', '电子技术', '工程制图CAD技术', '自动控制原理', '工程力学', '机械设计基础', '信号与系统', '电力电子技术', '电机学', '电气工程创新实践课', '单片机原理及应用', '工厂电气控制技术', '电气测试技术', '电力工程', '电机设计', '控制电机', '电机运动控制', '电机测试技术', '大电机技术', '电力系统暂态分析', '发电厂电气部分', '电力系统继电保护', '电力系统自动化', '电源变换技术', '运动控制系统', '电能质量及控制', '电力电子电路分析与仿真', '电动汽车新技术', '电气绝缘结构设计原理', '电气绝缘测试及诊断技术', '高电压试验技术', '电力系统过电压及保护', '高压电器', '电缆材料', '电力电缆', '电气绝缘测试技术', '通信电缆', '电缆工艺原理', '光纤与光缆', '工业通信与网络技术', '计算机控制技术', 'PLC电气控制与组态设计', '电介质物理学', '电介质化学', '数控加工与编程技术', 'TRIZ创新方法', '电机结构工艺学', '电机实践与仿真', '高电压技术', '电力系统通信技术', '新能源发电及控制技术', '电气CAD技术', '电力变压器电磁计算', '物理场有限元分析', '聚合物绝缘材料结构分析', '电缆测试技术', '电缆机械设备', '单片机高级语言编程', '电机工程应用软件', 'EDA技术', 'DSP原理及应用', '嵌入式系统设计与应用', '电路计算机辅助设计'];
                break;
              case 1:
                /*电-电子-课*/
                data.multiArray[2] = ['电路', '电子技术', '信号与系统', '高频电子电路', '电磁场与电磁波', '数字信号处理', '单片机原理及应用', '计算机通信网', '信息论与编码', '电子设计实践', '嵌入式系统设计', '随机信号检测与分析', '电力电子技术', '传感技术', '现场总线技术', '智能仪器设计', '数字图像处理', '计算机图形学', '语音信号处理技术', '现代交换原理与技术', 'MATLAB及应用', '自动控制原理', '计算机软件基础', '模式识别基础', '智能信号处理导论', 'DSP原理及应用', 'EDA设计与实践', 'FPGA设计与应用', 'LabVIEW程序设计及开发', 'JAVA程序设计'];
                break;
            }
            break;
          case 6:
            /*化学学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*化-材料-课*/
                data.multiArray[2] = ['无机化学', '有机化学', '分析化学', '物理化学(一)', '高分子化学', '结构化学基础', '化工基础', '新材料创新设计与应用', '材料科学基础', '高分子物理', '材料物理', '材料合成与制备', '材料加工与成型', '分子结构解析', '材料测试方法', '高分子合成方法与工艺', '高分子功能材料', '聚合物基复合材料', '有机合成方法与路线', '有机功能材料', '有机功能材料设计与模拟', '电镀工艺', '材料表面加工', '表面涂装技术', '化工制图', '环境化学', '化工仪表及自动化', '生物化学', '工业催化', '计算机在材料化学中的应用', '电池原理与制造技术', '复合材料设计与制备', '材料表面与界面', '绝缘材料', '聚合物基体合成工艺', '材料设计', '生物医学材料', '功能复合材料', '塑料助剂', '杂化材料', '高等无机化学', '高等有机化学', '化工原理', '物理化学(二)'];
                break;
              case 1:
                /*化-环境-课*/
                data.multiArray[2] = ['无机化学', '有机化学', '分析化学', '环境工程微生物', '环境化学', '物理化学（一）', '环境工程制图', '环境监测', '环境监测实验', '环境工程CAD', '化工原理', '流体力学', '环境生态学', '环境影响评价', '大气污染控制工程', '水污染控制工程', '固体废物处理与处置', '水处理工程设计与计算', '工业给水处理技术', '化工废水处理技术', '环境评价技术方法', '环境影响评价案例分析', '环境法规与环境标准', '生态工程设计', '生态监测与评价', '土壤污染与修复', '化学反应动力学', '电工技术与仪表自动化', '物理性污染控制', '泵与泵站', '生物化学', '环境规划与管理', '环境生物技术', '环境工程仿真与控制', '环境工程技术经济', '环境友好材料', '环境资源学', '给排水管网工程', '工程设计导论', '环境工程施工技术', '高等无机化学', '高等有机化学', '物理化学（二）', '化工原理（二）', '化学反应工程', '污染控制微生物学', '环境工程专业外语'];
                break;
              case 2:
                /*化-制药-课*/
                data.multiArray[2] = ['无机化学', '有机化学', '分析化学', '物理化学（一）', '生物化学', '化工原理（一）', '波谱分析', '制药工程制图', '制药设备与工艺设计', '工业制剂学', '天然药物化学', '药理学', '药物化学', '药物分析', '药物分离技术', '药物合成反应', '化学制药工艺', '药物中间体', '中药制剂新剂型与新技术', '中药鉴定与炮制', '中药药理', '生物工程技术', '生物制药工艺', '生化分离工程', '工业微生物', '人体解剖生理学', '计算机辅助药物分子设计', '环境化学', '化工仪表自动化', '电子技术在制药中的应用', '材料化学', '工业催化', '药品管理法规', '生理学', '实用化学制药工艺', '生物制药工程技术', '中药制剂技术', '新药研究与开发', '药品市场营销', '消费行为学', '高等无机化学', '高等有机化学', '物理化学（二）', '化工原理（二）'];
                break;
              case 3:
                /*化-化-课*/
                data.multiArray[2] = ['无机化学', '分析化学', '有机化学', '物理化学（一）', '化工原理（一）', '化工制图', '化学反应工程', '化工热力学', '化工分离工程', '化工工艺设计', '化工设备机械基础', '仪器分析', '精细化工工艺', '精化产品合成原理', '压力容器设计', '设备安全工程', '电化学原理', '化学电源工艺学', '电子技术在化工中的应用', '化工仪表及自动化', '化工常用软件使用', '设备腐蚀及防护', '日用品化学', '过程流体机械', '石化催化剂设计及测试', '生物化学', '材料化学导论', '药物化学导论', '化工过程分析与合成', '工业催化', '化学反应动力学', '绿色化学与化工', '新型化学电源', '纳米科学与技术', '新能源利用技术', '膜科学与技术', '高分子化学', '环境化学', '专业外语', '化工分析与实践', '石油炼制工程', '石油化工产品生产技术', '电极材料结构表征', '化工原理（二）', '有机化学（二）', '物理化学（二）'];
                break;
            }
            break;
          case 7:
            /*机械学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*机-车-课*/
                data.multiArray[2] = ['现代工程制图', '理论力学', '材料力学', '电工学', '工程材料与热成型技术', '机械设计基础', '流体与过程热力学', '互换性与技术测量', '机械制造基础', '机械控制工程基础', '汽车液压与气压传动技术', '汽车试验学', '汽车构造', '汽车理论', '汽车设计', '汽车电器与电子技术', '汽车发动机原理', '汽车NVH技术', '汽车车身设计基础', '汽车制造工业工程', '汽车电子控制技术', '新能源汽车技术', '车载网络技术', '汽车碰撞技术基础', '汽车回收与再生', '汽车排放控制及节能技术'];
                break;
              case 1:
                /*机-机电-课*/
                data.multiArray[2] = ['工程图学', '理论力学', '材料力学', '工程材料与热成型技术', '电工技术', '电子技术', '机械原理', '机械设计', '机械制造基础', '流体力学', '液压与气压传动', '机电系统控制基础', '单片机原理与接口技术', '互换性与技术测量', '数控技术', '机械工程测试技术', '机电传动控制与可编程控制器应用', '机电系统设计', '数控机床', '数控加工技术', '数控系统维护及调试', '液压系统的电控设计', '气压系统设计', '电液伺服系统', '机器人技术', '虚拟样机技术', '人工智能基础'];
                break;
              case 2:
                /*机-机制-课*/
                data.multiArray[2] = ['现代工程制图', '理论力学', '工程传热学', '工程热力学', '材料力学', '电工学', '工程材料与热成型技术', '机械原理', '互换性与测量基础', '机械设计', '机械控制工程基础', '液压与气压传动', '工程测试技术', '机械制造技术', '机械系统设计', '数控技术', '机械现代设计方法', '机械结构分析及优化', '机械产品设计技术', '先进制造技术', '现代特种加工', '精密与超精密加工', '先进刀具设计技术', '刀具材料及刀具制造工艺', '高速切削技术', '自动机械设计', '机电测控技术及应用', '机电传动控制'];
                break;
              case 3:
                /*机-能-课*/
                data.multiArray[2] = ['工程图学', '电工学', '理论力学', '材料力学', '机械设计基础', '材料成型技术基础', '互换性与技术测量', '工程热力学', '工程流体力学', '传热学', '动力机械工程基础', '燃烧学', '热工与动力测试', '自动控制原理', '动力机械制造工艺学', '压力容器强度分析', '燃烧技术与设备', '锅炉原理与设计', '火力发电厂', '供热工程', '制冷原理与技术', '制冷与空调装置', '工业通风', '空气调节'];
                break;
            }
            break;
          case 8:
            /*建筑学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*建-工-课*/
                data.multiArray[2] = ['工程数学', '理论力学', '材料力学', '结构力学', '弹性力学', '振动力学', '有限元法', '数据结构', '工程计算软件及应用'];
                break;
              case 1:
                /*建-建-课*/
                data.multiArray[2] = ['建筑设计', '建筑设计理论', '中国建筑史', '外国建筑史', '生态建筑概论', '建筑结构', '建筑构造', '建筑物理', '建筑设备', '画法几何及阴影透视', '造型艺术基础', '规划设计原理及设计'];
                break;
              case 2:
                /*建-土-课*/
                data.multiArray[2] = ['工程力学', '结构力学', '土力学', '地基基础', '土木工程材料', '测量学', '钢筋混凝土结构基本原理与设计', '钢结构基本原理施工技术', '路基路面工程', '桥梁工程'];
                break;

            }
            break;
          case 9:
            /*软微学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*软-集-课*/
                data.multiArray[2] = ['结构化程序设计(C)', '面向对象程序设计(C)', '电路', '数字电子技术', '数据结构与算法', '信号与系统', 'Verilog与数字系统设计', '模拟电子技术', '数字信号处理', '计算机组成原理与体系结构', '操作系统(双语)', '微电子电路-I、II', '版图设计', '数字IC设计(双语)', '基于FPGA的系统设计与应用', '模拟IC设计', '高级模拟IC设计', '数模混合IC设计', '低功耗设计', '高级数字IC设计', '布局与布线(双语)', '集成电路时序分析(双语)', '半导体物理', '晶体管原理', '嵌入式系统设计', 'ASIC设计(双语)', '逻辑综合技术(双语)', '电子系统设计', 'VLSI设计', '高速IC设计', 'SoC设计技术', '传感器接口集成电路', '基于运放的电路设计', '测试与可测试型设计', '微处理器设计', 'EDA软件设计', '计算机网络与通信', '脚本语言及应用', 'IP核设计与应用', '集成电路验证技术'];
                break;
              case 1:
                /*软-软-课*/
                data.multiArray[2] = ['结构化程序设计（C）', '电路', '数字电路及逻辑', '离散数学', '面向对象程序设计（VC++）', '软件工程过程', '数据结构', '数据库系统', '计算机组成原理与结构', '面向对象程序设计(JAVA)', '操作系统', '计算机网络', '编译原理', '算法设计与分析', '系统分析与设计', '软件体系结构', '软件质量保证与测试技术', '软件项目管理', 'Java Web程序设计', 'ERP原理及设计', '软件开发架构', 'Web前端技术', '嵌入式微处理结构与应用', '嵌入式操作系统', '数字系统设计', '嵌入式软件开发技术及应用', '移动云计算导论', '移动通信及无线网络', '无线通讯技术', '移动云计算软件开发', '大数据导论', '信息搜索技术', 'NoSql数据库技术', '数据分析方法'];
                break;

            }
            break;
          case 10:
            /*自动化学院*/
            switch (data.multiIndex[1]) {
              case 0:
                /*自-电-课*/
                data.multiArray[2] = ['电路', '模拟电子技术', '数字电路与逻辑设计', '微机原理与应用', '信号与系统', '信息论基础', '高频电子线路', '通信原理', '数字信号处理', '单片机原理及应用'];
                break;
            }
            break;
          case 11:
            /*综合性学科*/
            switch (data.multiIndex[1]) {
              case 0:
                /*综-数-课*/
                data.multiArray[2] = ['高等数学-I', '高等数学-II', '线性代数', '复变函数', '概率论与数理统计', '考研数学', '其他'];
                break;
              case 1:
                /*综-英-课*/
                data.multiArray[2] = ['大学英语-I', '大学英语-II', '考研英语', '其他'];
                break;
              case 2:
                /*综-其-课*/
                data.multiArray[2] = ['其他'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        // console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  charChange: function(e) {
    var value = e.detail.value
    var len = value.length
    if (len > 500) {
      return
    } else {
      this.setData({
        content: value,
        now: len
      })
    }
  },
  titleChange: function(e) {
    var title = e.detail.value
    if (title.length > 15) {
      return
    } else {
      this.setData({
        title: title
      })
    }
  },
  uploadpic: function() {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        // console.log(res.tempFilePaths)
      },
    })
  },
  handleDelete: function(e) {
    // console.log(e.currentTarget.dataset.index)
    const index = e.currentTarget.dataset.index
    var temp = this.data.tempFilePaths
    temp.splice(index, 1)
    this.setData({
      tempFilePaths: temp
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var newdate = util.formatDate(new Date)
    this.setData({
      date: newdate
    })
    wx.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: {}
    })

  },
  bindDateChange: function(e) {
    console.log('1picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  submitForm(e) {
    var that = this
    if (app.globalData.openid) {
      const title = this.data.title
      this.editorCtx.getContents({
        success: function(res) {
          that.data.content = res.text;
          const content = res.text;
          if (content && title && academic && major && subject) {
            wx.showLoading({
              title: '正在发布...',
              mask: true
            })
            const arr = that.data.tempFilePaths.map(path => {
              const name = Math.random() * 1000000;
              const time = util.formatTime(new Date)
              const cloudPath = name + path.match(/\.[^.]+?$/)[0]
              return wx.cloud.uploadFile({
                cloudPath: time.replace(/\s+/g, '').replace(new RegExp(/(:)/g), '').replace(/\\|\//g, '') + cloudPath,
                filePath: path
              }).then(res => {
                // console.log(res.fileID)
                that.data.imagesList.push(res.fileID)
              }).catch(error => {
                // console.log(error)
              })
            })

            if (that.data.tempFilePaths.length != 0) {

              // console.log(academic,major,subject)
              db.collection('questions').add({
                  data: {
                    title: that.data.title,
                    content: that.data.content,
                    tags: [academic, major, subject],
                    time: util.formatTime(new Date()),
                    type: false,
                    images: that.data.imagesList,
                    qAvatarUrl: that.data.userInfo.avatarUrl,
                    qNickName: that.data.userInfo.nickName,
                    expectResolveDate: that.data.date
                  }
                }).then(res => {
                  // console.log(that.data.date)
                  console.log(res)
                  return wx.showToast({
                    title: '发布成功',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                  })
                })
                .then(res => {
                  return setTimeout(function() {
                    wx.reLaunch({
                      url: '../share/index',
                    })
                  }, 1000)
                }).catch(err => {
                  wx.hideLoading()
                  wx.showToast({
                    title: '发布失败',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                  })
                })
            } else {
              db.collection('questions').add({
                data: {
                  title: that.data.title,
                  content: that.data.content,
                  tags: [academic, major, subject],
                  time: util.formatTime(new Date()),
                  type: false,
                  images: that.data.imagesList,
                  qAvatarUrl: that.data.userInfo.avatarUrl,
                  qNickName: that.data.userInfo.nickName,
                  expectResolveDate: that.data.date
                },
                success: function() {
                  wx.showToast({
                    title: '发布成功',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                  })
                  setTimeout(function() {
                    wx.navigateBack({
                      delta: 2
                    })
                  }, 1000)
                },
                fail: function() {
                  wx.showToast({
                    title: '发布失败',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                  })
                }
              })
            }
          } else {
            promise.showtoast()
          }
        }
      })

    } else {
      promise.showmodal().then(res => {
        // console.log(res.confirm)
        if (res.confirm) {
          return wx.navigateTo({
            url: '../login/index',
          })
        }
      })
    }

  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.tempFilePaths
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!app.globalData.openid) {
      promise.showmodal().then(res => {
        // console.log(res.confirm)
        if (res.confirm) {
          return wx.navigateTo({
            url: '../login/index',
          })
        }
      })
    } else {
      // console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})