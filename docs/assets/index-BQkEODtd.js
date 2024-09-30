var h=Object.defineProperty;var u=(s,t,l)=>t in s?h(s,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):s[t]=l;var a=(s,t,l)=>u(s,typeof t!="symbol"?t+"":t,l);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function l(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=l(r);fetch(r.href,i)}})();class e{static async load(){const t=document.getElementById("objectFile");if(this.file=t==null?void 0:t.files[0],!this.file){this.flag=!1;return}this.flag=!0,this.type=this.file.name.split(".").pop(),this.filename=this.file.name.replace(new RegExp("."+this.type+"$"),""),this.size=this.file.size,this.lastModified=new Date(this.file.lastModified).toString()}}a(e,"file"),a(e,"flag"),a(e,"type"),a(e,"filename"),a(e,"size"),a(e,"lastModified"),a(e,"arr");class p{static file(){let t="No",l="";for(let o=0;o<5;o++)l+=String.fromCharCode(e.arr[o]);if(l==="_SOS "&&e.arr[17]===10&&(t="Yes"),t==="No"){document.querySelector("#file").innerHTML=`
Error: s-os sowrdの実行ファイルではありません
`;return}let n="";for(let o=8;o<12;o++)n+=String.fromCharCode(e.arr[o]);let r="";for(let o=13;o<17;o++)r+=String.fromCharCode(e.arr[o]);let i=new Blob([e.arr.slice(18,e.file.size)],{type:"application/octet-binary"}),f=window.URL.createObjectURL(i),c=i.size-e.size;document.querySelector("#file").innerHTML=`
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
`;var d;(d=document.getElementById("objectFile"))==null||d.addEventListener("change",m,!1);function m(){if(e.load(),e.flag===!1){document.querySelector("#file").innerHTML="";return}if(e.type!=="obj"){document.querySelector("#file").innerHTML=`
Error: s-os sowrdの実行ファイルではありません
`;return}const s=new FileReader;s.onload=()=>{e.arr=new Uint8Array(s.result),e.type==="obj"&&p.file()},s.readAsArrayBuffer(e.file)}
