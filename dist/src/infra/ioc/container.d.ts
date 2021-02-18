import { Container, interfaces } from 'inversify';
import './loader';
export declare const appContainer: Container;
export declare function mergeContainer(fatherContainer: Container): interfaces.Container;
