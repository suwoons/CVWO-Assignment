class Todo < ApplicationRecord
    has_many :taggings, dependent: :delete_all
    has_many :tags, through: :taggings

    # accepts_nested_attributes_for :tags
    # accepts_nested_attributes_for :taggings
end
