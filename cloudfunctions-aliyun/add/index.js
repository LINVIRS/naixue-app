'use strict';
const db =uniClou.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection =db.collection('message')
	const res =await collection.add(event)
	
	//返回数据给客户端
	return res
};
