class Api::V1::UsersController < ApplicationController

  def show
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def create
    user = User.create!(user_params)

    if user
      render json: user
    else
      render json: recipe.errors
    end
  end

  def destroy
    user&.destroy
    render json: { message: 'User deleted!' }
  end

  private
    def user
      user ||= User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :password)
    end
end
