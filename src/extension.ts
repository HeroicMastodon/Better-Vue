// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { parseMaps } from './parser';

// TODO: Take a look at auto-rename/close tag and better comment extensions

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({scheme: 'file', language: 'vue'}, {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
            return parseMaps(document, position, context, 'this');
        },
    },
        '.'
    ));

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({scheme: 'file', language: 'vue'}, {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
            return parseMaps(document, position, context, '');
        },
    }
    ));
}
    

// this method is called when your extension is deactivated
export function deactivate() {}
