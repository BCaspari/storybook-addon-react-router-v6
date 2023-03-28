import {EVENTS} from "./constants";
import {ActionFunctionArgs, LoaderFunctionArgs, NavigationType, RouteMatch, useParams} from "react-router-dom";

declare module "global";

export type AddonEvents = typeof EVENTS;

export type NavigationEventInternalKey = 'NAVIGATION' | 'STORY_LOADED' | 'ROUTE_MATCHES';
export type NavigationEventName = AddonEvents[NavigationEventInternalKey];
export type DataEventInternalKey = 'ACTION_INVOKED' | 'ACTION_SETTLED' | 'LOADER_INVOKED' | 'LOADER_SETTLED';
export type DataEventName = AddonEvents[DataEventInternalKey];

export type RouteMatchesData = Array<[RouteMatch['route']['path'], RouteMatch['params']]>;

export type RouterEvent<T extends NavigationEventInternalKey = NavigationEventInternalKey> = {
  type: AddonEvents[T];
  data: NavigationEventData[AddonEvents[T]];
}

export type EventDataStoryLoaded = {
  url: string;
  path: string;
  hash: string;
  routeParams: ReturnType<useParams>;
  routeState: unknown;
  searchParams: Record<string, string>;
  routeMatches: RouteMatchesData;
}

export type EventDataNavigation = {
  url: string;
  navigationType: NavigationType;
  path: string;
  hash: string;
  routeParams: ReturnType<useParams>;
  searchParams: Record<string, string>;
  routeState: unknown;
  routeMatches: RouteMatchesData;
}

export type EventDataRouteMatches = {
  matches: RouteMatchesData;
}


export type DataEventArgs = {
  [EVENTS.ACTION_INVOKED]: ActionFunctionArgs;
  [EVENTS.ACTION_SETTLED]: unknown;
  [EVENTS.LOADER_INVOKED]: LoaderFunctionArgs;
  [EVENTS.LOADER_SETTLED]: unknown;
}

export type NavigationEventData = {
  [EVENTS.NAVIGATION]: EventDataNavigation;
  [EVENTS.STORY_LOADED]: EventDataStoryLoaded;
  [EVENTS.ROUTE_MATCHES]: EventDataRouteMatches;
};
