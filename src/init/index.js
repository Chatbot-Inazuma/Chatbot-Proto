global.throwIfMissing = function (name = null) {
    throw new Error(name === null ? `Missing parameter` : `Missing parameter: ${name}`);
};

module.exports = {};