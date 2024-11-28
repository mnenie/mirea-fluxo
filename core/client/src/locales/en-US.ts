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
    table: ['ID', 'Status', 'Organizations', 'Heading', 'Price', 'Date', 'Close Date'],
    pagination: 'Display on the page',
    status: {
      not_verified: 'Not verified',
      in_process: 'In process',
      closed: 'Closed',
    },
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
    actions: 'Contract | Analyze risks | Add new stage',
    delete: 'Delete stage',
    attributes: ['Responsible', 'Date', 'Status', 'Price', 'Organizations', 'Description'],
    tabs: 'Order stages | RHM',
    values: 'Change status to in process or closed... | company is ready to pay | Create any stage',
    ai: {
      title: 'OR',
      badges: ['ask ai', 'analyze', 'so... make tea 😉'],
    },
    contract: {
      title: 'Automatic prolongation',
      values: ['-', '1 week', '1 month', '1 year'],
    },
    stages: {
      no_stages: 'No stages yet',
      no_map: 'Analyze risks and upload the map',
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
            title: {
              label: 'Stage title',
              placeholder: 'Enter new stage',
              description: 'Title of the order stage',
            },
            content: {
              label: 'Stage content',
              placeholder: 'Enter stage description',
              description: 'Description of the order stage',
            },
            price: {
              label: 'Price',
              placeholder: 'Enter price',
            },
            date: {
              label: 'Date',
              placeholder: 'Enter date',
              description: 'End date for the stage',
            },
          },
          error: {
            required: 'Required field.',
            invalidLength: 'Field must contain between 2 and 50 characters.',
            invalidType: 'Invalid value.',
          },
        },
      },
    },
    rhm: 'Risks (go in order in the map)',
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
  welcome: {
    orders: {
      title: 'Orders',
      description: 'Convenience of tracking orders in real-time in a table format',
    },
    analytics: {
      title: 'Analytics',
      description: 'Charts and statistics on government orders in a convenient format for you',
    },
    ai: {
      title: 'Built-in AI',
      description: 'Artificial intelligence will help you with work and risk analysis of the project',
    },
    map: {
      title: 'Heat Map',
      description: 'Risks of government orders can be displayed as a heat map',
    },
    notifications: {
      title: 'Notifications',
      description: 'Notifications arrive quickly in real-time',
    },
    contract: {
      title: 'Contract',
      description: 'Signing a contract with one click in each valid government order',
    },
    title: 'Our Business Solution',
    description: 'Fluxo - a service for managing business processes and orders in 1C Enterprise.',
    badge: 'Fluxo Core',
    btns: 'Log in | About us | Privacy Policy',
  },
}
