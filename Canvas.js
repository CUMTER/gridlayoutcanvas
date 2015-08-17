define(function(){
    // 'use strict';

    function Canvas(width, height) {
        this.width = width || 825;
        this.height = height || 600;
        this.rects = [];

        this.baselineX = [];
        this.baselineY = [];
        this.baseline = { x: this.baselineX, y: this.baselineY };
        // console.log("canvas",this);
        this.resize();
        this.initBitmap();
    }

    var CPT = Canvas.prototype;

    // 设置最大最小宽度和最大最小列数
    CPT.minWidth = 480;
    CPT.maxWidth = 2000;
    CPT.minColumn = 40;
    CPT.maxColumn = 100;

    // 计算缩放比率
    function log(a, x) { return Math.log(x) / Math.log(a); }
    CPT.ratio = log(CPT.maxWidth/CPT.minWidth, CPT.maxColumn/CPT.minColumn);
    console.log(CPT);

    // 根据宽高，重新计算画布相关参数
    CPT.resize = function(width, height) {
        var width = width || this.width;
        var height = height || this.height;

        // 根据宽度计算列数
        var col = Math.pow(width/CPT.minWidth, CPT.ratio)*CPT.minColumn;

        // 调整列数向 5 取整
        this.column = Math.round(col/5) * 5;

        // 定义每单位所占的像素数
        Object.defineProperty(this, 'unit', {
            enumerable: true,
            get: function() {
                return width / this.column;
            }
        });

        this.row = Math.round(height / this.unit);
        this.height = this.row * this.unit; // 调整高度
    }

    // 初始化 bitmap
    CPT.initBitmap = function() {
        var column = this.column || 55;
        var row = this.row || 40;
        this.bitmap = [];
        for (var r = 0; r < row; ++r) {
            var arrayRow = [];
            for (var col = 0; col < column; ++col) {
                arrayRow.push(false);
            }
            this.bitmap.push(arrayRow);
        }
    }

    // 放入新的图形
    CPT.push = function(rect) {
        console.assert(rect instanceof Rect, 'The argument is not a Rect.');

        // Array.prototype.push.apply(this.rects, arguments);
        this.rects = _.union(this.rects, _.toArray(arguments));
        this.updateBitmap();
    }

    // 重新计算 bitmap 中的数据
    CPT.updateBitmap = function() {
        var self = this;
        _.each(this.rects, function(rect) {
            rect.each(function(x, y) {
                self.bitmap[rect.x+x][rect.y+y] = true;
            });
        });
    }

    // 判断某位置是否可用
    CPT.isAvaiable = function(x, y) {
        if (_.isFinite(x) && _.isFinite(y)) {
            if (x >= this.column || y >= this.row) {
                return false;
            }
            return !!this.bitmap[x][y];
        }
        return false;
    }

    // 给 rects 数组排序
    CPT.sort = function() {}

    // 自动重新布局（）
    CPT.autoLayout = function(x, y) {}

    return Canvas;
})
