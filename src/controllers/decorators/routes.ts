import 'reflect-metadata';
import { Methods } from './methods_enum';

function Route(method: Methods) {
  return function(path: string) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata('method', method, target, key);
      Reflect.defineMetadata('path', path, target, key);
    };
  };
}

export const get = Route(Methods.get);
export const post = Route(Methods.post);
