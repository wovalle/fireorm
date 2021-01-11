
# Class: QueryBuilder ‹**T**›

## Type parameters

▪ **T**: *[IEntity](../interfaces/ientity.md)*

## Hierarchy

* **QueryBuilder**

## Implements

* [IQueryable](../interfaces/iqueryable.md)‹T, this› & [IOrderable](../interfaces/iorderable.md)‹T, this› & [ILimitable](../interfaces/ilimitable.md)‹T, this›

## Index

### Constructors

* [constructor](querybuilder.md#constructor)

### Properties

* [executor](querybuilder.md#protected-executor)
* [limitVal](querybuilder.md#protected-limitval)
* [orderByObj](querybuilder.md#protected-orderbyobj)
* [queries](querybuilder.md#protected-queries)

### Methods

* [extractWhereParam](querybuilder.md#private-extractwhereparam)
* [find](querybuilder.md#find)
* [findOne](querybuilder.md#findone)
* [limit](querybuilder.md#limit)
* [orderByAscending](querybuilder.md#orderbyascending)
* [orderByDescending](querybuilder.md#orderbydescending)
* [whereArrayContains](querybuilder.md#wherearraycontains)
* [whereArrayContainsAny](querybuilder.md#wherearraycontainsany)
* [whereEqualTo](querybuilder.md#whereequalto)
* [whereGreaterOrEqualThan](querybuilder.md#wheregreaterorequalthan)
* [whereGreaterThan](querybuilder.md#wheregreaterthan)
* [whereIn](querybuilder.md#wherein)
* [whereLessOrEqualThan](querybuilder.md#wherelessorequalthan)
* [whereLessThan](querybuilder.md#wherelessthan)

## Constructors

###  constructor

\+ **new QueryBuilder**(`executor`: [IQueryExecutor](../interfaces/iqueryexecutor.md)‹T›): *[QueryBuilder](querybuilder.md)*

*Defined in [src/QueryBuilder.ts:17](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`executor` | [IQueryExecutor](../interfaces/iqueryexecutor.md)‹T› |

**Returns:** *[QueryBuilder](querybuilder.md)*

## Properties

### `Protected` executor

• **executor**: *[IQueryExecutor](../interfaces/iqueryexecutor.md)‹T›*

*Defined in [src/QueryBuilder.ts:19](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L19)*

___

### `Protected` limitVal

• **limitVal**: *number*

*Defined in [src/QueryBuilder.ts:16](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L16)*

___

### `Protected` orderByObj

• **orderByObj**: *[IOrderByParams](../interfaces/iorderbyparams.md)*

*Defined in [src/QueryBuilder.ts:17](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L17)*

___

### `Protected` queries

• **queries**: *Array‹[IFireOrmQueryLine](../interfaces/ifireormqueryline.md)›* = []

*Defined in [src/QueryBuilder.ts:15](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L15)*

## Methods

### `Private` extractWhereParam

▸ **extractWhereParam**(`param`: [IWherePropParam](../globals.md#iwherepropparam)‹T›): *string*

*Defined in [src/QueryBuilder.ts:21](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`param` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |

**Returns:** *string*

___

###  find

▸ **find**(): *Promise‹T[]›*

*Defined in [src/QueryBuilder.ts:150](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L150)*

**Returns:** *Promise‹T[]›*

___

###  findOne

▸ **findOne**(): *Promise‹T›*

*Defined in [src/QueryBuilder.ts:154](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L154)*

**Returns:** *Promise‹T›*

___

###  limit

▸ **limit**(`limitVal`: number): *this*

*Defined in [src/QueryBuilder.ts:110](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`limitVal` | number |

**Returns:** *this*

___

###  orderByAscending

▸ **orderByAscending**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›): *this*

*Defined in [src/QueryBuilder.ts:120](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |

**Returns:** *this*

___

###  orderByDescending

▸ **orderByDescending**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›): *this*

*Defined in [src/QueryBuilder.ts:135](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |

**Returns:** *this*

___

###  whereArrayContains

▸ **whereArrayContains**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *this*

*Defined in [src/QueryBuilder.ts:71](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *this*

___

###  whereArrayContainsAny

▸ **whereArrayContainsAny**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)[]): *this*

*Defined in [src/QueryBuilder.ts:80](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval)[] |

**Returns:** *this*

___

###  whereEqualTo

▸ **whereEqualTo**(`param`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *this*

*Defined in [src/QueryBuilder.ts:26](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`param` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *this*

___

###  whereGreaterOrEqualThan

▸ **whereGreaterOrEqualThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *this*

*Defined in [src/QueryBuilder.ts:44](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *this*

___

###  whereGreaterThan

▸ **whereGreaterThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *this*

*Defined in [src/QueryBuilder.ts:35](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *this*

___

###  whereIn

▸ **whereIn**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)[]): *this*

*Defined in [src/QueryBuilder.ts:95](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval)[] |

**Returns:** *this*

___

###  whereLessOrEqualThan

▸ **whereLessOrEqualThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *this*

*Defined in [src/QueryBuilder.ts:62](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *this*

___

###  whereLessThan

▸ **whereLessThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *this*

*Defined in [src/QueryBuilder.ts:53](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/QueryBuilder.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) |

**Returns:** *this*
