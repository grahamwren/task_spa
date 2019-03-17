defmodule TaskManagerApiWeb.UserController do
  use TaskManagerApiWeb, :controller

  alias TaskManagerApi.Users
  alias TaskManagerApi.Users.User

  action_fallback TaskManagerApiWeb.FallbackController

  def index(conn, _params) do
    users =
      Users.list_users()
      |> Enum.filter(&authorize_resource(&1, conn.assigns.user))

    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    with %User{} = user <- Users.get_user!(id) |> authorize_resource!(conn.assigns.user) do
      render(conn, "show.json", user: user)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user =
      Users.get_user!(id)
      |> authorize_resource!(conn.assigns.user)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user =
      Users.get_user!(id)
      |> authorize_resource(conn.assigns.user)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end