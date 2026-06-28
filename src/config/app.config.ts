    import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: 'Badminton Shuffler API',

  version: '1.0.0',

  description: 'Backend API for Badminton Shuffler',
}));