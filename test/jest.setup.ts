import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}


jest.mock('../src/config', () => ({
    IMAGEKIT_BASE_URL: 'https://ik.imagekit.io/r5urt5qdn',
  }));