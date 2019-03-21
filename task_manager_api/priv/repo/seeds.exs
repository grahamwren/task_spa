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
alias TaskManagerApi.Users.User
alias TaskManagerApi.Tasks.Task

%{password_hash: password_hash} = Argon2.add_hash("password")

alex = Repo.insert!(%User{
  first_name: "Alex",
  last_name: "Smith",
  email: "alex@mic.com",
  password_hash: password_hash
})

blake = Repo.insert!(%User{
  first_name: "Blake",
  last_name: "Smith",
  email: "blake@mic.com",
  password_hash: password_hash
})

Repo.insert!(%Task{
  title: "Alex 1st Task",
  description: "This is alex's first task, it might take awhile",
  user_id: alex.id
})

Repo.insert!(%Task{
  title: "Alex 2nd Task",
  description: "This is alex's second task, it might also take awhile",
  user_id: alex.id
})

Repo.insert!(%Task{
  title: "Blake 1st Task",
  description: "This is blake's first task, it might take awhile",
  user_id: blake.id
})

Repo.insert!(%Task{
  title: "Blake 2nd Task",
  description: "This is blake's second task, it might also take awhile",
  user_id: blake.id
})