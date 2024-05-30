(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var s=n(537),i=n.n(s),r=n(645),o=n.n(r)()(i());o.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",s=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),s&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),s&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,s,i,r){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(s)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var u=0;u<e.length;u++){var c=[].concat(e[u]);s&&o[c[0]]||(void 0!==r&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=r),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),i&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=i):c[4]="".concat(i)),t.push(c))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),r="/*# ".concat(i," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",l="month",u="quarter",c="year",d="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},p=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},y={s:p,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+p(s,2,"0")+":"+p(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,l),r=n-i<0,o=t.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:c,w:a,d:o,D:d,h:r,m:i,s,ms:n,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",_={};_[$]=v;var g=function(e){return e instanceof E},b=function e(t,n,s){var i;if(!t)return $;if("string"==typeof t){var r=t.toLowerCase();_[r]&&(i=r),n&&(_[r]=n,i=r);var o=t.split("-");if(!i&&o.length>1)return e(o[0])}else{var a=t.name;_[a]=t,i=a}return!s&&i&&($=i),i||!s&&$},w=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new E(n)},M=y;M.l=b,M.i=g,M.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var E=function(){function v(e){this.$L=b(e.locale,null,!0),this.parse(e)}var p=v.prototype;return p.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(f);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},p.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},p.$utils=function(){return M},p.isValid=function(){return!(this.$d.toString()===h)},p.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},p.isAfter=function(e,t){return w(e)<this.startOf(t)},p.isBefore=function(e,t){return this.endOf(t)<w(e)},p.$g=function(e,t,n){return M.u(e)?this[t]:this.set(n,e)},p.unix=function(){return Math.floor(this.valueOf()/1e3)},p.valueOf=function(){return this.$d.getTime()},p.startOf=function(e,t){var n=this,u=!!M.u(t)||t,h=M.p(e),f=function(e,t){var s=M.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return u?s:s.endOf(o)},m=function(e,t){return M.w(n.toDate()[e].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,p=this.$M,y=this.$D,$="set"+(this.$u?"UTC":"");switch(h){case c:return u?f(1,0):f(31,11);case l:return u?f(1,p):f(0,p+1);case a:var _=this.$locale().weekStart||0,g=(v<_?v+7:v)-_;return f(u?y-g:y+(6-g),p);case o:case d:return m($+"Hours",0);case r:return m($+"Minutes",1);case i:return m($+"Seconds",2);case s:return m($+"Milliseconds",3);default:return this.clone()}},p.endOf=function(e){return this.startOf(e,!1)},p.$set=function(e,t){var a,u=M.p(e),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[d]=h+"Date",a[l]=h+"Month",a[c]=h+"FullYear",a[r]=h+"Hours",a[i]=h+"Minutes",a[s]=h+"Seconds",a[n]=h+"Milliseconds",a)[u],m=u===o?this.$D+(t-this.$W):t;if(u===l||u===c){var v=this.clone().set(d,1);v.$d[f](m),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},p.set=function(e,t){return this.clone().$set(e,t)},p.get=function(e){return this[M.p(e)]()},p.add=function(n,u){var d,h=this;n=Number(n);var f=M.p(u),m=function(e){var t=w(h);return M.w(t.date(t.date()+Math.round(e*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===o)return m(1);if(f===a)return m(7);var v=(d={},d[i]=e,d[r]=t,d[s]=1e3,d)[f]||1,p=this.$d.getTime()+n*v;return M.w(p,this)},p.subtract=function(e,t){return this.add(-1*e,t)},p.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,u=n.months,c=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].slice(0,r)},d=function(e){return M.s(r%12||12,e,"0")},f=n.meridiem||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:c(n.monthsShort,a,u,3),MMMM:c(u,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,l,2),ddd:c(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return s.replace(m,(function(e,t){return t||v[e]||i.replace(":","")}))},p.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},p.diff=function(n,d,h){var f,m=M.p(d),v=w(n),p=(v.utcOffset()-this.utcOffset())*e,y=this-v,$=M.m(this,v);return $=(f={},f[c]=$/12,f[l]=$,f[u]=$/3,f[a]=(y-p)/6048e5,f[o]=(y-p)/864e5,f[r]=y/t,f[i]=y/e,f[s]=y/1e3,f)[m]||y,h?$:M.a($)},p.daysInMonth=function(){return this.endOf(l).$D},p.$locale=function(){return _[this.$L]},p.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=b(e,t,!0);return s&&(n.$L=s),n},p.clone=function(){return M.w(this.$d,this)},p.toDate=function(){return new Date(this.valueOf())},p.toJSON=function(){return this.isValid()?this.toISOString():null},p.toISOString=function(){return this.$d.toISOString()},p.toString=function(){return this.$d.toUTCString()},v}(),C=E.prototype;return w.prototype=C,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",l],["$y",c],["$D",d]].forEach((function(e){C[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,E,w),e.$i=!0),w},w.locale=b,w.isDayjs=g,w.unix=function(e){return w(1e3*e)},w.en=_[$],w.Ls=_,w.p={},w}()},646:function(e){e.exports=function(){"use strict";var e,t,n=1e3,s=6e4,i=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:a,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(e){return e instanceof $},h=function(e,t,n){return new $(e,n,t.$l)},f=function(e){return t.p(e)+"s"},m=function(e){return e<0},v=function(e){return m(e)?Math.ceil(e):Math.floor(e)},p=function(e){return Math.abs(e)},y=function(e,t){return e?m(e)?{negative:!0,format:""+p(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},$=function(){function m(e,t,n){var s=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return h(e*c[f(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){s.$d[f(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var i=e.match(u);if(i){var r=i.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var p=m.prototype;return p.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*c[n]}),0)},p.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=v(e/a),e%=a,this.$d.months=v(e/l),e%=l,this.$d.days=v(e/r),e%=r,this.$d.hours=v(e/i),e%=i,this.$d.minutes=v(e/s),e%=s,this.$d.seconds=v(e/n),e%=n,this.$d.milliseconds=e},p.toISOString=function(){var e=y(this.$d.years,"Y"),t=y(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=y(n,"D"),i=y(this.$d.hours,"H"),r=y(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=y(o,"S"),l=e.negative||t.negative||s.negative||i.negative||r.negative||a.negative,u=i.format||r.format||a.format?"T":"",c=(l?"-":"")+"P"+e.format+t.format+s.format+u+i.format+r.format+a.format;return"P"===c||"-P"===c?"P0D":c},p.toJSON=function(){return this.toISOString()},p.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(e,t){return t||String(s[e])}))},p.as=function(e){return this.$ms/c[f(e)]},p.get=function(e){var t=this.$ms,n=f(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?v(t/c[n]):this.$d[n],0===t?0:t},p.add=function(e,t,n){var s;return s=t?e*c[f(t)]:d(e)?e.$ms:h(e,this).$ms,h(this.$ms+s*(n?-1:1),this)},p.subtract=function(e,t){return this.add(e,t,!0)},p.locale=function(e){var t=this.clone();return t.$l=e,t},p.clone=function(){return h(this.$ms,this)},p.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},p.milliseconds=function(){return this.get("milliseconds")},p.asMilliseconds=function(){return this.as("milliseconds")},p.seconds=function(){return this.get("seconds")},p.asSeconds=function(){return this.as("seconds")},p.minutes=function(){return this.get("minutes")},p.asMinutes=function(){return this.as("minutes")},p.hours=function(){return this.get("hours")},p.asHours=function(){return this.as("hours")},p.days=function(){return this.get("days")},p.asDays=function(){return this.as("days")},p.weeks=function(){return this.get("weeks")},p.asWeeks=function(){return this.as("weeks")},p.months=function(){return this.get("months")},p.asMonths=function(){return this.as("months")},p.years=function(){return this.get("years")},p.asYears=function(){return this.as("years")},m}();return function(n,s,i){e=i,t=i().$utils(),i.duration=function(e,t){var n=i.locale();return h(e,{$l:n},t)},i.isDuration=d;var r=s.prototype.add,o=s.prototype.subtract;s.prototype.add=function(e,t){return d(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)},s.prototype.subtract=function(e,t){return d(e)&&(e=e.asMilliseconds()),o.bind(this)(e,t)}}}()},212:function(e){e.exports=function(){"use strict";return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)}}}()},412:function(e){e.exports=function(){"use strict";return function(e,t){t.prototype.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)}}}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,s=0;s<t.length;s++)if(t[s].identifier===e){n=s;break}return n}function s(e,s){for(var r={},o=[],a=0;a<e.length;a++){var l=e[a],u=s.base?l[0]+s.base:l[0],c=r[u]||0,d="".concat(u," ").concat(c);r[u]=c+1;var h=n(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)t[h].references++,t[h].updater(f);else{var m=i(f,s);s.byIndex=a,t.splice(a,0,{identifier:d,updater:m,references:1})}o.push(d)}return o}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var r=s(e=e||[],i=i||{});return function(e){e=e||[];for(var o=0;o<r.length;o++){var a=n(r[o]);t[a].references--}for(var l=s(e,i),u=0;u<r.length;u++){var c=n(r[u]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var s=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,i&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(s,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={id:s,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";var e=n(484),t=n.n(e),s=n(212),i=n.n(s),r=n(412),o=n.n(r);t().extend(i()),t().extend(o());const a=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],l={EVERYTHING:{name:"everything",emptyMessage:"Click New Event to create your first point",filterMethod:e=>e},FUTURE:{name:"future",emptyMessage:"There are no future events now",filterMethod:e=>e.filter((e=>{return n=e.dateFrom,t()(n).isAfter(t()(),"date");var n}))},PRESENT:{name:"present",emptyMessage:"There are no present events now",filterMethod:e=>e.filter((e=>{return n=e.dateFrom,s=e.dateTo,t()(n).isSameOrBefore(t()(),"date")&&t()(s).isSameOrAfter(t()(),"date");var n,s}))},PAST:{name:"past",emptyMessage:"There are no past events now",filterMethod:e=>e.filter((e=>{return n=e.dateTo,t()(n).isBefore(t()(),"date");var n}))}},u=(e=0,t=1e3)=>{const n=Math.ceil(Math.min(e,t)),s=Math.floor(Math.max(e,t));return Math.floor(Math.random()*(s-n+1)+n)},c=e=>e[u(0,e.length-1)],d=e=>()=>{if(0!==e.length){const t=u(0,e.length-1),n=e[t];return e.splice(t,1),n}},h=e=>t()(e).add(u(0,5e3),"minute").toISOString(),f=["Switch to comfort","Add breakfast","Add luggage","Luggage delivery","Personal guide","Meet service","Rent a car"],m=()=>{const e=d([...f]);return Array.from({length:u(0,f.length)},((t,n)=>((e,t)=>({id:`offer-${e}`,title:t(),price:u()}))(n,e)))},v=(()=>{const e=a.map((e=>({type:e,offers:m()})));return()=>e})(),p=["Amsterdam","Chamonix","Geneva"],y=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],$=(()=>{const e=Array.from({length:p.length},((e,t)=>(e=>{let t="";const n=d([...y]);for(let e=1;e<=u(1,5);e++)t+=`${n()} `;return{id:`destenation-${e}`,description:t.trimEnd(),name:p[e],pictures:Array.from({length:u(0,5)},(()=>({src:`https://loremflickr.com/248/152?random=${u()}`,description:c(y)})))}})(t)));return()=>e})(),_=(()=>{let e;return(t,n)=>(e||(e=Array.from({length:10},((e,s)=>((e,t,n)=>{const s=c(t),i=c(n),r=d([...s.offers]),o=h(),a=h(o);return{id:`event-${e}`,basePrice:u(),dateFrom:o,dateTo:a,destination:i.id,isFavorite:Math.round(Math.random()),offers:Array.from({length:u(0,s.offers.length)},(()=>r().id)),type:s.type}})(s,t,n)))),e)})();var g=n(379),b=n.n(g),w=n(795),M=n.n(w),E=n(569),C=n.n(E),k=n(565),S=n.n(k),A=n(216),D=n.n(A),F=n(589),x=n.n(F),O=n(10),T={};T.styleTagTransform=x(),T.setAttributes=S(),T.insert=C().bind(null,"head"),T.domAPI=M(),T.insertStyleElement=D(),b()(O.Z,T),O.Z&&O.Z.locals&&O.Z.locals;const L="shake";class H{#e=null;constructor(){if(new.target===H)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(L),setTimeout((()=>{this.element.classList.remove(L),e?.()}),600)}}const I="afterbegin";function Y(e,t,n="beforeend"){if(!(e instanceof H))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function B(e,t){if(!(e instanceof H&&t instanceof H))throw new Error("Can replace only components");const n=e.element,s=t.element,i=s.parentElement;if(null===i)throw new Error("Parent element doesn't exist");i.replaceChild(n,s)}function V(e){if(null!==e){if(!(e instanceof H))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}class P extends H{#t=null;#n=null;#s=null;constructor({events:e,destinations:t}){super(),this.#t=e.reduce(((e,t)=>e+t.basePrice),0),this.#n=new Set(Array.from(e,(e=>e.destination))),this.#s=t.filter((e=>this.#n.has(e.id)))}get template(){return e=this.#t,`\n<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">\n      ${this.#s.map(((e,t,n)=>`${e.name}${t===n.length-1?"":" &mdash; "}`)).join("")}\n    </h1>\n\n    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">${e}</span>\n  </p>\n</section>\n`;var e}}const j=e=>e[0].toUpperCase()+e.slice(1);class N extends H{#i=null;#r=null;constructor({currentFilter:e,filteredEvents:t}){super(),this.#i=e.toLowerCase(),this.#r=t}get template(){return e=this.#i,t=this.#r,`\n<form class="trip-filters" action="#" method="get">\n  ${Object.values(l).map((n=>{return`\n  <div class="trip-filters__filter">\n    <input\n      id="filter-${s=n.name}"\n      class="trip-filters__filter-input  visually-hidden"\n      type="radio"\n      name="trip-filter"\n      value="${s}"\n      ${n.name===e?"checked":""}\n      ${0===t[n.name].length?"disabled":""}\n    >\n\n    <label class="trip-filters__filter-label" for="filter-${s}">${j(s)}</label>\n  </div>\n`;var s})).join("")}\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form>\n`;var e,t}}class R extends H{get template(){return'<ul class="trip-events__list"></ul>'}}const q=[{name:"day",default:"checked"},{name:"event",default:"disabled"},{name:"time",default:""},{name:"price",default:""},{name:"offer",default:"disabled"}];class U extends H{get template(){return`\n<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  ${q.map((e=>{return`\n  <div class="trip-sort__item  trip-sort__item--${(t=e).name}">\n    <input id="sort-${t.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${t.name}"${t.default}>\n    <label class="trip-sort__btn" for="sort-${t.name}">${"offer"===t.name?"Offers":t.name}</label>\n  </div>\n`;var t})).join("")}\n</form>\n`}}class W extends H{#i=null;constructor({currentFilter:e}){super(),this.#i=e.toUpperCase()}get template(){return e=this.#i,`<p class="trip-events__msg">${l[e].emptyMessage}</p>`;var e}}var Z=n(646),z=n.n(Z);t().extend(z());const J=e=>({monthDay:t()(e).format("MMM D").toUpperCase(),yearMonthDay:t()(e).format("YYYY-MM-DD"),hourMinute:t()(e).format("HH:mm"),dateHoursMinute:t()(e).format("YY/MM/DD HH:mm"),dateTHoursMinute:t()(e).format("YYYY-MM-DDTHH:mm")});class X extends H{#o=null;#a=null;#l=null;#u=null;#c=null;constructor({event:e,offers:t,destinations:n,onRollupButtonClick:s,onFavoriteButtonClick:i}){super(),this.#o=e,this.#a=t,this.#l=n,this.#u=s,this.#c=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#d),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#h)}get template(){return((e,n,s)=>{const{basePrice:i,dateFrom:r,dateTo:o,destination:a,isFavorite:l,offers:u,type:c}=e,d=J(r),h=J(o),f=l?"event__favorite-btn--active":"",m=s.find((e=>e.id===a)),v=n.find((e=>e.type===c)).offers;return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${d.yearMonthDay}">${d.monthDay}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${c}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${j(c)} ${m.name}</h3>\n\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${d.dateTHoursMinute}">${d.hourMinute}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${h.dateTHoursMinute}">${h.hourMinute}</time>\n          </p>\n          <p class="event__duration">${((e,n)=>{const s=t()(n).diff(t()(e),"minute"),i=t().duration(s,"minutes");return i.days()?i.format("DD[D] HH[H] mm[M]"):i.hours()?i.format("HH[H] mm[M]"):i.format("mm[M]")})(r,o)}</p>\n        </div>\n\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${i}</span>\n        </p>\n\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${p=v,y=u,p.map((e=>y.includes(e.id)?`\n        <li class="event__offer">\n          <span class="event__offer-title">${e.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${e.price}</span>\n        </li>\n      `:"")).join("")}\n        </ul>\n\n        <button class="event__favorite-btn ${f}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var p,y})(this.#o,this.#a,this.#l)}#d=e=>{e.preventDefault(),this.#u()};#h=e=>{e.preventDefault(),this.#c({...this.#o,isFavorite:!this.#o.isFavorite})}}const K={basePrice:0,dateFrom:new Date,dateTo:new Date,destination:null,isFavorite:!1,offers:[],type:"flight"};class G extends H{#o=null;#a=null;#l=null;#f=null;#m=null;constructor({event:e=K,offers:t,destinations:n,onFormSubmit:s,onCancelClick:i}){super(),this.#o=e,this.#a=t,this.#l=n,this.#f=s,this.#m=i,this.element.querySelector("form.event--edit").addEventListener("submit",this.#v),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#p),this.element.querySelector(".event__reset-btn").addEventListener("click",this.#p)}get template(){return((e,t,n)=>{const{id:s,basePrice:i,dateFrom:r,dateTo:o,destination:l,offers:u,type:c}=e,d=J(r),h=J(o),f=n.find((e=>e.id===l)),m=c?t.find((e=>e.type===c)).offers:"";return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        ${((e,t,n,s,i,r,o)=>`\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          ${o?`<img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">`:""}\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n            ${a.map((e=>((e,t)=>`\n  <div class="event__type-item">\n    <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${e===t?"checked":""}>\n    <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${j(e)}</label>\n  </div>\n`)(e,o))).join("")}\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-1">${o?j(o):""}</label>\n        <input\n          class="event__input event__input--destination"\n          id="event-destination-1"\n          type="text" name="event-destination"\n          value="${i?i.name:""}"\n          list="destination-list-1">\n\n        <datalist id="destination-list-1">\n          ${r.map((e=>`<option value="${e.name}"></option>`)).join("")}\n        </datalist>\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-1">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${n}">\n        &mdash;\n        <label class="visually-hidden" for="event-end-time-1">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${s}">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-1">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${t}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">${e?"Cancel":"Delete"}</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n`)(s,i,d.dateHoursMinute,h.dateHoursMinute,f,n,c)}\n        ${m.length>0||f?`\n        <section class="event__details">\n          ${m.length>0?((e,t)=>`\n  <section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n    <div class="event__available-offers">\n    ${e.map((e=>(({id:e,title:t,price:n},s)=>`\n  <div class="event__offer-selector">\n    <input\n      class="event__offer-checkbox visually-hidden"\n      id="${e}"\n      type="checkbox"\n      name="event-offer-${t.toLowerCase().replace(/ /g,"-")}"\n      ${s?"checked":""}>\n\n    <label class="event__offer-label" for="${e}">\n      <span class="event__offer-title">${t}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${n}</span>\n    </label>\n  </div>\n`)(e,t.includes(e.id)))).join("")}\n    </div>\n  </section>\n`)(m,u):""}\n          ${f?(({description:e,pictures:t})=>`\n  <section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">${e}</p>\n\n    ${t.length>0?`\n        <div class="event__photos-container">\n          <div class="event__photos-tape">\n            ${t.map((e=>(({src:e,description:t})=>`\n  <img class="event__photo" src="${e}" alt="${t}"></img>\n`)(e))).join("")}\n          </div>\n        </div>\n        `:""}\n  </section>\n`)(f):""}\n        </section>`:""}\n      </form>\n    </li>`})(this.#o,this.#a,this.#l)}#v=e=>{e.preventDefault(),this.#f({...this.#o})};#p=e=>{e.preventDefault(),this.#m()}}class Q{#y=null;#$=null;#_=null;#g=null;#b=null;#o=null;#w=[];#M=[];#E=!1;constructor({eventsListContainer:e,onEventChange:t,closeAllForms:n}){this.#y=e,this.#$=n,this.#_=t}#C(){const e=this.#g,t=this.#b;this.#g=new X({event:this.#o,offers:this.#M,destinations:this.#w,onRollupButtonClick:this.#k,onFavoriteButtonClick:this.#h}),this.#b=new G({event:this.#o,offers:this.#M,destinations:this.#w,onFormSubmit:this.#v,onCancelClick:this.#k}),null!==e||null!==t?(this.#E||B(this.#g,e),this.#E&&B(this.#b,t),V(e),V(t)):Y(this.#g,this.#y)}#k=()=>{let e,t;this.#E?(e=this.#g,t=this.#b,document.removeEventListener("keydown",this.#S)):(e=this.#b,t=this.#g,this.#$(),document.addEventListener("keydown",this.#S)),this.#E=!this.#E,B(e,t)};#S=e=>{"Escape"===e.key&&(e.preventDefault(),this.#k())};#h=e=>{this.#_(e)};#v=e=>{this.#_(e),this.#k()};init(e,t,n){this.#o=e,this.#M=t??this.#M,this.#w=n??this.#w,this.#C()}closeForm(){this.#E&&this.#k()}destroy(){V(this.#g),V(this.#b),document.removeEventListener("keydown",this.#S)}}const ee=new class{#M=v();#w=$();#A=_(this.#M,this.#w);get offers(){return this.#M}get destinations(){return this.#w}get events(){return this.#A}},te=new class{#D=null;#F=null;#x=null;#O=null;#T=null;#w=[];#A=[];#r={};#i=l.EVERYTHING.name;constructor({tripInfoContainer:e,filtersContainer:t,eventsModel:n}){this.#D=e,this.#F=t,this.#x=n}#L(){this.#O=new P({events:this.#A,destinations:this.#w}),Y(this.#O,this.#D,I)}#H(){Object.values(l).forEach((e=>{this.#r[e.name]=e.filterMethod(this.#A)})),this.#T=new N({currentFilter:this.#i,filteredEvents:this.#r}),Y(this.#T,this.#F)}init(){this.#w=[...this.#x.destinations],this.#A=[...this.#x.events],this.#L(),this.#H()}}({tripInfoContainer:document.querySelector(".trip-main"),filtersContainer:document.querySelector(".trip-controls__filters"),eventsModel:ee}),ne=new class{#I=null;#x=null;#Y=null;#B=new U;#V=new R;#P=new Map;#w=[];#M=[];#A=[];#i=l.EVERYTHING.name;constructor({eventsContainer:e,eventsModel:t}){this.#I=e,this.#x=t}#j(){this.#Y=new W({currentFilter:this.#i}),Y(this.#Y,this.#I)}#N(){Y(this.#B,this.#I,I)}#C(e){const t=new Q({eventsListContainer:this.#V.element,closeAllForms:this.#R,onEventChange:this.#q});this.#P.set(e.id,t),t.init(e,this.#M,this.#w)}#U(){Y(this.#V,this.#I),this.#A.forEach((e=>this.#C(e)))}#W(){this.#P.forEach((e=>e.destroy())),this.#P.clear()}#q=e=>{var t,n;this.#A=(t=this.#A,n=e,t.map((e=>e.id===n.id?n:e))),this.#P.get(e.id).init(e)};#R=()=>{this.#P.forEach((e=>e.closeForm()))};init(){this.#w=[...this.#x.destinations],this.#M=[...this.#x.offers],this.#A=[...this.#x.events],0!==this.#A.length?(this.#N(),this.#U()):this.#j()}}({eventsContainer:document.querySelector(".trip-events"),eventsModel:ee});te.init(),ne.init()})()})();
//# sourceMappingURL=bundle.8ca356c6e0a6e6cde35e.js.map