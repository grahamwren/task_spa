defmodule TaskManagerApiWeb.Router do
  use TaskManagerApiWeb, :router

  pipeline :api do
    plug CORSPlug, [origin: "http://localhost:3000"]
    plug :accepts, ["json"]
  end

  pipeline :with_auth do
    plug TaskManagerApiWeb.Plugs.AuthenticateUser
  end

  scope "/api/v1", TaskManagerApiWeb do
    pipe_through :api

    post "/login", SessionController, :create, singleton: true
    resources "/users", UserController, only: [:create]

    pipe_through :with_auth

    resources "/users", UserController, except: [:new, :create, :edit] do
      resources "/tasks", TaskController, only: [:index]
    end

    resources "/tasks", TaskController, except: [:new, :edit, :index]
  end
end
