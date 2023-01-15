/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Image>>>;
  name: Scalars['String'];
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Image>>>;
  name: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  height?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Image>>>;
  name: Scalars['String'];
  tracks?: Maybe<Array<Maybe<PlaylistTrack>>>;
};

export type PlaylistTrack = {
  __typename?: 'PlaylistTrack';
  added_at: Scalars['String'];
  name: Scalars['String'];
  track: Track;
};

export type Query = {
  __typename?: 'Query';
  likedTracks: Array<Maybe<Track>>;
  noop?: Maybe<Scalars['Int']>;
  playlist: Playlist;
};

export type Track = {
  __typename?: 'Track';
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  duration_ms: Scalars['Float'];
  href: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  popularity?: Maybe<Scalars['Int']>;
  preview_url?: Maybe<Scalars['String']>;
};

export type GetLikedTracksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLikedTracksQuery = { __typename?: 'Query', likedTracks: Array<(
    { __typename?: 'Track' }
    & { ' $fragmentRefs'?: { 'TrackItemFragment': TrackItemFragment } }
  ) | null> };

export type GetPlaylistQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', id: string, name: string, tracks?: Array<{ __typename?: 'PlaylistTrack', track: (
        { __typename?: 'Track' }
        & { ' $fragmentRefs'?: { 'TrackItemFragment': TrackItemFragment } }
      ) } | null> | null } };

export type TrackItemFragment = { __typename?: 'Track', id: string, name: string, previewUrl?: string | null, durationMs: number, album?: { __typename?: 'Album', name: string, images?: Array<{ __typename?: 'Image', url: string } | null> | null } | null, artists?: Array<{ __typename?: 'Artist', name: string } | null> | null } & { ' $fragmentName'?: 'TrackItemFragment' };

export const TrackItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrackItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"previewUrl"},"name":{"kind":"Name","value":"preview_url"}},{"kind":"Field","alias":{"kind":"Name","value":"durationMs"},"name":{"kind":"Name","value":"duration_ms"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TrackItemFragment, unknown>;
export const GetLikedTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikedTracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likedTracks"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrackItem"}}]}}]}},...TrackItemFragmentDoc.definitions]} as unknown as DocumentNode<GetLikedTracksQuery, GetLikedTracksQueryVariables>;
export const GetPlaylistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlaylist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrackItem"}}]}}]}}]}}]}},...TrackItemFragmentDoc.definitions]} as unknown as DocumentNode<GetPlaylistQuery, GetPlaylistQueryVariables>;