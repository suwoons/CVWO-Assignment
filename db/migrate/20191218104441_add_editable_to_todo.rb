class AddEditableToTodo < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :editable, :boolean,
  end
end
