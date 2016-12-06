"use strict"
const Assets = require('../assets')
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
    done() {
        this.removeAsset()
        if (this.assets[this.assets.length - 1]) {
            this.assets[this.assets.length - 1].update()
        }
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
    list(title, options, call) {
        this.addAsset(new Assets.list(this.main, title, options, call))
    }


}