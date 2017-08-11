import 'angular-mocks';

// Loads all spec files
const testsContext = require.context('.', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
