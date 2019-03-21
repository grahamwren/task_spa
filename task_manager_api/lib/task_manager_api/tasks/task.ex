defmodule TaskManagerApi.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :title, :string
    field :time_worked, :integer, default: 0
    belongs_to :user, TaskManagerApi.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :time_worked, :user_id])
    |> foreign_key_constraint(:user_id)
    |> validate_length(:title, max: 255)
    |> validate_number(:time_worked, greater_than_or_equal_to: 0)
    |> validate_required([:title, :completed, :time_worked, :user_id])
  end
end
