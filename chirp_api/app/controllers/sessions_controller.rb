class SessionsController < ApplicationController
  def create
    @user = User.find_or_create_by(username: params[:username])
    session[:user_id] = @user.id

    render json: { user: @user }, status: :ok
  end

  def destroy
    session[:user_id] = nil
    render json: { message: 'Logged out successfully' }, status: :ok
  end
end
