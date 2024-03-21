import { Controller } from "@hotwired/stimulus";
import Rails from "rails-ujs";

export default class extends Controller {
  static targets = [
    "sourceCurrency",
    "targetCurrency",
    "amount",
    "currencyDestinationValue",
    "invertIcon",
    "submitButton",
  ];
  static classes = ["toggle"];

  invertCurrencies() {
    const source_currency = this.sourceCurrencyTarget.value;
    const target_currency = this.targetCurrencyTarget.value;

    this.sourceCurrencyTarget.value = target_currency;
    this.targetCurrencyTarget.value = source_currency;

    this.invertIconTarget.classList.toggle("animate-spin");
    setTimeout(() => {
      this.invertIconTarget.classList.toggle("animate-spin");
    }, 500);
  }

  convert(e) {
    e.preventDefault();

    const source_currency = this.sourceCurrencyTarget.value;
    const target_currency = this.targetCurrencyTarget.value;
    const amount = this.amountTarget.value;
    const submitButton = this.submitButtonTarget;

    submitButton.innerText = "Converting...";
    const data = new FormData();
    data.append("source_currency", source_currency);
    data.append("target_currency", target_currency);
    data.append("amount", amount);

    Rails.ajax({
      url: this.element.action,
      type: "POST",
      data: data,
      success: (data) => {
        this.currencyDestinationValueTarget.value = data.value;
        submitButton.innerText = "Please, convert";
      },
    });
  }

  submitWithKeyboard(e) {
    this.submitButtonTarget.click();
  }

  swapCurrencyValues() {
    const source_currency = this.sourceCurrencyTarget.value;
    const target_currency = this.targetCurrencyTarget.value;

    this.sourceCurrencyTarget.value = target_currency;
    this.targetCurrencyTarget.value = source_currency;
  }

  toggleInvertIconAnimation() {
    this.invertIconTarget.classList.toggle("animate-spin");
    setTimeout(() => {
      this.invertIconTarget.classList.toggle("animate-spin");
    }, 500);
  }
}
