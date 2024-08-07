const Contact = require("../models/ContactModel")

const create = async (req, res) => {
    try {
        const data = req.body;
        await Contact.create(data);

        return res.json({
            status: true,
            msg: "با موفقیت ارسال شد."
        });
    } catch (err) {
        return res.json({
            status: false,
            msg: err.message
        });
    }
}

module.exports = {
    create
}