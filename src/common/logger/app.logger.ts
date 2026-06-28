import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger {
  log(message: string): void {
    super.log(message);
  }

  error(
    message: string,
    trace?: string,
  ): void {
    super.error(message, trace);
  }

  warn(message: string): void {
    super.warn(message);
  }

  debug(message: string): void {
    super.debug(message);
  }

  verbose(message: string): void {
    super.verbose(message);
  }
}