define(['./Rect','Point'],function(Rect,Point){
    'use strict';

    // 原型式继承
    function inherit(Sub, Super) {
        function Bridge() {}
        Bridge.prototype = Super.prototype;
        var proto = new Bridge();
        proto.constructor = Sub;
        Sub.prototype = proto;
    }
    // 多继承
    function mixin(Sub, Super) {
        function Mixin() {};

        // Mixin 继承第一个类的原型
        function Inherit() {}
        Inherit.prototype = Super.prototype;
        var mixinProto = new Inherit();
        mixinProto.constructor = Mixin;
        Mixin.prototype = mixinProto;


        // 将其余类的原型扩展到 Mixin 中（断开proto链接了）
        _.each(_.toArray(arguments).slice(2), function(Type) {
            function Bridge() {}
            Bridge.prototype = Type.prototype;
            _.extend(Mixin.prototype, new Bridge());
        });


        // 子类继承 Mixin 类
        var proto = new Mixin();
        proto.constructor = Sub;
        Sub.prototype = proto;
    }

    function CustomRect(){

    }

    var CRP = CustomRect.prototype;

    CRP.createCustomRect = function(type, options) {
        var customRect = {};
        switch (type) {
            case 'graphic':
                customRect = new GraphicRect(options);
                break;
            case 'text':
                customRect = new TextRect(options);
                break;
            case 'label':
                customRect = new LabelRect(options);
                break;
            case 'table':
                customRect = new TableRect(options);
                break;
            default:
                break;
        }
        return customRect;
    }

    // 自定义图表组件
    function GraphicRect(options) {

        this.type = 'graphic';
        // 默认参数
        var opt = _.extend({
            column: 25,
            row: 18,
            origin: new Point(0, 0),
        }, options);

        this.column = opt.column;
        this.row = opt.row;
        this.init(opt.origin);
        return this;
    }
    // 继承 Rect 组件的原型
    inherit(GraphicRect, Rect);

    var GRPT = GraphicRect.prototype;

    GRPT.load = function(data) {}

    function TextRect(options) {
        this.type = 'text';
        var opt = _.extend({
            column: 19,
            row: 5,
            origin: new Point(0, 0),
        }, options);

        this.column = opt.column;
        this.row = opt.row;
        this.init(opt.origin);
        return this;
    }

    inherit(TextRect, Rect);

    function TableRect(options) {
        this.type = 'table';
        var opt = _.extend({
            column: 20,
            row: 14,
            origin: new Point(0, 0),
        }, options);

        this.column = opt.column;
        this.row = opt.row;
        this.init(opt.origin);
        return this;
    }

    inherit(TableRect, Rect);

    function LabelRect(options) {
        this.type = 'label';
        var opt = _.extend({
            column: 16,
            row: 12,
            origin: new Point(0, 0),
        }, options);

        this.column = opt.column;
        this.row = opt.row;
        this.init(opt.origin);
        return this;
    }

    inherit(LabelRect, Rect);

    function echartsRect(options) {
        this.type = 'echarts';
        var opt = _.extend({
            column: 36,
            row: 21,
            origin: new Point(0, 0),
        }, options);

        this.column = opt.column;
        this.row = opt.row;
        this.init(opt.origin);
        return this;
    }

    inherit(echartsRect, Rect);

    return CustomRect;
})