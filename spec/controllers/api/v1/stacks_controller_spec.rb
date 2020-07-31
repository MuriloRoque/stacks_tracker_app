require 'rails_helper'

describe Api::V1::StacksController do
  let(:user) { create(:user) }
  let(:stack) { create(:stack) }

  describe '#show' do
    subject { get 'show', params: { id: stack.id } }

    context 'as user' do
      it { is_expected.to be_successful }

      it 'returns valid JSON' do
        body = JSON.parse(subject.body)
        expect(body.length).to eq(9)
      end
    end
  end

  describe '#create' do
    let(:stack_params) { { name: nil } }

    subject { post 'create', params: { stack: stack_params } }

    context 'as user' do
      context 'with valid params' do
        let(:stack_params) { { name: 'Title', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5, userId: user.id } }

        it 'creates a stack' do
          expect { subject }.to change(Stack, :count).by(1)
        end
      end

      context 'with valid params' do
        let(:stack_params) { { name: 'Title', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5, userId: user.id } }
        it { is_expected.to have_http_status(200) }
      end
    end
  end

  describe '#update' do
    let(:stack_params) { { name: nil } }
    let(:stack) { create(:stack) }

    subject { put 'update', params: { stack: stack_params, id: stack.id } }

    context 'as user' do
      context 'with valid params' do
        let(:stack_params) { { name: 'Title', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5, userId: user.id } }

        it 'creates a stack' do
          expect { subject }.to change(Stack, :count).by(1)
        end
      end

      context 'with valid params' do
        let(:stack_params) { { name: 'Title', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5, userId: user.id } }
        it { is_expected.to have_http_status(200) }
      end
    end
  end

  describe '#destroy' do
    let(:stack) { create(:stack) }
    subject { delete :destroy, params: { id: stack.id } }

    before { stack }

    context 'as user' do
      it 'removes requested record' do
        expect { subject }.to change(Stack, :count).by(-1)
      end
    end
  end
end
