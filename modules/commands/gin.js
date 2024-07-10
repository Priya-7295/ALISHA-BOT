module.exports.config = {
  name: "genshin",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Tun",
  description: "Tỉ lệ ra nhân vật 5 sao trong genshin",
  commandCategory: "Gacha",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
    "https://i.imgur.com/xMliDtl.mp4",
    "https://i.imgur.com/AJTiZXV.mp4",
    "https://i.imgur.com/dyFassF.mp4",
    "https://i.imgur.com/6fpQ4Vt.mp4",
    "https://i.imgur.com/E79ZSq5.mp4",
    "https://i.imgur.com/1VEkGwF.mp4",
    "https://i.imgur.com/bVaDhzJ.mp4",
    "https://i.imgur.com/87JJ6nd.mp4",
    "https://i.imgur.com/7iebHJc.mp4",
    "https://i.imgur.com/OMZkk7q.mp4",
    "https://i.imgur.com/ywOb8ZL.mp4",
    "https://i.imgur.com/L4rYSFE.mp4",
    "https://i.imgur.com/xPksQxr.mp4",
    "https://i.imgur.com/b0ifsf1.mp4",
    "https://i.imgur.com/43npY6d.mp4",
    "https://i.imgur.com/o1hveT7.mp4",
    "https://i.imgur.com/Cfy5qYB.mp4",
    "https://i.imgur.com/GMASIwG.mp4",
    "https://i.imgur.com/wiRPDu0.mp4",
    "https://i.imgur.com/nsy83Rh.mp4",
    "https://i.imgur.com/RdZgJs1.mp4",
    "https://i.imgur.com/wAGNkQ3.mp4",//5 star
    "https://i.imgur.com/PFPJwvK.mp4",
    "https://i.imgur.com/wWJXQjJ.mp4",
    "https://i.imgur.com/QLpBbrB.mp4",
    "https://i.imgur.com/HHaLAbZ.mp4",
    "https://i.imgur.com/t1HAQU9.mp4",
    "https://i.imgur.com/QMuupoY.mp4",
    "https://i.imgur.com/HoRTRjT.mp4",
    "https://i.imgur.com/uxTm1GL.mp4",
    "https://i.imgur.com/Meq260d.mp4",
    "https://i.imgur.com/yYN6iPV.mp4",
    "https://i.imgur.com/WYwGoKt.mp4",
    "https://i.imgur.com/rmoD4Oc.mp4",
    "https://i.imgur.com/SMBDJng.mp4",
];
  var max = Math.floor(Math.random() * 6);  
  var min = Math.floor(Math.random() * 2)
  var tle = Math.floor(Math.random() * 101);
  var name = (await Users.getData(event.senderID)).name
  var data = await Currencies.getData(event.senderID);
  var exp =  data.exp;
   var callback = () => api.sendMessage({body:`🎉✦Chúc mừng ${name} đã roll thành công✦\n✨»Vận may roll nhân vật này của bạn là: ${tle}% 💕«` ,attachment: fs.createReadStream(__dirname + "/cache/genshin.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/genshin.mp4"),event.messageID); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/genshin.mp4")).on("close",() => callback());
};