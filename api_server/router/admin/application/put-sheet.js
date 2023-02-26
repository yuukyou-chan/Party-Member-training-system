// 导入申请表集合
const { ApplicationSheet } = require("../../../model/applicationSheet");
const _ = require("lodash");

module.exports = async (req, res) => {
  const fields = _.pick(req.body, ["_id", "status", "message"]);

  if (!fields._id) {
    return res.error({
      message: "【_id】字段不能为空",
    });
  }

  if (!fields.status) {
    return res.error({
      message: "【status】字段不能为空",
    });
  }

  try {
    // 记录审核时间
    fields.checkTime = new Date();

    let data = await ApplicationSheet.findByIdAndUpdate(
      fields._id,
      { $set: fields },
      { new: true, select: ["-u_id"] }
    );
    res.success({
      data,
      message: "修改申请表成功！",
    });
  } catch (error) {
    res.error({
      message: error,
    });
  }
};
