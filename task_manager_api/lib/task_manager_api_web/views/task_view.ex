defmodule TaskManagerApiWeb.TaskView do
  use TaskManagerApiWeb, :view
  alias TaskManagerApiWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      time_worked: task.time_worked,
      completed: task.completed,
      user_id: task.user_id}
  end
end
