/**
 * Nombre del programa: profile.js
 * ¿Para que sirve?
 * El propósito de este programa es manejar los eventos para acceder a la sección de los perfiles,
 * en donde se muestra la información de los usuarios
 * 
 * Autor: Lázaro López Hernández
 *        Erika Daniela Martinez Villa
 * 
 * Fecha de creacion: 20 de abril del 2025
 * Fecha de entrega: 24 de mayo del 2025
 */
import { supabase } from './supabase.js';
// Elementos
const postContainer = document.getElementById('post-container');
const profileContainer = document.getElementById('profile-container');
const profileInfo = document.getElementById('profile-info');
const profileRating = document.getElementById('profile-rating');
const rateProfileBtn = document.getElementById('rate-profile-btn');
const navProfile = document.getElementById('nav-profile');
const editBtn = document.getElementById('edit-profile-btn');
const cancelBtn = document.getElementById('cancel-edit-btn');
const saveBtn = document.getElementById('save-profile-btn');


// Mostrar el perfil
navProfile?.addEventListener('click', () => {
    profileContainer.classList.remove('d-none');
    postContainer.classList.add('d-none');
    loadProfile();
});
//Evento para editar pefil
editBtn?.addEventListener('click', () => {
    document.getElementById('edit-profile-form').classList.remove('d-none');
    const user = window.currentUser;
    document.getElementById('edit-phone').value = user.telefono || '';
    document.getElementById('edit-location').value = user.ubicacion || '';
    document.getElementById('edit-bio').value = user.bio || '';
});

cancelBtn?.addEventListener('click', () => {
    document.getElementById('edit-profile-form').classList.add('d-none');
});

saveBtn?.addEventListener('click', async () => {
    const telefono = document.getElementById('edit-phone').value.trim();
    const ubicacion = document.getElementById('edit-location').value.trim();
    const bio = document.getElementById('edit-bio').value.trim();

    const { error } = await supabase
        .from('profiles')
        .update({ telefono, ubicacion, bio })
        .eq('id', window.currentUser.id);

    if (error) {
        alert('Error al actualizar el perfil: ' + error.message);
    } else {
        alert('Perfil actualizado exitosamente.');
        window.currentUser.telefono = telefono;
        window.currentUser.ubicacion = ubicacion;
        window.currentUser.bio = bio;
        document.getElementById('edit-profile-form').classList.add('d-none');
        loadProfile();
    }
});
//Evento para cargar la información de un usuario
async function loadProfile() {
    document.getElementById('rate-profile-btn')?.classList.add('d-none');
    if (!currentUser) return;
    document.getElementById('edit-profile-btn').classList.remove('d-none');
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', window.currentUser.id)
        .maybeSingle();

    if (error || !data) {
        profileInfo.innerHTML = '<p>Error al cargar tu perfil.</p>';
    } else {
        let ratingTexto = 'Sin calificaciones';
        if (data.rating_count > 0) {
            const promedio = data.rating / data.rating_count;
            const estrellas = generarEstrellasFA(promedio);
            ratingTexto = `${promedio.toFixed(2)} ${estrellas} (${data.rating_count} votos)`;
        }
        profileInfo.innerHTML = `
      <p><strong>Usuario:</strong> ${data.username}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <p><strong>Ubicación:</strong> ${data.ubicacion}</p>
    <p><strong>Biografía:</strong> ${data.bio || 'No disponible'}</p>
      <p><strong>Rating:</strong> ${ratingTexto}</p>
    `;

    }
}



// Función para mostrar visualmente estrellas según las calificaciones de los usuarios
function generarEstrellasFA(rating) {
    const totalEstrellas = 5;
    const estrellasLlenas = Math.floor(rating);
    const mediaEstrella = rating % 1 >= 0.5 ? 1 : 0;
    const estrellasVacias = totalEstrellas - estrellasLlenas - mediaEstrella;

    let estrellasHTML = "";

    for (let i = 0; i < estrellasLlenas; i++) {
        estrellasHTML += '<i class="fas fa-star text-warning"></i>';
    }
    if (mediaEstrella) {
        estrellasHTML += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    for (let i = 0; i < estrellasVacias; i++) {
        estrellasHTML += '<i class="far fa-star text-warning"></i>';
    }

    return estrellasHTML;
}

window.viewProfile = async function viewProfile(userId) {
    document.getElementById('rate-profile-btn')?.classList.remove('d-none');
    const profileContainer = document.getElementById('profile-container');
    const postContainer = document.getElementById('post-container');
    const profileInfo = document.getElementById('profile-info');

    profileContainer.classList.remove('d-none');
    postContainer.classList.add('d-none');
    document.getElementById('edit-profile-btn').classList.add('d-none');
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    profileInfo.dataset.userid = data?.id;

    if (error || !data) {
        profileInfo.innerHTML = '<p>Error al cargar el perfil.</p>';
    } else {
        let ratingTexto = 'Sin calificaciones';
        if (data.rating_count > 0) {
            const promedio = data.rating / data.rating_count;
            const estrellas = generarEstrellasFA(promedio);
            ratingTexto = `${promedio.toFixed(2)} ${estrellas} (${data.rating_count} votos)`;
        }

        profileInfo.innerHTML = `
  <p><strong>Usuario:</strong> ${data.username}</p>
  <p><strong>Teléfono:</strong> ${data.telefono}</p>
  <p><strong>Ubicación:</strong> ${data.ubicacion}</p>
      <p><strong>Biografía:</strong> ${data.bio || 'No disponible'}</p>
  <p><strong>Rating:</strong> ${ratingTexto}</p>
`;
    }
}

// Evento para calificar a un usuario
document.getElementById('rate-profile-btn')?.addEventListener('click', async () => {
    if (!currentUser || !profileInfo.dataset.userid) return;

    const userId = profileInfo.dataset.userid;

    const input = prompt('Califica este perfil del 1 al 5:');
    const rating = parseInt(input);

    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert('Por favor ingresa un número válido entre 1 y 5.');
        return;
    }

    // Obtener los valores actuales
    const { data, error } = await supabase
        .from('profiles')
        .select('rating, rating_count')
        .eq('id', userId)
        .maybeSingle();

    if (error || !data) {
        alert('Error al obtener datos del perfil.');
        return;
    }

    const newRating = (data.rating || 0) + rating;
    const newCount = (data.rating_count || 0) + 1;

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ rating: newRating, rating_count: newCount })
        .eq('id', userId);

    if (updateError) {
        alert('Error al guardar la calificación.');
    } else {
        alert('Gracias por tu calificación.');
        window.viewProfile(userId); // recarga el perfil actualizado
    }
});