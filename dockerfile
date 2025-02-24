# Usar la imagen oficial de Node.js como base
FROM node:14

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de tu aplicación al contenedor
COPY package*.json ./
RUN npm install  # Instalar las dependencias

# Copiar el resto de los archivos de tu proyecto
COPY . .

# Exponer el puerto que tu aplicación usará
EXPOSE 3000

# Ejecutar el comando para iniciar tu servidor Node.js
CMD ["node", "server/server.js"]
