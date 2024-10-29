class PostsController < ApplicationController
  before_action :set_post, only: [:update, :destroy, :show]

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.user_id == @current_user.id
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  def destroy
    if @post.user_id == @current_user.id
      if @post.destroy
        render json: {}, status: :ok
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  def list
    if params[:user_id].present?
      @posts = Post.where(user_id: params[:userid])
    else
      @posts = Post.all
    end
    
    render json: @posts.as_json(include: :comments), status: :ok
  end

  def show
    render json: @post.as_json(include: :comments), status: :ok
  end

  private

  def set_post
    @post = Post.includes(:comments).find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content)
  end
end
