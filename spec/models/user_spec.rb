require 'rails_helper'

describe User do
  let(:user) { create(:user) }

  describe 'associations' do
    subject { user }

    it { should have_many(:stacks) }
  end

  describe 'validations' do
    subject { user }

    it { should validate_presence_of(:email) }
  end
end
