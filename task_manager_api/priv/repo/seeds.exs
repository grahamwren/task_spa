# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskManagerApi.Repo.insert!(%TaskManagerApi.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TaskManagerApi.Repo
alias TaskManagerApi.Users
alias TaskManagerApi.Users.User

%{password_hash: password_hash} = Argon2.add_hash("password")

Repo.insert!(%User{
  first_name: "Alex",
  last_name: "Smith",
  email: "alex@mic.com",
  password_hash: password_hash
})

Repo.insert!(%User{
  first_name: "Blake",
  last_name: "Smith",
  email: "blake@mic.com",
  password_hash: password_hash
})
