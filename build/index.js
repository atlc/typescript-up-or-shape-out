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
var Swal;
// let canvas: HTMLElement = <HTMLCanvasElement>document.getElementById('shapeCanvas');
var canvas = document.getElementById('shapeCanvas');
var addRectangleButton = document.getElementById('addRectangleButton');
var addSquareButton = document.getElementById('addSquareButton');
var addCircleButton = document.getElementById('addCircleButton');
var addIsocelesButton = document.getElementById('addIsocelesButton');
addRectangleButton.addEventListener('click', generateRectangle);
addSquareButton.addEventListener('click', generateSquare);
addCircleButton.addEventListener('click', generateCircle);
addIsocelesButton.addEventListener('click', generateTriangle);
var Shape = /** @class */ (function () {
    function Shape(name, width, height) {
        this.name = name;
        this.id = this.createID();
        this.width = width;
        this.height = height;
        if (width > 600 || height > 600) {
            Swal.fire({
                icon: 'error',
                title: "If It Don't Fit, Don't Force It.",
                text: "Your shape's width or height was greater than 600 pixels. We reset both attributes to 150 pixels for you!",
                footer: "<a href='https://youtu.be/Gt-5HoqtLGQ'>\"If It Don't Fit, Don't Force It\" - Kellee Patterson</a>"
            });
            this.width = 150;
            this.height = 150;
        }
    }
    Shape.prototype.createID = function () {
        return Math.random().toString(36).substr(2, 16) + "_" + Date.now().toString(36);
    };
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
        if (radius > 600) {
            Swal.fire({
                icon: 'error',
                title: "It's too big to be a space station.",
                text: "Your circle's radius was greater than 300 pixels. We reset it to 125 pixels for you!"
            });
            _this.radius = 125;
        }
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
function generateRectangle() {
    var width = parseFloat(document.getElementById('inputRectangleWidth').value);
    var height = parseFloat(document.getElementById('inputRectangleHeight').value);
    var newRect = new Rectangle(width, height);
    draw(newRect);
}
function generateSquare() {
    var length = parseFloat(document.getElementById('inputSquareSideLength').value);
    var newSquare = new Square(length);
    draw(newSquare);
}
function generateCircle() {
    var radius = parseFloat(document.getElementById('inputCircleRadius').value);
    var newCircle = new Circle(radius);
    draw(newCircle);
}
function generateTriangle() {
    var height = parseFloat(document.getElementById('inputIsoscelesTriangleHeight').value);
    var newTriangle = new Triangle(height);
    draw(newTriangle);
}
function draw(shape) {
    var shapeDiv = document.createElement('div');
    shapeDiv.id = "" + shape.id;
    shapeDiv.className = "shape " + shape.name.toLowerCase();
    shapeDiv.style.top = Math.floor(Math.random() * (600 - 1 - shape.height)) + "px";
    shapeDiv.style.left = Math.floor(Math.random() * (600 - 1 - shape.width)) + "px";
    if (shape.name === 'Triangle') {
        shapeDiv.style.borderTop = shape.height + "px solid yellow";
        shapeDiv.style.borderRight = shape.height + "px solid transparent";
    }
    else {
        shapeDiv.style.width = shape.width + "px";
        shapeDiv.style.height = shape.height + "px";
    }
    shapeDiv.addEventListener('click', function () { describeShape(shape); });
    shapeDiv.addEventListener('dblclick', function () { removeShape(shape); });
    canvas.append(shapeDiv);
}
function describeShape(shape) {
    document.getElementById('infoShapeName').value = shape.name;
    document.getElementById('infoShapeID').value = shape.id;
    document.getElementById('infoWidth').value = shape.width + " px";
    document.getElementById('infoHeight').value = shape.height + " px";
    document.getElementById('infoRadius').value = (shape.radius) ? shape.radius + " px" : ' ';
    document.getElementById('infoArea').value = shape.area().toLocaleString() + " px";
    document.getElementById('infoPerimeter').value = shape.perimeter().toLocaleString() + " px";
}
function removeShape(shape) {
    var shapeID = document.getElementById(shape.id);
    shapeID.parentElement.removeChild(shapeID);
}
