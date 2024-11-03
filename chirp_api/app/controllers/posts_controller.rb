# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  before_action :set_post, only: [:update, :destroy, :show]

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render json: post_transform(@post), status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @post.user_id == current_user.id
      if @post.update(post_params)
        render json: post_transform(@post), status: :ok
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  def destroy
    if @post.user_id == current_user.id
      if @post.destroy
        render json: {}, status: :ok
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  def list
    if params[:username].present?
      user = User.find_by(username: params[:username])
      @posts = user ? Post.where(user_id: user.id).order(created_at: :desc) : []
    else
      @posts = Post.order(created_at: :desc)
    end
    
    render json: post_transform(@posts), status: :ok
  end

  def show
    render json: post_transform(@post), status: :ok
  end

  private

  def set_post
    @post = Post.includes(:comments, :user).find(params[:id])
  end

  def post_params
    params.require(:post).permit(:content)
  end

  def post_transform(post)
    post.as_json(
      except: [:user_id],
      include: {
        comments: {
          include: {
            user: { only: [:id, :username] }
          },
          only: [:id, :content, :created_at]
        },
        user: { only: [:id, :username] }
      }
    )
  end
end
