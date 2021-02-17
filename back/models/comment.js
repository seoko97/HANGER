const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
	static init(sequelize) {
		return super.init(
			{
				content: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
			},
			{
				modelName: 'Comment',
				tableName: 'comments',
				charset: 'utf8mb4',
				collate: 'utf8mb4_general_ci', // 이모티콘 저장
				sequelize,
			},
		);
	}

	static associate(db) {
		// 하나의 포스트는 여러개의 댓글을 가진다
		db.Comment.belongsTo(db.Post);
		// 하나의 유저는 여러개의 댓글을 가진다.
		db.Comment.belongsTo(db.User);
	}
};
