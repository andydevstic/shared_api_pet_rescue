// import { Container, interfaces } from 'inversify';

// const container = new Container();

// import './loader';
// import { buildProviderModule } from 'inversify-binding-decorators';

// container.load(buildProviderModule());

// export const appContainer = container;

// export function mergeContainer(fatherContainer: Container): interfaces.Container {
//   const childContainer = container.createChild();

//   return Container.merge(fatherContainer, childContainer);
// }

import { Container } from 'inversify';

export const appContainer = new Container();