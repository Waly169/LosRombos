let lineaAncho = 14; // cm
let lineaAlto = 28;  // cm
let escalaInicial = 1920 / 200;  // px/cm
let lineaAnchoCorregido = lineaAncho; // cm
let lineaAltoCorregido = lineaAlto;   // cm
let fondoColor;
let lineaColor;
let entradaAncho;
let entradaAlto;
let factorCalibracion = 1;

function pixel2cm(pixel) {
    return pixel / escalaInicial; //Devuelve cm
}

function cm2pixel(cm) {
    return cm * escalaInicial; //Devuelve px
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fondoColor = createColorPicker('#ffffff');
    fondoColor.position(70, 10);
    lineaColor = createColorPicker('#000000');
    lineaColor.position(200, 10);
    
    
    entradaAncho = createInput(lineaAncho.toString());
    entradaAncho.size(30);
    entradaAncho.position(370, 12);
    entradaAncho.changed(actualizarMedidas);
    

    entradaAlto = createInput(lineaAlto.toString());
    entradaAlto.size(30);
    entradaAlto.position(470, 12);
    entradaAlto.changed(actualizarMedidas);
    
    
    let botonCalibrar = createButton('CALIBRAR');
    botonCalibrar.position(580, 12);
    botonCalibrar.mousePressed(calibrar);


    
}

function actualizarMedidas() {
    lineaAncho = entradaAncho.value();
    lineaAlto = entradaAlto.value();
    lineaAltoCorregido = lineaAlto * factorCalibracion;
    lineaAnchoCorregido = lineaAncho * factorCalibracion;
}



function calibrar() {
    let altoMedido = prompt("Inserte el alto medido (cm):", "28.0");
    factorCalibracion = lineaAlto / altoMedido;
    lineaAltoCorregido = lineaAltoCorregido * factorCalibracion;
    lineaAnchoCorregido = lineaAnchoCorregido * factorCalibracion;
}3


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    background(fondoColor.color());
    stroke(lineaColor.color());
    
    let lineaAnchoPixel = cm2pixel(lineaAnchoCorregido);
    let lineaAltoPixel = cm2pixel(lineaAltoCorregido);
    
    let espaciosHorizontal = windowWidth / lineaAnchoPixel;
    let espaciosVertical = windowHeight / lineaAltoPixel;
    let repeticiones = espaciosHorizontal + espaciosVertical;
    
    for (let i = 0; i < repeticiones; i++) {
        line(0, i * lineaAltoPixel, i * lineaAnchoPixel, 0);
        line(windowWidth - i * lineaAnchoPixel, 0, windowWidth, i * lineaAltoPixel);
    }

    //TODO UI
    fill(240);
    rect(0, 0, windowWidth, 45);
    
    textSize(20);
    noStroke();
    fill(0);
    text('Fondo', 10, 30);
    text('Linea', 140, 30);
    textSize(18);
    text('Ancho', 310, 30);
    text('Alto', 430, 30);
}