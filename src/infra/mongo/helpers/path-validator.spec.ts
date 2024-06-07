import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from './path-validator';

describe('ValidateObjectIdPipe', () => {
  let pipe: ValidateObjectIdPipe;

  beforeEach(() => {
    pipe = new ValidateObjectIdPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return the value if it is a valid ObjectId', () => {
    const validObjectId = new Types.ObjectId().toHexString();
    expect(pipe.transform(validObjectId)).toBe(validObjectId);
  });

  it('should throw BadRequestException if the value is not a valid ObjectId', () => {
    const invalidObjectId = 'invalid-object-id';
    expect(() => pipe.transform(invalidObjectId)).toThrow(BadRequestException);
    expect(() => pipe.transform(invalidObjectId)).toThrow('Invalid ID format');
  });
});
