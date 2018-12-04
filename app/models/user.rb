class User < ApplicationRecord
  validates :nikname, :firstname, :lastname, :email, :password, presence: true
  validates :nikname, format: { with: /\A[a-zA-Z][a-zA-Z0-9]+\z/,
                                message: "Только латинские буквы и цифры, начинаться должно с буквы" }
  validates :firstname, :lastname, format: { with: /\A[а-яА-Я][а-яА-Я0-9]+\z/,
                                message: "Только русские буквы и цифры, начинаться должно с буквы" }                               
  validates :nikname, uniqueness: { case_sensitive: false }
  validates :email, uniqueness: { case_sensitive: false }

  before_save :not_save_reserved_data_from_services

  private

  def not_save_reserved_data_from_services
    throw :abort if (nikname == 'testtesttesttest') || (email == 'test@test.test')
  end
end
