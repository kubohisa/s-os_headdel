import { SosFile } from './SosFile.ts';

export class SosData {
	static file() {	
		/*
		
		*/
		
		//
		let sosFlag = "No";
		
		let header = "";
		for (let i = 0; i < 5; i++) {
			header += String.fromCharCode(SosFile.arr[i]);
		}
		if (header === "_SOS " && SosFile.arr[17] === 0x0A) { sosFlag = "Yes"; }

		if (sosFlag === "No") {
			document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
Error: s-os sowrdの実行ファイルではありません
`
			return;
		}

		/*
		
		*/
		let startAdrs = "";
		for (let i = 8; i < 12; i++) {
			startAdrs += String.fromCharCode(SosFile.arr[i]);
		}
		
		let execAdrs = "";
		for (let i = 13; i < 17; i++) {
			execAdrs += String.fromCharCode(SosFile.arr[i]);
		}
		//
		let data = new Blob([SosFile.arr.slice(18, SosFile.file.size)], {type: "application/octet-binary"});
		let objUrl = window.URL.createObjectURL(data);
		
		// size.
		let sizeRange = data.size - SosFile.size;
		
		// 
		document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
	<table>
    <tr><th>File name</th><th>${SosFile.file.name}</th></tr>
    <tr><th>s-os exec file?</th><th>${sosFlag}</th></tr>
    <tr><th>File size</th><th>${SosFile.size}byte</th></tr>
    <tr><th>Header delete File Size</th><th>${data.size}byte (${sizeRange}byte)</th></tr>
    <tr><th>Start address</th><th>0x${startAdrs}</th></tr>
    <tr><th>Exec address</th><th>0x${execAdrs}</th></tr>
	<tr><th>Last modified</th><th>${SosFile.lastModified}</th></tr>
	</table>
	<br/>
	<a href="${objUrl}" download="${SosFile.filename}_noheader.${SosFile.type}" class="btn filled">Download</a>
`
	}
}