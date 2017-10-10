module.exports = [{
    id: 1,
    name: 'Java Training 2017',
    state: 'no_integration',
    source_repository: 'https://github.com/segg3r/training-flow',
    lessons: [{
        id: 1,
        name: 'OOP',
        description: 'Zdes byl Egor Bugaenko.',
        state: 'completed',
        feedback: [{
            author: {
                id: 2,
                name: 'Nikita',
                avatar: '/images/nikita.jpg'
            },
            text: 'Kod gavno'
        }, {
            author: {
                id: 3,
                name: 'Pasha',
                avatar: '/images/pasha.jpg'
            },
            text: 'Zato Spring Boot'
        }]
    }, {
        id: 2,
        name: 'JMS',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        state: 'in_progress',
        feedback: []
    }, {
        id: 3,
        name: 'Spring',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        state: 'blocked',
        feedback: []
    }],
    current_lesson_index: 1
  }];