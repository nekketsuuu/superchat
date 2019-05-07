Vue.component('render', {
    template: '<canvas width="300" height="200" class="canvas"></canvas>',
    props: {
        price: Number,
        message: String
    },
    watch: {
        price: function() {
            this.draw();
        },
        message: function() {
            this.draw();
        }
    },
    methods: {
        draw: function() {
            const w = 300;
            const h = 200;
            const r = 10;
            let c = "";
            if (this.price < 200) {
                c = "rgb(32, 80, 154)";
            } else if (this.price < 500) {
                c = "rgb(109, 225, 249)";
            } else if (this.price < 1000) {
                c = "rgb(115, 224, 184)";
            } else if (this.price < 2000) {
                c = "rgb(247, 212, 95)";
            } else if (this.price < 5000) {
                c = "rgb(228, 131, 61)";
            } else if (this.price < 10000) {
                c = "rgb(212, 72, 105)";
            } else {
                c = "rgb(209, 68, 54)";
            }

            this.ctx.fillStyle = c;
            this.ctx.clearRect(0, 0, w, h);
            this.ctx.beginPath();
            this.ctx.moveTo(r, 0);
            this.ctx.lineTo(w - r, 0);
            this.ctx.arc(w - r, r, r, Math.PI * 1.5, 0, false);
            this.ctx.lineTo(w, h - r);
            this.ctx.arc(w - r, h - r, r, 0, Math.PI * 0.5, false);
            this.ctx.lineTo(r, h);
            this.ctx.arc(r, h - r, r, Math.PI * 0.5, Math.PI, false);
            this.ctx.lineTo(0, r);
            this.ctx.arc(r, r, r, Math.PI, Math.PI * 1.5, false);
            this.ctx.closePath();
            this.ctx.fill();

            let lines = this.message.split('\n');
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
            this.ctx.font = '20px Georgia,游明朝,"Yu Mincho",YuMincho,"Hiragino Mincho ProN",HGS明朝E,メイリオ,Meiryo,serif';
            this.ctx.fillText("¥" + this.price.toString(), 30, 30, w - 60);
            for (let i = 0; i < lines.length; i++) {
                this.ctx.fillText(lines[i], 30, 30 + (i + 1) * 25, w - 60);
            }
        }
    },
    mounted: function() {
        this.ctx = this.$el.getContext('2d');
        this.draw();
    }
});

var app = new Vue({
    el: "#render",
    data: function() {
        return {
            price: 1000,
            message: "ツイートできてえらい代"
        }
    }
});
