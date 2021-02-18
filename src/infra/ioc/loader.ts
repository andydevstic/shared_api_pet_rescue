import '../../gateways';
import '../../utils';
import '../../shared/supertypes';

import { buildProviderModule } from 'inversify-binding-decorators';

import { appContainer } from './container';

appContainer.load(buildProviderModule());

export const container = appContainer;
