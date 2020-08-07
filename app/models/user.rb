class User < ApplicationRecord
  has_secure_password

  has_many :stacks

  validates :email, presence: true, uniqueness: true, length: { minimum: 11 }
  validates :password, presence: true, length: { minimum: 6 }, confirmation: true
  validates_confirmation_of :password
end
