define(function(){
    'use strict';

    // 定义坐标的数据结构
    function Point(px, py) {
        if (PPT.isPoint(px)) {
            this.x = px.x;
            this.y = px.y;
        } else {
            this.x = px || 0;
            this.y = py || 0;
        }
    }

    var PPT = Point.prototype;

    // 判断是否是合法的数据格式
    PPT.isPoint = function(p) {
        return _.isObject(p)
            && _.has(p, 'x') && _.isFinite(p.x)
            && _.has(p, 'y') && _.isFinite(p.y);
    }

    // 定义“向量”的数据结构（和 Point 相同）
    var Vector = Point;
    Vector.prototype.isVector = PPT.isPoint;

    // 判断两坐标是否相同
    PPT.isEqualTo = function(p) {
        console.assert(PPT.isPoint(p), 'The argument should be a Point.');
        return (this.x === p.x) && (this.y === p.y);
    }

    // 将坐标平移一个位置
    PPT.move = function(vx, vy) {
        if (this.isVector(vx)) {
            this.x += vx.x;
            this.y += vx.y;
        } else {
            this.x += vx;
            this.y += vy;
        }
    }

    return Point;
});