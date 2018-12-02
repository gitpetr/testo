class User < ApplicationRecord
  validates :nikname, :firstname, :lastname, :email, :password, presence: true
  validates :nikname, format: { with: /\A[a-zA-Z][a-zA-Z0-9]+\z/,
                                message: "Только латинские буквы и цифры, начинаться должно с буквы" }
  validates :nikname, uniqueness: { case_sensitive: false }
  validates :email, uniqueness: { case_sensitive: false }
end
