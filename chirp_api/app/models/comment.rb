class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :content, presence: true
  validate :check_for_influence_words

  private

  def check_for_influence_words
    restricted_words = ["trump", "harris", "election", "vote"]
    if restricted_words.any? { |word| content.downcase.include?(word) }
      errors.add(:content, "contains words that may influence the election.")
    end
  end
end
