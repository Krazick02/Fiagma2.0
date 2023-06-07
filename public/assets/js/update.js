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
var idProyecto


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
  idProyecto = select('#idProyecto');


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

  select('#x').input(updateCirculo);
  select('#y').input(updateCirculo);
  select('#w').input(updateCirculo);
  select('#h').input(updateCirculo);

  select('#x').input(updateLine);
  select('#y').input(updateLine);
  select('#w').input(updateLine);
  select('#h').input(updateLine);

  if (figuraActual) {
    select('#color').input(updateCirculo);
    select('#color').input(updateCuadrado);
    select('#color').input(updateLine);
  }
}

function updateColor() {
  var selectedColor = colorInput.value();
  colorLabel.html(selectedColor);
  if (cuadradoActual) {
    cuadradoActual.color = colorInput.value();
  }
  if (circuloActual) {
    circuloActual.color = colorInput.value();
  }
}

function handleCuadradoPress() {
  disableDragging()
  select('#x').value(null);
  select('#y').value(null);
  select('#w').value(null);
  select('#h').value(null);
  select('#color').value('#000000');
  isSquareButtonPressed = true;
}
function handleCirclePress() {
  disableDragging()
  select('#x').value(null);
  select('#y').value(null);
  select('#w').value(null);
  select('#h').value(null);
  select('#color').value('#000000');
  isCircleButtonPressed = true;
}

function handleLinePress() {
  disableDragging();
  select('#x').value(null);
  select('#y').value(null);
  select('#w').value(null);
  select('#color').value('#000000');
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
  if (isSquareButtonPressed && isDrawing) {
    isDrawing = false;
    isSquareButtonPressed = false;

    var newObj = setSquare(x1, y1, x2 - x1, y2 - y1, colorInput.value());
    objectsStack.push(newObj);

    cuadradoActual = newObj;
  }
  if (isCircleButtonPressed && isDrawing) {
    isDrawing = false;
    isCircleButtonPressed = false;
    var newObj1 = setCircle(x1, y1, x2 - x1, y2 - y1, colorInput.value());
    objectsStack.push(newObj1);
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
function setSquare(x, y, h, w, colorC) {
  var cuadrado = {
    x: x,
    y: y,
    h: h,
    w: w,
    color: colorC,
    type: 'square',
    draw: function () {
      if (this.color != '#000000') {
        fill(this.color);
      } else {
        noFill()
      }
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
        return true;
      }
      return false;
    }
  };
  var liElement = createLiElement("Cuadrado");
  select("#lista").child(liElement);
  return cuadrado;
}
function setCircle(x, y, h, w, colorC) {
  var circulo = {
    x: x + (h * .5),
    y: y + (w * .5),
    h: h,
    w: w,
    color: colorC,
    type: 'circle',
    draw: function () {
      if (this.color != '#000000') {
        fill(this.color);
      } else {
        noFill()
      }
      stroke(0);
      ellipse(this.x, this.y, this.h, this.w);
    },

    checkClick: function () {
      if (
        mouseX >= this.x - (this.h * .5) &&
        mouseX <= this.x + (this.h * .5) &&
        mouseY >= this.y - (this.w * .5) &&
        mouseY <= this.y + (this.w * .5)
      ) {
        return true;
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
    type: 'line',
    draw: function () {
      stroke(colorC);
      line(this.x1, this.y1, this.x2, this.y2);
    },
    checkClick: function () {
      if (
        mouseX >= this.x &&
        mouseX <= this.x + this.h &&
        mouseY >= this.y &&
        mouseY <= this.y + this.w
      ) {
        return true;
      }
      return false;
    }
  };

  var liElement = createLiElement("Línea");
  select("#lista").child(liElement);

  return lineObj;
}

function updateCuadrado() {
  if (cuadradoActual) {
    var newX = parseInt(select('#x').value());
    var newY = parseInt(select('#y').value());
    var newW = parseInt(select('#w').value());
    var newH = parseInt(select('#h').value());
    var newColor = select('#color').value();

    cuadradoActual.x = newX;
    cuadradoActual.y = newY;
    cuadradoActual.w = newW;
    cuadradoActual.h = newH;
    cuadradoActual.color = newColor;
  }
}

function updateCirculo() {
  if (circuloActual) {
    var newX = parseInt(select('#x').value());
    var newY = parseInt(select('#y').value());
    var newW = parseInt(select('#w').value());
    var newH = parseInt(select('#h').value());
    var newColor = select('#color').value();

    circuloActual.x = newX;
    circuloActual.y = newY;
    circuloActual.w = newW;
    circuloActual.h = newH;
    circuloActual.color = newColor;
  }
}
function updateLine() {
  if (lineaActual) {
    var newX = parseInt(select('#x').value());
    var newY = parseInt(select('#y').value());
    var newW = parseInt(select('#w').value());
    var newH = parseInt(select('#h').value());
    var newColor = select('#color').value();

    lineaActual.x1 = newX;
    lineaActual.y1 = newY;
    lineaActual.y2 = newW;
    lineaActual.x2 = newH;
    lineaActual.color = newColor;
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
  } else {
    if (isDrawing && isCircleButtonPressed) {
      noFill();
      stroke(0);
      ellipse(x1 + ((x2 - x1) * .5), y1 + ((y2 - y1) * .5), x2 - x1, y2 - y1);
    } else {
      if (isDrawing && isLineButtonPressed) {
        stroke(0);
        line(x1, y1, x2, y2);
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
      colorLabel.html(cuadrado.color);

      select('#x').value(circulo.x);
      select('#y').value(circulo.y);
      select('#w').value(circulo.w);
      select('#h').value(circulo.h);
      select('#color').value(circulo.color);
      colorLabel.html(circulo.color);

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

document.addEventListener('click', (e) => {
  if (figuraActual) {
    console.log(figuraActual)
  }
})






//MANDAR AL BACKKK
var csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

document.getElementById('actualizarLienzo').addEventListener('click', function () {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

  axios.put('/save', { 
    figures: objectsStack,
    idProyecto: document.getElementById('idProyecto').value 
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  axios.get(`/get/${document.getElementById('idProyecto').value}`)
    .then(function (response) {
      var arreglo = response.data.figures
      console.log(arreglo)
      arreglo.forEach(figura => {
        if (figura.type === 'square') {
          objectsStack.push(setSquare(
            figura.x,
            figura.y,
            figura.h,
            figura.w,
            figura.color));
        } else {
          if (figura.type === 'circle') {
            objectsStack.push(setCircle(
              figura.x,
              figura.y,
              figura.h,
              figura.w,
              figura.color));
          } else {
            if (figura.type === 'line') {
              objectsStack.push(setLine(
                figura.x,
                figura.y,
                figura.h,
                figura.w,
                figura.color));
            }
          }
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});