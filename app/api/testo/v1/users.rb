module Testo
  module V1
    class Users < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api
      resource :users do
        desc 'Return list of users'
        get do
          users = User.all
          present users, with: Testo::Entities::User
        end

        desc 'Return a specific user'
        route_param :id do
          get do
            user = User.find(params[:id])
            present user, with: Testo::Entities::User
          end
        end

        desc 'Create a user.'
        params do
          requires :user, type: Hash do
            requires :nikname
            requires :firstname
            requires :lastname
            requires :email
            requires :password
          end
        end

        post do
          User.create(params[:user])
        end
      end

      resource :checkindb do
        desc 'Check value in db'
        params do
          requires :user, type: Hash do
            requires :nikname
            requires :email
          end
        end

        post do
          @user = User.new(params[:user])
          puts 'USER', params[:user], @user
          @user.valid?
          @user.errors.full_messages
        end

      end
    end
  end
end
