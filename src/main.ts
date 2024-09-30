import { ExecFile } from './ExecFile.ts';
import { SosData } from './SosData.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p><input id="objectFile" type="file" /></p>
  </div>
`;

document.getElementById('objectFile')?.addEventListener('change', showFile, false);

/*

*/

function showFile() {
	//
	ExecFile.load();
	if (ExecFile.flag === false) {
		document.querySelector<HTMLDivElement>('#file')!.innerHTML = ``;
		return;
	}

	//
	if (ExecFile.type !== 'obj') {
		document.querySelector<HTMLDivElement>('#file')!.innerHTML = `
Error: s-os sowrdの実行ファイルではありません
`;
		return;
	}

	//
	const reader = new FileReader();

	reader.onload = () => {
		ExecFile.arr = new Uint8Array(<ArrayBuffer> reader.result);
		if (ExecFile.type === 'obj') SosData.file();
	};
	reader.readAsArrayBuffer(ExecFile.file);
}
