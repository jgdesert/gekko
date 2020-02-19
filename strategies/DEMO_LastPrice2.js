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
     //
     this.price = 0;
     this.unix = 0;
     this.paperFormat = '';
     this.formatDate = '';
     //
     this.sellat = 0;
     this.stop_loss_pct = 0;
     //
     this.threshold = "";
     this.stop = "";
     this.stop_up = "";

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
     this.counterSell = 0
     //buy
     this.counterBuy = 0;

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

    // START STRAGEGIE
    this.triggerIndex++;
    console.log(this.triggerIndex);

    //Util Var
    var date = new Date(candle.start._d);
    this.price = candle.close;
    this.unix = moment(candle.start._d).unix();
    this.paperFormat = moment(date).format('YYYY-MM-DD HH:mm')
    this.formatDate = moment(date).format();

  /****************************************************************************************************************************/
  /****************************************************************************************************************************/
  //Import RequestApp + Indicator/*********************************************************************************************/
    //
    var requestApp = myLibrary.requestFunctionApp(this.URI);
    var requestOrder = myLibrary.requestOrder(this);
    //
    var myIndicatorOSI = myLibrary.addOverlapStudiesIndicator(this.talibIndicators);
    var myIndicatorM = myLibrary.addMomentumIndicator(this.talibIndicators);
    var myIndicatorVolu = myLibrary.addVolumeIndicator(this.talibIndicators);
    var myIndicatorVola = myLibrary.addVolatilityIndicator(this.talibIndicators);
    var myIndicatorPT = myLibrary.addPriceTransformIndicator(this.talibIndicators);
    var myIndicatorC = myLibrary.addCycleIndicator(this.talibIndicators);
    var myFrontAppIndicator = myLibrary.addFrontAppIndicator(this.talibIndicators);

  /****************************************************************************************************************************/
  // Variables + UI App /******************************************************************************************************/
  /****************************************************************************************************************************/
    console.log(this.unix*1000, parseInt(this.to));
    // export Request Function
    var percent = ((parseInt(new Date(date).getTime()) - parseInt(this.from) ) * 100) / ( parseInt(this.to) - parseInt(this.from) )
    if(this.mode === 'backtest'){
      //
      function test50(x){
            if (x % 50 == 0)
            {
              return true;
            }
            else {
              return false;
            }
          }
      if(this.period === '5' && test50(this.triggerIndex)){
        requestApp.backtest.percent("CPU",this.backtestId,percent)
      } else {
        requestApp.backtest.percent("CPU",this.backtestId,percent)
      }
      //
      var calculSeconde = 60 * parseInt(this.period) * 1000
      if(this.unix*1000 === parseInt(this.from) ){requestApp.backtest.trade("TRADE",this.backtestId,this.triggerIndex,this.formatDate,this.price,'start')}
      if(this.unix*1000 === parseInt(this.to)-calculSeconde ){requestApp.backtest.trade("TRADE",this.backtestId,this.triggerIndex,this.formatDate,this.price,'end')}

      //console.log(parseFloat(percent.toFixed()));
    }
    if(this.mode === 'live'){
        var obj = {
         "date" : this.unix.toString(),
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
  // Edit your Variables Strategies! /*****************************************************************************************/
  /****************************************************************************************************************************/


      // calculate the minimum price in order to sell
        //threshold
        this.sellat = 1.01;
        //stop_loss
        //short
        this.stop_loss_pct = 0.90;

  /****************************************************************************************************************************/
  /****************************************************************************************************************************/



      //
      function getPercentageChange(oldNumber, newNumber){
        var decreaseValue = oldNumber - newNumber;
        return (decreaseValue / oldNumber) * 100;
      }
      this.percentBetweenLastCandle = getPercentageChange(this.lastPrice,this.price)
      this.percentBetweenPriceAndMa = getPercentageChange(myFrontAppIndicator.SMA20,this.price)
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
                  //reset
                }
                //start
                this.pallier++;
                /****************************************************************************************************************/
                //SHORT Strat !!!
                console.log(this.pallier);

                if(this.lastPrice < price ){
                  sellAction(this);
                }
            }
            else if (this.currentTrend === 'short') {
                if(this.compteur === 0){
                  //reset
                }

                //start
                this.compteur++;

                /***********************************************************/
                //LONG Strat !!!
                console.log(this.compteur);

                if (this.lastPrice > price){
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
