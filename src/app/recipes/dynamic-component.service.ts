import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import {OnlineComponent} from "./online/online.component";
import {OfflineComponent} from "./offline/offline.component";


@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

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
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      return container.createComponent(componentFactory);
    }

    return null;
  }
}
