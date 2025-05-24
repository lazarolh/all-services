/**
 * Nombre del programa: supabase.js
 * ¿Para que sirve?
 * Este programa está destinado a funcionar con la lógica necesaria para cargar las publicaciones almacenadas en la base de datos
 * esto ocurre al iniciar sesión en la aplicación, y tambíen se encuentra la lógica para filtrar las publicaciones
 * 
 * Autor: Lázaro López Hernández
 *        Ricardo Parra Bonilla
 * 
 * Fecha de creacion: 20 de abril del 2025
 * Fecha de entrega: 24 de mayo del 2025
 */
import { supabase } from './supabase.js';
const postContent = document.getElementById('post-content');
const createPostBtn = document.getElementById('create-post-btn');
const postsList = document.getElementById('posts-list');

// Cargar todas las publicaciones
async function loadPosts() {
    const category = document.getElementById('category-filter')?.value.toLowerCase() || '';
    const keyword = document.getElementById('text-filter')?.value.toLowerCase() || '';

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        alert('Error al cargar publicaciones: ' + error.message);
        return;
    }

    postsList.innerHTML = '';

    const filtered = data.filter(post => {
        const contenido = post.contenido.toLowerCase();
        return (
            (!category || contenido.includes(category)) &&
            (!keyword || contenido.includes(keyword))
        );
    });

    if (filtered.length === 0) {
        postsList.innerHTML = '<p>No se encontraron publicaciones.</p>';
        return;
    }

    filtered.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('card', 'mb-3');
        postElement.innerHTML = `
      <div class="card-body">
        <img src="https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 70)}" alt="User">
        <p class="card-text">${post.contenido}</p>
        <button class="btn btn-sm btn-outline-primary" onclick="viewProfile('${post.user_id}')">
              Ver perfil
            </button>
    
      </div>
    `;
        postsList.appendChild(postElement);
    });
}

window.loadPosts = loadPosts;

//Creación de una nueva publicación
createPostBtn?.addEventListener('click', async () => {
    const content = postContent.value.trim();
    if (!content) return alert('Escribe algo antes de publicar.');

    const { error } = await supabase
        .from('posts')
        .insert([{ user_id: currentUser.id, contenido: content }]);

    if (error) {
        alert('Error al crear publicación: ' + error.message);
    } else {
        postContent.value = '';
        loadPosts();
    }
});

//Carga de publicaciones por medio de un filtrado por categoría o palabra clave
document.getElementById('category-filter').addEventListener('change', loadPosts);
document.getElementById('text-filter').addEventListener('input', loadPosts);
document.getElementById('clear-filters').addEventListener('click', () => {
    document.getElementById('category-filter').value = '';
    document.getElementById('text-filter').value = '';
    loadPosts();
});