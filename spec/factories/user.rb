FactoryBot.define do
  factory :user do
    password { '123456' }
    sequence(:email) { |i| "my-email-#{i}@mail.com" }
  end
end
