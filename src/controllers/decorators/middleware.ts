import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata('middlewares', target, key) || [];
    Reflect.defineMetadata(
      'middlewares',
      [...middlewares, middleware],
      target,
      key
    );
  };
}
