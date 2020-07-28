class ApplicationController < ActionController::Base
  include Knock::Authenticable

  private

  def logged_in?
    !!current_user
  end
end
