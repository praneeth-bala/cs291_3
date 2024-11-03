class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :content, presence: true
  validate :check_for_influence_words

  private

  def check_for_influence_words
    restricted_words = ["trump", "harris", "election", "vote"]
    if restricted_words.any? { |word| content.downcase.include?(word) }
      errors.add(:content, "contains words that may influence the election.")
    end
  end

  def comment_ids
    comments.pluck(:id)
  end
end