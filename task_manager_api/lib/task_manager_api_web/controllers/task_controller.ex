defmodule TaskManagerApiWeb.TaskController do
  use TaskManagerApiWeb, :controller

  alias TaskManagerApi.Tasks
  alias TaskManagerApi.Tasks.Task

  action_fallback TaskManagerApiWeb.FallbackController

  def index(conn, %{"user_id" => user_id}) do
    tasks = Tasks.list_tasks_for_user(user_id)
    render(conn, "index.json", tasks: tasks)
  end

  def index(conn, %{}) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)
    with %Task{} = task <- authorize_resource!(task, conn.assigns.user) do
      with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
        render(conn, "show.json", task: task)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    with %Task{} = task <- authorize_resource!(task, conn.assigns.user) do
      with {:ok, %Task{}} <- Tasks.delete_task(task) do
        send_resp(conn, :no_content, "")
      end
    end
  end
end
