const FormSetting = require("../../models/FormSettingModel");
const Request = require("../../models/RequestModel");

const updateFormSetting = async (req, res) => {
    try {
        const data = req.body
        if (req.files && req.files.image) {
            data.image = req.files.image[0].filename;
        }

        const result = await FormSetting.updateOne(
            { _id: data.id},
            {
                $set: {
                    ...data
                }
            }
        );

        if(result) {
            return res.json({
                status: true,
                msg: "تم التحديث بنجاح.",
            })
        }else {
            return res.json({
                status: false,
            })
        }
    } catch(err) {
        return res.json({
            status: false,
            msg: err.message
        }); 
    }
}

const getAllRequest = async (req, res) => {
    try {
        const { search } = req.query;
        const query = [
          {
            title: new RegExp(search, "i"),
          },
          {
            content: new RegExp(search, "i"),
          },
        ];
        const requests = await Request.find({
            $or: query,
          });
        return res.json({
            status: true,
            msg: "تم التحديث بنجاح.",
            requests
        })
    }catch(err) {
        return res.json({
            status: false,
            msg: err.message
        }); 
    }
}

const setStatus = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.body.status
        console.log(status)
        const result = await Request.updateOne({_id: id}, { $set: { status }})
        if(result.nModifiled === 0) {
            return res.json({
                status: false,
            })
        }else {
            return res.json({
                status: true,
                msg: "تم التحديث بنجاح.",
            })
        }
    }catch(err) {
        return res.json({
            status: false,
            msg: err.message
        }); 
    }
}

const setDetails = async (req, res) => {
    try {
        const id = req.params.id
        const details = req.body.details
        const result = await Request.updateOne({_id: id}, { $set: { details, status: 'processed' }})

        if(result.nModifiled === 1) {
            return res.json({
                status: false,
            })
        }else {
            return res.json({
                status: true,
                msg: "تم التحديث بنجاح.",
            })
        }
    }catch(err) {
        return res.json({
            status: false,
            msg: err.message
        }); 
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Request.findByIdAndDelete(id)

        if(result) {
            return res.json({
                status: true,
                msg: "تم التحديث بنجاح.",
            })
        }else {
            return res.json({
                status: false,
            })

        }
    }catch(err) {
        return res.json({
            status: false,
            msg: err.message
        }); 
    }
}

module.exports = {
    updateFormSetting,
    getAllRequest,
    setStatus,
    setDetails,
    deleteOrder
}