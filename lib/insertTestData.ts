// TODO: Remove in prod
import prisma from "@/lib/prisma";
import { PostType, Post } from ".prisma/client";

const MS_IN_HOUR = 1000*60*60;
const insertTestData = async () => {
	await prisma.subreddit.deleteMany();
	await prisma.subreddit.createMany({
		data: [
			{
				id: 1,
				name: "Cats doing cat things",
				slug: "cats",
			},
			{
				id: 2,
				name: "Dogs (Definitely better than cats)",
				slug: "dogs",
			},
			{
				id: 3,
				name: "Ask me anything, if you're lucky I might even answer!",
				slug: "askMeAnything",
			},
			{
				id: 4,
				name: "XKCD",
				slug: "xkcd",
			}
		]
	});

	await prisma.user.deleteMany();
	await prisma.user.createMany({
		data: [
			{
				id: 1,
				name: "Player One",
				slug: "playerOne",
			},
			{
				id: 2,
				name: "Player One",
				slug: "player1",
			},
			{
				id: 3,
				name: "Correct Horse Battery Staple",
				slug: "correct_horse",
			},
			{
				id: 4,
				name: "Calvin",
				slug: "calvin1985",
			},
			{
				id: 5,
				name: "Cat Person",
				slug: "catPerson",
			},
			{
				id: 6,
				name: "Cat Person",
				slug: "actuallyACat",
			},
			{
				id: 7,
				name: "A normal human typing with my human hands",
				slug: "spider",
			},
			{
				id: 8,
				name: "Dog Lover",
				slug: "dogLover",
			},
			{
				id: 9,
				name: "The one who asks the questions",
				slug: "theQuestion",
			},
			{
				id: 10,
				name: "The one who answers the questions",
				slug: "theAnswer",
			},
		]
	});

	await prisma.post.deleteMany();
	await prisma.post.createMany({
		data: [
			// Cats
			{
				score: 7,
				content: "https://placekitten.com/900/900",
				subredditId: 1,
				title: "Look at this 900x900 Cat!",
				type: PostType.IMAGE_LINK,
				userId: 5,
			},
			{
				score: 12,
				content: "https://placekitten.com/900/300",
				subredditId: 1,
				title: "W i d e  C a t 🐈",
				type: PostType.IMAGE_LINK,
				userId: 5,
				createdDate: new Date("2022-10-23 8:03:34"),
			},
			{
				score: 4,
				content: "https://placekitten.com/300/900",
				subredditId: 1,
				title: "Tall Cat",
				type: PostType.IMAGE_LINK,
				userId: 5,
				createdDate: new Date(Date.now() - MS_IN_HOUR*1),
			},
			// Dogs
			{
				score: 4,
				subredditId: 2,
				title: "300x300 Dog",
				content: "https://placedog.net/900/900",
				type: PostType.IMAGE_LINK,
				userId: 8,
				createdDate: new Date("2022-11-23 8:03:34"),
			},
			{
				score: 4,
				subredditId: 2,
				title: "L O N G Doggo",
				content: "https://placedog.net/900/300",
				type: PostType.IMAGE_LINK,
				userId: 8,
				createdDate: new Date(Date.now() - MS_IN_HOUR*7),
			},
			{
				score: 4,
				subredditId: 2,
				title: "Stretchy Boi",
				content: "https://placedog.net/300/900",
				type: PostType.IMAGE_LINK,
				userId: 8,
				createdDate: new Date("2022-05-23 2:12:34"),
			},
			// AMA
			{
				score: 9,
				subredditId: 3,
				title: "I'm a cat, AMA",
				content: "Meow meow meow Meow Meow purrrr.... meow meow meow purrrrrrrrrrr",
				type: PostType.TEXT,
				userId: 6,
				createdDate: new Date(Date.now() - MS_IN_HOUR*3)
			},
			{
				score: -5,
				subredditId: 3,
				title: "Please don't ask me any questions",
				content: "Hello, I just don't want you to ask me any questions, ok?",
				type: PostType.TEXT,
				userId: 4,
				createdDate: new Date("1987-11-23 9:12:34"),
			},
			// XKCD
			{
				score: 3,
				subredditId: 4,
				title: "This one is my favorite!",
				content: "https://xkcd.com/936/",
				type: PostType.LINK,
				userId: 3,
				createdDate: new Date("2021-01-23 8:03:34"),
			},
			{
				score: 8,
				subredditId: 4,
				title: "FJAFJKLDSKF7JKFDJ",
				content: "https://xkcd.com/1530/",
				type: PostType.LINK,
				userId: 7,
				createdDate: new Date("2022-10-23 11:03:34"),
			}
		]
	});
};

export default insertTestData;
