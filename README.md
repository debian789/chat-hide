Chat con React.js y Socket.io 
============



Porque no hacer un chat si es tan facil con las tecnologias actuales, y aplicando lo aprendido en platzi, pudes ver el demo en funcionamiento  <a href="http://chat-reactjs.herokuapp.com/" >Aquí</a>



<h3>Iniciar el proyecto de forma local </h3>

Descargamos el proyecto con los siguiente comandos 


git clone https://github.com/debian789/chat-reactjs-socket.io.git

cd chat-reactjs-socket.io


Es necesario hacer unos pequeños ajustes al codigo para iniciarlo, editar el archivo AppChat.js que esta en la ruta components./AppChat.js y modificar la url de socket.io a this.socket = io('http://localhost:3000');


	componentWillMount(){

	this.socket = io('http://localhost:3000');



<h3>Iniciar el proyecto</h3> 

En la consola ejecutar los siguientes comandos: 

<pre>
yarn install

yarn build 

node index.js 
</pre>



Miguel Suescun, <a href="https://twitter.com/debian789"> @debian789</a>







