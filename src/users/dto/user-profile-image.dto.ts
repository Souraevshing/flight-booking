import { IsImageFile } from '../../utils/image-validator';

export class UploadImageDto {
  @IsImageFile({ message: 'Invalid image file type' })
  mimetype: string;
}
