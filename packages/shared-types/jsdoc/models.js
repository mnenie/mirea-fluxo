/**
 * @typedef {object} User
 * @property {string} _id - The unique identifier for the user.
 * @property {string} email - The email address of the user.
 * @property {string} photoUrl - The URL of the user's profile photo.
 */

/**
 * @typedef {object} Comment
 * @property {User} user - The user who created the comment.
 * @property {string} content - The content of the comment.
 * @property {Date} date - The date and time when the comment was created.
 */

/**
 * @typedef {object} AI
 * @property {'user' | 'assistant'} role - The role of the AI.
 * @property {string | Promise<string} text - The text of the AI response.
 */

/**
 * @typedef {object} Review
 * @property {string} title - The title of the review.
 * @property {string} content - The content of the review.
 * @property {string} email - The email address of the user who created the review.
 * @property {Date} date - The date and time when the review was created.
 * @property {'not verified' | 'consideration' | 'verified'} status - The status of the review
 * @property {number} stars - The number of stars given to the review
 */

/**
 * @typedef {object} Message
 *  @property {User} user - The user who sent the message
 *  @property {string} content - The content of the message
 */

/**
 * @typedef {object} Chat
 * @property {Array<User>} users - The array of users who participated in the chat.
 * @property {Array<Message>} messages - The messages array sent in the chat.
 */
