# PFC - Sensación - front

Este repositorio es parte del proyecto final de ciclo. 

## Descripción

Este módulo del proyecto servirá para mostrar e interactuar con el usuario final de la aplicación a través de un sitio web. Una parte de la web será estática y otra dinámica usando Angular.

Esta última parte (Angular), se iniciará desde una ruta concreta _/reserva_, y solo servirá para ayudar al cliente a realizar la reserva de una mesa a partir de la consulta de disponibilidad al servidor.

Para realizar la reserva el usuario no necesitará registrarse, solo se le pedirán algunos datos a través de un formulario, con lo que se le mostrará la disponibilidad y por último podrá reservar tan solo pulsando un botón.

El directorio _angular_ contiene el código de desarrollo de la parte dinámica, desde donde se generará el directorio _reserva_ usando `ng build`. El resto de directorios y documentos son la parte estática del sitio web.

### Tecnologías

- Html
- Css
- Bootstrap
- Javascript
- Typescript
- Angular
- Docker
 
## Instalación

El proceso de compilación del proyecto y generación de la imagen de docker es sencillo y se describirá más adelante. Para los pasos descritos se toma como sistema operativo en funcionamiento linux. En windows no difiere demasiado el proceso.

### Dependencias

- node / npm
- angular-cli
- docker

Para instalar el cli de angular es necesario tener instalado previamente _node.js_ y su gestor de paquetes _npm_ [Link](https://nodejs.org/es/). Para más información sobre el cli se puede consular su documentación [Link](https://angular.io/cli).

## Angular

Para poder generar el proyecto deben instalarse previamente las dependencias de angular con el siguiente comando, desde el directorio _angular_:

``` bash
cd angular

npm install
```

### Ejecución en desarrollo

Para probar la aplicación se puede ejecutar el siguiente comando:

``` bash
ng serve
```

Esto genera un servidor que escuchará en el puerto _4200_ y la aplicación se inicia desde la ruta _reserva/_, por lo que el enlace sería el siguiente:

http://localhost:4200/reserva/

**Nota**: debe tenerse en cuenta que la aplicación estará conectada a la api por lo que las **reservas** que se realicen se guardaran en la base de datos en producción [Link](https://api.sensacion.kennycallado.dev).

### Compilación

Una vez probado el servidor se puede generar el build que se enviará a producción con el siguiente comando:

``` bash
ng build
```

Esto guarda el resultado de la transpilación y construcción en un directorio superior llamando _reserva_ y el cual será guardado en la imagen que se enviará a producción, no así con el directorio _angular_ el cual no se guarda en la imagen.

## Imagen para producción

Debido a que se pretende desplegar la aplicación como un contenedor sobre un servidor de kubernetes, a continuación se describen los pasos para crear la imagen que podrá ser publicada para su puesta en producción. En este caso el contenedor se desplegará sobre una raspberry-pi por lo que debe especificarse la arquitectura en el proceso.

### Dependencias

Como se ha especificado anteriormente debe tenerse instalado _docker_ o _podman_ y que permitan la generación de imágenes en otras arquitecturas. Los comando que expongo usan _podman_ pero podría sustituirse por _docker_ sin problema.

Para que funcione correctamente la parte de angular, debe haberse generado la compilación previamente como se ha descrito anteriormente.

### Proceso

En caso de haber seguido los pasos anteriores, ahora se debe subir una carpeta para volver a la raíz de este proyecto `cd ..`. Desde este punto se puede ejecutar el siguiente comando:

``` bash
podman build --no-cache --pull --platform linux/arm64 -t kennycallado/sensacion_web:vX-nginx-arm64 .
```

Nótese que he usado un tag relativo a mi cuenta en https://hub.docker.com.

### Registro remoto

Para que el resultado de todos estos pasos previos sea accesible desde cualquier punto, usaré el registro de imágenes oficial de docker, y para ello debe ejecutar el siguiente comando:

``` bash
podman push --format docker kennycallado/sensacion_web:vX-nginx-arm64
```

Para que funcione previamente ha de realizar el login con las credenciales oportunas:

``` bash
podman login
```

### Despliegue

Para el despliegue en kubernetes deben generarse los manifiestos necesarios que se aportan en otro repositorio (PFC-root).
