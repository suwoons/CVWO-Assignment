class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    todos = Todo.order("created_at DESC")
    render json: todos
  end

  def create
    todo = Todo.create(todo_param)
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_param)
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content
  end

  private
    def todo_param
      params.require(:todo).permit(:title, :done, :editable, :tags)
    end
end
