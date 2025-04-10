import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'HUF'): string {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: currencyCode
    }).format(value);
  }

}
