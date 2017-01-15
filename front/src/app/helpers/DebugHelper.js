export default {
  getPropTypesErrorMessage(propName, componentName) {
    return 'Invalid prop `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.';
  }
};