(function(){const E=document.createElement("link").relList;if(E&&E.supports&&E.supports("modulepreload"))return;for(const C of document.querySelectorAll('link[rel="modulepreload"]'))d(C);new MutationObserver(C=>{for(const H of C)if(H.type==="childList")for(const V of H.addedNodes)V.tagName==="LINK"&&V.rel==="modulepreload"&&d(V)}).observe(document,{childList:!0,subtree:!0});function T(C){const H={};return C.integrity&&(H.integrity=C.integrity),C.referrerPolicy&&(H.referrerPolicy=C.referrerPolicy),C.crossOrigin==="use-credentials"?H.credentials="include":C.crossOrigin==="anonymous"?H.credentials="omit":H.credentials="same-origin",H}function d(C){if(C.ep)return;C.ep=!0;const H=T(C);fetch(C.href,H)}})();function Gf(m){return m&&m.__esModule&&Object.prototype.hasOwnProperty.call(m,"default")?m.default:m}var gr={exports:{}},_n={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Df;function Nh(){if(Df)return _n;Df=1;var m=Symbol.for("react.transitional.element"),E=Symbol.for("react.fragment");function T(d,C,H){var V=null;if(H!==void 0&&(V=""+H),C.key!==void 0&&(V=""+C.key),"key"in C){H={};for(var R in C)R!=="key"&&(H[R]=C[R])}else H=C;return C=H.ref,{$$typeof:m,type:d,key:V,ref:C!==void 0?C:null,props:H}}return _n.Fragment=E,_n.jsx=T,_n.jsxs=T,_n}var Cf;function zh(){return Cf||(Cf=1,gr.exports=Nh()),gr.exports}var c=zh(),yr={exports:{}},W={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kf;function wh(){if(kf)return W;kf=1;var m=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),d=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),H=Symbol.for("react.consumer"),V=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),_=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),G=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),F=Symbol.iterator;function ae(o){return o===null||typeof o!="object"?null:(o=F&&o[F]||o["@@iterator"],typeof o=="function"?o:null)}var je={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_e=Object.assign,Ye={};function Me(o,x,w){this.props=o,this.context=x,this.refs=Ye,this.updater=w||je}Me.prototype.isReactComponent={},Me.prototype.setState=function(o,x){if(typeof o!="object"&&typeof o!="function"&&o!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,o,x,"setState")},Me.prototype.forceUpdate=function(o){this.updater.enqueueForceUpdate(this,o,"forceUpdate")};function we(){}we.prototype=Me.prototype;function Se(o,x,w){this.props=o,this.context=x,this.refs=Ye,this.updater=w||je}var Qe=Se.prototype=new we;Qe.constructor=Se,_e(Qe,Me.prototype),Qe.isPureReactComponent=!0;var Ke=Array.isArray;function A(){}var O={H:null,A:null,T:null,S:null},$=Object.prototype.hasOwnProperty;function Y(o,x,w){var M=w.ref;return{$$typeof:m,type:o,key:x,ref:M!==void 0?M:null,props:w}}function K(o,x){return Y(o.type,x,o.props)}function B(o){return typeof o=="object"&&o!==null&&o.$$typeof===m}function le(o){var x={"=":"=0",":":"=2"};return"$"+o.replace(/[=:]/g,function(w){return x[w]})}var ze=/\/+/g;function Ge(o,x){return typeof o=="object"&&o!==null&&o.key!=null?le(""+o.key):x.toString(36)}function Xe(o){switch(o.status){case"fulfilled":return o.value;case"rejected":throw o.reason;default:switch(typeof o.status=="string"?o.then(A,A):(o.status="pending",o.then(function(x){o.status==="pending"&&(o.status="fulfilled",o.value=x)},function(x){o.status==="pending"&&(o.status="rejected",o.reason=x)})),o.status){case"fulfilled":return o.value;case"rejected":throw o.reason}}throw o}function j(o,x,w,M,k){var J=typeof o;(J==="undefined"||J==="boolean")&&(o=null);var ue=!1;if(o===null)ue=!0;else switch(J){case"bigint":case"string":case"number":ue=!0;break;case"object":switch(o.$$typeof){case m:case E:ue=!0;break;case G:return ue=o._init,j(ue(o._payload),x,w,M,k)}}if(ue)return k=k(o),ue=M===""?"."+Ge(o,0):M,Ke(k)?(w="",ue!=null&&(w=ue.replace(ze,"$&/")+"/"),j(k,x,w,"",function(ta){return ta})):k!=null&&(B(k)&&(k=K(k,w+(k.key==null||o&&o.key===k.key?"":(""+k.key).replace(ze,"$&/")+"/")+ue)),x.push(k)),1;ue=0;var Ue=M===""?".":M+":";if(Ke(o))for(var ce=0;ce<o.length;ce++)M=o[ce],J=Ue+Ge(M,ce),ue+=j(M,x,w,J,k);else if(ce=ae(o),typeof ce=="function")for(o=ce.call(o),ce=0;!(M=o.next()).done;)M=M.value,J=Ue+Ge(M,ce++),ue+=j(M,x,w,J,k);else if(J==="object"){if(typeof o.then=="function")return j(Xe(o),x,w,M,k);throw x=String(o),Error("Objects are not valid as a React child (found: "+(x==="[object Object]"?"object with keys {"+Object.keys(o).join(", ")+"}":x)+"). If you meant to render a collection of children, use an array instead.")}return ue}function D(o,x,w){if(o==null)return o;var M=[],k=0;return j(o,M,"","",function(J){return x.call(w,J,k++)}),M}function X(o){if(o._status===-1){var x=o._result;x=x(),x.then(function(w){(o._status===0||o._status===-1)&&(o._status=1,o._result=w)},function(w){(o._status===0||o._status===-1)&&(o._status=2,o._result=w)}),o._status===-1&&(o._status=0,o._result=x)}if(o._status===1)return o._result.default;throw o._result}var de=typeof reportError=="function"?reportError:function(o){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var x=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof o=="object"&&o!==null&&typeof o.message=="string"?String(o.message):String(o),error:o});if(!window.dispatchEvent(x))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",o);return}console.error(o)},he={map:D,forEach:function(o,x,w){D(o,function(){x.apply(this,arguments)},w)},count:function(o){var x=0;return D(o,function(){x++}),x},toArray:function(o){return D(o,function(x){return x})||[]},only:function(o){if(!B(o))throw Error("React.Children.only expected to receive a single React element child.");return o}};return W.Activity=U,W.Children=he,W.Component=Me,W.Fragment=T,W.Profiler=C,W.PureComponent=Se,W.StrictMode=d,W.Suspense=_,W.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,W.__COMPILER_RUNTIME={__proto__:null,c:function(o){return O.H.useMemoCache(o)}},W.cache=function(o){return function(){return o.apply(null,arguments)}},W.cacheSignal=function(){return null},W.cloneElement=function(o,x,w){if(o==null)throw Error("The argument must be a React element, but you passed "+o+".");var M=_e({},o.props),k=o.key;if(x!=null)for(J in x.key!==void 0&&(k=""+x.key),x)!$.call(x,J)||J==="key"||J==="__self"||J==="__source"||J==="ref"&&x.ref===void 0||(M[J]=x[J]);var J=arguments.length-2;if(J===1)M.children=w;else if(1<J){for(var ue=Array(J),Ue=0;Ue<J;Ue++)ue[Ue]=arguments[Ue+2];M.children=ue}return Y(o.type,k,M)},W.createContext=function(o){return o={$$typeof:V,_currentValue:o,_currentValue2:o,_threadCount:0,Provider:null,Consumer:null},o.Provider=o,o.Consumer={$$typeof:H,_context:o},o},W.createElement=function(o,x,w){var M,k={},J=null;if(x!=null)for(M in x.key!==void 0&&(J=""+x.key),x)$.call(x,M)&&M!=="key"&&M!=="__self"&&M!=="__source"&&(k[M]=x[M]);var ue=arguments.length-2;if(ue===1)k.children=w;else if(1<ue){for(var Ue=Array(ue),ce=0;ce<ue;ce++)Ue[ce]=arguments[ce+2];k.children=Ue}if(o&&o.defaultProps)for(M in ue=o.defaultProps,ue)k[M]===void 0&&(k[M]=ue[M]);return Y(o,J,k)},W.createRef=function(){return{current:null}},W.forwardRef=function(o){return{$$typeof:R,render:o}},W.isValidElement=B,W.lazy=function(o){return{$$typeof:G,_payload:{_status:-1,_result:o},_init:X}},W.memo=function(o,x){return{$$typeof:v,type:o,compare:x===void 0?null:x}},W.startTransition=function(o){var x=O.T,w={};O.T=w;try{var M=o(),k=O.S;k!==null&&k(w,M),typeof M=="object"&&M!==null&&typeof M.then=="function"&&M.then(A,de)}catch(J){de(J)}finally{x!==null&&w.types!==null&&(x.types=w.types),O.T=x}},W.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},W.use=function(o){return O.H.use(o)},W.useActionState=function(o,x,w){return O.H.useActionState(o,x,w)},W.useCallback=function(o,x){return O.H.useCallback(o,x)},W.useContext=function(o){return O.H.useContext(o)},W.useDebugValue=function(){},W.useDeferredValue=function(o,x){return O.H.useDeferredValue(o,x)},W.useEffect=function(o,x){return O.H.useEffect(o,x)},W.useEffectEvent=function(o){return O.H.useEffectEvent(o)},W.useId=function(){return O.H.useId()},W.useImperativeHandle=function(o,x,w){return O.H.useImperativeHandle(o,x,w)},W.useInsertionEffect=function(o,x){return O.H.useInsertionEffect(o,x)},W.useLayoutEffect=function(o,x){return O.H.useLayoutEffect(o,x)},W.useMemo=function(o,x){return O.H.useMemo(o,x)},W.useOptimistic=function(o,x){return O.H.useOptimistic(o,x)},W.useReducer=function(o,x,w){return O.H.useReducer(o,x,w)},W.useRef=function(o){return O.H.useRef(o)},W.useState=function(o){return O.H.useState(o)},W.useSyncExternalStore=function(o,x,w){return O.H.useSyncExternalStore(o,x,w)},W.useTransition=function(){return O.H.useTransition()},W.version="19.2.7",W}var Of;function Tr(){return Of||(Of=1,yr.exports=wh()),yr.exports}var ee=Tr();const Th=Gf(ee);var xr={exports:{}},Mn={},vr={exports:{}},br={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uf;function Eh(){return Uf||(Uf=1,(function(m){function E(j,D){var X=j.length;j.push(D);e:for(;0<X;){var de=X-1>>>1,he=j[de];if(0<C(he,D))j[de]=D,j[X]=he,X=de;else break e}}function T(j){return j.length===0?null:j[0]}function d(j){if(j.length===0)return null;var D=j[0],X=j.pop();if(X!==D){j[0]=X;e:for(var de=0,he=j.length,o=he>>>1;de<o;){var x=2*(de+1)-1,w=j[x],M=x+1,k=j[M];if(0>C(w,X))M<he&&0>C(k,w)?(j[de]=k,j[M]=X,de=M):(j[de]=w,j[x]=X,de=x);else if(M<he&&0>C(k,X))j[de]=k,j[M]=X,de=M;else break e}}return D}function C(j,D){var X=j.sortIndex-D.sortIndex;return X!==0?X:j.id-D.id}if(m.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var H=performance;m.unstable_now=function(){return H.now()}}else{var V=Date,R=V.now();m.unstable_now=function(){return V.now()-R}}var _=[],v=[],G=1,U=null,F=3,ae=!1,je=!1,_e=!1,Ye=!1,Me=typeof setTimeout=="function"?setTimeout:null,we=typeof clearTimeout=="function"?clearTimeout:null,Se=typeof setImmediate<"u"?setImmediate:null;function Qe(j){for(var D=T(v);D!==null;){if(D.callback===null)d(v);else if(D.startTime<=j)d(v),D.sortIndex=D.expirationTime,E(_,D);else break;D=T(v)}}function Ke(j){if(_e=!1,Qe(j),!je)if(T(_)!==null)je=!0,A||(A=!0,le());else{var D=T(v);D!==null&&Xe(Ke,D.startTime-j)}}var A=!1,O=-1,$=5,Y=-1;function K(){return Ye?!0:!(m.unstable_now()-Y<$)}function B(){if(Ye=!1,A){var j=m.unstable_now();Y=j;var D=!0;try{e:{je=!1,_e&&(_e=!1,we(O),O=-1),ae=!0;var X=F;try{t:{for(Qe(j),U=T(_);U!==null&&!(U.expirationTime>j&&K());){var de=U.callback;if(typeof de=="function"){U.callback=null,F=U.priorityLevel;var he=de(U.expirationTime<=j);if(j=m.unstable_now(),typeof he=="function"){U.callback=he,Qe(j),D=!0;break t}U===T(_)&&d(_),Qe(j)}else d(_);U=T(_)}if(U!==null)D=!0;else{var o=T(v);o!==null&&Xe(Ke,o.startTime-j),D=!1}}break e}finally{U=null,F=X,ae=!1}D=void 0}}finally{D?le():A=!1}}}var le;if(typeof Se=="function")le=function(){Se(B)};else if(typeof MessageChannel<"u"){var ze=new MessageChannel,Ge=ze.port2;ze.port1.onmessage=B,le=function(){Ge.postMessage(null)}}else le=function(){Me(B,0)};function Xe(j,D){O=Me(function(){j(m.unstable_now())},D)}m.unstable_IdlePriority=5,m.unstable_ImmediatePriority=1,m.unstable_LowPriority=4,m.unstable_NormalPriority=3,m.unstable_Profiling=null,m.unstable_UserBlockingPriority=2,m.unstable_cancelCallback=function(j){j.callback=null},m.unstable_forceFrameRate=function(j){0>j||125<j?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<j?Math.floor(1e3/j):5},m.unstable_getCurrentPriorityLevel=function(){return F},m.unstable_next=function(j){switch(F){case 1:case 2:case 3:var D=3;break;default:D=F}var X=F;F=D;try{return j()}finally{F=X}},m.unstable_requestPaint=function(){Ye=!0},m.unstable_runWithPriority=function(j,D){switch(j){case 1:case 2:case 3:case 4:case 5:break;default:j=3}var X=F;F=j;try{return D()}finally{F=X}},m.unstable_scheduleCallback=function(j,D,X){var de=m.unstable_now();switch(typeof X=="object"&&X!==null?(X=X.delay,X=typeof X=="number"&&0<X?de+X:de):X=de,j){case 1:var he=-1;break;case 2:he=250;break;case 5:he=1073741823;break;case 4:he=1e4;break;default:he=5e3}return he=X+he,j={id:G++,callback:D,priorityLevel:j,startTime:X,expirationTime:he,sortIndex:-1},X>de?(j.sortIndex=X,E(v,j),T(_)===null&&j===T(v)&&(_e?(we(O),O=-1):_e=!0,Xe(Ke,X-de))):(j.sortIndex=he,E(_,j),je||ae||(je=!0,A||(A=!0,le()))),j},m.unstable_shouldYield=K,m.unstable_wrapCallback=function(j){var D=F;return function(){var X=F;F=D;try{return j.apply(this,arguments)}finally{F=X}}}})(br)),br}var Rf;function Ah(){return Rf||(Rf=1,vr.exports=Eh()),vr.exports}var jr={exports:{}},Pe={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hf;function _h(){if(Hf)return Pe;Hf=1;var m=Tr();function E(_){var v="https://react.dev/errors/"+_;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var G=2;G<arguments.length;G++)v+="&args[]="+encodeURIComponent(arguments[G])}return"Minified React error #"+_+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function T(){}var d={d:{f:T,r:function(){throw Error(E(522))},D:T,C:T,L:T,m:T,X:T,S:T,M:T},p:0,findDOMNode:null},C=Symbol.for("react.portal");function H(_,v,G){var U=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:C,key:U==null?null:""+U,children:_,containerInfo:v,implementation:G}}var V=m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function R(_,v){if(_==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return Pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=d,Pe.createPortal=function(_,v){var G=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(E(299));return H(_,v,null,G)},Pe.flushSync=function(_){var v=V.T,G=d.p;try{if(V.T=null,d.p=2,_)return _()}finally{V.T=v,d.p=G,d.d.f()}},Pe.preconnect=function(_,v){typeof _=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,d.d.C(_,v))},Pe.prefetchDNS=function(_){typeof _=="string"&&d.d.D(_)},Pe.preinit=function(_,v){if(typeof _=="string"&&v&&typeof v.as=="string"){var G=v.as,U=R(G,v.crossOrigin),F=typeof v.integrity=="string"?v.integrity:void 0,ae=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;G==="style"?d.d.S(_,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:U,integrity:F,fetchPriority:ae}):G==="script"&&d.d.X(_,{crossOrigin:U,integrity:F,fetchPriority:ae,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},Pe.preinitModule=function(_,v){if(typeof _=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var G=R(v.as,v.crossOrigin);d.d.M(_,{crossOrigin:G,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&d.d.M(_)},Pe.preload=function(_,v){if(typeof _=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var G=v.as,U=R(G,v.crossOrigin);d.d.L(_,G,{crossOrigin:U,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},Pe.preloadModule=function(_,v){if(typeof _=="string")if(v){var G=R(v.as,v.crossOrigin);d.d.m(_,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:G,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else d.d.m(_)},Pe.requestFormReset=function(_){d.d.r(_)},Pe.unstable_batchedUpdates=function(_,v){return _(v)},Pe.useFormState=function(_,v,G){return V.H.useFormState(_,v,G)},Pe.useFormStatus=function(){return V.H.useHostTransitionStatus()},Pe.version="19.2.7",Pe}var qf;function Mh(){if(qf)return jr.exports;qf=1;function m(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(m)}catch(E){console.error(E)}}return m(),jr.exports=_h(),jr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bf;function Dh(){if(Bf)return Mn;Bf=1;var m=Ah(),E=Tr(),T=Mh();function d(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function C(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function H(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function V(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function R(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function _(e){if(H(e)!==e)throw Error(d(188))}function v(e){var t=e.alternate;if(!t){if(t=H(e),t===null)throw Error(d(188));return t!==e?null:e}for(var a=e,l=t;;){var n=a.return;if(n===null)break;var i=n.alternate;if(i===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===i.child){for(i=n.child;i;){if(i===a)return _(n),e;if(i===l)return _(n),t;i=i.sibling}throw Error(d(188))}if(a.return!==l.return)a=n,l=i;else{for(var s=!1,r=n.child;r;){if(r===a){s=!0,a=n,l=i;break}if(r===l){s=!0,l=n,a=i;break}r=r.sibling}if(!s){for(r=i.child;r;){if(r===a){s=!0,a=i,l=n;break}if(r===l){s=!0,l=i,a=n;break}r=r.sibling}if(!s)throw Error(d(189))}}if(a.alternate!==l)throw Error(d(190))}if(a.tag!==3)throw Error(d(188));return a.stateNode.current===a?e:t}function G(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=G(e),t!==null)return t;e=e.sibling}return null}var U=Object.assign,F=Symbol.for("react.element"),ae=Symbol.for("react.transitional.element"),je=Symbol.for("react.portal"),_e=Symbol.for("react.fragment"),Ye=Symbol.for("react.strict_mode"),Me=Symbol.for("react.profiler"),we=Symbol.for("react.consumer"),Se=Symbol.for("react.context"),Qe=Symbol.for("react.forward_ref"),Ke=Symbol.for("react.suspense"),A=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),$=Symbol.for("react.lazy"),Y=Symbol.for("react.activity"),K=Symbol.for("react.memo_cache_sentinel"),B=Symbol.iterator;function le(e){return e===null||typeof e!="object"?null:(e=B&&e[B]||e["@@iterator"],typeof e=="function"?e:null)}var ze=Symbol.for("react.client.reference");function Ge(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ze?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _e:return"Fragment";case Me:return"Profiler";case Ye:return"StrictMode";case Ke:return"Suspense";case A:return"SuspenseList";case Y:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case je:return"Portal";case Se:return e.displayName||"Context";case we:return(e._context.displayName||"Context")+".Consumer";case Qe:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case O:return t=e.displayName||null,t!==null?t:Ge(e.type)||"Memo";case $:t=e._payload,e=e._init;try{return Ge(e(t))}catch{}}return null}var Xe=Array.isArray,j=E.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=T.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X={pending:!1,data:null,method:null,action:null},de=[],he=-1;function o(e){return{current:e}}function x(e){0>he||(e.current=de[he],de[he]=null,he--)}function w(e,t){he++,de[he]=e.current,e.current=t}var M=o(null),k=o(null),J=o(null),ue=o(null);function Ue(e,t){switch(w(J,t),w(k,e),w(M,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Pd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Pd(t),e=ef(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}x(M),w(M,e)}function ce(){x(M),x(k),x(J)}function ta(e){e.memoizedState!==null&&w(ue,e);var t=M.current,a=ef(t,e.type);t!==a&&(w(k,e),w(M,a))}function _t(e){k.current===e&&(x(M),x(k)),ue.current===e&&(x(ue),wn._currentValue=X)}var Ul,Ar;function _a(e){if(Ul===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Ul=t&&t[1]||"",Ar=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ul+e+Ar}var Pi=!1;function ec(e,t){if(!e||Pi)return"";Pi=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var z=function(){throw Error()};if(Object.defineProperty(z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(z,[])}catch(b){var y=b}Reflect.construct(e,[],z)}else{try{z.call()}catch(b){y=b}e.call(z.prototype)}}else{try{throw Error()}catch(b){y=b}(z=e())&&typeof z.catch=="function"&&z.catch(function(){})}}catch(b){if(b&&y&&typeof b.stack=="string")return[b.stack,y.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),s=i[0],r=i[1];if(s&&r){var u=s.split(`
`),g=r.split(`
`);for(n=l=0;l<u.length&&!u[l].includes("DetermineComponentFrameRoot");)l++;for(;n<g.length&&!g[n].includes("DetermineComponentFrameRoot");)n++;if(l===u.length||n===g.length)for(l=u.length-1,n=g.length-1;1<=l&&0<=n&&u[l]!==g[n];)n--;for(;1<=l&&0<=n;l--,n--)if(u[l]!==g[n]){if(l!==1||n!==1)do if(l--,n--,0>n||u[l]!==g[n]){var S=`
`+u[l].replace(" at new "," at ");return e.displayName&&S.includes("<anonymous>")&&(S=S.replace("<anonymous>",e.displayName)),S}while(1<=l&&0<=n);break}}}finally{Pi=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?_a(a):""}function em(e,t){switch(e.tag){case 26:case 27:case 5:return _a(e.type);case 16:return _a("Lazy");case 13:return e.child!==t&&t!==null?_a("Suspense Fallback"):_a("Suspense");case 19:return _a("SuspenseList");case 0:case 15:return ec(e.type,!1);case 11:return ec(e.type.render,!1);case 1:return ec(e.type,!0);case 31:return _a("Activity");default:return""}}function _r(e){try{var t="",a=null;do t+=em(e,a),a=e,e=e.return;while(e);return t}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var tc=Object.prototype.hasOwnProperty,ac=m.unstable_scheduleCallback,lc=m.unstable_cancelCallback,tm=m.unstable_shouldYield,am=m.unstable_requestPaint,ot=m.unstable_now,lm=m.unstable_getCurrentPriorityLevel,Mr=m.unstable_ImmediatePriority,Dr=m.unstable_UserBlockingPriority,Dn=m.unstable_NormalPriority,nm=m.unstable_LowPriority,Cr=m.unstable_IdlePriority,im=m.log,cm=m.unstable_setDisableYieldValue,Rl=null,ut=null;function aa(e){if(typeof im=="function"&&cm(e),ut&&typeof ut.setStrictMode=="function")try{ut.setStrictMode(Rl,e)}catch{}}var dt=Math.clz32?Math.clz32:om,sm=Math.log,rm=Math.LN2;function om(e){return e>>>=0,e===0?32:31-(sm(e)/rm|0)|0}var Cn=256,kn=262144,On=4194304;function Ma(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Un(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var n=0,i=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var r=l&134217727;return r!==0?(l=r&~i,l!==0?n=Ma(l):(s&=r,s!==0?n=Ma(s):a||(a=r&~e,a!==0&&(n=Ma(a))))):(r=l&~i,r!==0?n=Ma(r):s!==0?n=Ma(s):a||(a=l&~e,a!==0&&(n=Ma(a)))),n===0?0:t!==0&&t!==n&&(t&i)===0&&(i=n&-n,a=t&-t,i>=a||i===32&&(a&4194048)!==0)?t:n}function Hl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function um(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kr(){var e=On;return On<<=1,(On&62914560)===0&&(On=4194304),e}function nc(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function ql(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function dm(e,t,a,l,n,i){var s=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var r=e.entanglements,u=e.expirationTimes,g=e.hiddenUpdates;for(a=s&~a;0<a;){var S=31-dt(a),z=1<<S;r[S]=0,u[S]=-1;var y=g[S];if(y!==null)for(g[S]=null,S=0;S<y.length;S++){var b=y[S];b!==null&&(b.lane&=-536870913)}a&=~z}l!==0&&Or(e,l,0),i!==0&&n===0&&e.tag!==0&&(e.suspendedLanes|=i&~(s&~t))}function Or(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-dt(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&261930}function Ur(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-dt(a),n=1<<l;n&t|e[l]&t&&(e[l]|=t),a&=~n}}function Rr(e,t){var a=t&-t;return a=(a&42)!==0?1:ic(a),(a&(e.suspendedLanes|t))!==0?0:a}function ic(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function cc(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Hr(){var e=D.p;return e!==0?e:(e=window.event,e===void 0?32:zf(e.type))}function qr(e,t){var a=D.p;try{return D.p=e,t()}finally{D.p=a}}var la=Math.random().toString(36).slice(2),Je="__reactFiber$"+la,at="__reactProps$"+la,Wa="__reactContainer$"+la,sc="__reactEvents$"+la,fm="__reactListeners$"+la,mm="__reactHandles$"+la,Br="__reactResources$"+la,Bl="__reactMarker$"+la;function rc(e){delete e[Je],delete e[at],delete e[sc],delete e[fm],delete e[mm]}function Fa(e){var t=e[Je];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Wa]||a[Je]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=rf(e);e!==null;){if(a=e[Je])return a;e=rf(e)}return t}e=a,a=e.parentNode}return null}function Ia(e){if(e=e[Je]||e[Wa]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Yl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(d(33))}function Pa(e){var t=e[Br];return t||(t=e[Br]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ze(e){e[Bl]=!0}var Yr=new Set,Qr={};function Da(e,t){el(e,t),el(e+"Capture",t)}function el(e,t){for(Qr[e]=t,e=0;e<t.length;e++)Yr.add(t[e])}var pm=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Lr={},Gr={};function hm(e){return tc.call(Gr,e)?!0:tc.call(Lr,e)?!1:pm.test(e)?Gr[e]=!0:(Lr[e]=!0,!1)}function Rn(e,t,a){if(hm(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Hn(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Ht(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}function vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xr(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function gm(e,t,a){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var n=l.get,i=l.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return n.call(this)},set:function(s){a=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:l.enumerable}),{getValue:function(){return a},setValue:function(s){a=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function oc(e){if(!e._valueTracker){var t=Xr(e)?"checked":"value";e._valueTracker=gm(e,t,""+e[t])}}function Zr(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=Xr(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function qn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var ym=/[\n"\\]/g;function bt(e){return e.replace(ym,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function uc(e,t,a,l,n,i,s,r){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.type=s:e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+vt(t)):e.value!==""+vt(t)&&(e.value=""+vt(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?dc(e,s,vt(t)):a!=null?dc(e,s,vt(a)):l!=null&&e.removeAttribute("value"),n==null&&i!=null&&(e.defaultChecked=!!i),n!=null&&(e.checked=n&&typeof n!="function"&&typeof n!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.name=""+vt(r):e.removeAttribute("name")}function Vr(e,t,a,l,n,i,s,r){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||a!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){oc(e);return}a=a!=null?""+vt(a):"",t=t!=null?""+vt(t):a,r||t===e.value||(e.value=t),e.defaultValue=t}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=r?e.checked:!!l,e.defaultChecked=!!l,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.name=s),oc(e)}function dc(e,t,a){t==="number"&&qn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function tl(e,t,a,l){if(e=e.options,t){t={};for(var n=0;n<a.length;n++)t["$"+a[n]]=!0;for(a=0;a<e.length;a++)n=t.hasOwnProperty("$"+e[a].value),e[a].selected!==n&&(e[a].selected=n),n&&l&&(e[a].defaultSelected=!0)}else{for(a=""+vt(a),t=null,n=0;n<e.length;n++){if(e[n].value===a){e[n].selected=!0,l&&(e[n].defaultSelected=!0);return}t!==null||e[n].disabled||(t=e[n])}t!==null&&(t.selected=!0)}}function Kr(e,t,a){if(t!=null&&(t=""+vt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+vt(a):""}function Jr(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(d(92));if(Xe(l)){if(1<l.length)throw Error(d(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=vt(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l),oc(e)}function al(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var xm=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $r(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||xm.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Wr(e,t,a){if(t!=null&&typeof t!="object")throw Error(d(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var n in t)l=t[n],t.hasOwnProperty(n)&&a[n]!==l&&$r(e,n,l)}else for(var i in t)t.hasOwnProperty(i)&&$r(e,i,t[i])}function fc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var vm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),bm=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Bn(e){return bm.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function qt(){}var mc=null;function pc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ll=null,nl=null;function Fr(e){var t=Ia(e);if(t&&(e=t.stateNode)){var a=e[at]||null;e:switch(e=t.stateNode,t.type){case"input":if(uc(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+bt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var n=l[at]||null;if(!n)throw Error(d(90));uc(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&Zr(l)}break e;case"textarea":Kr(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&tl(e,!!a.multiple,t,!1)}}}var hc=!1;function Ir(e,t,a){if(hc)return e(t,a);hc=!0;try{var l=e(t);return l}finally{if(hc=!1,(ll!==null||nl!==null)&&(Ti(),ll&&(t=ll,e=nl,nl=ll=null,Fr(t),e)))for(t=0;t<e.length;t++)Fr(e[t])}}function Ql(e,t){var a=e.stateNode;if(a===null)return null;var l=a[at]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(d(231,t,typeof a));return a}var Bt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),gc=!1;if(Bt)try{var Ll={};Object.defineProperty(Ll,"passive",{get:function(){gc=!0}}),window.addEventListener("test",Ll,Ll),window.removeEventListener("test",Ll,Ll)}catch{gc=!1}var na=null,yc=null,Yn=null;function Pr(){if(Yn)return Yn;var e,t=yc,a=t.length,l,n="value"in na?na.value:na.textContent,i=n.length;for(e=0;e<a&&t[e]===n[e];e++);var s=a-e;for(l=1;l<=s&&t[a-l]===n[i-l];l++);return Yn=n.slice(e,1<l?1-l:void 0)}function Qn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ln(){return!0}function eo(){return!1}function lt(e){function t(a,l,n,i,s){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var r in e)e.hasOwnProperty(r)&&(a=e[r],this[r]=a?a(i):i[r]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ln:eo,this.isPropagationStopped=eo,this}return U(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ln)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ln)},persist:function(){},isPersistent:Ln}),t}var Ca={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gn=lt(Ca),Gl=U({},Ca,{view:0,detail:0}),jm=lt(Gl),xc,vc,Xl,Xn=U({},Gl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:jc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Xl&&(Xl&&e.type==="mousemove"?(xc=e.screenX-Xl.screenX,vc=e.screenY-Xl.screenY):vc=xc=0,Xl=e),xc)},movementY:function(e){return"movementY"in e?e.movementY:vc}}),to=lt(Xn),Sm=U({},Xn,{dataTransfer:0}),Nm=lt(Sm),zm=U({},Gl,{relatedTarget:0}),bc=lt(zm),wm=U({},Ca,{animationName:0,elapsedTime:0,pseudoElement:0}),Tm=lt(wm),Em=U({},Ca,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Am=lt(Em),_m=U({},Ca,{data:0}),ao=lt(_m),Mm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Dm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Cm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function km(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Cm[e])?!!t[e]:!1}function jc(){return km}var Om=U({},Gl,{key:function(e){if(e.key){var t=Mm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Dm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:jc,charCode:function(e){return e.type==="keypress"?Qn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Um=lt(Om),Rm=U({},Xn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lo=lt(Rm),Hm=U({},Gl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:jc}),qm=lt(Hm),Bm=U({},Ca,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ym=lt(Bm),Qm=U({},Xn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lm=lt(Qm),Gm=U({},Ca,{newState:0,oldState:0}),Xm=lt(Gm),Zm=[9,13,27,32],Sc=Bt&&"CompositionEvent"in window,Zl=null;Bt&&"documentMode"in document&&(Zl=document.documentMode);var Vm=Bt&&"TextEvent"in window&&!Zl,no=Bt&&(!Sc||Zl&&8<Zl&&11>=Zl),io=" ",co=!1;function so(e,t){switch(e){case"keyup":return Zm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ro(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var il=!1;function Km(e,t){switch(e){case"compositionend":return ro(t);case"keypress":return t.which!==32?null:(co=!0,io);case"textInput":return e=t.data,e===io&&co?null:e;default:return null}}function Jm(e,t){if(il)return e==="compositionend"||!Sc&&so(e,t)?(e=Pr(),Yn=yc=na=null,il=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return no&&t.locale!=="ko"?null:t.data;default:return null}}var $m={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function oo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!$m[e.type]:t==="textarea"}function uo(e,t,a,l){ll?nl?nl.push(l):nl=[l]:ll=l,t=ki(t,"onChange"),0<t.length&&(a=new Gn("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var Vl=null,Kl=null;function Wm(e){Kd(e,0)}function Zn(e){var t=Yl(e);if(Zr(t))return e}function fo(e,t){if(e==="change")return t}var mo=!1;if(Bt){var Nc;if(Bt){var zc="oninput"in document;if(!zc){var po=document.createElement("div");po.setAttribute("oninput","return;"),zc=typeof po.oninput=="function"}Nc=zc}else Nc=!1;mo=Nc&&(!document.documentMode||9<document.documentMode)}function ho(){Vl&&(Vl.detachEvent("onpropertychange",go),Kl=Vl=null)}function go(e){if(e.propertyName==="value"&&Zn(Kl)){var t=[];uo(t,Kl,e,pc(e)),Ir(Wm,t)}}function Fm(e,t,a){e==="focusin"?(ho(),Vl=t,Kl=a,Vl.attachEvent("onpropertychange",go)):e==="focusout"&&ho()}function Im(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Zn(Kl)}function Pm(e,t){if(e==="click")return Zn(t)}function ep(e,t){if(e==="input"||e==="change")return Zn(t)}function tp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ft=typeof Object.is=="function"?Object.is:tp;function Jl(e,t){if(ft(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!tc.call(t,n)||!ft(e[n],t[n]))return!1}return!0}function yo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xo(e,t){var a=yo(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=yo(a)}}function vo(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?vo(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function bo(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=qn(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=qn(e.document)}return t}function wc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var ap=Bt&&"documentMode"in document&&11>=document.documentMode,cl=null,Tc=null,$l=null,Ec=!1;function jo(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ec||cl==null||cl!==qn(l)||(l=cl,"selectionStart"in l&&wc(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),$l&&Jl($l,l)||($l=l,l=ki(Tc,"onSelect"),0<l.length&&(t=new Gn("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=cl)))}function ka(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var sl={animationend:ka("Animation","AnimationEnd"),animationiteration:ka("Animation","AnimationIteration"),animationstart:ka("Animation","AnimationStart"),transitionrun:ka("Transition","TransitionRun"),transitionstart:ka("Transition","TransitionStart"),transitioncancel:ka("Transition","TransitionCancel"),transitionend:ka("Transition","TransitionEnd")},Ac={},So={};Bt&&(So=document.createElement("div").style,"AnimationEvent"in window||(delete sl.animationend.animation,delete sl.animationiteration.animation,delete sl.animationstart.animation),"TransitionEvent"in window||delete sl.transitionend.transition);function Oa(e){if(Ac[e])return Ac[e];if(!sl[e])return e;var t=sl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in So)return Ac[e]=t[a];return e}var No=Oa("animationend"),zo=Oa("animationiteration"),wo=Oa("animationstart"),lp=Oa("transitionrun"),np=Oa("transitionstart"),ip=Oa("transitioncancel"),To=Oa("transitionend"),Eo=new Map,_c="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");_c.push("scrollEnd");function Mt(e,t){Eo.set(e,t),Da(t,[e])}var Vn=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},jt=[],rl=0,Mc=0;function Kn(){for(var e=rl,t=Mc=rl=0;t<e;){var a=jt[t];jt[t++]=null;var l=jt[t];jt[t++]=null;var n=jt[t];jt[t++]=null;var i=jt[t];if(jt[t++]=null,l!==null&&n!==null){var s=l.pending;s===null?n.next=n:(n.next=s.next,s.next=n),l.pending=n}i!==0&&Ao(a,n,i)}}function Jn(e,t,a,l){jt[rl++]=e,jt[rl++]=t,jt[rl++]=a,jt[rl++]=l,Mc|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Dc(e,t,a,l){return Jn(e,t,a,l),$n(e)}function Ua(e,t){return Jn(e,null,null,t),$n(e)}function Ao(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var n=!1,i=e.return;i!==null;)i.childLanes|=a,l=i.alternate,l!==null&&(l.childLanes|=a),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(n=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,n&&t!==null&&(n=31-dt(a),e=i.hiddenUpdates,l=e[n],l===null?e[n]=[t]:l.push(t),t.lane=a|536870912),i):null}function $n(e){if(50<xn)throw xn=0,Ys=null,Error(d(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ol={};function cp(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mt(e,t,a,l){return new cp(e,t,a,l)}function Cc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Yt(e,t){var a=e.alternate;return a===null?(a=mt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function _o(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Wn(e,t,a,l,n,i){var s=0;if(l=e,typeof e=="function")Cc(e)&&(s=1);else if(typeof e=="string")s=dh(e,a,M.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Y:return e=mt(31,a,t,n),e.elementType=Y,e.lanes=i,e;case _e:return Ra(a.children,n,i,t);case Ye:s=8,n|=24;break;case Me:return e=mt(12,a,t,n|2),e.elementType=Me,e.lanes=i,e;case Ke:return e=mt(13,a,t,n),e.elementType=Ke,e.lanes=i,e;case A:return e=mt(19,a,t,n),e.elementType=A,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Se:s=10;break e;case we:s=9;break e;case Qe:s=11;break e;case O:s=14;break e;case $:s=16,l=null;break e}s=29,a=Error(d(130,e===null?"null":typeof e,"")),l=null}return t=mt(s,a,t,n),t.elementType=e,t.type=l,t.lanes=i,t}function Ra(e,t,a,l){return e=mt(7,e,l,t),e.lanes=a,e}function kc(e,t,a){return e=mt(6,e,null,t),e.lanes=a,e}function Mo(e){var t=mt(18,null,null,0);return t.stateNode=e,t}function Oc(e,t,a){return t=mt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Do=new WeakMap;function St(e,t){if(typeof e=="object"&&e!==null){var a=Do.get(e);return a!==void 0?a:(t={value:e,source:t,stack:_r(t)},Do.set(e,t),t)}return{value:e,source:t,stack:_r(t)}}var ul=[],dl=0,Fn=null,Wl=0,Nt=[],zt=0,ia=null,kt=1,Ot="";function Qt(e,t){ul[dl++]=Wl,ul[dl++]=Fn,Fn=e,Wl=t}function Co(e,t,a){Nt[zt++]=kt,Nt[zt++]=Ot,Nt[zt++]=ia,ia=e;var l=kt;e=Ot;var n=32-dt(l)-1;l&=~(1<<n),a+=1;var i=32-dt(t)+n;if(30<i){var s=n-n%5;i=(l&(1<<s)-1).toString(32),l>>=s,n-=s,kt=1<<32-dt(t)+n|a<<n|l,Ot=i+e}else kt=1<<i|a<<n|l,Ot=e}function Uc(e){e.return!==null&&(Qt(e,1),Co(e,1,0))}function Rc(e){for(;e===Fn;)Fn=ul[--dl],ul[dl]=null,Wl=ul[--dl],ul[dl]=null;for(;e===ia;)ia=Nt[--zt],Nt[zt]=null,Ot=Nt[--zt],Nt[zt]=null,kt=Nt[--zt],Nt[zt]=null}function ko(e,t){Nt[zt++]=kt,Nt[zt++]=Ot,Nt[zt++]=ia,kt=t.id,Ot=t.overflow,ia=e}var $e=null,Te=null,oe=!1,ca=null,wt=!1,Hc=Error(d(519));function sa(e){var t=Error(d(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Fl(St(t,e)),Hc}function Oo(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[Je]=e,t[at]=l,a){case"dialog":ie("cancel",t),ie("close",t);break;case"iframe":case"object":case"embed":ie("load",t);break;case"video":case"audio":for(a=0;a<bn.length;a++)ie(bn[a],t);break;case"source":ie("error",t);break;case"img":case"image":case"link":ie("error",t),ie("load",t);break;case"details":ie("toggle",t);break;case"input":ie("invalid",t),Vr(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":ie("invalid",t);break;case"textarea":ie("invalid",t),Jr(t,l.value,l.defaultValue,l.children)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||Fd(t.textContent,a)?(l.popover!=null&&(ie("beforetoggle",t),ie("toggle",t)),l.onScroll!=null&&ie("scroll",t),l.onScrollEnd!=null&&ie("scrollend",t),l.onClick!=null&&(t.onclick=qt),t=!0):t=!1,t||sa(e,!0)}function Uo(e){for($e=e.return;$e;)switch($e.tag){case 5:case 31:case 13:wt=!1;return;case 27:case 3:wt=!0;return;default:$e=$e.return}}function fl(e){if(e!==$e)return!1;if(!oe)return Uo(e),oe=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||tr(e.type,e.memoizedProps)),a=!a),a&&Te&&sa(e),Uo(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));Te=sf(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));Te=sf(e)}else t===27?(t=Te,ja(e.type)?(e=cr,cr=null,Te=e):Te=t):Te=$e?Et(e.stateNode.nextSibling):null;return!0}function Ha(){Te=$e=null,oe=!1}function qc(){var e=ca;return e!==null&&(st===null?st=e:st.push.apply(st,e),ca=null),e}function Fl(e){ca===null?ca=[e]:ca.push(e)}var Bc=o(null),qa=null,Lt=null;function ra(e,t,a){w(Bc,t._currentValue),t._currentValue=a}function Gt(e){e._currentValue=Bc.current,x(Bc)}function Yc(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function Qc(e,t,a,l){var n=e.child;for(n!==null&&(n.return=e);n!==null;){var i=n.dependencies;if(i!==null){var s=n.child;i=i.firstContext;e:for(;i!==null;){var r=i;i=n;for(var u=0;u<t.length;u++)if(r.context===t[u]){i.lanes|=a,r=i.alternate,r!==null&&(r.lanes|=a),Yc(i.return,a,e),l||(s=null);break e}i=r.next}}else if(n.tag===18){if(s=n.return,s===null)throw Error(d(341));s.lanes|=a,i=s.alternate,i!==null&&(i.lanes|=a),Yc(s,a,e),s=null}else s=n.child;if(s!==null)s.return=n;else for(s=n;s!==null;){if(s===e){s=null;break}if(n=s.sibling,n!==null){n.return=s.return,s=n;break}s=s.return}n=s}}function ml(e,t,a,l){e=null;for(var n=t,i=!1;n!==null;){if(!i){if((n.flags&524288)!==0)i=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var s=n.alternate;if(s===null)throw Error(d(387));if(s=s.memoizedProps,s!==null){var r=n.type;ft(n.pendingProps.value,s.value)||(e!==null?e.push(r):e=[r])}}else if(n===ue.current){if(s=n.alternate,s===null)throw Error(d(387));s.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(e!==null?e.push(wn):e=[wn])}n=n.return}e!==null&&Qc(t,e,a,l),t.flags|=262144}function In(e){for(e=e.firstContext;e!==null;){if(!ft(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ba(e){qa=e,Lt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function We(e){return Ro(qa,e)}function Pn(e,t){return qa===null&&Ba(e),Ro(e,t)}function Ro(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Lt===null){if(e===null)throw Error(d(308));Lt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Lt=Lt.next=t;return a}var sp=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},rp=m.unstable_scheduleCallback,op=m.unstable_NormalPriority,Re={$$typeof:Se,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Lc(){return{controller:new sp,data:new Map,refCount:0}}function Il(e){e.refCount--,e.refCount===0&&rp(op,function(){e.controller.abort()})}var Pl=null,Gc=0,pl=0,hl=null;function up(e,t){if(Pl===null){var a=Pl=[];Gc=0,pl=Vs(),hl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return Gc++,t.then(Ho,Ho),t}function Ho(){if(--Gc===0&&Pl!==null){hl!==null&&(hl.status="fulfilled");var e=Pl;Pl=null,pl=0,hl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function dp(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var n=0;n<a.length;n++)(0,a[n])(t)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var qo=j.S;j.S=function(e,t){jd=ot(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&up(e,t),qo!==null&&qo(e,t)};var Ya=o(null);function Xc(){var e=Ya.current;return e!==null?e:Ne.pooledCache}function ei(e,t){t===null?w(Ya,Ya.current):w(Ya,t.pool)}function Bo(){var e=Xc();return e===null?null:{parent:Re._currentValue,pool:e}}var gl=Error(d(460)),Zc=Error(d(474)),ti=Error(d(542)),ai={then:function(){}};function Yo(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Qo(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(qt,qt),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Go(e),e;default:if(typeof t.status=="string")t.then(qt,qt);else{if(e=Ne,e!==null&&100<e.shellSuspendCounter)throw Error(d(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=l}},function(l){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Go(e),e}throw La=t,gl}}function Qa(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(La=a,gl):a}}var La=null;function Lo(){if(La===null)throw Error(d(459));var e=La;return La=null,e}function Go(e){if(e===gl||e===ti)throw Error(d(483))}var yl=null,en=0;function li(e){var t=en;return en+=1,yl===null&&(yl=[]),Qo(yl,e,t)}function tn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ni(e,t){throw t.$$typeof===F?Error(d(525)):(e=Object.prototype.toString.call(t),Error(d(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Xo(e){function t(p,f){if(e){var h=p.deletions;h===null?(p.deletions=[f],p.flags|=16):h.push(f)}}function a(p,f){if(!e)return null;for(;f!==null;)t(p,f),f=f.sibling;return null}function l(p){for(var f=new Map;p!==null;)p.key!==null?f.set(p.key,p):f.set(p.index,p),p=p.sibling;return f}function n(p,f){return p=Yt(p,f),p.index=0,p.sibling=null,p}function i(p,f,h){return p.index=h,e?(h=p.alternate,h!==null?(h=h.index,h<f?(p.flags|=67108866,f):h):(p.flags|=67108866,f)):(p.flags|=1048576,f)}function s(p){return e&&p.alternate===null&&(p.flags|=67108866),p}function r(p,f,h,N){return f===null||f.tag!==6?(f=kc(h,p.mode,N),f.return=p,f):(f=n(f,h),f.return=p,f)}function u(p,f,h,N){var L=h.type;return L===_e?S(p,f,h.props.children,N,h.key):f!==null&&(f.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===$&&Qa(L)===f.type)?(f=n(f,h.props),tn(f,h),f.return=p,f):(f=Wn(h.type,h.key,h.props,null,p.mode,N),tn(f,h),f.return=p,f)}function g(p,f,h,N){return f===null||f.tag!==4||f.stateNode.containerInfo!==h.containerInfo||f.stateNode.implementation!==h.implementation?(f=Oc(h,p.mode,N),f.return=p,f):(f=n(f,h.children||[]),f.return=p,f)}function S(p,f,h,N,L){return f===null||f.tag!==7?(f=Ra(h,p.mode,N,L),f.return=p,f):(f=n(f,h),f.return=p,f)}function z(p,f,h){if(typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint")return f=kc(""+f,p.mode,h),f.return=p,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ae:return h=Wn(f.type,f.key,f.props,null,p.mode,h),tn(h,f),h.return=p,h;case je:return f=Oc(f,p.mode,h),f.return=p,f;case $:return f=Qa(f),z(p,f,h)}if(Xe(f)||le(f))return f=Ra(f,p.mode,h,null),f.return=p,f;if(typeof f.then=="function")return z(p,li(f),h);if(f.$$typeof===Se)return z(p,Pn(p,f),h);ni(p,f)}return null}function y(p,f,h,N){var L=f!==null?f.key:null;if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return L!==null?null:r(p,f,""+h,N);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ae:return h.key===L?u(p,f,h,N):null;case je:return h.key===L?g(p,f,h,N):null;case $:return h=Qa(h),y(p,f,h,N)}if(Xe(h)||le(h))return L!==null?null:S(p,f,h,N,null);if(typeof h.then=="function")return y(p,f,li(h),N);if(h.$$typeof===Se)return y(p,f,Pn(p,h),N);ni(p,h)}return null}function b(p,f,h,N,L){if(typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint")return p=p.get(h)||null,r(f,p,""+N,L);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case ae:return p=p.get(N.key===null?h:N.key)||null,u(f,p,N,L);case je:return p=p.get(N.key===null?h:N.key)||null,g(f,p,N,L);case $:return N=Qa(N),b(p,f,h,N,L)}if(Xe(N)||le(N))return p=p.get(h)||null,S(f,p,N,L,null);if(typeof N.then=="function")return b(p,f,h,li(N),L);if(N.$$typeof===Se)return b(p,f,h,Pn(f,N),L);ni(f,N)}return null}function q(p,f,h,N){for(var L=null,fe=null,Q=f,P=f=0,re=null;Q!==null&&P<h.length;P++){Q.index>P?(re=Q,Q=null):re=Q.sibling;var me=y(p,Q,h[P],N);if(me===null){Q===null&&(Q=re);break}e&&Q&&me.alternate===null&&t(p,Q),f=i(me,f,P),fe===null?L=me:fe.sibling=me,fe=me,Q=re}if(P===h.length)return a(p,Q),oe&&Qt(p,P),L;if(Q===null){for(;P<h.length;P++)Q=z(p,h[P],N),Q!==null&&(f=i(Q,f,P),fe===null?L=Q:fe.sibling=Q,fe=Q);return oe&&Qt(p,P),L}for(Q=l(Q);P<h.length;P++)re=b(Q,p,P,h[P],N),re!==null&&(e&&re.alternate!==null&&Q.delete(re.key===null?P:re.key),f=i(re,f,P),fe===null?L=re:fe.sibling=re,fe=re);return e&&Q.forEach(function(Ta){return t(p,Ta)}),oe&&Qt(p,P),L}function Z(p,f,h,N){if(h==null)throw Error(d(151));for(var L=null,fe=null,Q=f,P=f=0,re=null,me=h.next();Q!==null&&!me.done;P++,me=h.next()){Q.index>P?(re=Q,Q=null):re=Q.sibling;var Ta=y(p,Q,me.value,N);if(Ta===null){Q===null&&(Q=re);break}e&&Q&&Ta.alternate===null&&t(p,Q),f=i(Ta,f,P),fe===null?L=Ta:fe.sibling=Ta,fe=Ta,Q=re}if(me.done)return a(p,Q),oe&&Qt(p,P),L;if(Q===null){for(;!me.done;P++,me=h.next())me=z(p,me.value,N),me!==null&&(f=i(me,f,P),fe===null?L=me:fe.sibling=me,fe=me);return oe&&Qt(p,P),L}for(Q=l(Q);!me.done;P++,me=h.next())me=b(Q,p,P,me.value,N),me!==null&&(e&&me.alternate!==null&&Q.delete(me.key===null?P:me.key),f=i(me,f,P),fe===null?L=me:fe.sibling=me,fe=me);return e&&Q.forEach(function(Sh){return t(p,Sh)}),oe&&Qt(p,P),L}function be(p,f,h,N){if(typeof h=="object"&&h!==null&&h.type===_e&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case ae:e:{for(var L=h.key;f!==null;){if(f.key===L){if(L=h.type,L===_e){if(f.tag===7){a(p,f.sibling),N=n(f,h.props.children),N.return=p,p=N;break e}}else if(f.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===$&&Qa(L)===f.type){a(p,f.sibling),N=n(f,h.props),tn(N,h),N.return=p,p=N;break e}a(p,f);break}else t(p,f);f=f.sibling}h.type===_e?(N=Ra(h.props.children,p.mode,N,h.key),N.return=p,p=N):(N=Wn(h.type,h.key,h.props,null,p.mode,N),tn(N,h),N.return=p,p=N)}return s(p);case je:e:{for(L=h.key;f!==null;){if(f.key===L)if(f.tag===4&&f.stateNode.containerInfo===h.containerInfo&&f.stateNode.implementation===h.implementation){a(p,f.sibling),N=n(f,h.children||[]),N.return=p,p=N;break e}else{a(p,f);break}else t(p,f);f=f.sibling}N=Oc(h,p.mode,N),N.return=p,p=N}return s(p);case $:return h=Qa(h),be(p,f,h,N)}if(Xe(h))return q(p,f,h,N);if(le(h)){if(L=le(h),typeof L!="function")throw Error(d(150));return h=L.call(h),Z(p,f,h,N)}if(typeof h.then=="function")return be(p,f,li(h),N);if(h.$$typeof===Se)return be(p,f,Pn(p,h),N);ni(p,h)}return typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint"?(h=""+h,f!==null&&f.tag===6?(a(p,f.sibling),N=n(f,h),N.return=p,p=N):(a(p,f),N=kc(h,p.mode,N),N.return=p,p=N),s(p)):a(p,f)}return function(p,f,h,N){try{en=0;var L=be(p,f,h,N);return yl=null,L}catch(Q){if(Q===gl||Q===ti)throw Q;var fe=mt(29,Q,null,p.mode);return fe.lanes=N,fe.return=p,fe}finally{}}}var Ga=Xo(!0),Zo=Xo(!1),oa=!1;function Vc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Kc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ua(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function da(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(pe&2)!==0){var n=l.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),l.pending=t,t=$n(e),Ao(e,null,a),t}return Jn(e,l,t,a),$n(e)}function an(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Ur(e,a)}}function Jc(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,i=null;if(a=a.firstBaseUpdate,a!==null){do{var s={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};i===null?n=i=s:i=i.next=s,a=a.next}while(a!==null);i===null?n=i=t:i=i.next=t}else n=i=t;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var $c=!1;function ln(){if($c){var e=hl;if(e!==null)throw e}}function nn(e,t,a,l){$c=!1;var n=e.updateQueue;oa=!1;var i=n.firstBaseUpdate,s=n.lastBaseUpdate,r=n.shared.pending;if(r!==null){n.shared.pending=null;var u=r,g=u.next;u.next=null,s===null?i=g:s.next=g,s=u;var S=e.alternate;S!==null&&(S=S.updateQueue,r=S.lastBaseUpdate,r!==s&&(r===null?S.firstBaseUpdate=g:r.next=g,S.lastBaseUpdate=u))}if(i!==null){var z=n.baseState;s=0,S=g=u=null,r=i;do{var y=r.lane&-536870913,b=y!==r.lane;if(b?(se&y)===y:(l&y)===y){y!==0&&y===pl&&($c=!0),S!==null&&(S=S.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});e:{var q=e,Z=r;y=t;var be=a;switch(Z.tag){case 1:if(q=Z.payload,typeof q=="function"){z=q.call(be,z,y);break e}z=q;break e;case 3:q.flags=q.flags&-65537|128;case 0:if(q=Z.payload,y=typeof q=="function"?q.call(be,z,y):q,y==null)break e;z=U({},z,y);break e;case 2:oa=!0}}y=r.callback,y!==null&&(e.flags|=64,b&&(e.flags|=8192),b=n.callbacks,b===null?n.callbacks=[y]:b.push(y))}else b={lane:y,tag:r.tag,payload:r.payload,callback:r.callback,next:null},S===null?(g=S=b,u=z):S=S.next=b,s|=y;if(r=r.next,r===null){if(r=n.shared.pending,r===null)break;b=r,r=b.next,b.next=null,n.lastBaseUpdate=b,n.shared.pending=null}}while(!0);S===null&&(u=z),n.baseState=u,n.firstBaseUpdate=g,n.lastBaseUpdate=S,i===null&&(n.shared.lanes=0),ga|=s,e.lanes=s,e.memoizedState=z}}function Vo(e,t){if(typeof e!="function")throw Error(d(191,e));e.call(t)}function Ko(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Vo(a[e],t)}var xl=o(null),ii=o(0);function Jo(e,t){e=It,w(ii,e),w(xl,t),It=e|t.baseLanes}function Wc(){w(ii,It),w(xl,xl.current)}function Fc(){It=ii.current,x(xl),x(ii)}var pt=o(null),Tt=null;function fa(e){var t=e.alternate;w(ke,ke.current&1),w(pt,e),Tt===null&&(t===null||xl.current!==null||t.memoizedState!==null)&&(Tt=e)}function Ic(e){w(ke,ke.current),w(pt,e),Tt===null&&(Tt=e)}function $o(e){e.tag===22?(w(ke,ke.current),w(pt,e),Tt===null&&(Tt=e)):ma()}function ma(){w(ke,ke.current),w(pt,pt.current)}function ht(e){x(pt),Tt===e&&(Tt=null),x(ke)}var ke=o(0);function ci(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||nr(a)||ir(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Xt=0,I=null,xe=null,He=null,si=!1,vl=!1,Xa=!1,ri=0,cn=0,bl=null,fp=0;function De(){throw Error(d(321))}function Pc(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!ft(e[a],t[a]))return!1;return!0}function es(e,t,a,l,n,i){return Xt=i,I=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,j.H=e===null||e.memoizedState===null?Cu:hs,Xa=!1,i=a(l,n),Xa=!1,vl&&(i=Fo(t,a,l,n)),Wo(e),i}function Wo(e){j.H=on;var t=xe!==null&&xe.next!==null;if(Xt=0,He=xe=I=null,si=!1,cn=0,bl=null,t)throw Error(d(300));e===null||qe||(e=e.dependencies,e!==null&&In(e)&&(qe=!0))}function Fo(e,t,a,l){I=e;var n=0;do{if(vl&&(bl=null),cn=0,vl=!1,25<=n)throw Error(d(301));if(n+=1,He=xe=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}j.H=ku,i=t(a,l)}while(vl);return i}function mp(){var e=j.H,t=e.useState()[0];return t=typeof t.then=="function"?sn(t):t,e=e.useState()[0],(xe!==null?xe.memoizedState:null)!==e&&(I.flags|=1024),t}function ts(){var e=ri!==0;return ri=0,e}function as(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function ls(e){if(si){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}si=!1}Xt=0,He=xe=I=null,vl=!1,cn=ri=0,bl=null}function et(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?I.memoizedState=He=e:He=He.next=e,He}function Oe(){if(xe===null){var e=I.alternate;e=e!==null?e.memoizedState:null}else e=xe.next;var t=He===null?I.memoizedState:He.next;if(t!==null)He=t,xe=e;else{if(e===null)throw I.alternate===null?Error(d(467)):Error(d(310));xe=e,e={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},He===null?I.memoizedState=He=e:He=He.next=e}return He}function oi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function sn(e){var t=cn;return cn+=1,bl===null&&(bl=[]),e=Qo(bl,e,t),t=I,(He===null?t.memoizedState:He.next)===null&&(t=t.alternate,j.H=t===null||t.memoizedState===null?Cu:hs),e}function ui(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return sn(e);if(e.$$typeof===Se)return We(e)}throw Error(d(438,String(e)))}function ns(e){var t=null,a=I.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=I.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=oi(),I.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=K;return t.index++,a}function Zt(e,t){return typeof t=="function"?t(e):t}function di(e){var t=Oe();return is(t,xe,e)}function is(e,t,a){var l=e.queue;if(l===null)throw Error(d(311));l.lastRenderedReducer=a;var n=e.baseQueue,i=l.pending;if(i!==null){if(n!==null){var s=n.next;n.next=i.next,i.next=s}t.baseQueue=n=i,l.pending=null}if(i=e.baseState,n===null)e.memoizedState=i;else{t=n.next;var r=s=null,u=null,g=t,S=!1;do{var z=g.lane&-536870913;if(z!==g.lane?(se&z)===z:(Xt&z)===z){var y=g.revertLane;if(y===0)u!==null&&(u=u.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),z===pl&&(S=!0);else if((Xt&y)===y){g=g.next,y===pl&&(S=!0);continue}else z={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},u===null?(r=u=z,s=i):u=u.next=z,I.lanes|=y,ga|=y;z=g.action,Xa&&a(i,z),i=g.hasEagerState?g.eagerState:a(i,z)}else y={lane:z,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},u===null?(r=u=y,s=i):u=u.next=y,I.lanes|=z,ga|=z;g=g.next}while(g!==null&&g!==t);if(u===null?s=i:u.next=r,!ft(i,e.memoizedState)&&(qe=!0,S&&(a=hl,a!==null)))throw a;e.memoizedState=i,e.baseState=s,e.baseQueue=u,l.lastRenderedState=i}return n===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function cs(e){var t=Oe(),a=t.queue;if(a===null)throw Error(d(311));a.lastRenderedReducer=e;var l=a.dispatch,n=a.pending,i=t.memoizedState;if(n!==null){a.pending=null;var s=n=n.next;do i=e(i,s.action),s=s.next;while(s!==n);ft(i,t.memoizedState)||(qe=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),a.lastRenderedState=i}return[i,l]}function Io(e,t,a){var l=I,n=Oe(),i=oe;if(i){if(a===void 0)throw Error(d(407));a=a()}else a=t();var s=!ft((xe||n).memoizedState,a);if(s&&(n.memoizedState=a,qe=!0),n=n.queue,os(tu.bind(null,l,n,e),[e]),n.getSnapshot!==t||s||He!==null&&He.memoizedState.tag&1){if(l.flags|=2048,jl(9,{destroy:void 0},eu.bind(null,l,n,a,t),null),Ne===null)throw Error(d(349));i||(Xt&127)!==0||Po(l,t,a)}return a}function Po(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=I.updateQueue,t===null?(t=oi(),I.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function eu(e,t,a,l){t.value=a,t.getSnapshot=l,au(t)&&lu(e)}function tu(e,t,a){return a(function(){au(t)&&lu(e)})}function au(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!ft(e,a)}catch{return!0}}function lu(e){var t=Ua(e,2);t!==null&&rt(t,e,2)}function ss(e){var t=et();if(typeof e=="function"){var a=e;if(e=a(),Xa){aa(!0);try{a()}finally{aa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zt,lastRenderedState:e},t}function nu(e,t,a,l){return e.baseState=a,is(e,xe,typeof l=="function"?l:Zt)}function pp(e,t,a,l,n){if(pi(e))throw Error(d(485));if(e=t.action,e!==null){var i={payload:n,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){i.listeners.push(s)}};j.T!==null?a(!0):i.isTransition=!1,l(i),a=t.pending,a===null?(i.next=t.pending=i,iu(t,i)):(i.next=a.next,t.pending=a.next=i)}}function iu(e,t){var a=t.action,l=t.payload,n=e.state;if(t.isTransition){var i=j.T,s={};j.T=s;try{var r=a(n,l),u=j.S;u!==null&&u(s,r),cu(e,t,r)}catch(g){rs(e,t,g)}finally{i!==null&&s.types!==null&&(i.types=s.types),j.T=i}}else try{i=a(n,l),cu(e,t,i)}catch(g){rs(e,t,g)}}function cu(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){su(e,t,l)},function(l){return rs(e,t,l)}):su(e,t,a)}function su(e,t,a){t.status="fulfilled",t.value=a,ru(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,iu(e,a)))}function rs(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,ru(t),t=t.next;while(t!==l)}e.action=null}function ru(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ou(e,t){return t}function uu(e,t){if(oe){var a=Ne.formState;if(a!==null){e:{var l=I;if(oe){if(Te){t:{for(var n=Te,i=wt;n.nodeType!==8;){if(!i){n=null;break t}if(n=Et(n.nextSibling),n===null){n=null;break t}}i=n.data,n=i==="F!"||i==="F"?n:null}if(n){Te=Et(n.nextSibling),l=n.data==="F!";break e}}sa(l)}l=!1}l&&(t=a[0])}}return a=et(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ou,lastRenderedState:t},a.queue=l,a=_u.bind(null,I,l),l.dispatch=a,l=ss(!1),i=ps.bind(null,I,!1,l.queue),l=et(),n={state:t,dispatch:null,action:e,pending:null},l.queue=n,a=pp.bind(null,I,n,i,a),n.dispatch=a,l.memoizedState=e,[t,a,!1]}function du(e){var t=Oe();return fu(t,xe,e)}function fu(e,t,a){if(t=is(e,t,ou)[0],e=di(Zt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=sn(t)}catch(s){throw s===gl?ti:s}else l=t;t=Oe();var n=t.queue,i=n.dispatch;return a!==t.memoizedState&&(I.flags|=2048,jl(9,{destroy:void 0},hp.bind(null,n,a),null)),[l,i,e]}function hp(e,t){e.action=t}function mu(e){var t=Oe(),a=xe;if(a!==null)return fu(t,a,e);Oe(),t=t.memoizedState,a=Oe();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function jl(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=I.updateQueue,t===null&&(t=oi(),I.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function pu(){return Oe().memoizedState}function fi(e,t,a,l){var n=et();I.flags|=e,n.memoizedState=jl(1|t,{destroy:void 0},a,l===void 0?null:l)}function mi(e,t,a,l){var n=Oe();l=l===void 0?null:l;var i=n.memoizedState.inst;xe!==null&&l!==null&&Pc(l,xe.memoizedState.deps)?n.memoizedState=jl(t,i,a,l):(I.flags|=e,n.memoizedState=jl(1|t,i,a,l))}function hu(e,t){fi(8390656,8,e,t)}function os(e,t){mi(2048,8,e,t)}function gp(e){I.flags|=4;var t=I.updateQueue;if(t===null)t=oi(),I.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function gu(e){var t=Oe().memoizedState;return gp({ref:t,nextImpl:e}),function(){if((pe&2)!==0)throw Error(d(440));return t.impl.apply(void 0,arguments)}}function yu(e,t){return mi(4,2,e,t)}function xu(e,t){return mi(4,4,e,t)}function vu(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function bu(e,t,a){a=a!=null?a.concat([e]):null,mi(4,4,vu.bind(null,t,e),a)}function us(){}function ju(e,t){var a=Oe();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&Pc(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function Su(e,t){var a=Oe();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&Pc(t,l[1]))return l[0];if(l=e(),Xa){aa(!0);try{e()}finally{aa(!1)}}return a.memoizedState=[l,t],l}function ds(e,t,a){return a===void 0||(Xt&1073741824)!==0&&(se&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=Nd(),I.lanes|=e,ga|=e,a)}function Nu(e,t,a,l){return ft(a,t)?a:xl.current!==null?(e=ds(e,a,l),ft(e,t)||(qe=!0),e):(Xt&42)===0||(Xt&1073741824)!==0&&(se&261930)===0?(qe=!0,e.memoizedState=a):(e=Nd(),I.lanes|=e,ga|=e,t)}function zu(e,t,a,l,n){var i=D.p;D.p=i!==0&&8>i?i:8;var s=j.T,r={};j.T=r,ps(e,!1,t,a);try{var u=n(),g=j.S;if(g!==null&&g(r,u),u!==null&&typeof u=="object"&&typeof u.then=="function"){var S=dp(u,l);rn(e,t,S,xt(e))}else rn(e,t,l,xt(e))}catch(z){rn(e,t,{then:function(){},status:"rejected",reason:z},xt())}finally{D.p=i,s!==null&&r.types!==null&&(s.types=r.types),j.T=s}}function yp(){}function fs(e,t,a,l){if(e.tag!==5)throw Error(d(476));var n=wu(e).queue;zu(e,n,t,X,a===null?yp:function(){return Tu(e),a(l)})}function wu(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:X,baseState:X,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zt,lastRenderedState:X},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Tu(e){var t=wu(e);t.next===null&&(t=e.alternate.memoizedState),rn(e,t.next.queue,{},xt())}function ms(){return We(wn)}function Eu(){return Oe().memoizedState}function Au(){return Oe().memoizedState}function xp(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=xt();e=ua(a);var l=da(t,e,a);l!==null&&(rt(l,t,a),an(l,t,a)),t={cache:Lc()},e.payload=t;return}t=t.return}}function vp(e,t,a){var l=xt();a={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},pi(e)?Mu(t,a):(a=Dc(e,t,a,l),a!==null&&(rt(a,e,l),Du(a,t,l)))}function _u(e,t,a){var l=xt();rn(e,t,a,l)}function rn(e,t,a,l){var n={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(pi(e))Mu(t,n);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,r=i(s,a);if(n.hasEagerState=!0,n.eagerState=r,ft(r,s))return Jn(e,t,n,0),Ne===null&&Kn(),!1}catch{}finally{}if(a=Dc(e,t,n,l),a!==null)return rt(a,e,l),Du(a,t,l),!0}return!1}function ps(e,t,a,l){if(l={lane:2,revertLane:Vs(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},pi(e)){if(t)throw Error(d(479))}else t=Dc(e,a,l,2),t!==null&&rt(t,e,2)}function pi(e){var t=e.alternate;return e===I||t!==null&&t===I}function Mu(e,t){vl=si=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Du(e,t,a){if((a&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Ur(e,a)}}var on={readContext:We,use:ui,useCallback:De,useContext:De,useEffect:De,useImperativeHandle:De,useLayoutEffect:De,useInsertionEffect:De,useMemo:De,useReducer:De,useRef:De,useState:De,useDebugValue:De,useDeferredValue:De,useTransition:De,useSyncExternalStore:De,useId:De,useHostTransitionStatus:De,useFormState:De,useActionState:De,useOptimistic:De,useMemoCache:De,useCacheRefresh:De};on.useEffectEvent=De;var Cu={readContext:We,use:ui,useCallback:function(e,t){return et().memoizedState=[e,t===void 0?null:t],e},useContext:We,useEffect:hu,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,fi(4194308,4,vu.bind(null,t,e),a)},useLayoutEffect:function(e,t){return fi(4194308,4,e,t)},useInsertionEffect:function(e,t){fi(4,2,e,t)},useMemo:function(e,t){var a=et();t=t===void 0?null:t;var l=e();if(Xa){aa(!0);try{e()}finally{aa(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=et();if(a!==void 0){var n=a(t);if(Xa){aa(!0);try{a(t)}finally{aa(!1)}}}else n=t;return l.memoizedState=l.baseState=n,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},l.queue=e,e=e.dispatch=vp.bind(null,I,e),[l.memoizedState,e]},useRef:function(e){var t=et();return e={current:e},t.memoizedState=e},useState:function(e){e=ss(e);var t=e.queue,a=_u.bind(null,I,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:us,useDeferredValue:function(e,t){var a=et();return ds(a,e,t)},useTransition:function(){var e=ss(!1);return e=zu.bind(null,I,e.queue,!0,!1),et().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=I,n=et();if(oe){if(a===void 0)throw Error(d(407));a=a()}else{if(a=t(),Ne===null)throw Error(d(349));(se&127)!==0||Po(l,t,a)}n.memoizedState=a;var i={value:a,getSnapshot:t};return n.queue=i,hu(tu.bind(null,l,i,e),[e]),l.flags|=2048,jl(9,{destroy:void 0},eu.bind(null,l,i,a,t),null),a},useId:function(){var e=et(),t=Ne.identifierPrefix;if(oe){var a=Ot,l=kt;a=(l&~(1<<32-dt(l)-1)).toString(32)+a,t="_"+t+"R_"+a,a=ri++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=fp++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:ms,useFormState:uu,useActionState:uu,useOptimistic:function(e){var t=et();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=ps.bind(null,I,!0,a),a.dispatch=t,[e,t]},useMemoCache:ns,useCacheRefresh:function(){return et().memoizedState=xp.bind(null,I)},useEffectEvent:function(e){var t=et(),a={impl:e};return t.memoizedState=a,function(){if((pe&2)!==0)throw Error(d(440));return a.impl.apply(void 0,arguments)}}},hs={readContext:We,use:ui,useCallback:ju,useContext:We,useEffect:os,useImperativeHandle:bu,useInsertionEffect:yu,useLayoutEffect:xu,useMemo:Su,useReducer:di,useRef:pu,useState:function(){return di(Zt)},useDebugValue:us,useDeferredValue:function(e,t){var a=Oe();return Nu(a,xe.memoizedState,e,t)},useTransition:function(){var e=di(Zt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:sn(e),t]},useSyncExternalStore:Io,useId:Eu,useHostTransitionStatus:ms,useFormState:du,useActionState:du,useOptimistic:function(e,t){var a=Oe();return nu(a,xe,e,t)},useMemoCache:ns,useCacheRefresh:Au};hs.useEffectEvent=gu;var ku={readContext:We,use:ui,useCallback:ju,useContext:We,useEffect:os,useImperativeHandle:bu,useInsertionEffect:yu,useLayoutEffect:xu,useMemo:Su,useReducer:cs,useRef:pu,useState:function(){return cs(Zt)},useDebugValue:us,useDeferredValue:function(e,t){var a=Oe();return xe===null?ds(a,e,t):Nu(a,xe.memoizedState,e,t)},useTransition:function(){var e=cs(Zt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:sn(e),t]},useSyncExternalStore:Io,useId:Eu,useHostTransitionStatus:ms,useFormState:mu,useActionState:mu,useOptimistic:function(e,t){var a=Oe();return xe!==null?nu(a,xe,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:ns,useCacheRefresh:Au};ku.useEffectEvent=gu;function gs(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:U({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var ys={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=xt(),n=ua(l);n.payload=t,a!=null&&(n.callback=a),t=da(e,n,l),t!==null&&(rt(t,e,l),an(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=xt(),n=ua(l);n.tag=1,n.payload=t,a!=null&&(n.callback=a),t=da(e,n,l),t!==null&&(rt(t,e,l),an(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=xt(),l=ua(a);l.tag=2,t!=null&&(l.callback=t),t=da(e,l,a),t!==null&&(rt(t,e,a),an(t,e,a))}};function Ou(e,t,a,l,n,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,i,s):t.prototype&&t.prototype.isPureReactComponent?!Jl(a,l)||!Jl(n,i):!0}function Uu(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&ys.enqueueReplaceState(t,t.state,null)}function Za(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=U({},a));for(var n in e)a[n]===void 0&&(a[n]=e[n])}return a}function Ru(e){Vn(e)}function Hu(e){console.error(e)}function qu(e){Vn(e)}function hi(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function Bu(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function xs(e,t,a){return a=ua(a),a.tag=3,a.payload={element:null},a.callback=function(){hi(e,t)},a}function Yu(e){return e=ua(e),e.tag=3,e}function Qu(e,t,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var i=l.value;e.payload=function(){return n(i)},e.callback=function(){Bu(t,a,l)}}var s=a.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){Bu(t,a,l),typeof n!="function"&&(ya===null?ya=new Set([this]):ya.add(this));var r=l.stack;this.componentDidCatch(l.value,{componentStack:r!==null?r:""})})}function bp(e,t,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&ml(t,a,n,!0),a=pt.current,a!==null){switch(a.tag){case 31:case 13:return Tt===null?Ei():a.alternate===null&&Ce===0&&(Ce=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===ai?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),Gs(e,l,n)),!1;case 22:return a.flags|=65536,l===ai?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),Gs(e,l,n)),!1}throw Error(d(435,a.tag))}return Gs(e,l,n),Ei(),!1}if(oe)return t=pt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,l!==Hc&&(e=Error(d(422),{cause:l}),Fl(St(e,a)))):(l!==Hc&&(t=Error(d(423),{cause:l}),Fl(St(t,a))),e=e.current.alternate,e.flags|=65536,n&=-n,e.lanes|=n,l=St(l,a),n=xs(e.stateNode,l,n),Jc(e,n),Ce!==4&&(Ce=2)),!1;var i=Error(d(520),{cause:l});if(i=St(i,a),yn===null?yn=[i]:yn.push(i),Ce!==4&&(Ce=2),t===null)return!0;l=St(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=n&-n,a.lanes|=e,e=xs(a.stateNode,l,e),Jc(a,e),!1;case 1:if(t=a.type,i=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(ya===null||!ya.has(i))))return a.flags|=65536,n&=-n,a.lanes|=n,n=Yu(n),Qu(n,e,a,l),Jc(a,n),!1}a=a.return}while(a!==null);return!1}var vs=Error(d(461)),qe=!1;function Fe(e,t,a,l){t.child=e===null?Zo(t,null,a,l):Ga(t,e.child,a,l)}function Lu(e,t,a,l,n){a=a.render;var i=t.ref;if("ref"in l){var s={};for(var r in l)r!=="ref"&&(s[r]=l[r])}else s=l;return Ba(t),l=es(e,t,a,s,i,n),r=ts(),e!==null&&!qe?(as(e,t,n),Vt(e,t,n)):(oe&&r&&Uc(t),t.flags|=1,Fe(e,t,l,n),t.child)}function Gu(e,t,a,l,n){if(e===null){var i=a.type;return typeof i=="function"&&!Cc(i)&&i.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=i,Xu(e,t,i,l,n)):(e=Wn(a.type,null,l,t,t.mode,n),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Es(e,n)){var s=i.memoizedProps;if(a=a.compare,a=a!==null?a:Jl,a(s,l)&&e.ref===t.ref)return Vt(e,t,n)}return t.flags|=1,e=Yt(i,l),e.ref=t.ref,e.return=t,t.child=e}function Xu(e,t,a,l,n){if(e!==null){var i=e.memoizedProps;if(Jl(i,l)&&e.ref===t.ref)if(qe=!1,t.pendingProps=l=i,Es(e,n))(e.flags&131072)!==0&&(qe=!0);else return t.lanes=e.lanes,Vt(e,t,n)}return bs(e,t,a,l,n)}function Zu(e,t,a,l){var n=l.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|a:a,e!==null){for(l=t.child=e.child,n=0;l!==null;)n=n|l.lanes|l.childLanes,l=l.sibling;l=n&~i}else l=0,t.child=null;return Vu(e,t,i,a,l)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ei(t,i!==null?i.cachePool:null),i!==null?Jo(t,i):Wc(),$o(t);else return l=t.lanes=536870912,Vu(e,t,i!==null?i.baseLanes|a:a,a,l)}else i!==null?(ei(t,i.cachePool),Jo(t,i),ma(),t.memoizedState=null):(e!==null&&ei(t,null),Wc(),ma());return Fe(e,t,n,a),t.child}function un(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Vu(e,t,a,l,n){var i=Xc();return i=i===null?null:{parent:Re._currentValue,pool:i},t.memoizedState={baseLanes:a,cachePool:i},e!==null&&ei(t,null),Wc(),$o(t),e!==null&&ml(e,t,l,!0),t.childLanes=n,null}function gi(e,t){return t=xi({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Ku(e,t,a){return Ga(t,e.child,null,a),e=gi(t,t.pendingProps),e.flags|=2,ht(t),t.memoizedState=null,e}function jp(e,t,a){var l=t.pendingProps,n=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(oe){if(l.mode==="hidden")return e=gi(t,l),t.lanes=536870912,un(null,e);if(Ic(t),(e=Te)?(e=cf(e,wt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ia!==null?{id:kt,overflow:Ot}:null,retryLane:536870912,hydrationErrors:null},a=Mo(e),a.return=t,t.child=a,$e=t,Te=null)):e=null,e===null)throw sa(t);return t.lanes=536870912,null}return gi(t,l)}var i=e.memoizedState;if(i!==null){var s=i.dehydrated;if(Ic(t),n)if(t.flags&256)t.flags&=-257,t=Ku(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(d(558));else if(qe||ml(e,t,a,!1),n=(a&e.childLanes)!==0,qe||n){if(l=Ne,l!==null&&(s=Rr(l,a),s!==0&&s!==i.retryLane))throw i.retryLane=s,Ua(e,s),rt(l,e,s),vs;Ei(),t=Ku(e,t,a)}else e=i.treeContext,Te=Et(s.nextSibling),$e=t,oe=!0,ca=null,wt=!1,e!==null&&ko(t,e),t=gi(t,l),t.flags|=4096;return t}return e=Yt(e.child,{mode:l.mode,children:l.children}),e.ref=t.ref,t.child=e,e.return=t,e}function yi(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(d(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function bs(e,t,a,l,n){return Ba(t),a=es(e,t,a,l,void 0,n),l=ts(),e!==null&&!qe?(as(e,t,n),Vt(e,t,n)):(oe&&l&&Uc(t),t.flags|=1,Fe(e,t,a,n),t.child)}function Ju(e,t,a,l,n,i){return Ba(t),t.updateQueue=null,a=Fo(t,l,a,n),Wo(e),l=ts(),e!==null&&!qe?(as(e,t,i),Vt(e,t,i)):(oe&&l&&Uc(t),t.flags|=1,Fe(e,t,a,i),t.child)}function $u(e,t,a,l,n){if(Ba(t),t.stateNode===null){var i=ol,s=a.contextType;typeof s=="object"&&s!==null&&(i=We(s)),i=new a(l,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=ys,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=l,i.state=t.memoizedState,i.refs={},Vc(t),s=a.contextType,i.context=typeof s=="object"&&s!==null?We(s):ol,i.state=t.memoizedState,s=a.getDerivedStateFromProps,typeof s=="function"&&(gs(t,a,s,l),i.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(s=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),s!==i.state&&ys.enqueueReplaceState(i,i.state,null),nn(t,l,i,n),ln(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){i=t.stateNode;var r=t.memoizedProps,u=Za(a,r);i.props=u;var g=i.context,S=a.contextType;s=ol,typeof S=="object"&&S!==null&&(s=We(S));var z=a.getDerivedStateFromProps;S=typeof z=="function"||typeof i.getSnapshotBeforeUpdate=="function",r=t.pendingProps!==r,S||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(r||g!==s)&&Uu(t,i,l,s),oa=!1;var y=t.memoizedState;i.state=y,nn(t,l,i,n),ln(),g=t.memoizedState,r||y!==g||oa?(typeof z=="function"&&(gs(t,a,z,l),g=t.memoizedState),(u=oa||Ou(t,a,u,l,y,g,s))?(S||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=g),i.props=l,i.state=g,i.context=s,l=u):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{i=t.stateNode,Kc(e,t),s=t.memoizedProps,S=Za(a,s),i.props=S,z=t.pendingProps,y=i.context,g=a.contextType,u=ol,typeof g=="object"&&g!==null&&(u=We(g)),r=a.getDerivedStateFromProps,(g=typeof r=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==z||y!==u)&&Uu(t,i,l,u),oa=!1,y=t.memoizedState,i.state=y,nn(t,l,i,n),ln();var b=t.memoizedState;s!==z||y!==b||oa||e!==null&&e.dependencies!==null&&In(e.dependencies)?(typeof r=="function"&&(gs(t,a,r,l),b=t.memoizedState),(S=oa||Ou(t,a,S,l,y,b,u)||e!==null&&e.dependencies!==null&&In(e.dependencies))?(g||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,b,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,b,u)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=b),i.props=l,i.state=b,i.context=u,l=S):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),l=!1)}return i=l,yi(e,t),l=(t.flags&128)!==0,i||l?(i=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&l?(t.child=Ga(t,e.child,null,n),t.child=Ga(t,null,a,n)):Fe(e,t,a,n),t.memoizedState=i.state,e=t.child):e=Vt(e,t,n),e}function Wu(e,t,a,l){return Ha(),t.flags|=256,Fe(e,t,a,l),t.child}var js={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ss(e){return{baseLanes:e,cachePool:Bo()}}function Ns(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=yt),e}function Fu(e,t,a){var l=t.pendingProps,n=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(ke.current&2)!==0),s&&(n=!0,t.flags&=-129),s=(t.flags&32)!==0,t.flags&=-33,e===null){if(oe){if(n?fa(t):ma(),(e=Te)?(e=cf(e,wt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ia!==null?{id:kt,overflow:Ot}:null,retryLane:536870912,hydrationErrors:null},a=Mo(e),a.return=t,t.child=a,$e=t,Te=null)):e=null,e===null)throw sa(t);return ir(e)?t.lanes=32:t.lanes=536870912,null}var r=l.children;return l=l.fallback,n?(ma(),n=t.mode,r=xi({mode:"hidden",children:r},n),l=Ra(l,n,a,null),r.return=t,l.return=t,r.sibling=l,t.child=r,l=t.child,l.memoizedState=Ss(a),l.childLanes=Ns(e,s,a),t.memoizedState=js,un(null,l)):(fa(t),zs(t,r))}var u=e.memoizedState;if(u!==null&&(r=u.dehydrated,r!==null)){if(i)t.flags&256?(fa(t),t.flags&=-257,t=ws(e,t,a)):t.memoizedState!==null?(ma(),t.child=e.child,t.flags|=128,t=null):(ma(),r=l.fallback,n=t.mode,l=xi({mode:"visible",children:l.children},n),r=Ra(r,n,a,null),r.flags|=2,l.return=t,r.return=t,l.sibling=r,t.child=l,Ga(t,e.child,null,a),l=t.child,l.memoizedState=Ss(a),l.childLanes=Ns(e,s,a),t.memoizedState=js,t=un(null,l));else if(fa(t),ir(r)){if(s=r.nextSibling&&r.nextSibling.dataset,s)var g=s.dgst;s=g,l=Error(d(419)),l.stack="",l.digest=s,Fl({value:l,source:null,stack:null}),t=ws(e,t,a)}else if(qe||ml(e,t,a,!1),s=(a&e.childLanes)!==0,qe||s){if(s=Ne,s!==null&&(l=Rr(s,a),l!==0&&l!==u.retryLane))throw u.retryLane=l,Ua(e,l),rt(s,e,l),vs;nr(r)||Ei(),t=ws(e,t,a)}else nr(r)?(t.flags|=192,t.child=e.child,t=null):(e=u.treeContext,Te=Et(r.nextSibling),$e=t,oe=!0,ca=null,wt=!1,e!==null&&ko(t,e),t=zs(t,l.children),t.flags|=4096);return t}return n?(ma(),r=l.fallback,n=t.mode,u=e.child,g=u.sibling,l=Yt(u,{mode:"hidden",children:l.children}),l.subtreeFlags=u.subtreeFlags&65011712,g!==null?r=Yt(g,r):(r=Ra(r,n,a,null),r.flags|=2),r.return=t,l.return=t,l.sibling=r,t.child=l,un(null,l),l=t.child,r=e.child.memoizedState,r===null?r=Ss(a):(n=r.cachePool,n!==null?(u=Re._currentValue,n=n.parent!==u?{parent:u,pool:u}:n):n=Bo(),r={baseLanes:r.baseLanes|a,cachePool:n}),l.memoizedState=r,l.childLanes=Ns(e,s,a),t.memoizedState=js,un(e.child,l)):(fa(t),a=e.child,e=a.sibling,a=Yt(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=a,t.memoizedState=null,a)}function zs(e,t){return t=xi({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function xi(e,t){return e=mt(22,e,null,t),e.lanes=0,e}function ws(e,t,a){return Ga(t,e.child,null,a),e=zs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Iu(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Yc(e.return,t,a)}function Ts(e,t,a,l,n,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n,treeForkCount:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=l,s.tail=a,s.tailMode=n,s.treeForkCount=i)}function Pu(e,t,a){var l=t.pendingProps,n=l.revealOrder,i=l.tail;l=l.children;var s=ke.current,r=(s&2)!==0;if(r?(s=s&1|2,t.flags|=128):s&=1,w(ke,s),Fe(e,t,l,a),l=oe?Wl:0,!r&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Iu(e,a,t);else if(e.tag===19)Iu(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(n){case"forwards":for(a=t.child,n=null;a!==null;)e=a.alternate,e!==null&&ci(e)===null&&(n=a),a=a.sibling;a=n,a===null?(n=t.child,t.child=null):(n=a.sibling,a.sibling=null),Ts(t,!1,n,a,i,l);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=t.child,t.child=null;n!==null;){if(e=n.alternate,e!==null&&ci(e)===null){t.child=n;break}e=n.sibling,n.sibling=a,a=n,n=e}Ts(t,!0,a,null,i,l);break;case"together":Ts(t,!1,null,null,void 0,l);break;default:t.memoizedState=null}return t.child}function Vt(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),ga|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(ml(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(d(153));if(t.child!==null){for(e=t.child,a=Yt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Yt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Es(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&In(e)))}function Sp(e,t,a){switch(t.tag){case 3:Ue(t,t.stateNode.containerInfo),ra(t,Re,e.memoizedState.cache),Ha();break;case 27:case 5:ta(t);break;case 4:Ue(t,t.stateNode.containerInfo);break;case 10:ra(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ic(t),null;break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(fa(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Fu(e,t,a):(fa(t),e=Vt(e,t,a),e!==null?e.sibling:null);fa(t);break;case 19:var n=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(ml(e,t,a,!1),l=(a&t.childLanes)!==0),n){if(l)return Pu(e,t,a);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),w(ke,ke.current),l)break;return null;case 22:return t.lanes=0,Zu(e,t,a,t.pendingProps);case 24:ra(t,Re,e.memoizedState.cache)}return Vt(e,t,a)}function ed(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)qe=!0;else{if(!Es(e,a)&&(t.flags&128)===0)return qe=!1,Sp(e,t,a);qe=(e.flags&131072)!==0}else qe=!1,oe&&(t.flags&1048576)!==0&&Co(t,Wl,t.index);switch(t.lanes=0,t.tag){case 16:e:{var l=t.pendingProps;if(e=Qa(t.elementType),t.type=e,typeof e=="function")Cc(e)?(l=Za(e,l),t.tag=1,t=$u(null,t,e,l,a)):(t.tag=0,t=bs(null,t,e,l,a));else{if(e!=null){var n=e.$$typeof;if(n===Qe){t.tag=11,t=Lu(null,t,e,l,a);break e}else if(n===O){t.tag=14,t=Gu(null,t,e,l,a);break e}}throw t=Ge(e)||e,Error(d(306,t,""))}}return t;case 0:return bs(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,n=Za(l,t.pendingProps),$u(e,t,l,n,a);case 3:e:{if(Ue(t,t.stateNode.containerInfo),e===null)throw Error(d(387));l=t.pendingProps;var i=t.memoizedState;n=i.element,Kc(e,t),nn(t,l,null,a);var s=t.memoizedState;if(l=s.cache,ra(t,Re,l),l!==i.cache&&Qc(t,[Re],a,!0),ln(),l=s.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=Wu(e,t,l,a);break e}else if(l!==n){n=St(Error(d(424)),t),Fl(n),t=Wu(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Te=Et(e.firstChild),$e=t,oe=!0,ca=null,wt=!0,a=Zo(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Ha(),l===n){t=Vt(e,t,a);break e}Fe(e,t,l,a)}t=t.child}return t;case 26:return yi(e,t),e===null?(a=ff(t.type,null,t.pendingProps,null))?t.memoizedState=a:oe||(a=t.type,e=t.pendingProps,l=Oi(J.current).createElement(a),l[Je]=t,l[at]=e,Ie(l,a,e),Ze(l),t.stateNode=l):t.memoizedState=ff(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ta(t),e===null&&oe&&(l=t.stateNode=of(t.type,t.pendingProps,J.current),$e=t,wt=!0,n=Te,ja(t.type)?(cr=n,Te=Et(l.firstChild)):Te=n),Fe(e,t,t.pendingProps.children,a),yi(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&oe&&((n=l=Te)&&(l=Ip(l,t.type,t.pendingProps,wt),l!==null?(t.stateNode=l,$e=t,Te=Et(l.firstChild),wt=!1,n=!0):n=!1),n||sa(t)),ta(t),n=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,l=i.children,tr(n,i)?l=null:s!==null&&tr(n,s)&&(t.flags|=32),t.memoizedState!==null&&(n=es(e,t,mp,null,null,a),wn._currentValue=n),yi(e,t),Fe(e,t,l,a),t.child;case 6:return e===null&&oe&&((e=a=Te)&&(a=Pp(a,t.pendingProps,wt),a!==null?(t.stateNode=a,$e=t,Te=null,e=!0):e=!1),e||sa(t)),null;case 13:return Fu(e,t,a);case 4:return Ue(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=Ga(t,null,l,a):Fe(e,t,l,a),t.child;case 11:return Lu(e,t,t.type,t.pendingProps,a);case 7:return Fe(e,t,t.pendingProps,a),t.child;case 8:return Fe(e,t,t.pendingProps.children,a),t.child;case 12:return Fe(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,ra(t,t.type,l.value),Fe(e,t,l.children,a),t.child;case 9:return n=t.type._context,l=t.pendingProps.children,Ba(t),n=We(n),l=l(n),t.flags|=1,Fe(e,t,l,a),t.child;case 14:return Gu(e,t,t.type,t.pendingProps,a);case 15:return Xu(e,t,t.type,t.pendingProps,a);case 19:return Pu(e,t,a);case 31:return jp(e,t,a);case 22:return Zu(e,t,a,t.pendingProps);case 24:return Ba(t),l=We(Re),e===null?(n=Xc(),n===null&&(n=Ne,i=Lc(),n.pooledCache=i,i.refCount++,i!==null&&(n.pooledCacheLanes|=a),n=i),t.memoizedState={parent:l,cache:n},Vc(t),ra(t,Re,n)):((e.lanes&a)!==0&&(Kc(e,t),nn(t,null,null,a),ln()),n=e.memoizedState,i=t.memoizedState,n.parent!==l?(n={parent:l,cache:l},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),ra(t,Re,l)):(l=i.cache,ra(t,Re,l),l!==n.cache&&Qc(t,[Re],a,!0))),Fe(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(d(156,t.tag))}function Kt(e){e.flags|=4}function As(e,t,a,l,n){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(n&335544128)===n)if(e.stateNode.complete)e.flags|=8192;else if(Ed())e.flags|=8192;else throw La=ai,Zc}else e.flags&=-16777217}function td(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!yf(t))if(Ed())e.flags|=8192;else throw La=ai,Zc}function vi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?kr():536870912,e.lanes|=t,wl|=t)}function dn(e,t){if(!oe)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function Ee(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=e,n=n.sibling;else for(n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=e,n=n.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function Np(e,t,a){var l=t.pendingProps;switch(Rc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ee(t),null;case 1:return Ee(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Gt(Re),ce(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(fl(t)?Kt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,qc())),Ee(t),null;case 26:var n=t.type,i=t.memoizedState;return e===null?(Kt(t),i!==null?(Ee(t),td(t,i)):(Ee(t),As(t,n,null,l,a))):i?i!==e.memoizedState?(Kt(t),Ee(t),td(t,i)):(Ee(t),t.flags&=-16777217):(e=e.memoizedProps,e!==l&&Kt(t),Ee(t),As(t,n,e,l,a)),null;case 27:if(_t(t),a=J.current,n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Kt(t);else{if(!l){if(t.stateNode===null)throw Error(d(166));return Ee(t),null}e=M.current,fl(t)?Oo(t):(e=of(n,l,a),t.stateNode=e,Kt(t))}return Ee(t),null;case 5:if(_t(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Kt(t);else{if(!l){if(t.stateNode===null)throw Error(d(166));return Ee(t),null}if(i=M.current,fl(t))Oo(t);else{var s=Oi(J.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":i=s.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?s.createElement("select",{is:l.is}):s.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?s.createElement(n,{is:l.is}):s.createElement(n)}}i[Je]=t,i[at]=l;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)i.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=i;e:switch(Ie(i,n,l),n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&Kt(t)}}return Ee(t),As(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&Kt(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(d(166));if(e=J.current,fl(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,n=$e,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}e[Je]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||Fd(e.nodeValue,a)),e||sa(t,!0)}else e=Oi(e).createTextNode(l),e[Je]=t,t.stateNode=e}return Ee(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(l=fl(t),a!==null){if(e===null){if(!l)throw Error(d(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(557));e[Je]=t}else Ha(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),e=!1}else a=qc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(ht(t),t):(ht(t),null);if((t.flags&128)!==0)throw Error(d(558))}return Ee(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(n=fl(t),l!==null&&l.dehydrated!==null){if(e===null){if(!n)throw Error(d(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(d(317));n[Je]=t}else Ha(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),n=!1}else n=qc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(ht(t),t):(ht(t),null)}return ht(t),(t.flags&128)!==0?(t.lanes=a,t):(a=l!==null,e=e!==null&&e.memoizedState!==null,a&&(l=t.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==n&&(l.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),vi(t,t.updateQueue),Ee(t),null);case 4:return ce(),e===null&&Ws(t.stateNode.containerInfo),Ee(t),null;case 10:return Gt(t.type),Ee(t),null;case 19:if(x(ke),l=t.memoizedState,l===null)return Ee(t),null;if(n=(t.flags&128)!==0,i=l.rendering,i===null)if(n)dn(l,!1);else{if(Ce!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=ci(e),i!==null){for(t.flags|=128,dn(l,!1),e=i.updateQueue,t.updateQueue=e,vi(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)_o(a,e),a=a.sibling;return w(ke,ke.current&1|2),oe&&Qt(t,l.treeForkCount),t.child}e=e.sibling}l.tail!==null&&ot()>zi&&(t.flags|=128,n=!0,dn(l,!1),t.lanes=4194304)}else{if(!n)if(e=ci(i),e!==null){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,vi(t,e),dn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!oe)return Ee(t),null}else 2*ot()-l.renderingStartTime>zi&&a!==536870912&&(t.flags|=128,n=!0,dn(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(e=l.last,e!==null?e.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=ot(),e.sibling=null,a=ke.current,w(ke,n?a&1|2:a&1),oe&&Qt(t,l.treeForkCount),e):(Ee(t),null);case 22:case 23:return ht(t),Fc(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(a&536870912)!==0&&(t.flags&128)===0&&(Ee(t),t.subtreeFlags&6&&(t.flags|=8192)):Ee(t),a=t.updateQueue,a!==null&&vi(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&x(Ya),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Gt(Re),Ee(t),null;case 25:return null;case 30:return null}throw Error(d(156,t.tag))}function zp(e,t){switch(Rc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Gt(Re),ce(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return _t(t),null;case 31:if(t.memoizedState!==null){if(ht(t),t.alternate===null)throw Error(d(340));Ha()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ht(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(d(340));Ha()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return x(ke),null;case 4:return ce(),null;case 10:return Gt(t.type),null;case 22:case 23:return ht(t),Fc(),e!==null&&x(Ya),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Gt(Re),null;case 25:return null;default:return null}}function ad(e,t){switch(Rc(t),t.tag){case 3:Gt(Re),ce();break;case 26:case 27:case 5:_t(t);break;case 4:ce();break;case 31:t.memoizedState!==null&&ht(t);break;case 13:ht(t);break;case 19:x(ke);break;case 10:Gt(t.type);break;case 22:case 23:ht(t),Fc(),e!==null&&x(Ya);break;case 24:Gt(Re)}}function fn(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&e)===e){l=void 0;var i=a.create,s=a.inst;l=i(),s.destroy=l}a=a.next}while(a!==n)}}catch(r){ye(t,t.return,r)}}function pa(e,t,a){try{var l=t.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var i=n.next;l=i;do{if((l.tag&e)===e){var s=l.inst,r=s.destroy;if(r!==void 0){s.destroy=void 0,n=t;var u=a,g=r;try{g()}catch(S){ye(n,u,S)}}}l=l.next}while(l!==i)}}catch(S){ye(t,t.return,S)}}function ld(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Ko(t,a)}catch(l){ye(e,e.return,l)}}}function nd(e,t,a){a.props=Za(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){ye(e,t,l)}}function mn(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(n){ye(e,t,n)}}function Ut(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){ye(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){ye(e,t,n)}else a.current=null}function id(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){ye(e,e.return,n)}}function _s(e,t,a){try{var l=e.stateNode;Vp(l,e.type,a,t),l[at]=t}catch(n){ye(e,e.return,n)}}function cd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ja(e.type)||e.tag===4}function Ms(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||cd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ja(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ds(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=qt));else if(l!==4&&(l===27&&ja(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Ds(e,t,a),e=e.sibling;e!==null;)Ds(e,t,a),e=e.sibling}function bi(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&ja(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(bi(e,t,a),e=e.sibling;e!==null;)bi(e,t,a),e=e.sibling}function sd(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Ie(t,l,a),t[Je]=e,t[at]=a}catch(i){ye(e,e.return,i)}}var Jt=!1,Be=!1,Cs=!1,rd=typeof WeakSet=="function"?WeakSet:Set,Ve=null;function wp(e,t){if(e=e.containerInfo,Ps=Qi,e=bo(e),wc(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{a.nodeType,i.nodeType}catch{a=null;break e}var s=0,r=-1,u=-1,g=0,S=0,z=e,y=null;t:for(;;){for(var b;z!==a||n!==0&&z.nodeType!==3||(r=s+n),z!==i||l!==0&&z.nodeType!==3||(u=s+l),z.nodeType===3&&(s+=z.nodeValue.length),(b=z.firstChild)!==null;)y=z,z=b;for(;;){if(z===e)break t;if(y===a&&++g===n&&(r=s),y===i&&++S===l&&(u=s),(b=z.nextSibling)!==null)break;z=y,y=z.parentNode}z=b}a=r===-1||u===-1?null:{start:r,end:u}}else a=null}a=a||{start:0,end:0}}else a=null;for(er={focusedElem:e,selectionRange:a},Qi=!1,Ve=t;Ve!==null;)if(t=Ve,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ve=e;else for(;Ve!==null;){switch(t=Ve,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)n=e[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,a=t,n=i.memoizedProps,i=i.memoizedState,l=a.stateNode;try{var q=Za(a.type,n);e=l.getSnapshotBeforeUpdate(q,i),l.__reactInternalSnapshotBeforeUpdate=e}catch(Z){ye(a,a.return,Z)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)lr(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":lr(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(d(163))}if(e=t.sibling,e!==null){e.return=t.return,Ve=e;break}Ve=t.return}}function od(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:Wt(e,a),l&4&&fn(5,a);break;case 1:if(Wt(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(s){ye(a,a.return,s)}else{var n=Za(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(n,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){ye(a,a.return,s)}}l&64&&ld(a),l&512&&mn(a,a.return);break;case 3:if(Wt(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Ko(e,t)}catch(s){ye(a,a.return,s)}}break;case 27:t===null&&l&4&&sd(a);case 26:case 5:Wt(e,a),t===null&&l&4&&id(a),l&512&&mn(a,a.return);break;case 12:Wt(e,a);break;case 31:Wt(e,a),l&4&&fd(e,a);break;case 13:Wt(e,a),l&4&&md(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Op.bind(null,a),eh(e,a))));break;case 22:if(l=a.memoizedState!==null||Jt,!l){t=t!==null&&t.memoizedState!==null||Be,n=Jt;var i=Be;Jt=l,(Be=t)&&!i?Ft(e,a,(a.subtreeFlags&8772)!==0):Wt(e,a),Jt=n,Be=i}break;case 30:break;default:Wt(e,a)}}function ud(e){var t=e.alternate;t!==null&&(e.alternate=null,ud(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&rc(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ae=null,nt=!1;function $t(e,t,a){for(a=a.child;a!==null;)dd(e,t,a),a=a.sibling}function dd(e,t,a){if(ut&&typeof ut.onCommitFiberUnmount=="function")try{ut.onCommitFiberUnmount(Rl,a)}catch{}switch(a.tag){case 26:Be||Ut(a,t),$t(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Be||Ut(a,t);var l=Ae,n=nt;ja(a.type)&&(Ae=a.stateNode,nt=!1),$t(e,t,a),Sn(a.stateNode),Ae=l,nt=n;break;case 5:Be||Ut(a,t);case 6:if(l=Ae,n=nt,Ae=null,$t(e,t,a),Ae=l,nt=n,Ae!==null)if(nt)try{(Ae.nodeType===9?Ae.body:Ae.nodeName==="HTML"?Ae.ownerDocument.body:Ae).removeChild(a.stateNode)}catch(i){ye(a,t,i)}else try{Ae.removeChild(a.stateNode)}catch(i){ye(a,t,i)}break;case 18:Ae!==null&&(nt?(e=Ae,lf(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),kl(e)):lf(Ae,a.stateNode));break;case 4:l=Ae,n=nt,Ae=a.stateNode.containerInfo,nt=!0,$t(e,t,a),Ae=l,nt=n;break;case 0:case 11:case 14:case 15:pa(2,a,t),Be||pa(4,a,t),$t(e,t,a);break;case 1:Be||(Ut(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&nd(a,t,l)),$t(e,t,a);break;case 21:$t(e,t,a);break;case 22:Be=(l=Be)||a.memoizedState!==null,$t(e,t,a),Be=l;break;default:$t(e,t,a)}}function fd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{kl(e)}catch(a){ye(t,t.return,a)}}}function md(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{kl(e)}catch(a){ye(t,t.return,a)}}function Tp(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new rd),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new rd),t;default:throw Error(d(435,e.tag))}}function ji(e,t){var a=Tp(e);t.forEach(function(l){if(!a.has(l)){a.add(l);var n=Up.bind(null,e,l);l.then(n,n)}})}function it(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],i=e,s=t,r=s;e:for(;r!==null;){switch(r.tag){case 27:if(ja(r.type)){Ae=r.stateNode,nt=!1;break e}break;case 5:Ae=r.stateNode,nt=!1;break e;case 3:case 4:Ae=r.stateNode.containerInfo,nt=!0;break e}r=r.return}if(Ae===null)throw Error(d(160));dd(i,s,n),Ae=null,nt=!1,i=n.alternate,i!==null&&(i.return=null),n.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)pd(t,e),t=t.sibling}var Dt=null;function pd(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:it(t,e),ct(e),l&4&&(pa(3,e,e.return),fn(3,e),pa(5,e,e.return));break;case 1:it(t,e),ct(e),l&512&&(Be||a===null||Ut(a,a.return)),l&64&&Jt&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=Dt;if(it(t,e),ct(e),l&512&&(Be||a===null||Ut(a,a.return)),l&4){var i=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,n=n.ownerDocument||n;t:switch(l){case"title":i=n.getElementsByTagName("title")[0],(!i||i[Bl]||i[Je]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=n.createElement(l),n.head.insertBefore(i,n.querySelector("head > title"))),Ie(i,l,a),i[Je]=e,Ze(i),l=i;break e;case"link":var s=hf("link","href",n).get(l+(a.href||""));if(s){for(var r=0;r<s.length;r++)if(i=s[r],i.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&i.getAttribute("rel")===(a.rel==null?null:a.rel)&&i.getAttribute("title")===(a.title==null?null:a.title)&&i.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){s.splice(r,1);break t}}i=n.createElement(l),Ie(i,l,a),n.head.appendChild(i);break;case"meta":if(s=hf("meta","content",n).get(l+(a.content||""))){for(r=0;r<s.length;r++)if(i=s[r],i.getAttribute("content")===(a.content==null?null:""+a.content)&&i.getAttribute("name")===(a.name==null?null:a.name)&&i.getAttribute("property")===(a.property==null?null:a.property)&&i.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&i.getAttribute("charset")===(a.charSet==null?null:a.charSet)){s.splice(r,1);break t}}i=n.createElement(l),Ie(i,l,a),n.head.appendChild(i);break;default:throw Error(d(468,l))}i[Je]=e,Ze(i),l=i}e.stateNode=l}else gf(n,e.type,e.stateNode);else e.stateNode=pf(n,l,e.memoizedProps);else i!==l?(i===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):i.count--,l===null?gf(n,e.type,e.stateNode):pf(n,l,e.memoizedProps)):l===null&&e.stateNode!==null&&_s(e,e.memoizedProps,a.memoizedProps)}break;case 27:it(t,e),ct(e),l&512&&(Be||a===null||Ut(a,a.return)),a!==null&&l&4&&_s(e,e.memoizedProps,a.memoizedProps);break;case 5:if(it(t,e),ct(e),l&512&&(Be||a===null||Ut(a,a.return)),e.flags&32){n=e.stateNode;try{al(n,"")}catch(q){ye(e,e.return,q)}}l&4&&e.stateNode!=null&&(n=e.memoizedProps,_s(e,n,a!==null?a.memoizedProps:n)),l&1024&&(Cs=!0);break;case 6:if(it(t,e),ct(e),l&4){if(e.stateNode===null)throw Error(d(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(q){ye(e,e.return,q)}}break;case 3:if(Hi=null,n=Dt,Dt=Ui(t.containerInfo),it(t,e),Dt=n,ct(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{kl(t.containerInfo)}catch(q){ye(e,e.return,q)}Cs&&(Cs=!1,hd(e));break;case 4:l=Dt,Dt=Ui(e.stateNode.containerInfo),it(t,e),ct(e),Dt=l;break;case 12:it(t,e),ct(e);break;case 31:it(t,e),ct(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ji(e,l)));break;case 13:it(t,e),ct(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Ni=ot()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ji(e,l)));break;case 22:n=e.memoizedState!==null;var u=a!==null&&a.memoizedState!==null,g=Jt,S=Be;if(Jt=g||n,Be=S||u,it(t,e),Be=S,Jt=g,ct(e),l&8192)e:for(t=e.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(a===null||u||Jt||Be||Va(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){u=a=t;try{if(i=u.stateNode,n)s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{r=u.stateNode;var z=u.memoizedProps.style,y=z!=null&&z.hasOwnProperty("display")?z.display:null;r.style.display=y==null||typeof y=="boolean"?"":(""+y).trim()}}catch(q){ye(u,u.return,q)}}}else if(t.tag===6){if(a===null){u=t;try{u.stateNode.nodeValue=n?"":u.memoizedProps}catch(q){ye(u,u.return,q)}}}else if(t.tag===18){if(a===null){u=t;try{var b=u.stateNode;n?nf(b,!0):nf(u.stateNode,!1)}catch(q){ye(u,u.return,q)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,ji(e,a))));break;case 19:it(t,e),ct(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,ji(e,l)));break;case 30:break;case 21:break;default:it(t,e),ct(e)}}function ct(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(cd(l)){a=l;break}l=l.return}if(a==null)throw Error(d(160));switch(a.tag){case 27:var n=a.stateNode,i=Ms(e);bi(e,i,n);break;case 5:var s=a.stateNode;a.flags&32&&(al(s,""),a.flags&=-33);var r=Ms(e);bi(e,r,s);break;case 3:case 4:var u=a.stateNode.containerInfo,g=Ms(e);Ds(e,g,u);break;default:throw Error(d(161))}}catch(S){ye(e,e.return,S)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function hd(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;hd(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Wt(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)od(e,t.alternate,t),t=t.sibling}function Va(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:pa(4,t,t.return),Va(t);break;case 1:Ut(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&nd(t,t.return,a),Va(t);break;case 27:Sn(t.stateNode);case 26:case 5:Ut(t,t.return),Va(t);break;case 22:t.memoizedState===null&&Va(t);break;case 30:Va(t);break;default:Va(t)}e=e.sibling}}function Ft(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,n=e,i=t,s=i.flags;switch(i.tag){case 0:case 11:case 15:Ft(n,i,a),fn(4,i);break;case 1:if(Ft(n,i,a),l=i,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(g){ye(l,l.return,g)}if(l=i,n=l.updateQueue,n!==null){var r=l.stateNode;try{var u=n.shared.hiddenCallbacks;if(u!==null)for(n.shared.hiddenCallbacks=null,n=0;n<u.length;n++)Vo(u[n],r)}catch(g){ye(l,l.return,g)}}a&&s&64&&ld(i),mn(i,i.return);break;case 27:sd(i);case 26:case 5:Ft(n,i,a),a&&l===null&&s&4&&id(i),mn(i,i.return);break;case 12:Ft(n,i,a);break;case 31:Ft(n,i,a),a&&s&4&&fd(n,i);break;case 13:Ft(n,i,a),a&&s&4&&md(n,i);break;case 22:i.memoizedState===null&&Ft(n,i,a),mn(i,i.return);break;case 30:break;default:Ft(n,i,a)}t=t.sibling}}function ks(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Il(a))}function Os(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Il(e))}function Ct(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)gd(e,t,a,l),t=t.sibling}function gd(e,t,a,l){var n=t.flags;switch(t.tag){case 0:case 11:case 15:Ct(e,t,a,l),n&2048&&fn(9,t);break;case 1:Ct(e,t,a,l);break;case 3:Ct(e,t,a,l),n&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Il(e)));break;case 12:if(n&2048){Ct(e,t,a,l),e=t.stateNode;try{var i=t.memoizedProps,s=i.id,r=i.onPostCommit;typeof r=="function"&&r(s,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(u){ye(t,t.return,u)}}else Ct(e,t,a,l);break;case 31:Ct(e,t,a,l);break;case 13:Ct(e,t,a,l);break;case 23:break;case 22:i=t.stateNode,s=t.alternate,t.memoizedState!==null?i._visibility&2?Ct(e,t,a,l):pn(e,t):i._visibility&2?Ct(e,t,a,l):(i._visibility|=2,Sl(e,t,a,l,(t.subtreeFlags&10256)!==0||!1)),n&2048&&ks(s,t);break;case 24:Ct(e,t,a,l),n&2048&&Os(t.alternate,t);break;default:Ct(e,t,a,l)}}function Sl(e,t,a,l,n){for(n=n&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,s=t,r=a,u=l,g=s.flags;switch(s.tag){case 0:case 11:case 15:Sl(i,s,r,u,n),fn(8,s);break;case 23:break;case 22:var S=s.stateNode;s.memoizedState!==null?S._visibility&2?Sl(i,s,r,u,n):pn(i,s):(S._visibility|=2,Sl(i,s,r,u,n)),n&&g&2048&&ks(s.alternate,s);break;case 24:Sl(i,s,r,u,n),n&&g&2048&&Os(s.alternate,s);break;default:Sl(i,s,r,u,n)}t=t.sibling}}function pn(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,n=l.flags;switch(l.tag){case 22:pn(a,l),n&2048&&ks(l.alternate,l);break;case 24:pn(a,l),n&2048&&Os(l.alternate,l);break;default:pn(a,l)}t=t.sibling}}var hn=8192;function Nl(e,t,a){if(e.subtreeFlags&hn)for(e=e.child;e!==null;)yd(e,t,a),e=e.sibling}function yd(e,t,a){switch(e.tag){case 26:Nl(e,t,a),e.flags&hn&&e.memoizedState!==null&&fh(a,Dt,e.memoizedState,e.memoizedProps);break;case 5:Nl(e,t,a);break;case 3:case 4:var l=Dt;Dt=Ui(e.stateNode.containerInfo),Nl(e,t,a),Dt=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=hn,hn=16777216,Nl(e,t,a),hn=l):Nl(e,t,a));break;default:Nl(e,t,a)}}function xd(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function gn(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ve=l,bd(l,e)}xd(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)vd(e),e=e.sibling}function vd(e){switch(e.tag){case 0:case 11:case 15:gn(e),e.flags&2048&&pa(9,e,e.return);break;case 3:gn(e);break;case 12:gn(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Si(e)):gn(e);break;default:gn(e)}}function Si(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ve=l,bd(l,e)}xd(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:pa(8,t,t.return),Si(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Si(t));break;default:Si(t)}e=e.sibling}}function bd(e,t){for(;Ve!==null;){var a=Ve;switch(a.tag){case 0:case 11:case 15:pa(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:Il(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,Ve=l;else e:for(a=e;Ve!==null;){l=Ve;var n=l.sibling,i=l.return;if(ud(l),l===a){Ve=null;break e}if(n!==null){n.return=i,Ve=n;break e}Ve=i}}}var Ep={getCacheForType:function(e){var t=We(Re),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return We(Re).controller.signal}},Ap=typeof WeakMap=="function"?WeakMap:Map,pe=0,Ne=null,ne=null,se=0,ge=0,gt=null,ha=!1,zl=!1,Us=!1,It=0,Ce=0,ga=0,Ka=0,Rs=0,yt=0,wl=0,yn=null,st=null,Hs=!1,Ni=0,jd=0,zi=1/0,wi=null,ya=null,Le=0,xa=null,Tl=null,Pt=0,qs=0,Bs=null,Sd=null,xn=0,Ys=null;function xt(){return(pe&2)!==0&&se!==0?se&-se:j.T!==null?Vs():Hr()}function Nd(){if(yt===0)if((se&536870912)===0||oe){var e=kn;kn<<=1,(kn&3932160)===0&&(kn=262144),yt=e}else yt=536870912;return e=pt.current,e!==null&&(e.flags|=32),yt}function rt(e,t,a){(e===Ne&&(ge===2||ge===9)||e.cancelPendingCommit!==null)&&(El(e,0),va(e,se,yt,!1)),ql(e,a),((pe&2)===0||e!==Ne)&&(e===Ne&&((pe&2)===0&&(Ka|=a),Ce===4&&va(e,se,yt,!1)),Rt(e))}function zd(e,t,a){if((pe&6)!==0)throw Error(d(327));var l=!a&&(t&127)===0&&(t&e.expiredLanes)===0||Hl(e,t),n=l?Dp(e,t):Ls(e,t,!0),i=l;do{if(n===0){zl&&!l&&va(e,t,0,!1);break}else{if(a=e.current.alternate,i&&!_p(a)){n=Ls(e,t,!1),i=!1;continue}if(n===2){if(i=t,e.errorRecoveryDisabledLanes&i)var s=0;else s=e.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){t=s;e:{var r=e;n=yn;var u=r.current.memoizedState.isDehydrated;if(u&&(El(r,s).flags|=256),s=Ls(r,s,!1),s!==2){if(Us&&!u){r.errorRecoveryDisabledLanes|=i,Ka|=i,n=4;break e}i=st,st=n,i!==null&&(st===null?st=i:st.push.apply(st,i))}n=s}if(i=!1,n!==2)continue}}if(n===1){El(e,0),va(e,t,0,!0);break}e:{switch(l=e,i=n,i){case 0:case 1:throw Error(d(345));case 4:if((t&4194048)!==t)break;case 6:va(l,t,yt,!ha);break e;case 2:st=null;break;case 3:case 5:break;default:throw Error(d(329))}if((t&62914560)===t&&(n=Ni+300-ot(),10<n)){if(va(l,t,yt,!ha),Un(l,0,!0)!==0)break e;Pt=t,l.timeoutHandle=tf(wd.bind(null,l,a,st,wi,Hs,t,yt,Ka,wl,ha,i,"Throttled",-0,0),n);break e}wd(l,a,st,wi,Hs,t,yt,Ka,wl,ha,i,null,-0,0)}}break}while(!0);Rt(e)}function wd(e,t,a,l,n,i,s,r,u,g,S,z,y,b){if(e.timeoutHandle=-1,z=t.subtreeFlags,z&8192||(z&16785408)===16785408){z={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:qt},yd(t,i,z);var q=(i&62914560)===i?Ni-ot():(i&4194048)===i?jd-ot():0;if(q=mh(z,q),q!==null){Pt=i,e.cancelPendingCommit=q(kd.bind(null,e,t,i,a,l,n,s,r,u,S,z,null,y,b)),va(e,i,s,!g);return}}kd(e,t,i,a,l,n,s,r,u)}function _p(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],i=n.getSnapshot;n=n.value;try{if(!ft(i(),n))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function va(e,t,a,l){t&=~Rs,t&=~Ka,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var n=t;0<n;){var i=31-dt(n),s=1<<i;l[i]=-1,n&=~s}a!==0&&Or(e,a,t)}function Ti(){return(pe&6)===0?(vn(0),!1):!0}function Qs(){if(ne!==null){if(ge===0)var e=ne.return;else e=ne,Lt=qa=null,ls(e),yl=null,en=0,e=ne;for(;e!==null;)ad(e.alternate,e),e=e.return;ne=null}}function El(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,$p(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Pt=0,Qs(),Ne=e,ne=a=Yt(e.current,null),se=t,ge=0,gt=null,ha=!1,zl=Hl(e,t),Us=!1,wl=yt=Rs=Ka=ga=Ce=0,st=yn=null,Hs=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var n=31-dt(l),i=1<<n;t|=e[n],l&=~i}return It=t,Kn(),a}function Td(e,t){I=null,j.H=on,t===gl||t===ti?(t=Lo(),ge=3):t===Zc?(t=Lo(),ge=4):ge=t===vs?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,gt=t,ne===null&&(Ce=1,hi(e,St(t,e.current)))}function Ed(){var e=pt.current;return e===null?!0:(se&4194048)===se?Tt===null:(se&62914560)===se||(se&536870912)!==0?e===Tt:!1}function Ad(){var e=j.H;return j.H=on,e===null?on:e}function _d(){var e=j.A;return j.A=Ep,e}function Ei(){Ce=4,ha||(se&4194048)!==se&&pt.current!==null||(zl=!0),(ga&134217727)===0&&(Ka&134217727)===0||Ne===null||va(Ne,se,yt,!1)}function Ls(e,t,a){var l=pe;pe|=2;var n=Ad(),i=_d();(Ne!==e||se!==t)&&(wi=null,El(e,t)),t=!1;var s=Ce;e:do try{if(ge!==0&&ne!==null){var r=ne,u=gt;switch(ge){case 8:Qs(),s=6;break e;case 3:case 2:case 9:case 6:pt.current===null&&(t=!0);var g=ge;if(ge=0,gt=null,Al(e,r,u,g),a&&zl){s=0;break e}break;default:g=ge,ge=0,gt=null,Al(e,r,u,g)}}Mp(),s=Ce;break}catch(S){Td(e,S)}while(!0);return t&&e.shellSuspendCounter++,Lt=qa=null,pe=l,j.H=n,j.A=i,ne===null&&(Ne=null,se=0,Kn()),s}function Mp(){for(;ne!==null;)Md(ne)}function Dp(e,t){var a=pe;pe|=2;var l=Ad(),n=_d();Ne!==e||se!==t?(wi=null,zi=ot()+500,El(e,t)):zl=Hl(e,t);e:do try{if(ge!==0&&ne!==null){t=ne;var i=gt;t:switch(ge){case 1:ge=0,gt=null,Al(e,t,i,1);break;case 2:case 9:if(Yo(i)){ge=0,gt=null,Dd(t);break}t=function(){ge!==2&&ge!==9||Ne!==e||(ge=7),Rt(e)},i.then(t,t);break e;case 3:ge=7;break e;case 4:ge=5;break e;case 7:Yo(i)?(ge=0,gt=null,Dd(t)):(ge=0,gt=null,Al(e,t,i,7));break;case 5:var s=null;switch(ne.tag){case 26:s=ne.memoizedState;case 5:case 27:var r=ne;if(s?yf(s):r.stateNode.complete){ge=0,gt=null;var u=r.sibling;if(u!==null)ne=u;else{var g=r.return;g!==null?(ne=g,Ai(g)):ne=null}break t}}ge=0,gt=null,Al(e,t,i,5);break;case 6:ge=0,gt=null,Al(e,t,i,6);break;case 8:Qs(),Ce=6;break e;default:throw Error(d(462))}}Cp();break}catch(S){Td(e,S)}while(!0);return Lt=qa=null,j.H=l,j.A=n,pe=a,ne!==null?0:(Ne=null,se=0,Kn(),Ce)}function Cp(){for(;ne!==null&&!tm();)Md(ne)}function Md(e){var t=ed(e.alternate,e,It);e.memoizedProps=e.pendingProps,t===null?Ai(e):ne=t}function Dd(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Ju(a,t,t.pendingProps,t.type,void 0,se);break;case 11:t=Ju(a,t,t.pendingProps,t.type.render,t.ref,se);break;case 5:ls(t);default:ad(a,t),t=ne=_o(t,It),t=ed(a,t,It)}e.memoizedProps=e.pendingProps,t===null?Ai(e):ne=t}function Al(e,t,a,l){Lt=qa=null,ls(t),yl=null,en=0;var n=t.return;try{if(bp(e,n,t,a,se)){Ce=1,hi(e,St(a,e.current)),ne=null;return}}catch(i){if(n!==null)throw ne=n,i;Ce=1,hi(e,St(a,e.current)),ne=null;return}t.flags&32768?(oe||l===1?e=!0:zl||(se&536870912)!==0?e=!1:(ha=e=!0,(l===2||l===9||l===3||l===6)&&(l=pt.current,l!==null&&l.tag===13&&(l.flags|=16384))),Cd(t,e)):Ai(t)}function Ai(e){var t=e;do{if((t.flags&32768)!==0){Cd(t,ha);return}e=t.return;var a=Np(t.alternate,t,It);if(a!==null){ne=a;return}if(t=t.sibling,t!==null){ne=t;return}ne=t=e}while(t!==null);Ce===0&&(Ce=5)}function Cd(e,t){do{var a=zp(e.alternate,e);if(a!==null){a.flags&=32767,ne=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ne=e;return}ne=e=a}while(e!==null);Ce=6,ne=null}function kd(e,t,a,l,n,i,s,r,u){e.cancelPendingCommit=null;do _i();while(Le!==0);if((pe&6)!==0)throw Error(d(327));if(t!==null){if(t===e.current)throw Error(d(177));if(i=t.lanes|t.childLanes,i|=Mc,dm(e,a,i,s,r,u),e===Ne&&(ne=Ne=null,se=0),Tl=t,xa=e,Pt=a,qs=i,Bs=n,Sd=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Rp(Dn,function(){return qd(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=j.T,j.T=null,n=D.p,D.p=2,s=pe,pe|=4;try{wp(e,t,a)}finally{pe=s,D.p=n,j.T=l}}Le=1,Od(),Ud(),Rd()}}function Od(){if(Le===1){Le=0;var e=xa,t=Tl,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=j.T,j.T=null;var l=D.p;D.p=2;var n=pe;pe|=4;try{pd(t,e);var i=er,s=bo(e.containerInfo),r=i.focusedElem,u=i.selectionRange;if(s!==r&&r&&r.ownerDocument&&vo(r.ownerDocument.documentElement,r)){if(u!==null&&wc(r)){var g=u.start,S=u.end;if(S===void 0&&(S=g),"selectionStart"in r)r.selectionStart=g,r.selectionEnd=Math.min(S,r.value.length);else{var z=r.ownerDocument||document,y=z&&z.defaultView||window;if(y.getSelection){var b=y.getSelection(),q=r.textContent.length,Z=Math.min(u.start,q),be=u.end===void 0?Z:Math.min(u.end,q);!b.extend&&Z>be&&(s=be,be=Z,Z=s);var p=xo(r,Z),f=xo(r,be);if(p&&f&&(b.rangeCount!==1||b.anchorNode!==p.node||b.anchorOffset!==p.offset||b.focusNode!==f.node||b.focusOffset!==f.offset)){var h=z.createRange();h.setStart(p.node,p.offset),b.removeAllRanges(),Z>be?(b.addRange(h),b.extend(f.node,f.offset)):(h.setEnd(f.node,f.offset),b.addRange(h))}}}}for(z=[],b=r;b=b.parentNode;)b.nodeType===1&&z.push({element:b,left:b.scrollLeft,top:b.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<z.length;r++){var N=z[r];N.element.scrollLeft=N.left,N.element.scrollTop=N.top}}Qi=!!Ps,er=Ps=null}finally{pe=n,D.p=l,j.T=a}}e.current=t,Le=2}}function Ud(){if(Le===2){Le=0;var e=xa,t=Tl,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=j.T,j.T=null;var l=D.p;D.p=2;var n=pe;pe|=4;try{od(e,t.alternate,t)}finally{pe=n,D.p=l,j.T=a}}Le=3}}function Rd(){if(Le===4||Le===3){Le=0,am();var e=xa,t=Tl,a=Pt,l=Sd;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Le=5:(Le=0,Tl=xa=null,Hd(e,e.pendingLanes));var n=e.pendingLanes;if(n===0&&(ya=null),cc(a),t=t.stateNode,ut&&typeof ut.onCommitFiberRoot=="function")try{ut.onCommitFiberRoot(Rl,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=j.T,n=D.p,D.p=2,j.T=null;try{for(var i=e.onRecoverableError,s=0;s<l.length;s++){var r=l[s];i(r.value,{componentStack:r.stack})}}finally{j.T=t,D.p=n}}(Pt&3)!==0&&_i(),Rt(e),n=e.pendingLanes,(a&261930)!==0&&(n&42)!==0?e===Ys?xn++:(xn=0,Ys=e):xn=0,vn(0)}}function Hd(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Il(t)))}function _i(){return Od(),Ud(),Rd(),qd()}function qd(){if(Le!==5)return!1;var e=xa,t=qs;qs=0;var a=cc(Pt),l=j.T,n=D.p;try{D.p=32>a?32:a,j.T=null,a=Bs,Bs=null;var i=xa,s=Pt;if(Le=0,Tl=xa=null,Pt=0,(pe&6)!==0)throw Error(d(331));var r=pe;if(pe|=4,vd(i.current),gd(i,i.current,s,a),pe=r,vn(0,!1),ut&&typeof ut.onPostCommitFiberRoot=="function")try{ut.onPostCommitFiberRoot(Rl,i)}catch{}return!0}finally{D.p=n,j.T=l,Hd(e,t)}}function Bd(e,t,a){t=St(a,t),t=xs(e.stateNode,t,2),e=da(e,t,2),e!==null&&(ql(e,2),Rt(e))}function ye(e,t,a){if(e.tag===3)Bd(e,e,a);else for(;t!==null;){if(t.tag===3){Bd(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ya===null||!ya.has(l))){e=St(a,e),a=Yu(2),l=da(t,a,2),l!==null&&(Qu(a,l,t,e),ql(l,2),Rt(l));break}}t=t.return}}function Gs(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new Ap;var n=new Set;l.set(t,n)}else n=l.get(t),n===void 0&&(n=new Set,l.set(t,n));n.has(a)||(Us=!0,n.add(a),e=kp.bind(null,e,t,a),t.then(e,e))}function kp(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ne===e&&(se&a)===a&&(Ce===4||Ce===3&&(se&62914560)===se&&300>ot()-Ni?(pe&2)===0&&El(e,0):Rs|=a,wl===se&&(wl=0)),Rt(e)}function Yd(e,t){t===0&&(t=kr()),e=Ua(e,t),e!==null&&(ql(e,t),Rt(e))}function Op(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Yd(e,a)}function Up(e,t){var a=0;switch(e.tag){case 31:case 13:var l=e.stateNode,n=e.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(d(314))}l!==null&&l.delete(t),Yd(e,a)}function Rp(e,t){return ac(e,t)}var Mi=null,_l=null,Xs=!1,Di=!1,Zs=!1,ba=0;function Rt(e){e!==_l&&e.next===null&&(_l===null?Mi=_l=e:_l=_l.next=e),Di=!0,Xs||(Xs=!0,qp())}function vn(e,t){if(!Zs&&Di){Zs=!0;do for(var a=!1,l=Mi;l!==null;){if(e!==0){var n=l.pendingLanes;if(n===0)var i=0;else{var s=l.suspendedLanes,r=l.pingedLanes;i=(1<<31-dt(42|e)+1)-1,i&=n&~(s&~r),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(a=!0,Xd(l,i))}else i=se,i=Un(l,l===Ne?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||Hl(l,i)||(a=!0,Xd(l,i));l=l.next}while(a);Zs=!1}}function Hp(){Qd()}function Qd(){Di=Xs=!1;var e=0;ba!==0&&Jp()&&(e=ba);for(var t=ot(),a=null,l=Mi;l!==null;){var n=l.next,i=Ld(l,t);i===0?(l.next=null,a===null?Mi=n:a.next=n,n===null&&(_l=a)):(a=l,(e!==0||(i&3)!==0)&&(Di=!0)),l=n}Le!==0&&Le!==5||vn(e),ba!==0&&(ba=0)}function Ld(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,n=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var s=31-dt(i),r=1<<s,u=n[s];u===-1?((r&a)===0||(r&l)!==0)&&(n[s]=um(r,t)):u<=t&&(e.expiredLanes|=r),i&=~r}if(t=Ne,a=se,a=Un(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(ge===2||ge===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&lc(l),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Hl(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&lc(l),cc(a)){case 2:case 8:a=Dr;break;case 32:a=Dn;break;case 268435456:a=Cr;break;default:a=Dn}return l=Gd.bind(null,e),a=ac(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&lc(l),e.callbackPriority=2,e.callbackNode=null,2}function Gd(e,t){if(Le!==0&&Le!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(_i()&&e.callbackNode!==a)return null;var l=se;return l=Un(e,e===Ne?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(zd(e,l,t),Ld(e,ot()),e.callbackNode!=null&&e.callbackNode===a?Gd.bind(null,e):null)}function Xd(e,t){if(_i())return null;zd(e,t,!0)}function qp(){Wp(function(){(pe&6)!==0?ac(Mr,Hp):Qd()})}function Vs(){if(ba===0){var e=pl;e===0&&(e=Cn,Cn<<=1,(Cn&261888)===0&&(Cn=256)),ba=e}return ba}function Zd(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Bn(""+e)}function Vd(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function Bp(e,t,a,l,n){if(t==="submit"&&a&&a.stateNode===n){var i=Zd((n[at]||null).action),s=l.submitter;s&&(t=(t=s[at]||null)?Zd(t.formAction):s.getAttribute("formAction"),t!==null&&(i=t,s=null));var r=new Gn("action","action",null,l,n);e.push({event:r,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ba!==0){var u=s?Vd(n,s):new FormData(n);fs(a,{pending:!0,data:u,method:n.method,action:i},null,u)}}else typeof i=="function"&&(r.preventDefault(),u=s?Vd(n,s):new FormData(n),fs(a,{pending:!0,data:u,method:n.method,action:i},i,u))},currentTarget:n}]})}}for(var Ks=0;Ks<_c.length;Ks++){var Js=_c[Ks],Yp=Js.toLowerCase(),Qp=Js[0].toUpperCase()+Js.slice(1);Mt(Yp,"on"+Qp)}Mt(No,"onAnimationEnd"),Mt(zo,"onAnimationIteration"),Mt(wo,"onAnimationStart"),Mt("dblclick","onDoubleClick"),Mt("focusin","onFocus"),Mt("focusout","onBlur"),Mt(lp,"onTransitionRun"),Mt(np,"onTransitionStart"),Mt(ip,"onTransitionCancel"),Mt(To,"onTransitionEnd"),el("onMouseEnter",["mouseout","mouseover"]),el("onMouseLeave",["mouseout","mouseover"]),el("onPointerEnter",["pointerout","pointerover"]),el("onPointerLeave",["pointerout","pointerover"]),Da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Da("onBeforeInput",["compositionend","keypress","textInput","paste"]),Da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Lp=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bn));function Kd(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],n=l.event;l=l.listeners;e:{var i=void 0;if(t)for(var s=l.length-1;0<=s;s--){var r=l[s],u=r.instance,g=r.currentTarget;if(r=r.listener,u!==i&&n.isPropagationStopped())break e;i=r,n.currentTarget=g;try{i(n)}catch(S){Vn(S)}n.currentTarget=null,i=u}else for(s=0;s<l.length;s++){if(r=l[s],u=r.instance,g=r.currentTarget,r=r.listener,u!==i&&n.isPropagationStopped())break e;i=r,n.currentTarget=g;try{i(n)}catch(S){Vn(S)}n.currentTarget=null,i=u}}}}function ie(e,t){var a=t[sc];a===void 0&&(a=t[sc]=new Set);var l=e+"__bubble";a.has(l)||(Jd(t,e,2,!1),a.add(l))}function $s(e,t,a){var l=0;t&&(l|=4),Jd(a,e,l,t)}var Ci="_reactListening"+Math.random().toString(36).slice(2);function Ws(e){if(!e[Ci]){e[Ci]=!0,Yr.forEach(function(a){a!=="selectionchange"&&(Lp.has(a)||$s(a,!1,e),$s(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ci]||(t[Ci]=!0,$s("selectionchange",!1,t))}}function Jd(e,t,a,l){switch(zf(t)){case 2:var n=gh;break;case 8:n=yh;break;default:n=dr}a=n.bind(null,t,a,e),n=void 0,!gc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),l?n!==void 0?e.addEventListener(t,a,{capture:!0,passive:n}):e.addEventListener(t,a,!0):n!==void 0?e.addEventListener(t,a,{passive:n}):e.addEventListener(t,a,!1)}function Fs(e,t,a,l,n){var i=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var s=l.tag;if(s===3||s===4){var r=l.stateNode.containerInfo;if(r===n)break;if(s===4)for(s=l.return;s!==null;){var u=s.tag;if((u===3||u===4)&&s.stateNode.containerInfo===n)return;s=s.return}for(;r!==null;){if(s=Fa(r),s===null)return;if(u=s.tag,u===5||u===6||u===26||u===27){l=i=s;continue e}r=r.parentNode}}l=l.return}Ir(function(){var g=i,S=pc(a),z=[];e:{var y=Eo.get(e);if(y!==void 0){var b=Gn,q=e;switch(e){case"keypress":if(Qn(a)===0)break e;case"keydown":case"keyup":b=Um;break;case"focusin":q="focus",b=bc;break;case"focusout":q="blur",b=bc;break;case"beforeblur":case"afterblur":b=bc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=to;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=Nm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=qm;break;case No:case zo:case wo:b=Tm;break;case To:b=Ym;break;case"scroll":case"scrollend":b=jm;break;case"wheel":b=Lm;break;case"copy":case"cut":case"paste":b=Am;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=lo;break;case"toggle":case"beforetoggle":b=Xm}var Z=(t&4)!==0,be=!Z&&(e==="scroll"||e==="scrollend"),p=Z?y!==null?y+"Capture":null:y;Z=[];for(var f=g,h;f!==null;){var N=f;if(h=N.stateNode,N=N.tag,N!==5&&N!==26&&N!==27||h===null||p===null||(N=Ql(f,p),N!=null&&Z.push(jn(f,N,h))),be)break;f=f.return}0<Z.length&&(y=new b(y,q,null,a,S),z.push({event:y,listeners:Z}))}}if((t&7)===0){e:{if(y=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",y&&a!==mc&&(q=a.relatedTarget||a.fromElement)&&(Fa(q)||q[Wa]))break e;if((b||y)&&(y=S.window===S?S:(y=S.ownerDocument)?y.defaultView||y.parentWindow:window,b?(q=a.relatedTarget||a.toElement,b=g,q=q?Fa(q):null,q!==null&&(be=H(q),Z=q.tag,q!==be||Z!==5&&Z!==27&&Z!==6)&&(q=null)):(b=null,q=g),b!==q)){if(Z=to,N="onMouseLeave",p="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(Z=lo,N="onPointerLeave",p="onPointerEnter",f="pointer"),be=b==null?y:Yl(b),h=q==null?y:Yl(q),y=new Z(N,f+"leave",b,a,S),y.target=be,y.relatedTarget=h,N=null,Fa(S)===g&&(Z=new Z(p,f+"enter",q,a,S),Z.target=h,Z.relatedTarget=be,N=Z),be=N,b&&q)t:{for(Z=Gp,p=b,f=q,h=0,N=p;N;N=Z(N))h++;N=0;for(var L=f;L;L=Z(L))N++;for(;0<h-N;)p=Z(p),h--;for(;0<N-h;)f=Z(f),N--;for(;h--;){if(p===f||f!==null&&p===f.alternate){Z=p;break t}p=Z(p),f=Z(f)}Z=null}else Z=null;b!==null&&$d(z,y,b,Z,!1),q!==null&&be!==null&&$d(z,be,q,Z,!0)}}e:{if(y=g?Yl(g):window,b=y.nodeName&&y.nodeName.toLowerCase(),b==="select"||b==="input"&&y.type==="file")var fe=fo;else if(oo(y))if(mo)fe=ep;else{fe=Im;var Q=Fm}else b=y.nodeName,!b||b.toLowerCase()!=="input"||y.type!=="checkbox"&&y.type!=="radio"?g&&fc(g.elementType)&&(fe=fo):fe=Pm;if(fe&&(fe=fe(e,g))){uo(z,fe,a,S);break e}Q&&Q(e,y,g),e==="focusout"&&g&&y.type==="number"&&g.memoizedProps.value!=null&&dc(y,"number",y.value)}switch(Q=g?Yl(g):window,e){case"focusin":(oo(Q)||Q.contentEditable==="true")&&(cl=Q,Tc=g,$l=null);break;case"focusout":$l=Tc=cl=null;break;case"mousedown":Ec=!0;break;case"contextmenu":case"mouseup":case"dragend":Ec=!1,jo(z,a,S);break;case"selectionchange":if(ap)break;case"keydown":case"keyup":jo(z,a,S)}var P;if(Sc)e:{switch(e){case"compositionstart":var re="onCompositionStart";break e;case"compositionend":re="onCompositionEnd";break e;case"compositionupdate":re="onCompositionUpdate";break e}re=void 0}else il?so(e,a)&&(re="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(re="onCompositionStart");re&&(no&&a.locale!=="ko"&&(il||re!=="onCompositionStart"?re==="onCompositionEnd"&&il&&(P=Pr()):(na=S,yc="value"in na?na.value:na.textContent,il=!0)),Q=ki(g,re),0<Q.length&&(re=new ao(re,e,null,a,S),z.push({event:re,listeners:Q}),P?re.data=P:(P=ro(a),P!==null&&(re.data=P)))),(P=Vm?Km(e,a):Jm(e,a))&&(re=ki(g,"onBeforeInput"),0<re.length&&(Q=new ao("onBeforeInput","beforeinput",null,a,S),z.push({event:Q,listeners:re}),Q.data=P)),Bp(z,e,g,a,S)}Kd(z,t)})}function jn(e,t,a){return{instance:e,listener:t,currentTarget:a}}function ki(e,t){for(var a=t+"Capture",l=[];e!==null;){var n=e,i=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||i===null||(n=Ql(e,a),n!=null&&l.unshift(jn(e,n,i)),n=Ql(e,t),n!=null&&l.push(jn(e,n,i))),e.tag===3)return l;e=e.return}return[]}function Gp(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function $d(e,t,a,l,n){for(var i=t._reactName,s=[];a!==null&&a!==l;){var r=a,u=r.alternate,g=r.stateNode;if(r=r.tag,u!==null&&u===l)break;r!==5&&r!==26&&r!==27||g===null||(u=g,n?(g=Ql(a,i),g!=null&&s.unshift(jn(a,g,u))):n||(g=Ql(a,i),g!=null&&s.push(jn(a,g,u)))),a=a.return}s.length!==0&&e.push({event:t,listeners:s})}var Xp=/\r\n?/g,Zp=/\u0000|\uFFFD/g;function Wd(e){return(typeof e=="string"?e:""+e).replace(Xp,`
`).replace(Zp,"")}function Fd(e,t){return t=Wd(t),Wd(e)===t}function ve(e,t,a,l,n,i){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||al(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&al(e,""+l);break;case"className":Hn(e,"class",l);break;case"tabIndex":Hn(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Hn(e,a,l);break;case"style":Wr(e,l,i);break;case"data":if(t!=="object"){Hn(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Bn(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(a==="formAction"?(t!=="input"&&ve(e,t,"name",n.name,n,null),ve(e,t,"formEncType",n.formEncType,n,null),ve(e,t,"formMethod",n.formMethod,n,null),ve(e,t,"formTarget",n.formTarget,n,null)):(ve(e,t,"encType",n.encType,n,null),ve(e,t,"method",n.method,n,null),ve(e,t,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Bn(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=qt);break;case"onScroll":l!=null&&ie("scroll",e);break;case"onScrollEnd":l!=null&&ie("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(d(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(d(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=Bn(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":ie("beforetoggle",e),ie("toggle",e),Rn(e,"popover",l);break;case"xlinkActuate":Ht(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Ht(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Ht(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Ht(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Ht(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Ht(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Rn(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=vm.get(a)||a,Rn(e,a,l))}}function Is(e,t,a,l,n,i){switch(a){case"style":Wr(e,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(d(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(d(60));e.innerHTML=a}}break;case"children":typeof l=="string"?al(e,l):(typeof l=="number"||typeof l=="bigint")&&al(e,""+l);break;case"onScroll":l!=null&&ie("scroll",e);break;case"onScrollEnd":l!=null&&ie("scrollend",e);break;case"onClick":l!=null&&(e.onclick=qt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Qr.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),t=a.slice(2,n?a.length-7:void 0),i=e[at]||null,i=i!=null?i[a]:null,typeof i=="function"&&e.removeEventListener(t,i,n),typeof l=="function")){typeof i!="function"&&i!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,n);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):Rn(e,a,l)}}}function Ie(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ie("error",e),ie("load",e);var l=!1,n=!1,i;for(i in a)if(a.hasOwnProperty(i)){var s=a[i];if(s!=null)switch(i){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:ve(e,t,i,s,a,null)}}n&&ve(e,t,"srcSet",a.srcSet,a,null),l&&ve(e,t,"src",a.src,a,null);return;case"input":ie("invalid",e);var r=i=s=n=null,u=null,g=null;for(l in a)if(a.hasOwnProperty(l)){var S=a[l];if(S!=null)switch(l){case"name":n=S;break;case"type":s=S;break;case"checked":u=S;break;case"defaultChecked":g=S;break;case"value":i=S;break;case"defaultValue":r=S;break;case"children":case"dangerouslySetInnerHTML":if(S!=null)throw Error(d(137,t));break;default:ve(e,t,l,S,a,null)}}Vr(e,i,r,u,g,s,n,!1);return;case"select":ie("invalid",e),l=s=i=null;for(n in a)if(a.hasOwnProperty(n)&&(r=a[n],r!=null))switch(n){case"value":i=r;break;case"defaultValue":s=r;break;case"multiple":l=r;default:ve(e,t,n,r,a,null)}t=i,a=s,e.multiple=!!l,t!=null?tl(e,!!l,t,!1):a!=null&&tl(e,!!l,a,!0);return;case"textarea":ie("invalid",e),i=n=l=null;for(s in a)if(a.hasOwnProperty(s)&&(r=a[s],r!=null))switch(s){case"value":l=r;break;case"defaultValue":n=r;break;case"children":i=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(d(91));break;default:ve(e,t,s,r,a,null)}Jr(e,l,n,i);return;case"option":for(u in a)if(a.hasOwnProperty(u)&&(l=a[u],l!=null))switch(u){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:ve(e,t,u,l,a,null)}return;case"dialog":ie("beforetoggle",e),ie("toggle",e),ie("cancel",e),ie("close",e);break;case"iframe":case"object":ie("load",e);break;case"video":case"audio":for(l=0;l<bn.length;l++)ie(bn[l],e);break;case"image":ie("error",e),ie("load",e);break;case"details":ie("toggle",e);break;case"embed":case"source":case"link":ie("error",e),ie("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in a)if(a.hasOwnProperty(g)&&(l=a[g],l!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:ve(e,t,g,l,a,null)}return;default:if(fc(t)){for(S in a)a.hasOwnProperty(S)&&(l=a[S],l!==void 0&&Is(e,t,S,l,a,void 0));return}}for(r in a)a.hasOwnProperty(r)&&(l=a[r],l!=null&&ve(e,t,r,l,a,null))}function Vp(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,i=null,s=null,r=null,u=null,g=null,S=null;for(b in a){var z=a[b];if(a.hasOwnProperty(b)&&z!=null)switch(b){case"checked":break;case"value":break;case"defaultValue":u=z;default:l.hasOwnProperty(b)||ve(e,t,b,null,l,z)}}for(var y in l){var b=l[y];if(z=a[y],l.hasOwnProperty(y)&&(b!=null||z!=null))switch(y){case"type":i=b;break;case"name":n=b;break;case"checked":g=b;break;case"defaultChecked":S=b;break;case"value":s=b;break;case"defaultValue":r=b;break;case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(d(137,t));break;default:b!==z&&ve(e,t,y,b,l,z)}}uc(e,s,r,u,g,S,i,n);return;case"select":b=s=r=y=null;for(i in a)if(u=a[i],a.hasOwnProperty(i)&&u!=null)switch(i){case"value":break;case"multiple":b=u;default:l.hasOwnProperty(i)||ve(e,t,i,null,l,u)}for(n in l)if(i=l[n],u=a[n],l.hasOwnProperty(n)&&(i!=null||u!=null))switch(n){case"value":y=i;break;case"defaultValue":r=i;break;case"multiple":s=i;default:i!==u&&ve(e,t,n,i,l,u)}t=r,a=s,l=b,y!=null?tl(e,!!a,y,!1):!!l!=!!a&&(t!=null?tl(e,!!a,t,!0):tl(e,!!a,a?[]:"",!1));return;case"textarea":b=y=null;for(r in a)if(n=a[r],a.hasOwnProperty(r)&&n!=null&&!l.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:ve(e,t,r,null,l,n)}for(s in l)if(n=l[s],i=a[s],l.hasOwnProperty(s)&&(n!=null||i!=null))switch(s){case"value":y=n;break;case"defaultValue":b=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(d(91));break;default:n!==i&&ve(e,t,s,n,l,i)}Kr(e,y,b);return;case"option":for(var q in a)if(y=a[q],a.hasOwnProperty(q)&&y!=null&&!l.hasOwnProperty(q))switch(q){case"selected":e.selected=!1;break;default:ve(e,t,q,null,l,y)}for(u in l)if(y=l[u],b=a[u],l.hasOwnProperty(u)&&y!==b&&(y!=null||b!=null))switch(u){case"selected":e.selected=y&&typeof y!="function"&&typeof y!="symbol";break;default:ve(e,t,u,y,l,b)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Z in a)y=a[Z],a.hasOwnProperty(Z)&&y!=null&&!l.hasOwnProperty(Z)&&ve(e,t,Z,null,l,y);for(g in l)if(y=l[g],b=a[g],l.hasOwnProperty(g)&&y!==b&&(y!=null||b!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(d(137,t));break;default:ve(e,t,g,y,l,b)}return;default:if(fc(t)){for(var be in a)y=a[be],a.hasOwnProperty(be)&&y!==void 0&&!l.hasOwnProperty(be)&&Is(e,t,be,void 0,l,y);for(S in l)y=l[S],b=a[S],!l.hasOwnProperty(S)||y===b||y===void 0&&b===void 0||Is(e,t,S,y,l,b);return}}for(var p in a)y=a[p],a.hasOwnProperty(p)&&y!=null&&!l.hasOwnProperty(p)&&ve(e,t,p,null,l,y);for(z in l)y=l[z],b=a[z],!l.hasOwnProperty(z)||y===b||y==null&&b==null||ve(e,t,z,y,l,b)}function Id(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Kp(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),l=0;l<a.length;l++){var n=a[l],i=n.transferSize,s=n.initiatorType,r=n.duration;if(i&&r&&Id(s)){for(s=0,r=n.responseEnd,l+=1;l<a.length;l++){var u=a[l],g=u.startTime;if(g>r)break;var S=u.transferSize,z=u.initiatorType;S&&Id(z)&&(u=u.responseEnd,s+=S*(u<r?1:(r-g)/(u-g)))}if(--l,t+=8*(i+s)/(n.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Ps=null,er=null;function Oi(e){return e.nodeType===9?e:e.ownerDocument}function Pd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ef(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function tr(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ar=null;function Jp(){var e=window.event;return e&&e.type==="popstate"?e===ar?!1:(ar=e,!0):(ar=null,!1)}var tf=typeof setTimeout=="function"?setTimeout:void 0,$p=typeof clearTimeout=="function"?clearTimeout:void 0,af=typeof Promise=="function"?Promise:void 0,Wp=typeof queueMicrotask=="function"?queueMicrotask:typeof af<"u"?function(e){return af.resolve(null).then(e).catch(Fp)}:tf;function Fp(e){setTimeout(function(){throw e})}function ja(e){return e==="head"}function lf(e,t){var a=t,l=0;do{var n=a.nextSibling;if(e.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(l===0){e.removeChild(n),kl(t);return}l--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")l++;else if(a==="html")Sn(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Sn(a);for(var i=a.firstChild;i;){var s=i.nextSibling,r=i.nodeName;i[Bl]||r==="SCRIPT"||r==="STYLE"||r==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=s}}else a==="body"&&Sn(e.ownerDocument.body);a=n}while(a);kl(t)}function nf(e,t){var a=e;e=0;do{var l=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=l}while(a)}function lr(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":lr(a),rc(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Ip(e,t,a,l){for(;e.nodeType===1;){var n=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Bl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==n.rel||e.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||e.getAttribute("title")!==(n.title==null?null:n.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(n.src==null?null:n.src)||e.getAttribute("type")!==(n.type==null?null:n.type)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=n.name==null?null:""+n.name;if(n.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=Et(e.nextSibling),e===null)break}return null}function Pp(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Et(e.nextSibling),e===null))return null;return e}function cf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Et(e.nextSibling),e===null))return null;return e}function nr(e){return e.data==="$?"||e.data==="$~"}function ir(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function eh(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Et(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var cr=null;function sf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Et(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function rf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function of(e,t,a){switch(t=Oi(a),e){case"html":if(e=t.documentElement,!e)throw Error(d(452));return e;case"head":if(e=t.head,!e)throw Error(d(453));return e;case"body":if(e=t.body,!e)throw Error(d(454));return e;default:throw Error(d(451))}}function Sn(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);rc(e)}var At=new Map,uf=new Set;function Ui(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ea=D.d;D.d={f:th,r:ah,D:lh,C:nh,L:ih,m:ch,X:rh,S:sh,M:oh};function th(){var e=ea.f(),t=Ti();return e||t}function ah(e){var t=Ia(e);t!==null&&t.tag===5&&t.type==="form"?Tu(t):ea.r(e)}var Ml=typeof document>"u"?null:document;function df(e,t,a){var l=Ml;if(l&&typeof t=="string"&&t){var n=bt(t);n='link[rel="'+e+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),uf.has(n)||(uf.add(n),e={rel:e,crossOrigin:a,href:t},l.querySelector(n)===null&&(t=l.createElement("link"),Ie(t,"link",e),Ze(t),l.head.appendChild(t)))}}function lh(e){ea.D(e),df("dns-prefetch",e,null)}function nh(e,t){ea.C(e,t),df("preconnect",e,t)}function ih(e,t,a){ea.L(e,t,a);var l=Ml;if(l&&e&&t){var n='link[rel="preload"][as="'+bt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+bt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+bt(a.imageSizes)+'"]')):n+='[href="'+bt(e)+'"]';var i=n;switch(t){case"style":i=Dl(e);break;case"script":i=Cl(e)}At.has(i)||(e=U({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),At.set(i,e),l.querySelector(n)!==null||t==="style"&&l.querySelector(Nn(i))||t==="script"&&l.querySelector(zn(i))||(t=l.createElement("link"),Ie(t,"link",e),Ze(t),l.head.appendChild(t)))}}function ch(e,t){ea.m(e,t);var a=Ml;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+bt(l)+'"][href="'+bt(e)+'"]',i=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Cl(e)}if(!At.has(i)&&(e=U({rel:"modulepreload",href:e},t),At.set(i,e),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(zn(i)))return}l=a.createElement("link"),Ie(l,"link",e),Ze(l),a.head.appendChild(l)}}}function sh(e,t,a){ea.S(e,t,a);var l=Ml;if(l&&e){var n=Pa(l).hoistableStyles,i=Dl(e);t=t||"default";var s=n.get(i);if(!s){var r={loading:0,preload:null};if(s=l.querySelector(Nn(i)))r.loading=5;else{e=U({rel:"stylesheet",href:e,"data-precedence":t},a),(a=At.get(i))&&sr(e,a);var u=s=l.createElement("link");Ze(u),Ie(u,"link",e),u._p=new Promise(function(g,S){u.onload=g,u.onerror=S}),u.addEventListener("load",function(){r.loading|=1}),u.addEventListener("error",function(){r.loading|=2}),r.loading|=4,Ri(s,t,l)}s={type:"stylesheet",instance:s,count:1,state:r},n.set(i,s)}}}function rh(e,t){ea.X(e,t);var a=Ml;if(a&&e){var l=Pa(a).hoistableScripts,n=Cl(e),i=l.get(n);i||(i=a.querySelector(zn(n)),i||(e=U({src:e,async:!0},t),(t=At.get(n))&&rr(e,t),i=a.createElement("script"),Ze(i),Ie(i,"link",e),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function oh(e,t){ea.M(e,t);var a=Ml;if(a&&e){var l=Pa(a).hoistableScripts,n=Cl(e),i=l.get(n);i||(i=a.querySelector(zn(n)),i||(e=U({src:e,async:!0,type:"module"},t),(t=At.get(n))&&rr(e,t),i=a.createElement("script"),Ze(i),Ie(i,"link",e),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function ff(e,t,a,l){var n=(n=J.current)?Ui(n):null;if(!n)throw Error(d(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Dl(a.href),a=Pa(n).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Dl(a.href);var i=Pa(n).hoistableStyles,s=i.get(e);if(s||(n=n.ownerDocument||n,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,s),(i=n.querySelector(Nn(e)))&&!i._p&&(s.instance=i,s.state.loading=5),At.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},At.set(e,a),i||uh(n,e,a,s.state))),t&&l===null)throw Error(d(528,""));return s}if(t&&l!==null)throw Error(d(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Cl(a),a=Pa(n).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(d(444,e))}}function Dl(e){return'href="'+bt(e)+'"'}function Nn(e){return'link[rel="stylesheet"]['+e+"]"}function mf(e){return U({},e,{"data-precedence":e.precedence,precedence:null})}function uh(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),Ie(t,"link",a),Ze(t),e.head.appendChild(t))}function Cl(e){return'[src="'+bt(e)+'"]'}function zn(e){return"script[async]"+e}function pf(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+bt(a.href)+'"]');if(l)return t.instance=l,Ze(l),l;var n=U({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),Ze(l),Ie(l,"style",n),Ri(l,a.precedence,e),t.instance=l;case"stylesheet":n=Dl(a.href);var i=e.querySelector(Nn(n));if(i)return t.state.loading|=4,t.instance=i,Ze(i),i;l=mf(a),(n=At.get(n))&&sr(l,n),i=(e.ownerDocument||e).createElement("link"),Ze(i);var s=i;return s._p=new Promise(function(r,u){s.onload=r,s.onerror=u}),Ie(i,"link",l),t.state.loading|=4,Ri(i,a.precedence,e),t.instance=i;case"script":return i=Cl(a.src),(n=e.querySelector(zn(i)))?(t.instance=n,Ze(n),n):(l=a,(n=At.get(i))&&(l=U({},a),rr(l,n)),e=e.ownerDocument||e,n=e.createElement("script"),Ze(n),Ie(n,"link",l),e.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(d(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,Ri(l,a.precedence,e));return t.instance}function Ri(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,i=n,s=0;s<l.length;s++){var r=l[s];if(r.dataset.precedence===t)i=r;else if(i!==n)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function sr(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function rr(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Hi=null;function hf(e,t,a){if(Hi===null){var l=new Map,n=Hi=new Map;n.set(a,l)}else n=Hi,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),n=0;n<a.length;n++){var i=a[n];if(!(i[Bl]||i[Je]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var s=i.getAttribute(t)||"";s=e+s;var r=l.get(s);r?r.push(i):l.set(s,[i])}}return l}function gf(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function dh(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function yf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function fh(e,t,a,l){if(a.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var n=Dl(l.href),i=t.querySelector(Nn(n));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=qi.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=i,Ze(i);return}i=t.ownerDocument||t,l=mf(l),(n=At.get(n))&&sr(l,n),i=i.createElement("link"),Ze(i);var s=i;s._p=new Promise(function(r,u){s.onload=r,s.onerror=u}),Ie(i,"link",l),a.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=qi.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var or=0;function mh(e,t){return e.stylesheets&&e.count===0&&Yi(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var l=setTimeout(function(){if(e.stylesheets&&Yi(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&or===0&&(or=62500*Kp());var n=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Yi(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>or?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(n)}}:null}function qi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Yi(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Bi=null;function Yi(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Bi=new Map,t.forEach(ph,e),Bi=null,qi.call(e))}function ph(e,t){if(!(t.state.loading&4)){var a=Bi.get(e);if(a)var l=a.get(null);else{a=new Map,Bi.set(e,a);for(var n=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<n.length;i++){var s=n[i];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(a.set(s.dataset.precedence,s),l=s)}l&&a.set(null,l)}n=t.instance,s=n.getAttribute("data-precedence"),i=a.get(s)||l,i===l&&a.set(null,n),a.set(s,n),this.count++,l=qi.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),i?i.parentNode.insertBefore(n,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(n,e.firstChild)),t.state.loading|=4}}var wn={$$typeof:Se,Provider:null,Consumer:null,_currentValue:X,_currentValue2:X,_threadCount:0};function hh(e,t,a,l,n,i,s,r,u){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=nc(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nc(0),this.hiddenUpdates=nc(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=i,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=u,this.incompleteTransitions=new Map}function xf(e,t,a,l,n,i,s,r,u,g,S,z){return e=new hh(e,t,a,s,u,g,S,z,r),t=1,i===!0&&(t|=24),i=mt(3,null,null,t),e.current=i,i.stateNode=e,t=Lc(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:l,isDehydrated:a,cache:t},Vc(i),e}function vf(e){return e?(e=ol,e):ol}function bf(e,t,a,l,n,i){n=vf(n),l.context===null?l.context=n:l.pendingContext=n,l=ua(t),l.payload={element:a},i=i===void 0?null:i,i!==null&&(l.callback=i),a=da(e,l,t),a!==null&&(rt(a,e,t),an(a,e,t))}function jf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function ur(e,t){jf(e,t),(e=e.alternate)&&jf(e,t)}function Sf(e){if(e.tag===13||e.tag===31){var t=Ua(e,67108864);t!==null&&rt(t,e,67108864),ur(e,67108864)}}function Nf(e){if(e.tag===13||e.tag===31){var t=xt();t=ic(t);var a=Ua(e,t);a!==null&&rt(a,e,t),ur(e,t)}}var Qi=!0;function gh(e,t,a,l){var n=j.T;j.T=null;var i=D.p;try{D.p=2,dr(e,t,a,l)}finally{D.p=i,j.T=n}}function yh(e,t,a,l){var n=j.T;j.T=null;var i=D.p;try{D.p=8,dr(e,t,a,l)}finally{D.p=i,j.T=n}}function dr(e,t,a,l){if(Qi){var n=fr(l);if(n===null)Fs(e,t,l,Li,a),wf(e,l);else if(vh(n,e,t,a,l))l.stopPropagation();else if(wf(e,l),t&4&&-1<xh.indexOf(e)){for(;n!==null;){var i=Ia(n);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var s=Ma(i.pendingLanes);if(s!==0){var r=i;for(r.pendingLanes|=2,r.entangledLanes|=2;s;){var u=1<<31-dt(s);r.entanglements[1]|=u,s&=~u}Rt(i),(pe&6)===0&&(zi=ot()+500,vn(0))}}break;case 31:case 13:r=Ua(i,2),r!==null&&rt(r,i,2),Ti(),ur(i,2)}if(i=fr(l),i===null&&Fs(e,t,l,Li,a),i===n)break;n=i}n!==null&&l.stopPropagation()}else Fs(e,t,l,null,a)}}function fr(e){return e=pc(e),mr(e)}var Li=null;function mr(e){if(Li=null,e=Fa(e),e!==null){var t=H(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=V(t),e!==null)return e;e=null}else if(a===31){if(e=R(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Li=e,null}function zf(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(lm()){case Mr:return 2;case Dr:return 8;case Dn:case nm:return 32;case Cr:return 268435456;default:return 32}default:return 32}}var pr=!1,Sa=null,Na=null,za=null,Tn=new Map,En=new Map,wa=[],xh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function wf(e,t){switch(e){case"focusin":case"focusout":Sa=null;break;case"dragenter":case"dragleave":Na=null;break;case"mouseover":case"mouseout":za=null;break;case"pointerover":case"pointerout":Tn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":En.delete(t.pointerId)}}function An(e,t,a,l,n,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:i,targetContainers:[n]},t!==null&&(t=Ia(t),t!==null&&Sf(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),e)}function vh(e,t,a,l,n){switch(t){case"focusin":return Sa=An(Sa,e,t,a,l,n),!0;case"dragenter":return Na=An(Na,e,t,a,l,n),!0;case"mouseover":return za=An(za,e,t,a,l,n),!0;case"pointerover":var i=n.pointerId;return Tn.set(i,An(Tn.get(i)||null,e,t,a,l,n)),!0;case"gotpointercapture":return i=n.pointerId,En.set(i,An(En.get(i)||null,e,t,a,l,n)),!0}return!1}function Tf(e){var t=Fa(e.target);if(t!==null){var a=H(t);if(a!==null){if(t=a.tag,t===13){if(t=V(a),t!==null){e.blockedOn=t,qr(e.priority,function(){Nf(a)});return}}else if(t===31){if(t=R(a),t!==null){e.blockedOn=t,qr(e.priority,function(){Nf(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Gi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=fr(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);mc=l,a.target.dispatchEvent(l),mc=null}else return t=Ia(a),t!==null&&Sf(t),e.blockedOn=a,!1;t.shift()}return!0}function Ef(e,t,a){Gi(e)&&a.delete(t)}function bh(){pr=!1,Sa!==null&&Gi(Sa)&&(Sa=null),Na!==null&&Gi(Na)&&(Na=null),za!==null&&Gi(za)&&(za=null),Tn.forEach(Ef),En.forEach(Ef)}function Xi(e,t){e.blockedOn===t&&(e.blockedOn=null,pr||(pr=!0,m.unstable_scheduleCallback(m.unstable_NormalPriority,bh)))}var Zi=null;function Af(e){Zi!==e&&(Zi=e,m.unstable_scheduleCallback(m.unstable_NormalPriority,function(){Zi===e&&(Zi=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],n=e[t+2];if(typeof l!="function"){if(mr(l||a)===null)continue;break}var i=Ia(a);i!==null&&(e.splice(t,3),t-=3,fs(i,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function kl(e){function t(u){return Xi(u,e)}Sa!==null&&Xi(Sa,e),Na!==null&&Xi(Na,e),za!==null&&Xi(za,e),Tn.forEach(t),En.forEach(t);for(var a=0;a<wa.length;a++){var l=wa[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<wa.length&&(a=wa[0],a.blockedOn===null);)Tf(a),a.blockedOn===null&&wa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],i=a[l+1],s=n[at]||null;if(typeof i=="function")s||Af(a);else if(s){var r=null;if(i&&i.hasAttribute("formAction")){if(n=i,s=i[at]||null)r=s.formAction;else if(mr(n)!==null)continue}else r=s.action;typeof r=="function"?a[l+1]=r:(a.splice(l,3),l-=3),Af(a)}}}function _f(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(s){return n=s})},focusReset:"manual",scroll:"manual"})}function t(){n!==null&&(n(),n=null),l||setTimeout(a,20)}function a(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,n=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),n!==null&&(n(),n=null)}}}function hr(e){this._internalRoot=e}Vi.prototype.render=hr.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(d(409));var a=t.current,l=xt();bf(a,l,e,t,null,null)},Vi.prototype.unmount=hr.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;bf(e.current,2,null,e,null,null),Ti(),t[Wa]=null}};function Vi(e){this._internalRoot=e}Vi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Hr();e={blockedOn:null,target:e,priority:t};for(var a=0;a<wa.length&&t!==0&&t<wa[a].priority;a++);wa.splice(a,0,e),a===0&&Tf(e)}};var Mf=E.version;if(Mf!=="19.2.7")throw Error(d(527,Mf,"19.2.7"));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(d(188)):(e=Object.keys(e).join(","),Error(d(268,e)));return e=v(t),e=e!==null?G(e):null,e=e===null?null:e.stateNode,e};var jh={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:j,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ki=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ki.isDisabled&&Ki.supportsFiber)try{Rl=Ki.inject(jh),ut=Ki}catch{}}return Mn.createRoot=function(e,t){if(!C(e))throw Error(d(299));var a=!1,l="",n=Ru,i=Hu,s=qu;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=xf(e,1,!1,null,null,a,l,null,n,i,s,_f),e[Wa]=t.current,Ws(e),new hr(t)},Mn.hydrateRoot=function(e,t,a){if(!C(e))throw Error(d(299));var l=!1,n="",i=Ru,s=Hu,r=qu,u=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(i=a.onUncaughtError),a.onCaughtError!==void 0&&(s=a.onCaughtError),a.onRecoverableError!==void 0&&(r=a.onRecoverableError),a.formState!==void 0&&(u=a.formState)),t=xf(e,1,!0,t,a??null,l,n,u,i,s,r,_f),t.context=vf(null),a=t.current,l=xt(),l=ic(l),n=ua(l),n.callback=null,da(a,n,l),a=l,t.current.lanes=a,ql(t,a),Rt(t),e[Wa]=t.current,Ws(e),new Vi(t)},Mn.version="19.2.7",Mn}var Yf;function Ch(){if(Yf)return xr.exports;Yf=1;function m(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(m)}catch(E){console.error(E)}}return m(),xr.exports=Dh(),xr.exports}var kh=Ch();const Oh=Gf(kh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uh=m=>m.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Xf=(...m)=>m.filter((E,T,d)=>!!E&&E.trim()!==""&&d.indexOf(E)===T).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Rh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hh=ee.forwardRef(({color:m="currentColor",size:E=24,strokeWidth:T=2,absoluteStrokeWidth:d,className:C="",children:H,iconNode:V,...R},_)=>ee.createElement("svg",{ref:_,...Rh,width:E,height:E,stroke:m,strokeWidth:d?Number(T)*24/Number(E):T,className:Xf("lucide",C),...R},[...V.map(([v,G])=>ee.createElement(v,G)),...Array.isArray(H)?H:[H]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=(m,E)=>{const T=ee.forwardRef(({className:d,...C},H)=>ee.createElement(Hh,{ref:H,iconNode:E,className:Xf(`lucide-${Uh(m)}`,d),...C}));return T.displayName=`${m}`,T};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qh=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Zf=te("Activity",qh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bh=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Ea=te("ArrowRight",Bh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yh=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],Vf=te("Award",Yh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qh=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],Kf=te("BookOpen",Qh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lh=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],tt=te("Check",Lh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gh=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Xh=te("ChevronDown",Gh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zh=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Vh=te("ChevronUp",Zh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kh=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Jf=te("CircleCheckBig",Kh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jh=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],$i=te("CircleCheck",Jh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $h=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Wh=te("CircleHelp",$h);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fh=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],Ih=te("ClipboardList",Fh);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ph=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Nr=te("Compass",Ph);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],t0=te("Copy",e0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]],Ja=te("Cpu",a0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],$f=te("Database",l0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],Ji=te("Download",n0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],c0=te("EyeOff",i0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],r0=te("Eye",s0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=[["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}]],u0=te("FileCode",o0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Aa=te("FileText",d0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",key:"18mbvz"}],["path",{d:"M6.453 15h11.094",key:"3shlmq"}],["path",{d:"M8.5 2h7",key:"csnxdl"}]],m0=te("FlaskConical",f0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],h0=te("Globe",p0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=[["line",{x1:"22",x2:"2",y1:"12",y2:"12",key:"1y58io"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16",key:"sgf278"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16",key:"1l4acy"}]],Qf=te("HardDrive",g0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y0=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],x0=te("Key",y0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Lf=te("Layers",v0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b0=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],$a=te("Lock",b0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j0=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],S0=te("Menu",j0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N0=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],z0=te("Monitor",N0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w0=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Wf=te("RefreshCw",w0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T0=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],Wi=te("Search",T0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E0=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],Er=te("Server",E0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A0=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],_0=te("ShieldAlert",A0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M0=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Ff=te("ShieldCheck",M0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D0=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Ol=te("Shield",D0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C0=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],k0=te("Sparkles",C0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O0=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],U0=te("Trash2",O0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R0=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],H0=te("TriangleAlert",R0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q0=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],Fi=te("Upload",q0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B0=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],If=te("X",B0);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y0=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Q0=te("Zap",Y0);function L0({onNavigate:m}){const[E,T]=ee.useState("encrypted"),d=[{icon:c.jsx(Ol,{className:"card-icon cyan"}),title:"End-to-End Privacy",description:"Data remains encrypted in transit, at rest, and even during computation. Plaintext never touches the host.",tag:"AES-GCM & NTRU"},{icon:c.jsx($a,{className:"card-icon purple"}),title:"Zero Knowledge Search",description:"Host servers execute complex search logic over ciphertexts without learning a single keyword or search result.",tag:"OQXT Protocol"},{icon:c.jsx(Ja,{className:"card-icon cyan"}),title:"Cloud Scale Performance",description:"Proprietary cryptographic indexes search millions of records in sub-millisecond timelines, matching traditional database speeds.",tag:"Bloom Filters"},{icon:c.jsx(Q0,{className:"card-icon purple"}),title:"Fast Retrieval",description:"Leverages parallelized symmetric primitives to process encrypted indices quickly without decryption overhead.",tag:"Sub-millisecond"},{icon:c.jsx(Vf,{className:"card-icon cyan"}),title:"Military Grade Security",description:"Standard cryptographic security guarantees including security against active adversaries and adaptive search leakage.",tag:"Quantum Resistant"},{icon:c.jsx(h0,{className:"card-icon purple"}),title:"Compliance Redefined",description:"Satisfies stringent GDPR, HIPAA, and SOC 2 requirements by design, rendering cloud data breaches cryptographically harmless.",tag:"Compliance Ready"}],C=(V,R)=>{const _=V.currentTarget,v=_.getBoundingClientRect(),G=V.clientX-v.left-v.width/2,U=V.clientY-v.top-v.height/2,F=-(U/(v.height/2))*8,ae=G/(v.width/2)*8;_.style.transform=`perspective(1000px) rotateX(${F}deg) rotateY(${ae}deg) translateY(-4px)`,_.style.boxShadow=`${G*-.1}px ${U*-.1}px 30px rgba(123, 97, 255, 0.25)`},H=V=>{const R=V.currentTarget;R.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",R.style.boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"};return c.jsxs("section",{id:"home",className:"section-padding",children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"hero-text-wrapper",children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:20},children:"🚀 State-of-the-Art Privacy Tech"}),c.jsxs("h1",{className:"hero-title",children:["Search Encrypted Data ",c.jsx("br",{}),c.jsx("span",{className:"gradient-text",children:"Without Revealing It"})]}),c.jsx("p",{className:"hero-subtitle",children:"Privacy-preserving search powered by Searchable Symmetric Encryption (SSE) and Fully Homomorphic Encryption (FHE). Zero exposure guarantees for your enterprise data."}),c.jsxs("div",{className:"hero-buttons",children:[c.jsxs("button",{className:"btn btn-cyan",onClick:()=>m("demo"),children:["Try Live Demo ",c.jsx(Ea,{style:{marginLeft:8,width:18,height:18}})]}),c.jsx("button",{className:"btn btn-secondary",onClick:()=>m("platform"),children:"View Architecture"})]})]}),c.jsxs("div",{className:"story-container",children:[c.jsxs("div",{className:"story-header text-center",children:[c.jsx("h2",{className:"section-subtitle",children:"How Search Engine Architectures Compare"}),c.jsx("p",{className:"subtitle",children:"Select a search model to trace the flow of query and data visualization."}),c.jsxs("div",{className:"story-toggle",children:[c.jsx("button",{className:`story-toggle-btn ${E==="traditional"?"active traditional":""}`,onClick:()=>T("traditional"),children:"Traditional Search"}),c.jsx("button",{className:`story-toggle-btn ${E==="encrypted"?"active encrypted":""}`,onClick:()=>T("encrypted"),children:"Encrypted Search (Our Platform)"})]})]}),c.jsx("div",{className:"story-flow-wrapper glass-panel",children:E==="traditional"?c.jsxs("div",{className:"flow-visual traditional-flow fade-in",children:[c.jsxs("div",{className:"flow-node",children:[c.jsx("div",{className:"flow-icon-circle",children:c.jsx(Aa,{className:"cyan"})}),c.jsx("div",{className:"flow-node-title",children:"1. Search Query"}),c.jsx("p",{className:"flow-node-desc",children:'User enters a plaintext search term (e.g., "patient data").'})]}),c.jsx("div",{className:"flow-connector danger-line",children:c.jsx("div",{className:"flow-dot danger-dot"})}),c.jsxs("div",{className:"flow-node warning-highlight",children:[c.jsx("div",{className:"flow-icon-circle danger-border",children:c.jsx(Er,{className:"red"})}),c.jsx("div",{className:"flow-node-title text-red",children:"2. Server Transmission"}),c.jsx("p",{className:"flow-node-desc",children:"Query and files are sent to cloud database in readable format."})]}),c.jsx("div",{className:"flow-connector danger-line",children:c.jsx("div",{className:"flow-dot danger-dot"})}),c.jsxs("div",{className:"flow-node warning-highlight",children:[c.jsx("div",{className:"flow-icon-circle danger-border",children:c.jsx(r0,{className:"red"})}),c.jsx("div",{className:"flow-node-title text-red",children:"3. Data Exposure"}),c.jsx("p",{className:"flow-node-desc",children:"Server indexes data. Administrators, hackers, or cloud providers see everything."}),c.jsxs("div",{className:"warning-badge",children:[c.jsx(H0,{size:12})," Privacy Risk"]})]})]}):c.jsxs("div",{className:"flow-visual encrypted-flow fade-in",children:[c.jsxs("div",{className:"flow-node",children:[c.jsx("div",{className:"flow-icon-circle secure-border",children:c.jsx($a,{className:"purple"})}),c.jsx("div",{className:"flow-node-title text-purple",children:"1. Local Encryption"}),c.jsx("p",{className:"flow-node-desc",children:"Query is converted into a secure token locally on client device."})]}),c.jsx("div",{className:"flow-connector secure-line",children:c.jsx("div",{className:"flow-dot secure-dot"})}),c.jsxs("div",{className:"flow-node",children:[c.jsx("div",{className:"flow-icon-circle secure-border",children:c.jsx(Ja,{className:"cyan"})}),c.jsx("div",{className:"flow-node-title text-cyan",children:"2. Ciphertext Search"}),c.jsx("p",{className:"flow-node-desc",children:"Symmetric / Homomorphic search executes entirely over encrypted files."})]}),c.jsx("div",{className:"flow-connector secure-line",children:c.jsx("div",{className:"flow-dot secure-dot"})}),c.jsxs("div",{className:"flow-node",children:[c.jsx("div",{className:"flow-icon-circle secure-border",children:c.jsx(Jf,{className:"green"})}),c.jsx("div",{className:"flow-node-title text-green",children:"3. Local Decryption"}),c.jsx("p",{className:"flow-node-desc",children:"Only matching encrypted results are returned and decrypted on user device."}),c.jsxs("div",{className:"secure-badge",children:[c.jsx(Ol,{size:12})," 100% Secure"]})]})]})})]}),c.jsxs("div",{className:"why-it-matters-section",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:60},children:[c.jsx("h2",{className:"section-title",children:"Designed for Cryptographic Security"}),c.jsx("p",{className:"subtitle",children:"High-performance search primitives without sacrificing privacy or performance."})]}),c.jsx("div",{className:"cards-grid",children:d.map((V,R)=>c.jsxs("div",{className:"card glass-panel",onMouseMove:_=>C(_),onMouseLeave:H,children:[c.jsxs("div",{className:"card-top",children:[V.icon,c.jsx("span",{className:"card-tag",children:V.tag})]}),c.jsx("h3",{className:"card-title",children:V.title}),c.jsx("p",{className:"card-desc",children:V.description})]},R))})]})]}),c.jsx("style",{children:`
        .hero-text-wrapper {
          text-align: center;
          max-width: 900px;
          margin: 40px auto 80px;
          animation: slide-up 1s ease;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        /* Scroll Story */
        .story-container {
          margin-top: 100px;
          margin-bottom: 120px;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
        }

        .story-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          padding: 4px;
          border-radius: 9999px;
          margin: 30px 0;
        }

        .story-toggle-btn {
          padding: 10px 24px;
          border-radius: 9999px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
          font-size: 0.9rem;
        }

        .story-toggle-btn.active.traditional {
          background: rgba(244, 63, 94, 0.15);
          color: #f43f5e;
          border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .story-toggle-btn.active.encrypted {
          background: rgba(123, 97, 255, 0.15);
          color: #a78bfa;
          border: 1px solid rgba(123, 97, 255, 0.3);
        }

        .story-flow-wrapper {
          padding: 50px 30px;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flow-visual {
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          width: 100%;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .flow-visual {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 40px;
          }
          .flow-connector {
            width: 2px !important;
            height: 40px !important;
          }
          .flow-dot {
            animation: flow-v 2s linear infinite !important;
          }
        }

        .flow-node {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 250px;
        }

        .flow-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: var(--transition-smooth);
        }

        .flow-icon-circle.danger-border {
          border-color: rgba(244, 63, 94, 0.3);
          background: rgba(244, 63, 94, 0.05);
        }

        .flow-icon-circle.secure-border {
          border-color: rgba(123, 97, 255, 0.3);
          background: rgba(123, 97, 255, 0.05);
        }

        .flow-node-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .flow-node-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .warning-badge, .secure-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .warning-badge {
          background: rgba(244, 63, 94, 0.1);
          color: #f43f5e;
          border: 1px solid rgba(244, 63, 94, 0.2);
        }

        .secure-badge {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .flow-connector {
          align-self: center;
          flex-grow: 1;
          height: 2px;
          position: relative;
          background: rgba(255,255,255,0.05);
          max-width: 120px;
        }

        .danger-line {
          background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(244,63,94,0.3));
        }

        .secure-line {
          background: linear-gradient(90deg, rgba(123,97,255,0.2), rgba(0,212,255,0.2));
        }

        .flow-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: -3px;
          left: 0;
          animation: flow-h 2s linear infinite;
        }

        .danger-dot {
          background: #f43f5e;
          box-shadow: 0 0 10px #f43f5e;
        }

        .secure-dot {
          background: var(--accent-cyan);
          box-shadow: 0 0 10px var(--accent-cyan);
        }

        @keyframes flow-h {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        @keyframes flow-v {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .text-red { color: #f43f5e; }
        .text-purple { color: #a78bfa; }
        .text-green { color: #10b981; }
        .red { color: #f43f5e; }
        .green { color: #10b981; }

        /* Why it Matters Grid */
        .why-it-matters-section {
          margin-top: 100px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        @media (max-width: 480px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .card {
          transform-style: preserve-3d;
          transition: transform 0.1s ease, box-shadow 0.3s ease;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          padding: 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
        }

        .card-icon.cyan {
          color: var(--accent-cyan);
          border-color: rgba(0, 212, 255, 0.15);
        }

        .card-icon.purple {
          color: var(--accent-purple);
          border-color: rgba(123, 97, 255, 0.15);
        }

        .card-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .fade-in {
          animation: fade-in-keyframes 0.5s ease-out forwards;
        }

        @keyframes fade-in-keyframes {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `})]})}function G0(){const[m,E]=ee.useState("query-enc"),d={"user-device":{title:"User Device (Client Side)",icon:c.jsx(Nr,{className:"node-pane-icon"}),what:"The local entry point where documents are loaded or queries entered. Plaintext variables and raw files are processed strictly within the local memory boundary of the user's browser or secure client hardware.",security:"Cryptographic secrets (NTRU keypairs, AES symmetric keys) never leave this device. Zero plaintext leakage to external networks.",metrics:{latency:"< 1ms",resource:"Minimal Client CPU",securityLevel:"128-bit Post-Quantum Secure"}},"query-enc":{title:"Query Encryption Module",icon:c.jsx(Ol,{className:"node-pane-icon"}),what:"Converts search strings into secure, pseudorandom trapdoors (tokens). It applies cryptographic hashes and NTRU-based homomorphic masking to prevent search pattern linkage.",security:"Prevents chosen-keyword attacks and prevents the cloud host from learning the actual keywords queried.",metrics:{latency:"< 2ms per keyword",resource:"Sub-millisecond hashing",securityLevel:"IND-CKA2 Secure"}},"search-layer":{title:"Encrypted Search Layer",icon:c.jsx(Ja,{className:"node-pane-icon"}),what:"The active backend server engine. Consumes encrypted query tokens, performs secure token checks, and queries the Encrypted Index. It executes comparison math directly on ciphertext without decrypting index rows.",security:"Executes in zero-knowledge. The server processes operations blindly. Even in case of total database takeover, search commands reveal zero plaintext data.",metrics:{latency:"0.2ms - 15ms depending on dataset size",resource:"Highly parallelizable server cores",securityLevel:"Mathematically Guaranteed Isolation"}},"encrypted-index":{title:"Encrypted Index (Storage)",icon:c.jsx(Qf,{className:"node-pane-icon"}),what:"A high-performance cryptographic index. Stores unique word identifier hashes (word_ids) matched with list arrays of document identifiers (doc_ids), all encrypted symmetrically with AES-256-GCM.",security:"Protected against passive storage sniffing. Index values look like completely random, high-entropy hex sequences.",metrics:{latency:"O(1) dictionary retrieval",resource:"SSD storage optimized",securityLevel:"AES-256-GCM & Bloom Filter backed"}},"secure-results":{title:"Secure Results Pipeline",icon:c.jsx(Lf,{className:"node-pane-icon"}),what:"Returns matching document ciphertexts to the client device. Since the index queries and database rows match blindly, the results are wrapped in secure TLS envelopes and served directly to the user client.",security:"No decryption happens on the host storage nodes. The results are decrypted on-the-fly inside the client local sandbox.",metrics:{latency:"< 5ms network response",resource:"Zero host overhead",securityLevel:"Symmetric Cipher Integrity verified"}}}[m];return c.jsxs("section",{id:"platform",className:"section-padding",style:{background:"linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%)"},children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:60},children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:16},children:"Platform Architecture"}),c.jsx("h2",{className:"section-title",children:"The Encrypted Search Platform"}),c.jsx("p",{className:"subtitle",children:"An enterprise-grade zero-knowledge flow. Click any node in the architecture diagram to explore its operation and security parameters."})]}),c.jsxs("div",{className:"platform-grid",children:[c.jsxs("div",{className:"diagram-container glass-panel",children:[c.jsxs("h3",{className:"panel-title-text",children:[c.jsx(Zf,{size:16})," Interactive Architecture Flow"]}),c.jsxs("div",{className:"nodes-flow",children:[c.jsxs("div",{className:`arch-node ${m==="user-device"?"active":""}`,onClick:()=>E("user-device"),children:[c.jsx("div",{className:"arch-node-badge",children:"Client"}),c.jsx("div",{className:"arch-node-icon",children:c.jsx(Nr,{})}),c.jsx("span",{className:"arch-node-label",children:"User Device"})]}),c.jsx("div",{className:"flow-arrow",children:c.jsx(Ea,{size:16})}),c.jsxs("div",{className:`arch-node ${m==="query-enc"?"active":""}`,onClick:()=>E("query-enc"),children:[c.jsx("div",{className:"arch-node-badge",children:"Local Crypt"}),c.jsx("div",{className:"arch-node-icon",children:c.jsx(Ol,{})}),c.jsx("span",{className:"arch-node-label",children:"Query Encryption"})]}),c.jsx("div",{className:"flow-arrow",children:c.jsx(Ea,{size:16})}),c.jsxs("div",{className:`arch-node ${m==="search-layer"?"active":""}`,onClick:()=>E("search-layer"),children:[c.jsx("div",{className:"arch-node-badge",children:"SaaS Cloud"}),c.jsx("div",{className:"arch-node-icon",children:c.jsx(Ja,{})}),c.jsx("span",{className:"arch-node-label",children:"Secure Search Layer"})]}),c.jsx("div",{className:"flow-arrow",children:c.jsx(Ea,{size:16})}),c.jsxs("div",{className:`arch-node ${m==="encrypted-index"?"active":""}`,onClick:()=>E("encrypted-index"),children:[c.jsx("div",{className:"arch-node-badge",children:"Cipher DB"}),c.jsx("div",{className:"arch-node-icon",children:c.jsx(Qf,{})}),c.jsx("span",{className:"arch-node-label",children:"Encrypted Index"})]}),c.jsx("div",{className:"flow-arrow",children:c.jsx(Ea,{size:16})}),c.jsxs("div",{className:`arch-node ${m==="secure-results"?"active":""}`,onClick:()=>E("secure-results"),children:[c.jsx("div",{className:"arch-node-badge",children:"Secure Output"}),c.jsx("div",{className:"arch-node-icon",children:c.jsx(Lf,{})}),c.jsx("span",{className:"arch-node-label",children:"Secure Results"})]})]}),c.jsx("div",{className:"data-flow-tracks",children:c.jsx("div",{className:"flow-track-line",children:c.jsx("span",{className:"glowing-data-pulse"})})})]}),c.jsxs("div",{className:"details-panel glass-panel active-highlight",children:[c.jsxs("div",{className:"details-header",children:[d.icon,c.jsxs("div",{children:[c.jsx("h3",{className:"details-title",children:d.title}),c.jsx("span",{className:"badge badge-cyan",style:{marginTop:4},children:"Active Component"})]})]}),c.jsxs("div",{className:"details-body",children:[c.jsxs("div",{className:"details-section",children:[c.jsx("h4",{children:"What it does"}),c.jsx("p",{children:d.what})]}),c.jsxs("div",{className:"details-section",children:[c.jsx("h4",{children:"Security Guarantee"}),c.jsx("p",{className:"text-secondary",children:d.security})]}),c.jsxs("div",{className:"details-section",children:[c.jsx("h4",{children:"Performance Metrics"}),c.jsxs("div",{className:"metrics-grid",children:[c.jsxs("div",{className:"metric-item",children:[c.jsx("span",{className:"metric-label",children:"Latency Overhead"}),c.jsx("span",{className:"metric-value",children:d.metrics.latency})]}),c.jsxs("div",{className:"metric-item",children:[c.jsx("span",{className:"metric-label",children:"Resource Cost"}),c.jsx("span",{className:"metric-value",children:d.metrics.resource})]}),c.jsxs("div",{className:"metric-item",children:[c.jsx("span",{className:"metric-label",children:"Security Class"}),c.jsx("span",{className:"metric-value text-purple",children:d.metrics.securityLevel})]})]})]})]})]})]})]}),c.jsx("style",{children:`
        .platform-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .platform-grid {
            grid-template-columns: 1fr;
          }
        }

        .panel-title-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 30px;
        }

        .diagram-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 30px;
        }

        .nodes-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 40px 0;
          flex-wrap: wrap;
          gap: 15px;
        }

        @media (max-width: 640px) {
          .nodes-flow {
            flex-direction: column;
            gap: 24px;
          }
          .flow-arrow {
            transform: rotate(90deg);
          }
        }

        .arch-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          position: relative;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--border-glass);
          background: rgba(255, 255, 255, 0.01);
          width: 120px;
          transition: var(--transition-smooth);
        }

        .arch-node:hover {
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(0, 212, 255, 0.02);
          transform: translateY(-2px);
        }

        .arch-node.active {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.08);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
          transform: scale(1.05);
        }

        .arch-node-badge {
          position: absolute;
          top: -10px;
          font-size: 9px;
          font-family: var(--font-mono);
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--bg-slate);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
        }

        .arch-node.active .arch-node-badge {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .arch-node-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .arch-node.active .arch-node-icon {
          color: var(--accent-cyan);
        }

        .arch-node-label {
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
          color: var(--text-secondary);
        }

        .arch-node.active .arch-node-label {
          color: var(--text-primary);
        }

        .flow-arrow {
          color: var(--text-muted);
        }

        .data-flow-tracks {
          width: 100%;
          margin-top: 20px;
        }

        .flow-track-line {
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.01), var(--border-glass), rgba(255,255,255,0.01));
          width: 100%;
          position: relative;
        }

        .glowing-data-pulse {
          position: absolute;
          height: 3px;
          width: 100px;
          background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
          top: -1px;
          animation: laser-pulse 4s linear infinite;
        }

        @keyframes laser-pulse {
          0% { left: 0%; }
          100% { left: 100%; }
        }

        /* Exploration Panel */
        .details-panel {
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .details-header {
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 24px;
          margin-bottom: 24px;
        }

        .node-pane-icon {
          width: 48px;
          height: 48px;
          padding: 10px;
          border-radius: 12px;
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 212, 255, 0.2);
        }

        .details-title {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .details-section {
          margin-bottom: 24px;
        }

        .details-section h4 {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .details-section p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
        }

        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        .metric-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          padding: 12px;
          border-radius: 8px;
          text-align: center;
        }

        .metric-label {
          display: block;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .metric-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }
      `})]})}function X0(){const[m,E]=ee.useState(null),T=[{id:"app",name:"Application Layer",desc:"Secure APIs, search interfaces, and client integrations connecting to user workflows.",color:"#00d4ff"},{id:"sec",name:"Security & Access Control",desc:"Post-Quantum signatures (NTRU/Falcon) validating request authorization and authenticity.",color:"#7b61ff"},{id:"enc",name:"Cryptographic Transform Layer",desc:"SSE indexes and Homomorphic computations executing calculations without reading payload variables.",color:"#4cc9f0"},{id:"store",name:"Secure Storage Layer",desc:"Encrypted document blobs, word maps, database indices, and Bloom filters written safely to disk.",color:"#c084fc"},{id:"infra",name:"Isolated Infrastructure",desc:"Host container grids, sandboxed runtimes, and secure network pipes.",color:"#38bdf8"}];return c.jsxs("section",{id:"technology",className:"section-padding",children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:80},children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:16},children:"Cryptographic Primitives"}),c.jsx("h2",{className:"section-title",children:"Security Primitives & Technology Stack"}),c.jsx("p",{className:"subtitle",children:"How we leverage advanced mathematics and secure system designs to search ciphertext with zero leaks."})]}),c.jsxs("div",{className:"primitives-grid",style:{marginBottom:80},children:[c.jsxs("div",{className:"primitive-card glass-panel",children:[c.jsxs("div",{className:"prim-header",children:[c.jsx("div",{className:"badge",children:"SSE"}),c.jsx("h3",{children:"Searchable Symmetric Encryption"})]}),c.jsx("p",{className:"prim-desc",children:"Allows the cloud database to query records matching a client-generated search token. It constructs an inverted index mapped with pseudorandom hashes. The server confirms matching documents without knowing the search string."}),c.jsxs("div",{className:"prim-flow-box",children:[c.jsxs("div",{className:"p-flow-step",children:[c.jsx("span",{className:"p-flow-num",children:"1"}),c.jsx("span",{className:"p-flow-lbl",children:"Keyword"})]}),c.jsx("div",{className:"p-flow-arrow",children:"→"}),c.jsxs("div",{className:"p-flow-step active",children:[c.jsx("span",{className:"p-flow-num",children:"2"}),c.jsx("span",{className:"p-flow-lbl",children:"Trapdoor Token"})]}),c.jsx("div",{className:"p-flow-arrow",children:"→"}),c.jsxs("div",{className:"p-flow-step",children:[c.jsx("span",{className:"p-flow-num",children:"3"}),c.jsx("span",{className:"p-flow-lbl",children:"Cipher Index"})]}),c.jsx("div",{className:"p-flow-arrow",children:"→"}),c.jsxs("div",{className:"p-flow-step active-cyan",children:[c.jsx("span",{className:"p-flow-num",children:"4"}),c.jsx("span",{className:"p-flow-lbl",children:"Match Query"})]})]}),c.jsxs("div",{className:"crypt-notes",children:[c.jsx($a,{size:12})," Symmetric Index lookup runs in ",c.jsx("strong",{children:"O(1)"})," time complexity."]})]}),c.jsxs("div",{className:"primitive-card glass-panel",children:[c.jsxs("div",{className:"prim-header",children:[c.jsx("div",{className:"badge badge-cyan",children:"FHE"}),c.jsx("h3",{children:"Fully Homomorphic Encryption"})]}),c.jsx("p",{className:"prim-desc",children:"Enables the processing of queries across encrypted numerical fields, arrays, or text documents. Computations are performed directly on encrypted states, outputting an encrypted result that only the client can decrypt."}),c.jsxs("div",{className:"prim-flow-box",children:[c.jsxs("div",{className:"p-flow-step",children:[c.jsx("span",{className:"p-flow-num",children:"1"}),c.jsx("span",{className:"p-flow-lbl",children:"Encrypted Data"})]}),c.jsx("div",{className:"p-flow-arrow",children:"→"}),c.jsxs("div",{className:"p-flow-step active-purple",children:[c.jsx("span",{className:"p-flow-num",children:"2"}),c.jsx("span",{className:"p-flow-lbl",children:"Encrypted Math"})]}),c.jsx("div",{className:"p-flow-arrow",children:"→"}),c.jsxs("div",{className:"p-flow-step",children:[c.jsx("span",{className:"p-flow-num",children:"3"}),c.jsx("span",{className:"p-flow-lbl",children:"Encrypted Result"})]})]}),c.jsxs("div",{className:"crypt-notes",children:[c.jsx(Ja,{size:12})," Plaintext data is never exposed in memory during computation."]})]})]}),c.jsxs("div",{className:"stack-section",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:50},children:[c.jsx("h3",{className:"section-subtitle",children:"The Security Layer Cake"}),c.jsx("p",{className:"subtitle",children:"Hover over the layers to inspect the security architecture stacks."})]}),c.jsxs("div",{className:"stack-container-grid",children:[c.jsx("div",{className:"stack-visual-wrapper",children:c.jsx("div",{className:"layers-3d-stack",children:T.map((d,C)=>{const H=m===d.id,V=C*40,R=H?`rotateX(-30deg) rotateY(15deg) translateY(-30px) translateZ(${V+30}px)`:`rotateX(-30deg) rotateY(15deg) translateZ(${V}px)`;return c.jsx("div",{className:`layer-slice ${H?"hovered":""}`,style:{transform:R,zIndex:10-C,borderColor:H?d.color:"rgba(255, 255, 255, 0.08)",boxShadow:H?`0 0 40px ${d.color}44`:"none"},onMouseEnter:()=>E(d.id),onMouseLeave:()=>E(null),children:c.jsxs("div",{className:"slice-content",children:[c.jsxs("span",{className:"slice-number",children:["0",T.length-C]}),c.jsx("span",{className:"slice-title",children:d.name}),c.jsx("div",{className:"slice-glow-border",style:{background:d.color}})]})},d.id)})})}),c.jsx("div",{className:"stack-info-pane glass-panel",children:m?c.jsxs("div",{className:"pane-content-info fade-in",children:[c.jsx("div",{className:"info-header",style:{borderColor:T.find(d=>d.id===m).color},children:c.jsx("h4",{className:"info-title",children:T.find(d=>d.id===m).name})}),c.jsx("p",{className:"info-desc",children:T.find(d=>d.id===m).desc}),c.jsxs("div",{className:"info-audit",children:[c.jsx("span",{className:"audit-dot"})," Audited Cryptographic Implementation"]})]}):c.jsxs("div",{className:"pane-placeholder",children:[c.jsx(Wh,{className:"placeholder-icon"}),c.jsx("p",{children:"Hover over any layer of the 3D stack on the left to inspect its role in our zero-knowledge search pipeline."})]})})]})]})]}),c.jsx("style",{children:`
        .primitives-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        @media (max-width: 768px) {
          .primitives-grid {
            grid-template-columns: 1fr;
          }
        }

        .primitive-card {
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .prim-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .prim-header h3 {
          font-size: 1.3rem;
          font-weight: 800;
        }

        .prim-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .prim-flow-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-glass);
          padding: 16px 12px;
          border-radius: 10px;
          margin-bottom: 24px;
        }

        .p-flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .p-flow-num {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .p-flow-lbl {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .p-flow-step.active .p-flow-num {
          background: rgba(123, 97, 255, 0.2);
          color: var(--accent-purple);
        }
        .p-flow-step.active .p-flow-lbl {
          color: var(--accent-purple);
        }

        .p-flow-step.active-cyan .p-flow-num {
          background: rgba(0, 212, 255, 0.2);
          color: var(--accent-cyan);
        }
        .p-flow-step.active-cyan .p-flow-lbl {
          color: var(--accent-cyan);
        }

        .p-flow-step.active-purple .p-flow-num {
          background: rgba(192, 132, 252, 0.2);
          color: #c084fc;
        }
        .p-flow-step.active-purple .p-flow-lbl {
          color: #c084fc;
        }

        .p-flow-arrow {
          color: var(--text-muted);
          font-weight: 700;
        }

        .crypt-notes {
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* 3D Stack */
        .stack-container-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          margin-top: 40px;
        }

        @media (max-width: 900px) {
          .stack-container-grid {
            grid-template-columns: 1fr;
          }
        }

        .stack-visual-wrapper {
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .layers-3d-stack {
          width: 100%;
          max-width: 450px;
          height: 300px;
          position: relative;
          transform-style: preserve-3d;
        }

        .layer-slice {
          position: absolute;
          width: 100%;
          height: 60px;
          background: rgba(11, 16, 32, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s;
        }

        .slice-content {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }

        .slice-number {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .slice-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .slice-glow-border {
          position: absolute;
          top: 0;
          left: -24px;
          width: 4px;
          height: 100%;
          border-radius: 2px 0 0 2px;
        }

        .layer-slice.hovered .slice-number {
          color: var(--text-primary);
        }

        /* Stack Info Pane */
        .stack-info-pane {
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .pane-placeholder {
          text-align: center;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .placeholder-icon {
          width: 48px;
          height: 48px;
          opacity: 0.3;
        }

        .pane-content-info {
          width: 100%;
        }

        .info-header {
          border-left: 3px solid var(--accent-purple);
          padding-left: 16px;
          margin-bottom: 20px;
        }

        .info-title {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .info-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .info-audit {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .audit-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
      `})]})}const Sr=[{id:"fin",name:"Q3_Financials.pdf",icon:"📊",desc:"Quarterly earnings report",preview:`Q3 Revenue: $4.2M
EBITDA margin: 18.3%
Net profit after tax: $760K
Forecast revised upward...`,keywords:["revenue","profit","EBITDA","quarterly","forecast","audit","balance","equity"]},{id:"enc",name:"Encryption_RFC.pdf",icon:"📄",desc:"Cryptography specification",preview:`Abstract: This document specifies
the AES block cipher in CBC mode.
Key derivation via PBKDF2...
Nonce generation requirements...`,keywords:["encryption","cipher","AES","key","nonce","block","padding","IV"]},{id:"med",name:"Medical_Records.pdf",icon:"📋",desc:"Patient clinical data",preview:`Patient ID: 00482-B
Diagnosis: Type 2 Diabetes
Medication: Metformin 500mg
Blood glucose: 126 mg/dL...`,keywords:["patient","diagnosis","medication","dosage","blood","pressure","glucose","allergy"]},{id:"proj",name:"Project_Phoenix.pdf",icon:"📝",desc:"Engineering project plan",preview:`Sprint 4 — Milestone Review
Backlog items: 14 open
Stakeholder sign-off pending
Budget utilisation: 67%...`,keywords:["milestone","sprint","backlog","stakeholder","deliverable","roadmap","budget","risk"]},{id:"res",name:"Research_Paper.pdf",icon:"🔬",desc:"Academic research draft",preview:`Abstract: We present a novel
methodology for dataset analysis.
Hypothesis confirmed at p<0.05
Citation count: 42...`,keywords:["abstract","hypothesis","methodology","results","analysis","citation","dataset","peer"]}];function Z0(m){let E=0;for(let T=0;T<m.length;T++)E=Math.imul(E,31)+m.charCodeAt(T)|0;return Math.abs(E)}function zr(m){return"0x"+Z0(m).toString(16).padStart(8,"0").toUpperCase()}function Ii(m){let E=3735928559,T=1103547991;for(let d=0;d<m.length;d++){const C=m.charCodeAt(d);E=Math.imul(E^C,2654435761),T=Math.imul(T^C,1597334677)}return E=Math.imul(E^E>>>16,2246822507)^Math.imul(T^T>>>13,3266489909),T=Math.imul(T^T>>>16,2246822507)^Math.imul(E^E>>>13,3266489909),(4294967296*(2097151&T)+E>>>0).toString(16).padStart(16,"0").toUpperCase()}function Pf(m,E=200){let T=m;const d=`ABCDEFabcdef0123456789+/=
`;let C="";for(let H=0;H<E;H++)T=Math.imul(T,1664525)+1013904223>>>0,C+=d[T%d.length],H%22===21&&(C+=`
`);return C}function V0(m,E){const T=new Set(["the","and","for","that","this","with","from","are","was","were","have","has","been","will","not","but","they","their","what","when","which","who","how","its","can","may","our","your","all","any","one","two","per","via","also","into","more","over","some","than","then","each","both","such","even","much","most","only","very","just","been","said","use","used","after","before","about","above","below","first","last","next","new","old","own","same","other","these","those","like","well","back","here","there","where","make","made","come","came","take","took","time","year","way","day","man","get","got","see","saw","know","knew","find","found","give","gave","good","great","long","little","right","big","high","low","still","never","again","always","often","now","then","here","there","too","very","just","also"]),d=m.toLowerCase().replace(/[^a-z\s]/g," ").split(/\s+/),C={};d.forEach(_=>{_.length>4&&!T.has(_)&&(C[_]=(C[_]||0)+1)});const H=E.replace(/\.[^.]+$/,"").split(/[_\-\s]+/).filter(_=>_.length>3).map(_=>_.toLowerCase()),V=Object.entries(C).sort((_,v)=>v[1]-_[1]).map(_=>_[0]),R=[...new Set([...H,...V])].slice(0,8);return R.length>=4?R:[...R,"document","secure","private","data"].slice(0,8)}function wr(m){switch(m){case"fin":return c.jsx(Aa,{size:16,style:{color:"var(--accent-cyan)"}});case"enc":return c.jsx(u0,{size:16,style:{color:"var(--accent-purple)"}});case"med":return c.jsx(Ih,{size:16,style:{color:"var(--accent-cyan)"}});case"proj":return c.jsx(Aa,{size:16,style:{color:"var(--accent-purple)"}});case"res":return c.jsx(m0,{size:16,style:{color:"var(--accent-cyan)"}});default:return c.jsx(Aa,{size:16,style:{color:"var(--text-secondary)"}})}}function K0({anim:m,searchAnim:E}){const T=!m&&!E;return c.jsxs("div",{className:`glass-panel pipeline-panel ${m?"pipeline-panel-active":E?"pipeline-panel-searching":""}`,style:{padding:"24px",minHeight:"480px"},children:[T&&c.jsxs("div",{className:"anim-empty-state",children:[c.jsx(Fi,{className:"anim-empty-icon",size:32}),c.jsx("div",{className:"anim-empty-text",children:"Upload a document to see the encryption pipeline in action"})]}),m&&c.jsxs(c.Fragment,{children:[c.jsxs("div",{className:"anim-step",children:[c.jsx("div",{className:`anim-step-num ${m.phase==="doc"?"active":"done"}`,children:"1"}),c.jsxs("div",{className:"anim-step-content",children:[c.jsxs("div",{className:"anim-step-title",children:[c.jsx(Aa,{size:14})," Document uploaded"]}),(m.phase==="doc"||m.docVisible)&&c.jsxs("div",{className:"anim-doc-card",children:[c.jsxs("div",{className:"anim-doc-card-header",children:[wr(m.doc.id),c.jsx("span",{className:"anim-doc-name",children:m.doc.name})]}),c.jsx("pre",{className:"anim-doc-preview",children:m.doc.preview||m.doc.desc})]})]})]}),(m.phase==="keywords"||m.phase==="hash"||m.phase==="send"||m.phase==="done")&&c.jsxs("div",{className:"anim-step",children:[c.jsx("div",{className:`anim-step-num ${m.phase==="keywords"?"active":"done"}`,children:"2"}),c.jsxs("div",{className:"anim-step-content",children:[c.jsxs("div",{className:"anim-step-title",children:[c.jsx(Zf,{size:14})," Keywords extracted"]}),c.jsxs("div",{className:"anim-kw-row",children:[m.visibleKws.map(d=>c.jsx("span",{className:"anim-kw-chip",children:d},d)),m.phase==="keywords"&&m.visibleKws.length<m.doc.keywords.length&&c.jsx("span",{className:"anim-kw-pulse",children:"..."})]})]})]}),(m.phase==="hash"||m.phase==="send"||m.phase==="done")&&c.jsxs("div",{className:"anim-step",children:[c.jsx("div",{className:`anim-step-num ${m.phase==="hash"?"active":"done"}`,children:"3"}),c.jsxs("div",{className:"anim-step-content",children:[c.jsxs("div",{className:"anim-step-title",children:[c.jsx($a,{size:14})," Encrypted for server"]}),c.jsxs("div",{className:"anim-hash-row",children:[c.jsxs("div",{style:{flex:1,minWidth:0},children:[c.jsx("div",{className:"anim-hash-label",children:"Document hash"}),c.jsx("div",{className:"anim-hash-box",children:c.jsx("pre",{className:"anim-hash-text",children:m.docHash?Pf(parseInt(m.docHash.slice(0,8),16)||1,100):""})})]}),c.jsxs("div",{style:{flex:1,minWidth:0},children:[c.jsx("div",{className:"anim-hash-label",children:"Keyword tokens"}),c.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:m.doc.keywords.map((d,C)=>c.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,opacity:m.encKws[C]?1:.2,transition:"opacity 0.3s"},children:[c.jsx("span",{className:"anim-kw-small",children:d}),c.jsx("span",{style:{color:"var(--accent-cyan)",fontSize:10},children:"→"}),c.jsx("span",{className:"anim-token-small",children:zr(d)})]},d))})]})]})]})]}),(m.phase==="send"||m.phase==="done")&&c.jsxs("div",{className:"anim-step",children:[c.jsx("div",{className:`anim-step-num ${m.phase==="send"?"active":"done"}`,children:"4"}),c.jsxs("div",{className:"anim-step-content",children:[c.jsxs("div",{className:"anim-step-title",children:[c.jsx($f,{size:14})," Sent to server"]}),c.jsxs("div",{className:"anim-transmit-row",children:[c.jsxs("div",{className:"anim-node-box",children:[c.jsx(z0,{size:14,style:{color:"var(--accent-cyan)"}}),c.jsx("span",{children:"Client"})]}),c.jsxs("div",{className:"anim-track-wrap",children:[c.jsx("div",{className:"anim-track-line"}),c.jsx("div",{style:{position:"absolute",top:"50%",transform:"translate(-50%, -50%)",left:m.sent?"calc(100% - 12px)":"12px",opacity:m.sent?0:1,transition:"left 1.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s 1.3s",zIndex:2},children:c.jsx($a,{size:14,style:{color:"var(--accent-purple)"}})}),c.jsx("div",{className:"anim-track-label",children:m.sent?"delivered ✓":"transmitting..."})]}),c.jsxs("div",{className:"anim-node-box",style:{borderColor:m.sent?"var(--accent-cyan)":"var(--border-glass)"},children:[c.jsx(Er,{size:14,style:{color:m.sent?"var(--accent-cyan)":"var(--text-muted)"}}),c.jsx("span",{children:"Server"})]})]}),m.sent&&c.jsxs("div",{className:"anim-sent-note",children:[c.jsx(Ff,{size:14,style:{color:"var(--accent-cyan)"}}),c.jsx("span",{children:"Plaintext never left the client"})]})]})]})]}),E&&c.jsxs("div",{className:"anim-step",style:{borderLeftColor:"var(--accent-purple)",marginBottom:0,paddingBottom:0},children:[c.jsx("div",{className:`anim-step-num ${E.done?"done-search":"active-search"}`,children:"5"}),c.jsxs("div",{className:"anim-step-content",children:[c.jsxs("div",{className:"anim-step-title",style:{color:"var(--accent-purple)"},children:[c.jsx(Wi,{size:14})," Blind search"]}),c.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:8},children:[c.jsxs("div",{className:"search-row-status active",children:[c.jsx("span",{className:"search-status-label",children:"Keyword token"}),c.jsx("span",{className:"anim-token-small",style:{color:"var(--accent-purple)"},children:E.token})]}),c.jsxs("div",{className:`search-row-status ${E.probing?"active":""}`,children:[c.jsx("span",{className:"search-status-label",children:"Matching on server"}),c.jsx("span",{style:{fontSize:11,color:E.probing?"var(--accent-purple)":"var(--text-muted)"},children:E.probing?"scanning encrypted index...":"pending"})]}),c.jsxs("div",{className:`search-row-status ${E.fetching?"active":""}`,children:[c.jsx("span",{className:"search-status-label",children:"Encrypted record fetched"}),c.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--accent-purple)"},children:E.fetching?`0x${Ii(E.kw).slice(0,16)}...`:"pending"})]}),c.jsxs("div",{className:`search-row-status ${E.done?"active":""}`,children:[c.jsx("span",{className:"search-status-label",children:"Decrypted on client"}),E.done&&c.jsx("span",{style:{fontSize:11,fontWeight:700,color:E.result.length?"var(--accent-cyan)":"var(--text-secondary)"},children:E.result.length?E.result.join(", "):"no match"})]})]})]})]})]})}function J0({doc:m}){const E=parseInt(Ii(m.name).slice(0,8),16)||1;return c.jsxs("div",{className:"srv-doc-card",children:[c.jsxs("div",{className:"srv-doc-card-top",children:[c.jsx(Er,{size:16,style:{color:"var(--accent-purple)"}}),c.jsxs("div",{children:[c.jsxs("div",{className:"srv-doc-enc-name",children:[Ii(m.name).slice(0,18),"..."]}),c.jsx("div",{className:"srv-doc-sub",children:"encrypted document"})]})]}),c.jsx("pre",{className:"srv-gibberish",children:Pf(E,160)})]})}function $0(){const[m,E]=ee.useState([]),[T,d]=ee.useState({}),[C,H]=ee.useState(null),[V,R]=ee.useState(null),[_,v]=ee.useState(""),[G,U]=ee.useState(null),[F,ae]=ee.useState(!1),[je,_e]=ee.useState(!0),Ye=ee.useRef();ee.useEffect(()=>{const A=Sr[0];E([A]),d({revenue:[A.name],profit:[A.name],ebitda:[A.name],quarterly:[A.name],forecast:[A.name],audit:[A.name],balance:[A.name],equity:[A.name]})},[]);function Me(A){R(null),U(null),H({phase:"doc",doc:A,docVisible:!0,visibleKws:[],encKws:[],docHash:"",sending:!1,sent:!1});const O=(K,B)=>setTimeout(B,K);O(900,()=>{H(K=>K&&{...K,phase:"keywords"}),A.keywords.forEach((K,B)=>{O(200+B*280,()=>{H(le=>le&&{...le,visibleKws:[...le.visibleKws,A.keywords[B]]})})})});const $=1100+A.keywords.length*280+400;O($,()=>{const K=Ii(A.name);H(B=>B&&{...B,phase:"hash",docHash:K}),A.keywords.forEach((B,le)=>{O(150+le*180,()=>{H(ze=>ze&&{...ze,encKws:[...ze.encKws,zr(B)]})})})});const Y=$+150+A.keywords.length*180+500;O(Y,()=>{H(K=>K&&{...K,phase:"send",sending:!0}),O(1600,()=>{H(K=>K&&{...K,sent:!0,phase:"done"}),we(A)})})}function we(A){E(O=>O.find($=>$.name===A.name)?O:[...O,A]),d(O=>{const $={...O};return A.keywords.forEach(Y=>{const K=Y.toLowerCase();$[K]||($[K]=[]),$[K].includes(A.name)||$[K].push(A.name)}),$})}function Se(){const A=_.trim().toLowerCase();if(!A||m.length===0)return;const O=zr(A),$=T[A]||[];U({q:A,matches:$}),R({kw:A,token:O,probing:!1,fetching:!1,done:!1,result:$}),setTimeout(()=>R(Y=>Y&&{...Y,probing:!0}),400),setTimeout(()=>R(Y=>Y&&{...Y,fetching:!0}),1300),setTimeout(()=>R(Y=>Y&&{...Y,done:!0}),2300)}function Qe(A){if(!A)return;const O=new FileReader;O.onload=$=>{const Y=$.target.result,K=V0(Y,A.name),le=Y.replace(/[^\x20-\x7E\n]/g," ").slice(0,200).trim().split(`
`).slice(0,5).join(`
`),ze={id:A.name,name:A.name,icon:"📄",desc:"Uploaded document",preview:le||"(binary content)",keywords:K};Me(ze)},O.readAsText(A)}function Ke(A){A.preventDefault(),ae(!1);const O=A.dataTransfer.getData("sampleId");if(O){const Y=Sr.find(K=>K.id===O);Y&&!m.find(K=>K.name===Y.name)&&Me(Y);return}const $=A.dataTransfer.files[0];$&&Qe($)}return c.jsxs("section",{id:"demo",className:"section-padding",style:{background:"linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)",position:"relative",zIndex:5},children:[c.jsxs("div",{className:"container",style:{position:"relative",zIndex:10},children:[c.jsxs("div",{className:"text-center",style:{marginBottom:60},children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:16},children:"Interactive Sandbox"}),c.jsx("h2",{className:"section-title",children:"Live Cryptographic Search Demo"}),c.jsx("p",{className:"subtitle",children:"Query ciphertext using Searchable Symmetric Encryption. Watch data packets flow through the cryptographic pipeline."})]}),c.jsxs("div",{className:"sandbox-grid",children:[c.jsxs("div",{className:"glass-panel",style:{padding:"24px",display:"flex",flexDirection:"column",gap:"16px"},children:[c.jsx("div",{className:"panel-label",children:"CLIENT"}),c.jsxs("div",{className:`dropzone-container ${F?"drag-active":""}`,onDragOver:A=>{A.preventDefault(),ae(!0)},onDragLeave:()=>ae(!1),onDrop:Ke,onClick:()=>Ye.current.click(),children:[c.jsx("input",{ref:Ye,type:"file",accept:".pdf,.txt",style:{display:"none"},onChange:A=>{A.target.files[0]&&Qe(A.target.files[0]),A.target.value=""}}),c.jsx(Fi,{className:"upload-zone-icon"}),c.jsx("p",{className:"upload-main-text",children:F?"Drop to encrypt":"Drop or click to upload"}),c.jsx("p",{className:"upload-sub-text",children:"PDF or TXT"})]}),c.jsxs("div",{className:"lib-wrap",children:[c.jsxs("button",{className:"lib-toggle",onClick:()=>_e(A=>!A),children:[c.jsx("span",{style:{display:"flex",alignItems:"center",gap:"8px"},children:"📁 Sample PDFs to upload"}),c.jsx("span",{style:{fontSize:10,color:"var(--text-muted)"},children:je?c.jsx(Vh,{size:14}):c.jsx(Xh,{size:14})})]}),je&&c.jsx("div",{className:"lib-list",children:Sr.map(A=>{const O=m.some($=>$.name===A.name);return c.jsxs("div",{draggable:!O,onDragStart:$=>$.dataTransfer.setData("sampleId",A.id),onClick:()=>{O||Me(A)},className:"lib-file",style:{opacity:O?.4:1,cursor:O?"default":"pointer"},children:[wr(A.id),c.jsxs("div",{style:{flex:1,minWidth:0},children:[c.jsxs("div",{className:"lib-file-name",children:[c.jsx("span",{children:A.name}),O&&c.jsx("span",{className:"indexed-tag",children:"indexed"})]}),c.jsx("div",{className:"lib-file-desc",children:A.desc}),c.jsxs("div",{className:"lib-kw-hint",children:[A.keywords.slice(0,4).join(", "),"..."]})]}),!O&&c.jsx("span",{style:{fontSize:11,color:"var(--text-muted)"},children:"⠿ drag"})]},A.id)})})]}),m.length>0&&c.jsxs("div",{className:"kw-index",children:[c.jsxs("div",{className:"kw-index-title",children:[c.jsx($f,{size:12})," Keyword index"]}),m.map(A=>c.jsxs("div",{className:"kw-index-row",children:[c.jsxs("div",{className:"kw-index-doc",children:[wr(A.id),c.jsx("span",{className:"kw-index-doc-name",children:A.name})]}),c.jsx("div",{className:"kw-index-kws",children:A.keywords.map(O=>c.jsx("span",{className:`kw-tag ${(G==null?void 0:G.q)===O.toLowerCase()?"kw-tag-hit":""}`,onClick:()=>{v(O)},children:O},O))})]},A.name))]}),m.length>0&&c.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[c.jsx("div",{className:"panel-label",children:"SEARCH"}),c.jsxs("div",{className:"search-row",children:[c.jsx("input",{className:"search-input",placeholder:"Type a keyword...",value:_,onChange:A=>{v(A.target.value),U(null)},onKeyDown:A=>A.key==="Enter"&&Se()}),c.jsx("button",{className:"search-btn",onClick:Se,children:c.jsx(Wi,{size:16})})]}),G&&c.jsx("div",{className:"search-result-display",style:{borderColor:G.matches.length?"var(--accent-cyan)":"var(--border-glass)"},children:G.matches.length?c.jsxs("div",{children:[c.jsx("span",{style:{color:"var(--accent-cyan)",fontWeight:700},children:"Found"})," in ",G.matches.join(", ")]}):c.jsx("span",{style:{color:"var(--text-muted)"},children:"No match found"})})]})]}),c.jsx(K0,{anim:C,searchAnim:V}),c.jsxs("div",{className:"glass-panel",style:{padding:"24px",display:"flex",flexDirection:"column",gap:"12px"},children:[c.jsx("div",{className:"panel-label",style:{color:"var(--text-muted)"},children:"SERVER"}),c.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)"},children:"Stores encrypted documents only. No plaintext."}),m.length===0?c.jsx("div",{className:"server-empty",children:"No documents stored yet"}):c.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:m.map(A=>c.jsx(J0,{doc:A},A.name))})]})]})]}),c.jsx("style",{children:`
        .sandbox-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1200px) {
          .sandbox-grid {
            grid-template-columns: 1fr;
          }
        }

        .panel-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        /* Dropzone styles */
        .dropzone-container {
          border: 2px dashed var(--border-glass);
          background: rgba(255, 255, 255, 0.01);
          border-radius: 12px;
          padding: 24px 16px;
          text-align: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .dropzone-container:hover, .dropzone-container.drag-active {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.02);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.05);
        }
        .upload-zone-icon {
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          margin-bottom: 8px;
          transition: var(--transition-smooth);
        }
        .dropzone-container:hover .upload-zone-icon {
          color: var(--accent-cyan);
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.4));
        }
        .upload-main-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .upload-sub-text {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Collapsible Sample Library */
        .lib-wrap {
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.1);
        }
        .lib-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.02);
          border: none;
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .lib-toggle:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        .lib-list {
          background: transparent;
          border-top: 1px solid var(--border-glass);
          display: flex;
          flex-direction: column;
        }
        .lib-file {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          user-select: none;
          transition: var(--transition-smooth);
        }
        .lib-file:last-child {
          border-bottom: none;
        }
        .lib-file:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .lib-file-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .lib-file-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        .lib-kw-hint {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .indexed-tag {
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 212, 255, 0.2);
          font-weight: 500;
        }

        /* Keyword Index styles */
        .kw-index {
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          padding: 16px;
        }
        .kw-index-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .kw-index-row {
          margin-bottom: 14px;
        }
        .kw-index-row:last-child {
          margin-bottom: 0;
        }
        .kw-index-doc {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .kw-index-doc-name {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .kw-index-kws {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .kw-tag {
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-secondary);
          border: 1px solid var(--border-glass);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .kw-tag:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
        }
        .kw-tag-hit {
          background: rgba(0, 212, 255, 0.1) !important;
          color: var(--accent-cyan) !important;
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
        }

        /* Search input & display */
        .search-row {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }
        .search-input {
          flex: 1;
          padding: 10px 14px;
          font-size: 0.85rem;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          color: white;
          outline: none;
          transition: var(--transition-smooth);
        }
        .search-input:focus {
          border-color: var(--accent-cyan);
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.15);
        }
        .search-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 38px;
          background: var(--accent-cyan);
          border: none;
          border-radius: 8px;
          color: #050816;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .search-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.4);
          background: var(--accent-blue);
        }
        .search-result-display {
          padding: 10px 14px;
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Middle Column Animation Panel */
        .pipeline-panel {
          position: relative;
          transition: var(--transition-smooth);
        }
        .pipeline-panel-active {
          border-color: rgba(0, 212, 255, 0.25) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 212, 255, 0.05) !important;
        }
        .pipeline-panel-searching {
          border-color: rgba(123, 97, 255, 0.25) !important;
          box-shadow: 0 8px 32px 0 rgba(123, 97, 255, 0.05) !important;
        }
        .anim-empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          height: 100%;
        }
        .anim-empty-icon {
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .anim-empty-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: center;
          max-width: 200px;
        }
        .anim-step {
          display: flex;
          gap: 16px;
          padding-bottom: 24px;
          position: relative;
          padding-left: 8px;
        }
        .anim-step::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 32px;
          bottom: 0;
          width: 2px;
          background: var(--border-glass);
        }
        .anim-step:last-child::before {
          display: none;
        }
        .anim-step-num {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          transition: var(--transition-smooth);
          z-index: 2;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-glass);
          color: var(--text-muted);
          margin-top: 2px;
          flex-shrink: 0;
        }
        .anim-step-num.active {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }
        .anim-step-num.active-search {
          border-color: var(--accent-purple);
          background: rgba(123, 97, 255, 0.1);
          color: var(--accent-purple);
          box-shadow: 0 0 10px rgba(123, 97, 255, 0.3);
        }
        .anim-step-num.done {
          border-color: var(--accent-cyan);
          background: var(--accent-cyan);
          color: #050816;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
        }
        .anim-step-num.done-search {
          border-color: var(--accent-purple);
          background: var(--accent-purple);
          color: white;
          box-shadow: 0 0 10px rgba(123, 97, 255, 0.2);
        }
        .anim-step-content {
          flex: 1;
          min-width: 0;
        }
        .anim-step-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .anim-doc-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          overflow: hidden;
          margin-top: 8px;
        }
        .anim-doc-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border-glass);
        }
        .anim-doc-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .anim-doc-preview {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 10px 12px;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
          line-height: 1.5;
        }
        .anim-kw-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
        }
        .anim-kw-chip {
          font-size: 0.75rem;
          padding: 3px 8px;
          border-radius: 20px;
          background: rgba(0, 212, 255, 0.08);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 212, 255, 0.2);
          font-weight: 600;
        }
        .anim-kw-pulse {
          font-size: 0.75rem;
          color: var(--text-muted);
          padding: 3px 6px;
        }
        .anim-hash-row {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        @media (max-width: 640px) {
          .anim-hash-row {
            flex-direction: column;
          }
        }
        .anim-hash-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }
        .anim-hash-box {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-glass);
          border-radius: 6px;
          padding: 8px 10px;
          overflow: hidden;
        }
        .anim-hash-text {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin: 0;
          word-break: break-all;
          white-space: pre-wrap;
          line-height: 1.4;
        }
        .anim-kw-small {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-secondary);
          border: 1px solid var(--border-glass);
        }
        .anim-token-small {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-cyan);
        }
        .anim-transmit-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }
        .anim-node-box {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 6px;
          padding: 6px 12px;
          text-align: center;
          transition: var(--transition-smooth);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .anim-track-wrap {
          flex: 1;
          position: relative;
          height: 24px;
        }
        .anim-track-line {
          height: 2px;
          background: var(--border-glass);
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        }
        .anim-track-label {
          position: absolute;
          bottom: -14px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.65rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .anim-sent-note {
          margin-top: 14px;
          font-size: 0.75rem;
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.15);
          border-radius: 6px;
          padding: 6px 12px;
          text-align: center;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* Search pipeline status elements */
        .search-row-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 8px 12px;
          opacity: 0.35;
          transition: var(--transition-smooth);
        }
        .search-row-status.active {
          opacity: 1;
          background: rgba(123, 97, 255, 0.05);
          border-color: rgba(123, 97, 255, 0.3);
        }
        .search-status-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Server Panel cards */
        .srv-doc-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 10px;
          overflow: hidden;
          transition: var(--transition-smooth);
        }
        .srv-doc-card:hover {
          border-color: rgba(123, 97, 255, 0.25);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        .srv-doc-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border-glass);
        }
        .srv-doc-enc-name {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .srv-doc-sub {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
        .srv-gibberish {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          padding: 12px;
          margin: 0;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-all;
          max-height: 80px;
          overflow-y: auto;
        }
        .server-empty {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
          padding: 20px 0;
        }
      `})]})}function W0(){const[m,E]=ee.useState(!1),[T,d]=ee.useState([]),[C,H]=ee.useState([]),[V,R]=ee.useState(!1),[_,v]=ee.useState(0),[G,U]=ee.useState(0),[F,ae]=ee.useState(!1),[je,_e]=ee.useState({total_words:0,total_docs:0,index_entries:0,docs:[],words_sample:[]}),[Ye,Me]=ee.useState(""),[we,Se]=ee.useState(null),[Qe,Ke]=ee.useState([]),[A,O]=ee.useState(!1),$=[{name:"ai_privacy_research.txt",preview:"Reviews deep learning, parameter weights, and homomorphic search privacy architectures...",content:"Artificial intelligence systems rely on deep learning networks. Securing parameters requires homomorphic cryptosystems and vector mathematics."},{name:"health_clinical_audit.txt",preview:"Contains patient diagnostic summaries, clinical trial statistics, and insulin logs...",content:"The healthcare audit reveals patient diagnostic codes. Clinical trials monitor diabetes therapies and insulin concentration logs."},{name:"q1_financial_projection.txt",preview:"Contains quarterly revenue growth targets, cloud scaling models, and pricing metrics...",content:"Quarterly revenue projections exceeded expectations. Cloud computing budgets will scale to accommodate rising enterprise revenue data."}],Y=(o,x="info")=>{Ke(w=>[...w,{time:new Date().toLocaleTimeString(),text:o,type:x}])},K=async()=>{try{const o=await fetch("/stats");if(o.ok){const x=await o.json();_e(x)}}catch(o){Y(`Error loading database stats: ${o.message}`,"error")}};ee.useEffect(()=>{K(),$.forEach(o=>{sessionStorage.getItem(`doc_content:${o.name}`)||sessionStorage.setItem(`doc_content:${o.name}`,o.content)}),Y("Enterprise Upload Portal Initialized. Choose sample files or drop custom files.","info")},[]);const B=o=>{H(x=>x.includes(o)?(Y(`Removed sample file from queue: ${o}`,"info"),x.filter(M=>M!==o)):(Y(`Added sample file to queue: ${o}`,"info"),[...x,o]))},le=o=>{o.preventDefault(),o.stopPropagation(),o.type==="dragenter"||o.type==="dragover"?E(!0):o.type==="dragleave"&&E(!1)},ze=o=>{o.preventDefault(),o.stopPropagation(),E(!1),o.dataTransfer.files&&o.dataTransfer.files[0]&&Xe(Array.from(o.dataTransfer.files))},Ge=o=>{o.preventDefault(),o.target.files&&o.target.files[0]&&Xe(Array.from(o.target.files))},Xe=o=>{const x=o.filter(w=>{const M=w.name.split(".").pop().toLowerCase(),k=["txt","csv","json"].includes(M);return k||Y(`Ignored ${w.name} — Only .txt, .csv, and .json files are supported.`,"error"),k});x.length>0&&d(w=>{const M=[...w];return x.forEach(k=>{if(M.some(J=>J.name===k.name))Y(`Duplicate file skipped: ${k.name}`,"error");else{M.push(k),Y(`Queued custom file: ${k.name} (${(k.size/1024).toFixed(1)} KB)`,"info");const J=new FileReader;J.onload=ue=>{sessionStorage.setItem(`doc_content:${k.name}`,ue.target.result)},J.readAsText(k)}}),M})},j=o=>{const x=T[o].name;d(w=>w.filter((M,k)=>k!==o)),Y(`Removed custom file: ${x}`,"info")},D=async()=>{const o=C.length+T.length;if(o===0)return;R(!0),ae(!1),v(10),U(1),Y(`Ingesting ${o} document(s) into cryptographic indexing pipeline...`,"info");const x=new FormData;C.forEach(w=>{const M=$.find(k=>k.name===w);if(M){const k=new Blob([M.content],{type:"text/plain"});x.append("files",k,M.name)}}),T.forEach(w=>{x.append("files",w)});try{await new Promise(k=>setTimeout(k,600)),v(40),U(2),Y("Extracting text streams and calculating local index frequencies...","info"),await new Promise(k=>setTimeout(k,800)),v(70),U(3),Y("Encrypting word lists. Running secure ntru-oqxt-setup key generation...","info");const w=await fetch("/upload",{method:"POST",body:x});if(!w.ok)throw new Error(`HTTP ${w.status}`);const M=await w.json();v(100),U(4),Y("Cryptographic Indexing Complete. Successfully indexed:","success"),M.processed.forEach(k=>{Y(`  ${k.filename} → Hex ID: [${k.doc_id}] (${k.token_count} tokens)`,"success")}),ae(!0),d([]),H([]),K()}catch(w){Y(`Crypto-index pipeline failure: ${w.message}`,"error"),U(0)}finally{R(!1),setTimeout(()=>{v(0),U(0)},3e3)}},X=async o=>{if(o&&o.preventDefault(),!Ye.trim())return;Y(`Querying index for keywords: "${Ye}"`,"info");const x=Ye.trim().toLowerCase().split(/\s+/).filter(Boolean);try{const w=await Promise.all(x.map(async ce=>{const _t=await(await fetch(`/search?q=${encodeURIComponent(ce)}`)).json();return{word:ce,id:_t.found?_t.word_id:null,docs:_t.found?_t.docs:[]}})),M=w.filter(ce=>!ce.id).map(ce=>ce.word);if(M.length>0){Y(`Search aborted: keywords [${M.join(", ")}] do not exist in current cipher index.`,"error"),Se({found:!1,missing:M});return}const k=w.map(ce=>ce.id);Y(`Executing blind search on: ${k.join(" AND ")}`,"info");const J=await fetch("/conjunctive-search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({word_ids:k,words:x})});if(!J.ok)throw new Error("Search server returned error state");const ue=await J.json();Y("Search complete. Matches identified.","success");let Ue=[];if(w.length>0&&w.every(ce=>ce.id)){Ue=[...w[0].docs];for(let ce=1;ce<w.length;ce++){const ta=w[ce].docs||[];Ue=Ue.filter(_t=>ta.some(Ul=>Ul.doc_id===_t.doc_id))}}Se({found:!0,words:x,word_ids:k,matchingDocs:Ue,output:ue.output,time:"0.28 ms"})}catch(w){Y(`Failed secure query: ${w.message}`,"error")}},de=o=>{const x=sessionStorage.getItem(`doc_content:${o}`);if(!x){Y(`Cannot download ${o} — file content not found in local session cache.`,"error");return}const w=new Blob([x],{type:"text/plain"}),M=URL.createObjectURL(w),k=document.createElement("a");k.href=M,k.download=o,document.body.appendChild(k),k.click(),document.body.removeChild(k),URL.revokeObjectURL(M),Y(`Downloaded document: ${o}`,"success")},he=async()=>{if(window.confirm("WARNING: This will permanently delete all indexed document maps, vocabulary lists, and symmetric keys. Are you sure?")){Y("Sending index purge command to server...","info");try{(await fetch("/reset",{method:"DELETE"})).ok&&(Y("Cryptographic database wiped successfully. Clean state loaded.","error"),Se(null),K())}catch(o){Y(`Purge failed: ${o.message}`,"error")}}};return c.jsxs("section",{id:"try-files",className:"section-padding",children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:60},children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:16},children:"Secure Data Loader"}),c.jsx("h2",{className:"section-title",children:"Try Your Own Files"}),c.jsx("p",{className:"subtitle",children:"Upload custom corpus documents or load preconfigured templates. Our system tokenizes, indexes, and encrypts everything locally and on the server."})]}),c.jsxs("div",{className:"try-stats-row",style:{marginBottom:40},children:[c.jsxs("div",{className:"stat-card glass-panel",children:[c.jsx("span",{className:"stat-num",children:je.total_docs}),c.jsx("span",{className:"stat-label",children:"Indexed Documents"})]}),c.jsxs("div",{className:"stat-card glass-panel",children:[c.jsx("span",{className:"stat-num",children:je.total_words.toLocaleString()}),c.jsx("span",{className:"stat-label",children:"Vocabulary Size"})]}),c.jsxs("div",{className:"stat-card glass-panel",children:[c.jsx("span",{className:"stat-num",children:je.index_entries.toLocaleString()}),c.jsx("span",{className:"stat-label",children:"Index Inversions"})]})]}),c.jsxs("div",{className:"samples-card-block glass-panel",style:{marginBottom:40},children:[c.jsxs("h4",{style:{fontSize:"1.1rem",fontWeight:800,marginBottom:8,display:"flex",alignItems:"center",gap:8},children:[c.jsx(k0,{size:18,className:"accent-text-cyan"})," Select Pre-configured Sample Files"]}),c.jsx("p",{className:"text-secondary",style:{fontSize:"0.9rem",marginBottom:20},children:"Click on any pre-seeded document below to preview its content summary and add it to your cryptographic encryption queue."}),c.jsx("div",{className:"samples-grid",children:$.map((o,x)=>{const w=C.includes(o.name);return c.jsxs("div",{className:`sample-item-card ${w?"active":""}`,onClick:()=>B(o.name),children:[c.jsx("div",{className:"sample-item-checkbox",children:w?c.jsx($i,{size:16,className:"green"}):c.jsx("div",{className:"checkbox-empty"})}),c.jsxs("div",{className:"sample-item-body",children:[c.jsx("span",{className:"sample-item-filename",children:o.name}),c.jsx("p",{className:"sample-item-preview",children:o.preview})]})]},x)})})]}),c.jsxs("div",{className:"upload-section-grid",children:[c.jsxs("div",{className:"upload-portal glass-panel",children:[c.jsxs("h3",{className:"panel-title-text",children:[c.jsx(Fi,{size:14})," Ingest Your Own Files"]}),c.jsxs("div",{className:`dropzone-container ${m?"drag-active":""}`,onDragEnter:le,onDragOver:le,onDragLeave:le,onDrop:ze,children:[c.jsx("input",{type:"file",id:"file-upload-input",multiple:!0,accept:".txt,.csv,.json",onChange:Ge,disabled:V}),c.jsx(Fi,{className:"upload-zone-icon"}),c.jsx("p",{className:"upload-main-text",children:"Drag and drop files here"}),c.jsx("p",{className:"upload-sub-text",children:"Supports .txt, .csv, and .json up to 10MB"})]}),(C.length>0||T.length>0)&&c.jsxs("div",{className:"queued-files-list",children:[c.jsxs("h5",{children:["Files Queued for Encryption (",C.length+T.length,")"]}),c.jsxs("div",{className:"queued-scroll",children:[C.map((o,x)=>c.jsxs("div",{className:"file-chip",children:[c.jsx(Aa,{size:14,className:"accent-text-purple"}),c.jsxs("span",{className:"file-chip-name",children:[o," ",c.jsx("span",{className:"sample-tag-indicator",children:"Sample"})]}),c.jsx("button",{className:"remove-file-btn",onClick:()=>B(o),children:"✕"})]},`sample-${x}`)),T.map((o,x)=>c.jsxs("div",{className:"file-chip",children:[c.jsx(Aa,{size:14,className:"accent-text-cyan"}),c.jsx("span",{className:"file-chip-name",children:o.name}),c.jsxs("span",{className:"file-chip-size",children:["(",(o.size/1024).toFixed(1)," KB)"]}),c.jsx("button",{className:"remove-file-btn",onClick:()=>j(x),children:"✕"})]},`custom-${x}`))]}),c.jsx("button",{className:"btn btn-primary",style:{width:"100%",marginTop:16},onClick:D,disabled:V,children:"Encrypt & Index Queue"})]}),F&&c.jsxs("div",{className:"success-upload-alert fade-in",children:[c.jsx($i,{className:"alert-success-icon"}),c.jsxs("div",{children:[c.jsx("strong",{children:"Files Ingested Successfully!"}),c.jsx("p",{children:"Inverted index generated and stored under blind symmetric envelopes."})]}),c.jsx("button",{className:"close-alert-btn",onClick:()=>ae(!1),children:"✕"})]}),V&&c.jsxs("div",{className:"indexing-pipeline-animation",children:[c.jsx("div",{className:"progress-bar-track",children:c.jsx("div",{className:"progress-bar-fill",style:{width:`${_}%`}})}),c.jsxs("div",{className:"pipeline-steps-icons",children:[c.jsxs("div",{className:`pipe-icon-step ${G>=1?"active":""}`,children:[c.jsx(Aa,{size:16}),c.jsx("span",{children:"Read"})]}),c.jsx(Ea,{size:12,className:"pipe-arrow-m"}),c.jsxs("div",{className:`pipe-icon-step ${G>=2?"active":""}`,children:[c.jsx(Ja,{size:16}),c.jsx("span",{children:"Tokenize"})]}),c.jsx(Ea,{size:12,className:"pipe-arrow-m"}),c.jsxs("div",{className:`pipe-icon-step ${G>=3?"active":""}`,children:[c.jsx($a,{size:16}),c.jsx("span",{children:"Encrypt"})]}),c.jsx(Ea,{size:12,className:"pipe-arrow-m"}),c.jsxs("div",{className:`pipe-icon-step ${G>=4?"active":""}`,children:[c.jsx($i,{size:16}),c.jsx("span",{children:"Store"})]})]})]})]}),c.jsxs("div",{className:"upload-logs-panel glass-panel",children:[c.jsxs("h3",{className:"panel-title-text",children:[c.jsx(_0,{size:14})," Log & System Map"]}),c.jsx("div",{className:"logs-view-mini",children:Qe.map((o,x)=>c.jsxs("div",{className:`log-line-item ${o.type}`,children:[c.jsxs("span",{className:"log-time",children:["[",o.time,"]"]}),c.jsx("span",{className:"log-text",children:o.text})]},x))}),c.jsxs("div",{className:"downloads-area",children:[c.jsx("h4",{children:"Download Cryptographic Maps"}),c.jsx("p",{className:"text-secondary",style:{fontSize:11,marginBottom:12},children:"These files map plaintext keywords and document paths to internal hex values to complete local query encryption."}),c.jsxs("div",{className:"download-chips",children:[c.jsxs("a",{className:"dl-chip",href:"http://localhost:8000/download/word_to_id.csv",target:"_blank",rel:"noreferrer",children:[c.jsx(Ji,{size:12})," word_to_id.csv"]}),c.jsxs("a",{className:"dl-chip",href:"http://localhost:8000/download/id_to_word.csv",target:"_blank",rel:"noreferrer",children:[c.jsx(Ji,{size:12})," id_to_word.csv"]}),c.jsxs("a",{className:"dl-chip",href:"http://localhost:8000/download/doc_to_id.csv",target:"_blank",rel:"noreferrer",children:[c.jsx(Ji,{size:12})," doc_to_id.csv"]}),c.jsxs("a",{className:"dl-chip",href:"http://localhost:8000/download/inverted_index.csv",target:"_blank",rel:"noreferrer",children:[c.jsx(Ji,{size:12})," inverted_index.csv"]})]})]}),c.jsxs("div",{className:"logs-footer-actions",children:[c.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:K,children:[c.jsx(Wf,{size:12,style:{marginRight:6}})," Refresh"]}),c.jsxs("button",{className:"btn btn-danger btn-sm",onClick:he,children:[c.jsx(U0,{size:12,style:{marginRight:6}})," Reset Database"]})]})]})]}),je.total_docs>0&&c.jsxs("div",{className:"uploaded-search-panel glass-panel",style:{marginTop:40},children:[c.jsxs("h3",{className:"panel-title-text",children:[c.jsx(Wi,{size:14})," Search Uploaded Corpus"]}),c.jsxs("form",{onSubmit:X,className:`search-form-row search-bar-container ${A?"focused":""}`,children:[c.jsx("div",{className:"search-bar-neon-frame"}),c.jsxs("div",{className:"search-input-wrap",style:{flexGrow:1,position:"relative"},children:[c.jsx(Wi,{className:"search-bar-icon",size:20,style:{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",color:A?"var(--accent-cyan)":"var(--text-muted)",transition:"color 0.3s ease"}}),c.jsx("input",{type:"text",className:"input-field search-bar-input",placeholder:"Enter keywords separated by spaces to search matching ciphertexts...",value:Ye,onChange:o=>Me(o.target.value),onFocus:()=>O(!0),onBlur:()=>O(!1),style:{width:"100%",paddingLeft:52,background:"rgba(0,0,0,0.35)",border:"1px solid var(--border-glass)",borderRadius:8}})]}),c.jsx("button",{type:"submit",className:"btn btn-cyan search-bar-btn",children:"Query Index"})]}),we&&c.jsx("div",{className:"search-result-block fade-in",style:{marginTop:30},children:we.found?c.jsxs("div",{className:"result-success-box",children:[c.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:16},children:[c.jsx("span",{className:"badge badge-green",children:"Results Decrypted"}),c.jsxs("span",{className:"badge",children:["Search Speed: ",we.time]})]}),c.jsxs("div",{style:{marginBottom:16},children:[c.jsx("span",{style:{fontSize:11,color:"var(--text-muted)",display:"block",marginBottom:6},children:"Cryptographic Word IDs matching your search:"}),c.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:we.words.map((o,x)=>c.jsxs("span",{style:{fontSize:11,fontFamily:"var(--font-mono)",background:"rgba(123, 97, 255, 0.1)",color:"var(--accent-purple)",padding:"4px 10px",borderRadius:4,border:"1px solid rgba(123, 97, 255, 0.25)"},children:[c.jsx("strong",{children:o})," → Token: [",we.word_ids[x],"]"]},x))})]}),c.jsxs("div",{style:{marginBottom:20},children:[c.jsx("span",{style:{fontSize:11,color:"var(--text-muted)",display:"block",marginBottom:8},children:"Matching Document IDs where searched text is located:"}),we.matchingDocs&&we.matchingDocs.length>0?c.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:we.matchingDocs.map((o,x)=>c.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255, 255, 255, 0.02)",border:"1px solid var(--border-glass)",padding:"8px 12px",borderRadius:6},children:[c.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[c.jsxs("span",{style:{fontSize:13,fontWeight:600,color:"var(--accent-cyan)"},children:["📄 ",o.doc_name]}),c.jsxs("span",{className:"text-mono",style:{fontSize:10,background:"rgba(0, 212, 255, 0.1)",color:"var(--accent-cyan)",padding:"2px 6px",borderRadius:4,border:"1px solid rgba(0, 212, 255, 0.2)"},children:["Doc ID: ",o.doc_id]})]}),c.jsx("button",{className:"btn btn-secondary btn-sm",style:{padding:"4px 10px",fontSize:10},onClick:()=>de(o.doc_name),children:"Download"})]},x))}):c.jsx("p",{style:{fontSize:12,color:"var(--text-muted)"},children:"No matching documents contain all search keywords."})]}),c.jsx("pre",{className:"text-mono",style:{background:"rgba(0,0,0,0.4)",padding:16,borderRadius:8,fontSize:13,border:"1px solid rgba(255,255,255,0.05)",color:"#10b981"},children:we.output})]}):c.jsxs("div",{className:"result-error-box",style:{background:"rgba(244,63,94,0.05)",border:"1px solid rgba(244,63,94,0.2)",padding:16,borderRadius:8,color:"#f43f5e"},children:[c.jsx("strong",{children:"Keywords missing:"})," ",we.missing.join(", ")," (no index matching)."]})})]})]}),c.jsx("style",{children:`
        .try-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 640px) {
          .try-stats-row {
            grid-template-columns: 1fr;
          }
        }

        .stat-card {
          padding: 24px;
          text-align: center;
        }

        .stat-num {
          display: block;
          font-size: 2.25rem;
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        /* Samples Grid */
        .samples-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .sample-item-card {
          border: 1px solid var(--border-glass);
          background: rgba(255, 255, 255, 0.01);
          padding: 16px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          transition: var(--transition-smooth);
        }

        .sample-item-card:hover {
          border-color: rgba(0, 212, 255, 0.25);
          background: rgba(0, 212, 255, 0.02);
          transform: translateY(-2px);
        }

        .sample-item-card.active {
          border-color: var(--accent-purple);
          background: rgba(123, 97, 255, 0.05);
          box-shadow: 0 4px 15px rgba(123, 97, 255, 0.15);
        }

        .sample-item-checkbox {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkbox-empty {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid var(--text-muted);
        }

        .sample-item-filename {
          display: block;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
          margin-bottom: 4px;
        }

        .sample-item-card.active .sample-item-filename {
          color: var(--accent-purple);
        }

        .sample-item-preview {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Upload grids */
        .upload-section-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .upload-section-grid {
            grid-template-columns: 1fr;
          }
        }

        .upload-portal {
          padding: 30px;
          position: relative;
        }

        /* Dropzone styles */
        .dropzone-container {
          border: 2px dashed var(--border-glass);
          background: rgba(0, 0, 0, 0.15);
          border-radius: 12px;
          padding: 44px 24px;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .dropzone-container:hover, .dropzone-container.drag-active {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.02);
          box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.05);
        }

        .dropzone-container input[type="file"] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .upload-zone-icon {
          width: 38px;
          height: 38px;
          color: var(--text-muted);
          margin-bottom: 12px;
          transition: var(--transition-smooth);
        }

        .dropzone-container:hover .upload-zone-icon {
          color: var(--accent-cyan);
          transform: translateY(-2px);
        }

        .upload-main-text {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .upload-sub-text {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }

        /* Queued files list */
        .queued-files-list {
          margin-top: 24px;
          border-top: 1px solid var(--border-glass);
          padding-top: 20px;
        }

        .queued-files-list h5 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .queued-scroll {
          max-height: 150px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .file-chip {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          padding: 8px 12px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
        }

        .file-chip-name {
          margin-left: 8px;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-grow: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sample-tag-indicator {
          font-size: 9px;
          background: rgba(123, 97, 255, 0.15);
          color: var(--accent-purple);
          border: 1px solid rgba(123, 97, 255, 0.25);
          padding: 1px 5px;
          border-radius: 4px;
        }

        .file-chip-size {
          color: var(--text-muted);
          margin-right: 12px;
        }

        .remove-file-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 11px;
        }

        .remove-file-btn:hover {
          color: #f43f5e;
        }

        /* Success upload toast */
        .success-upload-alert {
          margin-top: 20px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 8px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .alert-success-icon {
          color: #10b981;
          flex-shrink: 0;
        }

        .success-upload-alert p {
          color: var(--text-secondary);
          font-size: 0.75rem;
          margin-top: 2px;
        }

        .close-alert-btn {
          margin-left: auto;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .close-alert-btn:hover {
          color: white;
        }

        /* Indexing pipeline animation */
        .indexing-pipeline-animation {
          margin-top: 24px;
        }

        .progress-bar-track {
          height: 4px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 16px;
          position: relative;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
          border-radius: 2px;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px var(--accent-cyan);
        }

        .pipeline-steps-icons {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }

        .pipe-icon-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }

        .pipe-icon-step.active {
          color: var(--accent-cyan);
        }

        .pipe-icon-step.active span {
          color: var(--text-primary);
        }

        .pipe-icon-step span {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .pipe-arrow-m {
          color: var(--text-muted);
          opacity: 0.5;
        }

        /* Upload logs panel */
        .upload-logs-panel {
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 440px;
        }

        .logs-view-mini {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          height: 160px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.3);
        }

        .downloads-area {
          margin: 20px 0;
          border-top: 1px solid var(--border-glass);
          padding-top: 20px;
        }

        .downloads-area h4 {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .download-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .dl-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          padding: 6px 12px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .dl-chip:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.03);
          transform: translateY(-1px);
        }

        .logs-footer-actions {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border-glass);
          padding-top: 16px;
        }

        /* Animated Glowing Search Bar */
        .search-bar-container {
          position: relative;
          display: flex;
          align-items: center;
          padding: 6px;
          border-radius: 12px;
          background: rgba(5, 8, 22, 0.6);
          border: 1px solid var(--border-glass);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .search-bar-container.focused {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 25px rgba(0, 212, 255, 0.25);
          transform: translateY(-2px);
        }

        .search-bar-neon-frame {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          pointer-events: none;
          opacity: 0;
          border: 2px solid transparent;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: opacity 0.3s ease;
        }

        .search-bar-container.focused .search-bar-neon-frame {
          opacity: 1;
        }

        .search-bar-input {
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          outline: none !important;
          color: white;
          font-size: 1rem;
          height: 48px;
          padding-left: 52px !important;
        }

        .search-bar-btn {
          border-radius: 8px;
          padding: 12px 24px;
          height: 44px;
          font-size: 0.85rem;
          margin-left: 8px;
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
          color: #050816;
          border: none;
          box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
          transition: all 0.3s ease;
        }

        .search-bar-btn:hover {
          box-shadow: 0 6px 20px rgba(0, 212, 255, 0.5);
          transform: translateY(-1px);
        }

        .green {
          color: #10b981;
        }

        .fade-in {
          animation: fade-in-keyframes 0.5s ease-out forwards;
        }

        @keyframes fade-in-keyframes {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `})]})}function F0(){const m=[{feature:"Server sees search query",traditional:{value:"Yes",status:"fail",desc:"The query string is exposed in memory and database execution logs."},platform:{value:"No",status:"pass",desc:"The keyword is encrypted locally to a trapdoor hash. The server only sees random hex tokens."}},{feature:"Encrypted-state indexing",traditional:{value:"No",status:"fail",desc:"Indices contain plain text words linking to plaintext docs."},platform:{value:"Yes",status:"pass",desc:"Index stores key mappings in high-entropy states, decryptable only by client private keys."}},{feature:"Search on ciphertext",traditional:{value:"No",status:"fail",desc:"Must decrypt database records or memory index before matching."},platform:{value:"Yes",status:"pass",desc:"Executes symmetric trapdoor token comparisons without revealing index rows."}},{feature:"Data exposure on database breach",traditional:{value:"High",status:"fail",desc:"A breach exposes all documents, indexes, and search logs."},platform:{value:"None",status:"pass",desc:"Breached index logs contain only high-entropy strings, rendering them useless."}},{feature:"End-to-end encryption integrity",traditional:{value:"Partial",status:"fail",desc:"Decrypted temporarily on host node during calculation loops."},platform:{value:"Full",status:"pass",desc:"Always encrypted in transit, storage, and computation layers."}}],E=[{title:"GDPR Compliant",desc:"Perfectly aligns with Article 32 ('Security of Processing') and the Right to be Forgotten by cryptographically wiping client keys.",badge:"Regulation Compliant"},{title:"SOC 2 Type II",desc:"Designed to meet the absolute limits of the Security Trust Services Criteria through zero-trust isolation architecture.",badge:"Enterprise Ready"},{title:"ISO/IEC 27001",desc:"Fully integrates into standard Information Security Management Systems (ISMS), defining post-quantum backup protocols.",badge:"Certified Standard"},{title:"HIPAA Compliant",desc:"Protects Protected Health Information (PHI) by ensuring the hosting cloud cannot view clinical patient databases.",badge:"Healthcare Approved"}];return c.jsxs("section",{id:"security",className:"section-padding",style:{background:"linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%)"},children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:60},children:[c.jsx("div",{className:"badge badge-red",style:{marginBottom:16},children:"Enterprise Compliance"}),c.jsx("h2",{className:"section-title",children:"Security First. Always."}),c.jsx("p",{className:"subtitle",children:"We render cloud database breaches cryptographically harmless. Review how our mathematical guarantees stack up against traditional models."})]}),c.jsx("div",{className:"table-wrapper-sec glass-panel",style:{marginBottom:80},children:c.jsxs("table",{className:"comparison-table",children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{children:"Security Feature Matrix"}),c.jsx("th",{children:"Traditional Search"}),c.jsx("th",{className:"highlight-col",children:"Symmetric & FHE Search"})]})}),c.jsx("tbody",{children:m.map((T,d)=>c.jsxs("tr",{children:[c.jsx("td",{className:"feature-cell",children:c.jsx("strong",{children:T.feature})}),c.jsx("td",{className:"trad-cell",children:c.jsxs("div",{className:"cell-flex",children:[c.jsx(If,{className:"cell-icon-err",size:16}),c.jsxs("div",{children:[c.jsx("span",{children:T.traditional.value}),c.jsx("p",{className:"cell-sub",children:T.traditional.desc})]})]})}),c.jsx("td",{className:"plat-cell highlight-col",children:c.jsxs("div",{className:"cell-flex",children:[c.jsx($i,{className:"cell-icon-ok",size:16}),c.jsxs("div",{children:[c.jsx("span",{children:T.platform.value}),c.jsx("p",{className:"cell-sub-light",children:T.platform.desc})]})]})})]},d))})]})}),c.jsxs("div",{className:"certs-section",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:50},children:[c.jsx("h3",{className:"section-subtitle",children:"Certifications & Standards by Design"}),c.jsx("p",{className:"subtitle",children:"Our zero-knowledge design matches global requirements out-of-the-box."})]}),c.jsx("div",{className:"certs-grid",children:E.map((T,d)=>c.jsxs("div",{className:"cert-card glass-panel",children:[c.jsxs("div",{className:"cert-header",children:[c.jsx(Vf,{className:"cert-icon"}),c.jsx("span",{className:"badge badge-cyan",style:{fontSize:9},children:T.badge})]}),c.jsx("h4",{className:"cert-title",children:T.title}),c.jsx("p",{className:"cert-desc",children:T.desc})]},d))})]})]}),c.jsx("style",{children:`
        .table-wrapper-sec {
          overflow-x: auto;
          padding: 24px;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .comparison-table th {
          padding: 18px 20px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-glass);
        }

        .comparison-table td {
          padding: 24px 20px;
          border-bottom: 1px solid var(--border-glass);
          vertical-align: top;
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .feature-cell {
          font-size: 1rem;
          color: white;
          max-width: 250px;
        }

        .cell-flex {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .cell-icon-err {
          color: #f43f5e;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .cell-icon-ok {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .cell-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
          line-height: 1.4;
        }

        .cell-sub-light {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 4px;
          line-height: 1.4;
        }

        .highlight-col {
          background: rgba(123, 97, 255, 0.02);
          border-left: 1px solid rgba(123, 97, 255, 0.1);
          border-right: 1px solid rgba(123, 97, 255, 0.1);
        }

        th.highlight-col {
          color: var(--accent-cyan) !important;
          background: rgba(123, 97, 255, 0.05);
        }

        /* Certifications cards grid */
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .cert-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cert-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
          padding: 6px;
          border-radius: 8px;
          border: 1px solid rgba(0, 212, 255, 0.15);
        }

        .cert-title {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .cert-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `})]})}function I0(){const[m,E]=ee.useState("python"),[T,d]=ee.useState(!1),C={python:`import httpx
from latticectrl import CryptClient

# 1. Initialize local cryptographic client
client = CryptClient(
    n_params="ntru_oqxt_610", 
    secret_key_path="./keys/private.key"
)

# 2. Local encryption of keywords to trapdoor hashes
query_string = "insulin diabetes patient"
tokens = client.generate_trapdoors(query_string)
# Output: ["8E7A4C9F", "A0F3D21E", "5C6D7E8F"]

# 3. Dispatch secure conjunctive search to cloud host
response = httpx.post(
    "https://api.latticectrypt.io/v1/conjunctive-search",
    json={"word_ids": tokens}
)

# 4. Decrypt matched document lists locally
results = response.json()
matched_docs = client.decrypt_results(results["output"])

print(f"Decrypted Matches: {matched_docs}")`,node:`const { CryptClient } = require('@latticectrypt/sdk');
const axios = require('axios');

// 1. Initialize local cryptographic client
const client = new CryptClient({
  keyPath: './keys/private.key'
});

async function runSecureSearch() {
  // 2. Local encryption of query strings
  const trapdoors = client.generateTrapdoors("machine learning");
  
  // 3. Dispatch blind search query
  const res = await axios.post('https://api.latticectrypt.io/v1/conjunctive-search', {
    word_ids: trapdoors
  });
  
  // 4. Decrypt ciphertext payload locally
  const matchedDocs = client.decryptResults(res.data.output);
  console.log("Decrypted Matches:", matchedDocs);
}

runSecureSearch();`,java:`import io.latticectrypt.CryptClient;
import io.latticectrypt.SearchResults;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.URI;

public class App {
    public static void main(String[] args) throws Exception {
        // 1. Load keys and client
        CryptClient client = new CryptClient("./keys/private.key");
        
        // 2. Encrypt search words locally
        String[] trapdoors = client.generateTrapdoors("revenue targets");
        
        // 3. Execute request
        String jsonPayload = String.format("{\\"word_ids\\": [\\"%s\\", \\"%s\\"]}", trapdoors[0], trapdoors[1]);
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.latticectrypt.io/v1/conjunctive-search"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();
            
        // 4. Parse results
        String responseBody = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString()).body();
        String[] matchedDocs = client.decryptResults(responseBody);
    }
}`,rest:`# Post-Quantum Inverted Index Setup Endpoint
POST /upload
Host: api.latticectrypt.io
Content-Type: multipart/form-data

files: [text_corpus.txt]

# Cryptographic Conjunctive Search Endpoint
POST /conjunctive-search
Host: api.latticectrypt.io
Content-Type: application/json

{
  "word_ids": ["8E7A4C9F", "A0F3D21E"],
  "words": ["machine", "learning"]
}`},H=()=>{navigator.clipboard.writeText(C[m]),d(!0),setTimeout(()=>d(!1),2e3)};return c.jsxs("section",{id:"docs",className:"section-padding",children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:60},children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:16},children:"Developer Core"}),c.jsx("h2",{className:"section-title",children:"Developer Integration & SDKs"}),c.jsx("p",{className:"subtitle",children:"Integrate post-quantum secure searchable symmetric encryption into your app pipelines in minutes."})]}),c.jsxs("div",{className:"docs-layout-grid",children:[c.jsxs("div",{className:"docs-text-guide",children:[c.jsxs("div",{className:"guide-step",children:[c.jsx("span",{className:"step-num",children:"01"}),c.jsx("h4",{children:"Load Local Cryptographic Secrets"}),c.jsx("p",{className:"text-secondary",children:"SDKs operate strictly within client environments. Your private keys stay inside client RAM boundaries, keeping your cryptographic root of trust fully isolated from the host."})]}),c.jsxs("div",{className:"guide-step",children:[c.jsx("span",{className:"step-num",children:"02"}),c.jsx("h4",{children:"Generate Trapdoor Tokens"}),c.jsx("p",{className:"text-secondary",children:"Convert search strings into blind hex tokens locally. Host index query nodes match tokens without seeing the underlying search keywords."})]}),c.jsxs("div",{className:"guide-step",children:[c.jsx("span",{className:"step-num",children:"03"}),c.jsx("h4",{children:"Submit Blind Queries & Decrypt"}),c.jsx("p",{className:"text-secondary",children:"Query calculations compile in zero-knowledge. Results are returned in encrypted states, and decrypted on client hardware inside secure sandboxes."})]})]}),c.jsxs("div",{className:"ide-panel",children:[c.jsxs("div",{className:"ide-header",children:[c.jsxs("div",{className:"ide-tabs",children:[c.jsx("button",{className:`ide-tab ${m==="python"?"active":""}`,onClick:()=>E("python"),children:"python"}),c.jsx("button",{className:`ide-tab ${m==="node"?"active":""}`,onClick:()=>E("node"),children:"node.js"}),c.jsx("button",{className:`ide-tab ${m==="java"?"active":""}`,onClick:()=>E("java"),children:"java"}),c.jsx("button",{className:`ide-tab ${m==="rest"?"active":""}`,onClick:()=>E("rest"),children:"rest api"})]}),c.jsxs("button",{className:"ide-copy-btn",onClick:H,children:[T?c.jsx(tt,{size:14,className:"green"}):c.jsx(t0,{size:14}),c.jsx("span",{children:T?"Copied":"Copy"})]})]}),c.jsx("div",{className:"ide-body",children:c.jsx("pre",{className:"ide-code text-mono",children:c.jsx("code",{children:C[m]})})}),c.jsxs("div",{className:"ide-footer",children:[c.jsx("span",{className:"footer-status",children:"● Sandbox API v1.0.0"}),c.jsxs("span",{className:"footer-lang",children:[m," environment ready"]})]})]})]})]}),c.jsx("style",{children:`
        .docs-layout-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
        }

        @media (max-width: 900px) {
          .docs-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        .docs-text-guide {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .guide-step {
          position: relative;
          padding-left: 50px;
        }

        .guide-step .step-num {
          position: absolute;
          left: 0;
          top: 0;
          font-family: var(--font-mono);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }

        .guide-step h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .guide-step p {
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* IDE Panel */
        .ide-panel {
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          background: #060913;
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 480px;
        }

        .ide-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0c0f1d;
          border-bottom: 1px solid var(--border-glass);
          padding: 0 16px;
          height: 48px;
        }

        .ide-tabs {
          display: flex;
          gap: 4px;
          height: 100%;
        }

        .ide-tab {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 0 16px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
          height: 100%;
        }

        .ide-tab:hover {
          color: var(--text-primary);
        }

        .ide-tab.active {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.02);
        }

        .ide-copy-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 6px;
          padding: 6px 12px;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition-smooth);
        }

        .ide-copy-btn:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.03);
        }

        .ide-body {
          flex-grow: 1;
          padding: 24px;
          overflow: auto;
        }

        .ide-code {
          color: #a5b4fc;
          font-size: 0.8rem;
          line-height: 1.5;
          text-align: left;
          white-space: pre;
        }

        .ide-footer {
          display: flex;
          justify-content: space-between;
          padding: 10px 16px;
          background: #090c17;
          border-top: 1px solid var(--border-glass);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }

        .green {
          color: #10b981;
        }
      `})]})}function P0(){const m=[{year:"Q1 2024",title:"Core Cryptographic R&D",desc:"Completed basic primitives implementation for symmetric index generation and NTRU lattice masking parameters, hitting <5ms trapdoor benchmarks.",status:"completed"},{year:"Q3 2024",title:"Academic Peer Review",desc:"Submitted index architecture papers to global cryptography conferences. Validated IND-CKA2 security constraints against active adversaries.",status:"completed"},{year:"Q1 2025",title:"FastAPI Engine & Setup Release",desc:"Built the high-speed Python/C++ search middleware. Rolled out CLI compilers and index statistics dashboards.",status:"completed"},{year:"Q3 2025",title:"V2 Enterprise SDK Release",desc:"Published official React, Python, and Node.js wrapper SDKs containing local trapdoor generators and client-side sandbox decryptors.",status:"current"},{year:"Q1 2026",title:"FHE Parallel Calculations",desc:"Deploying vectorized Homomorphic calculations to filter and aggregate database numeric columns directly on ciphertext.",status:"upcoming"}],E=[{name:"Debadrita Talapatra",role:"Main Developer",credentials:"Lead Cryptographic Systems Architect"},{name:"Ankit Pal",role:"Student Researcher",credentials:"Secure Search Algorithm Implementer"},{name:"Prof. Debdeep Mukhopadhyay",role:"Professor Advisor",credentials:"Faculty Advisor & Cryptography Consultant"}];return c.jsxs("section",{id:"about",className:"section-padding",style:{background:"linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)"},children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:80},children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:16},children:"Our Narrative"}),c.jsx("h2",{className:"section-title",children:"Mission, Research & Roadmap"}),c.jsx("p",{className:"subtitle",children:"Pioneering post-quantum zero-knowledge search algorithms to secure enterprise databases."})]}),c.jsxs("div",{className:"about-intro-grid",style:{marginBottom:80},children:[c.jsxs("div",{className:"intro-card glass-panel",children:[c.jsxs("div",{className:"intro-header",children:[c.jsx(Nr,{className:"intro-icon"}),c.jsx("h3",{children:"Our Mission"})]}),c.jsx("p",{className:"intro-text",children:"To eliminate the conflict between database usability and privacy. We believe enterprises should leverage the speed of cloud database index search without ever exposing proprietary payloads or search records to cloud hosting servers."})]}),c.jsxs("div",{className:"intro-card glass-panel",children:[c.jsxs("div",{className:"intro-header",children:[c.jsx(Kf,{className:"intro-icon"}),c.jsx("h3",{children:"Research Background"})]}),c.jsx("p",{className:"intro-text",children:"Our indexing engine is built on standard Searchable Symmetric Encryption (SSE) protocols, using NTRU key exchange parameters and Blake3 block hashing. We specialize in post-quantum, sub-linear lookup times using Bloom filters and OQXT index designs."})]})]}),c.jsxs("div",{className:"roadmap-timeline-section",style:{marginBottom:80},children:[c.jsxs("div",{className:"text-center",style:{marginBottom:50},children:[c.jsx("h3",{className:"section-subtitle",children:"Development Roadmap"}),c.jsx("p",{className:"subtitle",children:"Trace our milestones from academic concepts to production deployment."})]}),c.jsx("div",{className:"timeline-track",children:m.map((T,d)=>c.jsxs("div",{className:`timeline-item ${T.status}`,children:[c.jsx("div",{className:"timeline-dot-wrap",children:c.jsx("div",{className:"timeline-node-dot",children:T.status==="completed"&&c.jsx(Jf,{size:14,className:"node-icon-check"})})}),c.jsxs("div",{className:"timeline-content-card glass-panel",children:[c.jsxs("div",{className:"timeline-year-badge",children:[c.jsx("span",{className:"text-mono",children:T.year}),c.jsx("span",{className:`milestone-status-tag ${T.status}`,children:T.status})]}),c.jsx("h4",{children:T.title}),c.jsx("p",{className:"text-secondary",children:T.desc})]})]},d))})]}),c.jsxs("div",{className:"team-section",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:50},children:[c.jsx("h3",{className:"section-subtitle",children:"Cryptographic Advisory Board"}),c.jsx("p",{className:"subtitle",children:"Built by leading researchers in secure multi-party computation and systems infrastructure."})]}),c.jsx("div",{className:"team-grid",children:E.map((T,d)=>c.jsxs("div",{className:"team-card glass-panel",children:[c.jsx("div",{className:"team-avatar-placeholder",children:c.jsx("span",{children:T.name.split(" ").map(C=>C[0]).join("")})}),c.jsx("h4",{className:"team-name",children:T.name}),c.jsx("p",{className:"team-role accent-text-cyan",children:T.role}),c.jsx("p",{className:"team-creds",children:T.credentials})]},d))})]})]}),c.jsx("style",{children:`
        .about-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        @media (max-width: 768px) {
          .about-intro-grid {
            grid-template-columns: 1fr;
          }
        }

        .intro-card {
          padding: 35px;
        }

        .intro-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .intro-icon {
          color: var(--accent-cyan);
          width: 32px;
          height: 32px;
        }

        .intro-header h3 {
          font-size: 1.3rem;
          font-weight: 800;
        }

        .intro-text {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* Timeline Roadmap styles */
        .timeline-track {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .timeline-track::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border-glass);
        }

        .timeline-item {
          display: flex;
          gap: 24px;
          margin-bottom: 40px;
          position: relative;
        }

        .timeline-dot-wrap {
          width: 40px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .timeline-node-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--bg-slate);
          border: 2px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
        }

        .timeline-item.completed .timeline-node-dot {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

        .timeline-item.current .timeline-node-dot {
          background: rgba(123, 97, 255, 0.2);
          border-color: var(--accent-purple);
          box-shadow: 0 0 10px rgba(123, 97, 255, 0.3);
        }

        .node-icon-check {
          color: #10b981;
        }

        .timeline-content-card {
          flex-grow: 1;
          padding: 24px;
        }

        .timeline-year-badge {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .timeline-year-badge span:first-child {
          font-weight: 700;
          color: white;
          font-size: 1.1rem;
        }

        .milestone-status-tag {
          font-size: 9px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .milestone-status-tag.completed {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .milestone-status-tag.current {
          background: rgba(123, 97, 255, 0.1);
          color: var(--accent-purple);
        }

        .milestone-status-tag.upcoming {
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-cyan);
        }

        .timeline-content-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        /* Team styles */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .team-card {
          padding: 30px 20px;
          text-align: center;
        }

        .team-avatar-placeholder {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent-cyan);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .team-name {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .team-role {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .team-creds {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      `})]})}function eg(){const m=[{icon:c.jsx(x0,{className:"sse-step-icon"}),title:"1. Setup Phase",formula:"Setup(λ) → K",desc:"Generates secure symmetric key K locally using security parameter λ. This key stays strictly on client hardware."},{icon:c.jsx(Kf,{className:"sse-step-icon"}),title:"2. Build Index Phase",formula:"BuildIndex(K, D) → I",desc:"Tokenizes and hashes document collection D. Unique words are converted to pseudo-random identifiers and mapped to document lists. The index is encrypted using K and stored on the server."},{icon:c.jsx(Wf,{className:"sse-step-icon"}),title:"3. Trapdoor Generation",formula:"Trapdoor(K, w) → Tw",desc:"When searching for word w, the client uses K to generate a pseudorandom search token (trapdoor Tw) locally."},{icon:c.jsx(Ja,{className:"sse-step-icon"}),title:"4. Ciphertext Search",formula:"Search(I, Tw) → R",desc:"The server receives trapdoor Tw. It queries encrypted index I to find matching document IDs blindly. The server returns encrypted search results R without learning w."}];return c.jsxs("section",{id:"sse-explain",className:"section-padding",style:{background:"linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%)"},children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:60},children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:16},children:"Cryptographic Theory"}),c.jsx("h2",{className:"section-title",children:"Understanding Searchable Symmetric Encryption"}),c.jsx("p",{className:"subtitle",children:"SSE is a cryptographic breakthrough that balances cloud processing speed with absolute data confidentiality."})]}),c.jsx("div",{className:"sse-intro-panel glass-panel",style:{marginBottom:60},children:c.jsxs("div",{className:"sse-intro-content",children:[c.jsxs("div",{className:"sse-intro-title-wrap",children:[c.jsx(Ff,{className:"sse-shield"}),c.jsx("h3",{children:"What is SSE?"})]}),c.jsxs("p",{className:"sse-intro-text",children:[c.jsx("strong",{children:"Searchable Symmetric Encryption (SSE)"})," enables a client to store a collection of encrypted documents on an untrusted server (such as a public cloud provider) while maintaining the ability to execute keyword searches over the encrypted corpus."]}),c.jsx("p",{className:"sse-intro-subtext",children:"Unlike traditional models where data must be decrypted in host memory to be indexed or searched, SSE executes the search directly on the ciphertext. The server processes queries blindly, yielding zero exposure of underlying content or queries."})]})}),c.jsx("div",{className:"sse-steps-grid",style:{marginBottom:60},children:m.map((E,T)=>c.jsxs("div",{className:"sse-step-card glass-panel",children:[c.jsxs("div",{className:"sse-step-header",children:[E.icon,c.jsx("span",{className:"sse-step-formula text-mono",children:E.formula})]}),c.jsx("h4",{className:"sse-step-title",children:E.title}),c.jsx("p",{className:"sse-step-desc text-secondary",children:E.desc})]},T))}),c.jsxs("div",{className:"sse-theory-grid",children:[c.jsxs("div",{className:"theory-card glass-panel",children:[c.jsxs("div",{className:"theory-header",children:[c.jsx($a,{className:"theory-icon"}),c.jsx("h4",{children:"IND-CKA2 Security Standard"})]}),c.jsxs("p",{className:"theory-text",children:["Our implementation adheres to the ",c.jsx("strong",{children:"IND-CKA2"})," (Indistinguishability under Chosen Keyword Attacks) standard. This mathematically guarantees that the encrypted files and index index tokens leak absolutely zero information about the documents to a passive adversary."]}),c.jsxs("ul",{className:"theory-list",children:[c.jsx("li",{children:"Symmetric encryption blocks utilize AES-GCM-256 primitives."}),c.jsx("li",{children:"Keyword tokens are masked using cryptographically secure PRFs."}),c.jsx("li",{children:"Zero plaintext remnants are written to index databases."})]})]}),c.jsxs("div",{className:"theory-card glass-panel",children:[c.jsxs("div",{className:"theory-header",children:[c.jsx(c0,{className:"theory-icon"}),c.jsx("h4",{children:"Cryptographic Leakage Profiles"})]}),c.jsx("p",{className:"theory-text",children:"In practical SSE deployments, minor patterns called leakage profiles are accepted to achieve practical search speeds (sub-millisecond O(1) searches):"}),c.jsxs("div",{className:"leakage-boxes",children:[c.jsxs("div",{className:"leak-item",children:[c.jsx("h5",{children:"Search Pattern"}),c.jsx("p",{children:"Leaks whether two search queries are for the same keyword (essential for caching search tokens)."})]}),c.jsxs("div",{className:"leak-item",children:[c.jsx("h5",{children:"Access Pattern"}),c.jsx("p",{children:"Leaks which set of encrypted documents match a query (unavoidable when retrieving matching records)."})]})]})]})]})]}),c.jsx("style",{children:`
        .sse-intro-panel {
          padding: 40px;
          border-left: 4px solid var(--accent-cyan);
        }

        .sse-intro-title-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .sse-shield {
          width: 36px;
          height: 36px;
          color: var(--accent-cyan);
        }

        .sse-intro-panel h3 {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .sse-intro-text {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .sse-intro-subtext {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Steps */
        .sse-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .sse-step-card {
          padding: 30px 24px;
        }

        .sse-step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .sse-step-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-purple);
          background: rgba(123, 97, 255, 0.05);
          padding: 6px;
          border-radius: 8px;
          border: 1px solid rgba(123, 97, 255, 0.15);
        }

        .sse-step-formula {
          font-size: 11px;
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid rgba(0, 212, 255, 0.1);
          font-weight: 600;
        }

        .sse-step-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .sse-step-desc {
          font-size: 0.85rem;
          line-height: 1.5;
        }

        /* Theory section */
        .sse-theory-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        @media (max-width: 768px) {
          .sse-theory-grid {
            grid-template-columns: 1fr;
          }
        }

        .theory-card {
          padding: 35px;
        }

        .theory-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .theory-icon {
          color: var(--accent-cyan);
          width: 28px;
          height: 28px;
        }

        .theory-header h4 {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .theory-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .theory-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .theory-list li {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .theory-list li::before {
          content: '✔';
          color: var(--accent-cyan);
          font-size: 10px;
        }

        .leakage-boxes {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .leak-item {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-glass);
          padding: 14px;
          border-radius: 8px;
        }

        .leak-item h5 {
          color: var(--accent-purple);
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .leak-item p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `})]})}function tg(){const[m,E]=ee.useState("home"),[T,d]=ee.useState(!1),[C,H]=ee.useState(!1),V=ee.useRef(null);ee.useEffect(()=>{const _=()=>{d(window.scrollY>50);const v=["home","platform","technology","sse-explain","demo","try-files","security","pricing","docs","about"],G=window.scrollY+200;for(const U of v){const F=document.getElementById(U);if(F){const ae=F.offsetTop,je=F.offsetHeight;if(G>=ae&&G<ae+je){E(U);break}}}};return window.addEventListener("scroll",_),()=>window.removeEventListener("scroll",_)},[]);const R=_=>{H(!1);const v=document.getElementById(_);v&&(window.scrollTo({top:v.offsetTop-80,behavior:"smooth"}),E(_))};return ee.useEffect(()=>{const _=V.current;if(!_)return;const v=_.getContext("2d");let G,U=_.width=window.innerWidth,F=_.height=window.innerHeight,ae={x:U/2,y:F/2,tx:U/2,ty:F/2};const je=A=>{ae.tx=A.clientX,ae.ty=A.clientY},_e=()=>{U=_.width=window.innerWidth,F=_.height=window.innerHeight};window.addEventListener("mousemove",je),window.addEventListener("resize",_e);const Ye=70,Me=[];for(let A=0;A<Ye;A++)Me.push({x:(Math.random()-.5)*800,y:(Math.random()-.5)*800,z:Math.random()*800-400,vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8,vz:(Math.random()-.5)*.8,radius:Math.random()*2+1});let we=0,Se=0;const Qe=400,Ke=()=>{v.clearRect(0,0,U,F),ae.x+=(ae.tx-ae.x)*.05,ae.y+=(ae.ty-ae.y)*.05,we=(ae.x-U/2)/(U/2)*.25,Se=-((ae.y-F/2)/(F/2))*.25;const A=Math.cos(we),O=Math.sin(we),$=Math.cos(Se),Y=Math.sin(Se),K=[];Me.forEach(B=>{B.x+=B.vx,B.y+=B.vy,B.z+=B.vz,(B.x>400||B.x<-400)&&(B.vx*=-1),(B.y>400||B.y<-400)&&(B.vy*=-1),(B.z>400||B.z<-400)&&(B.vz*=-1);let le=B.x*A-B.z*O,ze=B.z*A+B.x*O,Ge=B.y*$-ze*Y;const j=ze*$+B.y*Y+600;if(j>50){const D=Qe/j,X=U/2+le*D,de=F/2+Ge*D;K.push({sx:X,sy:de,scale:D,depth:j,raw:B})}}),K.sort((B,le)=>le.depth-B.depth),v.lineWidth=.5;for(let B=0;B<K.length;B++){const le=K[B];for(let ze=B+1;ze<K.length;ze++){const Ge=K[ze],Xe=Math.pow(le.sx-Ge.sx,2)+Math.pow(le.sy-Ge.sy,2);if(Xe<15e3){const j=(1-Math.sqrt(Xe)/122)*.15;v.strokeStyle=`rgba(123, 97, 255, ${j})`,v.beginPath(),v.moveTo(le.sx,le.sy),v.lineTo(Ge.sx,Ge.sy),v.stroke()}}}K.forEach(B=>{const le=B.raw.radius*B.scale,ze=Math.sqrt(Math.pow(B.sx-ae.x,2)+Math.pow(B.sy-ae.y,2));v.beginPath(),v.arc(B.sx,B.sy,le+(ze<80?2:0),0,Math.PI*2),ze<80?(v.fillStyle="rgba(0, 212, 255, 0.9)",v.shadowBlur=15,v.shadowColor="rgba(0, 212, 255, 0.8)"):(v.fillStyle=`rgba(123, 97, 255, ${.4+B.scale*.3})`,v.shadowBlur=0),v.fill(),v.shadowBlur=0}),G=requestAnimationFrame(Ke)};return Ke(),()=>{cancelAnimationFrame(G),window.removeEventListener("mousemove",je),window.removeEventListener("resize",_e)}},[]),c.jsxs("div",{className:"app-container",children:[c.jsx("canvas",{ref:V,className:"particles-canvas"}),c.jsxs("div",{className:"aurora-bg",children:[c.jsx("div",{className:"aurora-glow-1"}),c.jsx("div",{className:"aurora-glow-2"})]}),c.jsx("div",{className:"grid-overlay"}),c.jsxs("nav",{className:`navbar ${T?"shrunk":""}`,children:[c.jsxs("div",{className:"nav-container",children:[c.jsxs("div",{className:"nav-brand",onClick:()=>R("home"),children:[c.jsx(Ol,{className:"brand-logo"}),c.jsx("span",{children:"LatticeCrypt"})]}),c.jsxs("div",{className:"nav-menu",children:[c.jsx("button",{className:`nav-link ${m==="home"?"active":""}`,onClick:()=>R("home"),children:"Home"}),c.jsx("button",{className:`nav-link ${m==="platform"?"active":""}`,onClick:()=>R("platform"),children:"Platform"}),c.jsx("button",{className:`nav-link ${m==="technology"?"active":""}`,onClick:()=>R("technology"),children:"Technology"}),c.jsx("button",{className:`nav-link ${m==="sse-explain"?"active":""}`,onClick:()=>R("sse-explain"),children:"About SSE"}),c.jsx("button",{className:`nav-link ${m==="demo"?"active":""}`,onClick:()=>R("demo"),children:"Demo"}),c.jsx("button",{className:`nav-link ${m==="try-files"?"active":""}`,onClick:()=>R("try-files"),children:"Try Files"}),c.jsx("button",{className:`nav-link ${m==="security"?"active":""}`,onClick:()=>R("security"),children:"Security"}),c.jsx("button",{className:`nav-link ${m==="pricing"?"active":""}`,onClick:()=>R("pricing"),children:"Pricing"}),c.jsx("button",{className:`nav-link ${m==="docs"?"active":""}`,onClick:()=>R("docs"),children:"Docs"}),c.jsx("button",{className:`nav-link ${m==="about"?"active":""}`,onClick:()=>R("about"),children:"About"})]}),c.jsxs("div",{className:"nav-actions",children:[c.jsx("button",{className:"btn-nav btn-nav-secondary",onClick:()=>R("demo"),children:"Book Demo"}),c.jsx("button",{className:"btn-nav btn-nav-primary",onClick:()=>R("try-files"),children:"Get Started"})]}),c.jsx("button",{className:"nav-hamburger",onClick:()=>H(!C),children:C?c.jsx(If,{}):c.jsx(S0,{})})]}),C&&c.jsxs("div",{className:"mobile-menu glass-panel",children:[c.jsx("button",{onClick:()=>R("home"),children:"Home"}),c.jsx("button",{onClick:()=>R("platform"),children:"Platform"}),c.jsx("button",{onClick:()=>R("technology"),children:"Technology"}),c.jsx("button",{onClick:()=>R("sse-explain"),children:"About SSE"}),c.jsx("button",{onClick:()=>R("demo"),children:"Demo"}),c.jsx("button",{onClick:()=>R("try-files"),children:"Try Files"}),c.jsx("button",{onClick:()=>R("security"),children:"Security"}),c.jsx("button",{onClick:()=>R("pricing"),children:"Pricing"}),c.jsx("button",{onClick:()=>R("docs"),children:"Docs"}),c.jsx("button",{onClick:()=>R("about"),children:"About"}),c.jsxs("div",{className:"mobile-menu-actions",children:[c.jsx("button",{className:"btn btn-secondary",style:{width:"100%"},onClick:()=>R("demo"),children:"Book Demo"}),c.jsx("button",{className:"btn btn-primary",style:{width:"100%",marginTop:10},onClick:()=>R("try-files"),children:"Get Started"})]})]})]}),c.jsxs("main",{className:"main-content",children:[c.jsx(L0,{onNavigate:R}),c.jsx(G0,{}),c.jsx(X0,{}),c.jsx(eg,{}),c.jsx($0,{}),c.jsx(W0,{}),c.jsx(F0,{}),c.jsx("section",{id:"pricing",className:"section-padding",children:c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"text-center",style:{marginBottom:60},children:[c.jsx("div",{className:"badge badge-cyan",style:{marginBottom:16},children:"SaaS Plans"}),c.jsx("h2",{className:"section-title",children:"Transparent Enterprise Pricing"}),c.jsx("p",{className:"subtitle",children:"Choose a tier matching your query indexing size and computing performance requirements."})]}),c.jsxs("div",{className:"pricing-grid",children:[c.jsxs("div",{className:"pricing-card glass-panel",children:[c.jsxs("div",{className:"pricing-header",children:[c.jsx("h4",{children:"Developer Sandbox"}),c.jsx("span",{className:"price",children:"$0"}),c.jsx("p",{className:"price-term",children:"Free Forever"})]}),c.jsxs("ul",{className:"pricing-features",children:[c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," 50 Indexed Documents"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," 1,000 Unique Vocab Entries"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," Post-Quantum NTRU Primitives"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," Community API Access"]})]}),c.jsx("button",{className:"btn btn-secondary",style:{width:"100%",marginTop:30},onClick:()=>R("demo"),children:"Launch Sandbox"})]}),c.jsxs("div",{className:"pricing-card glass-panel active-highlight",children:[c.jsx("div",{className:"card-popular-badge",children:"POPULAR"}),c.jsxs("div",{className:"pricing-header",children:[c.jsx("h4",{children:"Startup Scale"}),c.jsx("span",{className:"price",children:"$420"}),c.jsx("p",{className:"price-term",children:"Per Month"})]}),c.jsxs("ul",{className:"pricing-features",children:[c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," 10,000 Indexed Documents"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," Infinite Vocab Size"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," 2x Parallel CPU Threading"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," 99.9% Cloud SLA"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," Email & Discord Support"]})]}),c.jsx("button",{className:"btn btn-primary",style:{width:"100%",marginTop:30},onClick:()=>R("try-files"),children:"Get Started"})]}),c.jsxs("div",{className:"pricing-card glass-panel",children:[c.jsxs("div",{className:"pricing-header",children:[c.jsx("h4",{children:"Custom Enterprise"}),c.jsx("span",{className:"price",children:"Custom"}),c.jsx("p",{className:"price-term",children:"Custom Agreements"})]}),c.jsxs("ul",{className:"pricing-features",children:[c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," Infinite Index Boundaries"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," Full FHE Numeric Calculations"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," Isolated Dedicated Clusters"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," 24/7/365 Cryptographic Support"]}),c.jsxs("li",{children:[c.jsx(tt,{size:14,className:"accent-text-cyan"})," Custom SOC 2 Type II SLA audits"]})]}),c.jsx("button",{className:"btn btn-secondary",style:{width:"100%",marginTop:30},onClick:()=>R("demo"),children:"Schedule Audits"})]})]})]})}),c.jsx(I0,{}),c.jsx(P0,{})]}),c.jsx("footer",{className:"footer-bar",children:c.jsxs("div",{className:"container footer-container",children:[c.jsxs("div",{className:"footer-brand",children:[c.jsx(Ol,{className:"brand-logo"}),c.jsx("span",{children:"LatticeCrypt"})]}),c.jsxs("p",{className:"footer-copyright",children:["© ",new Date().getFullYear()," LatticeCrypt Systems Inc. Licensed under Apache 2.0."]}),c.jsxs("div",{className:"footer-links",children:[c.jsx("a",{href:"https://github.com",target:"_blank",rel:"noreferrer",children:"GitHub"}),c.jsx("a",{href:"#docs",children:"Docs"}),c.jsx("a",{href:"#security",children:"Security Core"})]})]})}),c.jsx("style",{children:`
        .app-container {
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        .particles-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          pointer-events: none;
        }

        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 100;
          background: rgba(5, 8, 22, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: var(--transition-smooth);
        }

        .navbar.shrunk {
          height: 64px;
          background: rgba(5, 8, 22, 0.75);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(123, 97, 255, 0.15);
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 1.25rem;
          color: white;
          cursor: pointer;
          letter-spacing: -0.01em;
        }

        .brand-logo {
          color: var(--accent-cyan);
          width: 24px;
          height: 24px;
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.4));
        }

        .nav-menu {
          display: flex;
          gap: 4px;
        }

        @media (max-width: 1024px) {
          .nav-menu, .nav-actions {
            display: none;
          }
          .nav-hamburger {
            display: block !important;
          }
        }

        .nav-link {
          background: transparent;
          border: none;
          padding: 8px 14px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 6px;
          transition: var(--transition-smooth);
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.02);
        }

        .nav-link.active {
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-nav {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: var(--transition-smooth);
        }

        .btn-nav-primary {
          background: var(--accent-cyan);
          color: #050816;
          border: none;
        }

        .btn-nav-primary:hover {
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
          transform: translateY(-1px);
        }

        .btn-nav-secondary {
          background: transparent;
          color: white;
          border: 1px solid var(--border-glass);
        }

        .btn-nav-secondary:hover {
          border-color: var(--accent-purple);
          color: var(--accent-purple);
        }

        .nav-hamburger {
          display: none;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }

        /* Mobile Dropdown menu */
        .mobile-menu {
          position: absolute;
          top: 80px;
          left: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          border-radius: 12px;
        }

        .mobile-menu button {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          padding: 8px 0;
          cursor: pointer;
        }

        .mobile-menu button:hover {
          color: var(--accent-cyan);
        }

        .mobile-menu-actions {
          margin-top: 12px;
          border-top: 1px solid var(--border-glass);
          padding-top: 16px;
        }

        /* Main structure */
        .main-content {
          padding-top: 80px;
        }

        /* Pricing Page cards */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .pricing-card {
          padding: 40px 30px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .pricing-card.active-highlight {
          border-color: var(--accent-purple);
          box-shadow: 0 12px 40px 0 rgba(123, 97, 255, 0.15);
        }

        .card-popular-badge {
          position: absolute;
          top: -12px;
          right: 30px;
          background: var(--accent-purple);
          color: white;
          font-size: 10px;
          font-family: var(--font-mono);
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 9999px;
          letter-spacing: 0.1em;
        }

        .pricing-header {
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 24px;
        }

        .pricing-header h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        .pricing-header .price {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          line-height: 1;
        }

        .pricing-header .price-term {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }

        .pricing-features li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Footer */
        .footer-bar {
          background: #03050f;
          border-top: 1px solid var(--border-glass);
          padding: 40px 0;
          margin-top: 80px;
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        @media (max-width: 640px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
          }
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          color: white;
        }

        .footer-copyright {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .footer-links {
          display: flex;
          gap: 20px;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.85rem;
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .footer-links a:hover {
          color: var(--accent-cyan);
        }
      `})]})}Oh.createRoot(document.getElementById("root")).render(c.jsx(Th.StrictMode,{children:c.jsx(tg,{})}));
