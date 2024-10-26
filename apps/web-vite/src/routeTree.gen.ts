/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as WinderIndexImport } from './routes/winder/index'
import { Route as OpenIndexImport } from './routes/open/index'
import { Route as EmbedPubIdImport } from './routes/embed/$pubId'
import { Route as LayoutHomeImport } from './routes/_layout/_home'
import { Route as LayoutModIndexImport } from './routes/_layout/mod/index'
import { Route as LayoutFeedIndexImport } from './routes/_layout/feed/index'
import { Route as LayoutCreateIndexImport } from './routes/_layout/create/index'
import { Route as LayoutHomeIndexImport } from './routes/_layout/_home/index'
import { Route as LayoutWatchPubIdImport } from './routes/_layout/watch/$pubId'
import { Route as LayoutUHandleImport } from './routes/_layout/u/$handle'
import { Route as LayoutHomeFollowingImport } from './routes/_layout/_home/following'
import { Route as LayoutHomeExploreImport } from './routes/_layout/_home/explore'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const WinderIndexRoute = WinderIndexImport.update({
  id: '/winder/',
  path: '/winder/',
  getParentRoute: () => rootRoute,
} as any)

const OpenIndexRoute = OpenIndexImport.update({
  id: '/open/',
  path: '/open/',
  getParentRoute: () => rootRoute,
} as any)

const EmbedPubIdRoute = EmbedPubIdImport.update({
  id: '/embed/$pubId',
  path: '/embed/$pubId',
  getParentRoute: () => rootRoute,
} as any)

const LayoutHomeRoute = LayoutHomeImport.update({
  id: '/_home',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutModIndexRoute = LayoutModIndexImport.update({
  id: '/mod/',
  path: '/mod/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFeedIndexRoute = LayoutFeedIndexImport.update({
  id: '/feed/',
  path: '/feed/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutCreateIndexRoute = LayoutCreateIndexImport.update({
  id: '/create/',
  path: '/create/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutHomeIndexRoute = LayoutHomeIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutHomeRoute,
} as any)

const LayoutWatchPubIdRoute = LayoutWatchPubIdImport.update({
  id: '/watch/$pubId',
  path: '/watch/$pubId',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutUHandleRoute = LayoutUHandleImport.update({
  id: '/u/$handle',
  path: '/u/$handle',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutHomeFollowingRoute = LayoutHomeFollowingImport.update({
  id: '/following',
  path: '/following',
  getParentRoute: () => LayoutHomeRoute,
} as any)

const LayoutHomeExploreRoute = LayoutHomeExploreImport.update({
  id: '/explore',
  path: '/explore',
  getParentRoute: () => LayoutHomeRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/_home': {
      id: '/_layout/_home'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutHomeImport
      parentRoute: typeof LayoutImport
    }
    '/embed/$pubId': {
      id: '/embed/$pubId'
      path: '/embed/$pubId'
      fullPath: '/embed/$pubId'
      preLoaderRoute: typeof EmbedPubIdImport
      parentRoute: typeof rootRoute
    }
    '/open/': {
      id: '/open/'
      path: '/open'
      fullPath: '/open'
      preLoaderRoute: typeof OpenIndexImport
      parentRoute: typeof rootRoute
    }
    '/winder/': {
      id: '/winder/'
      path: '/winder'
      fullPath: '/winder'
      preLoaderRoute: typeof WinderIndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout/_home/explore': {
      id: '/_layout/_home/explore'
      path: '/explore'
      fullPath: '/explore'
      preLoaderRoute: typeof LayoutHomeExploreImport
      parentRoute: typeof LayoutHomeImport
    }
    '/_layout/_home/following': {
      id: '/_layout/_home/following'
      path: '/following'
      fullPath: '/following'
      preLoaderRoute: typeof LayoutHomeFollowingImport
      parentRoute: typeof LayoutHomeImport
    }
    '/_layout/u/$handle': {
      id: '/_layout/u/$handle'
      path: '/u/$handle'
      fullPath: '/u/$handle'
      preLoaderRoute: typeof LayoutUHandleImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/watch/$pubId': {
      id: '/_layout/watch/$pubId'
      path: '/watch/$pubId'
      fullPath: '/watch/$pubId'
      preLoaderRoute: typeof LayoutWatchPubIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/_home/': {
      id: '/_layout/_home/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutHomeIndexImport
      parentRoute: typeof LayoutHomeImport
    }
    '/_layout/create/': {
      id: '/_layout/create/'
      path: '/create'
      fullPath: '/create'
      preLoaderRoute: typeof LayoutCreateIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/feed/': {
      id: '/_layout/feed/'
      path: '/feed'
      fullPath: '/feed'
      preLoaderRoute: typeof LayoutFeedIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/mod/': {
      id: '/_layout/mod/'
      path: '/mod'
      fullPath: '/mod'
      preLoaderRoute: typeof LayoutModIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutHomeRouteChildren {
  LayoutHomeExploreRoute: typeof LayoutHomeExploreRoute
  LayoutHomeFollowingRoute: typeof LayoutHomeFollowingRoute
  LayoutHomeIndexRoute: typeof LayoutHomeIndexRoute
}

const LayoutHomeRouteChildren: LayoutHomeRouteChildren = {
  LayoutHomeExploreRoute: LayoutHomeExploreRoute,
  LayoutHomeFollowingRoute: LayoutHomeFollowingRoute,
  LayoutHomeIndexRoute: LayoutHomeIndexRoute,
}

const LayoutHomeRouteWithChildren = LayoutHomeRoute._addFileChildren(
  LayoutHomeRouteChildren,
)

interface LayoutRouteChildren {
  LayoutHomeRoute: typeof LayoutHomeRouteWithChildren
  LayoutUHandleRoute: typeof LayoutUHandleRoute
  LayoutWatchPubIdRoute: typeof LayoutWatchPubIdRoute
  LayoutCreateIndexRoute: typeof LayoutCreateIndexRoute
  LayoutFeedIndexRoute: typeof LayoutFeedIndexRoute
  LayoutModIndexRoute: typeof LayoutModIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutHomeRoute: LayoutHomeRouteWithChildren,
  LayoutUHandleRoute: LayoutUHandleRoute,
  LayoutWatchPubIdRoute: LayoutWatchPubIdRoute,
  LayoutCreateIndexRoute: LayoutCreateIndexRoute,
  LayoutFeedIndexRoute: LayoutFeedIndexRoute,
  LayoutModIndexRoute: LayoutModIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutHomeRouteWithChildren
  '/embed/$pubId': typeof EmbedPubIdRoute
  '/open': typeof OpenIndexRoute
  '/winder': typeof WinderIndexRoute
  '/explore': typeof LayoutHomeExploreRoute
  '/following': typeof LayoutHomeFollowingRoute
  '/u/$handle': typeof LayoutUHandleRoute
  '/watch/$pubId': typeof LayoutWatchPubIdRoute
  '/': typeof LayoutHomeIndexRoute
  '/create': typeof LayoutCreateIndexRoute
  '/feed': typeof LayoutFeedIndexRoute
  '/mod': typeof LayoutModIndexRoute
}

export interface FileRoutesByTo {
  '': typeof LayoutRouteWithChildren
  '/embed/$pubId': typeof EmbedPubIdRoute
  '/open': typeof OpenIndexRoute
  '/winder': typeof WinderIndexRoute
  '/explore': typeof LayoutHomeExploreRoute
  '/following': typeof LayoutHomeFollowingRoute
  '/u/$handle': typeof LayoutUHandleRoute
  '/watch/$pubId': typeof LayoutWatchPubIdRoute
  '/': typeof LayoutHomeIndexRoute
  '/create': typeof LayoutCreateIndexRoute
  '/feed': typeof LayoutFeedIndexRoute
  '/mod': typeof LayoutModIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/_home': typeof LayoutHomeRouteWithChildren
  '/embed/$pubId': typeof EmbedPubIdRoute
  '/open/': typeof OpenIndexRoute
  '/winder/': typeof WinderIndexRoute
  '/_layout/_home/explore': typeof LayoutHomeExploreRoute
  '/_layout/_home/following': typeof LayoutHomeFollowingRoute
  '/_layout/u/$handle': typeof LayoutUHandleRoute
  '/_layout/watch/$pubId': typeof LayoutWatchPubIdRoute
  '/_layout/_home/': typeof LayoutHomeIndexRoute
  '/_layout/create/': typeof LayoutCreateIndexRoute
  '/_layout/feed/': typeof LayoutFeedIndexRoute
  '/_layout/mod/': typeof LayoutModIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/embed/$pubId'
    | '/open'
    | '/winder'
    | '/explore'
    | '/following'
    | '/u/$handle'
    | '/watch/$pubId'
    | '/'
    | '/create'
    | '/feed'
    | '/mod'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/embed/$pubId'
    | '/open'
    | '/winder'
    | '/explore'
    | '/following'
    | '/u/$handle'
    | '/watch/$pubId'
    | '/'
    | '/create'
    | '/feed'
    | '/mod'
  id:
    | '__root__'
    | '/_layout'
    | '/_layout/_home'
    | '/embed/$pubId'
    | '/open/'
    | '/winder/'
    | '/_layout/_home/explore'
    | '/_layout/_home/following'
    | '/_layout/u/$handle'
    | '/_layout/watch/$pubId'
    | '/_layout/_home/'
    | '/_layout/create/'
    | '/_layout/feed/'
    | '/_layout/mod/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
  EmbedPubIdRoute: typeof EmbedPubIdRoute
  OpenIndexRoute: typeof OpenIndexRoute
  WinderIndexRoute: typeof WinderIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
  EmbedPubIdRoute: EmbedPubIdRoute,
  OpenIndexRoute: OpenIndexRoute,
  WinderIndexRoute: WinderIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout",
        "/embed/$pubId",
        "/open/",
        "/winder/"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/_home",
        "/_layout/u/$handle",
        "/_layout/watch/$pubId",
        "/_layout/create/",
        "/_layout/feed/",
        "/_layout/mod/"
      ]
    },
    "/_layout/_home": {
      "filePath": "_layout/_home.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/_home/explore",
        "/_layout/_home/following",
        "/_layout/_home/"
      ]
    },
    "/embed/$pubId": {
      "filePath": "embed/$pubId.tsx"
    },
    "/open/": {
      "filePath": "open/index.tsx"
    },
    "/winder/": {
      "filePath": "winder/index.tsx"
    },
    "/_layout/_home/explore": {
      "filePath": "_layout/_home/explore.tsx",
      "parent": "/_layout/_home"
    },
    "/_layout/_home/following": {
      "filePath": "_layout/_home/following.tsx",
      "parent": "/_layout/_home"
    },
    "/_layout/u/$handle": {
      "filePath": "_layout/u/$handle.tsx",
      "parent": "/_layout"
    },
    "/_layout/watch/$pubId": {
      "filePath": "_layout/watch/$pubId.tsx",
      "parent": "/_layout"
    },
    "/_layout/_home/": {
      "filePath": "_layout/_home/index.tsx",
      "parent": "/_layout/_home"
    },
    "/_layout/create/": {
      "filePath": "_layout/create/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/feed/": {
      "filePath": "_layout/feed/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/mod/": {
      "filePath": "_layout/mod/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */