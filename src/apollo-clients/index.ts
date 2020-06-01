/**
 * This file is important for manual queries throught apollo client.
 * For example in case when you need to fetch query from public schema
 * inside ApolloProvider utilizing private schema.
 */

export { default as publicClient } from './publicClient';
export { default as mainClient } from './mainClient';
