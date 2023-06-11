var colorInput;
var colorLabel;
var borderColorInput;
var borderColorLabel;
var objectsStack = [];
var objectsList = [];
var x1, y1, x2, y2;
var isDrawing = false;
var isSquareButtonPressed = false;
var isCircleButtonPressed = false;
var isLineButtonPressed = false;
var figuraActual;
var figuraTarget;

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
  isSquareButtonPressed = false;
  isCircleButtonPressed = false;
  isLineButtonPressed = false;
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
  borderColorInput = select('#borderColor');
  borderColorLabel = select('#borderColorLabel');

  colorInput.input(updateColor);
  borderColorInput.input(updateColorB);

  linea.mousePressed(handleLinePress);
  cuadrado.mousePressed(handleCuadradoPress);
  circulo.mousePressed(handleCirclePress);
  contenedor.mousePressed(handleCanvasPress);
  dragButton.mousePressed(enableDragging);

  select('#x').input(updateCuadrado);
  select('#y').input(updateCuadrado);
  select('#w').input(updateCuadrado);
  select('#h').input(updateCuadrado);
  select('#fillOpacity').input(updateCuadrado);
  select('#borderOpacity').input(updateCuadrado);
  select('#borderSize').input(updateCuadrado);
  select('#corner').input(updateCuadrado);

  select('#x').input(updateCirculo);
  select('#y').input(updateCirculo);
  select('#w').input(updateCirculo);
  select('#h').input(updateCirculo);

  select('#x1').input(updateLine);
  select('#y1').input(updateLine);
  select('#x2').input(updateLine);
  select('#y2').input(updateLine);

  if (figuraActual) {
    select('#color').input(updateCirculo);
    select('#color').input(updateCuadrado);
    select('#borderColor').input(updateCuadrado);
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
function updateColorB() {
  var selectedColor = borderColorInput.value();
  borderColorLabel.html(selectedColor);
  if (cuadradoActual) {
    cuadradoActual.borderColor = borderColorInput.value();
  }
  if (circuloActual) {
    circuloActual.borderColor = borderColorInput.value();
  }
  if (lineaActual) {
    lineaActual.borderColor = borderColorInput.value();
  }
}

function handleCuadradoPress() {
  disableDragging()
  select('#x').value(null);
  select('#y').value(null);
  select('#w').value(null);
  select('#h').value(null);
  select('#color').value('#000000');
  select('#borderColor').value('#000000');
  select('#fillOpacity').value(null);
  select('#borderOpacity').value(null);
  select('#borderSize').value(null);
  select('#corner').value(null);
  colorLabel.html('#000000')
  borderColorLabel.html('#000000')
  isSquareButtonPressed = true;
  isCircleButtonPressed = false;
  isLineButtonPressed = false;
  select('#workSpaceSquare').addClass('d-none')

}
function handleCirclePress() {
  disableDragging()
  select('#x').value(null);
  select('#y').value(null);
  select('#w').value(null);
  select('#h').value(null);
  select('#color').value('#000000');
  select('#borderColor').value('#000000');
  select('#fillOpacity').value(null);
  select('#borderOpacity').value(null);
  select('#borderSize').value(null);
  colorLabel.html('#000000')
  borderColorLabel.html('#000000')
  isSquareButtonPressed = false;
  isCircleButtonPressed = true;
  isLineButtonPressed = false;
  select('#workSpaceSquare').addClass('d-none')

}

function handleLinePress() {
  disableDragging();
  select('#x1').value(null);
  select('#y1').value(null);
  select('#x2').value(null);
  select('#y2').value(null);
  select('#color').value('#000000');
  select('#borderColor').value('#000000');
  select('#fillOpacity').value(null);
  select('#borderOpacity').value(null);
  select('#borderSize').value(null);
  select('#corner').value(null);
  colorLabel.html('#000000')
  borderColorLabel.html('#000000')
  isSquareButtonPressed = false;
  isCircleButtonPressed = false;
  isLineButtonPressed = true;
  select('#workSpaceSquare').addClass('d-none')
}

function handleCanvasPress() {
  if (isSquareButtonPressed) {
    x1 = mouseX;
    y1 = mouseY;
    x2 = mouseX;
    y2 = mouseY;
    isDrawing = true;
  }
  if (isCircleButtonPressed) {
    x1 = mouseX;
    y1 = mouseY;
    x2 = mouseX;
    y2 = mouseY;
    isDrawing = true;
  }
  if (isLineButtonPressed) {
    x1 = mouseX;
    y1 = mouseY;
    x2 = mouseX;
    y2 = mouseY;
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
  if (x1 != x2 && y1 != y2) {
    if (isSquareButtonPressed && isDrawing) {
      var newObj = setSquare(x1, y1, x2 - x1, y2 - y1, colorInput.value());
      objectsStack.push(newObj);
      cuadradoActual = newObj;
    }
    if (isCircleButtonPressed && isDrawing) {
      var newObj1 = setCircle(x1, y1, x2 - x1, y2 - y1, colorInput.value());
      objectsStack.push(newObj1);
      circuloActual = newObj1;

    }
    if (isLineButtonPressed && isDrawing) {
      var newLine = setLine(x1, y1, x2, y2, colorInput.value());
      objectsStack.push(newLine);
      lineaActual = newLine;

    }
  }
  startX = null;
  startY = null;

  figuraActual = null;

  x1 = null
  y1 = null
  x2 = null
  y2 = null
}
function setSquare(x, y, h, w, colorC) {
  var cuadrado = {
    x: x,
    y: y,
    h: h,
    w: w,
    borderColor: "#000000",
    fillOpacity: 255,
    borderOpacity: 255,
    borderSize: 1,
    corner: 0,
    color: "#ffffff",
    type: 'square',
    draw: function () {
      fill(color(this.color), this.fillOpacity);
      stroke(color(this.borderColor), this.borderOpacity);
      strokeWeight(this.borderSize);


      rect(this.x, this.y, this.h, this.w, this.corner);
      noFill();
      noStroke();
    },
    checkClick: function () {
      if (
        mouseX >= this.x &&
        mouseX <= this.x + this.h &&
        mouseY >= this.y &&
        mouseY <= this.y + this.w
        && isDraggingEnabled == true
      ) {
        select('#redondeado').removeClass('d-none')
        select('#workSpaceSquare').removeClass('d-none')
        select('#rellenoFigura').removeClass('d-none')
        select('#opacidadRelleno').removeClass('d-none')
        select('#dibujarLinea').addClass('d-none')
  select('#dibujarResto').removeClass('d-none')
        figuraTarget = this
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
    borderColor: "#000000",
    fillOpacity: 255,
    borderOpacity: 255,
    borderSize: 1,
    color: "#ffffff",
    type: 'circle',
    draw: function () {
      fill(color(this.color), this.fillOpacity);
      stroke(color(this.borderColor), this.borderOpacity);
      strokeWeight(this.borderSize);
      ellipse(this.x, this.y, this.h, this.w);
    },
    checkClick: function () {
      if (
        mouseX >= this.x - (this.h * .5) &&
        mouseX <= this.x + (this.h * .5) &&
        mouseY >= this.y - (this.w * .5) &&
        mouseY <= this.y + (this.w * .5)
        && isDraggingEnabled == true
      ) {

        select('#workSpaceSquare').removeClass('d-none')
        select('#rellenoFigura').removeClass('d-none')
        select('#opacidadRelleno').removeClass('d-none')
        // select('#workSpaceCircle').removeClass('d-none')
        select('#redondeado').addClass('d-none')
        select('#dibujarLinea').addClass('d-none')
  select('#dibujarResto').removeClass('d-none')
        figuraTarget = this

        return true;
      }
      return false;
    }
  };
  var liElement = createLiElement("Circulo");
  select("#lista").child(liElement);
  return circulo;
}

function setLine(x1, y1, x2, y2, colorC) {
  var lineObj = {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    borderColor: "#000000",
    borderOpacity: 255,
    borderSize: 1,
    // color: colorC,
    type: 'line',
    draw: function () {
      stroke(color(this.borderColor), this.borderOpacity);
      strokeWeight(this.borderSize);
      line(this.x1, this.y1, this.x2, this.y2);
      noStroke();
    },
    checkClick: function () {
      var clickX = mouseX;
      var clickY = mouseY;

      var lineLength = dist(this.x1, this.y1, this.x2, this.y2);

      var distanceStart = dist(clickX, clickY, this.x1, this.y1);

      var distanceEnd = dist(clickX, clickY, this.x2, this.y2);

      if ((distanceStart + distanceEnd <= lineLength + 1) && isDraggingEnabled == true) {
        select('#workSpaceSquare').removeClass('d-none');
        select('#redondeado').addClass('d-none')
        select('#rellenoFigura').addClass('d-none')
        select('#opacidadRelleno').addClass('d-none')
        select('#dibujarLinea').removeClass('d-none')
  select('#dibujarResto').addClass('d-none')
        figuraTarget = this

        return true;
      }

      return false;
    }
  };
  var liElement = createLiElement("Linea");
  select("#lista").child(liElement);
  return lineObj;
}

function updateCuadrado() {
  if (cuadradoActual) {
    var newX = parseInt(select('#x').value());
    var newY = parseInt(select('#y').value());
    var newW = parseInt(select('#w').value());
    var newH = parseInt(select('#h').value());
    var fillO = parseInt(select('#fillOpacity').value());
    var borderO = parseInt(select('#borderOpacity').value());
    var borderS = parseInt(select('#borderSize').value());
    var corner = parseInt(select('#corner').value());
    var newColor = select('#color').value();
    var newBorderColor = select('#borderColor').value();

    cuadradoActual.x = newX;
    cuadradoActual.y = newY;
    cuadradoActual.w = newW;
    cuadradoActual.h = newH;
    cuadradoActual.fillOpacity = fillO;
    cuadradoActual.borderOpacity = borderO;
    cuadradoActual.borderSize = borderS;
    cuadradoActual.corner = corner;
    cuadradoActual.borderColor = newBorderColor;
    cuadradoActual.color = newColor;
  }
}

function updateCirculo() {
  if (circuloActual) {
    var newX = parseInt(select('#x').value());
    var newY = parseInt(select('#y').value());
    var newW = parseInt(select('#w').value());
    var newH = parseInt(select('#h').value());
    var fillO = parseInt(select('#fillOpacity').value());
    var borderO = parseInt(select('#borderOpacity').value());
    var borderS = parseInt(select('#borderSize').value());
    var newColor = select('#color').value();
    var newBorderColor = select('#borderColor').value();

    circuloActual.x = newX;
    circuloActual.y = newY;
    circuloActual.w = newW;
    circuloActual.h = newH;
    circuloActual.fillOpacity = fillO;
    circuloActual.borderOpacity = borderO;
    circuloActual.borderSize = borderS;
    circuloActual.borderColor = newBorderColor;
    circuloActual.color = newColor;
  }
}
function updateLine() {
  if (lineaActual) {
    var newX = parseInt(select('#x1').value());
    var newY = parseInt(select('#y1').value());
    var newW = parseInt(select('#x2').value());
    var newH = parseInt(select('#y2').value());
    var newColor = select('#color').value();

    lineaActual.x1 = newX;
    lineaActual.y1 = newY;
    lineaActual.x2 = newW;
    lineaActual.y2 = newH;
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
      var linea = objectsStack[i]
      var figura = objectsStack[i];

      figuraActual = figura;

      startX = mouseX;
      startY = mouseY;

      cuadradoActual = cuadrado;
      circuloActual = circulo;
      lineaActual = linea;

      if (cuadrado) {
        select('#x').value(cuadrado.x);
        select('#y').value(cuadrado.y);
        select('#w').value(cuadrado.w);
        select('#h').value(cuadrado.h);
        select('#color').value(cuadrado.color);
        select('#borderColor').value(cuadrado.borderColor);
        select('#fillOpacity').value(cuadrado.fillOpacity);
        select('#borderOpacity').value(cuadrado.borderOpacity);
        select('#borderSize').value(cuadrado.borderSize);
        select('#corner').value(cuadrado.corner);
        colorLabel.html(cuadrado.color);
      }

      if (circulo) {
        select('#x').value(circulo.x);
        select('#y').value(circulo.y);
        select('#w').value(circulo.w);
        select('#h').value(circulo.h);
        select('#color').value(circulo.color);
        select('#borderColor').value(circulo.borderColor);
        select('#fillOpacity').value(circulo.fillOpacity);
        select('#borderOpacity').value(circulo.borderOpacity);
        select('#borderSize').value(circulo.borderSize);
        colorLabel.html(circulo.color);
      }

      if (linea) {
        select('#x1').value(linea.x1);
        select('#y1').value(linea.y1);
        select('#x2').value(linea.x2);
        select('#y2').value(linea.y2);
        select('#borderColor').value(linea.borderColor);
        select('#borderOpacity').value(linea.borderOpacity);
        select('#borderSize').value(linea.borderSize);
        colorLabel.html(linea.borderColor);
      }

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
  if (figuraTarget) {
    console.log(figuraTarget)
  }
})


document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace" || event.keyCode === 8) {
    // // Se ha presionado el botón "Backspace"
    // console.log("Se ha presionado el botón Backspace");
    // // Tu lógica adicional aquí
    let list = []
    list = objectsStack.filter(function (objeto) {
      return objeto !== figuraTarget;
    });

    objectsStack = list
  }
});




//MANDAR AL BACKKK
var csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

document.getElementById('guardarLienzo').addEventListener('click', function () {
  // Configura el token CSRF en el encabezado de la solicitud
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

  // Realiza la solicitud POST a la ruta 'lienzo.store'
  axios.post('/save', {
    figuras: objectsStack
  })
    .then(function (response) {
      // Maneja la respuesta exitosa si es necesario
      // alert('Guardado con exito');
      window.location.href = '/home'
      // console.log(response.data);
    })
    .catch(function (error) {
      // Maneja el error si ocurre algún problema
      alert('Error en guardar');
      console.log(error);
    });
});
