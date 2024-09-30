import { ExecFile } from './ExecFile.ts';

export class SosData {
	static file() {
		/*

		*/

		//
		let sosFlag = 'No';

		let header = '';
		for (let i = 0; i < 5; i++) {
			header += String.fromCharCode(ExecFile.arr[i]);
		}
		if (header === '_SOS ' && ExecFile.arr[17] === 0x0A) sosFlag = 'Yes';

		if (sosFlag === 'No') {
			document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
Error: s-os sowrdの実行ファイルではありません
`;
			return;
		}

		/*

		*/
		let startAdrs = '';
		for (let i = 8; i < 12; i++) {
			startAdrs += String.fromCharCode(ExecFile.arr[i]);
		}

		let execAdrs = '';
		for (let i = 13; i < 17; i++) {
			execAdrs += String.fromCharCode(ExecFile.arr[i]);
		}
		//
		let data = new Blob([ExecFile.arr.slice(18, ExecFile.file.size)], {
			type: 'application/octet-binary',
		});
		let objUrl = window.URL.createObjectURL(data);

		// size.
		let sizeRange = data.size - ExecFile.size;

		//
		document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
	<table>
    <tr><th>File name</th><th>${ExecFile.file.name}</th></tr>
    <tr><th>s-os exec file?</th><th>${sosFlag}</th></tr>
    <tr><th>File size</th><th>${ExecFile.size}byte</th></tr>
    <tr><th>Header delete File Size</th><th>${data.size}byte (${sizeRange}byte)</th></tr>
    <tr><th>Start address</th><th>0x${startAdrs}</th></tr>
    <tr><th>Exec address</th><th>0x${execAdrs}</th></tr>
	<tr><th>Last modified</th><th>${ExecFile.lastModified}</th></tr>
	</table>
	<br/>
	<a href="${objUrl}" download="${ExecFile.filename}_noheader.${ExecFile.type}" class="btn filled">Download</a>
`;
	}
}
