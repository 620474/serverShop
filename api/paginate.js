function paginate(model, page, limit) {
    const result = {};
    if (!limit && !page) {
        result.results = model;
        return result;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < model.length) {
        result.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    result.results = model.slice(startIndex, endIndex);
    return result;
}


module.exports = paginate;
