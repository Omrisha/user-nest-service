import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    res.on('finish', () => {
      const { method, originUrl } = req;
      const { statusCode, statusMessage } = res;

      const message = `${method} ${originUrl} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }
      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
    
    next();
  }
}
