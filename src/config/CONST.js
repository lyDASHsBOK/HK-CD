/**
 * Created by Envee.
 *
 * Date: 14-10-20
 * Time: 下午6:16
 * @author: <a href="526597516@qq.com">luyc</a>
 * @version: 0.1
 */

var CONST = {
    APP: {
        TITLE: 'HK - CD'
    },
    SELECT_SCREEN: {
        PLAYER_MOVE_TIME: 1200
    },
    WINDOW: {
        WIDTH: 750,
        HEIGHT: 1334
    },
    PLAYER: {
        FRAME_WIDTH: 148,
        FRAME_HEIGHT: 256,
        BOUNCE_ANIM_DURATION: 200,
        BOUNCE_HEIGHT: 2
    },
    PLACE: {
        CD: [
            '蓝顶美术馆',
            '红星路35号',
            '西村创意园',
            '成都IBOX',
            '?'
        ],
        HK: [
            '动漫基地',
            '幻彩咏香江',
            '漫画星光大道',
            'PMQ元创方',
            '?'
        ],
        DESC_CD: [
            '成都蓝顶美术馆坐落于成都市锦江区、天府新区、龙泉三区交界处的蓝顶当代艺术园区。它依托蓝顶艺术家群落而诞生，作为一家民营非营利性机构，自2009年成立以来一直致力于推动中国当代艺术的展示、推广、交流。',
            '根据国家“开发中国西部，大力发展文化创意产业”的指导思想，在各级政府的高度红星路35号：重视和大力支持下，由文创投资发展有限公司斥资，对位于成都市红星路一段35号的原军区7234印刷厂厂房进行改造，以空间折点为理念，打造出中国西部首个文化创意产业园“红星路35号”。',
            '“创意盒子”——西村五号的创新办公空间，主要满足从事文化、艺术、设计等类别的微、小型公司、机构以及个人入驻办公与展示。“创意办公=创意生活”的设计理念，个性与时尚、开放通透的空间设计，摆脱传统封闭式的办公空间。',
            '“成都IBOX”是以伦敦最具人气及艺术氛围的创意地标BOX-PARK为原型，整合英国、丹麦、日本、中国台湾等全球各地创意文化机构、艺术画廊、独立设计师、时尚潮流达人等创意资源，打造的一座个性十足、色彩缤纷的集装箱造型的创新建筑群，致力于为成都缔造一个集建筑设计、平面设计、文创设计、工业设计、时装设计为一体的全球创意文化交流平台。届时将邀请海内外逾百位创意商家，涉及艺术创作、市集体验、时尚互动、美食交流等领域。'
        ],
        DESC_HK: [
            '动漫基地”为香港市区重建局(市建局)位于湾仔茂萝街的首个纯活化保育项目，由十幢被评为二级历史建筑的战前楼宇，经市建局复修后成为全港首个以动漫为主题的艺术文化地标，并于二零一三年七月开幕后由香港艺术中心负责其后五年的謍运和管理。香港艺术中心锐意将这里打造成为”动漫基地”，旨在推动香港本地和国际动漫画及其延伸媒介的长远发展，不但为海内外的创作人、业界人士、学者和公众提供展示作品、交流、合作和研究的综合创意平台，同时着重发掘和培养动漫人才，进一步推动香港本土动漫行业的发展。',
            '幻彩咏香江（ A Symphony of Lights）是香港著名的镭射灯光音乐汇演，由香港维多利亚港两岸合共44座大厦摩天大楼及地标合作举行，透过互动灯光及音乐效果，展示维港充满动感和多姿多彩的一面。',
            '香港漫画星光大道位于九龙公园近栢丽购物大道入口，全场展出24座本地原创漫画角色彩绘雕塑和10位本地漫画家的铜制手印，并设有“漫画历史及发展廊”及“漫画教育廊”，展示香港漫画发展史、漫画制作过程、工具、漫画家工作室情景及漫画原稿等。',
            'PMQ元创方是香港的一个创意中心，亦是一处历史建筑，于2010年11月10日列为香港三级历史建筑。前身是荷李活道已婚警察宿舍，位于香港岛上环的荷李活道，有5个门口，正门在其东面的鸭巴甸街35号。'
        ]
    },
    BG: {
        Y: 845,
        EARTH_COLOR: 'rgba(83,121,79,1)',
        EARTH_RADIUS: 584,
        INNER_EARTH_COLOR: 'rgba(34,66,84,1)',
        INNER_EARTH_RADIUS: 470,
        FRONT_SPIN_SPEED: 0.8,
        BACK_SPIN_SPEED: 0.2,
        STEP_LENGTH: 70
    },

    DESC: [
        {
            title: '“创·见”蓉港青年创意设计作品展',
            content: '由成都市政府外侨办(港澳办)、香港驻成都经贸办、香港贸发局联合主办，于3月27日-31日在成都太古里街区广东会馆免费向公众开放。以室内展览的形式，展示实物、设计图片、三维视觉体验等创意设计作品100余件，展现蓉港两地青年的活力与创意。参展优秀作品设计者将有机会参加由官方安排的成都—香港青年设计作品互访巡展交流活动。同时，此次创意设计作品展也是2015年蓉港创意设计交流季的启幕活动。'
        },
        {
            title: '“品味成都”蓉港青年学生创意设计作品大赛',
            content: '活动由成都市政府外侨办(港澳办)、香港驻成都经贸办、成都市教育局联合主办，采取面向成都、香港青年学生有奖征集方式，在3月-5月期间策划组织“品味成都”城市礼品创意设计作品大赛，鼓励香港和成都青年学生增强创新能力，通过活动了解成都、热爱成都。评选结果将于5月中下旬揭晓。获奖作品将纳入成都市的外侨礼宾宣传用品参考范围，获奖设计师将获得一定奖金，并由官方安排参加蓉港两地的互访交流巡展活动。'
        },
        {
            title: '香港设计廊成都店',
            content: '香港设计廊由香港贸易发展局主办,香港特别行政区政府工业贸易署[发展品牌、升级转型及拓展内销市场的专项基金（机构支援计划）]拨款资助。1991年首次开店设立，目的是向世界各地的消费者及买家推广香港优质创意品牌和设计精品。<br>香港设计廊成都店已于2014年11月试营业，于3月27日正式启幕，将是西部地区最大的设计廊自营旗舰店，占地约180平方米，而开业初期 “首秀”的香港品牌将达到40个。'
        }
    ],

    QUESTION: [
        {
            title:'设计廊',
            question:'1.香港设计廊成都店将在_____正式开店。',
            answer: ['a. 2014年11月', 'b. 2015年3月', 'c. 2015年5月'],
            correct: [1]
        },
        {
            title:'设计廊',
            question:'2.香港设计廊成都店是_____（区域）旗舰店。',
            answer: ['a. 四川省', 'b. 内地西南地区', 'c. 内地西部地区'],
            correct: [2]
        },
        {
            title:'设计廊',
            question:'3.香港设计廊成都店主要推广_______设计产品。',
            answer: ['a. 成都和香港地区', 'b. 香港地区', 'c. 成都地区'],
            correct: [1]
        },
        {
            title:'作品展',
            question:'1.“创·见”蓉港青年创意设计作品展在______举行。',
            answer: ['a. 成都太古里广东会馆', 'b. 香港动漫基地', 'c. 成都红星35号'],
            correct: [0]
        },
        {
            title:'作品展',
            question:'2. “创·见”蓉港青年创意设计作品展将举行________（时间）。',
            answer: ['a. 一星期', 'b. 五天', 'c. 一个月'],
            correct: [1]
        },
        {
            title:'作品展',
            question:'3. “创·见”蓉港青年创意设计作品展主要展出_________。',
            answer: ['a. 香港创意设计作品', 'b. 成都创意设计作品', 'c. 蓉港青年创意设计'],
            correct: [2]
        },
        {
            title:'创意设计大赛',
            question:'1.______________可以报名参加创意设计大赛。',
            answer: ['a. 职业创意设计师', 'b. 专业大学生', 'c. 蓉港两地青年学生'],
            correct: [2]
        },
        {
            title:'创意设计大赛',
            question:'2. “品味成都”蓉港青年学生创意设计作品大赛获奖作品将_________。',
            answer: ['a. 作为商品出售', 'b. 将作为成都市的外侨礼宾宣传用品', 'c. 被拍卖'],
            correct: [1]
        },
        {
            title:'创意设计大赛',
            question:'3.大赛征集时间为________。',
            answer: ['a. 2015年3-5月', 'b. 2015年4-6月', 'c. 2015年4-7月'],
            correct: [0]
        },
        {
            title:'创意设计大赛',
            question:'4.大赛报名信息可联系_______获取。',
            answer: ['a. 成都市政府外侨办（港澳办）', 'b. 香港驻成都经贸办', 'c. 成都市教育局'],
            correct: [0, 1, 2]
        }
    ],
    ABOUT: {
        title: '关于本应用',
        content: '<div class="new-line">美术<a class="sosa-icon">a</a>：张绿绮</div>' +
        '<div><a class="sosa-icon tab">É</a>：27112487@qq.com</div>' +
        '<div class="new-line">制作<a class="sosa-icon">></a>：刘忻沂</div>' +
        '<div><a class="sosa-icon tab">É</a>：L@BOKTEAM.COM</div>'
    }


};
