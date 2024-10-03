const url = $request.url;
const body = $response.body;

// 初始化配置
if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/init/.test(url)) {  
    try {
        let obj = JSON.parse(body);

        if (obj.data && Array.isArray(obj.data)) {
            obj.data.forEach(item => {
                if (item.extraDataArr) {
                    item.extraDataArr["SplashAd.timeout"] = "0";
                    item.extraDataArr["SplashAd.Expires"] = 9999999999;
                }

                if (item.entities && Array.isArray(item.entities)) {
                    item.entities = item.entities.filter(entity =>
                        entity.entityId === 412 || 
                        entity.entityId === 420 || 
                        entity.entityId === 1635 || 
                        entity.entityId === 415 || 
                        entity.entityId === 2261 || 
                        entity.entityId === 2274 || 
                        entity.entityId === 1190 || 
                        entity.entityId === 1175
                    );
                }
            });
        }

        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        $notify("初始化配置错误", error.message);
    }
}


// 首页广告  
if (/^https?:\/\/api\.coolapk\.com\/v6\/main\/indexV8/.test(url)) {  
    try {
        let obj = JSON.parse(body);

        if (obj.data && Array.isArray(obj.data)) {
            obj.data = obj.data.filter(item =>
                item.entityId !== 32557 && 
                item.entityId !== 13635 && 
                item.entityId !== 29349
            );

            obj.data.forEach(item => {
                delete item.extraDataArr;
            });
        }

        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        $notify("首页广告错误", error.message);
    }
}


// 搜索页
if (/^https?:\/\/api\.coolapk\.com\/v6\/search/.test(url)) {  
    try {
        let obj = JSON.parse(body);

        if (obj.data && Array.isArray(obj.data)) {
            obj.data = obj.data.filter(item =>
                item.entityId !== 20252 && 
                item.entityId !== 16977
            );
        }

        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        $notify("搜索页错误", error.message);
    }
}


// 信息流广告 
if (/^https?:\/\/api\.coolapk\.com\/v6\/page/.test(url)) {  
    try {
        let obj = JSON.parse(body);

        if (obj.data && Array.isArray(obj.data)) {
            obj.data = obj.data.filter(item =>
                item.entityId !== 12315 && 
                item.entityId !== 8364 && 
                item.entityId !== 14379 && 
                item.entityId !== 24309 && 
                item.entityId !== 35846 && 
                item.entityId !== 35730 && 
                item.entityId !== 12889 && 
                item.entityId !== 20099
            );

            obj.data.forEach(item => {
                delete item.extraDataArr;
            });
        }

        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        $notify("信息流广告错误", error.message);
    }
}


// 评论区广告   
if (/^https?:\/\/api\.coolapk\.com\/v6\/feed/.test(url)) {  
    try {
        let obj = JSON.parse(body);

        if (obj.data && Array.isArray(obj.data)) {
            obj.data.forEach(item => {
                delete item.extraDataArr;
                delete item.entityTemplate;
            });
        }

        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        $notify("评论区广告错误", error.message);
    }
}


// 我的页面   
if (/^https?:\/\/api\.coolapk\.com\/v6\/account\/loadConfig/.test(url)) {  
    try {
        let obj = JSON.parse(body);

        if (obj.data && Array.isArray(obj.data)) {
            obj.data = obj.data.filter(item =>
                item.entityId !== 1002 && 
                item.entityId !== 1005 && 
                item.entityId !== 14809 && 
                item.entityId !== 1004
            );
        }

        $done({ body: JSON.stringify(obj) });

    } catch (error) {
        $notify("我的页面错误", error.message);
    }
}
