const numberInput=document.getElementById('number'),
      messageText=document.getElementById('message'),
      sendButton=document.getElementById('button'),
      response=document.querySelector('.response');
      
      sendButton.addEventListener('click', send , false);

      const socket=io();

 socket.on('smsStatus' , function(data){
     response.innerHTML='<h5>Text message send to ' + data.number +'</h5>'
 })  

      function send(){
console.log('send');
          const number=numberInput.value.replace(/\D/g, '');
          const text=messageText.value;
          fetch( '/',{
              method:'post',
              headers:{
                  'Content-type':'application/json'
              },
              body: JSON.strigfy({number:number, text: text}) 


          })
          .then(function(res){
               console.log(res) 
          })
          .catch(
              function(err){
console.log(err)
              }
          )

      }