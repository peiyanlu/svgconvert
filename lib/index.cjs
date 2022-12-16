"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var w=require("fs"),S=require("html-minifier"),T=require("juice"),A=require("xmldom"),b=require("svgpath");const v=new Set([]),$=(t,a)=>{Array.from(t.childNodes).forEach(e=>{const r=e;if(r.nodeName.toUpperCase()==="USE"){const c=r.getAttribute("xlink:href")?.replace("#","");let s=a.getElementById(c);if(v.add(c),s){const d=a.createElement("g");if(Array.from(r.attributes).length>0){let u=Number(r.getAttribute("x"))||0,m=Number(r.getAttribute("y"))||0,o=r.getAttribute("transform");u!==0&&m!==0&&(o+=` translate(${u}, ${m})`),o&&d.setAttribute("transform",o.replace(/(^\s+|\s+$)/g,"")),["x","y","xlink:href","style"].forEach(i=>r.removeAttribute(i)),Array.from(r.attributes).map(({nodeName:i,value:n})=>{d.setAttribute(i,n)})}if(s.nodeName.toUpperCase()==="SYMBOL"){const u=s.cloneNode(!0),m=a.createElement("g");["transform","viewBox"].forEach(o=>r.removeAttribute(o)),Array.from(s.attributes).map(({nodeName:o,value:i})=>{m.setAttribute(o,i)}),Array.from(u.childNodes).map(o=>{m.appendChild(o)}),s=m}d.appendChild(s?.cloneNode(!0)),r?.parentNode?.replaceChild(d,r)}}else r.hasChildNodes()&&$(r,a)})},U=t=>{$(t.documentElement,t),v.forEach(a=>{const e=t.getElementById(a);e.nodeName.toUpperCase()==="SYMBOL"?e.parentNode?.removeChild(e):e.parentNode?.nodeName.toUpperCase()==="DEFS"&&e.parentNode.removeChild(e)})},G=(t,a)=>{const e=a.createElement("path");return Array.from(t.attributes).forEach(r=>{e.setAttribute(r.name,r.value)}),e},k=(t,a)=>{if(!t.nodeName)return;const e=t.nodeName.toLowerCase(),r=u=>parseFloat(t.getAttribute(u)),c=(u,m)=>{const o=G(t,a);o.setAttribute("d",m),u.forEach(i=>i&&o.removeAttribute(i)),t.parentNode?.replaceChild(o,t)};let s=[],d="";switch(e){case"rect":{const u=r("x"),m=r("y"),o=r("width"),i=r("height");let n=r("rx")||r("ry")||0,l=r("ry")||r("rx")||0;if(isNaN(u-m+o-i+n-l))return;n=n>o/2?o/2:n,l=l>i/2?i/2:l;let f;if(n==0||l==0)f=`M${u} ${m}h ${o}v ${i}h ${-o}z`;else{const h=" 0 0 1 ";f=`M${u} ${m+l}a${n} ${l+h+n} ${-l}h${o-n-n}a${n} ${l+h+n} ${l}v${i-l-l}a${n} ${l+h+-n} ${l}h${n+n-o}a${n} ${l+h+-n} ${-l}z`}s=["x","y","width","height","rx","ry"],d=f;break}case"circle":{const u=r("cx"),m=r("cy"),o=r("r");if(isNaN(u-m+o))return;const i=" 0 1 0 ",n=`M${u-o} ${m}a${o} ${o+i+2*o} 0a${o} ${o+i+-2*o} 0z`;s=["cx","cy","r"],d=n;break}case"ellipse":{const u=r("cx"),m=r("cy"),o=r("rx"),i=r("ry");if(isNaN(u-m+o-i))return;const n=" 0 1 0 ",l=`M${u-o} ${m}a${o} ${i+n+2*o} 0a${o} ${i+n+-2*o} 0z`;s=["cx","cy","rx","ry"],d=l;break}case"line":{const u=r("x1"),m=r("y1"),o=r("x2"),i=r("y2");if(isNaN(u-m+(o-i)))return;const n=`M${u} ${m}L${o} ${i}`;s=["x1","y1","x2","y2"],d=n;break}case"polygon":case"polyline":{const u=/[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g,m=(t.getAttribute("points")?.match(u)||[]).map(Number);if(m.length<4)return;const o=m.slice(0,2).join(" "),i=m.slice(2).join(" "),n=`M${o}L${i}${e==="polygon"?"z":""}`;s=["points"],d=n;break}default:s=[],d="";break}s.length&&d.length&&c(s,d)},y=(t,a)=>{if(!t.hasChildNodes()&&t.nodeName.toUpperCase()!=="PATH")return k(t,a);t.hasChildNodes()&&Array.from(t.childNodes).forEach(e=>y(e,a))},B=t=>{Array.from(t.documentElement.childNodes).forEach(a=>y(a,t))},F=t=>{Array.from(t.documentElement.childNodes).forEach(a=>{const e=a;if(a.nodeName.toUpperCase()==="PATH"){const r=e.getAttribute("d");if(!r)e.parentNode?.removeChild(a);else if(e.hasAttribute("transform")){const c=b(r).transform(e.getAttribute("transform")).rel().round(2).toString();e.removeAttribute("transform"),e.setAttribute("d",c)}}})},M=/\burl\(((["'])?#(.+?)\1)?\)/,P=t=>{Array.from(t.documentElement.childNodes).forEach(a=>{const e=a;e.nodeName.toUpperCase()==="PATH"&&e.hasAttribute("fill")&&M.test(e.getAttribute("fill"))&&e.removeAttribute("fill")})},g=t=>{const a=Array.from(t.attributes);Array.from(t.childNodes).map(e=>{const r=e,c=s=>r.hasAttribute(s);a.length>0&&a.map(s=>{if(s.nodeName.toLowerCase()==="transform"){let d=s.value;c("transform")&&(d+=` ${r.getAttribute("transform")}`),r.setAttribute(s.nodeName,d)}else c(s.nodeName)||r.setAttribute(s.nodeName,s.value)}),r.nodeName.toUpperCase()==="G"&&!r.hasChildNodes()||r.parentNode?.insertBefore(r,t),r.nodeName.toUpperCase()==="G"&&r.hasChildNodes()&&g(r)}),t.parentNode?.removeChild(t)},L=t=>{Array.from(t.documentElement.childNodes).forEach(a=>{const e=a;e.nodeName.toUpperCase()==="G"&&(e.hasChildNodes()?g(e):e.parentNode?.removeChild(e))})},E=(t,a,e)=>{if(!e)return;const r=t.hasChildNodes(),c=o=>o.nodeName.toUpperCase(),s=["title","desc"],d=["id","style","fill"],u=(o,i=!0)=>{c(t).toLowerCase()===o&&i&&t.parentNode?.removeChild(t)},m=(o,i=!0)=>{const n=(f=>f.some(h=>t.hasAttribute(h)))(["stroke","stroke-width"]),l=f=>{let h=!1,p=f.parentNode;for(;!h&&p&&c(p)==="G";)h=p.hasAttribute("fill")&&p.getAttribute("fill")==="none",p=p?.parentNode;return h};if(o==="fill"&&i&&c(t)!=="G"&&n&&l(t)&&!t.hasAttribute("fill"))return t.setAttribute(o,"none");o==="stroke"&&t.getAttribute("stroke")==="none"&&c(t)==="G"&&["stroke","stroke-width","stroke-linecap","stroke-dasharray"].forEach(f=>t.removeAttribute(f)),t?.hasAttribute(o)&&i&&t.removeAttribute(o)};r?s.includes(c(t).toLowerCase())?s.forEach(o=>u(o,e[o])):Array.from(t.childNodes).forEach(o=>E(o,a,e)):(o=>{let i=!1,n=o;for(;!i&&n&&c(o)==="G";)u(n.nodeName),i=n.hasChildNodes(),n=n?.parentNode})(t),d.forEach(o=>m(o,e[o]))},O=(t,a)=>{Array.from(t.documentElement.childNodes).forEach(e=>E(e,t,a))},x=(t,a,e,r)=>{Array.from(t.childNodes).forEach(c=>{const s=c;if(s.nodeName.toUpperCase()==="PATH"){if(s.hasAttribute("d")){const d=s.getAttribute("d");s.setAttribute("d",b(d).translate(a,e).scale(r).rel().round(2).toString())}if(s.hasAttribute("stroke-width")){const d=Number(s.getAttribute("stroke-width"));s.setAttribute("stroke-width",(d*r).toFixed(2))}}else s.hasChildNodes()&&x(s,a,e,r)})},z=(t,a)=>{const{size:e=1024,center:r=!1}=a||{},c=e>0?[0,0,e,e]:[0,0,1024,1024],s=h=>t.documentElement.getAttribute(h),d=(s("viewbox")||s("viewBox")).split(/\s+|,/).filter(h=>h).map(h=>Number(h)),u=e/d[2],m=e/d[3],o=Math.min(u,m),i=u>m,n=Math.abs(d[2]-d[3])/2;let l=i?n:0,f=i?0:n;r||(l=c[0]-d[0],f=c[1]-d[1]),x(t.documentElement,l,f,o),t.documentElement.setAttribute("viewBox",c.join(" "))};var D=(t=>(t.convertUseToGroup="convertUseToGroup",t.viewBoxTransform="viewBoxTransform",t))(D||{});const C={convertUseToGroup:U,convertShapeToPath:B,convertTransformForPath:F,removeGradient:P,removeGroups:L,removeNodesOrAttributes:O,viewBoxTransform:z},j=t=>{const a=t.documentElement,e=a.getAttribute("viewbox");e&&(a.setAttribute("viewBox",e),a.removeAttribute("viewbox"))},q=(t,a)=>{const{plugins:e,options:r}=a;if(e){const c=e.indexOf("convertUseToGroup");!!~c&&c!==0&&(e.splice(c,1),e.unshift("convertUseToGroup"));const s=e.indexOf("viewBoxTransform");!!~s&&s!==e.length-1&&(e.splice(s,1),e.push("viewBoxTransform")),e?.forEach(d=>C[d]&&C[d](t,r))}};class N{constructor(a){this.document=a}static parseStr(a,e){return this.parse(a,e)}static parseFile(a,e){const r=w.readFileSync(a,{encoding:"utf-8"});return this.parse(r,e)}static parse(a,e){try{const r=new A.DOMParser,c=T(S.minify(a,{collapseWhitespace:!0,removeComments:!0})),s=r.parseFromString(c,"application/xml");return this.parseDocument(s,e)}catch(r){return console.error("SVG \u89E3\u6790\u5931\u8D25\uFF1A",r)}}static parseDocument(a,e){return a.documentElement.nodeName.toUpperCase()!=="SVG"?console.error("SVG \u89E3\u6790\u5931\u8D25\uFF1A\u8BF7\u4F20\u5165 SVG \u6587\u6863\uFF01"):(j(a),q(a,e),new N(a))}toSimpleSvg(){return this.document?new A.XMLSerializer().serializeToString(this.document):""}getPathAttributes(){const a=[];return this.document&&Array.from(this.document.documentElement.childNodes).forEach((e,r)=>{const c={};c.pid=r,e.nodeName.toUpperCase()==="PATH"&&(Array.from(e.attributes).forEach(s=>{s.value&&(c[s.nodeName.toLowerCase()]=s.value)}),a.push(c))}),a}toBase64(){return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.toSimpleSvg())}`}}exports.default=N;
