/**
 * Definitions of the generic parent shape class.
 */
class Shape {
    name: string;
    div: HTMLElement;
    uuid: string;
    width: number;
    height: number;
    radius: number;
    hypotenuse: number;

    /**
     * Assigns generic Shape attributes.
     * @param name Only required parameter. Supplied in the constructor of each child constructor.
     * @param width Considered optional, though all current shapes will return this (including circles).
     * @param height Considered optional, though all current shapes will return this (including circles).
     * @param radius Considered optional, all constructors but the circle will return `undefined`.
     * @param hypotenuse Considered optional, all constructors but the triangle will return `undefined`.
     */
    constructor(name: string, width?: number, height?: number, radius?: number, hypotenuse?: number) {
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
    createUUID(): string {
        return `${Math.random().toString(36).substr(2, 16)}_${Date.now().toString(36)}`;
    }

    /**
     * @returns Returns the area of a generic Shape object.
     */
    area(): number {
        return (this.width * this.height);
    }

    /**
     * @returns Returns the perimeter of a generic Shape object.
     */
    perimeter(): number {
        return ((this.width * 2) + (this.height * 2));
    }

    /**
     * Updates the side panel with the contextually current shape's attributes.
     * Called by the single-click event listener.
     */
    describeShape() {
        (<HTMLInputElement>document.querySelector('#infoShapeName')).value = this.name;
        (<HTMLInputElement>document.querySelector('#infoShapeID')).value = this.uuid;
        (<HTMLInputElement>document.querySelector('#infoWidth')).value = (this.width) ? `${this.width} px` : `${this.radius*2} px`;
        (<HTMLInputElement>document.querySelector('#infoHeight')).value = (this.height) ? `${this.height} px` : `${this.radius*2} px`;
        (<HTMLInputElement>document.querySelector('#infoArea')).value = `${this.area().toLocaleString()} px`;
        (<HTMLInputElement>document.querySelector('#infoPerimeter')).value = `${this.perimeter().toLocaleString()} px`;
        if (this.name === 'Triangle') {
            document.querySelector('#radiusLabel').textContent = "Hypotenuse";
            (<HTMLInputElement>document.querySelector('#infoRadius')).value = `${Math.round(this.hypotenuse)} px`;
        } else {
            document.querySelector('#radiusLabel').textContent = "Radius";
            (<HTMLInputElement>document.querySelector('#infoRadius')).value = (this.radius) ? `${this.radius} px` : '4 sides can\'t make a circle :(';
        }
    }

    /**
     * Creates the div of the shape drawing itself, assigns the corresponding classes and styles,
     * adds it to the DOM, and assigns the two click listeners to describe the shape upon a single-click,
     * and remove the shape upon a double-click.
     */
    drawShapeElement() {
        this.div = document.createElement('div');
        this.div.id = `${this.uuid}`;
        this.div.className = `shape ${this.name.toLowerCase()}`;
        this.div.style.top = `${Math.floor(Math.random() * (600 - 1 - this.height))}px`;
        this.div.style.left = `${Math.floor(Math.random() * (600 - 1 - this.width))}px`;
    
        if (this.name === 'Triangle') {
            this.div.style.borderTop = `${this.height}px solid yellow`;
            this.div.style.borderRight = `${this.height}px solid transparent`;
        } else {
            this.div.style.width = `${this.width}px`;
            this.div.style.height = `${this.height}px`;    
        }
    
        document.querySelector('#shapeCanvas').appendChild(this.div);
        this.div.addEventListener('click', () => this.describeShape());
        this.div.addEventListener('dblclick', () => this.removeShape());
    }

    /**
     * Removes the contextually current shape.
     * Called by the double-click event listener.
     */
    removeShape() {
        this.div.parentElement.removeChild(this.div);
    }
}

/**
 * Definition for the inherited Circle class.
 */
class Circle extends Shape {
    /**
     * Constructs a circle-specific shape.
     * @param width Inferred as being twice the width of the radius.
     * @param height Inferred as being twice the height of the radius.
     * @param radius The value which is parsed from the Circle input.
     * Sends values to the validator function, which ensures nothing extends past the bounds of the canvas.
     */
     constructor(width: number, height: number, radius: number) {
        super('Circle', width, height, radius, undefined);
        this.radius = parseFloat((<HTMLInputElement>document.querySelector('#inputCircleRadius')).value);
        this.width = (this.radius * 2);
        this.height = (this.radius * 2);
        this.validateShapeDimensions();
    }

    /**
     * @returns Overrides the parent class' area function with the circle-specific area.
     */
    area(): number {
        return (Math.floor((Math.PI * (this.radius ** 2))));
    }
    
    /**
     * @returns Overrides the parent class' area function with the circle-specific perimeter.
     */
    perimeter(): number {
        return (Math.floor((Math.PI * this.radius * 2)));
    }

    /**
     * Ensures that the radius is less than half the width of the canvas. If found to be in excess of
     * that, it will reassign the radius to the modulus of the input, then reassign the height and 
     * width to be twice the size of the new radius.
     * 
     * An error message will be displayed to the user notifying them of the change to their circle's
     * dimensions, then it will call the parent `drawShapeElement()` function.
     */
    validateShapeDimensions() {
        if (this.radius > 295) {
            this.radius %= 295;
            this.width = (this.radius * 2);
            this.height = (this.radius * 2);
            Swal.fire({
                icon: 'error',
                title: "It's too big to be a space station.",
                text: "Your circle's radius was greater than 295 pixels. We squeezed it a little for you!",
                footer: `<a href='https://youtu.be/Gt-5HoqtLGQ'>"If It Don't Fit, Don't Force It" - Kellee Patterson</a>`
            });
        }
        this.drawShapeElement();
    }
}

/**
 * Definition for the inherited Triangle class.
 * This triangle generated is a right isosceles triangle.
 */
class Triangle extends Shape {
    hypotenuse: number;

    /**
     * Constructs a right-angle isosceles triangle.
     * @param height Inferred as equal to the width.
     * @param width The value parsed from the Triangle input. 
     * @param hypotenuse Calculated as one of the sides times the `sqrt(2)`.
     * Sends values to the validator function, which ensures nothing extends past the bounds of the canvas.
     */
    constructor(height: number, width: number, hypotenuse: number) {
        super('Triangle', width, height, undefined, hypotenuse);
        this.width = parseFloat((<HTMLInputElement>document.querySelector('#inputIsoscelesTriangleHeight')).value);
        this.height = this.width;
        this.hypotenuse = (this.height * Math.SQRT2);
        this.validateShapeDimensions();
    }

    /**
     * @returns Overrides the parent class' area function with the isoceles triange-specific area.
     */
    area(): number {
        return (Math.floor((this.height ** 2) / 2));
    }

    /**
     * @returns Overrides the parent class' area function with the isoceles triange-specific perimeter.
     */
    perimeter(): number {
        return (Math.floor((2 * this.height) + (Math.SQRT2 * this.height)));
    }

    /**
     * Ensures that the height & width are less than that of the canvas'. If found to be in excess of
     * that, it will reassign the height & width to the modulus of the input, then reassign the hypotenuse
     * based off the newest figures.
     * 
     * An error message will be displayed to the user notifying them of the change to their triangle's
     * dimensions, then it will call the parent `drawShapeElement()` function.
     */
    validateShapeDimensions() {
        if (this.height > 580) {
            this.height %= 580;
            this.width = this.height;
            this.hypotenuse = (this.height * Math.SQRT2);
            Swal.fire({
                icon: 'error',
                title: "Tri-again!",
                text: "Your triangle's height was greater than 580 pixels. We shrunk it for you!",
                footer: `<a href='https://youtu.be/Gt-5HoqtLGQ'>"If It Don't Fit, Don't Force It" - Kellee Patterson</a>`
            });
        }
        this.drawShapeElement();
    }
}

/**
 * Definition for the inherited Rectangle class.
 */
class Rectangle extends Shape {
    /**
     * Constructs a rectangle object.
     * @param width Parsed from the user's input in the Rectangle width box.
     * @param height Parsed from the user's input in the Rectangle height box.
     * Sends values to the validator function, which ensures nothing extends past the bounds of the canvas.
     */
    constructor(width: number, height: number) {
        super('Rectangle', width, height, undefined, undefined);
        this.width = parseFloat((<HTMLInputElement>document.querySelector('#inputRectangleWidth')).value);
        this.height = parseFloat((<HTMLInputElement>document.querySelector('#inputRectangleHeight')).value);
        this.validateShapeDimensions();
    }

    /**
     * Ensures that the height & width are less than that of the canvas'. If found to be in excess of
     * that, it will reassign the height & width to the modulus of the input.
     * 
     * An error message will be displayed to the user notifying them of the change to their rectangle's
     * dimensions, then it will call the parent `drawShapeElement()` function.
     */
    validateShapeDimensions() {
        if (this.width > 580 || this.height > 580) {
            this.width %= 580;
            this.height %= 580;
            Swal.fire({
                icon: 'error',
                title: "If It Don't Fit, Don't Force It.",
                text: "Your rectangle's width or height was greater than 580 pixels. We trimmed some sides off for you!",
                footer: `<a href='https://youtu.be/Gt-5HoqtLGQ'>"If It Don't Fit, Don't Force It" - Kellee Patterson</a>`
            });
        }
        this.drawShapeElement();
    }
}

/**
 * Definition for the inherited Rectangle class.
 */
class Square extends Shape {
    /**
     * Constructs a square object.
     * @param width Parsed from the user's input in the Square side length box.
     * @param height Inferred to be equal to the width.
     * Sends values to the validator function, which ensures nothing extends past the bounds of the canvas.
     */
    constructor(width: number, height: number) {
        super('Square', width, height, undefined, undefined);
        this.width = parseFloat((<HTMLInputElement>document.querySelector('#inputSquareSideLength')).value);
        this.height = this.width;
        this.validateShapeDimensions();
    }

    /**
     * Ensures that the height & width are less than that of the canvas'. If found to be in excess of
     * that, it will reassign the height & width to the modulus of the input.
     * 
     * An error message will be displayed to the user notifying them of the change to their square's
     * dimensions, then it will call the parent `drawShapeElement()` function.
     */
    validateShapeDimensions() {
        if (this.width > 580) {
            this.width %= 580;
            this.height = this.width;        
            Swal.fire({
                icon: 'error',
                title: "If It Don't Fit, Don't Force It.",
                text: "Your square's side length was greater than 580 pixels. We scaled it down for you!",
                footer: `<a href='https://youtu.be/Gt-5HoqtLGQ'>"If It Don't Fit, Don't Force It" - Kellee Patterson</a>`
            });
        }
        this.drawShapeElement();
    }
}

/**
 * Declaring SweetAlerts as a global variable with a type of any, to help suppress TS warnings since SweetAlerts doesn't have an implicit type
 */
declare let Swal: any;

/**
 * Assigning event listeners to each of the 4 buttons to instantiate a new object of their corresponding
 * shape. The new objects are sent with parameters of 0, since the constructor will always assign the
 * required values based off what it pulls from the inputs. This was simply done to keep this concise,
 * to avoid what should be class-based functional logic from being created outside the class.
 */
document.querySelector('#addRectangleButton').addEventListener('click', () =>  new Rectangle(0,0));
document.querySelector('#addSquareButton').addEventListener('click', () =>  new Square(0,0));
document.querySelector('#addCircleButton').addEventListener('click', () => new Circle(0,0,0));
document.querySelector('#addIsocelesButton').addEventListener('click', () =>  new Triangle(0,0,0));
