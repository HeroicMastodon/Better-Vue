export interface MapXxxReg {
    findAllArrayMaps: RegExp;
    findStringsFromArrayMaps: RegExp;
    findaAllObjectMaps: RegExp;
    findStringsFromObjectMaps: RegExp;
}

let MapActionsReg: MapXxxReg = {
    findAllArrayMaps: /(?:\.\.\.mapActions)\((?:[^\{^[]*)?\[(?:[^\]]*)/gm,
    findStringsFromArrayMaps: /(?:\.\.\.mapActions)\((?:[^\{^[]*)?\[([^\]]*)/,
    findaAllObjectMaps: /(?:\.\.\.mapActions)\((?:[^\{^\[]*)?\{(?:[^\}]*)/gm,
    findStringsFromObjectMaps: /(?:\.\.\.mapActions)\((?:[^\{^\[]*)?\{([^\}]*)/
};


let MapStateReg: MapXxxReg = {
    findAllArrayMaps: /(?:\.\.\.mapState)\((?:[^\{^[]*)?\[(?:[^\]]*)/gm,
    findStringsFromArrayMaps: /(?:\.\.\.mapState)\((?:[^\{^[]*)?\[([^\]]*)/,
    findaAllObjectMaps: /(?:\.\.\.mapState)\((?:[^\{^\[]*)?\{(?:[^\}]*)/gm,
    findStringsFromObjectMaps: /(?:\.\.\.mapState)\((?:[^\{^\[]*)?\{([^\}]*)/
};


let MapMutationsReg: MapXxxReg = {
    findAllArrayMaps: /(?:\.\.\.mapMutations)\((?:[^\{^[]*)?\[(?:[^\]]*)/gm,
    findStringsFromArrayMaps: /(?:\.\.\.mapMutations)\((?:[^\{^[]*)?\[([^\]]*)/,
    findaAllObjectMaps: /(?:\.\.\.mapMutations)\((?:[^\{^\[]*)?\{(?:[^\}]*)/gm,
    findStringsFromObjectMaps: /(?:\.\.\.mapMutations)\((?:[^\{^\[]*)?\{([^\}]*)/
};


let MapGettersReg: MapXxxReg = {
    findAllArrayMaps: /(?:\.\.\.mapGetters)\((?:[^\{^[]*)?\[(?:[^\]]*)/gm,
    findStringsFromArrayMaps: /(?:\.\.\.mapGetters)\((?:[^\{^[]*)?\[([^\]]*)/,
    findaAllObjectMaps: /(?:\.\.\.mapGetters)\((?:[^\{^\[]*)?\{(?:[^\}]*)/gm,
    findStringsFromObjectMaps: /(?:\.\.\.mapGetters)\((?:[^\{^\[]*)?\{([^\}]*)/
};

export {
    MapGettersReg,
    MapStateReg,
    MapMutationsReg,
    MapActionsReg
};