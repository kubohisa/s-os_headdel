export class ExecFile {
	static file;
	static flag: boolean;

	static type: string;
	static filename: string;

	static size;
	static lastModified: String;

	static arr: Uint8Array;

	//
	static async load() {
		// ファイル名の取得
		const inputFile = <HTMLInputElement> document.getElementById('objectFile')!;
		this.file = inputFile?.files[0];

		// ファイルが無いなら戻る
		if (!this.file) {
			this.flag = false;
			return; // error.
		}
		this.flag = true;

		//
		this.type = this.file.name.split('.').pop();
		this.filename = this.file.name.replace(new RegExp('\.' + this.type + '$'), '');

		//
		this.size = this.file.size;
		this.lastModified = new Date(this.file.lastModified).toString();

		// readerの準備
		/*		this.arr = await this.fileArray().then();

		alert(this.arr);
		//console.log(this.arr);
    */
		return;
	}

	//
	/*	private static fileArray() {
		return new Promise((resolve) => {
				const reader = new FileReader();

				reader.onload = () => {
					resolve(new Uint8Array(<ArrayBuffer>reader.result));
				};
				reader.readAsArrayBuffer(this.file);
		});
	}
  */
}
