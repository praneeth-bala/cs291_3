class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :content, presence: true

  def comment_ids
    comments.pluck(:id)
  end
end
