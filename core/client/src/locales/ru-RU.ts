export default {
  header: {
    ai: 'Встроенный ИИ',
    welcome: 'На главную',
    logout: 'Выход',
    badge: 'коммерческий',
  },
  sidebar: {
    search: 'Поиск',
    menu: 'Меню',
    ai: 'ИИ пропозал',
    items: ['Заказы', 'Архив', 'Уведомления', 'Аналитика'],
    ai_new: {
      title: 'Умный Канбан',
      badge: 'скоро',
    },
    card: {
      title: 'Спросите ИИ о заказах',
      description: 'Получите ответы на вопросы о заказах',
      badges: 'Как ответить? | Помощь с аналитикой',
    },
  },
  orders: {
    filters: 'Фильтровать по статусу | Сортировать | Перемешать',
    table: ['ID', 'Статус', 'Организация', 'Названи', 'Цена', 'Дата', 'Дата закрытия'],
    pagination: 'Отображать на странице',
  },
  analytics: {
    description: 'Просмотрите аналитику всех заказов в нашем сервисе и сравните успехи с прошлым периодом',
    badges: ['1CManager', '1C:Enterprise', '1C:Platform'],
    charts: {
      money: {
        title: 'Прибыль',
        badge: 'money',
        description: 'Общая прибыль всей компании за месяц',
      },
      workload: {
        title: 'Нагрузка',
        badge: 'workload',
      },
      orders: {
        title: 'Заказы в нашем рабочем пространстве',
        badge: 'orders',
      },
      summary: {
        title: 'Сводка заказов',
        badge: 'summary',
        dataset: 'Закрытые заказы | Все заказы',
      },
    },
  },
  order: {
    actions: 'Договор | Анализ отзыва',
    attributes: ['Менеджер', 'Дата', 'Статус', 'Цена', 'Организация'],
    values: 'Изменить статус на "в процессе" или "закрыто"... | компания готова оплатить | Выберите организацию',
    ai: {
      title: 'ИЛИ',
      badges: ['спросить у ии', 'анализировать и исправить', 'пока... заварите чай 😉'],
    },
    stages: {
      no_stages: 'Еще нет этапов',
      add: 'Добавить новый этап...',
      container: {
        section: 'История | Общая сумма',
        value: 'РУБ | опубликовал(-а)',
      },
      dialog: {
        title: 'Добавить новый этап',
        description: 'Вы можете добавить новый этоп в этом заказе здесь',
        add: 'Добавить в список',
        fields: {
          stage: {
            label: 'Этап',
            placeholder: 'Введите новый этап',
            description: 'Название этапа заказа',
          },
          price: {
            label: 'Цена',
            placeholder: 'Введите цену',
          },
        },
      },
    },
  },
  sign_in: {
    title: 'Добро пожаловать',
    btn: 'Войти с помощью Email',
    description: 'Введите свои данные ниже, чтобы войти в свой аккаунт',
    link: 'Продолжая, вы подтверждаете, что прочитали, поняли и согласны с нашими | Условиями и правилами.',
    footer: 'Репозиторий | О нас',
    form: {
      email: 'Email',
      password: 'Пароль',
    },
  },
}
