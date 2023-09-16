/**
 * @example new NumberParser('en-US').parse('12345.6') // 12345.6
 * @example new NumberParser('ar-EG').parse('١٬٢٣٤٫٥٦') // 1234.56
 * @example new NumberParser('en-US').parse('12.345,00) // NaN
 *
 * Borrowed from https://observablehq.com/@mbostock/localized-number-parsing
 */
export class NumberParser {
  #decimal: RegExp
  #group: RegExp
  #index: (d: string) => string
  #locale: string
  #numeral: RegExp

  constructor(locale: string) {
    this.#locale = locale
    const parts = new Intl.NumberFormat(locale).formatToParts(12345.6)
    const numerals = [
      ...new Intl.NumberFormat(locale, { useGrouping: false }).format(
        9876543210
      ),
    ].reverse()
    const index = new Map(numerals.map((d, i) => [d, i]))
    this.#group = (() => {
      const { value } = parts.find((d) => d.type === 'group')!
      // if value is the French non-breaking space, allow ascii spaces
      return new RegExp(`[${value}${value === '\u202f' ? '\u0020' : ''}]`, 'g')
    })()
    this.#decimal = new RegExp(
      `[${parts.find((d) => d.type === 'decimal')!.value}]`
    )
    this.#numeral = new RegExp(`[${numerals.join('')}]`, 'g')
    this.#index = (d: string) => index.get(d) as unknown as string
  }

  parse(string: string) {
    const result = string
      .trim()
      .replace(this.#group, '')
      .replace(this.#decimal, '.')
      .replace(this.#numeral, this.#index)

    console.log(this.#locale, this.#group)
    console.log(result)

    return isFinite(result as unknown as number) ? +result : NaN
  }
}
