
function binsearch(xs, x) {
    // Find an insertion point for x in the sorted array xs.
    // Returns an index i such that
    //   xs[i - 1] < x <= xs[i]
    // In particular,
    //   If x < xs[0]              ==> return 0
    //   If x > xs[xs.length - 1]  ==> return xs.length
    // Take note that
    //   If x == xs[i]             ==> return i + 1
    // The return value should not be interpreted as the index where x
    // is found, but some index where x can be safely spliced to
    // preserve the array's sortedness.
    var lo = 0;
    var hi = xs.length - 1;
    while (lo <= hi) {
        var mid = lo + ((hi - lo) >> 1);
        var v = xs[mid];
        if (v < x)
            lo = mid + 1;
        else if (v > x)
            hi = mid - 1;
        else
            return mid + 1
    }
    return lo;
}


function morsel(spans) {
    // Note: this is adapted from a different implementation I wrote a
    // year ago. I am not entirely sure how it works anymore, but I don't
    // really care, as long as it does. (At least I documented what it is
    // supposed to do)

    // spans == Array of span
    // span == {Integer start, Integer end, Array of attribute}
    // attribute == any

    // Morsels the sequence of spans so that none of the spans in the
    // sequence overlap. Ranges covered by more than one span are
    // given the union of the attributes of all the spans covering it.

    // Example:
    // morsel with {{0, 10, {1}}, {2, 5, {2}}, {4, 7, {3}}, {40, 50, {4}}}
    // => {{0, 2, {1}}, {2, 4, {1, 2}}, {4, 5, {1, 2, 3}}, {5, 7, {1, 3}},
    //     {7, 10, {1}}, {10, 40, {}}, {40, 50, {4}}}

    function jump(active, bot, top) {
        var choices = [top].concat(active.map(function (x) { return x[1]; }));
        var e = Math.min.apply(null, choices);
        var attributes = [];
        active.forEach(function (x) {
            attributes = attributes.concat(x[2]);
        });
        return [e, [bot, e, attributes]];
    }

    function jumptill(active, bot, top) {
        if (bot === top) {
            return [[], active];
        }
        else {
            var j = jump(active, bot, top);
            var newbot = j[0];
            var span = j[1];
            var newactive = [];
            active.forEach(function (x) {
                if (x[1] > newbot) {
                    newactive.push(x);
                }
            });
            var jt = jumptill(newactive, newbot, top);
            var spans = jt[0];
            var remainder = jt[1];
            return [[span].concat(spans), remainder];
        }
    }

    function process_elements(start, active, rem) {
        if (active.length === 0 && rem.length === 0) {
            return []
        }
        else if (rem.length === 0) {
            var choices = active.map(function (x) { return x[1]; });
            var top = Math.max.apply(null, choices);
            var bot = Math.min(start, top);
            var spans = jumptill(active, start, top)[0];
            return spans;
        }
        else {
            var next = rem[0];
            var rest = rem.slice(1);
            var target = next[0];
            var jt = jumptill(active, start, target);
            return jt[0].concat(process_elements(target, [next].concat(jt[1]), rest));
        }
    }

    var thespans = spans.sort(function (a, b) {
        if (a[0] === b[0])
            return a[1] - b[1];
        else
            return a[0] - b[0];
    });

    return process_elements(thespans[0][0], [], thespans);
}

exports.binsearch = binsearch;
exports.morsel = morsel;

