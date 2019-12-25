class AddEditableToTag < ActiveRecord::Migration[6.0]
  def change
    add_column :tags, :editable, :boolean
  end
end
