const axios = require('axios'); // Nhớ cài đặt Axios: npm install axios

module.exports.config = {
    name: "fluxus",
    version: "2.0.3",
    hasPermssion: 0,
    credits: "Wioriz aka Hung deeptry (chỉnh sửa bởi NTKhang)",
    description: "Lấy key Fluxus từ liên kết hoặc HWID (sử dụng Axios)",
    commandCategory: "bypass",
    usages: "/fluxus [Liên kết Fluxus (https://flux.li/...) hoặc HWID (HWID=...)]",
    cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        error: "Đã có lỗi xảy ra hoặc không tìm thấy key Fluxus!",
        missingInput: "Vui lòng cung cấp liên kết Fluxus (https://flux.li/...) hoặc HWID (HWID=...) hợp lệ.",
        results: "Key Fluxus: {key}"
    }
};

module.exports.run = async function({ api, event, args, getText }) {
    try {
        const input = args.join(" ");
        if (!input) return api.sendMessage(getText("missingInput"), event.threadID);

        let hwid;

        const isFluxusLink = /^https:\/\/flux\.li\/android\/external\/start\.php\?HWID=/.test(input);
        const isHWID = /^HWID=/.test(input);

        if (isFluxusLink) {
            const url = new URL(input);
            hwid = url.searchParams.get("HWID");
        } else if (isHWID) {
            hwid = input.replace("HWID=", "");
        } else {
            return api.sendMessage(getText("missingInput"), event.threadID);
        }

        if (!hwid || hwid.length < 10) { 
            return api.sendMessage("HWID không hợp lệ!", event.threadID);
        }

        const res = await axios.get(`https://stickx.top/api-fluxus/?hwid=${hwid}&api_key=E99l9NOctud3vmu6bPne`, {
            timeout: 15000 
        });

        const data = res.data; 
        if (!data || !data.key) {
            return api.sendMessage(getText("error"), event.threadID); 
        }

        api.sendMessage(getText("results", { key: data.key }), event.threadID);
    } catch (e) {
        console.error("Lỗi khi lấy key Fluxus:", e.response ? e.response.data : e.message);
        api.sendMessage(getText("error"), event.threadID);
    }
};
