/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
const data = [{
        id: 1,
        svg_Id: 20,
        content: ' 图书管理猿的书架',
        subproject:[{
            id: 1,
            svg_Id: 21,
            classify: '计算机',
            classify_en: 'computer',
            },
            {
            id: 2,
            svg_Id: 22,
            classify: '文学',
            classify_en: 'letter',
            
            },
            {
            id: 3,
            svg_Id: 23,
            classify: '数理化',
            classify_en: 'math_phys_chem',
            
            },
            {
                id: 4,
                svg_Id: 24,
                classify: '其他',
                classify_en: 'other',  
            }
        ]
    },
    {
        id: 2,
        svg_Id: 1,
        content: ' 图书管理猿的书桌',
        subproject:[{
            id: 1,
            svg_Id: 2,
            classify: '最喜欢',
            classify_en: 'favorite',
            },
            {
            id: 2,
            svg_Id: 3,
            classify: '收藏',
            classify_en: 'collect',
            
            },
        ] 
    },
    {
        id: 3,
        svg_Id: 25,
        content: ' 书呆子们的好朋友',
        subproject:[{
            id: 1,
            svg_Id: 26,
            classify: '阅读APP',
            classify_en: 'reading',
            },
            {
            id: 2,
            svg_Id: 3,
            classify: '图书搜索途径',
            classify_en: 'router',
            
            },
        ] 
    }
]
export const right = [{
    id: 1,
    svg_Id: 17,
    content: ' 故宫法书选',
    subproject:[{
        id: 1,
        svg_Id: 4,
        classify: '赵孟頫',
        classify_en: 'Zhaomengfou',
        },
        {
        id: 2,
        svg_Id: 19,
        classify: '王羲之',
        classify_en: 'Wangxizhi',
        
        },
        {
        id: 3,
        svg_Id: 6,
        classify: '褚遂良',
        classify_en: 'Chusuiliang',
        
        },
        {
            id: 4,
            svg_Id: 7,
            classify: '颜真卿',
            classify_en: 'Yanzhenqing',  
        },
        {
            id: 5,
            svg_Id: 8,
            classify: '虞世南',
            classify_en: 'Yushinan',  
        },
        {
            id: 6,
            svg_Id: 9,
            classify: '文徵明',
            classify_en: 'Wenzhengming',  
        },
    ]
},
{
    id: 2,
    svg_Id: 18,
    content: ' 二玄社',
    subproject:[{
        id: 1,
        svg_Id: 10,
        classify: '原色法帖选',
        classify_en: 'favorite',
        },
        {
        id: 2,
        svg_Id: 11,
        classify: '收藏',
        classify_en: 'collect',
        
        },
    ] 
    },
    {
        id: 3,
        svg_Id: 12,
        content: ' 我喜欢的书帖',
        subproject:[{
            id: 1,
            svg_Id: 13,
            classify: '孙过庭书谱',
            classify_en: 'shupu',
            },
            {
            id: 2,
            svg_Id: 19,
            classify: '王羲之手札',
            classify_en: 'Wangxizhi',
            
            },
            {
            id: 3,
            svg_Id: 15,
            classify: '赵孟頫尺牍',
            classify_en: 'Zhaomengfou',
            },
            {
                id: 4,
                svg_Id: 16,
                classify: '兰亭八柱',
                classify_en: 'Lanting',
            },
            {
                id: 5,
                svg_Id: 6,
                classify: '怀素论书帖',
                classify_en: 'huaisu_lunshu',
             },
        ] 
}
]

export default data;