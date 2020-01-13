class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    users = User.order("created_at DESC")
    render json: users
  end

  def create
    user = User.create(user_param)
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update(user_param)
    render json: user
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  private
  def user_param
    params.require(:user).permit(:name)
  end
end
