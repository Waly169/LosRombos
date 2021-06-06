let lineaAncho = 14; // cm
let lineaAlto = 28;  // cm
let escalaInicial = 1920/200;  // px/cm
let lineaAnchoCorregido = lineaAncho; // cm
let lineaAltoCorregido = lineaAlto;   // cm
let fondoColor;
let lineaColor;
let entradaAncho;
let entradaAlto;

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
    
    
    entradaAncho = createInput(lineaAncho);
    entradaAncho.size(30);
    entradaAncho.position(370, 12);
    entradaAncho.changed(actualizarMedidas);
    

    entradaAlto = createInput(lineaAlto);
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
    lineaAltoCorregido = lineaAlto;
    lineaAnchoCorregido = lineaAncho;
}



function calibrar() {
    let altoMedido = prompt("Inserte el alto medido (cm):", "28.0");
    lineaAltoCorregido = lineaAltoCorregido*lineaAlto/altoMedido;
    lineaAnchoCorregido = lineaAnchoCorregido*lineaAlto/altoMedido;
}3


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    background(fondoColor.color());
    stroke(lineaColor.color());
    
    
    let espaciosHorizontal = windowWidth/cm2pixel(lineaAnchoCorregido);
    let espaciosVertical = windowHeight/cm2pixel(lineaAltoCorregido);
    let repeticiones = espaciosHorizontal + espaciosVertical;
    
    for (let i=0; i<repeticiones; i++) {
        line(0, i*cm2pixel(lineaAltoCorregido), i*cm2pixel(lineaAnchoCorregido), 0);
        line(windowWidth-i*cm2pixel(lineaAnchoCorregido), 0, windowWidth, i*cm2pixel(lineaAltoCorregido));
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