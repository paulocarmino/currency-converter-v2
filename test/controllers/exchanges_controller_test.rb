require "test_helper"

class ExchangesControllerTest < ActionDispatch::IntegrationTest
  test "should convert currency" do
    params = {
      source_currency: "USD",
      target_currency: "EUR",
      amount: 100
    }
    post convert_path(params)
    assert_response :success

    response_body = response.parsed_body
    assert_equal true, response_body.key?("value")
    assert_equal Float, response_body["value"].class
  end
end
