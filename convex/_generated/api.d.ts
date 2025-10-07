/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as controllers_courses from "../controllers/courses.js";
import type * as controllers_purchases from "../controllers/purchases.js";
import type * as controllers_stripe from "../controllers/stripe.js";
import type * as controllers_subscriptions from "../controllers/subscriptions.js";
import type * as controllers_user from "../controllers/user.js";
import type * as http from "../http.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "controllers/courses": typeof controllers_courses;
  "controllers/purchases": typeof controllers_purchases;
  "controllers/stripe": typeof controllers_stripe;
  "controllers/subscriptions": typeof controllers_subscriptions;
  "controllers/user": typeof controllers_user;
  http: typeof http;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
