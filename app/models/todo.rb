class Todo < ApplicationRecord
    has_many :taggings, dependent: :delete_all
    has_many :tags, through: :taggings
end
