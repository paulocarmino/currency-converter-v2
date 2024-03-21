require "rest-client"
require "json"

class ExchangeService
  def initialize(source_currency, target_currency, amount)
    @source_currency = source_currency
    @target_currency = target_currency
    @amount = amount.to_f
  end

  def perform
    exchange_api_url = Rails.application.credentials.freecurrencyapi[:base_url]
    exchange_api_key = Rails.application.credentials.freecurrencyapi[:api_key]

    url = "#{exchange_api_url}?apikey=#{exchange_api_key}&base_currency=#{@source_currency}&currencies=#{@target_currency}"
    res = RestClient.get url
    value = JSON.parse(res.body)["data"][@target_currency.to_s].to_f

    value * @amount
  rescue RestClient::ExceptionWithResponse => e
    e.response
  end
end
