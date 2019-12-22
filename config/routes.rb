Rails.application.routes.draw do
  get 'tags/index'
  root to: 'home#index'
  
  scope '/api/v1' do
    resources :todos
  end

  get 'welcome/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
