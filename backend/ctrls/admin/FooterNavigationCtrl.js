const FooterNavigation = require("../../models/FooterNavigationModel");

const fetch = async (req, res) => {
    const { search } = req.query;
    const navigations = await FooterNavigation.find({
        $or: [{
            label: new RegExp(search, "i")
        }, {
            name: new RegExp(search, 'i')
        }, {
            url: new RegExp(search, "i")
        }, {
            page: new RegExp(search, "i")
        }]
    });

    return res.json(navigations);
}

const fetchById = async (req, res) => {
    const { id } = req.params;
    const navigation = await FooterNavigation.findById(id);

    return res.json(navigation);
}

const create = async (req, res) => {
    try {
        const data = req.body;

        await FooterNavigation.create(data);
        return res.json({
            status: true,
            msg: "تم إنشاؤه بنجاح."
        })
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        await FooterNavigation.findByIdAndUpdate(id, data);
        return res.json({
            status: true,
            msg: "تم التحديث بنجاح."
        })
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        });
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await FooterNavigation.findByIdAndDelete(id);

        return res.json({
            status: true,
            msg: 'تم الحذف بنجاح.'
        })
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        });
    }
}

module.exports = {
    fetch,
    fetchById,
    create,
    update,
    remove
}