/**
 * A module for managing font settings.
 * @module fontManager
 * An object to store font data.
 * @type {Object}
 */
let data = {};

/**
 * Sets the font for the application.
 * @param {string} font - The name of the font to be set.
 * @returns {void}
 */
function setFont(font) {
  data["font"] = font;
  console.log(font);
};

/**
 * Retrieves the current font setting.
 * @returns {string} - The name of the current font.
 */
function getFont() {
  return data["font"];
};

/**
 * Exports the setFont and getFont functions.
 * @type {Object}
 * @property {function} setFont - Sets the font for the application.
 * @property {function} getFont - Retrieves the current font setting.
 */
module.exports = { setFont, getFont };