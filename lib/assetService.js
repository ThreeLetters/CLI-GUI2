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

    addAsset(asset) {
        this.assets.push(asset)
        this.main.input.addListener(function (k) {
            asset.onKey(k)
        })

    }
    removeAsset() {
        this.assets.pop()
        this.main.input.removeListener()
    }
    list(title, options) {
        this.addAsset(new Assets.list(this, title, options))
    }


}