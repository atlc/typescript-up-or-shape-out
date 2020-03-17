let canvas:HTMLElement = <HTMLCanvasElement>document.getElementById('shapeCanvas');

const addRectangleButton:HTMLElement = <HTMLButtonElement>document.getElementById('addRectangleButton');
addRectangleButton.addEventListener('click', generateRectangle);

const addSquareButton:HTMLElement = <HTMLButtonElement>document.getElementById('addSquareButton');
addSquareButton.addEventListener('click', generateSquare);

const addCircleButton:HTMLElement = <HTMLButtonElement>document.getElementById('addCircleButton');
addCircleButton.addEventListener('click', generateCircle);

const addIsocelesButton:HTMLElement = <HTMLButtonElement>document.getElementById('addIsocelesButton');
addIsocelesButton.addEventListener('click', generateTriangle);


class Shape {
    name: string;
    id: string;
    width: number;
    height: number;

    constructor(name: string, width?: number, height?: number) {
        this.name = name;
        this.id = this.createID();
        this.width = width;
        this.height = height;
    }

    createID(): string {
        return `${Math.random().toString(36).substr(2, 16)}_${Date.now().toString(36)}`;
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

function generateRectangle() {
    let width: number = parseFloat((<HTMLInputElement>document.getElementById('inputRectangleWidth')).value);
    let height: number = parseFloat((<HTMLInputElement>document.getElementById('inputRectangleHeight')).value);
    let newRect: Rectangle = new Rectangle(width, height);
    draw(newRect);
    describeShape(newRect); // Remove later, strictly for debugging
}

function generateSquare() {
    let length: number = parseFloat((<HTMLInputElement>document.getElementById('inputSquareSideLength')).value);
    let newSquare: Square = new Square(length);
    draw(newSquare);
    describeShape(newSquare);
}

function generateCircle() {
    let radius: number = parseFloat((<HTMLInputElement>document.getElementById('inputCircleRadius')).value);
    let newCircle: Circle = new Circle(radius);
    draw(newCircle);
    describeShape(newCircle);
}

function generateTriangle() {
    let height: number = parseFloat((<HTMLInputElement>document.getElementById('inputIsoscelesTriangleHeight')).value);
    let newTriangle: Triangle = new Triangle(height);
    draw(newTriangle);
    describeShape(newTriangle);
}

function draw(shape) {
    // draw shit
    // `<div id="${shape.id}"></div>`
    // shapeDiv.addEventListener('click', describeShape(shape));
    // shapeDiv.addEventListener('dblclick', removeShape(shape));
}

function describeShape(shape) {
    (<HTMLInputElement>document.getElementById('infoShapeName')).value = shape.name;
    (<HTMLInputElement>document.getElementById('infoShapeID')).value = shape.id;
    (<HTMLInputElement>document.getElementById('infoWidth')).value = `${shape.width} px`;
    (<HTMLInputElement>document.getElementById('infoHeight')).value = `${shape.height} px`;
    (<HTMLInputElement>document.getElementById('infoRadius')).value = (shape.radius) ? `${shape.radius} px` : ' ';
    (<HTMLInputElement>document.getElementById('infoArea')).value = `${shape.area().toLocaleString()} px`;
    (<HTMLInputElement>document.getElementById('infoPerimeter')).value = `${shape.perimeter().toLocaleString()} px`;
}

function removeShape(shape) {
    shape.parentElement.removeChild(shape);
    // document.getElementById(`${shape.id}`).parentElement.removeChild(document.getElementById(`${shape.id}`))
}