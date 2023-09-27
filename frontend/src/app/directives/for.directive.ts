import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {

  /**
   * usando a chamada
   * <li *myFor="let n em [1,2,3] usando 'teste'">{{ n }}</li>
   */
  @Input('myForEm') numbers: number[] //recebe o valor após o em, [1,2,3]
  @Input('myForUsando') texto: string // recebe o valor após o usando, 'teste'

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    for(let number of this.numbers) {
      this.container.createEmbeddedView(this.template, { $implicit: number }) // adiciona o valor de n 
    }
  }
}
