let canvas:HTMLElement = document.getElementById('shapeCanvas'); //HTMLCanvasElement

const addRectangleButton:HTMLElement = document.getElementById('addRectangleButton'); //HTMLButtonElement
const addSquareButton:HTMLElement = document.getElementById('addSquareButton'); //HTMLButtonElement
const addCircleButton:HTMLElement = document.getElementById('addCircleButton'); //HTMLButtonElement
const addIsocelesButton:HTMLElement = document.getElementById('addIsocelesButton'); //HTMLButtonElement

class Shape {
    name: string;
    width: number;
    height: number;

    constructor(name: string, width?: number, height?: number) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    area(): number {
        return (this.width * this.height);
    }

    perimeter(): number {
        return ((this.width * 2) + (this.height * 2));
    }
}

class Circle extends Shape {
    radius: number;

    constructor(radius: number) {
        super('Circle', radius*2, radius*2);
        this.radius = radius;
    }

    area(): number {
        return (Math.floor((Math.PI * (this.radius ** 2))));
    }
    
    perimeter(): number {
        return (Math.floor((Math.PI * this.radius * 2)));
    }
}

class Triangle extends Shape {
    height: number;

    constructor(height: number) {
        super('Triangle', height, height);
        this.height = height;
    }

    area(): number {
        return (Math.floor((this.height ** 2) / 2));
    }

    perimeter(): number {
        return (Math.floor((2 * this.height) + (Math.SQRT2 * this.height)));
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        super('Rectangle', width, height);
        this.width = width;
        this.height = height;
    }
}

class Square extends Shape {
    sideLength: number;

    constructor(length: number) {
        super('Square', length, length);
        this.sideLength = length;
    }
}

addRectangleButton.addEventListener('click', generateRectangle);
addSquareButton.addEventListener('click', function() {  });
addCircleButton.addEventListener('click', function() {  });
addIsocelesButton.addEventListener('click', function() {  });

function generateRectangle() {
    let width: number = parseFloat((<HTMLInputElement>document.getElementById('inputRectangleWidth')).value);
    let height: number = parseFloat((<HTMLInputElement>document.getElementById('inputRectangleHeight')).value);
    let newRect: Rectangle = new Rectangle(width, height);
    draw(newRect);
    describeShape(newRect); // Remove later, strictly for debugging
    console.log(newRect)
}

function draw(shape) {
    // draw shit
    // shapeDiv.addEventListener('click', describeShape(shape));
    // shapeDiv.addEventListener('dblclick', removeShape(shape));
}

function describeShape(shape) {
    let infoShapeName:HTMLElement = document.getElementById('infoShapeName');
    let infoWidth:HTMLElement = document.getElementById('infoWidth');
    let infoHeight:HTMLElement = document.getElementById('infoHeight');
    let infoRadius:HTMLElement = document.getElementById('infoRadius');
    let infoArea:HTMLElement = document.getElementById('infoArea');
    let infoPerimeter:HTMLElement = document.getElementById('infoPerimeter');

    (<HTMLInputElement>infoShapeName).value = shape.name;
    (<HTMLInputElement>infoWidth).value = `${shape.width} px`;
    (<HTMLInputElement>infoHeight).value = `${shape.height} px`;
    (<HTMLInputElement>infoRadius).value = (shape.radius) ? `${shape.radius} px` : ' ';
    (<HTMLInputElement>infoArea).value = `${shape.area().toLocaleString()} px`;
    (<HTMLInputElement>infoPerimeter).value = `${shape.perimeter().toLocaleString()} px`;
}

function removeShape(shape) {

}