import { ExecFile } from './ExecFile.ts';

export class MztData {
	static file() {
		/*

		*/

		//
		let sosFlag = 'No';

		if (ExecFile.arr[0] > 0x00 && ExecFile.arr[0] < 0x06) {
			sosFlag = 'Yes';
		} else if (ExecFile.arr[0] == 0xC8) {
			sosFlag = 'Yes';
		}

		if (sosFlag === 'No') {
			this.error();
			return;
		}

		/*

		*/
		let mztFilename = '';
		for (let i = 0x01; i < 0x12; i++) {
			if (ExecFile.arr[i] === 0x0D || ExecFile.arr[i] === 0x20) break;

			mztFilename += String.fromCharCode(ExecFile.arr[i]);
		}
		if (mztFilename === '') {
			this.error();
			return;
		}

		//
		let headersSize = ExecFile.arr[0x13] * 0x100 + ExecFile.arr[0x12];

		let startAdrs = (ExecFile.arr[0x15] * 0x100 + ExecFile.arr[0x14]).toString(16);
		let execAdrs = (ExecFile.arr[0x17] * 0x100 + ExecFile.arr[0x16]).toString(16);

		//
		let data = new Blob([ExecFile.arr.slice(0x80, ExecFile.file.size)], {
			type: 'application/octet-binary',
		});
		let objUrl = window.URL.createObjectURL(data);

		// size.
		let sizeRange = data.size - ExecFile.size;

		//
		document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
	<table>
    <tr><th>MztFile name</th><th>${ExecFile.file.name}</th></tr>
    <tr><th>File name</th><th>${mztFilename}</th></tr>
    <tr><th>Mtz file?</th><th>${sosFlag}</th></tr>
    <tr><th>Mzt Filesize</th><th>${ExecFile.size}byte</th></tr>
    <tr><th>Filesize (at Mzt Header)</th><th>${headersSize}byte</th></tr>
     <tr><th>Header delete File Size</th><th>${data.size}byte (${sizeRange}byte)</th></tr>
    <tr><th>Start address</th><th>0x${startAdrs}</th></tr>
    <tr><th>Exec address</th><th>0x${execAdrs}</th></tr>
	<tr><th>Last modified</th><th>${ExecFile.lastModified}</th></tr>
	</table>
	<br/>
	<a href="${objUrl}" download="${ExecFile.filename}_MztNoheader.obj" class="btn filled">Download</a>
`;
	}

	private static error() {
		document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
Error: .mztファイルではありません
`;
	}
}
