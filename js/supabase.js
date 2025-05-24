/**
 * Nombre del programa: supabase.js
 * ¿Para que sirve?
 * El propósito de este programa es crear la conexión con la base de datos alojada en supabase y poder manipular los datos
 * 
 * Autor: Lázaro López Hernández
 * 
 * Fecha de creacion: 10 de abril del 2025
 * Fecha de entrega: 24 de mayo del 2025
 */
// Inicializar Supabase con la url y api del proyecto
export const supabaseUrl = 'https://ytnevvnbvwuocrtuixyi.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0bmV2dm5idnd1b2NydHVpeHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Nzc2ODcsImV4cCI6MjA2MDA1MzY4N30.NjaJ0LVfRnl-pgP8tGcjDs5T5T6jswmNMYzZwAZA1H4';
export const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);