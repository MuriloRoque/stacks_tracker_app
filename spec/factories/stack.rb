FactoryBot.define do
  factory :stack do
    association(:user)
    hours { 5 }
    hours_goal { 5 }
    projects { 5 }
    projects_goal { 5 }
    sequence(:name) { |i| "Stack #{i}" }
  end
end
