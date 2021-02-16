const DataTypes = require('sequelize');
const { Model } = DataTypes;

// 일반 알림
module.exports = class Notice extends (
	Model
) {
	static init(sequelize) {
		return super.init(
			{
				noticed: {
					type: DataTypes.STRING(50),
					allowNull: false,
				},
			},
			{
				modelName: 'Notice',
				tableName: 'notices',
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
		db.Notice.belongsTo(db.User, { as: 'targetUser' });
		db.Notice.belongsTo(db.Post);
	}
};
