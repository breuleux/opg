
exports.tokenize = require("./tokenize.js");
exports.parse = require("./parse.js");



// text = fs.readFileSync(process.argv[2], "utf8");


// tok = new tokenize.SimpleTokenizer({
//     regexps: {
//         newline: "\n *",
//         infix: "[\\(\\)\\[\\]\\{\\},;\n]|[!@$%^&*|/?.:~+=<>-]+",
//         id: "[A-Za-z_][A-Za-z_0-9]*",
//         num: "[0-9]+",
//         str: "\"(?:[^\"]|\\\\.)*\"",
//     },
//     post: [tokenize.indentTracker(), tokenize.inferLocation]
// });



// gr = new parse.TokenGroups({
//     open: ["infix (", "infix [", "infix {", "indent"],
//     close: ["infix )", "infix ]", "infix }", "dedent"],
//     add: ["infix +", "infix -"],
//     mul: ["infix *", "infix /"],
//     exp: ["infix ^"],
//     infix: ["infix"],
//     boundary: ["boundary"],
// });

// prio = new parse.PriorityOrder(gr, {
//     open: {left: 100, right: 0},
//     close: {left: 0, right: 101},
//     boundary: {left: -1, right: -1},
//     add: {left: 10, right: 11},
//     mul: {left: 20, right: 21},
//     exp: {left: 31, right: 30},
//     infix: {left: 40, right: 41},
//     default: {left: 100, right: 101},
// });

// parser = new parse.Parser(tok, prio.getOrder());

// console.dir(parser.parse(text));








// foo % [hello
//   world]
//   what is new?










// console.log(
// gr.resolve({type: "infix", token: "**"})
// );



// // Parser.prototype.getPrio = function (t) {
// //     // getPrio returns a pair of priorities [leftPrio, rightPrio]
// //     // leftPrio is used to compare with operators on the left side
// //     // rightPrio is used to compare with operators on the right side
// //     // Prefix operators can have different priority from infix ones.
// //     var x; var pfx = t.prefix && "P:" || "";
// //     if (x = this.priorities[t.type + ":" + t.token]
// //         ||  this.priorities[pfx + t.token]
// //         ||  this.priorities[t.token]
// //         ||  this.priorities["type:" + t.type])
// //         return x;
// //     throw SyntaxError("Unknown operator: " + t.token);
// // }

// // Parser.prototype.order = function (a, b) {
// //     // Compare the priorities of operators a and b when found in that order
// //     // To help visualize what the return value means, imagine that
// //     // <• and •> are matching brackets, so when you see <• you insert
// //     // "(" after a, and when you see •> you insert ")" before b.
// //     // And when you see =•, you just skip over it.
// //     if (a.type === "boundary" && b.type === "boundary") return "done";
// //     var pa = this.getPrio(a)[1];
// //     var pb = this.getPrio(b)[0];
// //     if (pa < pb)  return "<•";
// //     if (pa > pb)  return "•>";
// //     if (pa == pb) return "=•";
// // }


