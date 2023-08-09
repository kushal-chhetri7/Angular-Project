import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import {OnlineComponent} from "./online/online.component";
import {OfflineComponent} from "./offline/offline.component";


@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor() {}

  renderComponent(status: string, container: ViewContainerRef): ComponentRef<any> {
    container.clear();

    let componentType;

    switch (status) {
      case 'online':
        componentType = OnlineComponent;
        break;
      case 'offline':
        componentType = OfflineComponent;
        break;
      default:
        break;
    }

    if (componentType) {
      return container.createComponent(componentType);
    }
    return null;
  }

}
