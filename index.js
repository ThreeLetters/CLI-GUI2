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
    done() {
        this.visual.done()
        this.asset.done()
    }
    reset() {
        this.input.reset()
        this.asset.reset()
        this.visual.reset()
    }
    list(a, b, c) {
        this.asset.list(a, b, c)
    }
    box(a, b, c, d, e, f, g) {
        this.asset.box(a, b, c, d, e, f, g)
    }
}