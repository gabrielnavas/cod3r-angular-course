import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceCurrency'
})
export class SpaceCurrencyPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    const monetaryValue = value.split('R$')[1];
    return `R$ ${monetaryValue}`
  }

}
