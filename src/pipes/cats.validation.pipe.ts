import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { FindOneParams } from 'src/cats/cats.controller';

@Injectable()
export class CatsValidationPipe implements PipeTransform {
  transform(value: FindOneParams, metadata: ArgumentMetadata): FindOneParams {
    // Handle simple parameter validation (id is expected to be a number)
    if (metadata.type === 'param' && metadata.data === 'id') {
      // Ensure that 'id' is a number
      if (typeof value !== 'number') {
        throw new BadRequestException(
          'Validation failed: id must be a number.',
        );
      }
    }

    // Return value if all validations passed
    return value;
  }
}
