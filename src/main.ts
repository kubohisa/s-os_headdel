import { ExecFile } from './ExecFile.ts';
import { MztData } from './MztData.ts';
import { SosData } from './SosData.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p><input id="objectFile" type="file" accept=".obj, .mzt" /></p>
	<p>対応ファイルは .obj と .mzt です</p>
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
	ExecFile.type = ExecFile.type.toLowerCase();
	if (ExecFile.type !== 'obj' && ExecFile.type !== 'mzt') {
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
		if (ExecFile.type === 'mzt') MztData.file();
	};
	reader.readAsArrayBuffer(ExecFile.file);
}
