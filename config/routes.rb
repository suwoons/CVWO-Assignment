Rails.application.routes.draw do
  root to: 'home#index'
  
  scope '/api/v1' do
    resources :todos, :taggings
    resources :tags, only: [:index, :update, :create, :destroy]
  end

  get 'welcome/index' # testing
  get 'tags', to: 'tags#show'# direct to a page to manage tags
end
