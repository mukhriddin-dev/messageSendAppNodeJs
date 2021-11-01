const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const Nexmo=require('nexmo');
const socketio=require('socket.io');

// install Nexmo
const nexmo=new Nexmo({
    apiKey:'562ab2d4',
    apiSecret:'oSy6IYl7wDraSeLA',
}, {debug:true});
// install app

const app=express();


// template engine setup

app.set('view engine' , 'html');
app.engine('html', ejs.renderFile);


// public folder setup

app.use(express.static(__dirname +'/public'));


// body parse midleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// index route
app.get('/', (req, res)=>{
    res.render('index');
   
})
// catch forn submit
app.post('/',(req, res)=>{
    // res.send(req.body);
    // console.log(req.body);

    const number=req.body.number;
    const text=req.body.text;

    nexmo.message.sendSms(
        '998990149998', number, text , { type: 'unicode'},
        (err, responseData)=>{
            if(err){
                console.log(err);
            }else{
                console.dir(responseData);
                // Get data from respons
                const data={
                    id: responseData.messages[0]['message-id'],
                     number:responseData.messages[0]['to']
                }

                // Emit to the client
                 io.emit('smsStatus', data)
            }

        }
    )

   
})
// define port

const port=3000;

// start server
const server=app.listen(port,()=> console.log(`Sever started on port ${port}`));
// Connect socket 
const io=socketio(server);

io.on('connection',(socket)=>{
     console.log('Connected');
     io.on('disconnect',()=>{
         console.log( 'Disconnected')
     })
})
    