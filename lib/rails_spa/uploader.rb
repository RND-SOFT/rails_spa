module RailsSpa
  module Uploader
    extend ActiveSupport::Concern
    included do |klass|
      def associate fields, properties = {}
        fields = [fields] unless fields.is_a?(Array)
        fields.each do |field|
          attachments = params[properties[:for].class.to_s.downcase.to_sym][field]
          attachmentable_id = field.to_s.singularize + 'able_id'
          attachmentable_type = field.to_s.singularize + 'able_type'
          if attachments.present?
            attachment_ids = attachments.map{|attachment| attachment[:id]}
            model = field.to_s.singularize.classify.constantize
            model.where(id: attachment_ids).update_all("#{attachmentable_id}" => properties[:for].id, "#{attachmentable_type}" => properties[:for].class.to_s)
          end
        end
      end
    end

    module ClassMethods

    end

  end
end

ActionController::Base.send :include, RailsSpa::Uploader
