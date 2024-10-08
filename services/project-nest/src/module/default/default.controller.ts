import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class DefaultController {
    @Get()
    create() {
        return 'hello';
    }
}
