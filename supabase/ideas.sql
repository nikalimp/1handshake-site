-- Таблица идей с сайта 1handshake.com (/ideas). Выполнить один раз в Supabase → SQL Editor проекта app.
-- Сайт может только добавлять строки (insert); читать — только админка (service role / админ-доступ).
create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  idea text not null check (char_length(idea) between 3 and 4000),
  name text check (char_length(name) <= 120),
  email text check (char_length(email) <= 200),
  page text check (char_length(page) <= 500),
  status text not null default 'new' check (status in ('new', 'read', 'planned', 'done', 'rejected'))
);
alter table public.ideas enable row level security;
drop policy if exists "anyone can send an idea" on public.ideas;
create policy "anyone can send an idea" on public.ideas for insert to anon, authenticated
  with check (status = 'new');
grant insert on public.ideas to anon, authenticated;
