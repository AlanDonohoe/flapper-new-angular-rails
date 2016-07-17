require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

  protect_from_forgery with: :exception

  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?
  
  def angular
    render 'layouts/application'
  end

  private
  def configure_permitted_parameters
    # devise_parameter_sanitizer.for(:sign_up) << :username
    # http://stackoverflow.com/questions/37341967/rails-5-undefined-method-for-for-devise-on-line-devise-parameter-sanitizer
    # The Parameter Sanitaizer API has changed for Devise 4
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end
