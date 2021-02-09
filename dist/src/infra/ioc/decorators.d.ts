export declare function provide(identifier: symbol): (target: any) => any;
export declare function provideSingleton(identifier: symbol): (target: any) => any;
export declare function injectNamed(identifier: symbol, name: any): ParameterDecorator;
export declare function provideNamed(identifier: symbol, name: string): (target: any) => any;
export declare function provideSingletonNamed(identifier: symbol, name: string): (target: any) => any;
