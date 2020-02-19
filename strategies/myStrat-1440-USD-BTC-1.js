const request = require("request-promise");
var moment  = require('moment')
var log = require('../core/log.js');
var myLibrary = require("./myFunction.js");
/******************************************************************************/
// Let's create our own strategy
var strat = {};
var IndicatorConfig = myLibrary.configIndicator();

// Prepare everything our strat needs
strat.init = function(candle) {

     //init all Indicator + var strat update => dont moove line position !!
     myLibrary.initIndicator(this.addTalibIndicator,IndicatorConfig);
     //Global Strat
     this.backtestId = this.settings.backtestId;
     this.from = this.settings.from;
     this.to = this.settings.to;
     this.mode = this.settings.mode;
     this.currentTrend = this.settings.currentTrend;
     this.strat = this.settings.strat;
     this.exchange = this.settings.exchange;
     this.currency = this.settings.currency;
     this.asset = this.settings.asset;
     this.period = this.settings.period;
     this.URI = this.settings.uri;
     //

     //papers
     this.dateLong = '';
     this.currentPrixAchat = 0;
     this.currentPrixVente = 0;
     this.dateShort = '';
     //Compte trade
     this.triggerFirstTrade = 0;

     //Global Trigger
     this.triggerIndex = 0;
     //sell
     this.pallier = 0
     //buy
     this.compteur = 0;

     //
     this.percentBetweenLastCandle = 0;
     this.percentBetweenPriceAndMa = 0;
     //
     this.triggerSell = 0;
     this.lastPrice = 0;
     //
     this.memory1 = 0
     this.memory2 = 0
     this.memory3 = 0
}

// What happens on every new candle?
strat.update = function(candle){}

// For debugging purposes.
strat.log = function() {
}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function(candle) {

/****************************************************************************************************************************/
/****************************************************************************************************************************/
//Import RequestApp + Indicator/*********************************************************************************************/
  var requestApp = myLibrary.requestFunctionApp(this.URI);
  //
  var myIndicatorOSI = myLibrary.addOverlapStudiesIndicator(this.talibIndicators);
  var myIndicatorM = myLibrary.addMomentumIndicator(this.talibIndicators);
  var myIndicatorVolu = myLibrary.addVolumeIndicator(this.talibIndicators);
  var myIndicatorVola = myLibrary.addVolatilityIndicator(this.talibIndicators);
  var myIndicatorPT = myLibrary.addPriceTransformIndicator(this.talibIndicators);
  var myIndicatorC = myLibrary.addCycleIndicator(this.talibIndicators);
  var myFrontAppIndicator = myLibrary.addFrontAppIndicator(this.talibIndicators);
  console.log(myFrontAppIndicator);

/****************************************************************************************************************************/
  function sellAction(self){
    self.threshold = "";
    self.stop = "";
    self.stop_up = ""


   self.advice('short');
   self.pallier = 0
   self.currentTrend = 'short';
   //log SELL
   log.debug('                                                                                                     SELL');
   //Log Trades App
   /*********************************************************************************************************************/
   log.debug('makeHttpRequestTrade short');
   if(self.mode === 'backtest'){requestApp.backtest.trade("TRADE",self.backtestId,self.triggerIndex,formatDate,price,'short')}
   if(self.mode === 'live'){requestApp.live.trade("LIVETRADE",self.backtestId,self.triggerIndex,unix.toString(),price,'short')}
   /****************************************************************************************************************/
   //PAPER TRADER
   self.currentPrixVente = candle.close;
   self.dateShort = paperFormat;
   log.debug('makeHttpRequestPaper paper');
   if(self.mode === 'backtest'){
     requestApp.backtest.paper("PAPER",self.backtestId,self.triggerFirstTrade,self.dateLong,self.dateShort,self.currentPrixAchat,self.currentPrixVente);
   };
   if(self.mode === 'live'){
     requestApp.live.paper("LIVEPAPER",self.backtestId,self.triggerFirstTrade,self.dateLong,self.dateShort,self.currentPrixAchat,self.currentPrixVente);
     //alert + record Db Mongo
     requestApp.signal.alert("LIVESIGNAL",self.backtestId,self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,unix.toString(),price,'short');
     //alert AllSignals
     requestApp.signal.alert("LIVESIGNAL","AllSignals",self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,unix.toString(),price,'short');
  };
   /******************************************************************************************************************/
   log.debug('                                                                                                     SELL');
}
  function buyAction(self){
//
self.currentPrixAchat = candle.close;
self.triggerFirstTrade++;
self.dateLong = paperFormat;
//New Objectif
self.threshold = self.currentPrixAchat * sellat;
self.stop = self.currentPrixAchat * stop_loss_pct;
self.stop_up = self.threshold;


/******************************************************************************************************************************************************/
self.advice('long');
self.compteur = 0
self.currentTrend = 'long';
//log BUY
log.debug('                                                                                                      BUY');
//Log Trades App
log.debug('makeHttpRequestTrade long');
if(self.mode === 'backtest'){requestApp.backtest.trade("TRADE",self.backtestId,self.triggerIndex,formatDate,price,'long')}
if(self.mode === 'live'){
  requestApp.live.trade("LIVETRADE",self.backtestId,self.triggerIndex,unix.toString(),price,'long');
  //alert + record Db Mongo
  requestApp.signal.alert("LIVESIGNAL",self.backtestId,self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,unix.toString(),price,'long');
  //alert AllSignals
  requestApp.signal.alert("LIVESIGNAL","AllSignals",self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,unix.toString(),price,'long');

}
log.debug('                                                                                                      BUY');
}
/****************************************************************************************************************************/
// Variables + UI App /******************************************************************************************************/
/****************************************************************************************************************************/
    function test4(x){
  if (x % 4 == 0)
  {
    return true;
  }
  else {
    return false;
  }
}

  //Util Var
  var date = new Date(candle.start._d);
  var unix = moment(candle.start._d).unix();
  var formatDate = moment(date).format();
  var paperFormat = moment(date).format('YYYY-MM-DD HH:mm')
  var price = candle.close;

  // export Request Function
  var percent = ((parseInt(new Date(date).getTime()) - parseInt(this.from) ) * 100) / ( parseInt(this.to) - parseInt(this.from) )
  if(this.mode === 'backtest'){
      requestApp.backtest.percent("CPU",this.backtestId,percent)
    //console.log(parseFloat(percent.toFixed()));
  }
  if(this.mode === 'live'){
      var obj = {
       "date" : unix.toString(),
       "price" : candle.close,
       "volume" : candle.volume,
       "trades" : candle.trades,
       "lower" :  myIndicatorOSI.lower,
       "medium" :  myIndicatorOSI.medium,
       "upper" :  myIndicatorOSI.upper,
       "sma10" :  myFrontAppIndicator.SMA10,
       "sma20" :  myFrontAppIndicator.SMA20,
       "sma50" :  myFrontAppIndicator.SMA50,
       "sma100" :  myFrontAppIndicator.SMA100,
       "sma200" :  myFrontAppIndicator.SMA200,
       "ema10" :  myFrontAppIndicator.EMA10,
       "ema20" :  myFrontAppIndicator.EMA20,
       "ema50" :  myFrontAppIndicator.EMA50,
       "ema100" :  myFrontAppIndicator.EMA100,
       "ema200" :  myFrontAppIndicator.EMA200,
     }
     requestApp.live.data("LIVEDATA",this.backtestId,obj)
  }


/****************************************************************************************************************************/
/****************************************************************************************************************************/
/****************************************************************************************************************************/
/****************************************************************************************************************************/
/****************************************************************************************************************************/
/****************************************************************************************************************************/
// Edit your Variables Strategies! /*****************************************************************************************/
/****************************************************************************************************************************/

    //threshold
    // calculate the minimum price in order to sell
    const sellat = 1.01;
    //short
    const stop_loss_pct = 0.90;


  /****************************************************************************************************************************/
  /****************************************************************************************************************************/
  /****************************************************************************************************************************/
  // START STRAGEGIE
    this.triggerIndex++;
    console.log(this.triggerIndex);

    //
    function getPercentageChange(oldNumber, newNumber){
      var decreaseValue = oldNumber - newNumber;
      return (decreaseValue / oldNumber) * 100;
    }
    this.percentBetweenLastCandle = getPercentageChange(this.lastPrice,price)
    this.percentBetweenPriceAndMa = getPercentageChange(myFrontAppIndicator.SMA20,price)
    //console.log('percentBetweenLastCandle :',this.percentBetweenLastCandle);
    //console.log('percentBetweenPriceAndMa :',this.percentBetweenPriceAndMa);

    //cupute last 3 candles
    this.memory3 = this.percentBetweenPriceAndMa
    var totalLastMemory = this.memory1 + this.memory2 + this.memory3
    //console.log(totalLastMemory);

  /****************************************************************************************************************************/
  /****************************************************************************************************************************/
  /****************************************************************************************************************************/
  /****************************************************************************************************************************/

        /// Setting conditions
        if (this.currentTrend === 'long' ) {
            if(this.pallier === 0){
              this.triggerSell = 0
            }
            // Start
            this.pallier++;

            //Signal Pallier


            if (price > this.threshold){
                this.triggerSell = 1;

                this.stop_up = price * sellat;
                this.stop =  this.threshold * stop_loss_pct
                this.threshold = this.stop_up;
                //Log Trades App
                log.debug('makeHttpRequestTrade pallier');
                if(this.mode === 'backtest'){requestApp.backtest.trade("TRADE",this.backtestId,this.triggerIndex,formatDate,price,'pallier')}
                if(this.mode === 'live'){requestApp.live.trade("LIVETRADE",this.backtestId,this.triggerIndex,unix.toString(),price,'pallier')}

                /*
                if( totalLastMemory < -40){
                  sellAction(this);
                }
                */


            }

            /****************************************************************************************************************/
            //Signal SHORT Position !!!
            if(  myFrontAppIndicator.SMA10 < myFrontAppIndicator.SMA50 && price > myFrontAppIndicator.SMA50  ){
              sellAction(this);
            }
            if(  myFrontAppIndicator.SMA10 <  myFrontAppIndicator.SMA50 &&  myFrontAppIndicator.SMA20 <  myFrontAppIndicator.SMA50 &&this.triggerSell === 0 ){
              sellAction(this);
            }
            this.triggerSell = 0
        }
        else if (this.currentTrend === 'short') {
              if(this.compteur === 0){

              }
             //Start
             this.compteur++;
             /***********************************************************/
             //Signal LONG Position !!!
             // #1
             if ( myFrontAppIndicator.SMA10 > myFrontAppIndicator.SMA20 &&  myFrontAppIndicator.SMA20 > myFrontAppIndicator.SMA50 &&  myFrontAppIndicator.SMA50 > myFrontAppIndicator.SMA100){
               //Here to LONG position !
               buyAction(this);
             }



        }

  this.lastPrice = price;
  this.memory1 = this.memory2;
  this.memory2 = this.memory3;
  this.memory3 = 0;
}
module.exports = strat;
