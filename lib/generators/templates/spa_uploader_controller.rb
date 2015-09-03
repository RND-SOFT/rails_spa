class <%= class_name %>Controller < ApplicationController
  def create
    attachments = params[:attachments].map do |attachment|
      file = <%= class_name %>.new(file: attachment, user_id: current_user.id)
      if file.save
        file
      else
        nil
      end
    end

    render json: attachments.compact, each_serializer: <%= class_name %>Serializer, root: false
  end

  def destroy
    current_user.<%= class_name.downcase.pluralize %>.find_by(id: params[:id]).destroy
    render json: {}
  end
end