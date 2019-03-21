defmodule TaskManagerApi.AuthorizationHelpers do
  alias TaskManagerApi.Users.User
  alias TaskManagerApi.Tasks.Task

  def authorize_resource!({:ok, resource}, current_user) do
    with %{} = r <- authorize_resource!(resource, current_user), do: {:ok, r}
  end

  def authorize_resource!(resource, current_user) do
    if (!authorize_resource(resource, current_user)) do
      {:error, "Unauthorized to access resource"}
    else
      resource
    end
  end

  def authorize_resource({:ok, resource}, current_user),
      do: authorize_resource(resource, current_user)

  def authorize_resource(%User{id: user_id}, %User{} = current_user),
       do: current_user.id === user_id

  def authorize_resource(%Task{user_id: user_id}, %User{} = current_user), do: true

  def authorize_resource(_resource, _current_user), do: false
end