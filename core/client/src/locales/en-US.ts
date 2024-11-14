export default {
  header: {
    ai: 'Build-in AI',
    welcome: 'Go to Welcome',
    logout: 'Logout',
    badge: 'commercial',
  },
  sidebar: {
    search: 'Search',
    menu: 'Menu',
    ai: 'AI Proposal',
    items: ['Orders', 'Archive', 'Notifications', 'Analytics'],
    ai_new: {
      title: 'Smart Kanban',
      badge: 'soon',
    },
    card: {
      title: 'Ask AI anything about orders',
      description: 'Get answers to your questions about orders',
      badges: 'How do I respond? | Help with analytics',
    },
  },
  orders: {
    filters: 'Filter by status | Sort | Reshuffle',
    table: ['ID', 'Status', 'Organization', 'Heading', 'Price', 'Date'],
    pagination: 'Display on the page',
  },
  analytics: {
    description: 'View the analytics for all orders in our service and compare the successes with the past',
    badges: ['1CManager', '1C:Enterprise', '1C:Platform'],
    charts: {
      money: {
        title: 'Profit',
        badge: 'money',
        description: 'Total profit from the entire company for the month',
      },
      workload: {
        title: 'Workload',
        badge: 'workload',
      },
      orders: {
        title: 'Orders in our workspace',
        badge: 'orders',
      },
      summary: {
        title: 'Summary of orders',
        badge: 'summary',
        dataset: 'Closed orders | All orders',
      },
    },
  },
  order: {
    actions: 'Contract | Analyze review',
    attributes: ['Responsible', 'Date', 'Status', 'Price', 'Organization'],
    values: 'Change status to in process or closed... | company is ready to pay | Choose an organization',
    ai: {
      title: 'OR',
      badges: ['ask ai', 'analyze and correct', 'so... make tea 😉'],
    },
    stages: {
      no_stages: 'No stages yet',
      add: 'Add new stage...',
      container: {
        section: 'History | Total price',
        value: 'RUB | published',
      },
      dialog: {
        title: 'Add new stage',
        description: 'You can add a new stage in this order here',
        add: 'Add to the list',
        fields: {
          stage: {
            label: 'Stage',
            placeholder: 'Enter new stage',
            description: 'This is the stage of the order',
          },
          price: {
            label: 'Price',
            placeholder: 'Enter the price',
          },
        },
      },
    },
  },
  sign_in: {
    title: 'Welcome back',
    btn: 'Sign in with Email',
    description: 'Enter your info below to sign in your account',
    link: 'By proceeding you acknowledge that you have read, understood and agree to our | Terms and Conditions.',
    footer: 'Repository | About Us',
    form: {
      email: 'Email',
      password: 'Password',
    },
  },
}
