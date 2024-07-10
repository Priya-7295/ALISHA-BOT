// 'use strict';

// switch (global.Fca.Require.FastConfig.BroadCast) {
//     case true: {
//         try {
//             var logger = global.Fca.Require.logger;
//                 var Fetch = global.Fca.Require.Fetch;
//                     Fetch.get("https://raw.githubusercontent.com/JustKemForFun/Global_MetaHorizon/main/Fca_BroadCast.json").then(async (/** @type {{ body: { toString: () => string; }; }} */ res) => {
//                              //make https://raw.githubusercontent.com/KanzuXHorizon/Global_Horizon/main/Fca_BroadCast.json
//                         global.Fca.Data.BroadCast = JSON.parse(res.body.toString())
//                     var random = JSON.parse(res.body.toString())[Math.floor(Math.random() * JSON.parse(res.body.toString()).length)] || "Ae Zui Zẻ Nhé !";
//                 logger.Normal(random);
//             }); 
//         }	
//         catch (e) {
//             console.log(e);
//         }
//         return setInterval(() => { 
//             try {
//                 try {
//                     var logger = global.Fca.Require.logger;
//                         var random = global.Fca.Data.BroadCast[Math.floor(Math.random() * global.Fca.Data.BroadCast.length)] || "Ae Zui Zẻ Nhé !";
//                     logger.Normal(random);
//                 }	
//                 catch (e) {
//                     console.log(e);
//                     return;
//                 }
//             }
//             catch (e) {
//                 console.log(e);
//             }
//         },3600 * 1000);
//     }
//     case false: {
//         break;
//     }
//     default: {
//         break;
//     }
// }

'use strict';

const logger = require('./logger');
const Fetch = require('got');

/**
 * Configuration for broadcasting messages.
 * @typedef {Object} broadcastConfig
 * @property {boolean} enabled - Indicates if broadcasting is enabled.
 * @property {string[]} data - Array of messages to be broadcasted.
 */
const broadcastConfig = {
  enabled: false,
  data: [],
};

/**
 * Fetches broadcast data from a remote JSON file.
 * @returns {Promise<string[]>} - Promise that resolves to an array of messages.
 */
const fetchBroadcastData = async () => {
  try {
    const response = await Fetch.get('https://raw.githubusercontent.com/JustKemForFun/Global_MetaHorizon/main/Fca_BroadCast.json');
    broadcastConfig.data = JSON.parse(response.body.toString());
    return broadcastConfig.data;
  } catch (error) {
    logger.Error(`Failed to fetch broadcast data: ${error.message}`);
    broadcastConfig.data = [];
    return [];
  }
};

const broadcastRandomMessage = () => {
  const randomMessage = broadcastConfig.data.length > 0 ? broadcastConfig.data[Math.floor(Math.random() * broadcastConfig.data.length)] : 'Ae Zui Zẻ Nhé !';
  logger.Normal(randomMessage);
};

const startBroadcasting = async (enabled) => {
  enabled = global.Fca.Require.FastConfig.BroadCast

  if (enabled) {
    try {
      await fetchBroadcastData();
      broadcastRandomMessage();
      setInterval(broadcastRandomMessage, 3600 * 1000);
    } catch (error) {
      logger.Error(`Failed to start broadcasting: ${error.message}`);
    }
  }
};

module.exports = {
  startBroadcasting,
};