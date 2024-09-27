(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();document.querySelector("#app").innerHTML=`
  <div>
    <p><input id="objectFile" type="file" /></p>
  </div>
`;var f;(f=document.getElementById("objectFile"))==null||f.addEventListener("change",m,!1);function m(){const a=new FileReader,i=document.getElementById("objectFile");var o=i==null?void 0:i.files[0];if(!o)return;let s=o.name.split(".").pop();if(s!=="obj")return;let e="No";a.readAsArrayBuffer(o),a.addEventListener("load",()=>{for(var t=new Uint8Array(a.result),n="",r=0;r<5;r++)n+=String.fromCharCode(t[r]);if(n==="_SOS "&&t[17]===10&&(e="Yes"),e==="No"){document.querySelector("#file").innerHTML=`
Error: s-os sowrdの実行ファイルではありません
`;return}for(var l="",r=8;r<12;r++)l+=String.fromCharCode(t[r]);for(var d="",r=13;r<17;r++)d+=String.fromCharCode(t[r]);var c=new Blob([t.slice(18,o.size)],{type:"application/octet-binary"});let h=window.URL.createObjectURL(c);var u=o.name.split(".").shift();document.querySelector("#file").innerHTML=`
	<table>
    <tr><th>File name</th><th>${o.name}</th></tr>
    <tr><th>s-os exec file?</th><th>${e}</th></tr>
    <tr><th>File size</th><th>${o.size}</th></tr>
    <tr><th>Header delete File Size</th><th>${c.size}</th></tr>
    <tr><th>Start address</th><th>0x${l}</th></tr>
    <tr><th>Exec address</th><th>0x${d}</th></tr>
	<tr><th>Last modified</th><th>${o.lastModified}</th></tr>
	</table>
	<br/>
	<a href="${h}" download="${u}_nohead.${s}" class="btn filled">Download</a>
`})}
