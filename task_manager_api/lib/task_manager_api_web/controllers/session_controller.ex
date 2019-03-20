defmodule TaskManagerApiWeb.SessionController do
  use TaskManagerApiWeb, :controller

  alias TaskManagerApi.Users
  alias TaskManagerApi.Users.User

  action_fallback TaskManagerApiWeb.FallbackController

  def create(conn, params) do
    %{"email" => email, "password" => password} = IO.inspect(params)
    with {:ok, %User{} = user} <- Users.get_and_auth_user(email, password) do
      resp = %{data: %{
        user_id: user.id,
        token: Phoenix.Token.sign(TaskManagerApiWeb.Endpoint, "user_id", user.id)
      }}

      conn
      |> put_resp_header("content-type", "application/json")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end