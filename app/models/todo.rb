class Todo < ApplicationRecord
    serialize :tags, Array 
end
