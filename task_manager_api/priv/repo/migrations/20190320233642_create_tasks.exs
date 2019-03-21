defmodule TaskManagerApi.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :description, :text
      add :completed, :boolean, default: false, null: false
      add :time_worked, :bigint, default: 0, null: false
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

  end
end
