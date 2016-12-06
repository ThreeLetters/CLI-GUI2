"use strict"
module.exports = class list {
    constructor(main, title, options) {
        this.main = main;
        this.vis = main.visual
        this.title = title;
        this.options = options

        this.chosen = 0;
    }

    onKey(key) {
        switch (key) {
        case "UP":
            if (this.chosen <= 0) return
            this.chosen--;
            break;
        case "DOWN":
            if (this.chosen >= this.options.length - 1) return
            this.chosen++;
            break;
        case "ENTER":

            return
            break;
        default:
            return
            break;
        }
        this.update()
    }

    update() {
        var a = Math.floor(this.vis.height / 2) - this.options.length - 2
        this.vis.setRow()
        for (var i = 0; i < this.options.length)
    }
}