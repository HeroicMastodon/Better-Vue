import { TextDocument, CompletionItem, CompletionItemKind, Position } from 'vscode';

const mutationObjReg = /\.\.\.mapMutations\(\{([^\}]*)/;
const mutationArrReg = /\.\.\.mapMutations\(\[([^\]]*)/;
const actionObjReg = /\.\.\.mapActions\(\{([^\}]*)/;
const actionArrReg = /\.\.\.mapActions\(\[([^\]]*)/;
const getterObjReg = /\.\.\.mapGetters\(\{([^\}]*)/;
const getterArrReg = /\.\.\.mapGetters\(\[([^\]]*)/;
const stateObjReg = /\.\.\.mapState\(\{([^\}]*)/;
const stateArrReg = /\.\.\.mapState\(\[([^\]]*)/;

const mapReg = [
    {
        arr: stateArrReg,
        obj: stateObjReg,
        kind: CompletionItemKind.Variable
    },
    {
        arr: getterArrReg,
        obj: getterObjReg,
        kind: CompletionItemKind.Value
    },
    {
        arr: actionArrReg,
        obj: actionObjReg,
        kind: CompletionItemKind.Function
    },
    {
        arr: mutationArrReg,
        obj: mutationObjReg,
        kind: CompletionItemKind.Method
    },
];



function matchMapArr(text: string, reg: RegExp) {
    const arrayMatch = text.match(reg) || [];
    
    if (typeof arrayMatch[1] !== 'undefined') {
        return arrayMatch[1].match(/\w+/g) || [];
    }
    
    return [];
}

function matchMapObj(text: string, reg: RegExp) {
    const objectMatch = text.match(reg) || [];

    if (typeof objectMatch[1] !== 'undefined') {

        return objectMatch[1].match(/[\w]+:/g) || [];
    }
    return [];
}

function parseVarMaps(text: string): CompletionItem[] {
    // const arrayIndex = text.indexOf('mapState([');
    let arrayItems:any[] = [];
    let objectItems: any[] = [];
    let itemKind: CompletionItemKind;
    
    let completionItems: CompletionItem[] = [];

    mapReg.forEach(mapType => {
        arrayItems = matchMapArr(text, mapType.arr);
        objectItems = matchMapObj(text, mapType.obj);
        itemKind = mapType.kind;

        arrayItems.forEach(item => {
            let newItem = new CompletionItem(item, itemKind);
            newItem.insertText = 'this.' + item;
            completionItems.push(newItem);
        });

        objectItems.forEach(item => {
            let newItem = new CompletionItem(item.substring(0, item.indexOf(':')), itemKind);
            newItem.insertText = 'this.' + newItem.label;
            completionItems.push(newItem);
        });
    });

    return completionItems;
}

export function parseMaps(document: TextDocument, position: Position): CompletionItem[] {
    let start = Date.now();
    let line: any = document.lineAt(position).text.substr(0, position.character);
    line = line.trim().split(/\s+/);
    line = line[line.length - 1];
    let list = line.split('.');
    console.log(list);
    
    let text = document.getText();
    let items = parseVarMaps(text);
    
    let end = Date.now();
    console.log('Start: ' + start + 'ms End: ' + end + 'ms');
    console.log('Cost: ' + (end - start) + 'ms');
    return items;
}