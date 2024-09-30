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
	if (ExecFile.flag === false) return;

	//
	if (ExecFile.type !== 'obj') return;

	//
	const reader = new FileReader();

	reader.onload = () => {
		ExecFile.arr = new Uint8Array(<ArrayBuffer> reader.result);
		if (ExecFile.type === 'obj') SosData.file();
	};
	reader.readAsArrayBuffer(ExecFile.file);
}
