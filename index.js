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
const AssetService = require('./lib/assetService.js')
const InputService = require('./lib/inputService.js')
const VisualService = require('./lib/visualService.js')
const Coords = require('./lib/coords.js')
module.exports = class CLIGUI {
    constructor() {
        this.visual = new VisualService(this)
        this.input = new InputService(this)
        this.asset = new AssetService(this)
        this.coords = new Coords(this.visual)

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

    addListener(t, f) {
        switch (t) {
        case "key":
            this.input.addOListener(f);
            break;
        }
    }
    removeListener(t, f) {
        switch (t) {
        case "key":
            this.input.removeOListener(f);
            break;
        }
    }
    clearListeners(t) {
        switch (t) {
        case "key":
            this.input.clearOListeners();
            break;
        }
    }
    list(a, b, c) {
        this.asset.list(a, b, c)
    }
    checklist(a, b, c) {
        this.asset.checklist(a, b, c)
    }
    box(a, b, c, d, e, f, g) {
        var pos = this.coords.toReal(a, b, c, d)

        this.asset.box(pos.x, pos.y, pos.width, pos.height, e, f, g)
    }
    editor(h, c, don) {
        if (don)
            this.asset.editor(h, c)
        else
            this.asset.editor(h, function (a, file) {
                a.box(-20, -3, 40, 6, "Save?", {
                    save: function (a) {
                        require('fs').writeFileSync(h, file)
                        a.done()
                        a.done()
                        if (c) c(this, file, true)
                    },
                    dontsave: function (a) {
                        a.done()
                        a.done()
                        if (c) c(this, file, false)
                    },
                    cancel: function (a) {
                        a.done()
                    }

                })
            })
    }
    prompt(a, b, c) {
        this.asset.prompt(a, b, c)

    }
    gprompt(a, b, c, d) {
        this.asset.gprompt(a, b, c, d)

    }
    search(a, b, c) {
        this.asset.search(a, b, c)

    }
    table(title, data) {
        this.asset.table(title, data)
    }
}