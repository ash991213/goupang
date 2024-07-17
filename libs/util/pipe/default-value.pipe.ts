import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DefaultValuePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToInstance(metadata.metatype, value, { excludeExtraneousValues: true, exposeDefaultValues: true });

        for (const key in obj) {
            if (obj[key] === undefined && metadata.metatype.prototype[key] !== undefined) {
                obj[key] = metadata.metatype.prototype[key];
            }
        }

        return obj;
    }
}
