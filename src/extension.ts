// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World VS Code!');
		vscode.window.activeTextEditor?.edit(builder => {
			const doc = vscode.window.activeTextEditor?.document;
			let content = doc?.getText();
			// cut the final quote mark
			content = content?.substr(0, content?.lastIndexOf("\""));
			content = content?.replace("htmlContent: \"", "");
			content = replaceAll(content, "↵", "");
			//builder.replace()
			builder.replace(new vscode.Range(doc.lineAt(0).range.start, doc.lineAt(doc.lineCount - 1).range.end), content);
		})
	});

	context.subscriptions.push(disposable);

	function replaceAll(str: string, find: string | RegExp, replace: string) {
		return str.replace(new RegExp(find, 'g'), replace);
	  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
