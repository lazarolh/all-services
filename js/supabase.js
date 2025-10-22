/**
 * Nombre del programa: supabase.js
 * ¿Para que sirve?
 * El propósito de este programa es crear la conexión con la base de datos alojada en supabase y poder manipular los datos
 * 
 * Autor: Lázaro López Hernández
 * 
 * Fecha de creacion: 10 de abril del 2025
 *
 */
// Inicializar Supabase con la url y api del proyecto
export const supabaseUrl = 'https://.supabase.co';
export const supabaseKey = '';

export const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
