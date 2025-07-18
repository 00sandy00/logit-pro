// index.js
const fs = require('fs');
const path = require('path');

// Default configuration (can be overridden by user)
const defaultConfig = {
  logDirectory: './logs',  // Log file directory
  logLevel: 'debug',        // Default log level (can be 'debug', 'info', 'warn', 'error')
  fileName: 'logit-pro.log',   // Default log file name, can be overridden by the user
  rotateBy: 'daily',       // Rotation type ('daily', 'weekly', 'monthly', 'yearly')
};

// Levels of logging
const levels = ['debug', 'info', 'warn', 'error'];

// Function to format date to human-readable format for log entries (YYYY-MM-DD HH:mm:ss)
function formatDateForLog(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to format date for file name (YYYY-MM-DD, YYYY-MM, etc.)
function formatDateForFile(date, rotationType) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  let period = '';
  if (rotationType === 'daily') {
    period = `${year}-${month}-${day}`;  // e.g., 2025-07-17
  } else if (rotationType === 'monthly') {
    period = `${year}-${month}`;  // e.g., 2025-07
  } else if (rotationType === 'yearly') {
    period = `${year}`;  // e.g., 2025
  } else if (rotationType === 'weekly') {
    // Get the first day of the week (Sunday)
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay());  // Adjust to the first day of the week (Sunday)
    const firstDay = String(firstDayOfWeek.getDate()).padStart(2, '0');
    const firstMonth = String(firstDayOfWeek.getMonth() + 1).padStart(2, '0');
    period = `${year}-${firstMonth}-${firstDay}`;  // e.g., 2025-07-12
  }

  return `${defaultConfig.fileName.split('.')[0]}-${rotationType}-${period}.log`;
}

// Ensure the log directory exists
function ensureLogDirectory() {
  const logDir = path.join(defaultConfig.logDirectory);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

// Function to get the full log file path, based on the dynamic file name provided by the user
function getLogFilePath() {
  const timestamp = formatDateForFile(new Date(), defaultConfig.rotateBy);
  return path.join(defaultConfig.logDirectory, timestamp);
}

// Log rotation logic: Time-based rotation
function rotateLogFile() {
  const logFilePath = getLogFilePath();
  try {
    const stats = fs.existsSync(logFilePath) ? fs.statSync(logFilePath) : null;
    
    const now = new Date();
    const currentPeriod = formatDateForFile(now, defaultConfig.rotateBy);  // This is the current rotation period (day, month, year)
    const lastPeriod = stats ? formatDateForFile(new Date(stats.mtime), defaultConfig.rotateBy) : '';

    // Rotation occurs only if the period has changed (daily, weekly, etc.)
    if (currentPeriod !== lastPeriod) {
      const rotatedFilePath = path.join(defaultConfig.logDirectory, currentPeriod);
      fs.renameSync(logFilePath, rotatedFilePath);  // Rotate to a new file for the new period
    }
  } catch (err) {
    console.error('Error during log file rotation:', err);
  }
}

// Logging function
function logIt(level, message) {
  // Ensure log directory exists
  ensureLogDirectory();

  // Check if the log level is allowed (based on the current level configuration)
  if (levels.indexOf(level) >= levels.indexOf(defaultConfig.logLevel)) {
    const timestamp = formatDateForLog(new Date());
    const logMessage = `${timestamp} [${level.toUpperCase()}] ${message}`;

    const logFilePath = getLogFilePath();
    
    // Check if the file exists and append or create a new file if necessary
    if (!fs.existsSync(logFilePath)) {
      // Initialize the log file with the current date's name
      fs.writeFileSync(logFilePath, `${timestamp} [INFO] Log file created on ${timestamp}\n`);
    }

    // Rotate log file if required (based on time)
    rotateLogFile();

    // Write the log message to the file
    fs.appendFileSync(logFilePath, logMessage + '\n');
    
    // Also log to the console
    console.log(logMessage);
  }
}

// Allow customization of the default config
function configure(options) {
  Object.assign(defaultConfig, options);
}

// Expose the logging functions (info, warn, error, debug)
levels.forEach((level) => {
  logIt[level] = (message) => logIt(level, message);
});

logIt.configure = configure;

module.exports = logIt;
