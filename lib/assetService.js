"use strict"
/*
    CLI-GUI2 - Command line interface library
    Copyright (C) 2016 Andrew S

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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
        this.main.visual.setCurrent(asset)
        asset.init()

    }
    removeAsset() {
        this.assets[this.assets.length - 1].onRemove()
        this.assets.pop()
        this.main.input.removeListener()
        this.main.visual.setCurrent(this.assets[this.assets.length - 1])
    }
    list(title, options, call) {
        this.addAsset(new Assets.list(this.main, title, options, call))
    }
    checklist(title, options, call) {
        this.addAsset(new Assets.checklist(this.main, title, options, call))
    }
    box(x, y, width, height, title, options, call) {
        this.addAsset(new Assets.box(this.main, x, y, width, height, title, options, call))
    }
    editor(file, call) {
        this.addAsset(new Assets.editor(this.main, "", require('fs').readFileSync(file, "utf8"), call))
    }
    prompt(title, shadow, call) {
        this.addAsset(new Assets.prompt(this.main, title, shadow, call))
    }
    gprompt(title, shadow, options, call) {
        this.addAsset(new Assets.gprompt(this.main, title, shadow, options, call))
    }
    search(title, shadow, call) {
        this.addAsset(new Assets.search(this.main, title, shadow, call))
    }
    table(title, data) {
        this.addAsset(new Assets.table(this.main, title, data));
    }
}