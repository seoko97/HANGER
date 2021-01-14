const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends (
	Model
) {
	static init(sequelize) {
		return super.init(
			{
				content: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
			},
			{
				modelName: 'Post',
				tableName: 'posts',
				charset: 'utf8',
				collate: 'utf8_general_ci',
				sequelize,
			},
		);
	}
	static associate(db) {
		// 포스트는 하나의 유저만을 가진다 (유저는 여러개의 포스트를 가질 수있다.)
		// 따라서 포스트와 유저는 1대다 관계이며
		// 하나에 해당하는 포스트는 belongsTo, 유저는 hasMany를 사용할 수 있다.
		db.Post.belongsTo(db.User);
		db.Post.hasMany(db.Comment);
		db.Post.hasMany(db.Image);

		// n:m관계
		db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
	}
};
