
# Interface: IQueryable ‹**T**›

## Type parameters

▪ **T**: *[IEntity](ientity.md)*

## Hierarchy

* **IQueryable**

## Index

### Methods

* [find](iqueryable.md#find)
* [findOne](iqueryable.md#findone)
* [whereArrayContains](iqueryable.md#wherearraycontains)
* [whereArrayContainsAny](iqueryable.md#wherearraycontainsany)
* [whereEqualTo](iqueryable.md#whereequalto)
* [whereGreaterOrEqualThan](iqueryable.md#wheregreaterorequalthan)
* [whereGreaterThan](iqueryable.md#wheregreaterthan)
* [whereIn](iqueryable.md#wherein)
* [whereLessOrEqualThan](iqueryable.md#wherelessorequalthan)
* [whereLessThan](iqueryable.md#wherelessthan)

## Methods

###  find

▸ **find**(): *Promise‹T[]›*

*Defined in [src/types.ts:46](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L46)*

**Returns:** *Promise‹T[]›*

___

###  findOne

▸ **findOne**(): *Promise‹T | null›*

*Defined in [src/types.ts:47](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L47)*

**Returns:** *Promise‹T | null›*

___

###  whereArrayContains

▸ **whereArrayContains**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/types.ts:43](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  whereArrayContainsAny

▸ **whereArrayContainsAny**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)[]): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/types.ts:44](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval)[] |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  whereEqualTo

▸ **whereEqualTo**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/types.ts:38](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  whereGreaterOrEqualThan

▸ **whereGreaterOrEqualThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/types.ts:40](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  whereGreaterThan

▸ **whereGreaterThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/types.ts:39](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  whereIn

▸ **whereIn**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)[]): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/types.ts:45](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval)[] |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  whereLessOrEqualThan

▸ **whereLessOrEqualThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/types.ts:42](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  whereLessThan

▸ **whereLessThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/types.ts:41](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*
