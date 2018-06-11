const express = require('express');
const http = require('http');
const engine = require('socket.io')
const multer = require('multer')
const ext = require('file-extension')
const url = require('url')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {

        cb(null, +Date.now() + '.' + ext(file.originalname))
    }
});

let upload = multer({storage: storage})

const port = process.env.PORT || 3000;
const app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/static', express.static(__dirname + '/build/static'));
app.use('/build', express.static(__dirname + '/build'));
app.use('/service-worker.js', express.static(__dirname + '/build/service-worker.js'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.post('/upload', upload.single('file'), function (req, res, next) {
    res.json({file: req.protocol + '://'+ req.get('host') + '/'+ req.file.path});
})

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

let server = http.createServer(app).listen(port, () => {
    console.log(` Servidor corriendo en el puerto ${port} `);
});

const io = engine.listen(server);

io.on('connection', (socket) => {
    socket.on('mensaje', (msg) => {
        console.log("mensaje del socket ");
        socket.broadcast.to(socket.sala).emit('mensaje', msg)
    });

    socket.on('clear', (data) => {
        console.log('clear messaje');
        socket.broadcast.to(socket.sala).emit('clear', data)
    })

    socket.on('join', sala => {
        socket.sala = sala
        socket.join(sala)
    })
});

