
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p><input id="objectFile" type="file" /></p>
  </div>
`

//import { showFile } from './counter.ts'

document.getElementById("objectFile")?.addEventListener("change", showFile, false);

function showFile() {

// readerの準備
const reader = new FileReader();

// ファイル名の取得
const inputFile = <HTMLInputElement>document.getElementById('objectFile')!;
var file = inputFile?.files[0];

//let file = fileInput[0];

// ファイルが無いなら戻る
if (!file) return;

//
let file_type = file.name.split('.').pop();

//
if (file_type !== "obj") return;

// 
let sosFlag = "No";

//
reader.readAsArrayBuffer(file);

reader.addEventListener("load", () => {
	var arr = new Uint8Array(<ArrayBuffer>reader.result);
	
	// 
	var header = "";
	for (var i = 0; i < 5; i++) {
		header += String.fromCharCode(arr[i]);
	}
	if (header === "_SOS " && arr[17] === 0x0A) { sosFlag = "Yes"; }

	if (sosFlag === "No") {
		document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
Error: s-os sowrdの実行ファイルではありません
`
		return;
	}

	//
	var startAdrs = "";
	for (var i = 8; i < 12; i++) {
		startAdrs += String.fromCharCode(arr[i]);
	}
	
	var execAdrs = "";
	for (var i = 13; i < 17; i++) {
		execAdrs += String.fromCharCode(arr[i]);
	}
	//
	var data = new Blob([arr.slice(18, file.size)], {type: "application/octet-binary"});
	let objUrl = window.URL.createObjectURL(data);
	
	var filenameBody = file.name.split('.').shift();
	
	// 
	document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
	<table>
    <tr><th>File name</th><th>${file.name}</th></tr>
    <tr><th>s-os exec file?</th><th>${sosFlag}</th></tr>
    <tr><th>File size</th><th>${file.size}</th></tr>
    <tr><th>Header delete File Size</th><th>${data.size}</th></tr>
    <tr><th>Start address</th><th>0x${startAdrs}</th></tr>
    <tr><th>Exec address</th><th>0x${execAdrs}</th></tr>
	<tr><th>Last modified</th><th>${file.lastModified}</th></tr>
	</table>
	<br/>
	<a href="${objUrl}" download="${filenameBody}_nohead.${file_type}" class="btn filled">Download</a>
`

});

}