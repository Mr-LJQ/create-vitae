import { CascaderOption } from "element-plus";

const provinces = [
  "热门",
  "广东",
  "江苏",
  "浙江",
  "湖北",
  "四川",
  "陕西",
  "安徽",
  "河南",
  "山东",
  "湖南",
  "河北",
  "辽宁",
  "吉林",
  "广西",
  "山西",
  "内蒙古",
  "黑龙江",
  "福建",
  "江西",
  "海南",
  "贵州",
  "云南",
  "西藏",
  "甘肃",
  "青海",
  "宁夏",
  "新疆",
  "港澳台",
] as const;

const provincesAndCities = {
  热门: [
    "北京",
    "上海",
    "广州",
    "深圳",
    "重庆",
    "天津",
    "武汉",
    "杭州",
    "南京",
    "苏州",
    "成都",
    "西安",
  ],
  广东: [
    "广州",
    "深圳",
    "珠海",
    "惠州",
    "佛山",
    "韶关",
    "汕头",
    "江门",
    "湛江",
    "茂名",
    "肇庆",
    "梅州",
    "汕尾",
    "河源",
    "阳江",
    "清远",
    "东莞",
    "中山",
    "潮州",
    "揭阳",
    "云浮",
  ],
  江苏: [
    "南京",
    "苏州",
    "无锡",
    "徐州",
    "常州",
    "南通",
    "连云港",
    "淮安",
    "盐城",
    "扬州",
    "镇江",
    "泰州",
    "宿迁",
  ],
  浙江: [
    "杭州",
    "宁波",
    "温州",
    "嘉兴",
    "湖州",
    "绍兴",
    "金华",
    "衢州",
    "舟山",
    "台州",
    "丽水",
  ],
  湖北: [
    "武汉",
    "宜昌",
    "襄阳",
    "十堰",
    "鄂州",
    "荆门",
    "黄石",
    "孝感",
    "荆州",
    "黄冈",
    "咸宁",
    "随州",
    "恩施",
    "天门市",
    "仙桃市",
    "潜江市",
    "神农架林区",
  ],
  四川: [
    "成都",
    "自贡",
    "攀枝花",
    "泸州",
    "德阳",
    "绵阳",
    "广元",
    "遂宁",
    "内江",
    "乐山",
    "南充",
    "眉山",
    "宜宾",
    "广安",
    "达州",
    "雅安",
    "巴中",
    "资阳",
    "阿坝",
    "甘孜",
    "凉山",
  ],
  陕西: [
    "西安",
    "西咸新区",
    "铜川",
    "宝鸡",
    "咸阳",
    "渭南",
    "延安",
    "汉中",
    "榆林",
    "安康",
    "商洛",
  ],
  安徽: [
    "合肥",
    "芜湖",
    "蚌埠",
    "淮南",
    "马鞍山",
    "淮北",
    "铜陵",
    "安庆",
    "黄山",
    "滁州",
    "阜阳",
    "宿州",
    "六安",
    "亳州",
    "池州",
    "宣城",
  ],
  河南: [
    "郑州",
    "开封",
    "洛阳",
    "平顶山",
    "安阳",
    "鹤壁",
    "新乡",
    "焦作",
    "濮阳",
    "许昌",
    "漯河",
    "三门峡",
    "南阳",
    "商丘",
    "信阳",
    "周口",
    "驻马店",
    "济源市",
  ],
  山东: [
    "济南",
    "青岛",
    "烟台",
    "淄博",
    "枣庄",
    "东营",
    "潍坊",
    "济宁",
    "泰安",
    "威海",
    "日照",
    "莱芜",
    "临沂",
    "德州",
    "聊城",
    "滨州",
    "菏泽",
  ],
  湖南: [
    "长沙",
    "株洲",
    "湘潭",
    "衡阳",
    "邵阳",
    "岳阳",
    "常德",
    "张家界",
    "益阳",
    "郴州",
    "永州",
    "怀化",
    "娄底",
    "湘西",
  ],
  河北: [
    "石家庄",
    "唐山",
    "秦皇岛",
    "邯郸",
    "邢台",
    "保定",
    "张家口",
    "承德",
    "沧州",
    "廊坊",
    "衡水",
  ],
  辽宁: [
    "大连",
    "沈阳",
    "鞍山",
    "抚顺",
    "本溪",
    "丹东",
    "锦州",
    "营口",
    "阜新",
    "辽阳",
    "盘锦",
    "铁岭",
    "朝阳",
    "葫芦岛",
  ],
  吉林: [
    "长春",
    "吉林市",
    "四平",
    "辽源",
    "通化",
    "白山",
    "松原",
    "白城",
    "延边",
  ],
  广西: [
    "南宁",
    "柳州",
    "桂林",
    "梧州",
    "北海",
    "防城港",
    "钦州",
    "贵港",
    "玉林",
    "百色",
    "贺州",
    "河池",
    "来宾",
    "崇左",
  ],
  山西: [
    "太原",
    "大同",
    "阳泉",
    "长治",
    "晋城",
    "朔州",
    "晋中",
    "运城",
    "忻州",
    "临汾",
    "吕梁",
  ],
  内蒙古: [
    "呼和浩特",
    "包头",
    "乌海",
    "赤峰",
    "通辽",
    "鄂尔多斯",
    "呼伦贝尔",
    "兴安盟",
    "锡林郭勒盟",
    "乌兰察布",
    "巴彦淖尔",
    "阿拉善盟",
  ],
  黑龙江: [
    "哈尔滨",
    "齐齐哈尔",
    "鸡西",
    "鹤岗",
    "双鸭山",
    "大庆",
    "伊春",
    "佳木斯",
    "七台河",
    "牡丹江",
    "黑河",
    "绥化",
    "大兴安岭",
  ],
  福建: [
    "福州",
    "厦门",
    "莆田",
    "三明",
    "泉州",
    "漳州",
    "南平",
    "龙岩",
    "宁德",
  ],
  江西: [
    "南昌",
    "景德镇",
    "萍乡",
    "九江",
    "新余",
    "鹰潭",
    "赣州",
    "吉安",
    "宜春",
    "抚州",
    "上饶",
  ],
  海南: [
    "三沙",
    "海口",
    "三亚",
    "洋浦市/洋浦经济开发区",
    "琼海",
    "儋州",
    "五指山",
    "文昌",
    "万宁",
    "东方",
    "定安",
    "屯昌",
    "澄迈",
    "临高",
    "琼中",
    "保亭",
    "白沙",
    "昌江",
    "乐东",
    "陵水",
  ],
  贵州: [
    "贵阳",
    "六盘水",
    "遵义",
    "安顺",
    "铜仁",
    "黔西南",
    "毕节",
    "黔东南",
    "黔南",
  ],
  云南: [
    "昆明",
    "曲靖",
    "玉溪",
    "保山",
    "昭通",
    "楚雄",
    "红河",
    "文山",
    "西双版纳",
    "大理",
    "德宏",
    "丽江",
    "怒江",
    "迪庆",
    "临沧",
    "普洱",
  ],
  西藏: ["拉萨", "昌都", "山南", "日喀则", "那曲", "阿里", "林芝"],
  甘肃: [
    "兰州",
    "嘉峪关",
    "金昌",
    "白银",
    "天水",
    "武威",
    "张掖",
    "平凉",
    "酒泉",
    "庆阳",
    "定西",
    "陇南",
    "临夏",
    "甘南",
  ],
  青海: ["西宁", "海东", "海北", "黄南", "海南州", "果洛", "玉树", "海西"],
  宁夏: ["银川", "石嘴山", "吴忠", "固原", "中卫"],
  新疆: [
    "双河市",
    "铁门关市",
    "北屯市",
    "乌鲁木齐",
    "克拉玛依",
    "吐鲁番",
    "哈密",
    "昌吉",
    "博尔塔拉",
    "巴音郭楞",
    "阿克苏",
    "克孜勒苏柯尔克孜",
    "喀什",
    "和田",
    "伊犁",
    "塔城",
    "阿勒泰",
    "石河子市",
    "阿拉尔市",
    "图木舒克市",
    "五家渠市",
    "可克达拉市",
    "昆玉市",
    "胡杨河市",
  ],
  港澳台: ["香港", "澳门", "台湾"],
};

export const chinaCities = provinces.map((name) => {
  return {
    label: name,
    value: name,
    children: provincesAndCities[name].map((val) => {
      return {
        label: val,
        value: val,
      };
    }),
  };
}) as CascaderOption[];