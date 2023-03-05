import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionFilter } from './http.exception';

describe('HttpExceptionFilter', () => {
   let httpExceptionFilter: HttpExceptionFilter;
   let mockResponse: Partial<Response>;
   let mockArgumentsHost: ArgumentsHost;

   beforeEach(() => {
      httpExceptionFilter = new HttpExceptionFilter();
      mockResponse = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn().mockReturnThis(),
      };
      mockArgumentsHost = {
         switchToHttp: jest.fn().mockReturnThis(),
         getResponse: jest.fn().mockReturnValue(mockResponse),
         getRequest: jest.fn(),
      } as any;
   });

   it('should catch HttpException and return JSON response with status code and message', () => {
      const exception = new HttpException('Test message', 400);
      const expectedResponse = {
         statusCode: 400,
         message: 'Test message',
      };

      httpExceptionFilter.catch(exception, mockArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
   });

   it('should catch HttpException with default status code of 500', () => {
      const exception = new HttpException('Test message', 500);
      const expectedResponse = {
         statusCode: 500,
         message: 'Test message',
      };

      httpExceptionFilter.catch(exception, mockArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
   });
});
