class <%= class_name %>Controller < ApplicationController
  mount_uploader :file, <%= class_name %>Uploader

  belongs_to :user
  belongs_to :fileable, polymorphic: true
end