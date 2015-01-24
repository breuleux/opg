

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


function Source(text, url, offset) {
    if (!(this instanceof Source))
        return new Source(text, url);
    this.text = text;
    this.url = url;
    this.offset = offset || 0;
    this.counts = [];
    var curr = 0;
    var self = this;
    text.split("\n").forEach(function (line) {
        self.counts.push(curr);
        curr += line.length + 1;
    });
    this.counts.push(curr);
    this.nlines = this.counts.length - 1;
}

Source.prototype.linecol = function (pos) {
    var line = binsearch(this.counts, pos);
    var col = pos - this.counts[line - 1];
    return [line, col];
};


function Location(source, start, end) {
    if (!(this instanceof Location))
        return new Location(source, start, end);
    this.source = source || Source("", null);
    this.start = start;
    this.end = end;
}

Location.prototype.text = function () {
    return this.source.text.slice(this.start, this.end);
};

Location.prototype.at_start = function () {
    return Location(this.source, this.start, this.start);
};

Location.prototype.at_end = function () {
    return Location(this.source, this.end, this.end);
};

Location.prototype.linecol = function () {
    var start = self.source.linecol(this.start);
    var end = this.start === this.end ? null : this.source.linecol(this.end - 1);
    return [start, end];
};

Location.prototype.linerange = function () {
    var lc = this.linecol();
    if (lc[1] === null)
        return [lc[0][0], lc[0][0]];
    else
        return [lc[0][0], lc[1][0]];
};

Location.prototype.ref = function () {
    var lc = this.linecol();
    var l1 = lc[0][0];
    var c1 = lc[0][1];
    if (lc[1] === null)
        return l1 + ":" + c1;
    var l2 = lc[1][0];
    var c2 = lc[1][1];
    if (l1 === l2 && c1 === c2)
        return l1 + ":" + c1;
    if (l1 === l2)
        return l1 + ":" + c1 + "-" + c2;
    return l1 + ":" + c1 + "-" + l2 + ":" + c2;
};


function transferLocation(x, y) {
    if (!(x.location instanceof Location))
        x.location = !(y && y.location instanceof Location) ? y : y.location;
    return x;
}


exports.binsearch = binsearch;
exports.Source = Source;
exports.Location = Location;
exports.transferLocation = transferLocation;

