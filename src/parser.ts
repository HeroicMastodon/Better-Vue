import { TextDocument, CompletionItem, CompletionItemKind, Position, CompletionContext } from 'vscode';
import { MapXxxReg, MapActionsReg, MapMutationsReg, MapGettersReg, MapStateReg } from './reg';

const mapReg = [
    {
        reg: MapStateReg,
        kind: CompletionItemKind.Variable
    },
    {
        reg: MapGettersReg,
        kind: CompletionItemKind.Value
    },
    {
        reg: MapActionsReg,
        kind: CompletionItemKind.Function
    },
    {
        reg: MapMutationsReg,
        kind: CompletionItemKind.Method
    },
];



function matchMapArr(text: string, reg: MapXxxReg) {
    const arrayMatch = text.match(reg.findAllArrayMaps) || [];
    // const arrayMatch = reg.exec(text) || [];
    
    let stringsToMatch: any[] = [];
    
    if (typeof arrayMatch[0] !== 'undefined') {
        arrayMatch.forEach(match => {
            let stringsMatch = match.match(reg.findStringsFromArrayMaps) || [];
            
            if (typeof stringsMatch[1] !== 'undefined') {
                stringsToMatch.push(stringsMatch[1]);
            }
        });
        let matches: string[] = [];

        stringsToMatch.forEach(match => {
            matches = matches.concat(match.match(/\w+/g));
        });
        return matches;
    }
    
    return [];
}

function matchMapObj(text: string, reg: MapXxxReg) {
    const arrayMatch = text.match(reg.findaAllObjectMaps) || [];
    // const arrayMatch = reg.exec(text) || [];
    let stringsToMatch: any[] = [];
    
    if (typeof arrayMatch[0] !== 'undefined') {
        arrayMatch.forEach(match => {
            let stringsMatch = match.match(reg.findStringsFromObjectMaps) || [];
            
            if (typeof stringsMatch[1] !== 'undefined') {
                stringsToMatch.push(stringsMatch[1]);
            }
        });
        let matches: string[] = [];

        stringsToMatch.forEach(match => {
            matches = matches.concat(match.match(/[\w]+(?=:)/g));
        });
        // return objectMatch[1].match(/[\w]+(?=:)/g) || [];

        return matches;
    }
    return [];
}

function parseVarMaps(text: string, prefix: string): CompletionItem[] {
    let arrayItems:any[] = [];
    let objectItems: any[] = [];
    let itemKind: CompletionItemKind;
    
    let completionItems: CompletionItem[] = [];
    
    mapReg.forEach(mapType => {
        arrayItems = matchMapArr(text, mapType.reg);
        objectItems = matchMapObj(text, mapType.reg);
        itemKind = mapType.kind;

        arrayItems.forEach(item => {
            let newItem = new CompletionItem(item, itemKind);
            newItem.insertText = prefix + item;
            completionItems.push(newItem);
        });

        objectItems.forEach(item => {
            let newItem = new CompletionItem(item.substring(0, item.indexOf(':')), itemKind);
            newItem.insertText = prefix + newItem.label;
            completionItems.push(newItem);
        });

    });

    return completionItems;
}

export function parseMaps(document: TextDocument, position: Position, context: CompletionContext, completionType: string): CompletionItem[] {
    let trigger = context.triggerCharacter || 'other';
    let start = Date.now();

    /* Allows for typing this.xxx to access mapXxx members */
    let line: any = document.lineAt(position).text.substr(0, position.character);
    line = line.trim().split(/\s+/);
    line = line[line.length - 1];
    let list = line.split('.');
    
    if (completionType === 'this' && (list.length !== 2 || list[0] !== 'this')) {
        let end = Date.now();
        console.log('Start: ' + start + 'ms End: ' + end + 'ms');
        console.log('Cost: ' + (end - start) + 'ms');
        return [];
    }
    
    const prefix = trigger === '.' ? '' : 'this.';
    let text = document.getText();
    let items = parseVarMaps(text, prefix);
    
    let end = Date.now();
    console.log('Start: ' + start + 'ms End: ' + end + 'ms');
    console.log('Cost: ' + (end - start) + 'ms');
    return items;
}