
# Class: ValidationError

Copied from class-validator/validation/ValidationError.d.ts

## Hierarchy

* **ValidationError**

## Index

### Properties

* [children](validationerror.md#children)
* [constraints](validationerror.md#optional-constraints)
* [contexts](validationerror.md#optional-contexts)
* [property](validationerror.md#property)
* [target](validationerror.md#optional-target)
* [value](validationerror.md#optional-value)

### Methods

* [toString](validationerror.md#tostring)

## Properties

###  children

• **children**: *[ValidationError](validationerror.md)[]*

*Defined in [src/Errors/ValidationError.ts:36](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Errors/ValidationError.ts#L36)*

Contains all nested validation errors of the property.

___

### `Optional` constraints

• **constraints**? : *object*

*Defined in [src/Errors/ValidationError.ts:29](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Errors/ValidationError.ts#L29)*

Constraints that failed validation with error messages.

#### Type declaration:

* \[ **type**: *string*\]: string

___

### `Optional` contexts

• **contexts**? : *object*

*Defined in [src/Errors/ValidationError.ts:41](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Errors/ValidationError.ts#L41)*

#### Type declaration:

* \[ **type**: *string*\]: any

___

###  property

• **property**: *string*

*Defined in [src/Errors/ValidationError.ts:17](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Errors/ValidationError.ts#L17)*

Object's property that haven't pass validation.

___

### `Optional` target

• **target**? : *object*

*Defined in [src/Errors/ValidationError.ts:12](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Errors/ValidationError.ts#L12)*

Object that was validated.

OPTIONAL - configurable via the ValidatorOptions.validationError.target option

___

### `Optional` value

• **value**? : *any*

*Defined in [src/Errors/ValidationError.ts:24](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Errors/ValidationError.ts#L24)*

Value that haven't pass a validation.

OPTIONAL - configurable via the ValidatorOptions.validationError.value option

## Methods

###  toString

▸ **toString**(`shouldDecorate?`: boolean, `hasParent?`: boolean, `parentPath?`: string): *string*

*Defined in [src/Errors/ValidationError.ts:50](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Errors/ValidationError.ts#L50)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`shouldDecorate?` | boolean | decorate the message with ANSI formatter escape codes for better readability |
`hasParent?` | boolean | true when the error is a child of an another one |
`parentPath?` | string | path as string to the parent of this property  |

**Returns:** *string*
