var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvas = document.getElementById('shapeCanvas'); //HTMLCanvasElement
var addRectangleButton = document.getElementById('addRectangleButton'); //HTMLButtonElement
var addSquareButton = document.getElementById('addSquareButton'); //HTMLButtonElement
var addCircleButton = document.getElementById('addCircleButton'); //HTMLButtonElement
var addIsocelesButton = document.getElementById('addIsocelesButton'); //HTMLButtonElement
var Shape = /** @class */ (function () {
    function Shape(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }
    Shape.prototype.area = function () {
        return (this.width * this.height);
    };
    Shape.prototype.perimeter = function () {
        return ((this.width * 2) + (this.height * 2));
    };
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius) {
        var _this = _super.call(this, 'Circle', radius * 2, radius * 2) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.area = function () {
        return (Math.floor((Math.PI * (Math.pow(this.radius, 2)))));
    };
    Circle.prototype.perimeter = function () {
        return (Math.floor((Math.PI * this.radius * 2)));
    };
    return Circle;
}(Shape));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(height) {
        var _this = _super.call(this, 'Triangle', height, height) || this;
        _this.height = height;
        return _this;
    }
    Triangle.prototype.area = function () {
        return (Math.floor((Math.pow(this.height, 2)) / 2));
    };
    Triangle.prototype.perimeter = function () {
        return (Math.floor((2 * this.height) + (Math.SQRT2 * this.height)));
    };
    return Triangle;
}(Shape));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(width, height) {
        var _this = _super.call(this, 'Rectangle', width, height) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    return Rectangle;
}(Shape));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(length) {
        var _this = _super.call(this, 'Square', length, length) || this;
        _this.sideLength = length;
        return _this;
    }
    return Square;
}(Shape));
addRectangleButton.addEventListener('click', generateRectangle);
addSquareButton.addEventListener('click', function () { });
addCircleButton.addEventListener('click', function () { });
addIsocelesButton.addEventListener('click', function () { });
function generateRectangle() {
    var width = parseFloat(document.getElementById('inputRectangleWidth').value);
    var height = parseFloat(document.getElementById('inputRectangleHeight').value);
    var newRect = new Rectangle(width, height);
    draw(newRect);
    describeShape(newRect); // Remove later, strictly for debugging
    console.log(newRect);
}
function draw(shape) {
    // draw shit
    // shapeDiv.addEventListener('click', describeShape(shape));
    // shapeDiv.addEventListener('dblclick', removeShape(shape));
}
function describeShape(shape) {
    var infoShapeName = document.getElementById('infoShapeName');
    var infoWidth = document.getElementById('infoWidth');
    var infoHeight = document.getElementById('infoHeight');
    var infoRadius = document.getElementById('infoRadius');
    var infoArea = document.getElementById('infoArea');
    var infoPerimeter = document.getElementById('infoPerimeter');
    infoShapeName.value = shape.name;
    infoWidth.value = shape.width + " px";
    infoHeight.value = shape.height + " px";
    infoRadius.value = (shape.radius) ? shape.radius + " px" : ' ';
    infoArea.value = shape.area().toLocaleString() + " px";
    infoPerimeter.value = shape.perimeter().toLocaleString() + " px";
}
function removeShape(shape) {
}
