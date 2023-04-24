import { configureStore, Middleware, getDefaultMiddleware,EnhancedStore, AnyAction, MiddlewareArray, ThunkMiddleware, Dispatch } from '@reduxjs/toolkit';
import createReducer from './rootReducer';

declare let module: any;

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer.createReducer());
  });
}

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({ collapsed: (getState: () => RootState, action: any, logEntry: any) => !logEntry.error });

  middlewares.push(logger);
}

type CustomStore = {
  asyncReducers: { [key: string]: any };
} & EnhancedStore<any, AnyAction, MiddlewareArray<[ThunkMiddleware<any, AnyAction>, ...Middleware<{}, any, Dispatch<AnyAction>>[]]>>;

const store:CustomStore = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
}) as CustomStore;

store.asyncReducers = {} ;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({ collapsed: (getState: () => RootState, action: any, logEntry: any) => !logEntry.error });

  middlewares.push(logger);
}

export const injectReducer = (key: string, reducer: any) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
