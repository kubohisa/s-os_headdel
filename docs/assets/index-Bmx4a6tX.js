var u=Object.defineProperty;var m=(a,t,s)=>t in a?u(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s;var n=(a,t,s)=>m(a,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))h(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&h(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function h(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();class e{static async load(){const t=document.getElementById("objectFile");if(this.file=t==null?void 0:t.files[0],!this.file){this.flag=!1;return}this.flag=!0,this.type=this.file.name.split(".").pop(),this.filename=this.file.name.replace(new RegExp("."+this.type+"$"),""),this.size=this.file.size,this.lastModified=new Date(this.file.lastModified).toString()}}n(e,"file"),n(e,"flag"),n(e,"type"),n(e,"filename"),n(e,"size"),n(e,"lastModified"),n(e,"arr");class p{static file(){let t="No";if((e.arr[0]>0&&e.arr[0]<6||e.arr[0]==200)&&(t="Yes"),t==="No"){this.error();return}let s="";for(let d=1;d<18&&!(e.arr[d]===13||e.arr[d]===32);d++)s+=String.fromCharCode(e.arr[d]);if(s===""){this.error();return}let h=e.arr[19]*256+e.arr[18],r=(e.arr[21]*256+e.arr[20]).toString(16),i=(e.arr[23]*256+e.arr[22]).toString(16),l=new Blob([e.arr.slice(128,e.file.size)],{type:"application/octet-binary"}),f=window.URL.createObjectURL(l),o=l.size-e.size;document.querySelector("#file").innerHTML=`
	<table>
    <tr><th>MztFile name</th><th>${e.file.name}</th></tr>
    <tr><th>File name</th><th>${s}</th></tr>
    <tr><th>Mtz file?</th><th>${t}</th></tr>
    <tr><th>Mzt Filesize</th><th>${e.size}byte</th></tr>
    <tr><th>Filesize (at Mzt Header)</th><th>${h}byte</th></tr>
     <tr><th>Header delete File Size</th><th>${l.size}byte (${o}byte)</th></tr>
    <tr><th>Start address</th><th>0x${r}</th></tr>
    <tr><th>Exec address</th><th>0x${i}</th></tr>
	<tr><th>Last modified</th><th>${e.lastModified}</th></tr>
	</table>
	<br/>
	<a href="${f}" download="${e.filename}_MztNoheader.obj" class="btn filled">Download</a>
`}static error(){document.querySelector("#file").innerHTML=`
Error: .mztファイルではありません
`}}class y{static file(){let t="No",s="";for(let o=0;o<5;o++)s+=String.fromCharCode(e.arr[o]);if(s==="_SOS "&&e.arr[17]===10&&(t="Yes"),t==="No"){document.querySelector("#file").innerHTML=`
Error: s-os sowrdの実行ファイルではありません
`;return}let h="";for(let o=8;o<12;o++)h+=String.fromCharCode(e.arr[o]);let r="";for(let o=13;o<17;o++)r+=String.fromCharCode(e.arr[o]);let i=new Blob([e.arr.slice(18,e.file.size)],{type:"application/octet-binary"}),l=window.URL.createObjectURL(i),f=i.size-e.size;document.querySelector("#file").innerHTML=`
	<table>
    <tr><th>File name</th><th>${e.file.name}</th></tr>
    <tr><th>s-os exec file?</th><th>${t}</th></tr>
    <tr><th>File size</th><th>${e.size}byte</th></tr>
    <tr><th>Header delete File Size</th><th>${i.size}byte (${f}byte)</th></tr>
    <tr><th>Start address</th><th>0x${h}</th></tr>
    <tr><th>Exec address</th><th>0x${r}</th></tr>
	<tr><th>Last modified</th><th>${e.lastModified}</th></tr>
	</table>
	<br/>
	<a href="${l}" download="${e.filename}_noheader.${e.type}" class="btn filled">Download</a>
`}}document.querySelector("#app").innerHTML=`
  <div>
    <p><input id="objectFile" type="file" accept=".obj, .mzt" /></p>
	<p>対応ファイルは .obj と .mzt です</p>
  </div>
`;var c;(c=document.getElementById("objectFile"))==null||c.addEventListener("change",b,!1);function b(){if(e.load(),e.flag===!1){document.querySelector("#file").innerHTML="";return}if(e.type=e.type.toLowerCase(),e.type!=="obj"&&e.type!=="mzt"){document.querySelector("#file").innerHTML=`
Error: s-os sowrdの実行ファイルではありません
`;return}const a=new FileReader;a.onload=()=>{e.arr=new Uint8Array(a.result),e.type==="obj"&&y.file(),e.type==="mzt"&&p.file()},a.readAsArrayBuffer(e.file)}
