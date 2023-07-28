import React from 'react';
import { RouterRoute, RouterRoutes } from '../components/StoryRouter';

export function injectStory(routes: RouterRoutes, StoryComponent: React.ReactElement): RouterRoute[] {
  const storyRouteIndex = routes.findIndex((route) => route.useStoryElement);
  if (storyRouteIndex !== -1) {
    const localRoutes = Array.from(routes);
    localRoutes.splice(storyRouteIndex, 1, {
      ...routes[storyRouteIndex],
      element: StoryComponent,
    });
    return localRoutes;
  }

  return routes.map((route) => {
    if (!route.children) return route;

    return {
      ...route,
      children: injectStory(route.children, StoryComponent),
    };
  });
}
