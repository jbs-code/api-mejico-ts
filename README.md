# API-México
API construida en NodeJS con TypeScript, Express y MongoDB. Además de otros recursos como Cloudinary y JWT.
## Consideraciones
- El proyecto para que funcione se debe implementar el archivo example.env y renombrar a .env solamente.
  
- La SECRET_KEY es para generar el JWT, puede ser cualquier cadena. Recomiendo revisar la documentación de JWT.
  
- Se debe estar registrado en Cloudinary para obtener las credenciales necesarias para este proyecto.
  
- Sobre la base de datos, solo es necesario tener una base de datos creada de MongoDB y poner la ruta en el archivo .env donde se indica (Para este caso se utilizó MongoDB Atlas).
  
- Ejecutar "npm install" para instalar las dependencias y después "npm start" para ejecutar la aplicación.
  
- También, al ser un proyecto en TypeScript, tienes la opción de ejecutar "tsc" para transpilar el código a JavaScript, y después "node ./dist/index.js" para ejécutar la aplicación.

- ¡Listo!

## Toda la documentación del funcionamiento de la API se registro en Postman, la puedes consultar en: [Postman](https://documenter.getpostman.com/view/18132429/2s8ZDX43MB).

Notarás lo siguiente en la documentación:
- La estructura de cada ruta, y los datos que se deben de mandar en ella. Por ejemplo: para actualizar una categoría verás: *{{url}}/categorias/6376e6269b43615a46214fe8* donde *{{url}}* es la ruta raiz del proyecto como puede ser el localhost; y *6376e6269b43615a46214fe8* que es el id de la categoría a actualizar.

- Dado que algunas funciones únicamente las puede realizar alguien registrado, se le solicitará un token válido que va colocado en los headers definiendo la key: *x-token* con valor: *JWT* (JSON Web Token) que se consigue haciendo el login correctamente con un usuario registrado (ruta login).
  
- El body que se debe mandar para cada operación a realizar en la API.
  
- Practicamente los puntos anteriores se repiten en la mayoría de las rutas definidas.

## ¿Quieres consumir la API?
- Si quieres ver cómo se comporta la API en producción la podrás encontrar en: [https://api-mejico.jaimejb.com](https://api-mejico.jaimejb.com). Ahí se definen los endpoints que se pueden utilizar.
  
- ADVERTENCIA: Es posible que la API no esté disponible ya que está en un free host y no se encuentra permanentemente en línea.