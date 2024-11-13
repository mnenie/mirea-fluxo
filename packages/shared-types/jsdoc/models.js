/**
 * @typedef {object} User
 * @property {number} _id - Уникальный идентификатор пользователя
 * @property {string} email - Адрес электронной почты пользователя
 * @property {string} photoUrl - URL профиля пользователя
 * @property {string} password - Пароль пользователя
 * @property {'manager' | 'corporation'} role - Роль пользователя в системе, может быть менеджер или организация
 * @property {string} organization - Название организации пользователя
 */

/**
 * @typedef {object} Orders
 * @property {number} _id - Уникальный идентификатор заказа
 * @property {string} title - Название заказа
 * @property {string} content - Содержание заказа
 * @property {Date} date - Дата и время создания заказа
 * @property {'not verified' | 'in process' | 'closed'} status - Статус заказа, может быть не проверен, в процессе или закрыт
 * @property {string} email - Адрес электронной почты заказчика
 * @property {number} price - Цена заказа
 * @property {string} organization - Название организации, ответственной за заказ
 */

/**
 * @typedef {object} AI
 * @property {string} prompt - Текст запроса, с которым взаимодействует ИИ для создания ответа
 */