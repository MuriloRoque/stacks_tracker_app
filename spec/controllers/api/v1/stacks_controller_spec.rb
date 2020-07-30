require 'rails_helper'

RSpec.describe Api::V1::StacksController, type: :controller do
  describe 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #create' do
    it 'returns http success' do
      post :create
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #show' do
    it 'returns http success' do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #update' do
    it 'returns http success' do
      put :update
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #destroy' do
    it 'returns http success' do
      delete :destroy
      expect(response).to have_http_status(:success)
    end
  end
end
