import {Component, ViewChild, ViewContainerRef,} from '@angular/core';

import {DynamicComponentService} from "../dynamic-component.service";

@Component({
  selector: 'app-statuscontainer',
  template: '<ng-container #dynamicComponentContainer></ng-container>'

})
export class StatuscontainerComponent  {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private dynamicComponentService: DynamicComponentService) {}

  ngAfterViewInit() {
    this.dynamicComponentService.renderComponent('online', this.dynamicComponentContainer);
  }


}
