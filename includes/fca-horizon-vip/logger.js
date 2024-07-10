'use strict';
/* eslint-disable linebreak-style */

const chalk = require('chalk');
var isHexcolor = require('is-hexcolor');
/**
 * A function to get text with placeholders replaced by provided data.
 * @param {string[]}...Data - The data to replace placeholders in the main string.
 * @returns {string} The main string with placeholders replaced by provided data.
 */
var getText = function(/** @type {string[]} */ ...Data) {
	var Main = (Data.splice(0, 1)).toString();
		for (let i = 0; i < Data.length; i++) Main = Main.replace(RegExp(`%${i + 1}`, 'g'), Data[i]);
	return Main;
};

/**
 * @param {any} obj - The object to get the type of.
 * @returns {string} The type of the object.
 *
 * @example
 * getType(123); // returns "Number"
 * getType("Hello"); // returns "String"
 * getType(true); // returns "Boolean"
 * getType([]); // returns "Array"
 * getType({}); // returns "Object"
 * getType(null); // returns "Null"
 * getType(undefined); // returns "Undefined"
 * getType(function() {}); // returns "Function"
 * getType(new Date()); // returns "Date"
 * getType(new RegExp()); // returns "RegExp"
 * getType(new Error()); // returns "Error"
 * getType(Promise.resolve()); // returns "Promise"
 * getType(Symbol()); // returns "Symbol"
 * getType(BigInt(123)); // returns "BigInt"
 */
function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
};

module.exports = {
	/**
     * A function to log a normal message with color and prefix.
     * @param {string} Str - The message to log.
     * @param {() => any} Data - An optional function or value to be returned.
     * @param {() => void} Callback - An optional function to be called.
     */
	Normal: function(/** @type {string} */ Str, /** @type {() => any} */ Data ,/** @type {() => void} */ Callback) {
		if (isHexcolor(global.Fca.Require.FastConfig.MainColor) != true) {
			this.Warning(getText(global.Fca.Require.Language.Index.InvaildMainColor, global.Fca.Require.FastConfig.MainColor), process.exit(0));
		}
		else console.log(chalk.hex(global.Fca.Require.FastConfig.MainColor).bold(`${global.Fca.Require.FastConfig.MainName || '[ META-HZI ]'} ➣ `) + Str);
		if (getType(Data) == 'Function' || getType(Data) == 'AsyncFunction') {
			return Data();
		}
		if (Data) {
			return Data;
		}
		if (getType(Callback) == 'Function' || getType(Callback) == 'AsyncFunction') {
			Callback();
		}
		else return Callback;
	},
	/**
     * A function to log an info message with color and prefix.
     * @param {unknown} str - The message to log.
     * @param {() => void} callback - An optional function to be called.
     */
	Warning: function(/** @type {unknown} */ str, /** @type {() => void} */ callback) {
		console.log(chalk.magenta.bold('[ FCA-WARNING ] ➣ ') + chalk.yellow(str));
		if (getType(callback) == 'Function' || getType(callback) == 'AsyncFunction') {
			callback();
		}
		else return callback;
	},
	/**
     * A function to log an info message with color and prefix.
     * @param {unknown} str - The message to log.
     * @param {() => void} callback - An optional function to be called.
     */
	Error: function(/** @type {unknown} */ str, /** @type {() => void} */ callback) {
		if (!str) {
			console.log(chalk.magenta.bold('[ FCA-ERROR ] ➣ ') + chalk.red("Already Faulty, Please Contact: Facebook.com/kemsadboiz"));
		}
		console.log(chalk.magenta.bold('[ FCA-ERROR ] ➣ ') + chalk.red(str));
		if (getType(callback) == 'Function' || getType(callback) == 'AsyncFunction') {
			callback();
		}
		else return callback;
	},
	/**
     * A function to log an info message with color and prefix.
     * @param {unknown} str - The message to log.
     * @param {() => void} callback - An optional function to be called.
     */
	Success: function(/** @type {unknown} */ str, /** @type {() => void} */ callback) {
		console.log(chalk.hex('#00FFFF').bold(`${global.Fca.Require.FastConfig.MainName || '[ META-HZI ]'} ➣ `) + chalk.green(str));
		if (getType(callback) == 'Function' || getType(callback) == 'AsyncFunction') {
			callback();
		}
		else return callback;
	},
	/**
     * A function to log an info message with color and prefix.
     * @param {unknown} str - The message to log.
     * @param {() => void} callback - An optional function to be called.
     */
	Info: function(/** @type {unknown} */ str, /** @type {() => void} */ callback) {
		console.log(chalk.hex('#00FFFF').bold(`${global.Fca.Require.FastConfig.MainName || '[ META-HZI ]'} ➣ `) + chalk.blue(str));
		if (getType(callback) == 'Function' || getType(callback) == 'AsyncFunction') {
			callback();
		}
		else return callback;
	}
};

/*
• Tím Horizon: #9900FF,
• Xanh Biển: #00FFFF,
• Hồng Nhạt: #FFC0CB,
Coming soon...
*/