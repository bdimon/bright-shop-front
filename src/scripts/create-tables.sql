create table if not exists users (
  id uuid primary key,
  email text unique not null,
  full_name text,
  created_at timestamp with time zone default now()
);
create table if not exists products (
  id uuid primary key,
  name text not null,
  price numeric not null,
  quantity integer not null,
  description text,
  images jsonb
);
create table if not exists orders (
  id uuid primary key,
  user_id uuid references users(id) on delete cascade,
  total numeric not null,
  status text check (status in ('created', 'paid', 'shipped', 'cancelled')) default 'created',
  items jsonb not null,
  created_at timestamp with time zone default now()
);
