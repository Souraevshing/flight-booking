import { IsUrl } from 'class-validator';

import { IsImageFile } from '../../utils/image-validator';

export class UploadImageDto {
  @IsImageFile({ message: 'Invalid image file type' })
  @IsUrl()
  mimetype: string;
}
