#### Como ejecutar el agent

En MacOS
Definir la variable de entorno NODE_ENV a dev 
yarn start-agent y debería ejecutarse el proceso, se apagará solo después de 30 minutos o lo definido en el archivo dev.env para la variable MIN_DISCONNECT

En windows fallará porque source y otros comandos no existen. Si se quiere ejecutar desde windows, habría que leer el valor de MIN_DISCONNECT directamente

#### Levantar el express

yarn start-express