-- Auto-create a public.profiles row whenever a new auth.users row is created,
-- so every signed-in user (email or OAuth) has a profile to attach co-signs,
-- tributes, and honorees to.

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
