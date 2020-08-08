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

  def self.progress_calc(stack)
    hash = {}
    hash['total_hours'] = stack.inject(0) { |sum, e| sum + e.hours }
    hash['total_hours_goal'] = stack.inject(0) { |sum, e| sum + e.hours_goal }
    hash['total_projects'] = stack.inject(0) { |sum, e| sum + e.projects }
    hash['total_projects_goal'] = stack.inject(0) { |sum, e| sum + e.projects_goal }
    hash
  end
end
