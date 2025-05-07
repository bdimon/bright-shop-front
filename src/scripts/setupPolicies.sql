-- products: чтение всем
create policy "products: read for all"
  on public.products
  for select
  using (true);

-- orders: только свои
create policy "orders: read own"
  on public.orders
  for select
  using (user_id = auth.uid());

create policy "orders: insert own"
  on public.orders
  for insert
  with check (user_id = auth.uid());

create policy "orders: update own"
  on public.orders
  for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- users: только для разработки, потом можно удалить таблицу
create policy "users: manage own"
  on public.users
  for select, update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "users: delete own"
  on public.users
  for delete
  using (id = auth.uid())
  with check (id = auth.uid());