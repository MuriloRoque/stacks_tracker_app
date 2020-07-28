class Api::V1::UsersController < ApplicationController
  wrap_parameters :user, include: %i[email password]

  def index
    users = User.all
    render json: users
  end

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
      render json: user.errors
    end
  end

  def destroy
    user&.destroy
    render json: { message: 'User deleted!' }
  end

  def find
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  private

  def user
    user ||= User.find(params[:id])
    user
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
