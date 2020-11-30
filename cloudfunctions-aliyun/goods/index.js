'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await db.collection('category').aggregate().lookup({
		from: 'goods',
		localField: 'goods_type',
		foreignField: 'goods_type',
		as: 'goods_list'
	}).end()
	//返回数据给客户端
	return res
};
