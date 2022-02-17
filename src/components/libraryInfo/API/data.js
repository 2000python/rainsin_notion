/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
const data = [{
        id: 1,
        svg_Id: 1,
        content: ' 图书管理猿的书架',
        subproject:[{
            id: 1,
            svg_Id: 1,
            classify: '计算机',
            classify_en: 'computer',
            },
            {
            id: 2,
            svg_Id: 1,
            classify: '文学',
            classify_en: 'letter',
            
            },
            {
            id: 3,
            svg_Id: 1,
            classify: '数理化',
            classify_en: 'math-phys-chem',
            
            },
            {
                id: 4,
                svg_Id: 1,
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
        svg_Id: 1,
        content: ' 书呆子的好朋友',
        subproject:[{
            id: 1,
            svg_Id: 2,
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
    svg_Id: 1,
    content: ' 故宫法书选',
    subproject:[{
        id: 1,
        svg_Id: 1,
        classify: '赵孟頫',
        classify_en: 'Zhao mengfou',
        },
        {
        id: 2,
        svg_Id: 1,
        classify: '王羲之',
        classify_en: 'Wang xizhi',
        
        },
        {
        id: 3,
        svg_Id: 1,
        classify: '褚遂良',
        classify_en: 'Chu suiliang',
        
        },
        {
            id: 4,
            svg_Id: 1,
            classify: '颜真卿',
            classify_en: 'Yan zhenqing',  
        },
        {
            id: 5,
            svg_Id: 1,
            classify: '虞世南',
            classify_en: 'Yu shinan',  
        },
        {
            id: 5,
            svg_Id: 1,
            classify: '文徵明',
            classify_en: 'Wen zhengming',  
        },
    ]
},
{
    id: 2,
    svg_Id: 1,
    content: ' 二玄社',
    subproject:[{
        id: 1,
        svg_Id: 2,
        classify: '原色法帖选',
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
        svg_Id: 1,
        content: ' 我喜欢的书帖',
        subproject:[{
            id: 1,
            svg_Id: 2,
            classify: '孙过庭书谱',
            classify_en: 'shupu',
            },
            {
            id: 2,
            svg_Id: 2,
            classify: '王羲之手札',
            classify_en: 'Wang xizhi',
            
            },
            {
            id: 3,
            svg_Id: 2,
            classify: '赵孟頫尺牍',
            classify_en: 'Zhao mengfou',
            },
            {
                id: 4,
                svg_Id: 2,
                classify: '兰亭八柱',
                classify_en: 'Lan ting',
            },
            {
                id: 5,
                svg_Id: 2,
                classify: '怀素论书帖',
                classify_en: 'Lan ting',
             },
        ] 
}
]

export default data;