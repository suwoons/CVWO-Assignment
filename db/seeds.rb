tag_1 = Tag.create!(name: "personal", editable: false)
tag_2 = Tag.create!(name: "not urgent", editable: false)
tag_3 = Tag.create!(name: "school", editable: false)

task_1 = Todo.create!(title: "Buy groceries", done: false)
task_2 = Todo.create!(title: "Project discussion with group", done: false)
task_3 = Todo.create!(title: "Finish worksheet", done: false)

tag_1.taggings.create(
    todo: task_1
)

tag_1.taggings.create(
    todo: task_2
)

tag_2.taggings.create(
    todo: task_2
)

task_3.taggings.create(
    tag: tag_3
)