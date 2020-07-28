class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true, length: { minimum: 11 }
  validates :password, presence: true, length: { minimum: 6 }
end
