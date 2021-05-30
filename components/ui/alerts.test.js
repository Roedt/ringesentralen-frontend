/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { Danger } from './alerts'

describe('Tester de ulike alert komponentene', () => {
  test('Danger viser teksten som sendes inn', () => {
    const melding = 'Dette er Danger'
    const { container } = render(<Danger message={melding} />)
    expect(container).not.toBeEmptyDOMElement()
    expect(screen.getByText(melding)).toBeInTheDocument()
  })
})
