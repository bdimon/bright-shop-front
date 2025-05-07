create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  created_at timestamp with time zone default now()
);
