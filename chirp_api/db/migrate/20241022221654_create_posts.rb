class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: { to_table: :users }
      t.text :content, null: false

      t.timestamps
    end
  end
end