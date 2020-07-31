class Stack < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :hours, presence: true
  validates :hours_goal, presence: true
  validates :projects, presence: true
  validates :projects_goal, presence: true

  scope :user_stacks, lambda { |id|
    where(user_id: id)
  }
end
