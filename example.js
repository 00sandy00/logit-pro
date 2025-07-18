// test.js
const logIt = require('./index');

// Configure custom settings with dynamic log file name
logIt.configure({
  logDirectory: './mylogs',  // Custom log directory
  logLevel: 'error',         // Log everything (debug and above)
  rotateBy: 'daily',         // Rotation type ('daily', 'weekly', 'monthly', 'yearly')
  fileName: 'myapp.log',     // Custom log file name
});

// Log some messages
logIt.info('This is an info message');
logIt.warn('This is a warning');
logIt.error('An error occurred');
logIt.debug('Debugging information');

// The logs will be saved to ./mylogs/myapp-2025-07-17 02-47-26.log (or rotated based on time)
