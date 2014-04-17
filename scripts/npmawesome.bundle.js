(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(){require("./stars");require("../../vendor/shine/shine.js");$(function(){var shine;shine=new Shine($("#logo .name")[0]);shine.light.position.x=window.innerWidth*.5;shine.light.position.y=window.innerHeight*.5;return shine.draw()})}).call(this)},{"../../vendor/shine/shine.js":5,"./stars":2}],2:[function(require,module,exports){(function(){var githubStars,numeral;require("../../vendor/unveil/jquery.unveil");numeral=require("../../vendor/numeral");githubStars=require("../../vendor/github-stars/github-stars").githubStars;$(function(){var stars;stars=$(".github-stars");stars.one("unveil",function(e){var target;target=$(e.target);return githubStars(target.data("githubRepo"),function(stars){target.data("githubStars",stars);return target.html(numeral(stars).format("0a"))})});return stars.unveil()})}).call(this)},{"../../vendor/github-stars/github-stars":3,"../../vendor/numeral":4,"../../vendor/unveil/jquery.unveil":6}],3:[function(require,module,exports){(function(exports){exports.githubStars=function(repo,callback){var xmlhttp=new XMLHttpRequest,url=["https://api.github.com"],useCallback=typeof callback=="function";function countStars(response){if(!(response instanceof Array)){response=[response]}var stars=0;for(var i in response){stars+=parseInt(response[i].stargazers_count)}return stars}repo=repo.split("/");if(repo.length===1){url.push("users",repo[0],"repos")}else{url.push("repos",repo[0],repo[1])}if(useCallback){xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){callback(countStars(JSON.parse(xmlhttp.responseText)))}}}xmlhttp.open("GET",url.join("/"),useCallback);xmlhttp.setRequestHeader("Accept","application/vnd.github.v3+json");xmlhttp.send();if(!useCallback){return countStars(JSON.parse(xmlhttp.responseText))}}})(typeof exports!=="undefined"?exports:window)},{}],4:[function(require,module,exports){(function(){var numeral,VERSION="1.5.2",languages={},currentLanguage="en",zeroFormat=null,defaultFormat="0,0",hasModule=typeof module!=="undefined"&&module.exports;function Numeral(number){this._value=number}function toFixed(value,precision,roundingFunction,optionals){var power=Math.pow(10,precision),optionalsRegExp,output;output=(roundingFunction(value*power)/power).toFixed(precision);if(optionals){optionalsRegExp=new RegExp("0{1,"+optionals+"}$");output=output.replace(optionalsRegExp,"")}return output}function formatNumeral(n,format,roundingFunction){var output;if(format.indexOf("$")>-1){output=formatCurrency(n,format,roundingFunction)}else if(format.indexOf("%")>-1){output=formatPercentage(n,format,roundingFunction)}else if(format.indexOf(":")>-1){output=formatTime(n,format)}else{output=formatNumber(n._value,format,roundingFunction)}return output}function unformatNumeral(n,string){var stringOriginal=string,thousandRegExp,millionRegExp,billionRegExp,trillionRegExp,suffixes=["KB","MB","GB","TB","PB","EB","ZB","YB"],bytesMultiplier=false,power;if(string.indexOf(":")>-1){n._value=unformatTime(string)}else{if(string===zeroFormat){n._value=0}else{if(languages[currentLanguage].delimiters.decimal!=="."){string=string.replace(/\./g,"").replace(languages[currentLanguage].delimiters.decimal,".")}thousandRegExp=new RegExp("[^a-zA-Z]"+languages[currentLanguage].abbreviations.thousand+"(?:\\)|(\\"+languages[currentLanguage].currency.symbol+")?(?:\\))?)?$");millionRegExp=new RegExp("[^a-zA-Z]"+languages[currentLanguage].abbreviations.million+"(?:\\)|(\\"+languages[currentLanguage].currency.symbol+")?(?:\\))?)?$");billionRegExp=new RegExp("[^a-zA-Z]"+languages[currentLanguage].abbreviations.billion+"(?:\\)|(\\"+languages[currentLanguage].currency.symbol+")?(?:\\))?)?$");trillionRegExp=new RegExp("[^a-zA-Z]"+languages[currentLanguage].abbreviations.trillion+"(?:\\)|(\\"+languages[currentLanguage].currency.symbol+")?(?:\\))?)?$");for(power=0;power<=suffixes.length;power++){bytesMultiplier=string.indexOf(suffixes[power])>-1?Math.pow(1024,power+1):false;if(bytesMultiplier){break}}n._value=(bytesMultiplier?bytesMultiplier:1)*(stringOriginal.match(thousandRegExp)?Math.pow(10,3):1)*(stringOriginal.match(millionRegExp)?Math.pow(10,6):1)*(stringOriginal.match(billionRegExp)?Math.pow(10,9):1)*(stringOriginal.match(trillionRegExp)?Math.pow(10,12):1)*(string.indexOf("%")>-1?.01:1)*((string.split("-").length+Math.min(string.split("(").length-1,string.split(")").length-1))%2?1:-1)*Number(string.replace(/[^0-9\.]+/g,""));n._value=bytesMultiplier?Math.ceil(n._value):n._value}}return n._value}function formatCurrency(n,format,roundingFunction){var prependSymbol=format.indexOf("$")<=1?true:false,space="",output;if(format.indexOf(" $")>-1){space=" ";format=format.replace(" $","")}else if(format.indexOf("$ ")>-1){space=" ";format=format.replace("$ ","")}else{format=format.replace("$","")}output=formatNumber(n._value,format,roundingFunction);if(prependSymbol){if(output.indexOf("(")>-1||output.indexOf("-")>-1){output=output.split("");output.splice(1,0,languages[currentLanguage].currency.symbol+space);output=output.join("")}else{output=languages[currentLanguage].currency.symbol+space+output}}else{if(output.indexOf(")")>-1){output=output.split("");output.splice(-1,0,space+languages[currentLanguage].currency.symbol);output=output.join("")}else{output=output+space+languages[currentLanguage].currency.symbol}}return output}function formatPercentage(n,format,roundingFunction){var space="",output,value=n._value*100;if(format.indexOf(" %")>-1){space=" ";format=format.replace(" %","")}else{format=format.replace("%","")}output=formatNumber(value,format,roundingFunction);if(output.indexOf(")")>-1){output=output.split("");output.splice(-1,0,space+"%");output=output.join("")}else{output=output+space+"%"}return output}function formatTime(n){var hours=Math.floor(n._value/60/60),minutes=Math.floor((n._value-hours*60*60)/60),seconds=Math.round(n._value-hours*60*60-minutes*60);return hours+":"+(minutes<10?"0"+minutes:minutes)+":"+(seconds<10?"0"+seconds:seconds)}function unformatTime(string){var timeArray=string.split(":"),seconds=0;if(timeArray.length===3){seconds=seconds+Number(timeArray[0])*60*60;seconds=seconds+Number(timeArray[1])*60;seconds=seconds+Number(timeArray[2])}else if(timeArray.length===2){seconds=seconds+Number(timeArray[0])*60;seconds=seconds+Number(timeArray[1])}return Number(seconds)}function formatNumber(value,format,roundingFunction){var negP=false,signed=false,optDec=false,abbr="",bytes="",ord="",abs=Math.abs(value),suffixes=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],min,max,power,w,precision,thousands,d="",neg=false;if(value===0&&zeroFormat!==null){return zeroFormat}else{if(format.indexOf("(")>-1){negP=true;format=format.slice(1,-1)}else if(format.indexOf("+")>-1){signed=true;format=format.replace(/\+/g,"")}if(format.indexOf("a")>-1){if(format.indexOf(" a")>-1){abbr=" ";format=format.replace(" a","")}else{format=format.replace("a","")}if(abs>=Math.pow(10,12)){abbr=abbr+languages[currentLanguage].abbreviations.trillion;value=value/Math.pow(10,12)}else if(abs<Math.pow(10,12)&&abs>=Math.pow(10,9)){abbr=abbr+languages[currentLanguage].abbreviations.billion;value=value/Math.pow(10,9)}else if(abs<Math.pow(10,9)&&abs>=Math.pow(10,6)){abbr=abbr+languages[currentLanguage].abbreviations.million;value=value/Math.pow(10,6)}else if(abs<Math.pow(10,6)&&abs>=Math.pow(10,3)){abbr=abbr+languages[currentLanguage].abbreviations.thousand;value=value/Math.pow(10,3)}}if(format.indexOf("b")>-1){if(format.indexOf(" b")>-1){bytes=" ";format=format.replace(" b","")}else{format=format.replace("b","")}for(power=0;power<=suffixes.length;power++){min=Math.pow(1024,power);max=Math.pow(1024,power+1);if(value>=min&&value<max){bytes=bytes+suffixes[power];if(min>0){value=value/min}break}}}if(format.indexOf("o")>-1){if(format.indexOf(" o")>-1){ord=" ";format=format.replace(" o","")}else{format=format.replace("o","")}ord=ord+languages[currentLanguage].ordinal(value)}if(format.indexOf("[.]")>-1){optDec=true;format=format.replace("[.]",".")}w=value.toString().split(".")[0];precision=format.split(".")[1];thousands=format.indexOf(",");if(precision){if(precision.indexOf("[")>-1){precision=precision.replace("]","");precision=precision.split("[");d=toFixed(value,precision[0].length+precision[1].length,roundingFunction,precision[1].length)}else{d=toFixed(value,precision.length,roundingFunction)}w=d.split(".")[0];if(d.split(".")[1].length){d=languages[currentLanguage].delimiters.decimal+d.split(".")[1]}else{d=""}if(optDec&&Number(d.slice(1))===0){d=""}}else{w=toFixed(value,null,roundingFunction)}if(w.indexOf("-")>-1){w=w.slice(1);neg=true}if(thousands>-1){w=w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+languages[currentLanguage].delimiters.thousands)}if(format.indexOf(".")===0){w=""}return(negP&&neg?"(":"")+(!negP&&neg?"-":"")+(!neg&&signed?"+":"")+w+d+(ord?ord:"")+(abbr?abbr:"")+(bytes?bytes:"")+(negP&&neg?")":"")}}numeral=function(input){if(numeral.isNumeral(input)){input=input.value()}else if(input===0||typeof input==="undefined"){input=0}else if(!Number(input)){input=numeral.fn.unformat(input)}return new Numeral(Number(input))};numeral.version=VERSION;numeral.isNumeral=function(obj){return obj instanceof Numeral};numeral.language=function(key,values){if(!key){return currentLanguage}if(key&&!values){if(!languages[key]){throw new Error("Unknown language : "+key)}currentLanguage=key}if(values||!languages[key]){loadLanguage(key,values)}return numeral};numeral.languageData=function(key){if(!key){return languages[currentLanguage]}if(!languages[key]){throw new Error("Unknown language : "+key)}return languages[key]};numeral.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(number){var b=number%10;return~~(number%100/10)===1?"th":b===1?"st":b===2?"nd":b===3?"rd":"th"},currency:{symbol:"$"}});numeral.zeroFormat=function(format){zeroFormat=typeof format==="string"?format:null};numeral.defaultFormat=function(format){defaultFormat=typeof format==="string"?format:"0.0"};function loadLanguage(key,values){languages[key]=values}numeral.fn=Numeral.prototype={clone:function(){return numeral(this)},format:function(inputString,roundingFunction){return formatNumeral(this,inputString?inputString:defaultFormat,roundingFunction!==undefined?roundingFunction:Math.round)},unformat:function(inputString){if(Object.prototype.toString.call(inputString)==="[object Number]"){return inputString}return unformatNumeral(this,inputString?inputString:defaultFormat)},value:function(){return this._value},valueOf:function(){return this._value},set:function(value){this._value=Number(value);return this},add:function(value){this._value=this._value+Number(value);return this},subtract:function(value){this._value=this._value-Number(value);return this},multiply:function(value){this._value=this._value*Number(value);return this},divide:function(value){this._value=this._value/Number(value);return this},difference:function(value){var difference=this._value-Number(value);if(difference<0){difference=-difference}return difference}};if(hasModule){module.exports=numeral}if(typeof ender==="undefined"){this["numeral"]=numeral}if(typeof define==="function"&&define.amd){define([],function(){return numeral})}}).call(this)},{}],5:[function(require,module,exports){var global=typeof self!=="undefined"?self:typeof window!=="undefined"?window:{};if(!Function.prototype.bind){Function.prototype.bind=function(oThis){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function(){},fBound=function(){return fToBind.apply(this instanceof fNOP&&oThis?this:oThis,aArgs.concat(Array.prototype.slice.call(arguments)))};fNOP.prototype=this.prototype;fBound.prototype=new fNOP;return fBound}}"use strict";window.performance=window.performance||window.webkitPeformance||window.mozPeformance||{now:function(){return(new Date).getTime()}};"use strict";exports.Color=function(r,g,b){this.r=r||0;this.g=g||0;this.b=b||0};exports.Color.colorFromHex=function(hex){var c=new exports.Color;c.parseHex(hex);return c};exports.Color.prototype.parseHex=function(hex){hex=hex.replace("#","");var color=parseInt(hex,16);this.r=color>>16&255;this.g=color>>8&255;this.b=color&255};exports.Color.prototype.getRGBAString=function(){return"rgba("+Math.round(this.r)+","+Math.round(this.g)+","+Math.round(this.b)+","+" 1.0)"};"use strict";exports.Config=function(optSettings){this.numSteps=5;this.opacity=.15;this.opacityPow=1.2;this.offset=.15;this.offsetPow=1.8;this.blur=40;this.blurPow=1;this.shadowRGB=new exports.Color(0,0,0);this.applyValues(optSettings)};exports.Config.prototype.applyValues=function(settings){if(!settings){return}for(var key in this){if(key in settings){this[key]=settings[key]}}};"use strict";exports.Light=function Light(optPosition){this.position=optPosition||new exports.Point(0,0);this.intensity=1};"use strict";exports.Point=function(x,y){this.x=x||0;this.y=y||0};exports.Point.prototype.delta=function(p){return new exports.Point(p.x-this.x,p.y-this.y)};"use strict";exports.Shadow=function(domElement){this.position=new exports.Point(0,0);this.domElement=domElement;this.shadowProperty="textShadow";this.fnHandleViewportUpdate=null;this.fnHandleWindowLoaded=this.handleWindowLoaded.bind(this);this.enableAutoUpdates();this.handleViewportUpdate();window.addEventListener("load",this.fnHandleWindowLoaded,false)};exports.Shadow.prototype.destroy=function(){window.removeEventListener("load",this.fnHandleWindowLoaded,false);this.disableAutoUpdates();this.fnHandleWindowLoaded=null;this.domElement=null;this.position=null};exports.Shadow.prototype.draw=function(light,config){var delta=this.position.delta(light.position);var distance=Math.sqrt(delta.x*delta.x+delta.y*delta.y);distance=Math.max(32,distance);var shadows=[];for(var i=0;i<config.numSteps;i++){var ratio=i/config.numSteps;var ratioOpacity=Math.pow(ratio,config.opacityPow);var ratioOffset=Math.pow(ratio,config.offsetPow);var ratioBlur=Math.pow(ratio,config.blurPow);var opacity=light.intensity*Math.max(0,config.opacity*(1-ratioOpacity));var offsetX=-config.offset*delta.x*ratioOffset;var offsetY=-config.offset*delta.y*ratioOffset;var blurRadius=distance*config.blur*ratioBlur/512;var shadow=this.getShadow(config.shadowRGB,opacity,offsetX,offsetY,blurRadius);shadows.push(shadow)}this.drawShadows(shadows)};exports.Shadow.prototype.getShadow=function(colorRGB,opacity,offsetX,offsetY,blurRadius){var color="rgba("+colorRGB.r+", "+colorRGB.g+", "+colorRGB.b+", "+opacity+")";return color+" "+offsetX+"px "+offsetY+"px "+Math.round(blurRadius)+"px"};exports.Shadow.prototype.drawShadows=function(shadows){this.domElement.style[this.shadowProperty]=shadows.join(", ")};exports.Shadow.prototype.enableAutoUpdates=function(){this.disableAutoUpdates();var fnHandleViewportUpdate=this.fnHandleViewportUpdate=exports.Timing.debounce(this.handleViewportUpdate,1e3/15,this);document.addEventListener("resize",fnHandleViewportUpdate,false);window.addEventListener("resize",fnHandleViewportUpdate,false);window.addEventListener("scroll",fnHandleViewportUpdate,false)};exports.Shadow.prototype.disableAutoUpdates=function(){var fnHandleViewportUpdate=this.fnHandleViewportUpdate;if(!fnHandleViewportUpdate){return}this.fnHandleViewportUpdate=null;document.removeEventListener("resize",fnHandleViewportUpdate,false);window.removeEventListener("resize",fnHandleViewportUpdate,false);window.removeEventListener("scroll",fnHandleViewportUpdate,false)};exports.Shadow.prototype.handleViewportUpdate=function(){var boundingRect=this.domElement.getBoundingClientRect();this.position.x=boundingRect.left+boundingRect.width*.5;this.position.y=boundingRect.top+boundingRect.height*.5};exports.Shadow.prototype.handleWindowLoaded=function(){this.handleViewportUpdate()};"use strict";exports.Splitter=function(domElement,optClassPrefix){this.domElement=domElement;this.classPrefix=optClassPrefix||"";this.wrapperElement=document.createElement("div");this.maskElement=document.createElement("div");this.wordElements=[];this.elements=[];this.text=""};exports.Splitter.prototype.split=function(optText,preserveChildren){this.text=optText||this.text;this.wordElements.length=0;this.elements.length=0;this.wrapperElement.className=this.classPrefix+"wrapper";this.wrapperElement.innerHTML="";if(optText){this.domElement.textContent=this.text}if(preserveChildren){this.splitChildren(this.domElement,this.maskElement,this.wrapperElement,this.classPrefix)}else{this.splitText(this.domElement,this.maskElement,this.wrapperElement,this.classPrefix)}};exports.Splitter.prototype.splitChildren=function(domElement,maskElement,wrapperElement,classPrefix){var childNodes=domElement.childNodes;for(var i=0;i<childNodes.length;i++){var child=childNodes[i];if(child.nodeType!==1){continue}child.className+=" "+classPrefix+"letter";wrapperElement.appendChild(child);this.elements.push(child)}maskElement.innerHTML=wrapperElement.innerHTML;maskElement.className=classPrefix+"mask";wrapperElement.appendChild(maskElement);domElement.innerHTML="";domElement.appendChild(wrapperElement)};exports.Splitter.prototype.splitText=function(domElement,maskElement,wrapperElement,classPrefix){var text=domElement.textContent;var numLetters=text.length;var wordElement=null;for(var i=0;i<numLetters;i++){var letter=text.charAt(i);if(!wordElement){wordElement=document.createElement("span");wordElement.className=classPrefix+"word";wrapperElement.appendChild(wordElement);this.wordElements.push(wordElement)}if(letter.match(/[\s]/)){var spacerElement=document.createElement("span");spacerElement.className=classPrefix+"spacer";spacerElement.innerHTML=letter;wrapperElement.appendChild(spacerElement);wordElement=null;continue}var letterElement=document.createElement("span");letterElement.innerHTML=letter;letterElement.className=classPrefix+"letter";this.elements.push(letterElement);wordElement.appendChild(letterElement);if(letter.match(/[\W]/)){wordElement=null}}maskElement.innerHTML=wrapperElement.innerHTML;maskElement.className=classPrefix+"mask";wrapperElement.appendChild(maskElement);domElement.innerHTML="";domElement.appendChild(wrapperElement)};"use strict";exports.StyleInjector=function(){this.injections={}};exports.StyleInjector.instance_=null;exports.StyleInjector.getInstance=function(){if(!exports.StyleInjector.instance_){exports.StyleInjector.instance_=new exports.StyleInjector}return exports.StyleInjector.instance_};exports.StyleInjector.prototype.inject=function(css,doc){doc=doc||window.document;if(this.injections[css]===doc){return}var domElement=document.createElement("style");domElement.type="text/css";domElement.innerHTML=css;var firstChild=doc.getElementsByTagName("head")[0].firstChild;doc.getElementsByTagName("head")[0].insertBefore(domElement,firstChild);this.injections[css]=doc;return domElement};"use strict";exports.Timing=function(){};exports.Timing.debounce=function(fnCallback,delay,context){var timeoutId=NaN;return function(){delay=delay||0;context=context||this;var currentArguments=arguments;if(!isNaN(timeoutId)){clearTimeout(timeoutId)}timeoutId=setTimeout(function(){fnCallback.apply(context,currentArguments)},delay)}};exports.Timing.throttle=function(fnCallback,delay,context){var previousTimestamp=NaN;var timeoutId=NaN;return function(){delay=delay||0;context=context||this;var currentTimestamp=window.performance.now();var currentArguments=arguments;if(!isNaN(previousTimestamp)&&currentTimestamp<previousTimestamp+delay){if(!isNaN(timeoutId)){clearTimeout(timeoutId)}timeoutId=setTimeout(function(){previousTimestamp=currentTimestamp;fnCallback.apply(context,currentArguments)},delay)}else{if(!isNaN(timeoutId)){clearTimeout(timeoutId)}previousTimestamp=currentTimestamp;fnCallback.apply(context,currentArguments)}}};"use strict";exports.Shine=function(domElement,optConfig,optClassPrefix,optShadowProperty){if(!domElement){throw new Error("No valid DOM element passed as first parameter")}this.light=new exports.Light;this.config=optConfig||new exports.Config;this.domElement=domElement;this.classPrefix=optClassPrefix||"shine-";this.shadowProperty=optShadowProperty||(this.elememtHasTextOnly(domElement)?"textShadow":"boxShadow");this.shadows=[];this.splitter=new exports.Splitter(domElement,this.classPrefix);this.areAutoUpdatesEnabled=true;this.fnDrawHandler=null;this.updateContent()};exports.Shine.prototype.destroy=function(){this.disableAutoUpdates();for(var i=this.shadows.length-1;i>=0;i--){this.shadows[i].destroy()}this.light=null;this.shadows=null;this.splitter=null;this.fnDrawHandler=null};exports.Shine.prototype.draw=function(){for(var i=this.shadows.length-1;i>=0;i--){this.shadows[i].draw(this.light,this.config)}};exports.Shine.prototype.updateContent=function(optText){var wereAutoUpdatesEnabled=this.areAutoUpdatesEnabled;this.disableAutoUpdates();exports.StyleInjector.getInstance().inject(this.getCSS());this.shadows.length=0;this.splitter.split(optText,!optText&&!this.elememtHasTextOnly(this.domElement));var shadowProperty=this.getPrefixed(this.shadowProperty);for(var j=0;j<this.splitter.elements.length;j++){var element=this.splitter.elements[j];var shadow=new exports.Shadow(element);shadow.shadowProperty=shadowProperty;this.shadows.push(shadow)}if(wereAutoUpdatesEnabled){this.enableAutoUpdates()}this.draw()};exports.Shine.prototype.enableAutoUpdates=function(){this.disableAutoUpdates();this.areAutoUpdatesEnabled=true;var fnDrawHandler=this.fnDrawHandler=this.draw.bind(this);window.addEventListener("scroll",fnDrawHandler,false);window.addEventListener("resize",fnDrawHandler,false);for(var i=this.shadows.length-1;i>=0;i--){var shadow=this.shadows[i];shadow.enableAutoUpdates()}};exports.Shine.prototype.disableAutoUpdates=function(){this.areAutoUpdatesEnabled=false;var fnDrawHandler=this.fnDrawHandler;if(!fnDrawHandler){return}this.fnDrawHandler=null;window.removeEventListener("scroll",fnDrawHandler,false);window.removeEventListener("resize",fnDrawHandler,false);for(var i=this.shadows.length-1;i>=0;i--){var shadow=this.shadows[i];shadow.disableAutoUpdates()}};exports.Shine.prototype.getCSS=function(){return"/* shine.js styles */"+".shine-wrapper {"+" display: inline-block;"+" position: relative;"+" max-width: 100%;"+"}"+""+".shine-word {"+" display: inline-block;"+" white-space: nowrap;"+"}"+""+".shine-letter {"+" position: relative;"+" display: inline-block;"+"}"+""+".shine-mask {"+" position: absolute;"+" top: 0;"+" left: 0;"+" right: 0;"+" bottom: 0;"+"}"};exports.Shine.prototype.getPrefixed=function(property){var element=this.domElement||document.createElement("div");var style=element.style;if(property in style){return property}var prefixes=["webkit","ms","Moz","Webkit","O"];var suffix=property.charAt(0).toUpperCase()+property.substring(1);for(var i=0;i<prefixes.length;i++){var prefixed=prefixes[i]+suffix;if(prefixed in style){return prefixed}}return property};exports.Shine.prototype.elememtHasTextOnly=function(domElement){var childNodes=domElement.childNodes;if(!childNodes||childNodes.length===0){return true}for(var i=0;i<childNodes.length;i++){if(childNodes[i].nodeType!==3){return false}}return true};global.Shine=global.Shine||exports.Shine},{}],6:[function(require,module,exports){(function($){$.fn.unveil=function(threshold,callback){var $w=$(window),th=threshold||0,retina=window.devicePixelRatio>1,attrib=retina?"data-src-retina":"data-src",images=this,loaded;this.one("unveil",function(){var source=this.getAttribute(attrib);source=source||this.getAttribute("data-src");if(source){this.setAttribute("src",source);if(typeof callback==="function")callback.call(this)}});function unveil(){var inview=images.filter(function(){var $e=$(this);if($e.is(":hidden"))return;var wt=$w.scrollTop(),wb=wt+$w.height(),et=$e.offset().top,eb=et+$e.height();return eb>=wt-th&&et<=wb+th});loaded=inview.trigger("unveil");images=images.not(loaded)}$w.scroll(unveil);$w.resize(unveil);unveil();return this}})(window.jQuery||window.Zepto)},{}]},{},[1]);