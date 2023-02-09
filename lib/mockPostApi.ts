interface User {
	displayName: string;
	id: string;
}

export interface Comment {
	id: string;
	user: User;
	postId: number;
	content: string;
	score: number;
	children?: Comment[]
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

export const getCommentCount = (postId: number) => (postId % 3) * 3;

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
