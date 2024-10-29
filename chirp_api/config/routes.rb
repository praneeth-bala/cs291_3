Rails.application.routes.draw do      
  post 'login', to: 'sessions#create'
  post 'logout', to: 'sessions#destroy'

  post 'users/search', to: 'users#search'
  # post 'users/:id/follow', to: 'users#follow'

  post 'posts/create', to: 'posts#create'
  post 'posts/:id/update', to: 'posts#update'
  post 'posts/:id/destroy', to: 'posts#destroy'
  post 'posts/list', to: 'posts#list'
  post 'posts/:id', to: 'posts#show'

  post 'posts/:post_id/comments/create', to: 'comments#create'
end
