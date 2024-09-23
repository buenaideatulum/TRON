// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWuTAtwzOl0fw55dEJ-8uzstvrvewuQq0",
  authDomain: "base-de-datos-dune.firebaseapp.com",
  databaseURL: "https://base-de-datos-dune-default-rtdb.firebaseio.com", // Asegúrate de incluir esta línea
  projectId: "base-de-datos-dune",
  storageBucket: "base-de-datos-dune.appspot.com",
  messagingSenderId: "806858398195",
  appId: "1:806858398195:web:81f2a986d716b95e1d9a86",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Obtener referencias a los elementos del DOM
const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const guardarMensaje = document.getElementById('guardarMensaje');
const successMessage = document.getElementById('success-message');

// Mostrar el modal al hacer clic en el botón
openModalButton.addEventListener('click', function() {
    console.log("Botón presionado");
    modal.style.display = 'block';
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Guardar el mensaje en Firebase
guardarMensaje.addEventListener('click', function() {
    const mensaje = document.getElementById('mensaje').value;
    if (mensaje.length > 0) {
        const mensajeId = push(ref(database, 'mensajes')).key; // Generar un ID único para cada mensaje
        set(ref(database, 'mensajes/' + mensajeId), {
            mensaje: mensaje
        }).then(() => {
            showSuccessMessage();
            modal.style.display = 'none';
            document.getElementById('mensaje').value = ''; // Limpiar el textarea
        }).catch((error) => {
            alert('Error al guardar el mensaje: ' + error);
        });
    } else {
        alert('Por favor escribe un mensaje');
    }
});

// Mostrar mensaje de éxito durante 3 segundos
function showSuccessMessage() {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}
