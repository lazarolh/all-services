/* * Nombre del programa: script.sql
 * ¿Para que sirve?
 * Este script tiene la funcionalidad de crear las tablas necesarias en la base de datos de supabase, con tecnología postgres, que son necesarias 
  * para la gestión de la información manejada en la aplicación
  
 * Autor: Erika Daniela Martinez Villa, 
          Lázaro López Hernández, 
          Ricardo Parra Bonilla, 
          Ángel de Jesús Callejas Graillet,
          Jesús Alberto Apolinar Hermenegildo
 * 
 * Fecha de creacion: 8 de abril del 2025
 * Fecha de entrega: 24 de mayo del 2025
 */ 
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text,
  password text,
  telefono text,
  ubicacion text,
  foto text,
  biot text,
  rating numeric default 0,
  rating_count int8 default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table posts ( 
  id serial primary key, user_id uuid references auth.users on delete cascade,
  contenido text,
  created_at timestamp with time zone default timezone('utc'::text, now()) 
);
