import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ResponseMessage } from '../../../common/decorators/response-message.decorator';
import { Messages } from '../../../common/constants/messages.constants';
import { ApiResponseDto } from '../../../common/dto/api-response.dto';
import { HealthResponseDto } from '../dto/health-response.dto';
import { HealthService } from '../services/health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @ResponseMessage(Messages.HEALTH.CHECK)
  @ApiOperation({
    summary: 'Health Check',
  })
  @ApiOkResponse({
    description: 'Application is healthy',
    type: ApiResponseDto<HealthResponseDto>,
  })
  check(): HealthResponseDto {
    return this.healthService.check();
  }
}
