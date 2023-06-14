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
let posicionObjeto;


let enableText = false;
let userInput = '';
// var isTextButtonPressed = false;


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
var textoActual;
var idProyecto

var isDraggingEnabled = false;


function enableDragging() {
  isDraggingEnabled = true;
  isSquareButtonPressed = false;
  isCircleButtonPressed = false;
  isLineButtonPressed = false;
  enableText = false;
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

  select('#textx').input(updateText);
  select('#texty').input(updateText);
  select('#description').input(updateText);
  select('#textcolor').input(updateText);
  select('#textsize').input(updateText);

  if (figuraActual) {
    select('#color').input(updateCirculo);
    select('#color').input(updateCuadrado);
    select('#borderColor').input(updateCuadrado);
    select('#color').input(updateLine);
  }

  select('#text').mousePressed(() => {
    enableText = true;
    isSquareButtonPressed = false;
    isCircleButtonPressed = false;
    isLineButtonPressed = false;
    select('#workSpaceSquare').addClass('d-none')
    select('#workSpaceText').addClass('d-none')
    disableDragging()
  });

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
  enableText = false;
  select('#workSpaceSquare').addClass('d-none')
  select('#workSpaceText').addClass('d-none')

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
  select('#workSpaceText').addClass('d-none')

  enableText = false;
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
  select('#workSpaceText').addClass('d-none')

  enableText = false;
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

  if (enableText) {
    dibujarText()
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
        select('#workSpaceText').addClass('d-none')

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
        select('#workSpaceText').addClass('d-none')

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
        select('#workSpaceText').addClass('d-none')

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
function setText(texto) {
  var textObj = {
    x: mouseX,
    y: mouseY,
    texto: texto,
    color: color('#000000'),
    fontSize: 10,
    type: 'text',
    draw: function () {
      textSize(this.fontSize);
      fill(this.color);
      textAlign(CENTER, CENTER);
      text(this.texto, this.x, this.y);
    },
    checkClick: function () {
      textSize(this.fontSize);
      var textWidthValue = textWidth(this.texto);
      var textHeightValue = textAscent() + textDescent();

      var left = this.x - textWidthValue / 2;
      var right = this.x + textWidthValue / 2;
      var top = this.y - textHeightValue / 2;
      var bottom = this.y + textHeightValue / 2;

      if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom && isDraggingEnabled == true) {
        select('#workSpaceSquare').addClass('d-none')
        select('#workSpaceText').removeClass('d-none')
        figuraTarget = this
        return true;
      } else {
        return false;
      }
    }
  };

  var liElement = createLiElement("Texto");
  select("#lista").child(liElement);
  return textObj;
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
function updateText() {
  if (textoActual) {
    var newX = parseInt(select('#textx').value());
    var newY = parseInt(select('#texty').value());
    var newDes = select('#description').value();
    var newSize = parseInt(select('#textsize').value());
    var newColor = select('#textcolor').value();

    textoActual.x1 = newX;
    textoActual.y1 = newY;
    textoActual.texto = newDes;
    textoActual.fontSize = newSize;
    textoActual.color = newColor;
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
      var texto = objectsStack[i]
      var figura = objectsStack[i];

      figuraActual = figura;

      startX = mouseX;
      startY = mouseY;

      cuadradoActual = cuadrado;
      circuloActual = circulo;
      lineaActual = linea;
      textoActual = texto;

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
      if (texto) {
        select('#textx').value(texto.x);
        select('#texty').value(texto.y);
        select('#description').value(texto.texto);
        select('#textcolor').value(texto.color);
        select('#textsize').value(texto.fontSize);
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


document.getElementById('deleteButton').addEventListener('click', function () {
  let list = []
  list = objectsStack.filter(function (objeto) {
    return objeto !== figuraTarget;
  });

  objectsStack = list
  actualizarLista()
});

function dibujarText() {
  userInput = prompt('Ingresa el texto:');
  if (userInput) {
    var text = setText(userInput)
    objectsStack.push(text);
  }
  // console.log(mouseX,mouseY)
  // console.log(x1,y1)
}

//MANDAR AL BACKKK
var csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

document.getElementById('actualizarLienzo').addEventListener('click', function () {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  // console.table(objectsStack)
  axios.put('/save', {
    figures: objectsStack,
    idProyecto: document.getElementById('idProyecto').value
  })
    .then(response => {
      alert('Guardado correctamente');
      // console.log(response.data.data.figures);
    })
    .catch(error => {
      alert('salio algo mal :c');
      console.error(error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  axios.get(`/get/${document.getElementById('idProyecto').value}`)
    .then(function (response) {
      var arreglo = response.data.figures
      // console.log(arreglo)
      arreglo.forEach(figura => {
        if (figura.type === 'square') {
          var newFigure = setSquare(
            figura.x,
            figura.y,
            figura.h,
            figura.w,
            figura.color)
          newFigure.borderColor = figura.borderColor
          newFigure.fillOpacity = figura.fillOpacity
          newFigure.borderOpacity = figura.borderOpacity
          newFigure.borderSize = figura.borderSize
          newFigure.corner = figura.corner
          newFigure.color = figura.color
          objectsStack.push(newFigure);
        } else {
          if (figura.type === 'circle') {
            var newFigure = setCircle(
              figura.x - (figura.h * .5),
              figura.y - (figura.w * .5),
              figura.h,
              figura.w,
              figura.color)
            newFigure.borderColor = figura.borderColor
            newFigure.fillOpacity = figura.fillOpacity
            newFigure.borderOpacity = figura.borderOpacity
            newFigure.borderSize = figura.borderSize
            newFigure.corner = figura.corner
            newFigure.color = figura.color

            objectsStack.push(newFigure);
          } else {
            if (figura.type === 'line') {
              var newFigure = setLine(
                figura.x1,
                figura.y1,
                figura.x2,
                figura.y2,
                figura.color)
              newFigure.borderColor = figura.borderColor
              newFigure.borderOpacity = figura.borderOpacity
              newFigure.borderSize = figura.borderSize
              objectsStack.push(newFigure);
            }else{
              if (figura.type === 'text') {
                var newFigure = setText(
                  figura.texto)
                newFigure.x = figura.x
                newFigure.y = figura.y
                newFigure.color = figura.color
                newFigure.fontSize = figura.fontSize
                objectsStack.push(newFigure);}
            }
          }
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});






function actualizarPosicion(direccion) {
  posicionObjeto = objectsStack.indexOf(figuraTarget)

  if (direccion === "bajar" && posicionObjeto > 0) {
    
    if (objectsStack.length) {
      const temp = objectsStack[posicionObjeto-1]; // Almacenar temporalmente el segundo elemento
      objectsStack[posicionObjeto-1] = objectsStack[posicionObjeto]; // Colocar el tercer elemento en la posición del segundo
      objectsStack[posicionObjeto] = temp; // Colocar el segundo elemento en la posición del tercero
    }
  
  } else if (direccion === "subir" && posicionObjeto < objectsStack.length - 1) {
    if (objectsStack.length) {
      const temp = objectsStack[posicionObjeto]; // Almacenar temporalmente el segundo elemento
      objectsStack[posicionObjeto] = objectsStack[posicionObjeto+1]; // Colocar el tercer elemento en la posición del segundo
      objectsStack[posicionObjeto+1] = temp; // Colocar el segundo elemento en la posición del tercero
    }  
  }

  actualizarLista()
}

// Evento de clic para el botón "Bajar Capa"
document.getElementById("bajarCapa").addEventListener("click", function () {
  actualizarPosicion("bajar");
});

// Evento de clic para el botón "Subir Capa"
document.getElementById("subirCapa").addEventListener("click", function () {
  actualizarPosicion("subir");
});


async function actualizarLista(){
  let listado = document.querySelector("#lista")
  const elementos = lista.querySelectorAll("li");

  // Iterar sobre los elementos y eliminarlos uno por uno
  await elementos.forEach(function(elemento) {
    listado.removeChild(elemento);
  });

  await objectsStack.forEach(function(elemento){
    var li = document.createElement('li');
    li.textContent= elemento.type
    listado.appendChild(li);
    console.log(elemento.type)
  })
}