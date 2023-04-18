import cloudinary from "./configCloudinary";

export const subirImagen = async (path = '', publicId = '') => {

    //definimos estas opcines para tener un  control sobre la imgs que subamos a
    //cloudinary y que nos van a servir al momento de hacer actualizaciones.
    const options = {
        public_id: publicId,
        overwrite: true,
        folder: 'Mejico'
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(path, options);
        const { public_id, secure_url } = result;
        
        return {
            public_id,
            secure_url
        };
    } catch (error) {
        console.error(error);
        return {
            public_id: '',
            secure_url: ''
        }
    }
}
