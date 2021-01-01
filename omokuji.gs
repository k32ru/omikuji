function loadOmikujiData(){
  var omikujiSpreadSheetID = "1FXs8PfEDtD1OE_EOZnafY6tc8o_hsidRz7Gr2Qo6Bw8";
  var watchSheetName  = "GPU";
  var sheet = SpreadsheetApp.openById(omikujiSpreadSheetID).getSheetByName(watchSheetName);
  
  var omikujiData = []
  const columnBVals = sheet.getRange('A:A').getValues();
  const LastRow = columnBVals.filter(String).length;
  for(var i = 0 ;i < LastRow-1; i++){
    var rare = sheet.getRange(2+i, 1, 1).getValue();
    var fortune = sheet.getRange(2+i,2 , 1).getValue();
    var description=  sheet.getRange(2+i, 3, 1).getValue();
   
    omikujiData.push({rare:rare,fortune:fortune,description:description})    
  }
  Logger.log(omikujiData);
 return omikujiData;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function OmikujiMain(){
  omikujiData = loadOmikujiData();

  while(true){
    selected = getRandomInt(omikujiData.length);
    randomRare = Math.random();
    Logger.log('select' + omikujiData[selected]['rare'] + ' random' + randomRare);
    if(omikujiData[selected]['rare']> randomRare){
      sendText = 'あなたの運勢は' + omikujiData[selected]['fortune'] +'です。'+ omikujiData[selected]['description'];
      break;
    }
  }
   Logger.log(sendText);
  return sendText;

}