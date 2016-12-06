"use strict"
const Assets = require('./assets')
module.exports = class AssetService {
    constructor(main) {
        this.main = main;
        this.assets = [];
    }
    stop() {
        this.reset()
    }
    reset() {
        this.assets = [];
    }


}