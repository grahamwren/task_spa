defmodule TaskManagerApiWeb.Router do
  use TaskManagerApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api/v1", TaskManagerApiWeb do
    pipe_through :api
  end
end
