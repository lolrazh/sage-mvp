-- Migration to create initial tables

-- users table (extending auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  onboarding_data jsonb
);

-- messages table (for chat logs)
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  content text,
  role text,
  timestamp timestamptz default now()
);

-- daily summaries
create table if not exists public.daily_summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  date date not null,
  summary jsonb,
  -- Ensure only one summary per user per day
  unique (user_id, date)
);

-- insights
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  date date not null,
  insight_json jsonb,
  -- Ensure only one insight per user per day
  unique (user_id, date)
); 