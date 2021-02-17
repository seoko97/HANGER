const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
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
				charset: 'utf8mb4',
				collate: 'utf8mb4_unicode_ci', // 이모티콘 저장
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
		db.Post.hasMany(db.Notice);

		// n:m관계
		db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
		db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
		db.Post.belongsToMany(db.User, { through: 'Save', as: 'Savers' });
	}
};
