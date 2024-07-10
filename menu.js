const axios = require("axios");
const fs = require("fs");
const urls = require('./../../includes/data/vdgai.json');

class Command {
    constructor(config) {
        this.config = config;
        this.queues = [];
    }

    async onLoad(o) {
        const totalVideos = urls.length;
        console.log(`Loaded ${totalVideos} videos from vdgai.json`);

        let status = false;
        if (!global.client.xx) {
            global.client.xx = setInterval(async _ => {
                if (status || this.queues.length > 5) return;
                status = true;

                const uploads = await Promise.all(
                    [...Array(5)].map(e => upload(urls[Math.floor(Math.random() * urls.length)]))
                );

                this.queues.push(...uploads);
                status = false;
            }, 5000); // Every 5 seconds
        }

        async function streamURL(url, type) {
            return axios.get(url, { responseType: 'arraybuffer' })
                .then(res => {
                    const path = __dirname + `/cache/<span class="math-inline">\{Date\.now\(\)\}\.</span>{type}`;
                    fs.writeFileSync(path, res.data);
                    setTimeout(p => fs.unlinkSync(p), 60000, path); // Delete after 1 minute
                    return fs.createReadStream(path);
                });
        }

        async function upload(url) {
            return o.api.postFormData('https://upload.facebook.com/ajax/mercury/upload.php', {
                upload_1024: await streamURL(url, 'mp4')
            }).then(res => {
                const response = JSON.parse(res.body.replace('for (;;);', ''));
                return Object.entries(response.payload?.metadata?.[0] || {})[0];
            });
        };
    }

    async run(o) {
        let send = msg => new Promise(r => o.api.sendMessage(msg, o.event.threadID, (err, res) => r(res || err), o.event.messageID));
        let t = process.uptime(), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = Math.floor(t % 60);
        send({
            body: `⚠ Chưa Nhập Tên Lệnh.\n⏰ Thời gian hoạt động: <span class="math-inline">\{h\}\:</span>{m}:${s}\n🎬 Tổng số video: ${urls.length}\n\n`,
            attachment: this.queues.splice(0, 1)
        });
    }
}

module.exports = new Command({
    name: "",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: "",
    commandCategory: "Tiện ích",
    usages: "[]",
    cooldowns: 0,
});

module.exports.config = {
    name: "menu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "",
    description: "Hướng dẫn cho người mới",
    usages: "[all/-a] [số trang]",
    commandCategory: "Tiện ích",
    cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    let num = parseInt(event.body.split(" ")[0].trim());
    (handleReply.bonus) ? num -= handleReply.bonus : num;
    let msg = "";
    let data = handleReply.content;
    let check = false;
    if (isNaN(num)) msg = "Hãy nhập 1 con số mà bạn muốn";
    else if (num > data.length || num <= 0) msg = "Số bạn chọn không nằm trong danh sách, vui lòng thử lại";
    else {
        const { commands } = global.client;
        let dataAfter = data[num -= 1];
        if (handleReply.type == "cmd_info") {
            let command_config = commands.get(dataAfter).config;
            msg += ` 『  ${command_config.commandCategory.toUpperCase()}   』   \n`;
            msg += `\nTên lệnh: ${dataAfter}`;
            msg += `\nMô tả: ${command_config.description}`;
            msg += `\nCách sử dụng: ${(command_config.usages) ? command_config.usages : ""}`;
            msg += `\nThời gian chờ: ${command_config.cooldowns || 5}s`;
            msg += `\nQuyền hạn: ${(command_config.hasPermssion == 0) ? "Người dùng" : (command_config.hasPermssion == 1) ? "Quản trị viên nhóm" : "Quản trị viên bot"}`;
            msg += `\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`;
            msg += `\n\n» Module code by ${command_config.credits} «\n`;
        } else {
            check = true;
            let count = 0;
            msg += `» ${dataAfter.group.toUpperCase()} «\n`;

            dataAfter.cmds.forEach(item => {
                msg += `\n ${count += 1}. » ${item}: ${commands.get(item).config.description}`;
            });
            msg += "\n\n╭──────╮\n    Reply \n╰──────╯ tin nhắn theo số để xem thông tin chi tiết lệnh và cách sử dụng lệnh\n";
        }
    }

    const videoCacheDir = __dirname + "/cache/";
    const videosInCache = fs.readdirSync(videoCacheDir).filter(file => file.endsWith('.mp4'));

    let attachment = [];
    if (videosInCache.length > 0) {
        const randomVideoIndex = Math.floor(Math.random() * videosInCache.length);
        const randomVideoPath = videoCacheDir + videosInCache[randomVideoIndex];
        attachment.push(fs.createReadStream(randomVideoPath));
    }

    var msgg = { body: msg, attachment };
    api.unsendMessage(handleReply.messageID);
    return api.sendMessage(msgg, event.threadID, (error, info) => {
        if (error) console.log(error);
        if (check) {
            global.client.handleReply.push({
                type: "cmd_info",
                name: this.config.name,
                messageID: info.messageID,
                content: data[num].cmds
            });
        }
    }, event.messageID);
};

module.exports.run = async function ({ api, event, args }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    const videoCacheDir = __dirname + "/cache/";
    const videosInCache = fs.readdirSync(videoCacheDir).filter(file => file.endsWith('.mp4'));

    let attachment = [];
    if (videosInCache.length > 0) {
        const randomVideoIndex = Math.floor(Math.random() * videosInCache.length);
        const randomVideoPath = videoCacheDir + videosInCache[randomVideoIndex];
        attachment.push(fs.createReadStream(randomVideoPath));
    }

    const command = commands.values();
    var group = [], msg = "» Danh sách lệnh hiện có «\n";
    let check = true, page_num_input = "";
    let bonus = 0;

    for (const commandConfig of command) {
        if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
        else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }

    if (args[0] && ["all", "-a    ].includes(args[0].trim())) {
        let all_commands = [];
        group.forEach(commandGroup => {
            commandGroup.cmds.forEach(item => all_commands.push(item));
        });
        let page_num_total = Math.ceil(all_commands.length / 2222222222);
        if (args[1]) {
            check = false;
            page_num_input = parseInt(args[1]);
            if (isNaN(page_num_input)) msg = "Vui lòng chọn số";
            else if (page_num_input > page_num_total || page_num_input <= 0) msg = "Số bạn chọn không nằm trong danh sách, vui lòng thử lại";
            else check = true;
        }
        if (check) {
            index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
            bonus = index_start;
            index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
            all_commands = all_commands.slice(index_start, index_end);
            all_commands.forEach(e => {
                msg += `\n${index_start += 1}. » ${e}: ${commands.get(e).config.description}`;
            });
            msg += `\n\nTrang ${page_num_input || 1}/${page_num_total}`;
            msg += `\nĐể xem các trang khác, dùng: ${prefix}menu [all/-a] [số trang]`;
            msg += `\nBạn có thể dùng ${prefix}help all để xem tất cả lệnh`;
            msg += "\n╭──────╮\n     Reply \n╰──────╯tin nhắn theo số để xem thông tin chi tiết lệnh và cách sử dụng lệnh\n";
        }
        var msgg = { body: msg, attachment };
        return api.sendMessage(msgg, threadID, (error, info) => {
            if (check) {
                global.client.handleReply.push({
                    type: "cmd_info",
                    bonus: bonus,
                    name: this.config.name,
                    messageID: info.messageID,
                    content: all_commands
                });
            }
        }, messageID);
    }

    let page_num_total = Math.ceil(group.length / 2222222222);
    if (args[0]) {
        check = false;
        page_num_input = parseInt(args[0]);
        if (isNaN(page_num_input)) msg = "Vui lòng chọn số";
        else if (page_num_input > page_num_total || page_num_input <= 0) msg = "Số bạn chọn không nằm trong danh sách, vui lòng thử lại";
        else check = true;
    }
    if (check) {
        index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
        bonus = index_start;
        index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
        group = group.slice(index_start, index_end);
        group.forEach(commandGroup => msg += `\n${index_start += 1}. » ${commandGroup.group.toUpperCase()} `);
        msg += `\n\nTrang【${page_num_input || 1}/${page_num_total}】`;
        msg += `\nĐể xem các trang khác, dùng: ${prefix}menu [số trang]`;
        msg += `\nBạn có thể dùng ${prefix}menu all để xem tất cả lệnh`;
        msg += `\n╭──────╮\n       Reply \n╰──────╯ tin nhắn theo số để xem các lệnh theo phân loại\n`;
    }
    var msgg = { body: msg, attachment };
    return api.sendMessage(msgg, threadID, async (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            bonus: bonus,
            messageID: info.messageID,
            content: group
        });
    });
}

