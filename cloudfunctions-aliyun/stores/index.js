'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection('stores').get()
	console.log("返回的数据")
	console.log(res.data)
	return res.data
};
