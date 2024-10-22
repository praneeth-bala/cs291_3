class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def index
    @posts = Post.all.includes(:user, :comments)
    render json: @posts, include: [:user, :comments]
  end

  def show
    render json: @post, include: [:user, :comments]
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content)
  end
end
