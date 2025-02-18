import { SwaggerCustomOptions } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface ISwaggerConfig {
  title: string;
  description: string;
  version: string;
  apiKey: SecuritySchemeObject;
  apiKeyName: string;
}

export const SWAGGER_CONFIG: ISwaggerConfig = {
  title: 'App title',
  description: 'App description',
  version: 'neutral',
  apiKey: {
    type: 'apiKey',
    name: 'Authorization',
    description: 'Enter token',
    scheme: 'Bearer',
    in: 'Header',
  },
  apiKeyName: 'token',
};

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: 'App API Document',
};
