// Laya.init (400, 300);
// var  txt = new Laya.Text ();
// txt.text = 'Hello World';
// txt.color = '#fff';
// Laya.stage.addChild (txt);
var laya;
(function (laya) {
    var Sprite = Laya.Sprite;
    var WebGL = Laya.WebGL;
    var Event = Laya.Event;
    var Circle = (function () {
        function Circle() {
            Laya.init(800, 1000, WebGL);
            this.drawCircle();
            console.log('dfgdfjhgjk');
        }
        Circle.prototype.drawCircle = function () {
            this.circle = new Sprite();
            this.range = new Sprite();
            Laya.stage.addChild(this.range);
            /**
             * Solution 1:
             * 绘图出来的graphics，不占任何大小，如果不设置Sprite的size，那么 sprite 是width和height都为0的Object
             * 如果需要在graphic上做点击，则要把sprite设置在graphics上。
             * 缺点，size 的是长方形，导致点击的区域比绘制的圆形大
             */
            // this.circle.size(40,400).pos (280, 280);
            /**
             * Solution 2:
             * 设置点击区域 hitArea
             * 参考: https://ask.layabox.com/question/2469
             */
            var t = new Laya.HitArea();
            t.hit = this.circle.graphics;
            this.circle.hitArea = t;
            this.circle.pivotX = 0;
            this.circle.pivotY = 0;
            this.circle.graphics.drawCircle(300, 300, 80, '#fff000');
            this.range.graphics.drawCircle(300, 300, 100, '#fff');
            this.range.addChild(this.circle);
            this.circle.on(Event.MOUSE_DOWN, this, this.dragCircle);
            this.circle.on(Event.DRAG_END, this, this.stopDrag);
            this.circle.on(Event.DRAG_MOVE, this, this.moveCircle);
            this.obj = new Laya.Text();
            this.obj.text = 'Cynthia';
            this.obj.pos(500, 100);
            this.obj.color = '#fed100';
            Laya.stage.addChild(this.obj);
            this.line = new Sprite();
            this.line.graphics.drawLine(300, 300, 300, 300, '#ff000', 5);
            Laya.stage.addChild(this.line);
        };
        Circle.prototype.dragCircle = function (et) {
            /**
             * public function startDrag(area:Rectangle = null, hasInertia:Boolean = false, elasticDistance:Number = 0, elasticBackTime:int = 300, data:* = null, disableMouseEvent:Boolean = false, ratio:Number = 0.92):void
             *
             * Parameters
             * area:Rectangle (default = null) — （可选）拖动区域，此区域为当前对象注册点活动区域（不包括对象宽高），可选。
             * hasInertia:Boolean (default = false) — （可选）鼠标松开后，是否还惯性滑动，默认为false，可选。
             * elasticDistance:Number (default = 0) — （可选）橡皮筋效果的距离值，0为无橡皮筋效果，默认为0，可选。
             * elasticBackTime:int (default = 300) — （可选）橡皮筋回弹时间，单位为毫秒，默认为300毫秒，可选。
             * data:* (default = null) — （可选）拖动事件携带的数据，可选。
             * disableMouseEvent:Boolean (default = false) — （可选）禁用其他对象的鼠标检测，默认为false，设置为true能提高性能。
             * ratio:Number (default = 0.92) — （可选）惯性阻尼系数，影响惯性力度和时长。
             */
            this.circle.startDrag(new Laya.Rectangle(0, 0, 0, 0), false, 10, 300, null, true, 0.1);
        };
        Circle.prototype.stopDrag = function (et) {
            this.circle.stopDrag();
        };
        Circle.prototype.moveCircle = function (et) {
            /* 获取拖动的点坐标 */
            var position = this.circle.getMousePoint();
            this.line.graphics.clear();
            this.line.graphics.drawLine(300, 300, position.x, position.y, '#ff0000', 5);
            var degree = Math.atan2((position.y - 300), (position.x - 300));
            this.obj.text = (degree * (180 / Math.PI)).toString();
            // x轴分速度 = Math.cos(角度)*物体移动速度
            // y轴分速度 = Math.sin(角度)*物体移动速度
            // var speed = Math.sqrt ( Math.pow(Math.abs(position.x-300), 2) +  Math.pow(Math.abs(position.y-300), 2));
            // var speedX = Math.cos (degree) * speed;
            var speedX = Math.cos(degree) * Math.abs(position.x - 300);
            if (this.obj.x > 0 && this.obj.x < Laya.stage.width)
                this.obj.x += speedX / 100;
        };
        return Circle;
    }());
    laya.Circle = Circle;
})(laya || (laya = {}));
new laya.Circle();
//# sourceMappingURL=HelloWorld.js.map