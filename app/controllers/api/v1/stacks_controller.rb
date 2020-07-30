class Api::V1::StacksController < ApplicationController
  def index
    stack = Stack.all.order(created_at: :desc)
    render json: stack
  end

  def create
    stack = Stack.create!(stack_params)
    if stack
      render json: stack
    else
      stack json: stack.errors
    end
  end

  def show
    if stack
      render json: stack
    else
      render json: stack.errors
    end
  end

  def update
    if stack.update(stack_params)
      render json: stack
    else
      render json: stack.errors
    end
  end

  def destroy
    stack&.destroy
    render json: { message: 'Stack deleted!' }
  end

  private

  def stack_params
    params.permit(:name, :hours, :hours_goal, :projects, :projects_goal)
  end

  def stack
    @stack ||= Stack.find(params[:id])
    @stack
  end
end
