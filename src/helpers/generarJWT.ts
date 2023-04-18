import jwt from 'jsonwebtoken';

export const generarJWT = (uid = "") => {

    //implementación síncrona de jwt, revisar doc para una implementación asíncrona
    const token = jwt.sign({ uid }, process.env.SECRET_KEY, { expiresIn: '4h' });
    return token;

}
