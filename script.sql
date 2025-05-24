--Este script 
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