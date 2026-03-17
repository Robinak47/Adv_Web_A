import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = Date.now() + '-' + file.originalname;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('only image files and pdf  are accepted'),
            false,
          );
        }
      },

      limits: {
        fileSize: 3 * 1024 * 1024,
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'file upload successfully',
      filename: file.filename,
      path: file.path,
    };
  }

  @Get(':getFiles')
  getFiles(@Query('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = Date.now() + '-' + file.originalname;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('only image files and pdf are accepted'),
            false,
          );
        }
      },

      limits: {
        fileSize: 3 * 1024 * 1024,
      },
    }),
  )
  uploadFileMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return {
      message: 'file upload successfully',
      files: files.map((file) => ({
        filename: file.filename,
        path: file.path,
      })),
    };
  }
}
