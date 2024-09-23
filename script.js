const gameArea = document.querySelector('.game-area');
const aldeanos = [];
let tipoElemento = null;

document.getElementById('botonVerde').addEventListener('click', () => {
    tipoElemento = 'aldeano-verde';
    crearAldeano('green');
});
document.getElementById('botonRojo').addEventListener('click', () => {
    tipoElemento = 'aldeano-rojo';
    crearAldeano('red');
});
document.getElementById('botonComida').addEventListener('click', () => {
    tipoElemento = 'comida';
});
document.getElementById('botonAgua').addEventListener('click', () => {
    tipoElemento = 'agua';
});
document.getElementById('botonPiedra').addEventListener('click', () => {
    tipoElemento = 'piedra';
});

// Agregar evento de clic en la zona de juego
gameArea.addEventListener('click', (e) => {
    if (tipoElemento) {
        if (tipoElemento === 'aldeano-verde') {
            crearAldeano('green', e);
        } else if (tipoElemento === 'aldeano-rojo') {
            crearAldeano('red', e);
        } else if (tipoElemento === 'comida') {
            crearElemento('comida', e);
        } else if (tipoElemento === 'agua') {
            crearElemento('agua', e);
        } else if (tipoElemento === 'piedra') {
            crearElemento('piedra', e);
        }
        // Reiniciar tipoElemento
        tipoElemento = null;
    }
});

function crearAldeano(color, e) {
    const x = e.clientX - 15; // Ajustar para centrar
    const y = e.clientY - 15; // Ajustar para centrar
    const aldeano = document.createElement('div');
    aldeano.classList.add('aldeano');
    aldeano.style.backgroundColor = color;
    aldeano.style.left = `${x}px`;
    aldeano.style.top = `${y}px`;

    // Inicializar las necesidades
    aldeano.necesidades = {
        amor: 10,
        hambre: 10,
        sed: 10,
        guerra: 0,
        vida: 10
    };

    // Crear contenedor de necesidades
    const contenedorNecesidades = document.createElement('div');
    contenedorNecesidades.classList.add('necesidades');

    // Crear barras para cada necesidad
    Object.keys(aldeano.necesidades).forEach((key) => {
        const barra = document.createElement('div');
        barra.classList.add('barra', key);
        barra.style.width = `${(aldeano.necesidades[key] / 20) * 100}%`;
        contenedorNecesidades.appendChild(barra);
    });

    contenedorNecesidades.classList.add('necesidades');
    aldeano.appendChild(contenedorNecesidades);
    gameArea.appendChild(aldeano);
    aldeanos.push(aldeano);

    moverAldeano(aldeano);
}

function crearElemento(tipo, e) {
    const x = e.clientX - 15; // Ajustar para centrar
    const y = e.clientY - 30; // Ajustar para centrar
    const elemento = document.createElement('div');
    elemento.classList.add('triangulo', tipo);
    elemento.style.left = `${x}px`;
    elemento.style.top = `${y}px`;
    gameArea.appendChild(elemento);
}

function moverAldeano(aldeano) {
    setInterval(() => {
        gestionarNecesidades(aldeano);
        const randomDirection = Math.floor(Math.random() * 4);
        const movement = Math.floor(Math.random() * 6) + 5; // Mover entre 5 y 10 píxeles

        switch (randomDirection) {
            case 0: // Arriba
                aldeano.style.top = `${Math.max(0, aldeano.offsetTop - movement)}px`;
                break;
            case 1: // Abajo
                aldeano.style.top = `${Math.min(gameArea.clientHeight - 30, aldeano.offsetTop + movement)}px`;
                break;
            case 2: // Izquierda
                aldeano.style.left = `${Math.max(0, aldeano.offsetLeft - movement)}px`;
                break;
            case 3: // Derecha
                aldeano.style.left = `${Math.min(gameArea.clientWidth - 30, aldeano.offsetLeft + movement)}px`;
                break;
        }
    }, 1000);
}

function gestionarNecesidades(aldeano) {
    // Resta 1 punto a cada necesidad cada 4 segundos
    setInterval(() => {
        Object.keys(aldeano.necesidades).forEach((key) => {
            aldeano.necesidades[key] = Math.max(0, aldeano.necesidades[key] - 1);
        });

        // Actualizar las barras de progreso
        const barras = aldeano.querySelectorAll('.barra');
        barras.forEach((barra, index) => {
            const key = Object.keys(aldeano.necesidades)[index];
            barra.style.width = `${(aldeano.necesidades[key] / 10) * 100}%`;
        });
    }, 16000);

    // Incrementar necesidades de ejemplo
    const closeAldeanos = aldeanos.filter(a => a !== aldeano && isNearby(a, aldeano));

    if (closeAldeanos.length > 0) {
        aldeano.necesidades.amor = Math.min(10, aldeano.necesidades.amor + 10);
    }
// Verificar cercanía con elementos de comida
    const comidaElements = document.querySelectorAll('.triangulo.comida');
    comidaElements.forEach(comida => {
        if (isNearby(aldeano, comida)) {
            aldeano.necesidades.hambre = Math.min(10, aldeano.necesidades.hambre + 10);
            comida.remove(); // Eliminar el elemento de comida
        }
    });

    // Verificar cercanía con elementos de agua
    const aguaElements = document.querySelectorAll('.triangulo.agua');
    aguaElements.forEach(agua => {
        if (isNearby(aldeano, agua)) {
            aldeano.necesidades.sed = Math.min(10, aldeano.necesidades.sed + 10);
            agua.remove(); // Eliminar el elemento de agua
        }
    });


    // Actualizar barras de progreso
    const barras = aldeano.querySelectorAll('.barra');
    barras.forEach((barra, index) => {
        const key = Object.keys(aldeano.necesidades)[index];
        barra.style.width = `${(aldeano.necesidades[key] / 10) * 100}%`;
    });
}

function isNearby(a, b) {
    const distance = Math.hypot(a.offsetLeft - b.offsetLeft, a.offsetTop - b.offsetTop);
    return distance < 100; // Define la distancia mínima
}
