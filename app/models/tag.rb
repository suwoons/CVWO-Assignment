class Tag < ApplicationRecord
    has_many :taggings
    has_many :todos, through: :taggings

    # accepts_nested_attributes_for :taggings
    # accepts_nested_attributes_for :todos
end
