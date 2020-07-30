class CreateStacks < ActiveRecord::Migration[6.0]
  def change
    create_table :stacks do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.decimal :hours, null: false, default: 0
      t.decimal :hours_goal, null: false, default: 0
      t.integer :projects, null: false, default: 0
      t.integer :projects_goal, null: false, default: 0

      t.timestamps
    end
  end
end
