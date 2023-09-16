import * as assert from 'node:assert'
import { describe, it } from '@jest/globals'
import { NumberParser } from './index'

describe(NumberParser.name, () => {
  it('should parse ECMASCRIPT numbers', () => {
    const numberParser = new NumberParser('en-US')
    assert.equal(numberParser.parse('12345.6'), 12345.6)
  })

  it('should parse ARABIC numbers with grouping', () => {
    const numberParser = new NumberParser('ar-EG')
    assert.equal(numberParser.parse('١٬٢٣٤٫٥٦'), 1234.56)
  })

  it('should parse CHINESE numbers with grouping', () => {
    const numberParser = new NumberParser('zh-Hans-CN-u-nu-hanidec')
    assert.equal(numberParser.parse('一,二三四.五六'), 1234.56)
  })

  it('should parse ENGLISH numbers with grouping', () => {
    const numberParser = new NumberParser('en')
    assert.equal(numberParser.parse('12,345,678.90'), 12345678.9)
  })

  it('should fail to parse GERMAN formatted numbers with en parser', () => {
    const numberParser = new NumberParser('en')
    assert.equal(numberParser.parse('12.345.678,90'), NaN)
  })

  it('should parse FRENCH numbers with grouping', () => {
    const numberParser = new NumberParser('fr')
    assert.equal(numberParser.parse('12 345 678,90'), 12345678.9)
  })

  it('should parse GERMAN numbers with grouping', () => {
    const numberParser = new NumberParser('de')
    assert.equal(numberParser.parse('12.345.678,90'), 12345678.9)
  })

  //indian english test
  it('should parse INDIAN ENGLISH numbers with grouping', () => {
    const numberParser = new NumberParser('en-IN')
    assert.equal(numberParser.parse('12,34,567.89'), 1234567.89)
  })
})
