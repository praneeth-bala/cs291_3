class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user

  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end

  def authenticate_user
    render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
  end
  
end
