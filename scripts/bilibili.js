const url = $request.url;
const body = $response.body;

// 开屏广告
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list/.test(url)) {
    let obj = JSON.parse(body);

    if (obj.data && obj.data.list) {
        obj.data.list.forEach(item => {
            item.duration = 0;
            item.begin_time = 9999999999;
            item.end_time = 9999999999;
        });
    }

    $done({ body: JSON.stringify(obj) });
}


// 顶部与底部Tab    
if (/^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab/.test(url)) {
    let obj = JSON.parse(body);

    if (obj.data) {
        obj.data.tab = [
            { id: 40,   name: "推荐", uri: "bilibili://pegasus/promo", tab_id: "推荐tab",    pos: 2, default_selected: 1 },
            { id: 41,   name: "热门", uri: "bilibili://pegasus/hottopic", tab_id: "hottopic",    pos: 3 },
            { id: 2894, name: "番剧", uri: "bilibili://pgc/home", tab_id: "bangumi",      pos: 4 },
            { id: 151,  name: "影视", uri: "bilibili://pgc/cinema-tab", tab_id: "film",     pos: 5 },
            { id: 39,   name: "直播", uri: "bilibili://live/home", tab_id: "直播tab",    pos: 1 }
        ];

        obj.data.top = [
            { id: 481, icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png", name: "消息", uri: "bilibili://link/im_home", tab_id: "消息Top", pos: 1 }
        ];

        if (obj.data.bottom) {
            obj.data.bottom = obj.data.bottom.filter(item =>
                item.id !== 103 && 
                item.id !== 105 && 
                item.id !== 107 && 
                item.id !== 108
            );
        }
    }

    $done({ body: JSON.stringify(obj) });
}


// 首页推荐广告   
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/feed/.test(url)) {
    let obj = JSON.parse(body);

    if (obj.data && obj.data.items) {
        obj.data.items = obj.data.items.filter(item =>
            !item.banner_item && 
            !item.ad_info && 
            !item.ad
        );
    }

    $done({ body: JSON.stringify(obj) });
}


// 番剧与影视
if (/^https?:\/\/api\.bilibili\.com\/pgc\/page\/(cinema|bangumi)/.test(url)) {
    let obj = JSON.parse(body);

    if (obj.result && obj.result.modules) {
        obj.result.modules = obj.result.modules.filter(module =>
            module.module_id !== 1441 && 
            module.module_id !== 248 && 
            module.module_id !== 1455 && 
            module.module_id !== 1633 && 
            module.module_id !== 1639
        );
    }

    $done({ body: JSON.stringify(obj) });
}


// 我的iPad端
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine\/ipad/.test(url)) {
    let obj = JSON.parse(body);

    if (obj.data) {
        if (obj.data['ipad_more_sections']) {
            obj.data['ipad_more_sections'] = obj.data['ipad_more_sections'].filter(section =>
                section.title !== "青少年守护"
            );
        }

        delete obj.data['ipad_recommend_sections'];
        delete obj.data['ipad_upper_sections'];
    }

    $done({ body: JSON.stringify(obj) });
}


// 我的iPhone端
if (/^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine(?!\/ipad)/.test(url)) {
    let obj = JSON.parse(body);

    if (obj.data) {
        obj.data.sections_v2 = obj.data.sections_v2.filter(section =>
            section.title !== '推荐服务' && 
            section.title !== '创作中心' && 
            section.title !== '其他服务'
        );

        obj.data.sections_v2.forEach(section => {
            section.items = section.items.filter(item =>
                item.id !== 171 && 
                item.id !== 172 && 
                item.id !== 173 && 
                item.id !== 174 && 
                item.id !== 429 && 
                item.id !== 430 && 
                item.id !== 431 && 
                item.id !== 432 && 
                item.id !== 950
            );
        });
    }

    $done({ body: JSON.stringify(obj) });
}
