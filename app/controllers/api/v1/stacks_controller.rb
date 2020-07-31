class Api::V1::StacksController < ApplicationController
  def index
    stack = Stack.all.order(created_at: :desc)
    render json: stack
  end

  def create
    stack = Stack.create!(name: params['stack']['name'],
                          hours: params['stack']['hours'],
                          hours_goal: params['stack']['hoursGoal'],
                          projects: params['stack']['projects'],
                          projects_goal: params['stack']['projectsGoal'],
                          user_id: params['stack']['userId'])
    if stack
      render json: { status: :created, stack: stack }
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
    if stack.update(name: params['stack']['name'],
                    hours: params['stack']['hours'],
                    hours_goal: params['stack']['hoursGoal'],
                    projects: params['stack']['projects'],
                    projects_goal: params['stack']['projectsGoal'],
                    user_id: params['stack']['userId'])
                    render json: { status: :created, stack: stack }
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
