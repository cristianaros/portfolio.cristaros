import{r as l}from"./index.DYrVU9rO.js";var i={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c;function d(){if(c)return n;c=1;var o=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function u(p,e,t){var s=null;if(t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),"key"in e){t={};for(var a in e)a!=="key"&&(t[a]=e[a])}else t=e;return e=t.ref,{$$typeof:o,type:p,key:s,ref:e!==void 0?e:null,props:t}}return n.Fragment=r,n.jsx=u,n.jsxs=u,n}var f;function x(){return f||(f=1,i.exports=d()),i.exports}var E=x();function v(){if(typeof window<"u"){if(/^\/experience\/?$/.test(window.location.pathname))return"en";if(/^\/experiencia\/?$/.test(window.location.pathname))return"es";try{const r=localStorage.getItem("portfolio-locale");if(r==="es"||r==="en")return r}catch{}}return typeof navigator>"u"?"es":(navigator.languages?.[0]??navigator.language)?.toLowerCase().startsWith("en")?"en":"es"}function m(){const[o,r]=l.useState("es");return l.useEffect(()=>r(v()),[]),o}export{E as j,m as u};
