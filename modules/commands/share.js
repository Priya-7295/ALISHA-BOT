module.exports.config = {
    name: "share",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "TDong", //mod lai by tpk
    description: "Share mdl",
    commandCategory: "Hệ thống admin-bot",
    usages: "[ tên mdl ] [ reply / tag ]",
    cooldowns: 0
};
 
module.exports.run = async function ({ api, event, args, permssion }) {
    if (permssion != 3) return api.sendMessage( `[DONATE] ➜ Momo/Mbbank: 0396049649. Xin cám ơn ạ!! ❤️`, event.threadID, event.messageID)
    const fs = require('fs');
    const { senderID, threadID, messageID, messageReply, type , mentions} = event;
  const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  var tpk = [
    /*"https://i.imgur.com/3fTKNCQ.jpeg",
"https://i.imgur.com/KGlc34m.jpeg",
"https://i.imgur.com/low34xs.jpeg",
"https://i.imgur.com/T9Xp6uL.jpeg",
"https://i.imgur.com/kszKMZl.jpeg",
"https://i.imgur.com/hQZaqsa.jpeg",
"https://i.imgur.com/OKUJvyG.jpeg",
"https://i.imgur.com/7Rjpbfc.jpeg",
"https://i.imgur.com/tAPgAIk.jpeg",
"https://i.imgur.com/UVx2q4F.jpeg",
"https://i.imgur.com/HIFV5ys.jpeg",
"https://i.imgur.com/5MJKa3A.jpeg",
"https://i.imgur.com/1ySk8ma.jpeg",
"https://i.imgur.com/mZrluP5.jpeg",
"https://i.imgur.com/o1sakSg.jpeg",
"https://i.imgur.com/Mauaqgy.jpeg",
"https://i.imgur.com/Sof9ya4.jpeg",
"https://i.imgur.com/8G8R4A2.jpeg",*/
    "https://i.imgur.com/55Fxxx3.jpeg",
  ];
    if (event.senderID != 100033478361032) return api.sendMessage(`[Wioriz]→ Cook ❤️`, event.threadID, event.messageID)
    if (!args[0]) return api.sendMessage('[⚜️]➜ Vui lòng nhập tên mdl cần share', threadID, messageID);
    if(!fs.existsSync(`${__dirname}/${args[0]}.js`)) return api.sendMessage(`[⚜️]➜ Không có lệnh nào tên là ${args[0]} cả`, threadID, messageID);
    let ids = Object.keys(mentions);
    if (type == 'message_reply') ids.push(messageReply.senderID);
    if (ids.length == 0) return api.sendMessage('[⚜️]➜ Vui lòng reply hoặc tag người bạn muốn gửi link', threadID, messageID);
    const code = fs.readFileSync(`${__dirname}/${args[0]}.js`).toString();
  let image = [];
 for(let i = 0; i < 1; i++) {
   const a = tpk[Math.floor(Math.random()*tpk.length)];
    const stream = (await axios.get(a, {
        responseType: "stream"
    })).data;
    image.push(stream);
};
  const msg = {
    body: `📝==「 𝗦𝗛𝗔𝗥𝗘 𝗥𝗜𝗘̂𝗡𝗚 𝗠𝗗𝗟 」==📝
━━━━━━━━━━━━━━━━━━━━━
[⏰]➜ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${tpkk} 
[💼]➜ 𝗧𝗲̂𝗻 𝗹𝗲̣̂𝗻𝗵: ${args[0]}
━━━━━━━━━━━━━━━━━━━━━
[👉]➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 đ𝘂̛𝗼̛̣𝗰 𝗮𝗱𝗺𝗶𝗻 𝘀𝗵𝗮𝗿𝗲 𝗿𝗶𝗲̂𝗻𝗴 𝗺𝗼̣̂𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 
[💓]➜ 𝗖𝗵𝗲𝗰𝗸 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗯𝗼𝘁 𝗼̛̉ 𝘀𝗽𝗮𝗺 đ𝗲̂̉ 𝗹𝗮̂́𝘆 𝗺𝗱𝗹`,
    attachment: image
};
    const { PasteClient } = require('pastebin-api')
    const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
    const url = await client.createPaste({
        code: code,
        expireDate: 'N',
        format: "javascript",
        name: args[0],
        publicity: 1
    });
    for (const id of ids) {
    	api.sendMessage(`📝==「 𝗦𝗛𝗔𝗥𝗘 𝗥𝗜𝗘̂𝗡𝗚 𝗠𝗗𝗟 」==📝
━━━━━━━━━━━━━━━━━━━━━
[⏰]➜ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${tpkk}
[💓]➜ 𝗟𝗶𝗻𝗸 𝗠𝗱𝗹: ${url}
[🔰]➜ 𝗧𝗲̂𝗻 𝗹𝗲̣̂𝗻𝗵: ${args[0]}
━━━━━━━━━━━━━━━━━━━━━
[👉]➜ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 đ𝘂̛𝗼̛̣𝗰 𝗮𝗱𝗺𝗶𝗻 𝘀𝗵𝗮𝗿𝗲 𝗿𝗶𝗲̂𝗻𝗴 𝗺𝗼̣̂𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱`, id);
    };
api.sendMessage(msg, threadID, messageID);
    };