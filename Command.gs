
function getMe(){
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id,text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendHTML(id,text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text + '&parse_mode=HTML';
  var response = UrlFetchApp.fetch(url);
  sendText(id,response);
  Logger.log(response.getContentText());
}

//なんでか使えない、原因がさっぱりわからん。
function sendText2(chatId, text) {
  var payload = {
    'method': 'sendMessage',
    'chat_id': chatId,
    'text': text,
    'parse_mode': 'HTML'
  }
  var data = {
    'method': 'post',
    'payload': payload
  }
  var response  = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function deleteAfterAt(str){
  var point = str.indexOf("@");
  if(point>0){
    return str.substring(0,point);
  }else{
    return str;
  }
}
function doPost(e){
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var name = data.message.chat.first_name + " " + data.message.chat.last_name;
  //var answer = "Hi " + name + ", thank you for your comment " + text;
  //GmailApp.sendEmail(Session.getEffectiveUser().getEmail(),"Message send to bot",answer); 
  if (data.hasOwnProperty('message')) {
      var msg = data.message;
      var command = deleteAfterAt(msg.text);
     if (msg.hasOwnProperty('entities') &&　msg.entities[0].type == 'bot_command') {
       if(command == '/omikuji'){
         sendText(id,OmikujiMain());
        }
        if(command == '/set'){
         var text = 'おみくじの内容の編集は以下からできます。 https://docs.google.com/spreadsheets/u/8/d/1FXs8PfEDtD1OE_EOZnafY6tc8o_hsidRz7Gr2Qo6Bw8/edit#gid=0';
         sendText(id,text);
        }
        
      }

   }
}