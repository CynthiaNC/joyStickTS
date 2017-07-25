// Laya.init (400, 300);

// var  txt = new Laya.Text ();
// txt.text = 'Hello World';
// txt.color = '#fff';

// Laya.stage.addChild (txt);

module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import WebGL = Laya.WebGL;
    import Event = Laya.Event;

    export class Circle {
        private circle: Sprite;
        private range: Sprite;

        private moveable: Boolean;

        constructor () {
            Laya.init (800, 1000, WebGL);
            this.drawCircle ();
            console.log('dfgdfjhgjk')
            this.moveable = false;

        }

        private drawCircle (): void {
            this.circle = new Sprite ();
            this.range = new Sprite ();
            Laya.stage.addChild (this.range);


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
            var t: Laya.HitArea = new Laya.HitArea ();
            t.hit = this.circle.graphics;
            this.circle.hitArea = t;

            this.circle.graphics.drawCircle (300,300,20,'#ff0000');
            this.range.graphics.drawCircle (300,300,100,'#fff');

            this.range.addChild (this.circle);

            
            this.circle.on (Event.MOUSE_DOWN, this, this.canMove);
            // this.circle.on (Event.MOUSE_UP, this, this.canntMove);
            // this.circle.on (Event.MOUSE_MOVE, this, this.moveCircle);
            

            // this.circle.on (Event.DRAG_START, this, this.canMove);
            this.circle.on (Event.DRAG_END, this, this.canntMove);
            this.circle.on (Event.DRAG_MOVE, this, this.moveCircle);

            
            

        }

        private canMove (et: Event): void {
            this.moveable = true;
            console.log('start');
            this.circle.startDrag (null, false, 5, 200, null, true, 0.55);
            
        }
        private canntMove (et: Event): void {
            this.moveable = false;
            console.log('enf');
            this.circle.stopDrag ();
            
        }
        private moveCircle (et: Event): void {
            if (this.moveable) {
                // this.circle.graphics.clear();
                console.log('fdds')
                // this.circle.graphics.drawCircle (et.stageX , et.stageY,20,'#ff0000');
                
            }
        }

    }
}



new laya.Circle ();