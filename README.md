# Resumen

<img src="public/images/github_thumbmail.png" width="1200">

Este proyecto consiste en una página web desarrollada por Álvaro Rubio Gómez como un proyecto personal para poner en práctica los conceptos y herramientas aprendidas durante un periodo de autoaprendizaje de tres semanas. Las cuales incluyen, entre otras, HTML, CSS, JavaScript, Node.js, Express, MySQL, OAuth y XAMPP.

En el proceso se han elaborado una serie de esquemas sonbre el contenido más importante de cada una de las herramientas.
Estos esquemas pueden ser consultados [aquí](https://colab.research.google.com/drive/1J5L7E-r01xSRGgqM7ptbNFzYc40FvudW?usp=sharing) (html, css) y [aquí](https://colab.research.google.com/drive/1gP1v3JFL_Svh29dQQrouzDrQYxxeAqNl?usp=sharing) (node.js, MySQL, express, ejs, passport.js module).

# Ejecutar la Website en local

A continuación se detallan los pasos a seguir para ejecutar este proyecto en local.

## Instala Node.js y Express

Existen multitud de turoriales para ello, como por ejemplo [este]https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website

Para instalar 
## Crear archivo key.js

Por cuestiones de seguridad, este proyecto no incluye el archivo *keys.js* donde se encuentran las credenciales de Google Auth (Client ID and secret) y las key para generar las cookies.

Por ello, deberá crear un archivo *key.js* e incluirlo dentro de la carpeta *config*

El archivo deberá contener las siguientes lineas de código.

```ruby
module.exports = {
    google:{
        clientID: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    session:{
        cookieKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
};
puts markdown.to_html
```
*ClientID* y *ClientSecret* son credenciales que se obtienen en la página de google de [console.developers](https://console.developers.google.com/). Para más información de como, existen multiples tutoriales online, como [este](https://www.youtube.com/watch?v=xH6hAW3EqLk&ab_channel=CodeJava).

*cookieKey* es un string que acepta cualquier valor, como si de una contraseña personal se tratara.

## Genera la base de datos

Inicia la página web en local ejecutando en la consola:
```ruby
node '.\app.js'
puts markdown.to_html
```
Vete al buscador y escribe *http://localhost:3000/db*

## Genera las tablas

A continuación escribe *http://localhost:3000/db/createtables*

## Inserta las preguntas

A continuación escribe *http://localhost:3000/db/insert/questions*

## Have fun!

Vete a *http://localhost:3000* y disfruta explorando la página web.

