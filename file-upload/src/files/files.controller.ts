// Import core NestJS decorators and utilities needed for this controller
import {
  Controller, // Marks this class as a REST controller
  Post, // Decorator for HTTP POST routes
  UploadedFile, // Extracts single uploaded file from request
  UseInterceptors, // Attaches interceptors (used here for file handling)
  Res, // Gives access to the raw Express response object
  Param, // Extracts a URL route parameter e.g. :name
  Query, //Extracts a URL route query string
  Get, // Decorator for HTTP GET routes
  UploadedFiles, // Extracts multiple uploaded files from request
  ParseFilePipe, // Pipe that runs validators on the uploaded file
  MaxFileSizeValidator, // Built-in validator to enforce max file size
  FileTypeValidator, // Built-in validator to check file MIME type (imported but not used)
  BadRequestException, // Throws a 400 HTTP error with a custom message
} from '@nestjs/common';

import {
  FileInterceptor, // Intercepts a single file upload from a multipart form
  FilesInterceptor, // Intercepts multiple file uploads from a multipart form
} from '@nestjs/platform-express';

import {
  diskStorage, // Tells Multer to save uploaded files to disk
  MulterError, // Multer's built-in error class (imported but not used)
} from 'multer';

@Controller('files') // All routes in this class are prefixed with /files
export class FilesController {
  @Post('upload') // Handles POST /files/upload
  @UseInterceptors(
    FileInterceptor('file', {
      // Intercepts form field named 'file'
      storage: diskStorage({
        // Use disk storage (not memory)
        destination: './uploads', // Save files to the ./uploads folder
        filename: (req, file, cb) => {
          // Custom function to generate filename
          const filename = Date.now() + '-' + file.originalname; // Prepend timestamp to avoid name conflicts
          cb(null, filename); // cb(error, filename) — null means no error
        },
      }),
      fileFilter: (req, file, cb) => {
        // Runs before saving — used to validate file type
        if (file.originalname.match(/^.*\.(jpg|jpeg|pdf)$/)) {
          // Check if filename ends with .jpg, .jpeg, or .pdf
          cb(null, true); // Accept the file — null = no error, true = allow
        } else {
          cb(
            new BadRequestException('Only .jpg, .jpeg, .pdf files are allowed'),
            false,
          ); // Reject with 400 error, false = deny
        }
      },
      limits: { fileSize: 4 * 1024 * 1024 }, //4MB max file limit set
    }),
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    // Type the file as a Multer file object
    return {
      message: 'File uploaded successfully', // Success message in response
      filename: file.filename, // The generated filename e.g. 1234567890-photo.jpg
      path: file.path, // Full path where file was saved e.g. uploads/1234567890-photo.jpg
    };
  }

  @Get('getfile') // Handles GET /files/getfile
  getImages(@Query('filename') filename, @Res() res) {
    // Extract :name from URL, get raw Express response
    res.sendFile(filename, { root: './uploads' }); // Serve the file from ./uploads folder directly as HTTP response
  }

  @Post('upload-multiple') // Handles POST /files/upload-multiple
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      // Intercept form field named 'files', allow max 10 files
      storage: diskStorage({
        // Use disk storage (not memory)
        destination: './uploads', // Save all files to ./uploads folder
        filename: (req, file, cb) => {
          // Custom filename generator for each file
          const filename = Date.now() + '-' + file.originalname; // Timestamp prefix for each file
          cb(null, filename); // Accept with generated filename
        },
      }),
      fileFilter: (req, file, cb) => {
        // Runs before saving — used to validate file type
        if (file.originalname.match(/^.*\.(jpg|jpeg|pdf)$/)) {
          // Check if filename ends with .jpg, .jpeg, or .pdf
          cb(null, true); // Accept the file — null = no error, true = allow
        } else {
          cb(
            new BadRequestException('Only .jpg, .jpeg, .pdf files are allowed'),
            false,
          ); // Reject with 400 error, false = deny
        }
      },
      limits: { fileSize: 4 * 1024 * 1024 }, //4MB max file limit set
    }),
  )
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    // Extract array of uploaded files
    return {
      message: 'Files uploaded successfully', // Success message in response
      files: files.map((file) => ({
        // Loop over each uploaded file and return its info
        filename: file.filename, // Generated filename for this file
        path: file.path, // Saved path for this file
      })),
    };
  }
}
