import { Container, interfaces } from 'inversify';

const container = new Container();

import './loader';
import { buildProviderModule } from 'inversify-binding-decorators';

container.load(buildProviderModule());

export function mergeContainer(fatherContainer: Container): interfaces.Container {
  const childContainer = container.createChild();

  return Container.merge(fatherContainer, childContainer);
}
