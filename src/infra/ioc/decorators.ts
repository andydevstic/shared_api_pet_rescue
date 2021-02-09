import { inject, named } from 'inversify';
import { fluentProvide,  } from 'inversify-binding-decorators';

export function provide(identifier: symbol) {
  return fluentProvide(identifier).done();
}

export function provideSingleton(identifier: symbol) {
  return fluentProvide(identifier).inSingletonScope().done();
}

export function injectNamed(identifier: symbol, name: any): ParameterDecorator {
  return (target: Object, propertyKey: string, index: number) => {
    inject(identifier)(target, propertyKey, index);
    named(name)(target, propertyKey, index);
  };
}

export function provideNamed(identifier: symbol, name: string) {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();
}

export function provideSingletonNamed(identifier: symbol, name: string) {
  return fluentProvide(identifier)
    .inSingletonScope()
    .whenTargetNamed(name)
    .done();
}
