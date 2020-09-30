import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../pages/index'

test('Loads app', async () => {
  render(<App />)

  expect(screen.getByText('Ringesentralen')).toBeTruthy()
})
