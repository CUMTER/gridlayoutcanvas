define(['./Point'],function(Point){
    'use strict';
    // var Point = require("");
    // 定义坐标的数据结构
    // function Point(px, py) {
    //     if (PPT.isPoint(px)) {
    //         this.x = px.x;
    //         this.y = px.y;
    //     } else {
    //         this.x = px || 0;
    //         this.y = py || 0;
    //     }
    // }

    // var PPT = Point.prototype;

    // // 判断是否是合法的数据格式
    // PPT.isPoint = function(p) {
    //     return _.isObject(p)
    //         && _.has(p, 'x') && _.isFinite(p.x)
    //         && _.has(p, 'y') && _.isFinite(p.y);
    // }

    // 定义“向量”的数据结构（和 Point 相同）
    // var Vector = Point;
    // Vector.prototype.isVector = PPT.isPoint;

    // // 判断两坐标是否相同
    // PPT.isEqualTo = function(p) {
    //     console.assert(PPT.isPoint(p), 'The argument should be a Point.');
    //     return (this.x === p.x) && (this.y === p.y);
    // }

    // // 将坐标平移一个位置
    // PPT.move = function(vx, vy) {
    //     if (this.isVector(vx)) {
    //         this.x += vx.x;
    //         this.y += vx.y;
    //     } else {
    //         this.x += vx;
    //         this.y += vy;
    //     }
    // }

    function Rect(column, row, origin) {
        this.column = column || 20;
        this.row = row || 12;
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
    RPT.vertex = function(rect) {}

    // 返回当前矩形的实际像素宽高
    RPT.getSize = function(unit) {
        console.assert(_.isNumber(unit), 'unit should be a Number.');
        return {
            width: this.column * unit,
            height: this.row * unit,
        }
    }


    // 判断当前矩形是否落在 canvas 区域内
    RPT.widthin = function(canvas) {
        return (this.x >= 0) && (this.y >= 0)
            && (this.x + this.column <= canvas.column)
            && (this.y + this.row <= canvas.row);
    }

    // 判断当前矩形是否和其他矩形有重叠区域
    RPT.isOverlap = function(rect) {}



    // 重新调整宽高
    RPT.resize = function(width, height) {}

    // 移动位置（调整 x y）
    RPT.move = function(offsetX, offsetY) {}



    // 计算合适摆放位置
    RPT.getSuitablePos = function(canvas) {

    }

    // 高亮显示 canvas 中的可吸附边界线
    RPT.highlightSnap = function(canvas) {}

    // window.Point = Point;
    // window.Rect = Rect;
    return Rect;
})