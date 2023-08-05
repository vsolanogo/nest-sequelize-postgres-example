"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDates = void 0;
const getDates = (str) => {
    return str ? str.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g) : null;
};
exports.getDates = getDates;
//# sourceMappingURL=helpers.js.map