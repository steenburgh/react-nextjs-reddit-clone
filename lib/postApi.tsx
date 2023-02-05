interface DisplayNameAndId {
	displayName: string;
	id: string;
}

export type SubReddit = DisplayNameAndId;
export type User = DisplayNameAndId;

export interface Comment {
	id: string;
	user: User;
	postId: number;
	content: string;
	score: number;
	children?: Comment[]
}

export interface PostData {
	id: number;
	title: string;
	dateMs: number;
	score: number;
	subReddit: SubReddit;
	user: User;
	commentCount: number;
}

const MOCK_COMMENT_CONTENTS = [
	`👋👋👋👋🎉🎉🎉`,
	`Bacon ipsum dolor amet shoulder cow beef ribs sirloin, pork loin burgdoggen capicola short loin leberkas ribeye ball tip kevin shank. Venison sirloin doner, beef ribs meatball tri-tip leberkas fatback ribeye shankle frankfurter pastrami. Pastrami chuck tenderloin salami jowl bacon spare ribs. Short ribs chuck doner chicken. Ribeye landjaeger chuck sausage tenderloin salami porchetta shankle swine pig ground round strip steak capicola pastrami.

	Short loin corned beef pastrami, biltong beef ribs jerky cupim capicola drumstick tail leberkas. Bresaola biltong ball tip andouille spare ribs, jowl cow. Shank frankfurter ball tip fatback shankle pig t-bone ham jerky doner pork belly pastrami tail swine. Corned beef tongue brisket hamburger, turkey drumstick filet mignon sirloin doner ribeye shank capicola beef kevin shankle.

	Alcatra flank drumstick meatball, jowl meatloaf ribeye. Turducken pork belly pork chop, tail swine t-bone jowl pig ham. Spare ribs turkey short loin bacon, tenderloin turducken kevin. Bacon pork shank pork belly rump. Filet mignon beef ribs capicola biltong cow hamburger.`,
	`I am a human typing with human hands, pay no attention to this comment`,
	`Capicola flank corned beef, jowl andouille ball tip boudin short loin biltong tail sausage shankle jerky shank rump. Tri-tip ham hock strip steak pork, pork loin capicola ground round.`,
	`Meow`,
]

const MOCK_USERS = [
	{ displayName: "Player One", id: "playerOne" },
	{ displayName: "Calvin", id: "calvin1985" },
	{ displayName: "Test User 1234", id: "testUser1234" }
];

const MOCK_SUBREDDITS = [
	{ displayName: "Cats", id: "cats", },
	{ displayName: "Dogs", id: "dogs", },
	{ displayName: "Test Subreddit 1234", id: "TestSubReddit", },
	{ displayName: "Mom's Spaghetti (knees weak, arms are heavy)", id: "MomsSpaghetti" },
]

const MOCK_POST_COUNT = 12;
const MS_IN_HOUR = 1000*60*60;
const getCommentCount = (postId: number) => (postId % 3) * 3;
const MOCK_POSTS: PostData[] = Array.from({ length: MOCK_POST_COUNT }).map((_, index) => ({
	id: index,
	title: `Post number ${index}`,
	dateMs: Date.now() - index * MS_IN_HOUR,
	score: (index % 3),
	subReddit: MOCK_SUBREDDITS[index % MOCK_SUBREDDITS.length],
	user: MOCK_USERS[index % MOCK_USERS.length],
	commentCount: getCommentCount(index),
}));

const generateComments = (postId: number): Comment[] =>
	Array.from({ length: getCommentCount(postId) })
		.map((_, index) => ({
			id: `${postId}_${index}`,
			user: MOCK_USERS[index % MOCK_USERS.length],
			postId,
			content: MOCK_COMMENT_CONTENTS[index % MOCK_COMMENT_CONTENTS.length],
			score: index % 3,
		}));

export const getComments = async (postId: number): Promise<Comment[]> =>
	Promise.resolve(generateComments(postId));

export const getPostIds = async (): Promise<number[]> =>
	Promise.resolve(
		MOCK_POSTS.map((post) => post.id)
	);

// TODO: 404 for these?
export const getPost = async (postId: number): Promise<PostData | undefined> =>
	Promise.resolve(
		MOCK_POSTS.find((post) => post.id === postId)
	);

export const getPosts = async (): Promise<PostData[]> =>
	Promise.resolve(MOCK_POSTS);

export const getPostsByUser = async (userId: string): Promise<PostData[]> =>
	Promise.resolve(
		MOCK_POSTS.filter(({ user }) => user.id === userId)
	);

export const getPostsBySubreddit = async (subRedditId: string): Promise<PostData[]> =>
	Promise.resolve(
		MOCK_POSTS.filter(({ subReddit }) => subReddit.id === subRedditId)
	);

export const getSubRedditIds = async (): Promise<string[]> =>
	Promise.resolve(
		MOCK_SUBREDDITS.map((subReddit) => subReddit.id)
	);

export const getUserIds = async (): Promise<string[]> =>
	Promise.resolve(
		MOCK_USERS.map((user) => user.id)
	);

export const getUser = async (userId: string): Promise<User | undefined> =>
	Promise.resolve(
		MOCK_USERS.find(({ id }) => id === userId)
	);

export const getSubReddit = async (subredditId: string): Promise<SubReddit | undefined> =>
	Promise.resolve(
		MOCK_SUBREDDITS.find(({ id }) => id === subredditId)
	);
