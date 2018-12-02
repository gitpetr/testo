module Testo
  module Entities
    class User < Grape::Entity
      expose :nikname
      expose :firstname
      expose :lastname
      expose :email
      expose :id
    end
  end
end
