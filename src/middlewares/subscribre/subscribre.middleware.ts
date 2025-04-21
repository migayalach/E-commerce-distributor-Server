// import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
// import { isValidEmail } from '../regex';

// export const SubscribeMiddleware: FieldMiddleware = async (
//   ctx: MiddlewareContext,
//   next: NextFn,
// ) => {
//   const value = await next();
//   if (!isValidEmail(value)) {
//     console.log(':C');
//   }
//   return value;
// };
