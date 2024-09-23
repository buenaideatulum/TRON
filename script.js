// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWuTAtwzOl0fw55dEJ-8uzstvrvewuQq0",
  authDomain: "base-de-datos-dune.firebaseapp.com",
  projectId: "base-de-datos-dune",
  storageBucket: "base-de-datos-dune.appspot.com",
  messagingSenderId: "806858398195",
  appId: "1:806858398195:web:81f2a986d716b95e1d9a86",
  measurementId: "G-BW5S5G4ZFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const database = getDatabase(app);

// Get references to DOM elements
const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const guardarMensaje = document.getElementById('guardarMensaje');
const successMessage = document.getElementById('success-message');

// Show modal when clicking on the button
openModalButton.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Close modal when clicking on close button
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Save message to Firebase
guardarMensaje.addEventListener('click', function() {
    const mensaje = document.getElementById('mensaje').value;
    if (mensaje.length > 0) {
        const mensajeId = push(ref(database, 'mensajes')).key; // Generate unique ID for each message
        set(ref(database, 'mensajes/' + mensajeId), {
            mensaje: mensaje
        }).then(() => {
            showSuccessMessage();
            modal.style.display = 'none';
            document.getElementById('mensaje').value = ''; // Clear the textarea
        }).catch((error) => {
            alert('Error al guardar el mensaje: ' + error);
        });
    } else {
        alert('Por favor escribe un mensaje');
    }
});

// Show success message for 3 seconds
function showSuccessMessage() {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2000);
}
