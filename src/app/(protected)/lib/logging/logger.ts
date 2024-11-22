type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
}

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development";
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLog(
    level: LogLevel,
    message: string,
    data?: unknown
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
  }

  private log(level: LogLevel, message: string, data?: unknown) {
    const logEntry = this.formatLog(level, message, data);

    if (this.isDevelopment) {
      switch (level) {
        case "debug":
          console.debug(logEntry);
          break;
        case "info":
          console.info(logEntry);
          break;
        case "warn":
          console.warn(logEntry);
          break;
        case "error":
          console.error(logEntry);
          break;
      }
    } else {
      // In production, you might want to send logs to a service
      // Example: sendToLogService(logEntry);
    }
  }

  debug(message: string, data?: unknown) {
    this.log("debug", message, data);
  }

  info(message: string, data?: unknown) {
    this.log("info", message, data);
  }

  warn(message: string, data?: unknown) {
    this.log("warn", message, data);
  }

  error(message: string, data?: unknown) {
    this.log("error", message, data);
  }
}

export const logger = Logger.getInstance();

