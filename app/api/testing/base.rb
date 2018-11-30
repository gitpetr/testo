module Testing
  class Base < Grape::API
    mount Testing::V1::Users
  end
end
