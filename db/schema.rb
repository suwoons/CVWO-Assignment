# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_24_190345) do

  create_table "taggings", force: :cascade do |t|
    t.integer "tag_id", null: false
    t.integer "todo_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["todo_id"], name: "index_taggings_on_todo_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "editable"
  end

  create_table "tags_todos", id: false, force: :cascade do |t|
    t.integer "todo_id", null: false
    t.integer "tag_id", null: false
  end

  create_table "todo_tags", force: :cascade do |t|
    t.integer "todo_id", null: false
    t.integer "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_id"], name: "index_todo_tags_on_tag_id"
    t.index ["todo_id"], name: "index_todo_tags_on_todo_id"
  end

  create_table "todos", force: :cascade do |t|
    t.string "title"
    t.boolean "done"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "editable", default: false
    t.string "tags"
  end

  add_foreign_key "taggings", "tags"
  add_foreign_key "taggings", "todos"
  add_foreign_key "todo_tags", "tags"
  add_foreign_key "todo_tags", "todos"
end
