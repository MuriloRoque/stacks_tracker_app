require 'rails_helper'

describe Stack do
  let(:stack) { create(:stack) }

  describe 'associations' do
    subject { stack }

    it { should belong_to(:user).dependent(:destroy) }
  end

  describe 'validations' do
    subject { stack }

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:hours) }
    it { should validate_presence_of(:hours_goal) }
    it { should validate_presence_of(:projects) }
    it { should validate_presence_of(:projects_goal) }
  end

  describe 'Progress calculation' do
    let(:stack) { create_list(:stack, 25) }
    subject { described_class.progress_calc(stack) }

    it {
      is_expected.to eq({ 'total_hours' => 125,
                          'total_hours_goal' => 125,
                          'total_projects' => 125,
                          'total_projects_goal' => 125 })
    }
  end
end
