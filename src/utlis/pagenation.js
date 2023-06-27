exports.createPage = (req) => {
    const page = (req.query.page) ? Number(req.query.page) : 0;
    const limit = (req.query.size) ? Number(req.query.size) : 20;
    const offset = Number(page * limit);

    return {page, limit, offset};
}