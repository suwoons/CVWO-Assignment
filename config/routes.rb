Rails.application.routes.draw do
  get 'tagging/index'
  root to: 'home#index'
  
  scope '/api/v1' do
    resources :todos
    resources :tags, only: [:index, :update, :create, :destroy]
  end

  get 'welcome/index' # testing
  get 'tags', to: 'tags#show'# direct to a page to manage tags
end
