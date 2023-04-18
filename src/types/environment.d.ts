export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        MONGOBD_CNN: string;
        SECRET_KEY: string;
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
    }
  }
}
