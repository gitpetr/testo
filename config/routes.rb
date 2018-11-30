Rails.application.routes.draw do
  root 'landing#index'
  mount Testing::Base => '/'
  match '*path', to: 'landing#index', via: :all
end
