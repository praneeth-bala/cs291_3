class User < ApplicationRecord
  has_many :posts
  has_many :comments
  has_many :followers, class_name: 'Follow', foreign_key: 'follower_id'
  has_many :followed_users, through: :followers, source: :followed

  validates :username, presence: true, uniqueness: true
end
