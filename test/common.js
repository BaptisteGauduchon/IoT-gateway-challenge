global.request = require('supertest')
global.app = require('../app/app')

process.env.NODE_ENV = 'test'
