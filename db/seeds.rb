tag_1 = Tag.create(name: "personal")
tag_2 = Tag.create(name: "not urgent")
tag_3 = Tag.create(name: "school")

task_1 = Todo.create(title: "Buy food: milk, bread, fruits", done: false, tag_ids: tag_1.id)
task_2 = Todo.create(title: "Concert tickets", done: false, tag_ids: [tag_1.id, tag_2.id])
task_3 = Todo.create(title: "Finish worksheet", done: false, tag_ids: tag_3.id)
tag_1.update(todo_ids: [task_1.id, task_2.id])
tag_2.update(todo_ids: [task_2.id])
tag_3.update(todo_ids: [task_3.id])

tag_4 = Tag.create(name: "testing", todo_ids: task_3.id)