var colorInput;
var colorLabel;
var objectsStack = [];
var x1, y1, x2, y2;
var isDrawing = false;
var isSquareButtonPressed = false;
var isCircleButtonPressed = false;
var isLineButtonPressed = false;
var figuraActual;

var startX;
var startY;


let contenedor;
let cuadrado;
let linea;
let circulo;
let texto;
let dragButton;

var cuadradoActual;
var circuloActual;
var lineaActual;

var isDraggingEnabled = false;


function enableDragging() {
  isDraggingEnabled = true;
}

function setup() {
  contenedor = select('#canvas');
  cuadrado = select('#cuadrado');
  linea = select('#linea');
  circulo = select('#circulo');
  texto = select('#texto');
  dragButton = select('#dragFigure');
  
  
  var canvas = createCanvas(contenedor.width, contenedor.height);
  canvas.parent('canvas');

  colorInput = select('#color');
  colorLabel = select('#colorLabel');

  colorInput.input(updateColor);
  
  linea.mousePressed(handleLinePress);
  cuadrado.mousePressed(handleCuadradoPress);
  circulo.mousePressed(handleCirclePress);
  contenedor.mousePressed(handleCanvasPress);
  dragButton.mousePressed(enableDragging);

  select('#x').input(updateCuadrado);
  select('#y').input(updateCuadrado);
  select('#w').input(updateCuadrado);
  select('#h').input(updateCuadrado);
  select('#color').input(updateCuadrado);

  select('#x').input(updateCirculo);
  select('#y').input(updateCirculo);
  select('#w').input(updateCirculo);
  select('#h').input(updateCirculo);
  select('#color').input(updateCirculo);
}

function updateColor() {
  var selectedColor = colorInput.value();
  colorLabel.html(selectedColor);
  if (cuadradoActual && circleActual) {
    cuadradoActual.color = colorInput.value();
    circuloActual.color = colorInput.value();
  }
}

//cuadrado
function handleCuadradoPress() {
  disableDragging()
  select('#x').value(null);
      select('#y').value(null);
      select('#w').value(null);
      select('#h').value(null);
      // select('#color').value(null);
  isSquareButtonPressed = true;
}
//circulo
function handleCirclePress() {
  disableDragging()
  select('#x').value(null);
      select('#y').value(null);
      select('#w').value(null);
      select('#h').value(null);
      // select('#color').value(null);
  isCircleButtonPressed = true;
}

//linea
function handleLinePress() {
  disableDragging();
  select('#x').value(null);
  select('#y').value(null);
  select('#w').value(null);
  select('#h').value(null);
  isLineButtonPressed = true;
}

function handleCanvasPress() {
  if (isSquareButtonPressed) {
    x1 = mouseX;
    y1 = mouseY;
    isDrawing = true;
  }
  if (isCircleButtonPressed) {
    x1 = mouseX;
    y1 = mouseY;
    isDrawing = true;
  }
  if (isLineButtonPressed) {
    x1 = mouseX;
    y1 = mouseY;
    isDrawing = true;
  }
  if (isDraggingEnabled) {
    for (var i = objectsStack.length - 1; i >= 0; i--) {
      if (objectsStack[i].checkClick()) {
        figuraActual = objectsStack[i];
        startX = mouseX;
        startY = mouseY;
        select('#x').value(figuraActual.x);
        select('#y').value(figuraActual.y);
        break;
      }
    }
  }
}

function mouseDragged() {
  if (isSquareButtonPressed && isDrawing) {
    x2 = mouseX;
    y2 = mouseY;
  }
  if (isCircleButtonPressed && isDrawing) {
    x2 = mouseX;
    y2 = mouseY;
  }
  if (isLineButtonPressed && isDrawing) {
    x2 = mouseX;
    y2 = mouseY;
  }
  if (figuraActual && isDraggingEnabled) {
    var dx = mouseX - startX;
    var dy = mouseY - startY;

    figuraActual.x += dx;
    figuraActual.y += dy;

    startX = mouseX;
    startY = mouseY;

    select('#x').value(figuraActual.x);
    select('#y').value(figuraActual.y);
  }
}

function mouseReleased() {
  //cuadrado
  if (isSquareButtonPressed && isDrawing) {
    isDrawing = false;
    isSquareButtonPressed = false;

    var newObj = setSquare(x1, y1, x2 - x1, y2 - y1, colorInput.value());
    objectsStack.push(newObj);
    
    // Establecer el cuadrado actual como el nuevo objeto
    cuadradoActual = newObj;
  }
  //circulo
  if (isCircleButtonPressed && isDrawing) {
    isDrawing = false;
    isCircleButtonPressed = false;
    var newObj1 = setCircle(x1, y1, x2 - x1, y2 - y1, colorInput.value());
    objectsStack.push(newObj1);
    // Establecer el cuadrado actual como el nuevo objeto
    circuloActual = newObj1;
  }
  if (isLineButtonPressed && isDrawing) {
    isDrawing = false;
    isLineButtonPressed = false;
  
    var newLine = setLine(x1, y1, x2, y2, colorInput.value());
    objectsStack.push(newLine);
    lineaActual = newLine;

  }
  startX = null;
  startY = null;

  figuraActual = null;
}
//cuadrado
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
        mouseX <= this.x + this.h &&
        mouseY >= this.y &&
        mouseY <= this.y + this.w
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
//circulo
function setCircle(x, y, h, w, colorC) {
  var circulo = {
    x: x+(h*.5),
    y: y+(w*.5),
    h: h,
    w: w,
    color: colorC,
    draw: function () {
      fill(colorC);
      stroke(0);
      ellipse(this.x, this.y, this.h, this.w);
    },

    checkClick: function () {
      if (
        mouseX >= this.x-(this.h*.5) &&
        mouseX <= this.x + (this.h*.5)&&
        mouseY >= this.y-(this.w*.5) &&
        mouseY <= this.y +  (this.w*.5)
      ) {
        console.log(`me presionaron circulo  ${mouseX},${mouseY},,,,${this.x},${this.y}`);
        return true;
      }else{
        console.log(`no me presionaron circulo  ${mouseX},${mouseY}`);
      }
      return false;
    }
  };
  var liElement = createLiElement("circulo");
  select("#lista").child(liElement);
  return circulo;
}

function setLine(x1, y1, x2, y2, colorC) {
  var lineObj = {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    color: colorC,
    draw: function() {
      stroke(colorC);
      line(this.x1, this.y1, this.x2, this.y2);
    },
    checkClick: function() {
      // Implementa la lógica para verificar si se hizo clic en la línea
      // Puedes omitir esto si no se requiere interacción con las líneas
    }
  };

  var liElement = createLiElement("Línea");
  select("#lista").child(liElement);

  return lineObj;
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

function updateCirculo() {
  if (circuloActual) {
    // Obtener los valores de los inputs
    var newX = parseInt(select('#x').value());
    var newY = parseInt(select('#y').value());
    var newW = parseInt(select('#w').value());
    var newH = parseInt(select('#h').value());
    var newColor = select('#color').value();

    // Actualizar los atributos del cuadrado actual
    circuloActual.x = newX;
    circuloActual.y = newY;
    circuloActual.w = newW;
    circuloActual.h = newH;
    circuloActual.color = newColor;
  }
}

function draw() {
  background(255);
  for (var i = 0; i < objectsStack.length; i++) {
    var obj = objectsStack[i];
    obj.draw();
  }

  if (isDrawing && isSquareButtonPressed) {
    noFill();
    stroke(0);
    rect(x1, y1, x2 - x1, y2 - y1);
  }else{
    if (isDrawing && isCircleButtonPressed) {
      noFill();
      stroke(0);
      ellipse(x1+((x2 - x1)*.5), y1+((y2 - y1)*.5), x2 - x1, y2 - y1);
    }else{
      if (isDrawing && isLineButtonPressed) {
        // noFill();
        stroke(0);
        line(x1,y1, x2, y2);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(contenedor.width, contenedor.height);
}

function mousePressed() {
  for (var i = objectsStack.length - 1; i >= 0; i--) {
    if (objectsStack[i].checkClick()) {
      var cuadrado = objectsStack[i];
      var circulo = objectsStack[i]
      var figura = objectsStack[i];

      figuraActual = figura;

      startX = mouseX;
      startY = mouseY;

      cuadradoActual = cuadrado;
      circuloActual = circulo;

      select('#x').value(cuadrado.x);
      select('#y').value(cuadrado.y);
      select('#w').value(cuadrado.w);
      select('#h').value(cuadrado.h);
      select('#color').value(cuadrado.color);

      select('#x').value(circulo.x);
      select('#y').value(circulo.y);
      select('#w').value(circulo.w);
      select('#h').value(circulo.h);
      select('#color').value(circulo.color);

      break;
    }
  }
}
function createLiElement(text) {
  var liElement = createElement("li", text);
  return liElement;
}
function disableDragging() {
  isDraggingEnabled = false;
}