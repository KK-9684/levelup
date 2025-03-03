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
    // Check if the value is an object (can be an object or an array, based on the use case)
    if (typeof value !== 'object' || value === null) {
      throw new BadRequestException(
        'Validation failed: Value must be an object.',
      );
    }

    // Example of custom validation: Ensure all required properties are present
    if (metadata.data && Array.isArray(metadata.data)) {
      const requiredFields = metadata.data; // Required fields passed via metadata
      const missingFields = requiredFields.filter((field) => !(field in value));

      if (missingFields.length > 0) {
        throw new BadRequestException(
          `Validation failed: Missing fields: ${missingFields.join(', ')}`,
        );
      }
    }

    // Example: Validate property types (if needed)
    if (value['id'] && typeof value['id'] !== 'number') {
      throw new BadRequestException('Validation failed: id must be a number.');
    }

    // Return value if all validations passed
    return value;
  }
}
