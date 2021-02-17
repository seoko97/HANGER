const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
	static init(sequelize) {
		return super.init(
			{
				src: {
					type: DataTypes.TINYINT,
					allowNull: false,
				},
			},
			{
				modelName: 'Image',
				tableName: 'images',
				charset: 'utf8mb4',
				collate: 'utf8mb4_unicode_ci', // 한글 저장
				sequelize,
			},
		);
	}

	static associate(db) {
		db.Image.belongsTo(db.Post);
	}
};
