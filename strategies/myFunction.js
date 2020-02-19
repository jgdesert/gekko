const { readFileSync, writeFileSync, appendFileSync } = require('fs');
var fs = require('fs');
var log = require('../core/log.js');
const request = require("request-promise");

module.exports = {
//SETTINGS
  //input Object Config Indicator
  configIndicator: function() {

      //OverlapStudiesIndicator
      var BBSettings = {
        optInTimePeriod: 20,
        optInNbDevUp: 2,
        optInNbDevDn: 2,
        optInMAType: 2
      }
      var DEMASettings = {
          optInTimePeriod: 20,
      }
      var EMASettings = {
          optInTimePeriod: 20,
      }
      var HT_TRENDLINESettings = {

      }
      var KAMASettings = {
          optInTimePeriod: 30,
      }

      var MIDPOINTSettings = {
          optInTimePeriod: 14,
      }
      var MIDPRICESettings = {
          optInTimePeriod: 14,
      }
      var SAREXTSettings = {
          optInStartValue:0,
          optInOffsetOnReverse:0,
          optInAccelerationInitLong:0,
          optInAccelerationLong:0,
          optInAccelerationMaxLong:0,
          optInAccelerationInitShort:0,
          optInAccelerationShort:0,
          optInAccelerationMaxShort:0,
      }
      var SMASettings = {
          optInTimePeriod: 20,
      }
      var TEMASettings = {
          optInTimePeriod: 20,
      }
      var TRIMASettings = {
          optInTimePeriod: 20,
      }
      var WMASettings = {
          optInTimePeriod: 20,
      }

      //MomentumIndicator
      var ADXSettings = {
        optInTimePeriod: 14,
        forceup:15,
        forcedown:70
      }
      var ADXRSettings = {
          optInTimePeriod: 14,
      }
      var AROONSettings = {
          optInTimePeriod: 14,
      }
      var BOPSettings = {
          optInTimePeriod: 14,
      }
      var CCISettings = {
          optInTimePeriod: 14,
      }
      var CMOSettings = {
          optInTimePeriod: 14,
      }
      var DXSettings = {
          optInTimePeriod: 14,
      }
      var MACDSettings = {
        optInFastPeriod: 12,
        optInSlowPeriod: 26,
        optInSignalPeriod: 9,
      };
      var MFISettings = {
        optInTimePeriod: 14,
      };
      var MINUS_DISettings = {
        optInTimePeriod: 14,
      };
      var MINUS_DMSettings = {
        optInTimePeriod: 14,
      };
      var PPOSettings = {
        optInFastPeriod: 12,
        optInSlowPeriod: 26,
        optInMAType: 0,
        down: 0,
        up: 0
      };
      var ROCSettings = {
        optInTimePeriod: 10,
      };
      var ROCPSettings = {
        optInTimePeriod: 10,
      };
      var ROCRSettings = {
        optInTimePeriod: 10,
      };
      var ROCR100Settings = {
        optInTimePeriod: 10,
      };
      var RSISettings = {
        low: 30,
        high: 70,
        persistence: 1,
        optInTimePeriod: 16,
      };
      var STOCHSettings = {
        optInFastK_Period:5,
        optInSlowK_Period:3,
        optInSlowK_MAType:0,
        optInSlowD_Period:3,
        optInSlowD_MAType:0
      };
      var TRIXSettings = {
        optInTimePeriod: 30,
      };
      var ULTOSCSettings = {
        optInTimePeriod1: 7,
        optInTimePeriod2: 14,
        optInTimePeriod3: 28,
      };
      var WILLRSettings = {
        optInTimePeriod: 14,
      }

      //VolumeIndicator
      var ADSettings = {
        optInTimePeriod: 14,
        down: 0,
        up: 0
      };
      var ADOSCSettings = {
        optInFastPeriod: 50,
        optInSlowPeriod: 10,
        forcedown: 0,
        forceup: 15,
        forcespeed: 0
      };
      var OBVSettings = {
        down: 0,
        up: 0
      };

      //VolatilityIndicator
      var ATRSettings = {
        optInTimePeriod: 14,
      };
      var NATRSettings = {
        optInTimePeriod: 14,
      };
      var TRANGESettings = {
          optInTimePeriod: 14,
      };

      //PriceTransformIndicator
      var AVGPRICESettings = {
        optInTimePeriod: 14,
      };
      var MEDPRICESettings = {
        optInTimePeriod: 14,
      };
      var TYPPRICESettings = {
        optInTimePeriod: 14,
      };
      var WCLPRICESettings = {
        optInTimePeriod: 14,
      };

      //CycleIndicator
      var HT_DCPERIODSettings = {
        optInTimePeriod: 14,
      };
      var HT_DCPHASESettings = {
        optInTimePeriod: 14,
      };
      var HT_PHASORSettings = {
        optInTimePeriod: 14,
      };
      var HT_SINESettings = {
        optInTimePeriod: 14,
      };
      var HT_TRENDMODESettings = {
        optInTimePeriod: 14,
      };

      //Joe
      var MASettings5 = {
          optInTimePeriod: 5,
          optInMAType: 0,
      }
      var MASettings10 = {
          optInTimePeriod: 10,
          optInMAType: 0,
      }
      var MASettings20 = {
          optInTimePeriod: 20,
          optInMAType: 0,
      }
      var MASettings50 = {
          optInTimePeriod: 50,
          optInMAType: 0,
      }
      var MASettings100 = {
          optInTimePeriod: 100,
          optInMAType: 0,
      }
      var MASettings200 = {
          optInTimePeriod: 200,
          optInMAType: 0,
      }
      //SMA
      var SMASettings5 = {
          optInTimePeriod: 5,
      }
      var SMASettings10 = {
          optInTimePeriod: 10,
      }
      var SMASettings20 = {
          optInTimePeriod: 20,
      }
      var SMASettings50 = {
          optInTimePeriod: 50,
      }
      var SMASettings100 = {
          optInTimePeriod: 100,
      }
      var SMASettings200 = {
          optInTimePeriod: 200,
      }
      //EMA
      var EMASettings5 = {
          optInTimePeriod: 5,
      }
      var EMASettings10 = {
          optInTimePeriod: 10,
      }
      var EMASettings20 = {
          optInTimePeriod: 20,
      }
      var EMASettings50 = {
          optInTimePeriod: 50,
      }
      var EMASettings100 = {
          optInTimePeriod: 100,
      }
      var EMASettings200 = {
          optInTimePeriod: 200,
      }

      var BBSettings10 = {
        optInTimePeriod: 10,
        optInNbDevUp: 2,
        optInNbDevDn: 2,
        optInMAType: 2
      }
      var BBSettings20 = {
        optInTimePeriod: 20,
        optInNbDevUp: 2,
        optInNbDevDn: 2,
        optInMAType: 2
      }
      var BBSettings25 = {
        optInTimePeriod: 25,
        optInNbDevUp: 2,
        optInNbDevDn: 2,
        optInMAType: 2
      }
      var BBSettings50 = {
        optInTimePeriod: 50,
        optInNbDevUp: 2,
        optInNbDevDn: 2,
        optInMAType: 2
      }
      var BBSettings100 = {
        optInTimePeriod: 100,
        optInNbDevUp: 2,
        optInNbDevDn: 2,
        optInMAType: 2
      }

      return ({

        BBSettings,DEMASettings,EMASettings,HT_TRENDLINESettings,KAMASettings,
        MIDPOINTSettings,MIDPRICESettings,SAREXTSettings,SMASettings,TEMASettings,TRIMASettings,WMASettings,

        ADXSettings,ADXRSettings,AROONSettings,BOPSettings,CCISettings,CMOSettings,DXSettings,MACDSettings,
        MFISettings,MINUS_DISettings,MINUS_DMSettings,PPOSettings,ROCSettings,ROCPSettings,ROCRSettings,ROCR100Settings,
        RSISettings,STOCHSettings,TRIXSettings,ULTOSCSettings,WILLRSettings,

        ADSettings,ADOSCSettings,OBVSettings,

        ATRSettings,NATRSettings,TRANGESettings,

        AVGPRICESettings,MEDPRICESettings,TYPPRICESettings,WCLPRICESettings,

        HT_DCPERIODSettings,HT_DCPHASESettings,HT_PHASORSettings,HT_SINESettings,HT_TRENDMODESettings,
        //Front app Indicators
        MASettings10,MASettings20,MASettings50,MASettings100,MASettings200,
        SMASettings5,SMASettings10,SMASettings20,SMASettings50,SMASettings100,SMASettings200,
        EMASettings5,EMASettings10,EMASettings20,EMASettings50,EMASettings100,EMASettings200,
        BBSettings10,BBSettings20,BBSettings25,BBSettings50,BBSettings100
      })
  },

/***************************************************************************************/
  //INIT Indicator
  initIndicator: function(addTalibIndicator,IndicatorConfig) {

    //OverlapStudiesIndicator
    addTalibIndicator('mybb', 'bbands', IndicatorConfig.BBSettings);
    addTalibIndicator('mydema', 'dema', IndicatorConfig.DEMASettings);
    addTalibIndicator('myema', 'ema', IndicatorConfig.EMASettings);
    addTalibIndicator('myht_trendline','ht_trendline',IndicatorConfig.HT_TRENDLINESettings);
    addTalibIndicator('mykama','kama',IndicatorConfig.KAMASettings);
    addTalibIndicator('mymidpoint', 'midpoint', IndicatorConfig.MIDPOINTSettings);
    addTalibIndicator('mymidprice', 'midprice', IndicatorConfig.MIDPRICESettings);
    addTalibIndicator('mysarext','sarext',IndicatorConfig.SAREXTSettings);
    addTalibIndicator('mysma','sma',IndicatorConfig.SMASettings);
    addTalibIndicator('mytema','tema',IndicatorConfig.TEMASettings);
    addTalibIndicator('mytrima', 'trima', IndicatorConfig.TRIMASettings);
    addTalibIndicator('mywma', 'wma', IndicatorConfig.WMASettings);

    //MomentumIndicator
    addTalibIndicator('myadx', 'adx', IndicatorConfig.ADXSettings);
    addTalibIndicator('myadxr', 'adxr', IndicatorConfig.ADXRSettings);
    addTalibIndicator('myaroon', 'aroon', IndicatorConfig.AROONSettings);
    addTalibIndicator('mybop', 'bop', IndicatorConfig.BOPSettings);
    addTalibIndicator('mycci', 'cci', IndicatorConfig.CCISettings);
    addTalibIndicator('mycmo', 'cmo', IndicatorConfig.CMOSettings);
    addTalibIndicator('mydx', 'dx', IndicatorConfig.DXSettings);
    addTalibIndicator('mymacd', 'macd', IndicatorConfig.MACDSettings);
    addTalibIndicator('mymfi', 'mfi', IndicatorConfig.MFISettings);
    addTalibIndicator('myminus_di', 'minus_di', IndicatorConfig.MINUS_DISettings);
    addTalibIndicator('myminus_dm', 'minus_dm', IndicatorConfig.MINUS_DMSettings);
    addTalibIndicator('myppo','ppo',IndicatorConfig.PPOSettings);
    addTalibIndicator('myroc','roc',IndicatorConfig.ROCSettings);
    addTalibIndicator('myrocp','rocp',IndicatorConfig.ROCPSettings);
    addTalibIndicator('myrocr','rocr',IndicatorConfig.ROCRSettings);
    addTalibIndicator('myrocr100','rocr100',IndicatorConfig.ROCR100Settings);
    addTalibIndicator('myrsi', 'rsi', IndicatorConfig.RSISettings);
    addTalibIndicator('mystoch','stoch',IndicatorConfig.STOCHSettings);
    addTalibIndicator('mytrix','trix',IndicatorConfig.TRIXSettings);
    addTalibIndicator('myultosc','ultosc',IndicatorConfig.ULTOSCSettings);
    addTalibIndicator('mywillr','willr',IndicatorConfig.WILLRSettings);

    //VolumeIndicator
    addTalibIndicator('myad','ad',IndicatorConfig.ADSettings);
    addTalibIndicator('myadosc','adosc',IndicatorConfig.ADOSCSettings);
    addTalibIndicator('myobv','obv',IndicatorConfig.OBVSettings);

    //VolatilityIndicator
    addTalibIndicator('myatr','atr',IndicatorConfig.ATRSettings);
    addTalibIndicator('mynatr','natr',IndicatorConfig.NATRSettings);
    addTalibIndicator('mytrange','trange',IndicatorConfig.TRANGESettings);

    //PriceTransformIndicator
    addTalibIndicator('myavgprice','avgprice',IndicatorConfig.AVGPRICESettings);
    addTalibIndicator('mymedprice','medprice',IndicatorConfig.MEDPRICESettings);
    addTalibIndicator('mytypprice','typprice',IndicatorConfig.TYPPRICESettings);
    addTalibIndicator('mywclprice','wclprice',IndicatorConfig.WCLPRICESettings);

    //CyclesIndicator
    addTalibIndicator('myht_dcperiod','ht_dcperiod',IndicatorConfig.HT_DCPERIODSettings);
    addTalibIndicator('myht_dcphase','ht_dcphase',IndicatorConfig.HT_DCPHASESettings);
    addTalibIndicator('myht_phasor','ht_phasor',IndicatorConfig.HT_PHASORSettings);
    addTalibIndicator('myht_sine','ht_sine',IndicatorConfig.HT_SINESettings);
    addTalibIndicator('myht_trendmode','ht_trendmode',IndicatorConfig.HT_SINESettings);


    //Front app Indicators
      //sma
      addTalibIndicator('mysma5','sma',IndicatorConfig.SMASettings5);
      addTalibIndicator('mysma10','sma',IndicatorConfig.SMASettings10);
      addTalibIndicator('mysma20','sma',IndicatorConfig.SMASettings20);
      addTalibIndicator('mysma50','sma',IndicatorConfig.SMASettings50);
      addTalibIndicator('mysma100','sma',IndicatorConfig.SMASettings100);
      addTalibIndicator('mysma200','sma',IndicatorConfig.SMASettings200);
      //Ema
      addTalibIndicator('myema5', 'ema', IndicatorConfig.EMASettings5);
      addTalibIndicator('myema10', 'ema', IndicatorConfig.EMASettings10);
      addTalibIndicator('myema20', 'ema', IndicatorConfig.EMASettings20);
      addTalibIndicator('myema50', 'ema', IndicatorConfig.EMASettings50);
      addTalibIndicator('myema100', 'ema', IndicatorConfig.EMASettings100);
      addTalibIndicator('myema200', 'ema', IndicatorConfig.EMASettings200);

      //bb
      addTalibIndicator('mybb10', 'bbands', IndicatorConfig.BBSettings10);
      addTalibIndicator('mybb20', 'bbands', IndicatorConfig.BBSettings20);
      addTalibIndicator('mybb25', 'bbands', IndicatorConfig.BBSettings25);
      addTalibIndicator('mybb50', 'bbands', IndicatorConfig.BBSettings50);
      addTalibIndicator('mybb100', 'bbands', IndicatorConfig.BBSettings100);
  },

/***************************************************************************************/

  addOverlapStudiesIndicator: function(talibIndicators) {
          // your Ta-lib signal!
            var BBand = talibIndicators.mybb.result;
              var lower = BBand['outRealLowerBand'];
              var medium = BBand['outRealMiddleBand'];
              var upper = BBand['outRealUpperBand'];
              var bbanddiff = BBand['outRealUpperBand'] - BBand['outRealLowerBand'];
            var DEMA = talibIndicators.mydema.result.outReal;
            var EMA = talibIndicators.myema.result.outReal;
            var HT_TREND = talibIndicators.myht_trendline.result.outReal;
            var KAMA = talibIndicators.mykama.result.outReal;
            var MID_POINT = talibIndicators.mymidpoint.result.outReal;
            var MID_PRICE = talibIndicators.mymidprice.result.outReal;
            var SAREXT = talibIndicators.mysarext.result.outReal;
            var SMA = talibIndicators.mysma.result.outReal;
            var TEMA = talibIndicators.mytema.result.outReal;
            var TRIMA = talibIndicators.mytrima.result.outReal;
            var WMA = talibIndicators.mywma.result.outReal;
            /*
            log.debug('OverlapStudies Indicator')
            log.debug('')
            log.debug('bbanddiff     :',bbanddiff)
            log.debug('DEMA          :',DEMA)
            log.debug('EMA           :',EMA)
            log.debug('HT_TREND      :',HT_TREND)
            log.debug('KAMA          :',KAMA)
            log.debug('MA            :',MA)
            log.debug('MID_POINT     :',MID_POINT)
            log.debug('MID_PRICE     :',MID_PRICE)
            log.debug('SAREXT        :',SAREXT)
            log.debug('SMA           :',SMA)
            log.debug('TEMA          :',TEMA)
            log.debug('TRIMA         :',TRIMA)
            log.debug('WMA           :',WMA)
            log.debug('')*/

            return ({BBand,lower,medium,upper,bbanddiff,DEMA,EMA,HT_TREND,KAMA,MID_POINT,MID_PRICE,SAREXT,SMA,TEMA,TRIMA,WMA})
    },
  addMomentumIndicator: function(talibIndicators) {
            // your Ta-lib signal!
            var ADX = talibIndicators.myadx.result.outReal;
            var ADXR = talibIndicators.myadxr.result.outReal;
            var AROON = talibIndicators.myaroon.result;
              var AroonDown = AROON['outAroonDown'];
              var AroonUp = AROON['outAroonUp'];
            var BOP = talibIndicators.mybop.result.outReal;
            var CCI = talibIndicators.mycci.result.outReal;
            var CMO = talibIndicators.mycmo.result.outReal;
            var DX = talibIndicators.mydx.result.outReal;
            var MACD = talibIndicators.mymacd.result;
              var macddiff = MACD['outMACD'] - MACD['outMACDSignal'];
            var MFI = talibIndicators.mymfi.result.outReal;
            var MINUS_DI = talibIndicators.myminus_di.result.outReal;
            var MINUS_DM = talibIndicators.myminus_dm.result.outReal;
            var PPO = talibIndicators.myppo.result.outReal;
            var ROC = talibIndicators.myroc.result.outReal;
            var ROCP = talibIndicators.myrocp.result.outReal;
            var ROCR = talibIndicators.myrocr.result.outReal;
            var ROCR100 = talibIndicators.myrocr100.result.outReal;
            var RSI = talibIndicators.myrsi.result.outReal;
            var STOCH = talibIndicators.mystoch.result;
              var StochSlowK = STOCH['outSlowK'];
              var StochSlowD = STOCH['outSlowD'];
            var TRIX = talibIndicators.mytrix.result.outReal;
            var ULTOSC = talibIndicators.myultosc.result.outReal;
            var WILLR = talibIndicators.mywillr.result.outReal;

            /*  log.debug('Momentum  Indicator')
              log.debug('')
              log.debug('ADX        :',ADX)
              log.debug('ADXR       :',ADXR)
              log.debug('AroonDown  :',AroonDown,'    AroonUp     :',AroonUp)
              log.debug('BOP        :',BOP)
              log.debug('CCI        :',CCI)
              log.debug('CMO        :',CMO)
              log.debug('DX         :',DX)
              log.debug('macddiff   :',macddiff)
              log.debug('MFI        :',MFI)
              log.debug('MINUS_DI   :',MINUS_DI)
              log.debug('MINUS_DM   :',MINUS_DM)
              log.debug('PPO        :',PPO)
              log.debug('ROC        :',ROC)
              log.debug('ROCP       :',ROCP)
              log.debug('ROCR       :',ROCR)
              log.debug('ROCR100    :',ROCR100)
              log.debug('RSI        :',RSI)
              log.debug('StochSlowK :',StochSlowK,'    StochSlowD     :',StochSlowD)
              log.debug('TRIX       :',TRIX)
              log.debug('ULTOSC     :',ULTOSC)
              log.debug('WILLR      :',WILLR)
              log.debug('')*/


              return ({ADX,ADXR,AroonDown,AroonUp,BOP,CCI,CMO,DX,macddiff,MFI,MINUS_DI,MINUS_DM,PPO,ROC,ROCP,ROCR,ROCR100,RSI,StochSlowK,StochSlowD,TRIX,ULTOSC,WILLR,})
      },
  addVolumeIndicator: function(talibIndicators) {
            // your Ta-lib signal!
            var AD = talibIndicators.myad.result.outReal;
            var ADOSC = talibIndicators.myadosc.result.outReal;
            var OBV = talibIndicators.myobv.result.outReal;


            /*  log.debug('Volumes  Indicator')
              log.debug('')
              log.debug('AD        :',AD)
              log.debug('ADOSC     :',ADOSC)
              log.debug('OBV       :',OBV)
              log.debug('')*/


              return ({AD,ADOSC,OBV})
      },
  addVolatilityIndicator: function(talibIndicators) {
            // your Ta-lib signal!
            var ATR = talibIndicators.myatr.result.outReal;
            var NATR = talibIndicators.mynatr.result.outReal;
            var TRANGE = talibIndicators.mytrange.result.outReal;

            /*  log.debug('Volatility  Indicator')
              log.debug('')
              log.debug('ATR        :',ATR)
              log.debug('NATR       :',NATR)
              log.debug('TRANGE     :',TRANGE)
              log.debug('')*/


              return ({ATR,NATR,TRANGE})
      },
  addPriceTransformIndicator: function(talibIndicators) {
            // your Ta-lib signal!
            var AVGPRICE = talibIndicators.myavgprice.result.outReal;
            var MEDPRICE = talibIndicators.mymedprice.result.outReal;
            var TYPPRICE = talibIndicators.mytypprice.result.outReal;
            var WCLPRICE = talibIndicators.mywclprice.result.outReal;

              /*log.debug('PriceTransform Indicator')
              log.debug('')
              log.debug('AVGPRICE        :',AVGPRICE)
              log.debug('MEDPRICE        :',MEDPRICE)
              log.debug('TYPPRICE        :',TYPPRICE)
              log.debug('WLCPRICE        :',WCLPRICE)
              log.debug('')*/


              return ({AVGPRICE,MEDPRICE,TYPPRICE,WCLPRICE})
      },
  addCycleIndicator: function(talibIndicators) {
                // your Ta-lib signal!
                var HT_DCPERIOD = talibIndicators.myht_dcperiod.result.outReal;
                var HT_DCPHASE = talibIndicators.myht_dcphase.result.outReal;
                var HT_PHASOR = talibIndicators.myht_phasor.result
                    var HT_PHASOR_InPhase = HT_PHASOR['outInPhase'];
                    var HT_PHASOR_Quadra = HT_PHASOR['outQuadrature'];
                var HT_SINE = talibIndicators.myht_sine.result;
                    var HT_SINE_Out = HT_SINE['outSine'];
                    var HT_SINE_Lead = HT_SINE['outLeadSine'];
                var HT_TRENDMODE = talibIndicators.myht_trendmode.result.outInteger

                  /*log.debug('Cycle Indicator')
                  log.debug('')
                  log.debug('HT_DCPERIOD        :',HT_DCPERIOD)
                  log.debug('HT_DCPHASE         :',HT_DCPHASE)
                  log.debug('HT_PHASOR_InPhase  :',HT_PHASOR_InPhase,'     HT_PHASOR_Quadra        :',HT_PHASOR_Quadra)
                  log.debug('HT_SINE_Out        :',HT_SINE_Out,'     HT_SINE_Lead        :',HT_SINE_Lead)
                  log.debug('HT_TRENDMODE        :',HT_TRENDMODE)
                  log.debug('')*/


                  return ({HT_DCPERIOD,HT_DCPHASE,HT_PHASOR_InPhase,HT_PHASOR_Quadra,HT_SINE_Out,HT_SINE_Lead,HT_TRENDMODE})
          },
  //Front app Indicators
  addFrontAppIndicator: function(talibIndicators,price){

    var SMA5 = talibIndicators.mysma5.result.outReal;
    var SMA10 = talibIndicators.mysma10.result.outReal;
    var SMA20 = talibIndicators.mysma20.result.outReal;
    var SMA50 = talibIndicators.mysma50.result.outReal;
    var SMA100 = talibIndicators.mysma100.result.outReal;
    var SMA200 = talibIndicators.mysma200.result.outReal;

    var EMA5 = talibIndicators.myema5.result.outReal;
    var EMA10 = talibIndicators.myema10.result.outReal;
    var EMA20 = talibIndicators.myema20.result.outReal;
    var EMA50 = talibIndicators.myema50.result.outReal;
    var EMA100 = talibIndicators.myema100.result.outReal;
    var EMA200 = talibIndicators.myema200.result.outReal;

    var BB10 = talibIndicators.mybb10.result;
      var lower10 = BB10['outRealLowerBand'];
      var medium10 = BB10['outRealMiddleBand'];
      var upper10 = BB10['outRealUpperBand'];
      var percentBollinger10 = (price - lower10) / (upper10 - lower10)
    var BB20 = talibIndicators.mybb20.result;
      var lower20 = BB20['outRealLowerBand'];
      var medium20 = BB20['outRealMiddleBand'];
      var upper20 = BB20['outRealUpperBand'];
      var percentBollinger20 = (price - lower20) / (upper20 - lower20)
    var BB25 = talibIndicators.mybb25.result;
      var lower25 = BB25['outRealLowerBand'];
      var medium25 = BB25['outRealMiddleBand'];
      var upper25 = BB25['outRealUpperBand'];
      var percentBollinger25 = (price - lower25) / (upper25 - lower25)
    var BB50 = talibIndicators.mybb50.result;
      var lower50 = BB50['outRealLowerBand'];
      var medium50 = BB50['outRealMiddleBand'];
      var upper50 = BB50['outRealUpperBand'];
      var percentBollinger50 = (price - lower50) / (upper50 - lower50)
    var BB100 = talibIndicators.mybb100.result;
      var lower100 = BB100['outRealLowerBand'];
      var medium100 = BB100['outRealMiddleBand'];
      var upper100 = BB100['outRealUpperBand'];
      var percentBollinger100 = (price - lower100) / (upper100 - lower100)


      return ({
        SMA5,SMA10,SMA20,SMA50,SMA100,SMA200,
        EMA5,EMA10,EMA20,EMA50,EMA100,EMA200,
        lower10,medium10,upper10,percentBollinger10,
        lower20,medium20,upper20,percentBollinger20,
        lower25,medium25,upper25,percentBollinger25,
        lower50,medium50,upper50,percentBollinger50,
        lower100,medium100,upper100,percentBollinger100
      })
  },


/***************************************************************************************/
  //RequestFunction
  requestFunctionApp: function(URI){
    //Master Query
    const queries = {
        CPU: `
            mutation($idBacktest: ID!,$newData: Float!){
              cpu(idBacktest: $idBacktest,newData: $newData) {
                percentage
              }
            }
          `,
        TRADE: `
            mutation TRADE($idBacktest: ID!,$trade: AddTradeInput!) {
              trade(idBacktest: $idBacktest,trade:$trade ) {
                id
                idBacktest
                date
                price
                currentTrend
              }
            }
          `,
        PAPER: `
            mutation PAPER($idBacktest: ID!,$paper: AddPaperInput!) {
              paper(idBacktest: $idBacktest,paper:$paper ) {
                id
                idBacktest
                dateLong
                dateShort
                currentPrixAchat
                currentPrixVente
              }
            }
          `,
        LIVEDATA: `
            mutation LIVEDATA($idLive: ID!, $live: AddLiveDataInput!) {
              liveData(idLive: $idLive, live:$live ) {
                date
                price
                volume
                trades
                lower
                medium
                upper
                sma10
                sma20
                sma50
                sma100
                sma200
                ema10
                ema20
                ema50
                ema100
                ema200
              }
            }
          `,
        LIVETRADE: `
            mutation LIVETRADE($idLive: ID!,$trade: AddTradeInput!) {
              liveTrade(idLive: $idLive,trade:$trade ) {
                id
                date
                price
                currentTrend
              }
            }
          `,
        LIVEPAPER: `
            mutation LIVEPAPER($idLive: ID!,$paper: AddPaperInput!) {
              livePaper(idLive: $idLive,paper:$paper ) {
                id
                dateLong
                dateShort
                currentPrixAchat
                currentPrixVente
              }
            }
          `,
        LIVESIGNAL: `
            mutation LIVESIGNAL($idLive: ID!,$signal: AddSignalInput!) {
              liveSignal(idLive: $idLive,signal:$signal ) {
                id
                strat
                exchange
                currency
                asset
                period
                date
                price
                currentTrend
              }
            }
          `,
      };

    //BACKTEST
      //CPU
      // ((input - min) * 100) / (max - min)
      const makeHttpRequest = async (component,backtestId,percent) => {
        var options = {
          uri: URI,
          method: "POST",
          json: true,
          body: {
            operationName: null,
            variables: {
              "idBacktest":backtestId,
               "newData": parseFloat(percent.toFixed())
             },
            query: queries[component]
          }
        };
        await request(options).then((res) => {
            //console.log(res)
            //console.log(statusCode);
             //console.log(headers.date);
            //return ({body,date: headers.date});
        })
        .catch((e) => {
            console.log(e);
        });;
      };
      const makeHttpRequestTrade = async (component,backtestId,id,date,price,currentTrend) => {
              var options = {
                uri: URI,
                method: "POST",
                json: true,
                body: {
                  operationName: null,
                  variables: {
                    "idBacktest":backtestId,
                    "trade":{
                      "id": id,
                      "idBacktest": backtestId,
                      "date": date,
                      "price": price,
                      "currentTrend": currentTrend
                    },
                   },
                  query: queries[component]
                }
              };
              await request(options).then((res) => {
                  console.log('res : makeHttpRequestTrade');
                  //console.log(res)
              })
              .catch((e) => {
                  console.log(e);
              });;
            };
      const makeHttpRequestPaper = async (component,backtestId,id,dateLong,dateShort,currentPrixAchat,currentPrixVente) => {
                    var options = {
                      uri: URI,
                      method: "POST",
                      json: true,
                      body: {
                        operationName: null,
                        variables: {
                          "idBacktest":backtestId,
                          "paper":{
                            "id": id,
                            "idBacktest": backtestId,
                            "dateLong": dateLong,
                            "dateShort": dateShort,
                            "currentPrixAchat": currentPrixAchat,
                            "currentPrixVente": currentPrixVente,
                          },
                         },
                        query: queries[component]
                      }
                    };
                    await request(options).then((res) => {
                        console.log("res : makeHttpRequestPaper");
                        //console.log(res)
                    })
                    .catch((e) => {
                        console.log(e);
                    });;
                  };

    //LIVE
      const makeHttpRequestLiveData = async (component,backtestId,obj) => {
                    var options = {
                      uri: URI,
                      method: "POST",
                      json: true,
                      body: {
                        operationName: null,
                        variables: {
                          "idLive": backtestId,
                          "live":{
                            "date" : obj.date,
                            "price" : obj.price,
                            "volume": obj.volume,
                            "trades": obj.trades,
                            "lower" : obj.lower,
                            "medium": obj.medium,
                            "upper" : obj.upper,
                            //sma
                            "sma10" : obj.sma10,
                            "sma20" : obj.sma20,
                            "sma50" : obj.sma50,
                            "sma100": obj.sma100,
                            "sma200": obj.sma200,
                            //EMA
                            "ema10" :  obj.ema10,
                            "ema20" :  obj.ema20,
                            "ema50" :  obj.ema50,
                            "ema100":  obj.ema100,
                            "ema200":  obj.ema200
                          },
                         },
                        query: queries[component]
                      }
                    };
                    await request(options).then((res) => {
                       console.log('res : makeHttpRequestLiveData');
                        //console.log(res)
                    })
                    .catch((e) => {
                        console.log('error : makeHttpRequestLiveData');
                        console.log(e);
                    });;
                  };
      const makeHttpRequestLiveTrade = async (component,backtestId,id,date,price,currentTrend,) => {
              var options = {
                uri: URI,
                method: "POST",
                json: true,
                body: {
                  operationName: null,
                  variables: {
                    "idLive":backtestId,
                    "trade":{
                      "id": id,
                      "date": date,
                      "price": price,
                      "currentTrend": currentTrend
                    },
                   },
                  query: queries[component]
                }
              };
              await request(options).then((res) => {
                  console.log('res : makeHttpRequestLiveTrade');
                  //console.log(res)
              })
              .catch((e) => {
                  console.log('error : makeHttpRequestLiveTrade');
                  console.log(e);
              });;
            };
      const makeHttpRequestLivePaper = async (component,backtestId,id,dateLong,dateShort,currentPrixAchat,currentPrixVente) => {
                    var options = {
                      uri: URI,
                      method: "POST",
                      json: true,
                      body: {
                        operationName: null,
                        variables: {
                          "idLive":backtestId,
                          "paper":{
                            "id": id,
                            "dateLong": dateLong,
                            "dateShort": dateShort,
                            "currentPrixAchat": currentPrixAchat,
                            "currentPrixVente": currentPrixVente,
                          },
                         },
                        query: queries[component]
                      }
                    };
                    await request(options).then((res) => {
                        console.log('res : makeHttpRequestLivePaper');
                        //console.log(res)
                    })
                    .catch((e) => {
                        console.log('error : makeHttpRequestLivePaper');
                        console.log(e);
                    });;
                  };

    //SIGNAL
      const makeHttpRequestLiveSignal = async (component,idLive,backtestId,id,strat,exchange,currency,asset,period,date,price,currentTrend) => {
                        var options = {
                          uri: URI,
                          method: "POST",
                          json: true,
                          body: {
                            operationName: null,
                            variables: {
                              "idLive": idLive,
                              "signal":{
                                "id": id,
                                "link":backtestId,
                                "strat": strat,
                                "exchange":exchange,
                                "currency":currency,
                                "asset":asset,
                                "period":period,
                                "date": date,
                                "price": price,
                                "currentTrend": currentTrend
                              },
                             },
                            query: queries[component]
                          }
                        };
                        await request(options).then((res) => {
                            console.log('res : makeHttpRequestLiveSignal');
                            //console.log(res)
                        })
                        .catch((e) => {
                            console.log('error : makeHttpRequestLiveSignal');
                            console.log(e);
                        });;
    };

    return {
      backtest: { percent:makeHttpRequest,trade:makeHttpRequestTrade,paper:makeHttpRequestPaper },
      live:{ data:makeHttpRequestLiveData,trade:makeHttpRequestLiveTrade,paper:makeHttpRequestLivePaper },
      signal: {alert:makeHttpRequestLiveSignal }
    }
  },
  requestOrder: function(self,requestApp){

    const sell = function sellAction(self,requestApp){
      self.threshold = "";
      self.stop = "";
      self.stop_up = ""


     self.advice('short');
     self.counterSell = 0
     self.currentTrend = 'short';
     //log SELL
     log.debug('                                                                                                     SELL');
     //
     if(self.mode === 'backtest' && self.unix*1000 > parseInt(self.from) ){requestApp.backtest.trade("TRADE",self.backtestId,self.triggerIndex,self.formatDate,self.price,'short')}
     if(self.mode === 'live'){requestApp.live.trade("LIVETRADE",self.backtestId,self.triggerIndex,self.unix.toString(),self.price,'short')}
     /****************************************************************************************************************/
     //PAPER TRADER
     self.currentPrixVente = self.price;
     self.dateShort = self.paperFormat;
     if(self.mode === 'backtest' && self.unix*1000 > parseInt(self.from) ){
       requestApp.backtest.paper("PAPER",self.backtestId,self.triggerFirstTrade,self.dateLong,self.dateShort,self.currentPrixAchat,self.currentPrixVente);
     };
     if(self.mode === 'live'){
       requestApp.live.paper("LIVEPAPER",self.backtestId,self.triggerFirstTrade,self.dateLong,self.dateShort,self.currentPrixAchat,self.currentPrixVente);
       //alert + record Db Mongo
       requestApp.signal.alert("LIVESIGNAL",self.backtestId,self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,self.unix.toString(),self.price,'short');
       //alert AllSignals
       requestApp.signal.alert("LIVESIGNAL","AllSignals",self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,self.unix.toString(),self.price,'short');
    };
  }
    const buy = function buyAction(self,requestApp){
      //
      self.currentPrixAchat = self.price;
      self.triggerFirstTrade++;
      self.dateLong = self.paperFormat;
      //New Objectif
      self.threshold = self.currentPrixAchat * self.sellat;
      self.stop = self.currentPrixAchat * self.stop_loss_pct;
      self.stop_up = self.threshold;


      /******************************************************************************************************************************************************/
      self.advice('long');
      self.counterBuy = 0
      self.currentTrend = 'long';
      //log BUY
      log.debug('                                                                                                      BUY');
      //
      if(self.mode === 'backtest' && self.unix*1000 > parseInt(self.from) ){requestApp.backtest.trade("TRADE",self.backtestId,self.triggerIndex,self.formatDate,self.price,'long')}
      if(self.mode === 'live'){
        requestApp.live.trade("LIVETRADE",self.backtestId,self.triggerIndex,self.unix.toString(),self.price,'long');
        //alert + record Db Mongo
        requestApp.signal.alert("LIVESIGNAL",self.backtestId,self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,self.unix.toString(),self.price,'long');
        //alert AllSignals
        requestApp.signal.alert("LIVESIGNAL",self.backtestId,self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,self.unix.toString(),self.price,'long');
        requestApp.signal.alert("LIVESIGNAL","AllSignals",self.backtestId,self.triggerIndex,self.strat,self.exchange,self.currency,self.asset,self.period,self.unix.toString(),self.price,'long');

      }
  }

  return {sell,buy}
  }
};
