# app/controllers/comments_controller.rb
class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.new(comment_params)
    @comment.user = current_user

    if @comment.save
      render json: comment_transform(@comment), status: :created
    else
      # Return validation errors in a consistent format
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def comment_transform(comment)
    comment.as_json(
      except: [:user_id],
      include: {
        user: { only: [:id, :username] }
      }
    )
  end
end
