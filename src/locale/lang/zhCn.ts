export default {
  name: "cn",
  content: {
    menuHeader: {
      textController: {
        fontSize: "字体大小",
        fontFamily: "字体",
        language: "语言",
        fontSizeOptions: [12, 13, 14, 15, 16],
        fontFamilyOptions: [
          "微软雅黑",
          "宋体",
          "楷体",
          "黑体",
          "平方",
          "Arial",
        ],
        languageOptions: [
          "中文(简)",
        ] /*todo:此处应该静态编译，根据 locale/lang 中的 语言得出 */,
      },
    },
  },
};
