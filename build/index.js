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
var Shape = /** @class */ (function () {
    function Shape(name, width, height, radius) {
        this.name = name;
        this.uuid = this.createUUID();
        this.width = width;
        this.height = height;
        this.radius = radius;
    }
    Shape.prototype.createUUID = function () {
        return Math.random().toString(36).substr(2, 16) + "_" + Date.now().toString(36);
    };
    Shape.prototype.area = function () {
        return (this.width * this.height);
    };
    Shape.prototype.perimeter = function () {
        return ((this.width * 2) + (this.height * 2));
    };
    Shape.prototype.describeShape = function () {
        document.querySelector('#infoShapeName').value = this.name;
        document.querySelector('#infoShapeID').value = this.uuid;
        document.querySelector('#infoWidth').value = (this.width) ? this.width + " px" : this.radius * 2 + " px";
        document.querySelector('#infoHeight').value = (this.height) ? this.height + " px" : this.radius * 2 + " px";
        document.querySelector('#infoArea').value = this.area().toLocaleString() + " px";
        document.querySelector('#infoPerimeter').value = this.perimeter().toLocaleString() + " px";
        if (this.name === 'Triangle') {
            document.querySelector('#radiusLabel').textContent = "Hypotenuse";
            var hypotenuse = (this.height * Math.SQRT2);
            document.querySelector('#infoRadius').value = Math.round(hypotenuse) + " px";
        }
        else {
            document.querySelector('#radiusLabel').textContent = "Radius";
            document.querySelector('#infoRadius').value = (this.radius) ? this.radius + " px" : '4 sides can\'t make a circle :(';
        }
    };
    Shape.prototype.drawShapeElement = function () {
        var _this = this;
        console.log(this);
        this.div = document.createElement('div');
        this.div.id = "" + this.uuid;
        this.div.className = "shape " + this.name.toLowerCase();
        this.div.style.top = Math.floor(Math.random() * (600 - 1 - this.height)) + "px";
        this.div.style.left = Math.floor(Math.random() * (600 - 1 - this.width)) + "px";
        if (this.name === 'Triangle') {
            this.div.style.borderTop = this.height + "px solid yellow";
            this.div.style.borderRight = this.height + "px solid transparent";
        }
        else {
            this.div.style.width = this.width + "px";
            this.div.style.height = this.height + "px";
        }
        document.querySelector('#shapeCanvas').appendChild(this.div);
        this.div.addEventListener('click', function () { return _this.describeShape(); });
        this.div.addEventListener('dblclick', function () { return _this.removeShape(); });
    };
    Shape.prototype.removeShape = function () {
        this.div.parentElement.removeChild(this.div);
    };
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(width, height, radius) {
        var _this = _super.call(this, 'Circle', width, height, radius) || this;
        _this.radius = parseFloat(document.querySelector('#inputCircleRadius').value);
        _this.width = (_this.radius * 2);
        _this.height = (_this.radius * 2);
        _this.validateShapeDimensions();
        return _this;
    }
    Circle.prototype.area = function () {
        return (Math.floor((Math.PI * (Math.pow(this.radius, 2)))));
    };
    Circle.prototype.perimeter = function () {
        return (Math.floor((Math.PI * this.radius * 2)));
    };
    Circle.prototype.validateShapeDimensions = function () {
        if (this.radius > 295) {
            this.radius %= 295;
            this.width = (this.radius * 2);
            this.height = (this.radius * 2);
            Swal.fire({
                icon: 'error',
                title: "It's too big to be a space station.",
                text: "Your circle's radius was greater than 295 pixels. We squeezed it a little for you!",
                footer: "<a href='https://youtu.be/Gt-5HoqtLGQ'>\"If It Don't Fit, Don't Force It\" - Kellee Patterson</a>"
            });
        }
        this.drawShapeElement();
    };
    return Circle;
}(Shape));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(height, width) {
        var _this = _super.call(this, 'Triangle', width, height, undefined) || this;
        _this.width = parseFloat(document.querySelector('#inputIsoscelesTriangleHeight').value);
        _this.height = _this.width;
        _this.validateShapeDimensions();
        return _this;
    }
    Triangle.prototype.area = function () {
        return (Math.floor((Math.pow(this.height, 2)) / 2));
    };
    Triangle.prototype.perimeter = function () {
        return (Math.floor((2 * this.height) + (Math.SQRT2 * this.height)));
    };
    Triangle.prototype.validateShapeDimensions = function () {
        if (this.height > 580) {
            this.height %= 580;
            this.width = this.height;
            Swal.fire({
                icon: 'error',
                title: "Tri-again!",
                text: "Your triangle's height was greater than 580 pixels. We shrunk it for you!",
                footer: "<a href='https://youtu.be/Gt-5HoqtLGQ'>\"If It Don't Fit, Don't Force It\" - Kellee Patterson</a>"
            });
        }
        this.drawShapeElement();
    };
    return Triangle;
}(Shape));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(width, height) {
        var _this = _super.call(this, 'Rectangle', width, height, undefined) || this;
        _this.width = parseFloat(document.querySelector('#inputRectangleWidth').value);
        _this.height = parseFloat(document.querySelector('#inputRectangleHeight').value);
        _this.validateShapeDimensions();
        return _this;
    }
    Rectangle.prototype.validateShapeDimensions = function () {
        if (this.width > 580 || this.height > 580) {
            this.width %= 580;
            this.height %= 580;
            Swal.fire({
                icon: 'error',
                title: "If It Don't Fit, Don't Force It.",
                text: "Your rectangle's width or height was greater than 580 pixels. We trimmed some sides off for you!",
                footer: "<a href='https://youtu.be/Gt-5HoqtLGQ'>\"If It Don't Fit, Don't Force It\" - Kellee Patterson</a>"
            });
        }
        this.drawShapeElement();
    };
    return Rectangle;
}(Shape));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(width, height) {
        var _this = _super.call(this, 'Square', width, height, undefined) || this;
        _this.width = parseFloat(document.querySelector('#inputSquareSideLength').value);
        _this.height = _this.width;
        _this.validateShapeDimensions();
        return _this;
    }
    Square.prototype.validateShapeDimensions = function () {
        if (this.width > 580) {
            this.width %= 580;
            this.height = this.width;
            Swal.fire({
                icon: 'error',
                title: "If It Don't Fit, Don't Force It.",
                text: "Your square's side length was greater than 580 pixels. We scaled it down for you!",
                footer: "<a href='https://youtu.be/Gt-5HoqtLGQ'>\"If It Don't Fit, Don't Force It\" - Kellee Patterson</a>"
            });
        }
        this.drawShapeElement();
    };
    return Square;
}(Shape));
document.querySelector('#addRectangleButton').addEventListener('click', function () { return new Rectangle(0, 0); });
document.querySelector('#addSquareButton').addEventListener('click', function () { return new Square(0, 0); });
document.querySelector('#addCircleButton').addEventListener('click', function () { return new Circle(0, 1, 2); });
document.querySelector('#addIsocelesButton').addEventListener('click', function () { return new Triangle(0, 0); });
