const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const dataDir = path.join(__dirname, 'tc');
const dataPath = path.join(dataDir, 'tc.json');
const commandsDir = path.join(__dirname, '..', 'commands');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
if (!fs.existsSync(dataPath)) {
    const initialData = {
        daily: {},
        weekly: {},
        total: {},
        lastUpdateDay: moment().format('YYYY-MM-DD'),
        lastUpdateWeek: moment().startOf('isoWeek').format('YYYY-MM-DD')
    };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 4));
}

module.exports.config = {
    name: "tc",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "TatsuYTB",
    description: "Thống kê dùng lệnh trên Hệ Thống bot",
    commandCategory: "Hệ Thống",
    usages: "[day|week|all]",
    cooldowns: 5,
    dependencies: {}
};

module.exports.onLoad = () => {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    fs.readdir(commandsDir, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            if (file.endsWith('.js')) {
                const commandName = path.basename(file, '.js');

                if (!data.daily[commandName]) data.daily[commandName] = 0;
                if (!data.weekly[commandName]) data.weekly[commandName] = 0;
                if (!data.total[commandName]) data.total[commandName] = 0;
            }
        });

        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
    });

    setInterval(() => {
        const today = moment().format('YYYY-MM-DD');
        const weekStart = moment().startOf('isoWeek').format('YYYY-MM-DD');

        if (data.lastUpdateDay !== today) {
            data.daily = {};
            data.lastUpdateDay = today;
        }

        if (data.lastUpdateWeek !== weekStart) {
            data.weekly = {};
            data.lastUpdateWeek = weekStart;
        }

        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
    }, 60 * 60 * 1000);
};

module.exports.handleEvent = function ({ event }) {
    const { body } = event;

    if (body) {
        const commandName = body.trim().split(' ').map(word => word.replace(/[^a-zA-Z0-9]/g, '')).find(word => word.length > 0);

        if (commandName) {
            const commandFile = path.join(commandsDir, `${commandName}.js`);
            if (fs.existsSync(commandFile)) {
                const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
                const today = moment().format('YYYY-MM-DD');
                const weekStart = moment().startOf('isoWeek').format('YYYY-MM-DD');

                if (!data.daily[commandName]) data.daily[commandName] = 0;
                if (!data.weekly[commandName]) data.weekly[commandName] = 0;
                if (!data.total[commandName]) data.total[commandName] = 0;

                data.daily[commandName]++;
                data.weekly[commandName]++;
                data.total[commandName]++;

                data.lastUpdateDay = today;
                data.lastUpdateWeek = weekStart;

                fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
            }
        }
    }
};

function convertToFancyNumber(number) {
    const fancyNumbers = ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'];
    return number.toString().split('').map(digit => fancyNumbers[digit] || digit).join('');
}

module.exports.run = function ({ event, api, args }) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const query = args[0] ? args[0].toLowerCase() : '';

    let message = '';
    switch (query) {
        case 'day':
            message = ">>>𝐓𝐎𝐏 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 𝐃𝐀𝐘<<<\n" + 
                      Object.entries(data.daily)
                          .filter(([, count]) => count > 0)
                          .sort((a, b) => b[1] - a[1])
                          .map(([command, count], index) => `𝐓𝐎𝐏 ${convertToFancyNumber(index + 1)}: ${command}: ${count} 𝐥𝐮̛𝐨̛̣𝐭 𝐝𝐮̀𝐧𝐠 𝐡𝐨̂𝐦 𝐧𝐚𝐲`)
                          .join('\n');
            break;
        case 'week':
            message = ">>>𝐓𝐎𝐏 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 𝐖𝐄𝐄𝐊<<<\n" + 
                      Object.entries(data.weekly)
                          .filter(([, count]) => count > 0)
                          .sort((a, b) => b[1] - a[1])
                          .map(([command, count], index) => `𝐓𝐎𝐏 ${convertToFancyNumber(index + 1)}: ${command}: ${count} 𝐥𝐮̛𝐨̛̣𝐭 𝐝𝐮̀𝐧𝐠 𝐭𝐮𝐚̂̀𝐧 𝐧𝐚̀𝐲`)
                          .join('\n');
            break;
        case 'all':
            message = ">>>𝐓𝐎𝐏 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 𝐀𝐋𝐋<<<\n" + 
                      Object.entries(data.total)
                          .filter(([, count]) => count > 0)
                          .sort((a, b) => b[1] - a[1])
                          .map(([command, count], index) => `𝐓𝐎𝐏 ${convertToFancyNumber(index + 1)}: ${command}: ${count} 𝐥𝐮̛𝐨̛̣𝐭 𝐝𝐮̀𝐧𝐠 𝐭𝐨̂̉𝐧𝐠 𝐜𝐨̣̂𝐧𝐠`)
                          .join('\n');
            break;
        default:
            message = "𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 𝐯𝐨̛́𝐢 𝐜𝐚́𝐜 𝐭𝐮̀𝐲 𝐜𝐡𝐨̣𝐧: 𝐝𝐚𝐲, 𝐰𝐞𝐞𝐤, 𝐡𝐨𝐚̣̆𝐜 𝐚𝐥𝐥.";
            break;
    }

    api.sendMessage(message || "𝐂𝐡𝐮̛𝐚 𝐜𝐨́ 𝐥𝐞̣̂𝐧𝐡 𝐧𝐚̀𝐨 𝐝𝐮̛𝐨̛̣𝐜 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠.", event.threadID);
};