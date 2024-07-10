module.exports.config = {
    name: "dalle",
    version: "1.0.0", // Thêm phiên bản (tuỳ chỉnh)
    hasPermssion: 0, // Cho phép mọi người dùng
    credits: "Gemini",
    description: "AI tạo ảnh",
    commandCategory: "image-generation", // Thể loại lệnh (tùy chỉnh)
    cooldowns: 3, 
    dependencies: {
        "axios": "",
        "fs": "",
        "path": "" // Thêm path để làm việc với đường dẫn tệp
    },
    usage: "<prompt>" // Thêm phần hướng dẫn sử dụng
};

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID, senderID } = event;
    const { join } = global.nodemodule["path"]; 

    if (!args[0]) {
        api.sendMessage("Thiếu gì đó thì điền vào.", threadID, messageID);
        return;
    }

    const prompt = args.join(" ");
    const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    try {
        const waitMessage = await api.sendMessage("Đang tiến hành tạo ảnh, vui lòng chờ...", threadID, messageID);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        if (response.status === 200) {
            const imageBuffer = Buffer.from(response.data, 'binary');
            const imagePath = join(__dirname, "cache", `poli.jpg`);
            fs.writeFileSync(imagePath, imageBuffer, "binary");

            api.sendMessage({ 
                body: "Đã tạo xong ảnh theo yêu cầu của bạn",
                attachment: fs.createReadStream(imagePath)
            }, threadID, messageID, () => {
                fs.unlinkSync(imagePath); // Xóa ảnh sau khi gửi
                api.unsendMessage(waitMessage.messageID); // Xóa tin nhắn chờ
            }, messageID);
        } else {
            api.sendMessage("Không thể tạo ảnh. Vui lòng thử lại sau.", threadID, () => {
                api.editMessage('Done!', waitMessage.messageID); // Xóa tin nhắn chờ
            }, messageID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("Đã xảy ra lỗi trong quá trình tạo ảnh.", threadID, messageID);
    }
};
