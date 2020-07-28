require 'rails_helper'
require 'capybara/rspec'

describe 'Signing in', type: :feature do
  it 'tests if sign in is successful' do
    user = User.new(email: 'murilo@gmail.com', password: '123456')
    user.save
    visit '/login'
    within('form') do
      fill_in 'session_name', with: 'Murilo'
    end
    click_button 'Log in'

    expect(page).to have_content 'Log out'
  end
end

describe 'Signing up', type: :feature do
  describe 'signup page is showing the right fields' do
    it 'shows REGISTER at the top of signup page' do
      visit '/users/new'
      expect(page).to have_content 'REGISTER'
    end
    it 'shows the email from signup page' do
      visit '/users/new'
      expect(page).to have_content 'gender'
    end
  end
end