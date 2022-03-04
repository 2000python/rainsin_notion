/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
const Posi_data = [{
    id: 1,
    svg_Id: 1,
    content: '二阶',
    subproject:[{
        id: 1,
        svg_Id: 1,
        classify: '面先法',
        classify_en: 'ortega',
        sketch: '先复原相对的面的颜色，再复原顺序。',
        },
        {
        id: 2,
        svg_Id: 1,
        classify: 'CLL-EG',
        classify_en: 'CLL_EG',
        sketch: '先复原底面，再复原顶层，两步',
        },
        {
            id: 3,
            svg_Id: 1,
            classify: 'LEG-TCLL',
            classify_en: 'LEG_TCLL',
            sketch:'二阶更高级公式',
        },
        {
            id: 4,
            svg_Id: 1,
            classify: 'LS-TEG2',
            classify_en: 'LS_TEG2', 
            sketch:'二阶更高级公式',
        }, {
                id: 5,
                svg_Id: 1,
                classify: '底面公式',
            classify_en: 'FF',
            sketch:'复原底面',
    }
    ]
},
{
    id: 2,
    svg_Id: 1,
    content: '三阶',
    subproject:[{
        id: 1,
        svg_Id: 2,
        classify: 'CFOP',
        classify_en: 'CFOP',
        sketch:'最常用的方法'
        },
        {
            id: 2,
            svg_Id: 3,
            classify: 'NF2L',
            classify_en: 'NF2L',
            sketch:'非标F2L'
        },
        {
            id: 3,
            svg_Id: 3,
            classify: 'F2L转换机',
            classify_en: 'F2L_interpreter',
            sketch: 'F2L打乱'
        },
        {
            id: 4,
            svg_Id: 3,
            classify: '三阶其他高级公式',
            classify_en: 'three_other',
            sketch:'高手的公式集及其他来源的公式'
        },
        
    ] 
},
{
    id: 3,
    svg_Id: 1,
    content: ' 四阶',
    subproject:[{
        id: 1,
        svg_Id: 2,
        classify: 'YauMethod',
        classify_en: 'four_YauMethod',
        sketch:'四阶最常用方法'
        },
        {
        id: 2,
        svg_Id: 3,
        classify: 'O特-P特',
        classify_en: 'POLL_PPLL',
        sketch:'偶数阶的特殊情况'
        },
        {
            id: 3,
        svg_Id: 3,
        classify: '其他零碎的方法',
        classify_en: 'four_other',
        sketch:'步骤中的各步公式'
        }
    ] 
    },
    {
        id: 3,
        svg_Id: 1,
        content: ' 五阶',
        subproject:[{
            id: 1,
            svg_Id: 2,
            classify: 'YauMethod',
            classify_en: 'five_YauMethod',
            sketch:'五阶最常用方法'
            },
            {
                id: 2,
                svg_Id: 2,
                classify: '初级方法',
                classify_en: 'five_beginners_method',
                sketch:'五阶初级方法'
                },
            {
                id: 3,
            svg_Id: 3,
            classify: '其他零碎的方法',
            classify_en: 'five_other',
            sketch:'步骤中的各步公式'
            }
        ] 
    },
    {
        id: 3,
        svg_Id: 1,
        content: ' 高阶',
        subproject:[{
            id: 1,
            svg_Id: 2,
            classify: 'YauMethod',
            classify_en: 'gao_YauMethod',
            sketch:'最常用方法'
            },
        ] 
    },

]
export const Basic_data = [{
    id: 1,
    svg_Id: 1,
    content: '魔方基础知识',
    subproject:[{
        id: 1,
        svg_Id: 2,
        classify: '转动标记',
        classify_en: 'turn_tag',
        },
        {
        id: 2,
        svg_Id: 3,
        classify: '三阶初级',
        classify_en: 'primary',
        },
        {
        id: 3,
        svg_Id: 3,
        classify: '三阶指法和趾法',
        classify_en: 'finger_toe_tricks',
        },
    ] 
}]
export const Twisty_data = [{
id: 1,
svg_Id: 1,
content: ' 斜转',
subproject:[{
    id: 1,
    svg_Id: 1,
    classify: '层先法',
    classify_en: 'skewb_lbl',
    },
    {
    id: 2,
    svg_Id: 1,
    classify: 'FL-L2C',
    classify_en: 'fl_l2c',
    sketch:'底层后二角'
    
    },
    {
    id: 3,
    svg_Id: 1,
    classify: 'L2L',
    classify_en: 'L2L',
    sketch:'一二三叠'
    },
]
},
{
id: 2,
svg_Id: 1,
content: ' 五魔',
subproject:[{
    id: 1,
    svg_Id: 2,
    classify: 'OLL-PLL',
    classify_en: 'OLL_PLL',
    sketch:'五魔顶层公式'
    },
    {
    id: 2,
    svg_Id: 3,
    classify: 'F2L@S2L',
    classify_en: 'F2L_S2L',
    sketch:'五魔很考验f2l的能力，虽然我不行。'
    },
] 
},
{
    id: 3,
    svg_Id: 1,
    content: ' SQ-1',
    subproject:[{
        id: 1,
        svg_Id: 2,
        classify: '入门方法',
        classify_en: 'lars_method',
        },
        {
        id: 2,
        svg_Id: 2,
        classify: 'CS&CSP',
        classify_en: 'CS_CSP',
        
        },
    ] 
},{
    id: 4,
    svg_Id: 1,
    content: '金字塔',
    subproject:[{
        id: 1,
        svg_Id: 2,
        classify: '入门方法',
        classify_en: 'pyraminx_lars_method',
        sketch:'金字塔层先法'
        },
        {
        id: 2,
        svg_Id: 2,
        classify: 'TL4E',
        classify_en: 'TL4E',
        
        },
    ] 
}
]

export default Posi_data;