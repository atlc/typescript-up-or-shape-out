declare let Swal: any;
document.querySelector('#addRectangleButton').addEventListener('click', () =>  new Rectangle(0,0));
document.querySelector('#addSquareButton').addEventListener('click', () =>  new Square(0,0));
document.querySelector('#addCircleButton').addEventListener('click', () => new Circle(0,1,2));
document.querySelector('#addIsocelesButton').addEventListener('click', () =>  new Triangle(0,0));

class Shape {
    name: string;
    div: HTMLElement;
    uuid: string;
    width: number;
    height: number;
    radius: number;

    constructor(name: string, width?: number, height?: number, radius?: number) {
        this.name = name;
        this.uuid = this.createUUID();
        this.width = width;
        this.height = height;
        this.radius = radius;
    }

    createUUID(): string {
        return `${Math.random().toString(36).substr(2, 16)}_${Date.now().toString(36)}`;
    }

    area(): number {
        return (this.width * this.height);
    }

    perimeter(): number {
        return ((this.width * 2) + (this.height * 2));
    }

    describeShape() {
        (<HTMLInputElement>document.querySelector('#infoShapeName')).value = this.name;
        (<HTMLInputElement>document.querySelector('#infoShapeID')).value = this.uuid;
        (<HTMLInputElement>document.querySelector('#infoWidth')).value = (this.width) ? `${this.width} px` : `${this.radius*2} px`;
        (<HTMLInputElement>document.querySelector('#infoHeight')).value = (this.height) ? `${this.height} px` : `${this.radius*2} px`;
        (<HTMLInputElement>document.querySelector('#infoArea')).value = `${this.area().toLocaleString()} px`;
        (<HTMLInputElement>document.querySelector('#infoPerimeter')).value = `${this.perimeter().toLocaleString()} px`;
        if (this.name === 'Triangle') {
            document.querySelector('#radiusLabel').textContent = "Hypotenuse";
            let hypotenuse: number = (this.height * Math.SQRT2);
            (<HTMLInputElement>document.querySelector('#infoRadius')).value = `${Math.round(hypotenuse)} px`;
        } else {
            document.querySelector('#radiusLabel').textContent = "Radius";
            (<HTMLInputElement>document.querySelector('#infoRadius')).value = (this.radius) ? `${this.radius} px` : '4 sides can\'t make a circle :(';
        }
    }

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

    removeShape() {
        this.div.parentElement.removeChild(this.div);
    }
}

class Circle extends Shape {
     constructor(width: number, height: number, radius: number) {
        super('Circle', width, height, radius);
        this.radius = parseFloat((<HTMLInputElement>document.querySelector('#inputCircleRadius')).value);
        this.width = (this.radius * 2);
        this.height = (this.radius * 2);
        this.validateShapeDimensions();
    }

    area(): number {
        return (Math.floor((Math.PI * (this.radius ** 2))));
    }
    
    perimeter(): number {
        return (Math.floor((Math.PI * this.radius * 2)));
    }

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

class Triangle extends Shape {
    constructor(height: number, width: number) {
        super('Triangle', width, height, undefined);
        this.width = parseFloat((<HTMLInputElement>document.querySelector('#inputIsoscelesTriangleHeight')).value);
        this.height = this.width;
        this.validateShapeDimensions();
    }

    area(): number {
        return (Math.floor((this.height ** 2) / 2));
    }

    perimeter(): number {
        return (Math.floor((2 * this.height) + (Math.SQRT2 * this.height)));
    }

    validateShapeDimensions() {
        if (this.height > 580) {
            this.height %= 580;
            this.width = this.height;
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

class Rectangle extends Shape {
    constructor(width: number, height: number) {
        super('Rectangle', width, height, undefined);
        this.width = parseFloat((<HTMLInputElement>document.querySelector('#inputRectangleWidth')).value);
        this.height = parseFloat((<HTMLInputElement>document.querySelector('#inputRectangleHeight')).value);
        this.validateShapeDimensions();
    }

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

class Square extends Shape {
    constructor(width: number, height: number) {
        super('Square', width, height, undefined);
        this.width = parseFloat((<HTMLInputElement>document.querySelector('#inputSquareSideLength')).value);
        this.height = this.width;
        this.validateShapeDimensions();
    }

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