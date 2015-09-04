<%- controller_name = class_name.pluralize + "Controller" -%>
<%- model_name = class_name.singularize -%>
<%- instance_name = "@"+class_name.singularize.downcase -%>
<%- serializer_name = class_name.pluralize + "Serializer" -%>
<%- params = class_name.pluralize.downcase + "_params" -%>
<%- set_instance = "set_" + class_name.singularize.downcase -%>
class <%= controller_name %> < ApplicationController
  before_action :<%= set_instance %>, only: [:update, :destroy]

  def index
    respond_to do |format|
      format.html
      format.json {
        render json: <%= model_name %>.all, each_searializer: <%= serializer_name %>, root: false
      }
    end
  end

  def create
    <%= instance_name %> = current_user.<%= model_name.pluralize.downcase %>.new <%= params %>
    respond_to do |format|
      format.json {
        if <%= instance_name %>.save
          render json: {msg: "Запись успешно создана"}
        else
          render json: {msg: "Ошибка при создании записи", errors: <%= instance_name %>.errors}, status: 422
        end
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if <%= instance_name %>.update(<%= params %>)
          render json: {msg: "Запись успешно обновлена"}
        else
          render json: {msg: "Ошибка при обновлении записи", errors: <%= instance_name %>.errors}, status: 422
        end
      }
    end
  end

  def destroy
    <%= instance_name %>.destroy
    render json: {msg: "Запись успешно удалена"}
  end

  def show
    respond_to do |format|
      format.html {
        render template: '<%= class_name.pluralize.downcase %>/show'
      }
      format.json {
        <%= instance_name %> = <%= model_name %>.find params[:id]
        render json: <%= instance_name %>, serializer: <%= serializer_name %>, root: false
      }
    end
  end

  private
    def <%= params %>
      params.require(:<%= model_name.downcase %>).permit(:id, <%= attributes.map{|attribute| ':'+attribute.name}.join(', ') %>)
    end

    def <%= set_instance %>
      <%= instance_name %> = <%= model_name %>.find_by(id: params[:id], user_id: current_user.id)
    end
end