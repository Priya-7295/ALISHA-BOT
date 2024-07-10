module.exports.config = {
	name: "duyet",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "DungUwU mod by Nam",
	description: "duyệt box dùng bot xD",
	commandCategory: "Admin bot",
    cooldowns: 5
};


const dataPath = __dirname + "/cache/approvedThreads.json";
const dataPending = __dirname + "/cache/pendingdThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
  const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
  if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "biaadmin.mp4")) request("https://i.imgur.com/xeHu6Pn.mp4").pipe(fs.createWriteStream(dirMaterial + "biaadmin.mp4"));
  if (!fs.existsSync(dirMaterial + "delbox.mp4")) request("https://i.imgur.com/caSu0A3.mp4").pipe(fs.createWriteStream(dirMaterial + "delbox.mp4"));
	if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Users, args }) {
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type } = handleReply;
    let data = JSON.parse(fs.readFileSync(dataPath));
    let dataP = JSON.parse(fs.readFileSync(dataPending));
    let idBox = (args[0]) ? args[0] : threadID;
  switch (type) {
        case "pending": {
          switch (body) {
                case `A`: {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`===[ 𝐃𝐔𝐘𝐄̣̂𝐓 𝐁𝐎𝐗 ]===\n→ 𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐛𝐨𝐱:\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    	}, messageID)
        }
        }
      }
    }
  }
module.exports.run = async function ({ event, api, args, Threads, Users, handleReply  }) {
	const { threadID, messageID, senderID } = event;
	let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let msg = "";
  var lydo = args.splice(2).join(" ");
  let idBox = (args[0]) ? args[0] : threadID;
        if (args[0] == "list" || args[0] == "l") {
    	msg = `=====「 𝐃𝐀𝐍𝐇 𝐒𝐀́𝐂𝐇 𝐂𝐀́𝐂 𝐁𝐎𝐗 Đ𝐀̃ 𝐃𝐔𝐘𝐄̣̂𝐓: ${data.length} 」 ====`;
    	let count = 0;
    	for (e of data) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
    		msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
    	}
    	api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "a",
        })
    }, messageID);
        }
     else if (args[0] == "pending" || args[0] == "p") {
    	msg = `=====「 𝐃𝐀𝐍𝐇 𝐒𝐀́𝐂𝐇 𝐂𝐀́𝐂 𝐁𝐎𝐗 𝐂𝐇𝐔̛𝐀 𝐃𝐔𝐘𝐄̣̂𝐓: ${dataP.length} 」 ====`;
    	let count = 0;
    	for (e of dataP) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
    		msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
    	}
    	api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "pending",
        })
    }, messageID);
     }
       else if (args[0] == "help" || args[0] == "h") {
         const tst = (await Threads.getData(String(event.threadID))).data || {};
  const pb = (tst.hasOwnProperty("PREFIX")) ? tst.PREFIX : global.config.PREFIX;
  const nmdl = this.config.name
  const cre = this.config.credits
        return api.sendMessage(`=====「 DUYỆT 」=====\n\n${pb}${nmdl} l/list => xem danh sách box được duyệt\n\n${pb}${nmdl} p/pending => xem danh sách box chưa duyệt\n\n${pb}${nmdl} d/del => kèm theo ID để xóa khỏi danh sách được dùng bot\n\n${pb}${nmdl} => kèm theo ID để duyệt box đó\n\n⇒ ${cre} ⇐`, threadID, messageID);
       }
      
    else if (args[0] == "del" || args[0] == "d") {
    	idBox = (args[1]) ? args[1] : event.threadID;
      if (isNaN(parseInt(idBox))) return api.sendMessage("===[ 𝐃𝐔𝐘𝐄̣̂𝐓 𝐁𝐎𝐗 ]===\n→ 𝐊𝐡𝐨̂𝐧𝐠 𝐩𝐡𝐚̉𝐢 𝐦𝐨̣̂𝐭 𝐜𝐨𝐧 𝐬𝐨̂́", threadID, messageID);
    	if (!data.includes(idBox)) return api.sendMessage("===[ 𝐃𝐔𝐘𝐄̣̂𝐓 𝐁𝐎𝐗 ]===\n→ 𝐁𝐨𝐱 𝐤𝐡𝐨̂𝐧𝐠 đ𝐮̛𝐨̛̣𝐜 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐮̛̀ 𝐭𝐫𝐮̛𝐨̛́𝐜!", threadID, messageID);
      api.sendMessage({body: `𝐁𝐨𝐱 đ𝐚̃ 𝐛𝐢̣ 𝐠𝐨̛̃ 𝐤𝐡𝐨̉𝐢 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 đ𝐮̛𝐨̛̣𝐜 𝐩𝐡𝐞́𝐩 𝐝𝐮̀𝐧𝐠 𝐛𝐨𝐭\n𝐓𝐈𝐃 𝐁𝐎𝐗: ${idBox}\n𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐛𝐨𝐱\n◆━━━━━━━━━━━━━◆\n𝑷𝒓𝒆𝒇𝒊𝒙 [ ${global.config.PREFIX} ]\n📝 𝐧𝐡𝐚̣̂𝐩 '${global.config.PREFIX}admin list' 𝐬𝐞̃ 𝐡𝐢𝐞̣̂𝐧 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐮̉𝐚 𝐀𝐃𝐌𝐈𝐍 \n📲𝑴𝒐̣𝒊 𝒕𝒉𝒂̆́𝒄 𝒎𝒂̆́𝒄 𝒍𝒊𝒆̂𝒏 𝒉𝒆̣̂ 𝒂𝒅𝒎𝒊𝒏\n→ [🌐] 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: https://www.facebook.com/100008709979267\n→ [🎀] 𝐙𝐚𝐥𝐨: 𝟎𝟕𝟕𝟗𝟓𝟒𝟏𝟑𝟒𝟑\n◆━━━━━━━━━━━━━◆\n𝐓𝐡𝐢𝐬 𝐛𝐨𝐭 𝐦𝐚𝐝𝐞 𝐛𝐲 ${global.config.BOTNAME}. 𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐟𝐨𝐫 𝐮𝐬𝐢𝐧𝐠\n© 𝙰𝚍𝚖𝚒𝚗: 𝐁𝐎𝐓-𝐍𝐓𝐓-𝐕𝐍`,attachment: fs.createReadStream(__dirname + "/cache/delbox.mp4")}, idBox);
    	api.sendMessage(`Box đã bị gỡ khỏi danh sách được phép dùng bot`, threadID, () => {
    		data.splice(data.indexOf(idBox), 1);
    		fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    	}, messageID)
    }
    else if (isNaN(parseInt(idBox))) api.sendMessage("===[ 𝐃𝐔𝐘𝐄̣̂𝐓 𝐁𝐎𝐗 ]===\n→ 𝐈𝐃 𝐛𝐚̣𝐧 𝐧𝐡𝐚̣̂𝐩 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂", threadID, messageID);
    else if (data.includes(idBox)) api.sendMessage(`===[ 𝐃𝐔𝐘𝐄̣̂𝐓 𝐁𝐎𝐗 ]===\n→ 𝐈𝐃 ${idBox} đ𝐚̃ đ𝐮̛𝐨̛̣𝐜 𝐩𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐮̛̀ 𝐭𝐫𝐮̛𝐨̛́𝐜!`, threadID, messageID);
   	else api.sendMessage("===[ 𝐃𝐔𝐘𝐄̣̂𝐓 𝐁𝐎𝐗 ]===\n→ 𝐁𝐎𝐗 Đ𝐀̃ Đ𝐔̛𝐎̛̣𝐂 𝐀𝐃𝐌𝐈𝐍 𝐁𝐎𝐓 𝐏𝐇𝐄̂ 𝐃𝐔𝐘𝐄̣̂𝐓!\n» 𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐛𝐨𝐭 𝐯𝐮𝐢 𝐯𝐞̉", idBox, (error, info) => {
   		api.changeNickname(` [》 ${global.config.PREFIX} 《]➺ ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, idBox, global.data.botID);
      api.sendMessage({body: `\n𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐛𝐨𝐱\n𝐓𝐈𝐃: ${idBox}\n𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐛𝐨𝐱\n◆━━━━━━━━━━━━━◆\n𝑷𝒓𝒆𝒇𝒊𝒙 [ ${global.config.PREFIX} ]\n📝 𝐧𝐡𝐚̣̂𝐩 '${global.config.PREFIX}admin list' 𝐬𝐞̃ 𝐡𝐢𝐞̣̂𝐧 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐮̉𝐚 𝐀𝐃𝐌𝐈𝐍 \n📲𝑴𝒐̣𝒊 𝒕𝒉𝒂̆́𝒄 𝒎𝒂̆́𝒄 𝒍𝒊𝒆̂𝒏 𝒉𝒆̣̂ 𝒂𝒅𝒎𝒊𝒏\n→ [🌐] 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: https://www.facebook.com/100008709979267\n→ [🎀] 𝐙𝐚𝐥𝐨: 𝟎𝟕𝟕𝟗𝟓𝟒𝟏𝟑𝟒𝟑\n◆━━━━━━━━━━━━━◆\n𝐓𝐡𝐢𝐬 𝐛𝐨𝐭 𝐦𝐚𝐝𝐞 𝐛𝐲 ${global.config.BOTNAME}. 𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐟𝐨𝐫 𝐮𝐬𝐢𝐧𝐠\n© 𝙰𝚍𝚖𝚒𝚗: 𝐁𝐎𝐓-𝐍𝐓𝐓-𝐕𝐍`, attachment: fs.createReadStream(__dirname + "/cache/biaadmin.mp4")}, idBox);
   		if (error) return api.sendMessage("Đã có lỗi xảy ra, đảm bảo rằng id bạn nhập hợp lệ và bot đang ở trong box!", threadID, messageID);
   		else {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`===[ 𝐃𝐔𝐘𝐄̣̂𝐓 𝐁𝐎𝐗 ]===\n→ 𝐏𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐛𝐨𝐱:\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    	}, messageID)
        }
   	});
      }