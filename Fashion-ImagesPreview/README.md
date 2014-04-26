<img src="img/logo.png">

Galería de imágenes con jQuery muy facil de usar.
<br>

<a target="_new" href="http://fufales.com/frameworks/jQueryImagesPreview/">
DEMO ONLINE
</a>

Resumen
=======
- <b>Archivos importantes que debémos indexar:</b>
<br>
<b>js</b> / <code>jquery.imagespreview.js</code> : Archivo que contiene nuestro plugin.<br>
<b>css</b> / <code>imagespreview.css</code> : Archivo que contiene los estilos de nuestro plugin.<br>
<b>img</b> / <code>close_window.png</code> : Icono para cerrar la ventana del popup.<br>
<b>img</b> /<code> repead_jque_img.png</code> : Imagen que crea la parte negra del popup.<br>
<br>
- <b>Uso</b>

        <span class="jq_Impreview" data-loadimgjpreview="img/images/img1.jpg">
        	<img src=" img/image_1.jpg " alt="img">
        </span>
<code>data-loadimgjpreview</code> es la URL de la imagen que querémos cargar.

Screens
=======
<img src="img/screen_1.png">
<br>
<img src="img/screen_2.png">

Instalacion y archivos importantes
==================================

- Lo primero que requerímos para usar el plug-in es <b>jQuery</b>, así que lo añadirémos antes del final de la etiqueta <code> "aquí" /body </code>

              <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
              
- Ya instalado jQuery en nuestro index; podémos en ese caso instalar nuestra Galería añadíendo los siguientes archivos<br><br>
<b>js</b> / <code>jquery.imagespreview.js</code> : Archivo que contiene nuestro plugin.<br>
<b>css</b> / <code>imagespreview.css</code> : Archivo que contiene los estilos de nuestro plugin.<br>
<b>img</b> / <code>close_window.png</code> : Icono para cerrar la ventana del popup.<br>
<b>img</b> /<code> repead_jque_img.png</code> : Imagen que crea la parte negra del popup.<br>

- Una vez instalado todo, se debería ver el HTML de la siguiente forma (Leér los comentários del HTML):

        <!DOCTYPE html>
        <html lang="es">
        <head>
        	<meta charset="utf-8">
        	<title>jQuery Images Preview</title>
        	<link rel="stylesheet" type="text/css" href="css/imagespreview.css"> /*CSS del plug-in*/
        </head>
        <body>
        
        <script src="js/jquery.min.js"></script> /*jQuery requerido*/
        <script src="js/jquery.imagespreview.js"></script> /*Plug-in requerido*/
        </body>
        </html>
        
- Ahora solo nos queda implementar la galería con los enlaces de la siguiente forma:

        <span class="jq_Impreview" data-loadimgjpreview="img/images/img1.jpg">
        	<img src=" img/image_1.jpg " alt="img">
        </span>
        
Lo interesante es que lo único que tenemos que hacer es modificar ésta linea => <code>data-loadimgjpreview="img/images/img1.jpg"</code> en la cual se escribe la URL del archivo, puede ser cualquier URL de una imagen, no importa el formato.

y con respecto a la imagen <code> img src="img/image_1.jpg " alt="img" </code> : Es solo un preview para no sobre cargar nuestra pagina web y estámos listos para usarlo.


<b>Por</b> <i>Klooid.com</i>
