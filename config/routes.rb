Rails.application.routes.draw do
  root 'landing#index'
  mount Testo::Base => '/'
  match '*path', to: 'landing#index', via: :all
end
