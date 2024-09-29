var h=Object.defineProperty;var u=(s,t,o)=>t in s?h(s,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[t]=o;var l=(s,t,o)=>u(s,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();class e{static async load(){const t=document.getElementById("objectFile");if(this.file=t==null?void 0:t.files[0],!this.file){this.flag=!1;return}this.flag=!0,this.type=this.file.name.split(".").pop(),this.filename=this.file.name.replace(new RegExp("."+this.type+"$"),""),this.size=this.file.size,this.lastModified=new Date(this.file.lastModified).toString()}}l(e,"file"),l(e,"flag"),l(e,"type"),l(e,"filename"),l(e,"size"),l(e,"lastModified"),l(e,"arr");class p{static file(){let t="No",o="";for(let a=0;a<5;a++)o+=String.fromCharCode(e.arr[a]);if(o==="_SOS "&&e.arr[17]===10&&(t="Yes"),t==="No"){document.querySelector("#file").innerHTML=`
Error: s-os sowrdの実行ファイルではありません
`;return}let n="";for(let a=8;a<12;a++)n+=String.fromCharCode(e.arr[a]);let r="";for(let a=13;a<17;a++)r+=String.fromCharCode(e.arr[a]);let i=new Blob([e.arr.slice(18,e.file.size)],{type:"application/octet-binary"}),f=window.URL.createObjectURL(i),c=i.size-e.size;document.querySelector("#file").innerHTML=`
	<table>
    <tr><th>File name</th><th>${e.file.name}</th></tr>
    <tr><th>s-os exec file?</th><th>${t}</th></tr>
    <tr><th>File size</th><th>${e.size}byte</th></tr>
    <tr><th>Header delete File Size</th><th>${i.size}byte (${c}byte)</th></tr>
    <tr><th>Start address</th><th>0x${n}</th></tr>
    <tr><th>Exec address</th><th>0x${r}</th></tr>
	<tr><th>Last modified</th><th>${e.lastModified}</th></tr>
	</table>
	<br/>
	<a href="${f}" download="${e.filename}_noheader.${e.type}" class="btn filled">Download</a>
`}}document.querySelector("#app").innerHTML=`
  <div>
    <p><input id="objectFile" type="file" /></p>
  </div>
`;var d;(d=document.getElementById("objectFile"))==null||d.addEventListener("change",m,!1);function m(){if(e.load(),e.flag===!1||e.type!=="obj")return;const s=new FileReader;s.onload=()=>{e.arr=new Uint8Array(s.result),e.type==="obj"&&p.file()},s.readAsArrayBuffer(e.file)}
