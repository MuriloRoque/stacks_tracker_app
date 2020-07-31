Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'stacks/index'
      post 'stacks/create'
      get '/show/:id', to: 'stacks#show'
      put '/update/:id', to: 'stacks#update'
      delete '/destroy/:id', to: 'stacks#destroy'
      get 'stacks/progress'
    end
  end
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
