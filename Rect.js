define(['./Point'],function(Point){
    'use strict';

    function Rect(column, row, origin) {
        this.column = column || 10;
        this.row = row || 10;
        this.init(origin);
    }

    var RPT = Rect.prototype;

    RPT.init = function(origin) {
        // console.assert(PPT.isPoint(p), 'The argument should be a Point.');
        this.origin = new Point(origin);

        // 快捷操作起点坐标（origin）
        Object.defineProperties(this, {
            x: {
                enumerable: true,
                get: function() {
                    return this.origin.x;
                },
                set: function(newX) {
                    this.origin.x = newX;
                }
            },
            y: {
                enumerable: true,
                get: function() {
                    return this.origin.y;
                },
                set: function(newY) {
                    this.origin.y = newY;
                }
            }
        });
    }

    // 遍历 Rect 中的元素
    RPT.each = function(procedure) {
        for (var x = 0; x < this.column; ++x) {
            for (var y = 0; y < this.row; ++y) {
                procedure.call(this, x, y, this);
            }
        }
    }

    // 返回顶点位置组成的数组
    RPT.getVertexArray = function(rect) {
        var vertexArray = [];

        var leftTopVertex = {};
        var rightTopVertex = {};
        var leftBottomVertex = {};
        var rightBottomVertex = {};

        leftTopVertex.x = rect.origin.x;
        leftTopVertex.y = rect.origin.y;
        vertexArray.push(leftTopVertex);

        rightTopVertex.x = rect.origin.x + rect.column;
        rightTopVertex.y = rect.origin.y;
        vertexArray.push(rightTopVertex);

        leftBottomVertex.x = rect.origin.x;
        leftBottomVertex.y = rect.origin.y + rect.row;
        vertexArray.push(leftBottomVertex);

        rightBottomVertex.x = rect.origin.x + rect.column;
        rightBottomVertex.y = rect.origin.y + rect.row;

        vertexArray.push(rightBottomVertex);
        return vertexArray;
    }

    // 返回当前矩形的实际像素宽高
    RPT.getSize = function(unit) {
        console.assert(_.isNumber(unit), 'unit should be a Number.');
        return {
            width: this.column * unit,
            height: this.row * unit,
        }
    }

    // 判断当前矩形是否落在 canvas 区域内
    RPT.within = function(canvas) {
        var thisCol = this.column;
        var canCol = canvas.column;

        console.log(thisCol,canCol);
        return (this.x >= 0) && (this.y >= 0)
            && (this.x + this.column <= canvas.column)
            && (this.y + this.row <= canvas.row);
    }

    // 判断当前矩形是否和其他矩形有重叠区域
    RPT.isOverlap = function(canvas,rect) {
        var isOverlap = false;
        _.each(canvas.rects,function(rects){
            if (!_.isEqual(this,rects)) {
                console.log("---- now it is not equal -----");
                if (this.isCrossing(rects, this)) {
                    isOverlap = true;
                }
            }else {
                console.log("----- equal -----");
            }
        },this);
        console.log(isOverlap);
        return isOverlap;
        // 是否 和 其他 元素 重合
        // 要获取 所有 rect 的 顶点 和 宽高
    }

    RPT.isCrossing = function(rectFir,rectSec){

        // console.log(rectFir,rectSec);
        // 默认不想交
        var isCrossing = false;

        var firRectArray = this.getVertexArray(rectFir);
        var secRectArray = this.getVertexArray(rectSec);
        // 只要有 一个点 落入 另外 rect 中 ，两个 rect 必然相交
        // 两个 rect 个取 四个点 到 另外 一个点 rect 中 互相验证
        // 两个rect 中 没有 一个点 落入 另外 一个 rect 中 则 不想交
        for (var i = 0; i < firRectArray.length; i++) {
            if(isPointInRect(rectSec, firRectArray[i])){
                // 相交
                isCrossing = true;
                break;
            }
        }

        if (!isCrossing) {
            for (var n = 0; n < secRectArray.length; n++) {
                if (isPointInRect(rectFir, secRectArray[n])) {
                    // 相交
                    isCrossing = true;
                    break;
                }
            }
        }
        // 判断某点在 是否 落入 Rect 所在空间 中
        function isPointInRect(Rect, point) {
            // console.log(Rect,point);
            var startX = Rect.x;
            var startY = Rect.y;
            var endX = Rect.x + Rect.column;
            var endY = Rect.y + Rect.row;
            // console.log("(",startX,startY,")","------------","(",endX,startY,")");
            // console.log("      |","             |");
            // console.log("(",startX,endY,")","------------","(",endX,endY,")");
            // console.log(point.x,point.y);

            // return (point.x > startX && point.x < endX)
            // &&(point.y > startY && point.y < endY);

            if((point.x == startX && point.y == startY) ||
               (point.x == startX && point.y == endY) ||
               (point.x == endX && point.y == startY) ||
               (point.x == endX && point.y == endY)
                ){
                console.log("now point is the same");
                var pointSame = (point.x >= startX && point.x <= endX)
                &&(point.y >= startY && point.y <= endY);
                console.log("pointSame",pointSame);
            }

            return (point.x >= startX && point.x <= endX)
            &&(point.y >= startY && point.y <= endY);
        }

        if(isCrossing){
            rectFir,rectSec
            var firStartX = rectFir.x;
            var firEndX = rectFir.x + rectFir.origin.x;
            var firStartY = rectFir.y;
            var firEndY = rectFir.y + rectFir.origin.y;

            var secStartX = rectSec.x;
            var secEndX = rectSec.x + rectSec.origin.x;
            var secStartY = rectSec.y;
            var secEndY = rectSec.y + rectSec.origin.y;
            console.log("---- now you get not crossing rect start");

            console.log("(",firStartX,firStartY,")","------------","(",firEndX,firStartY,")");
            console.log("      |","             |");
            console.log("(",firStartX,firEndY,")","------------","(",firEndX,firEndY,")");


            console.log("(", secStartX, secStartY, ")", "------------", "(", secEndX, secStartY, ")");
            console.log("      |", "             |");
            console.log("(", secStartX, secEndY, ")", "------------", "(", secEndX, secEndY, ")");
            console.log("---- now you get not crossing rect end");

            // console.log(point.x,point.y);
        }
        return isCrossing;
    };

    // 重新调整宽高
    RPT.resize = function(width, height) {}

    // 移动位置（调整 x y）
    RPT.move = function(offsetX, offsetY) {}

    // 计算合适摆放位置
    RPT.getSuitablePos = function(canvas) {
        var pointX = this.x;
        var pointY = this.y;
        var isTouchRight = false;
        var isTouchLeft = false;
        var isTouchTop = false;
         // console.log(canvas);
         if(this.within(canvas)){
            if(!this.isOverlap(canvas)){
                console.log("----没有重叠 -------");
                return this.origin;
            }else {
                // 这个 参数 应该取自 canvas 的 配置参数
                var span = 2;
                var findPosition = false;
                var positionPos = {};

                var tempArray = getPointAarry(this, span);

                while (!findPosition) {
                    // console.log(span);
                    var tempArray = getPointAarry(this, span);
                    // 过滤掉 如果放置 此 rect ，则 溢出到 canvas 外面的 点
                    //
                    for (var i = 0; i < tempArray.length; i++) {
                        this.origin = tempArray[i];
                        if (!this.isOverlap(canvas, this)) {
                            console.log("-----返回位置-----");
                            // console.log(this);
                            findPosition = true;
                            positionPos = tempArray[i];
                            break;
                        }
                    }
                    span++;
                }
                return positionPos;
            }
         }

         function getPointAarry(centerPoint,gridSpan){
            // console.log(centerPoint.x,centerPoint.y,gridSpan);
            var pointArray = [];
            var centerX = centerPoint.x;
            var centerY = centerPoint.y;
            var minX = centerX - gridSpan;
            var minY = centerY - gridSpan;
            var maxX = centerY + gridSpan;
            var maxY = centerY + gridSpan;
            if(gridSpan<1){
                console.assert("gridSpan should above 0");
            } else {
                for (var i = minX; i <= maxX; i++) {
                    var tempPointOne = new Point(i, minY);
                    var tempPointTwo = new Point(i, maxY);
                    pointArray.push(tempPointOne);
                    pointArray.push(tempPointTwo);
                }
                for (var i = minY; i <= maxY; i++) {
                    var tempPointOne = new Point(minX, i);
                    var tempPointTwo = new Point(maxX, i);
                    pointArray.push(tempPointOne);
                    pointArray.push(tempPointTwo);
                }
            }

            // console.log(pointArray);
            // _.each(pointArray,function(point){
            //     for(var i =0; i< pointArray.length; i++){
            //         if(pointArray[i] != null){
            //             if(point.isEqualTo(pointArray[i])){
            //                 pointArray[i] = null;
            //             }
            //         }
            //     }
            // });

            pointArray = _.uniq(pointArray);
            // console.log(pointArray);
            // console.log(pointArray.length);
            return pointArray;
         }
    }

    RPT.getSuitablePxPosition = function(canvas){
        var pos = this.getSuitablePos(canvas);

        var unit = canvas.unit;
        var pxPos = {};
        console.log("------pos----------",pos);
        console.log("final bitmap pos","pos",pos,"posX",pos.x,"posY",pos.y);
        pxPos.x = pos.x * unit;
        pxPos.y = pos.y * unit;
        return pxPos;
    }

    // 高亮显示 canvas 中的可吸附边界线
    RPT.highlightSnap = function(canvas) {}

    // window.Point = Point;
    // window.Rect = Rect;
    return Rect;
})