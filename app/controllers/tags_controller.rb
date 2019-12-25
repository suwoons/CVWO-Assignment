class TagsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tag = Tag.order("created_at DESC")
    render json: tag
  end

  def create
    tag = Tag.create(tag_param)
    tag.editable = false; # set default editable to false
    render json: tag
  end

  def update
    tag = Tag.find(params[:id])
    tag.update(tag_param)
    render json: tag
  end

  def destroy
    tag = Tag.find(params[:id])
    tag.destroy
    head :no_content
  end

  def show
  end

  private
    def tag_param
      params.require(:tag).permit(:name, :editable, :todos)
    end
end
