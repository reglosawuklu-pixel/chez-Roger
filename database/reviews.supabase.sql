-- À exécuter dans Supabase > SQL Editor.
-- Les avis sont privés et ne sont jamais publiés automatiquement.
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  full_name varchar(120) not null,
  email varchar(254) not null,
  rating smallint not null check (rating between 1 and 5),
  message varchar(2000) not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  constraint reviews_name_length check (char_length(trim(full_name)) between 2 and 120),
  constraint reviews_message_length check (char_length(trim(message)) between 3 and 2000)
);

alter table public.reviews enable row level security;
revoke all on table public.reviews from anon, authenticated;
grant all on table public.reviews to service_role;
