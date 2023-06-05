var colorInput;
var colorLabel;
var objectsStack = [];
var x1, y1, x2, y2;
var isDrawing = false;
var isSquareButtonPressed = false;

let contenedor;
let cuadrado;
let linea;
let circulo;
let texto;

// Atributos del cuadrado
var cuadradoActual;

function setup() {
  contenedor = select('#canvas');
  cuadrado = select('#cuadrado');
  linea = select('#linea');
  circulo = select('#circulo');
  texto = select('#texto');
  
  var canvas = createCanvas(contenedor.width, contenedor.height);
  canvas.parent('canvas');

  colorInput = select('#color');
  colorLabel = select('#colorLabel');

  colorInput.input(updateColor);

  cuadrado.mousePressed(handleCuadradoPress);
  contenedor.mousePressed(handleCanvasPress);

  // Eventos de escucha para los inputs
  select('#x').input(updateCuadrado);
  select('#y').input(updateCuadrado);
  select('#w').input(updateCuadrado);
  select('#h').input(updateCuadrado);
  select('#color').input(updateCuadrado);
}

function updateColor() {
  var selectedColor = colorInput.value();
  colorLabel.html(selectedColor);
  if (cuadradoActual) {
    // Actualizar el atributo de color del cuadrado actual
    cuadradoActual.color = colorInput.value();
  }
}

function handleCuadradoPress() {
  select('#x').value(null);
      select('#y').value(null);
      select('#w').value(null);
      select('#h').value(null);
      select('#color').value(null);
  isSquareButtonPressed = true;
}

function handleCanvasPress() {
  if (isSquareButtonPressed) {
    x1 = mouseX;
    y1 = mouseY;
    isDrawing = true;
  }
}

function mouseDragged() {
  if (isSquareButtonPressed && isDrawing) {
    x2 = mouseX;
    y2 = mouseY;
  }
}

function mouseReleased() {
  if (isSquareButtonPressed && isDrawing) {
    isDrawing = false;
    isSquareButtonPressed = false;

    var newObj = setSquare(x1, y1, x2 - x1, y2 - y1, colorInput.value());
    objectsStack.push(newObj);
    
    // Establecer el cuadrado actual como el nuevo objeto
    cuadradoActual = newObj;
  }
}

function setSquare(x, y, h, w, colorC) {
  var cuadrado = {
    x: x,
    y: y,
    h: h,
    w: w,
    color: colorC,
    draw: function () {
      fill(colorC);
      stroke(0);
      rect(this.x, this.y, this.h, this.w);
    },

    checkClick: function () {
      if (
        mouseX >= this.x &&
        mouseX <= this.x + this.w &&
        mouseY >= this.y &&
        mouseY <= this.y + this.h
      ) {
        console.log(`me presionaron  ${this.color}`);
        return true;
      }
      return false;
    }
  };
  var liElement = createLiElement("Cuadrado");
  select("#lista").child(liElement);
  return cuadrado;
}

function updateCuadrado() {
  if (cuadradoActual) {
    // Obtener los valores de los inputs
    var newX = parseInt(select('#x').value());
    var newY = parseInt(select('#y').value());
    var newW = parseInt(select('#w').value());
    var newH = parseInt(select('#h').value());
    var newColor = select('#color').value();

    // Actualizar los atributos del cuadrado actual
    cuadradoActual.x = newX;
    cuadradoActual.y = newY;
    cuadradoActual.w = newW;
    cuadradoActual.h = newH;
    cuadradoActual.color = newColor;
  }
}

function draw() {
  background(255);
  for (var i = 0; i < objectsStack.length; i++) {
    var obj = objectsStack[i];
    obj.draw();
  }

  if (isDrawing) {
    noFill();
    stroke(0);
    rect(x1, y1, x2 - x1, y2 - y1);
  }
}

function windowResized() {
  resizeCanvas(contenedor.width, contenedor.height);
}

function mousePressed() {
  for (var i = objectsStack.length - 1; i >= 0; i--) {
    if (objectsStack[i].checkClick()) {
      var cuadrado = objectsStack[i];

      // Establecer el cuadrado actual como el cuadrado seleccionado
      cuadradoActual = cuadrado;

      // Actualizar los valores de los inputs según los atributos del cuadrado seleccionado
      select('#x').value(cuadrado.x);
      select('#y').value(cuadrado.y);
      select('#w').value(cuadrado.w);
      select('#h').value(cuadrado.h);
      select('#color').value(cuadrado.color);

      break;
    }
  }
}

function createLiElement(text) {
  var liElement = createElement("li", text);
  return liElement;
}