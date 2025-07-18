
# logit-pro

[![npm version](https://badge.fury.io/js/logit-pro.svg)](https://www.npmjs.com/package/logit-pro)

`logit-pro` is a flexible and powerful logging package for Node.js, providing level-based logging and automatic log rotation. It allows you to manage logs effectively with configurable log levels, customizable file names, and support for daily, weekly, monthly, or yearly log rotation.

## Features

- **Level-based Logging**: Supports `debug`, `info`, `warn`, and `error` levels.
- **Time-based Log Rotation**: Rotate logs on a **daily**, **weekly**, **monthly**, or **yearly** basis.
- **Customizable Log Settings**: Easily configure the log directory, file name, log level, and rotation type.
- **Automatic Log File Handling**: Creates new log files if they don't exist and handles log file rotation.

## Installation

To use `logit-pro`, ensure you have Node.js installed.

Install the package via npm:

```bash
npm install logit-pro
```

## Usage

### Basic Logging

You can log messages at different levels using the following methods:

```javascript
const logIt = require('logit-pro');

// Log an info message
logIt.info('This is an info message');

// Log a warning message
logIt.warn('This is a warning message');

// Log an error message
logIt.error('This is an error message');

// Log a debug message
logIt.debug('This is a debug message');
```

### Configuration

`logit-pro` allows you to configure the logging behavior. You can set a custom log directory, log level, log file name, and log rotation type.

Here’s an example of how to configure the logger:

```javascript
const logIt = require('logit-pro');

// Configure custom settings with dynamic log file name
logIt.configure({
  logDirectory: './mylogs',  // Custom log directory
  logLevel: 'error',         // Log level (default: 'debug')
  rotateBy: 'daily',         // Rotation type ('daily', 'weekly', 'monthly', 'yearly')
  fileName: 'myapp.log',     // Custom log file name
});

// Log messages
logIt.info('This is an info message');
logIt.warn('This is a warning');
logIt.error('An error occurred');
logIt.debug('Debugging information');
```

### Log Level Configuration

By default, the log level is set to `debug`, which means all log levels (`debug`, `info`, `warn`, `error`) will be logged. You can change the log level to control which messages are logged.

Example: To log only `error` messages, configure as follows:

```javascript
logIt.configure({ logLevel: 'error' });  // Logs only errors
```

### Log Rotation

`logit-pro` supports log rotation based on time intervals. The rotation options are:

- `daily`
- `weekly`
- `monthly`
- `yearly`

You can specify the rotation type in the configuration.

For example, to rotate logs on a **daily** basis:

```javascript
logIt.configure({ rotateBy: 'daily' });
```

### Log File Naming

The log file name will be generated dynamically based on the configured rotation type. For instance:

- **Daily rotation**: `myapp-daily-2025-07-17.log`
- **Weekly rotation**: `myapp-weekly-2025-07-12.log`
- **Monthly rotation**: `myapp-monthly-2025-07.log`
- **Yearly rotation**: `myapp-yearly-2025.log`

### Example Test Code

Here's an example of how to use `logit-pro` in your project:

```javascript
const logIt = require('logit-pro');

// Configure custom settings with dynamic log file name
logIt.configure({
  logDirectory: './mylogs',  // Custom log directory
  logLevel: 'error',         // Log only errors and above
  rotateBy: 'daily',         // Rotation type ('daily', 'weekly', 'monthly', 'yearly')
  fileName: 'myapp.log',     // Custom log file name
});

// Log messages at different levels
logIt.info('This is an info message');
logIt.warn('This is a warning');
logIt.error('An error occurred');
logIt.debug('Debugging information');

// Logs will be saved to ./mylogs/myapp-2025-07-17.log, and rotated based on time.
```

### Log Format

Logs will be written in the following format:

```
YYYY-MM-DD HH:mm:ss [LEVEL] Message
```

Example:

```
2025-07-17 14:25:30 [INFO] Application started
2025-07-17 14:26:10 [ERROR] An error occurred
```

## Methods

- `logIt.info(message)`: Logs an info message.
- `logIt.warn(message)`: Logs a warning message.
- `logIt.error(message)`: Logs an error message.
- `logIt.debug(message)`: Logs a debug message.
- `logIt.configure(options)`: Customizes the logging configuration (log level, directory, file name, rotation type).

## Log Rotation

The log files are rotated according to the `rotateBy` configuration:

- **Daily rotation**: `myapp-daily-2025-07-17.log`
- **Weekly rotation**: `myapp-weekly-2025-07-12.log`
- **Monthly rotation**: `myapp-monthly-2025-07.log`
- **Yearly rotation**: `myapp-yearly-2025.log`

Log files are automatically renamed when a new rotation period begins, and logs are appended to the file.

## License

This package is licensed under the MIT License.

---

For any issues or contributions, please visit the repository:

- **Repository URL**: [https://github.com/00sandy00/logit-pro](https://github.com/00sandy00/logit-pro)
- **Bug Report**: [https://github.com/00sandy00/logit-pro/issues](https://github.com/00sandy00/logit-pro/issues)
- **Homepage**: [https://github.com/00sandy00/logit-pro#readme](https://github.com/00sandy00/logit-pro#readme)
