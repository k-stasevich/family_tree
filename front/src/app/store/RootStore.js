let configureStore;

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./RootStore.production').default;
} else {
  configureStore = require('./RootStore.development').default;
}

const store = configureStore();

export default store;