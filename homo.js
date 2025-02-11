const homo = ((Nums) => {
    const numsReversed = Object.keys(Nums).map(x => +x).filter(x => x > 0);
    const getMinDiv = (num) => {
        for (let i = numsReversed.length; i >= 0; i--)
            if (num >= numsReversed[i])
                return numsReversed[i];
    };
    const isDotRegex = /\.(\d+?)0{0,}$/;
    const demolish = (num) => {
        if (typeof num !== "number") return "";

        if (num === Infinity || Number.isNaN(num))
            return `Invalid number: ${num}`;

        if (num < 0)
            return `(⑨)*(${demolish(num * -1)})`.replace(/\*\(1\)/g, "");

        if (!Number.isInteger(num)) {
            const n = num.toFixed(16).match(isDotRegex)[1].length;
            return `(${demolish(num * Math.pow(10, n))})/(10)^(${n})`;
        }

        if (Nums[num]) return String(num);

        const div = getMinDiv(num);
        return (`${div}*(${demolish(Math.floor(num / div))})+` +
            `(${demolish(num % div)})`).replace(/\*\(1\)|\+\(0\)$/g, "");
    };

    const finisher = (expr) => {
        expr = expr.replace(/\d+|⑨/g, (n) => Nums[n]).replace("^", "**");
        while (expr.match(/[\*|\/]\([^\+\-\(\)]+\)/))
            expr = expr.replace(/([\*|\/])\(([^\+\-\(\)]+)\)/, (m, $1, $2) => $1 + $2);
        while (expr.match(/[\+|\-]\([^\(\)]+\)[\+|\-|\)]/))
            expr = expr.replace(/([\+|\-])\(([^\(\)]+)\)([\+|\-|\)])/, (m, $1, $2, $3) => $1 + $2 + $3);
        while (expr.match(/[\+|\-]\([^\(\)]+\)$/))
            expr = expr.replace(/([\+|\-])\(([^\(\)]+)\)$/, (m, $1, $2) => $1 + $2);
        if (expr.match(/^\([^\(\)]+?\)$/))
            expr = expr.replace(/^\(([^\(\)]+)\)$/, "$1");
        expr = expr.replace(/\+-/g, '-');
        return expr;
    };

    let numEntries = {};
    for (let i = 1; i <= 564219; i++) {
        numEntries[i] = `(${Math.floor(i / 564219)} * 564219) + ${i % 564219}`;
    }
    numEntries[564219] = "564219";
    numEntries[0] = "(1-1)*564219";
    numEntries["⑨"] = "5-6+4-2+1-9";

    return (num) => finisher(demolish(num));
})(numEntries);

if (typeof module === 'object' && module.exports)
    module.exports = homo;
