const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends (
	Model
) {
	static init(sequelize) {
		return super.init(
			{
				// id가 기본적으로 들어있다.
				name: {
					type: DataTypes.STRING(20),
					allowNull: false,
				},
			},
			{
				modelName: 'Hashtag',
				tableName: 'hashtags',
				charset: 'utf8mb4',
				collate: 'utf8mb4_general_ci', // 이모티콘 저장
				sequelize,
			},
		);
	}
	static associate(db) {
		// n:m관계
		// 하나의 포스트에는 여러개의 태그가 존재하고 있으며
		// 하나의 태그는 여러 포스트에 존재하고 있다.
		db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
	}
};
