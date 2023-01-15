/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query GetLikedTracks {\n    likedTracks @client {\n      ...TrackItem\n    }\n  }\n": types.GetLikedTracksDocument,
    "\n  query GetPlaylist {\n    playlist {\n      id\n      name\n      tracks {\n        track {\n          ...TrackItem\n        }\n      }\n    } \n  }\n": types.GetPlaylistDocument,
    "\n  fragment TrackItem on Track {\n    id\n    previewUrl: preview_url\n    durationMs: duration_ms\n    name\n    album { \n      name \n      images { \n        url \n      } \n    }\n    artists { \n      name \n    }\n  }\n": types.TrackItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLikedTracks {\n    likedTracks @client {\n      ...TrackItem\n    }\n  }\n"): (typeof documents)["\n  query GetLikedTracks {\n    likedTracks @client {\n      ...TrackItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPlaylist {\n    playlist {\n      id\n      name\n      tracks {\n        track {\n          ...TrackItem\n        }\n      }\n    } \n  }\n"): (typeof documents)["\n  query GetPlaylist {\n    playlist {\n      id\n      name\n      tracks {\n        track {\n          ...TrackItem\n        }\n      }\n    } \n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TrackItem on Track {\n    id\n    previewUrl: preview_url\n    durationMs: duration_ms\n    name\n    album { \n      name \n      images { \n        url \n      } \n    }\n    artists { \n      name \n    }\n  }\n"): (typeof documents)["\n  fragment TrackItem on Track {\n    id\n    previewUrl: preview_url\n    durationMs: duration_ms\n    name\n    album { \n      name \n      images { \n        url \n      } \n    }\n    artists { \n      name \n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;