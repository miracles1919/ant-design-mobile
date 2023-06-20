import React, { createRef } from 'react'
import { render, screen, fireEvent, userEvent, act } from 'testing'
import PasscodeInput, { PasscodeInputRef } from '..'
import { NumberKeyboard } from 'antd-mobile'

const classPrefix = 'adm-passcode-input'
const cellClassPrefix = 'adm-passcode-input-cell'

function getCells() {
  return document.body.querySelectorAll(`.${classPrefix}-cell`)
}

function mockClick(el: HTMLElement) {
  fireEvent.touchStart(el, { touches: [{}] })
  fireEvent.touchEnd(el, { touches: [{}] })
}

describe('PasscodeInput', () => {
  const originScrollIntoView = window.HTMLElement.prototype.scrollIntoView
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  afterAll(() => {
    window.HTMLElement.prototype.scrollIntoView = originScrollIntoView
  })

  test('basic usage', () => {
    render(<PasscodeInput keyboard={<NumberKeyboard />} />)
    const input = screen.getByRole('button', { name: '密码输入框' })
    fireEvent.focus(input)
    expect(input).toHaveClass(`${classPrefix}-focused`)

    mockClick(screen.getByText('1'))
    const cells = getCells()
    expect(cells[0]).toHaveClass(`${cellClassPrefix}-dot`)
    expect(cells[1]).toHaveClass(
      `${cellClassPrefix}-caret ${cellClassPrefix}-focused`
    )
  })

  test('plain should be work', () => {
    render(<PasscodeInput plain keyboard={<NumberKeyboard />} />)
    const input = screen.getByRole('button', { name: '密码输入框' })
    fireEvent.focus(input)

    mockClick(screen.getByText('1'))
    const cells = getCells()
    expect(cells[0]).not.toHaveClass(`${cellClassPrefix}-dot`)
    expect(cells[0]).toHaveTextContent('1')
  })

  test('renders with error', () => {
    render(<PasscodeInput error />)
    const input = screen.getByRole('button', { name: '密码输入框' })
    expect(input).toHaveClass(`${classPrefix}-error`)
  })

  test('seperated should be work', () => {
    render(<PasscodeInput seperated keyboard={<NumberKeyboard />} />)
    const input = screen.getByRole('button', { name: '密码输入框' })
    expect(input).toHaveClass(`${classPrefix}-seperated`)
    fireEvent.focus(input)

    const cells = getCells()
    expect(cells[0]).toHaveClass(
      `${cellClassPrefix}-caret ${cellClassPrefix}-focused`
    )

    mockClick(screen.getByText('1'))
    expect(cells[0]).toHaveClass(`${cellClassPrefix}-dot`)
    expect(cells[1]).toHaveClass(
      `${cellClassPrefix}-caret ${cellClassPrefix}-focused`
    )
  })

  test('native keyboard should be work', async () => {
    render(<PasscodeInput plain />)
    const input = screen.getByRole('button', { name: '密码输入框' })
    fireEvent.focus(input)
    await userEvent.keyboard('abc')
    expect(input).toHaveTextContent('abc')
  })

  test('event callbacks should be called', async () => {
    const onBlur = vi.fn()
    const onChange = vi.fn()
    const onFill = vi.fn()
    const onFocus = vi.fn()
    render(
      <PasscodeInput
        length={4}
        onBlur={onBlur}
        onChange={onChange}
        onFill={onFill}
        onFocus={onFocus}
      />
    )

    const input = screen.getByRole('button', { name: '密码输入框' })
    fireEvent.focus(input)
    expect(onFocus).toBeCalled()
    await userEvent.keyboard('abcde')
    expect(onFill).toBeCalled()
    expect(onChange).toBeCalledTimes(4)
    fireEvent.blur(input)
    expect(onBlur).toBeCalled()
  })

  test('imperative handle', () => {
    const ref = createRef<PasscodeInputRef>()
    render(<PasscodeInput ref={ref} />)
    const input = screen.getByRole('button', { name: '密码输入框' })
    act(() => {
      ref.current?.focus()
    })
    expect(input).toHaveClass(`${classPrefix}-focused`)
    act(() => {
      ref.current?.blur()
    })
    expect(input).not.toHaveClass(`${classPrefix}-focused`)
  })
})
