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
                    const path = __dirname + `/cache/${Date.now()}.${type}`;
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
            body: `⚠ Chưa Nhập Tên Lệnh.\n⏰ Thời gian hoạt động: ${h}:${m}:${s}\n🎬 Tổng số video: ${urls.length}\n\n`,
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
