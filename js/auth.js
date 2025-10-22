/**
 * Nombre del programa: auth.js
 * ¿Para que sirve?
 * Este programa maneja la lógica para el inicio y cierre de sesión, además de manejar el proceso del registro de un usuario nuevo
 * 
 * Autor: Lázaro López Hernández
 * 
 * Fecha de creacion: 20 de abril del 2025
 * 
 */
import { supabase } from './supabase.js';
import { loadPosts } from './posts.js';
let currentUser = null;
// Elementos
const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const navbar = document.getElementById('navbar');
const postContainer = document.getElementById('post-container');
const profileContainer = document.getElementById('profile-container');

// Mostrar formulario de registro
showRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    loginCard.classList.add('d-none');
    registerCard.classList.remove('d-none');
});

// Mostrar formulario de login
showLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    registerCard.classList.add('d-none');
    loginCard.classList.remove('d-none');
});

// Evento para registrar usuario
registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const location = document.getElementById('register-location').value.trim();
    const bio = document.getElementById('register-bio').value.trim();
    const { data, error } = await supabase
        .from('profiles')
        .insert([{ username: username, password: password, telefono: phone, ubicacion: location, bio }]);

    if (error) {
        alert('Error al registrar: ' + error.message);
    } else {
        alert('Registro exitoso. Ahora inicia sesión.');
        registerCard.classList.add('d-none');
        loginCard.classList.remove('d-none');
    }
});

// Evento para iniciar sesión
loginForm?.addEventListener('submit', async (e) => {
    let currentUser = null;
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .maybeSingle();

    if (error || !data) {
        alert('Usuario o contraseña incorrectos.');
    } else {
        alert('¡Bienvenido, ' + data.username + '!');
        loginCard.classList.add('d-none');
        navbar.classList.remove('d-none');
        postContainer.classList.remove('d-none');
        currentUser = data;
        window.currentUser = currentUser;
        window.loadPosts();
    }
});

// Evento para cerrar sesión
document.getElementById('nav-logout')?.addEventListener('click', () => {
    navbar.classList.add('d-none');
    postContainer.classList.add('d-none');
    profileContainer.classList.add('d-none');
    loginCard.classList.remove('d-none');
    loginForm.reset();
});

