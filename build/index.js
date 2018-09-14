const { debuglog } = require('util');

const LOG = debuglog('@wrote/rm')

/**
 * A package to remove files and directories.
 * @param {Config} config Options for the program.
 * @param {boolean} config.shouldRun A boolean option.
 */
               async function rm(config) {
  const {
    type,
  } = config
  LOG('@wrote/rm called with %s', type)
  return type
}

/* documentary types/index.xml */
/**
 * @typedef {Object} Config Options for the program.
 * @prop {boolean} shouldRun A boolean option.
 */


module.exports = rm
//# sourceMappingURL=index.js.map