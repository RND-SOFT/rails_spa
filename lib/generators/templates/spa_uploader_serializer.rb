class <%= class_name %>Serializer < ActiveModel::Serializer
  attributes :id, :thumb, :original

  def thumb
    object.file.thumb.url rescue nil
  end

  def original
    object.file.url
  end
end