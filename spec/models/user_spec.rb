require 'rails_helper'
require 'spec_helper'
require 'capybara/rspec'

RSpec.describe User, type: :model do
  context 'validation tests' do
    it 'Should be valid if the attributes are' do
      expect(User.new(email: 'murilo@gmail.com', password: '123456')).to be_valid
    end

    it "Shouldn't save if the email is less than 11 characters" do
      u = User.new(email: '@gmail.com', password: '123456')
      expect(u.save).to eq(false)
    end

    it "Shouldn't save if the e-mail is already taken" do
      u1 = User.new(email: 'murilo@gmail.com', password: '123456')
      u1.save
      u2 = User.new(email: 'murilo@gmail.com', password: '123456')
      expect(u2.save).to eq(false)
    end

    it 'Should save if everything validates' do
      u = User.new(email: 'murilo@gmail.com', password: '123456')
      expect(u.save).to eq(true)
    end

    it "Shouldn't save if password is less than 6 characters" do
      u = User.new(email: 'murilo@gmail.com', password: '12345')
      expect(u.save).to eq(false)
    end
  end
end