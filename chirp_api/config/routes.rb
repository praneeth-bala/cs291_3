Rails.application.routes.draw do
  post 'login', to: 'sessions#create'
  post 'logout', to: 'sessions#destroy'
  
  resources :users, only: [:create, :index, :show] do
    resources :posts, only: [:index]
  end
  
  resources :posts, only: [:create, :show, :update, :destroy] do
    resources :comments, only: [:create]
  end
  
  get 'users/search', to: 'users#search'
  post 'users/:id/follow', to: 'users#follow'
end
