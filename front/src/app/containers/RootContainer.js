let RootContainer;

if (process.env.NODE_ENV === 'production') {
  RootContainer = require('./RootContainer.production').default;
} else {
  RootContainer = require('./RootContainer.development').default;
}

export default RootContainer;