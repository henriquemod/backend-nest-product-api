/* eslint-disable @typescript-eslint/no-unused-vars */
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ID format');
    }
    return value;
  }
}
