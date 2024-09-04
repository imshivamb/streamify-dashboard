// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock the TextEncoder and TextDecoder globals
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder