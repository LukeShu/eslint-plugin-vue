/**
 * @fileoverview Define a style for the props casing in templates.
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/attribute-hyphenation')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

ruleTester.run('attribute-hyphenation', rule, {

  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><div><custom data-id="foo" aria-test="bar" slot-scope="{ data }" my-prop="prop"></custom></div></template>',
      options: ['always']
    },
    {
      filename: 'test.vue',
      code: '<template><div><custom data-id="foo" aria-test="bar" slot-scope="{ data }" myProp="prop"></custom></div></template>',
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: '<template><div data-id="foo" aria-test="bar" slot-scope="{ data }"><a onClick="" my-prop="prop"></a></div></template>',
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: '<template><custom data-id="foo" aria-test="bar" slot-scope="{ data }" custom-hyphen="foo"><a onClick="" my-prop="prop"></a></custom></template>',
      options: ['never', { 'ignore': ['custom-hyphen', 'second-custom'] }]
    },
    {
      filename: 'test.vue',
      code: '<template><svg><defs><pattern id="pat" viewBox="0 0 100 100"></pattern></defs></svg></template>',
      options: ['always']
    },
    {
      filename: 'test.vue',
      code: '<template xmlns="http://www.w3.org/2000/svg"><defs><pattern id="pat" viewBox="0 0 100 100"></pattern></defs></template>',
      options: ['always']
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div><custom my-prop="foo"></custom></div></template>',
      output: '<template><div><custom myProp="foo"></custom></div></template>',
      options: ['never'],
      errors: [{
        message: "Attribute 'my-prop' can't be hyphenated.",
        type: 'VIdentifier',
        line: 1
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><div><custom MyProp="Bar"></custom></div></template>',
      output: '<template><div><custom my-prop="Bar"></custom></div></template>',
      options: ['always'],
      errors: [{
        message: "Attribute 'MyProp' must be hyphenated.",
        type: 'VIdentifier',
        line: 1
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><div><custom :my-prop="prop"></custom></div></template>',
      output: '<template><div><custom :myProp="prop"></custom></div></template>',
      options: ['never'],
      errors: [{
        message: "Attribute ':my-prop' can't be hyphenated.",
        type: 'VDirectiveKey',
        line: 1
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><div><custom :MyProp="prop"></custom></div></template>',
      output: '<template><div><custom :my-prop="prop"></custom></div></template>',
      options: ['always'],
      errors: [{
        message: "Attribute ':MyProp' must be hyphenated.",
        type: 'VDirectiveKey',
        line: 1
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><div><custom v-bind:my-prop="prop"></custom></div></template>',
      output: '<template><div><custom v-bind:myProp="prop"></custom></div></template>',
      options: ['never'],
      errors: [{
        message: "Attribute 'v-bind:my-prop' can't be hyphenated.",
        type: 'VDirectiveKey',
        line: 1
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><div><custom v-bind:MyProp="prop"></custom></div></template>',
      output: '<template><div><custom v-bind:my-prop="prop"></custom></div></template>',
      options: ['always'],
      errors: [{
        message: "Attribute 'v-bind:MyProp' must be hyphenated.",
        type: 'VDirectiveKey',
        line: 1
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><div><custom v-bind:MyProp="prop"></custom></div></template>',
      output: '<template><div><custom v-bind:my-prop="prop"></custom></div></template>',
      options: ['always', { 'ignore': [] }],
      errors: [{
        message: "Attribute 'v-bind:MyProp' must be hyphenated.",
        type: 'VDirectiveKey',
        line: 1
      }]
    },
    {
      // This is the same code as the `'ignore': ['custom-hyphen']`
      // valid test; to verify that setting ignore actually makes the
      // difference.
      filename: 'test.vue',
      code: '<template><custom data-id="foo" aria-test="bar" slot-scope="{ data }" custom-hyphen="foo"><a onClick="" my-prop="prop"></a></custom></template>',
      output: '<template><custom data-id="foo" aria-test="bar" slot-scope="{ data }" customHyphen="foo"><a onClick="" my-prop="prop"></a></custom></template>',
      options: ['never'],
      errors: [{
        message: "Attribute 'custom-hyphen' can't be hyphenated.",
        type: 'VIdentifier',
        line: 1
      }]
    }
  ]
})
