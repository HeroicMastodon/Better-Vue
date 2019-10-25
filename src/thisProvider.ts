import {
    CompletionItemProvider,
    CompletionItem,
    TextDocument,
    Position,
} from 'vscode';

export class MapsProvider implements CompletionItemProvider {
    constructor() {

    }


    public provideCompletionItems(document: TextDocument, position: Position) : CompletionItem[] {

        return [];
    }
}