-- AdaptIQ AI database schema
-- Run this file in Supabase Dashboard -> SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    name text not null,
    email text not null unique,
    created_at timestamptz not null default now()
);

create table if not exists public.learning_twins (
    id uuid primary key default gen_random_uuid(),
    student_id uuid not null unique references public.profiles(id) on delete cascade,
    learning_style text not null default 'not_set',
    explanation_style text not null default 'not_set',
    confidence_score integer not null default 50 check (confidence_score between 0 and 100),
    strong_topics text[] not null default '{}',
    weak_topics text[] not null default '{}',
    recurring_mistakes text[] not null default '{}',
    updated_at timestamptz not null default now()
);

create table if not exists public.documents (
    id uuid primary key default gen_random_uuid(),
    student_id uuid not null references public.profiles(id) on delete cascade,
    filename text not null,
    file_url text not null,
    created_at timestamptz not null default now()
);

create table if not exists public.quiz_results (
    id uuid primary key default gen_random_uuid(),
    student_id uuid not null references public.profiles(id) on delete cascade,
    topic text not null,
    score numeric(5, 2) not null check (score between 0 and 100),
    total_questions integer not null check (total_questions > 0),
    mistakes text[] not null default '{}',
    created_at timestamptz not null default now()
);

create table if not exists public.learning_history (
    id uuid primary key default gen_random_uuid(),
    student_id uuid not null references public.profiles(id) on delete cascade,
    activity_type text not null,
    topic text,
    performance numeric(5, 2) check (performance between 0 and 100),
    created_at timestamptz not null default now()
);

create index if not exists learning_twins_student_id_idx on public.learning_twins(student_id);
create index if not exists documents_student_created_idx on public.documents(student_id, created_at desc);
create index if not exists quiz_results_student_created_idx on public.quiz_results(student_id, created_at desc);
create index if not exists learning_history_student_created_idx on public.learning_history(student_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.learning_twins enable row level security;
alter table public.documents enable row level security;
alter table public.quiz_results enable row level security;
alter table public.learning_history enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Users can view their own learning twin" on public.learning_twins;
drop policy if exists "Users can update their own learning twin" on public.learning_twins;
drop policy if exists "Users can view their own documents" on public.documents;
drop policy if exists "Users can create their own documents" on public.documents;
drop policy if exists "Users can delete their own documents" on public.documents;
drop policy if exists "Users can view their own quiz results" on public.quiz_results;
drop policy if exists "Users can create their own quiz results" on public.quiz_results;
drop policy if exists "Users can view their own learning history" on public.learning_history;
drop policy if exists "Users can create their own learning history" on public.learning_history;

create policy "Users can view their own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

create policy "Users can view their own learning twin"
    on public.learning_twins for select
    using (auth.uid() = student_id);

create policy "Users can update their own learning twin"
    on public.learning_twins for update
    using (auth.uid() = student_id)
    with check (auth.uid() = student_id);

create policy "Users can view their own documents"
    on public.documents for select
    using (auth.uid() = student_id);

create policy "Users can create their own documents"
    on public.documents for insert
    with check (auth.uid() = student_id);

create policy "Users can delete their own documents"
    on public.documents for delete
    using (auth.uid() = student_id);

create policy "Users can view their own quiz results"
    on public.quiz_results for select
    using (auth.uid() = student_id);

create policy "Users can create their own quiz results"
    on public.quiz_results for insert
    with check (auth.uid() = student_id);

create policy "Users can view their own learning history"
    on public.learning_history for select
    using (auth.uid() = student_id);

create policy "Users can create their own learning history"
    on public.learning_history for insert
    with check (auth.uid() = student_id);

-- Keep a profile row in sync when Supabase Auth creates a user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, name, email)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
        new.email
    )
    on conflict (id) do update set email = excluded.email;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
