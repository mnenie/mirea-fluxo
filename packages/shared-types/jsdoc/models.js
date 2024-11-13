/**
 * @typedef {object} User
 * @property {string} _id - Уникальный идентификатор пользователя
 * @property {string} email - Адрес электронной почты пользователя
 * @property {string} photoUrl - URL профиля пользователя
 * @property {string} password - Пароль пользователя
 * @property {'manager' | 'corporation'} role - Роль пользователя в системе, может быть менеджер или человек с гк организации
 * @property {string} organization - Название организации пользователя !только если статус "corporation"
 */

/**
 * @typedef {object} Order
 * @property {string} _id - Уникальный идентификатор заказа
 * @property {string} title - Название заказа
 * @property {string} content - Содержание заказа
 * @property {Date} date - Дата и время создания заказа
 * @property {'not verified' | 'in process' | 'closed'} status - Статус заказа, может быть не проверен, в процессе или закрыт
 * @property {number} price - Цена заказа
 * @property {string} organization - Название организации, ответственной за заказ
 */

/**
 * @typedef {object} AI
 * @property {string} prompt - Текст запроса, с которым взаимодействует ИИ для создания ответа
 */
