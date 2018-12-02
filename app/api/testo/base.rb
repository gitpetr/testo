module Testo
  class Base < Grape::API
    mount Testo::V1::Users
  end
end
