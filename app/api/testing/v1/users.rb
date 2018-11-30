module Testing
  module V1
    class Users < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api
      resource :users do
        desc 'Return list of users'
        get do
          users = User.all
          present users, with: Testing::Entities::User
        end

        desc 'Return a specific user'
        route_param :id do
          get do
            user = User.find(params[:id])
            present user, with: Testing::Entities::User
          end
        end

        desc 'Create a user.'
        params do
          requires :user, type: Hash do
            requires :nikname, type: String, desc: 'Nikname'
            requires :firstname, type: String, desc: 'Firstname'
            requires :lastname, type: String, desc: 'Lastname'
            requires :email, type: String, desc: 'Email'
            requires :password, type: String, desc: 'Password'
          end
        end

        post do
          User.create(params[:user])
        end
      end
    end
  end
end
