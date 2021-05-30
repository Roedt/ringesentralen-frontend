/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { Danger, Info, Success, Warning } from './alerts'

describe('Tester de ulike alert komponentene', () => {
  test('Danger viser teksten som sendes inn', () => {
    const melding = 'Dette er Danger'
    const { container } = render(<Danger message={melding} />)
    expect(container).not.toBeEmptyDOMElement()
    expect(screen.getByText(melding)).toBeInTheDocument()
  })

  test('Info viser teksten som sendes inn', () => {
    const melding = 'Dette er Info'
    const { container } = render(<Info message={melding} />)
    expect(container).not.toBeEmptyDOMElement()
    expect(screen.getByText(melding)).toBeInTheDocument()
  })

  test('Success viser teksten som sendes inn', () => {
    const melding = 'Dette er Success'
    const { container } = render(<Success message={melding} />)
    expect(container).not.toBeEmptyDOMElement()
    expect(screen.getByText(melding)).toBeInTheDocument()
  })

  test('Warning viser teksten som sendes inn', () => {
    const melding = 'Dette er Warning'
    const { container } = render(<Warning message={melding} />)
    expect(container).not.toBeEmptyDOMElement()
    expect(screen.getByText(melding)).toBeInTheDocument()
  })
})
