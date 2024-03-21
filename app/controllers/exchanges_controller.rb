class ExchangesController < ApplicationController
  def convert
    value = ExchangeService.new(params[:source_currency], params[:target_currency], params[:amount]).perform
    render json: {value: value}
  end
end
