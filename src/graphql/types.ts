import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Activity = {
  __typename?: 'Activity';
  category: Category;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<DopamineType>;
};

export enum Category {
  Arts = 'arts',
  Cinema = 'cinema',
  Comedy = 'comedy',
  Community = 'community',
  Cultural = 'cultural',
  Food = 'food',
  Music = 'music',
  Nature = 'nature',
  Sports = 'sports'
}

export enum DopamineType {
  DeepEngagement = 'deep_engagement',
  ModerateActivities = 'moderate_activities',
  QuickBoost = 'quick_boost'
}

export type Event = {
  __typename?: 'Event';
  category: Category;
  cost?: Maybe<Scalars['String']['output']>;
  datetime?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Params = {
  area?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<Category>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  timeframe?: InputMaybe<TimeFrame>;
};

export type Query = {
  __typename?: 'Query';
  activities?: Maybe<Array<Activity>>;
  events?: Maybe<Array<Event>>;
};


export type QueryActivitiesArgs = {
  params: Params;
};


export type QueryEventsArgs = {
  params: Params;
};

export enum TimeFrame {
  NextWeekend = 'next_weekend',
  Week = 'week',
  Weekend = 'weekend'
}

export type ActivitiesQueryVariables = Exact<{
  params: Params;
}>;


export type ActivitiesQuery = { __typename?: 'Query', activities?: Array<{ __typename?: 'Activity', title?: string | null, description?: string | null, type?: DopamineType | null, category: Category }> | null };

export type EventsQueryVariables = Exact<{
  params: Params;
}>;


export type EventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', title?: string | null, description?: string | null, distance?: string | null, datetime?: string | null, cost?: string | null, duration?: string | null, location?: string | null, rating?: number | null, link?: string | null, category: Category }> | null };


export const ActivitiesDocument = gql`
    query Activities($params: Params!) {
  activities(params: $params) @client {
    title
    description
    type
    category
  }
}
    `;

/**
 * __useActivitiesQuery__
 *
 * To run a query within a React component, call `useActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useActivitiesQuery(baseOptions: Apollo.QueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables> & ({ variables: ActivitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
      }
export function useActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
        }
export function useActivitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
        }
export type ActivitiesQueryHookResult = ReturnType<typeof useActivitiesQuery>;
export type ActivitiesLazyQueryHookResult = ReturnType<typeof useActivitiesLazyQuery>;
export type ActivitiesSuspenseQueryHookResult = ReturnType<typeof useActivitiesSuspenseQuery>;
export type ActivitiesQueryResult = Apollo.QueryResult<ActivitiesQuery, ActivitiesQueryVariables>;
export const EventsDocument = gql`
    query Events($params: Params!) {
  events(params: $params) @client {
    title
    description
    distance
    datetime
    cost
    duration
    location
    rating
    link
    category
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useEventsQuery(baseOptions: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables> & ({ variables: EventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export function useEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsSuspenseQueryHookResult = ReturnType<typeof useEventsSuspenseQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;