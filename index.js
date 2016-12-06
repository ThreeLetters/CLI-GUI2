"use strict"
const AssetService = require('./lib/assetService.js')
const InputService = require('./lib/inputService.js')
const VisualService = require('./lib/visualService.js')
module.exports = class CLIGUI {
    constructor() {
        this.visual = new VisualService(this)
        this.input = new InputService(this)
        this.asset = new AssetService(this)
    }
    stop() {
        this.input.stop()
        this.asset.stop()
        this.visual.stop()
    }
    reset() {
        this.input.reset()
        this.asset.reset()
        this.visual.reset()
    }

}