'use strict';
const db =uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection =db.collection('message')
	const res =await collection.orderBy("_id","desc").get()
	
	//返回数据给客户端
	return res
};
