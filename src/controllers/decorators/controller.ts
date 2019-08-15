import { Router } from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './methods_enum';

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata('middlewares', target.prototype, key) || [];

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
