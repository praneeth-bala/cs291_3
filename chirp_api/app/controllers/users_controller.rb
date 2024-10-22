class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def search
    @users = User.where('username LIKE ?', "%#{params[:query]}%")
    render json: @users
  end

  def follow
    follower = current_user
    followed = User.find(params[:id])
    follower.followed_users << followed unless follower.followed_users.include?(followed)
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
