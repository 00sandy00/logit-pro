// tests/logIt.test.js

const logIt = require('../index');  // Adjust this path to the location of your package file

describe('LogIt Package', () => {
  it('should log an info message to the log file', () => {
    // Set up a mock log message
    const message = 'Test log message';
    const level = 'info';

    // Run the logging function
    logIt[level](message);

    // We can check the log file after execution to see if the message was written to it.
    // For simplicity, we are going to assume that the file is named `mylog-daily-2025-07-17.log` and exists.
    // In reality, you may want to mock file system operations for testing purposes.
    
    const fs = require('fs');
    const logFilePath = './logs/mylog-daily-2025-07-17.log'; // Path to the log file

    // Check if the log file exists and contains the expected message
    expect(fs.existsSync(logFilePath)).toBe(true); // Check if the log file exists
    const logContent = fs.readFileSync(logFilePath, 'utf-8');
    expect(logContent).toContain(message);  // Ensure the message is in the file
  });

  it('should create a new log file if the period changes', () => {
    // Simulate log file rotation (this will depend on the rotation mechanism you use)
    const currentDate = new Date();
    const currentPeriod = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    // Call the log function
    logIt.info('New log for period change');

    // Check if the new log file exists with the correct period name (e.g., mylog-daily-YYYY-MM-DD.log)
    const fs = require('fs');
    const newLogFilePath = `./logs/mylog-daily-${currentPeriod}.log`; // Check if this file exists
    expect(fs.existsSync(newLogFilePath)).toBe(true); // Ensure the new log file is created
  });
});
