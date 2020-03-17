let Swal: any;
// let canvas: HTMLElement = <HTMLCanvasElement>document.getElementById('shapeCanvas');
let canvas: HTMLElement = document.getElementById('shapeCanvas');

const addRectangleButton: HTMLElement = <HTMLButtonElement>document.getElementById('addRectangleButton');
const addSquareButton: HTMLElement = <HTMLButtonElement>document.getElementById('addSquareButton');
const addCircleButton: HTMLElement = <HTMLButtonElement>document.getElementById('addCircleButton');
const addIsocelesButton: HTMLElement = <HTMLButtonElement>document.getElementById('addIsocelesButton');

addRectangleButton.addEventListener('click', generateRectangle);
addSquareButton.addEventListener('click', generateSquare);
addCircleButton.addEventListener('click', generateCircle);
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
        if (width > 600 || height > 600) {
            Swal.fire({
                icon: 'error',
                title: "If It Don't Fit, Don't Force It.",
                text: "Your shape's width or height was greater than 600 pixels. We reset both attributes to 150 pixels for you!",
                footer: `<a href='https://youtu.be/Gt-5HoqtLGQ'>"If It Don't Fit, Don't Force It" - Kellee Patterson</a>`
              });
            this.width = 150;
            this.height = 150;
        }
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
        if (radius > 600) {
            Swal.fire({
                icon: 'error',
                title: "It's too big to be a space station.",
                text: "Your circle's radius was greater than 300 pixels. We reset it to 125 pixels for you!"
              });
            this.radius = 125;
        }
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
}

function generateSquare() {
    let length: number = parseFloat((<HTMLInputElement>document.getElementById('inputSquareSideLength')).value);
    let newSquare: Square = new Square(length);
    draw(newSquare);
}

function generateCircle() {
    let radius: number = parseFloat((<HTMLInputElement>document.getElementById('inputCircleRadius')).value);
    let newCircle: Circle = new Circle(radius);
    draw(newCircle);
}

function generateTriangle() {
    let height: number = parseFloat((<HTMLInputElement>document.getElementById('inputIsoscelesTriangleHeight')).value);
    let newTriangle: Triangle = new Triangle(height);
    draw(newTriangle);
}

function draw(shape) {
    let shapeDiv:HTMLDivElement = document.createElement('div');
    shapeDiv.id = `${shape.id}`;
    shapeDiv.className = `shape ${shape.name.toLowerCase()}`;
    shapeDiv.style.top = `${Math.floor(Math.random() * (600 - 1 - shape.height))}px`;
    shapeDiv.style.left = `${Math.floor(Math.random() * (600 - 1 - shape.width))}px`;

    if (shape.name === 'Triangle') {
        shapeDiv.style.borderTop = `${shape.height}px solid yellow`;
        shapeDiv.style.borderRight = `${shape.height}px solid transparent`;
    } else {
        shapeDiv.style.width = `${shape.width}px`;
        shapeDiv.style.height = `${shape.height}px`;    
    }

    shapeDiv.addEventListener('click', function() { describeShape(shape) });
    shapeDiv.addEventListener('dblclick', function() { removeShape(shape) });
    canvas.append(shapeDiv);
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
    let shapeID = document.getElementById(shape.id);
    shapeID.parentElement.removeChild(shapeID);
}