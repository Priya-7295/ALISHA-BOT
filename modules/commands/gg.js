const axios = require('axios');
module.exports.config = {
  name: "gg",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Niio-team rmk lại bản gốc của Nguyễn Thanh Mài",
  description: "",
  commandCategory: "Tìm kiếm",
  usages: "[từ khoá]",
  cooldowns: 0
};
let stream_url = url=>require('axios').get(url, {
    responseType: 'stream',
}).catch(e=>null);
module.exports.run = async function({ api:p, event:e, args:s }) {
  const a = e.type === 'message_reply' ? s.join(' ') + ' "' + e.messageReply.body + '"': s.join(' ');
  if (!a) {
    return p.sendMessage("❎ Vui lòng nhập câu hỏi", e.threadID, e.messageID);
  }
    p.sendMessage(`🔄 Đang xử lý dữ liệu...`, e.threadID, e.messageID);
try {
    const response = await axios.get(`https://bard.niio-zic.repl.co/bard?ask=${encodeURIComponent(a)}`);
    let body = response.data.result;
    let attachment;
    let urls = body.match(/https:\/\/[^)]+/g)||[];

    if (urls.length > 0)await Promise.all(urls.map(stream_url)).then(ress=>attachment=ress.filter($=>$!=null&&/^image\//.test($.headers['content-type'])).map($=>(body = body.replace($.config.url, ''), $.data.path='tmp.jpg',$.data)));

    return p.sendMessage({
        body,
        attachment,
        }, e.threadID);
  } catch (error) {
    p.sendMessage("❎ lỗi rồi", e.threadID);
  }
};
module.exports.handleEvent = async function ({ api, event, client, __GLOBAL }) {
  const a = event.type === 'message_reply' ? event.body + ' "' + event.messageReply.body + '"' : event.body
  let haha = (event.body !== undefined ? event.body : '').toLowerCase();
  if (event.senderID == api.getCurrentUserID())return;
  if (haha.charAt(haha.length - 1) == '*') {
  api.sendMessage(`🔄 Đang xử lý dữ liệu...`, event.threadID, event.messageID);
  const response = await axios.get(`https://bard.niio-zic.repl.co/bard?ask=${encodeURIComponent(a)}`);
    let body = response.data.result;
    let attachment;
    let urls = body.match(/https:\/\/[^)]+/g)||[];

    if (urls.length > 0)await Promise.all(urls.map(stream_url)).then(ress=>attachment=ress.filter($=>$!=null&&/^image\//.test($.headers['content-type'])).map($=>(body = body.replace($.config.url, ''), $.data.path='tmp.jpg',$.data)));
  api.sendMessage({
      body,
      attachment,
  }, event.threadID, event.messageID);}
}