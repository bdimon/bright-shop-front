create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  description text,
  quantity integer not null,
  images text[], -- массив ссылок на изображения
  
  created_at timestamp with time zone default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  created_at timestamp with time zone default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  items jsonb not null,
  total numeric(10,2) not null,
  created_at timestamp with time zone default now()
);