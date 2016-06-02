import {Directive} from '@angular/core';
import {NgControl} from '@angular/common';
import {forEach} from 'lodash';

@Directive({
  selector: '[currency-mask]',
  host: {
    '(keyup)' : 'onInputChange()'
  }
})
export class CurrencyMaskDirective {
  private model: NgControl;
  private currency: string = '$';
  private digitPattern = /\d\.?/g;

  constructor(model: NgControl) {
    this.model = model;
    console.log(model);
  }

  onInputChange() {
    let currentValue = this.model.value;
    let actualValue = this.getActualValue(currentValue);
    let maskedValue = this.getMaskedValue(actualValue);

    // This is the actual binding (unmasked) value
    this.model.viewToModelUpdate(actualValue);

    // This is the displaying (masked) value
    this.model.valueAccessor.writeValue(maskedValue);
  }

  // Returns the actual (unmasked) value
  getActualValue(currentValue: string): string {
    let result = '';

    // Check if something is available to mask
    if(currentValue && currentValue.length > 0) {
      // Check if the entered value is a negative
      if (currentValue.indexOf('-') > -1) {
        result += '-';
      }

      let digits = currentValue.match(this.digitPattern);
      forEach(digits, function(value) {
        result += value;
      });
    }

    return result;
  }

  // Returns the masked value
  getMaskedValue(actualValue: string): string {
    let result = null;

    if(actualValue) {
      result = this.currency + actualValue;
    }

    return result;
  }
}
