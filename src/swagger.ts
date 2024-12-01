import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Detailed API documentation for your project.',
      contact: {
        name: 'Your Name',
        email: 'your.email@example.com',
      },
    },
  },
  apis: ['./routes/**/*.ts'],  
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
