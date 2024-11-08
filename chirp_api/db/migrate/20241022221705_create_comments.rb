class CreateComments < ActiveRecord::Migration[7.2]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: { to_table: :users }
      t.references :post, null: false, foreign_key: { to_table: :posts }
      t.text :content, null: false

      t.timestamps
    end
  end
end
