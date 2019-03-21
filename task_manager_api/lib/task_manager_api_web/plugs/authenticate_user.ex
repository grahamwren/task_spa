defmodule TaskManagerApiWeb.Plugs.AuthenticateUser do
  use Phoenix.Controller, namespace: TaskManagerWeb
  import Plug.Conn
  alias TaskManagerApi.Users
  alias TaskManagerApi.Users.User

  def init(default), do: default

  def call(%Plug.Conn{req_headers: headers} = conn, _default) do
    headers
    |> Enum.find_value(fn
      {"authorization", "Bearer " <> token} -> token
      _ -> false
    end)
    |> (&Phoenix.Token.verify TaskManagerApiWeb.Endpoint, "user_id", &1, max_age: 86400).()
    |> fn
         {:ok, user_id} ->
           case Users.get_user(user_id) do
             %User{} = user -> assign(conn, :user, user)
             _ -> conn
                  |> put_status(:unauthorized)
                  |> put_view(TaskManagerApiWeb.ErrorView)
                  |> render("401.json")
                  |> halt
           end
         {:error, _reason} ->
           conn
           |> put_status(:unauthorized)
           |> put_view(TaskManagerApiWeb.ErrorView)
           |> render("401.json")
           |> halt
       end.()
  end
end