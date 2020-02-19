var log = require('../core/log.js');
var moment  = require('moment')
var fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const logger = require('node-color-log');
var myLibrary = require("./myFunction.js");
// Let's create our own strategy
var strat = {};

var IndicatorConfig = myLibrary.configIndicator();

// Prepare everything our strat needs
strat.init = function(candle) {
  //init all Indicator
   myLibrary.initIndicator(this.addTalibIndicator,IndicatorConfig);

   this.exchange = "bitfinex";
   this.currency = "USD";
   this.asset = "BTC";
   this.period = "5";
}

// What happens on every new candle?
strat.update = function(candle){

    var date = new Date(candle.start._d);
    var time = date.getTime()
    var unix = moment(candle.start._d).unix();

    var collectionName = `${this.exchange}_${this.currency}_${this.asset}_${this.period}`;

    /*
    logger.log(`\tLIVE :`).joint().color('yellow').bold().log(collectionName);
    logger.log(`\tDATE : `).joint().color('yellow').bold().log(date);
    logger.log(`\tTIME : `).joint().color('yellow').bold().log(time);
    logger.log(`\tUNIX : `).joint().color('yellow').bold().log(unix);
    */
    var Url = "mongodb://127.0.0.1:27017/meteor?retryWrites=true"

    async function flyPush(objToExport,url,collectionName) {
      const dbName = 'meteor';
      const client = await MongoClient.connect(url, function(err, client) {
          assert.equal(null, err);
          //console.log("Connected successfully to server");
              const db = client.db(dbName);
              // Get the documents collection
              const collection = db.collection(collectionName);

              try {
                    collection.insertOne(objToExport, function(err, result) {
                      assert.equal(err, null);
                      console.log(`Update ${moment(objToExport.date).format('YYYY-MM-DD HH:mm:ss')} in ${collectionName}  Collection `);
                      client.close();
                    });

                } catch (e) {
                   print (e);
                }
        });
}

/****************************************************************************************************************************/
var myIndicatorOSI = myLibrary.addOverlapStudiesIndicator(this.talibIndicators);
var myIndicatorM = myLibrary.addMomentumIndicator(this.talibIndicators);
var myIndicatorVolu = myLibrary.addVolumeIndicator(this.talibIndicators);
var myIndicatorVola = myLibrary.addVolatilityIndicator(this.talibIndicators);
var myIndicatorPT = myLibrary.addPriceTransformIndicator(this.talibIndicators);
var myIndicatorC = myLibrary.addCycleIndicator(this.talibIndicators);
var myFrontAppIndicator = myLibrary.addFrontAppIndicator(this.talibIndicators)
/****************************************************************************************************************************/
    var lower10 = myFrontAppIndicator.BB10['outRealLowerBand'];
    var medium10 = myFrontAppIndicator.BB10['outRealMiddleBand'];
    var upper10 = myFrontAppIndicator.BB10['outRealUpperBand'];
    var percentBollinger10 = (candle.close - lower10) / (upper10 - lower10)
    //
    var lower20 = myFrontAppIndicator.BB20['outRealLowerBand'];
    var medium20 = myFrontAppIndicator.BB20['outRealMiddleBand'];
    var upper20 = myFrontAppIndicator.BB20['outRealUpperBand'];
    var percentBollinger20 = (candle.close - lower20) / (upper20 - lower20)
    //
    var lower25 = myFrontAppIndicator.BB25['outRealLowerBand'];
    var medium25 = myFrontAppIndicator.BB25['outRealMiddleBand'];
    var upper25 = myFrontAppIndicator.BB25['outRealUpperBand'];
    var percentBollinger25 = (candle.close - lower25) / (upper25 - lower25)
    //
    var lower50 = myFrontAppIndicator.BB50['outRealLowerBand'];
    var medium50 = myFrontAppIndicator.BB50['outRealMiddleBand'];
    var upper50 = myFrontAppIndicator.BB50['outRealUpperBand'];
    var percentBollinger50 = (candle.close - lower50) / (upper50 - lower50)
    //
    var lower100 = myFrontAppIndicator.BB100['outRealLowerBand'];
    var medium100 = myFrontAppIndicator.BB100['outRealMiddleBand'];
    var upper100 = myFrontAppIndicator.BB100['outRealUpperBand'];
    var percentBollinger100 = (candle.close - lower100) / (upper100 - lower100)

    //push
    var objToExport = {}
    if(this.period === "5" || this.period === "60" || this.period === "1440" ){
         objToExport = {
          "date" : time,
          "price" : candle.close,
          "volume" : candle.volume,
          "trades" : candle.trades,
          "lower" :  myIndicatorOSI.lower,
          "medium" :  myIndicatorOSI.medium,
          "upper" :  myIndicatorOSI.upper,
          //sma
          "sma10" :  myFrontAppIndicator.SMA10,
          "sma20" :  myFrontAppIndicator.SMA20,
          "sma50" :  myFrontAppIndicator.SMA50,
          "sma100" :  myFrontAppIndicator.SMA100,
          "sma200" :  myFrontAppIndicator.SMA200,
          //EMA
          "ema10" :  myFrontAppIndicator.EMA10,
          "ema20" :  myFrontAppIndicator.EMA20,
          "ema50" :  myFrontAppIndicator.EMA50,
          "ema100" :  myFrontAppIndicator.EMA100,
          "ema200" :  myFrontAppIndicator.EMA200,
          //BB
          "pBBP10": percentBollinger10,
          "pBBP20": percentBollinger20,
          "pBBP25": percentBollinger25,
          "pBBP50": percentBollinger50,
          "pBBP100": percentBollinger100,
        }
         flyPush(objToExport,Url,collectionName)


    }
    if(this.period === "10080"){
         objToExport = {
          "date" : time,
          "price" : candle.close,
          "volume" : candle.volume,
          "trades" : candle.trades,
          "lower" :  myIndicatorOSI.lower,
          "medium" :  myIndicatorOSI.medium,
          "upper" :  myIndicatorOSI.upper,
          //sma
          "sma5" :  myFrontAppIndicator.SMA5,
          "sma10" :  myFrontAppIndicator.SMA10,
          "sma20" :  myFrontAppIndicator.SMA20,
          "sma50" :  myFrontAppIndicator.SMA50,
          //EMA
          "ema5" :  myFrontAppIndicator.EMA5,
          "ema10" :  myFrontAppIndicator.EMA10,
          "ema20" :  myFrontAppIndicator.EMA20,
          "ema50" :  myFrontAppIndicator.EMA50,
          //BB
          "pBBP10": percentBollinger10,
          "pBBP20": percentBollinger20,
          "pBBP25": percentBollinger25,
          "pBBP50": percentBollinger50,
          "pBBP100": percentBollinger100,
        }
        flyPush(objToExport,Url,collectionName)


    }
    console.log('Date :',moment(time).format('YYYY-MM-DD'),'Price :',candle.close )

}


// For debugging purposes.
strat.log = function(candle) {
}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function(candle) {



}
module.exports = strat;




