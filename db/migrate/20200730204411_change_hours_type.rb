class ChangeHoursType < ActiveRecord::Migration[6.0]
  def change
    change_column :stacks, :hours, :integer
    change_column :stacks, :hours_goal, :integer
  end
end
