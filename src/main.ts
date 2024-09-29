import { SosFile } from './SosFile.ts';
import { SosData } from './SosData.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p><input id="objectFile" type="file" /></p>
  </div>
`

document.getElementById("objectFile")?.addEventListener("change", showFile, false);

/*

*/

function showFile() {
	//
	SosFile.load();
	if(SosFile.flag === false) return;
	
	//
	if (SosFile.type !== "obj") return;

	//
	const reader = new FileReader();

	reader.onload = () => {
		SosFile.arr = new Uint8Array(<ArrayBuffer>reader.result);
		if (SosFile.type === "obj") SosData.file();
	};
	reader.readAsArrayBuffer(SosFile.file);
}


