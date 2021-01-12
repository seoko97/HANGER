import shortId from 'shortid';
import faker from 'faker';

export const dummyUser1 = {
	id: 0,
	userId: 'wltjrgh',
	firstName: '지',
	lastName: '석호',
	nickname: 'devlop_JI',
	birth: '1997-10-07',
	gender: 'male',
	posts: [],
};

export const dummyPost = (num) =>
	Array(num)
		.fill()
		.map(() => ({
			id: shortId.generate(),
			User: {
				id: shortId.generate(),
				nickname: 'devlop_Ji',
			},
			content: faker.lorem.paragraph(),
			Images: [
				{
					src: faker.image.image(),
				},
			],
			Comments: [
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
			],
		}));
