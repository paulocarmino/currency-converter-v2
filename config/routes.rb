Rails.application.routes.draw do
  root "pages#home"
  post "convert", to: "exchanges#convert"
  get "up" => "rails/health#show", :as => :rails_health_check
end
