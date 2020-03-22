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
/**
 * Definitions of the generic parent shape class.
 */
var Shape = /** @class */ (function () {
    /**
     * Assigns generic Shape attributes.
     * @param name Only required parameter. Supplied in the constructor of each child constructor.
     * @param width Considered optional, though all current shapes will return this (including circles).
     * @param height Considered optional, though all current shapes will return this (including circles).
     * @param radius Considered optional, all constructors but the circle will return `undefined`.
     * @param hypotenuse Considered optional, all constructors but the triangle will return `undefined`.
     */
    function Shape(name, width, height, radius, hypotenuse) {
        this.name = name;
        this.uuid = this.createUUID();
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.hypotenuse = hypotenuse;
    }
    /**
     * @returns Returns a base36 string of `$randomSeed_$timestamp`.
     *
     * Though unneccessary in this project, and technically not a functional component,
     * it is attached to the corresponding shape as the ID on the div. The only time which
     * it is used is when shape attributes are being displayed in the side panel.
     */
    Shape.prototype.createUUID = function () {
        return Math.random().toString(36).substr(2, 16) + "_" + Date.now().toString(36);
    };
    /**
     * @returns Returns the area of a generic Shape object.
     */
    Shape.prototype.area = function () {
        return (this.width * this.height);
    };
    /**
     * @returns Returns the perimeter of a generic Shape object.
     */
    Shape.prototype.perimeter = function () {
        return ((this.width * 2) + (this.height * 2));
    };
    /**
     * Updates the side panel with the contextually current shape's attributes.
     * Called by the single-click event listener.
     */
    Shape.prototype.describeShape = function () {
        document.querySelector('#infoShapeName').value = this.name;
        document.querySelector('#infoShapeID').value = this.uuid;
        document.querySelector('#infoWidth').value = (this.width) ? this.width + " px" : this.radius * 2 + " px";
        document.querySelector('#infoHeight').value = (this.height) ? this.height + " px" : this.radius * 2 + " px";
        document.querySelector('#infoArea').value = this.area().toLocaleString() + " px";
        document.querySelector('#infoPerimeter').value = this.perimeter().toLocaleString() + " px";
        if (this.name === 'Triangle') {
            document.querySelector('#radiusLabel').textContent = "Hypotenuse";
            document.querySelector('#infoRadius').value = Math.round(this.hypotenuse) + " px";
        }
        else {
            document.querySelector('#radiusLabel').textContent = "Radius";
            document.querySelector('#infoRadius').value = (this.radius) ? this.radius + " px" : '4 sides can\'t make a circle :(';
        }
    };
    /**
     * Creates the div of the shape drawing itself, assigns the corresponding classes and styles,
     * adds it to the DOM, and assigns the two click listeners to describe the shape upon a single-click,
     * and remove the shape upon a double-click.
     */
    Shape.prototype.drawShapeElement = function () {
        var _this = this;
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
    /**
     * Removes the contextually current shape.
     * Called by the double-click event listener.
     */
    Shape.prototype.removeShape = function () {
        this.div.parentElement.removeChild(this.div);
    };
    return Shape;
}());
/**
 * Definition for the inherited Circle class.
 */
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    /**
     * Constructs a circle-specific shape.
     * @param width Inferred as being twice the width of the radius.
     * @param height Inferred as being twice the height of the radius.
     * @param radius The value which is parsed from the Circle input.
     * Sends values to the validator function, which ensures nothing extends past the bounds of the canvas.
     */
    function Circle(width, height, radius) {
        var _this = _super.call(this, 'Circle', width, height, radius, undefined) || this;
        _this.radius = parseFloat(document.querySelector('#inputCircleRadius').value);
        _this.width = (_this.radius * 2);
        _this.height = (_this.radius * 2);
        _this.validateShapeDimensions();
        return _this;
    }
    /**
     * @returns Overrides the parent class' area function with the circle-specific area.
     */
    Circle.prototype.area = function () {
        return (Math.floor((Math.PI * (Math.pow(this.radius, 2)))));
    };
    /**
     * @returns Overrides the parent class' area function with the circle-specific perimeter.
     */
    Circle.prototype.perimeter = function () {
        return (Math.floor((Math.PI * this.radius * 2)));
    };
    /**
     * Ensures that the radius is less than half the width of the canvas. If found to be in excess of
     * that, it will reassign the radius to the modulus of the input, then reassign the height and
     * width to be twice the size of the new radius.
     *
     * An error message will be displayed to the user notifying them of the change to their circle's
     * dimensions, then it will call the parent `drawShapeElement()` function.
     */
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
/**
 * Definition for the inherited Triangle class.
 * This triangle generated is a right isosceles triangle.
 */
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    /**
     * Constructs a right-angle isosceles triangle.
     * @param height Inferred as equal to the width.
     * @param width The value parsed from the Triangle input.
     * @param hypotenuse Calculated as one of the sides times the `sqrt(2)`.
     * Sends values to the validator function, which ensures nothing extends past the bounds of the canvas.
     */
    function Triangle(height, width, hypotenuse) {
        var _this = _super.call(this, 'Triangle', width, height, undefined, hypotenuse) || this;
        _this.width = parseFloat(document.querySelector('#inputIsoscelesTriangleHeight').value);
        _this.height = _this.width;
        _this.hypotenuse = (_this.height * Math.SQRT2);
        _this.validateShapeDimensions();
        return _this;
    }
    /**
     * @returns Overrides the parent class' area function with the isoceles triange-specific area.
     */
    Triangle.prototype.area = function () {
        return (Math.floor((Math.pow(this.height, 2)) / 2));
    };
    /**
     * @returns Overrides the parent class' area function with the isoceles triange-specific perimeter.
     */
    Triangle.prototype.perimeter = function () {
        return (Math.floor((2 * this.height) + (Math.SQRT2 * this.height)));
    };
    /**
     * Ensures that the height & width are less than that of the canvas'. If found to be in excess of
     * that, it will reassign the height & width to the modulus of the input, then reassign the hypotenuse
     * based off the newest figures.
     *
     * An error message will be displayed to the user notifying them of the change to their triangle's
     * dimensions, then it will call the parent `drawShapeElement()` function.
     */
    Triangle.prototype.validateShapeDimensions = function () {
        if (this.height > 580) {
            this.height %= 580;
            this.width = this.height;
            this.hypotenuse = (this.height * Math.SQRT2);
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
/**
 * Definition for the inherited Rectangle class.
 */
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    /**
     * Constructs a rectangle object.
     * @param width Parsed from the user's input in the Rectangle width box.
     * @param height Parsed from the user's input in the Rectangle height box.
     * Sends values to the validator function, which ensures nothing extends past the bounds of the canvas.
     */
    function Rectangle(width, height) {
        var _this = _super.call(this, 'Rectangle', width, height, undefined, undefined) || this;
        _this.width = parseFloat(document.querySelector('#inputRectangleWidth').value);
        _this.height = parseFloat(document.querySelector('#inputRectangleHeight').value);
        _this.validateShapeDimensions();
        return _this;
    }
    /**
     * Ensures that the height & width are less than that of the canvas'. If found to be in excess of
     * that, it will reassign the height & width to the modulus of the input.
     *
     * An error message will be displayed to the user notifying them of the change to their rectangle's
     * dimensions, then it will call the parent `drawShapeElement()` function.
     */
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
/**
 * Definition for the inherited Rectangle class.
 */
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    /**
     * Constructs a square object.
     * @param width Parsed from the user's input in the Square side length box.
     * @param height Inferred to be equal to the width.
     * Sends values to the validator function, which ensures nothing extends past the bounds of the canvas.
     */
    function Square(width, height) {
        var _this = _super.call(this, 'Square', width, height, undefined, undefined) || this;
        _this.width = parseFloat(document.querySelector('#inputSquareSideLength').value);
        _this.height = _this.width;
        _this.validateShapeDimensions();
        return _this;
    }
    /**
     * Ensures that the height & width are less than that of the canvas'. If found to be in excess of
     * that, it will reassign the height & width to the modulus of the input.
     *
     * An error message will be displayed to the user notifying them of the change to their square's
     * dimensions, then it will call the parent `drawShapeElement()` function.
     */
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
/**
 * Assigning event listeners to each of the 4 buttons to instantiate a new object of their corresponding
 * shape. The new objects are sent with parameters of 0, since the constructor will always assign the
 * required values based off what it pulls from the inputs. This was simply done to keep this concise,
 * to avoid what should be class-based functional logic from being created outside the class.
 */
document.querySelector('#addRectangleButton').addEventListener('click', function () { return new Rectangle(0, 0); });
document.querySelector('#addSquareButton').addEventListener('click', function () { return new Square(0, 0); });
document.querySelector('#addCircleButton').addEventListener('click', function () { return new Circle(0, 0, 0); });
document.querySelector('#addIsocelesButton').addEventListener('click', function () { return new Triangle(0, 0, 0); });
