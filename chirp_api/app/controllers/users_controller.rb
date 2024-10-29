class UsersController < ApplicationController
  def search
    @users = User.where('username LIKE ?', "%#{params[:username]}%")
    render json: @users
  end

  # def follow
  #   follower = current_user
  #   followed = User.find(params[:id])
  #   follower.followed_users << followed unless follower.followed_users.include?(followed)
  #   render json: {}, status: :ok
  # end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
