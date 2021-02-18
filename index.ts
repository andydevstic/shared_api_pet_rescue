import 'reflect-metadata';
import * as moduleAlias from 'module-alias';

moduleAlias.addAlias('@src.shared', `${__dirname}/src`);

import 'module-alias/register';

export { container } from './src/infra/ioc/loader';

export * from './src/shared/constants';
export * from './src/shared/interfaces';

export * from './src/shared/errors';
export * from './src/shared/supertypes';
