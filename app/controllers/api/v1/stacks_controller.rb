class Api::V1::StacksController < ApplicationController
  include CurrentUserConcern
  before_action :set_current_user
  before_action :set_stack, only: %i[show update destroy]

  def index
    stack = Stack.user_stacks(@current_user.id).order(created_at: :desc)
    render json: stack
  end

  def create
    stack = Stack.create!(stack_params)
    if stack
      render json: { status: :created, stack: stack }
    else
      stack json: stack.errors
    end
  end

  def show
    if @stack
      render json: @stack
    else
      render json: @stack.errors
    end
  end

  def update
    if @stack.update(stack_params)
      render json: { status: :created, stack: @stack }
    else
      render json: @stack.errors
    end
  end

  def destroy
    @stack&.destroy
    render json: { message: 'Stack deleted!' }
  end

  def progress
    stack = Stack.user_stacks(@current_user.id).order(created_at: :desc)
    progress_data = Stack.progress_calc(stack)
    render json: { progress: progress_data }
  end

  private

  def stack_params
    params.require(:stack).permit(:name, :hours, :hours_goal, :projects, :projects_goal, :user_id)
  end

  def set_stack
    @stack ||= Stack.find(params[:id])
  end
end
