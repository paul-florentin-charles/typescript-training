import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import type { Cat } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiResponse({ status: 201, description: 'Cat created', type: Object })
  @ApiBody({ type: CreateCatDto })
  create(@Body() createCatDto: CreateCatDto): Cat {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cats' })
  @ApiResponse({ status: 200, description: 'List of cats', type: [Object] })
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cat found', type: Object })
  findOne(@Param('id') id: string): Cat {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cat by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateCatDto })
  @ApiResponse({ status: 200, description: 'Cat updated', type: Object })
  update(
      @Param('id') id: string,
      @Body() updateCatDto: UpdateCatDto,
  ): Cat {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cat by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Cat removed' })
  remove(@Param('id') id: string): void {
    this.catsService.remove(+id);
  }
}
