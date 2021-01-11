
# Class: AbstractFirestoreRepository ‹**T**›

## Type parameters

▪ **T**: *[IEntity](../interfaces/ientity.md)*

## Hierarchy

* [BaseRepository](baserepository.md)

  ↳ **AbstractFirestoreRepository**

  ↳ [TransactionRepository](transactionrepository.md)

  ↳ [BaseFirestoreRepository](basefirestorerepository.md)

## Implements

* [IBaseRepository](../interfaces/ibaserepository.md)‹T, this› & [IQueryable](../interfaces/iqueryable.md)‹T, this› & [IOrderable](../interfaces/iorderable.md)‹T, this› & [ILimitable](../interfaces/ilimitable.md)‹T, this› & [IQueryExecutor](../interfaces/iqueryexecutor.md)‹T, this›

## Index

### Constructors

* [constructor](abstractfirestorerepository.md#constructor)

### Properties

* [colMetadata](abstractfirestorerepository.md#protected-readonly-colmetadata)
* [config](abstractfirestorerepository.md#protected-readonly-config)
* [firestoreColRef](abstractfirestorerepository.md#protected-readonly-firestorecolref)
* [path](abstractfirestorerepository.md#protected-readonly-path)

### Methods

* [create](abstractfirestorerepository.md#abstract-create)
* [delete](abstractfirestorerepository.md#abstract-delete)
* [execute](abstractfirestorerepository.md#abstract-execute)
* [extractTFromColSnap](abstractfirestorerepository.md#protected-extracttfromcolsnap)
* [extractTFromDocSnap](abstractfirestorerepository.md#protected-extracttfromdocsnap)
* [find](abstractfirestorerepository.md#find)
* [findById](abstractfirestorerepository.md#abstract-findbyid)
* [findOne](abstractfirestorerepository.md#findone)
* [initializeSubCollections](abstractfirestorerepository.md#protected-initializesubcollections)
* [limit](abstractfirestorerepository.md#limit)
* [orderByAscending](abstractfirestorerepository.md#orderbyascending)
* [orderByDescending](abstractfirestorerepository.md#orderbydescending)
* [toSerializableObject](abstractfirestorerepository.md#protected-toserializableobject)
* [transformFirestoreTypes](abstractfirestorerepository.md#protected-transformfirestoretypes)
* [update](abstractfirestorerepository.md#abstract-update)
* [validate](abstractfirestorerepository.md#validate)
* [whereArrayContains](abstractfirestorerepository.md#wherearraycontains)
* [whereArrayContainsAny](abstractfirestorerepository.md#wherearraycontainsany)
* [whereEqualTo](abstractfirestorerepository.md#whereequalto)
* [whereGreaterOrEqualThan](abstractfirestorerepository.md#wheregreaterorequalthan)
* [whereGreaterThan](abstractfirestorerepository.md#wheregreaterthan)
* [whereIn](abstractfirestorerepository.md#wherein)
* [whereLessOrEqualThan](abstractfirestorerepository.md#wherelessorequalthan)
* [whereLessThan](abstractfirestorerepository.md#wherelessthan)

## Constructors

###  constructor

\+ **new AbstractFirestoreRepository**(`pathOrConstructor`: string | [IEntityConstructor](../globals.md#ientityconstructor)): *[AbstractFirestoreRepository](abstractfirestorerepository.md)*

*Defined in [src/AbstractFirestoreRepository.ts:38](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`pathOrConstructor` | string &#124; [IEntityConstructor](../globals.md#ientityconstructor) |

**Returns:** *[AbstractFirestoreRepository](abstractfirestorerepository.md)*

## Properties

### `Protected` `Readonly` colMetadata

• **colMetadata**: *[FullCollectionMetadata](../interfaces/fullcollectionmetadata.md)*

*Defined in [src/AbstractFirestoreRepository.ts:35](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L35)*

___

### `Protected` `Readonly` config

• **config**: *[MetadataStorageConfig](../interfaces/metadatastorageconfig.md)*

*Defined in [src/AbstractFirestoreRepository.ts:37](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L37)*

___

### `Protected` `Readonly` firestoreColRef

• **firestoreColRef**: *CollectionReference*

*Defined in [src/AbstractFirestoreRepository.ts:38](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L38)*

___

### `Protected` `Readonly` path

• **path**: *string*

*Defined in [src/AbstractFirestoreRepository.ts:36](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L36)*

## Methods

### `Abstract` create

▸ **create**(`item`: [PartialBy](../globals.md#partialby)‹T, "id"›): *Promise‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:398](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L398)*

Creates a document.
If no id is passed, is automatically generated.
Must be implemented by base repositores

**`abstract`** 

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type |
------ | ------ |
`item` | [PartialBy](../globals.md#partialby)‹T, "id"› |

**Returns:** *Promise‹T›*

___

### `Abstract` delete

▸ **delete**(`id`: string): *Promise‹void›*

*Defined in [src/AbstractFirestoreRepository.ts:420](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L420)*

Deletes a document.
Must be implemented by base repositores

**`abstract`** 

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹void›*

___

### `Abstract` execute

▸ **execute**(`queries`: [IFireOrmQueryLine](../interfaces/ifireormqueryline.md)[], `limitVal?`: number, `orderByObj?`: [IOrderByParams](../interfaces/iorderbyparams.md), `single?`: boolean): *Promise‹T[]›*

*Defined in [src/AbstractFirestoreRepository.ts:370](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L370)*

Takes all the queries stored by QueryBuilder and executes them.
Must be implemented by base repositores

**`abstract`** 

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`queries` | [IFireOrmQueryLine](../interfaces/ifireormqueryline.md)[] | list of queries stored in QueryBuilder |
`limitVal?` | number | - |
`orderByObj?` | [IOrderByParams](../interfaces/iorderbyparams.md) | - |
`single?` | boolean | - |

**Returns:** *Promise‹T[]›*

results from firestore converted into
entities <T>

___

### `Protected` extractTFromColSnap

▸ **extractTFromColSnap**(`q`: QuerySnapshot, `tran?`: Transaction, `tranRefStorage?`: [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage)): *T[]*

*Defined in [src/AbstractFirestoreRepository.ts:129](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`q` | QuerySnapshot |
`tran?` | Transaction |
`tranRefStorage?` | [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage) |

**Returns:** *T[]*

___

### `Protected` extractTFromDocSnap

▸ **extractTFromDocSnap**(`doc`: DocumentSnapshot, `tran?`: Transaction, `tranRefStorage?`: [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage)): *T*

*Defined in [src/AbstractFirestoreRepository.ts:114](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`doc` | DocumentSnapshot |
`tran?` | Transaction |
`tranRefStorage?` | [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage) |

**Returns:** *T*

___

###  find

▸ **find**(): *Promise‹T[]›*

*Defined in [src/AbstractFirestoreRepository.ts:310](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L310)*

Execute the query and applies all the filters (if specified)

**`memberof`** AbstractFirestoreRepository

**Returns:** *Promise‹T[]›*

List of documents that matched the filters
(if specified)

___

### `Abstract` findById

▸ **findById**(`id`: string): *Promise‹T | null›*

*Defined in [src/AbstractFirestoreRepository.ts:386](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L386)*

Retrieve a document with the specified id.
Must be implemented by base repositores

**`abstract`** 

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹T | null›*

___

###  findOne

▸ **findOne**(): *Promise‹T | null›*

*Defined in [src/AbstractFirestoreRepository.ts:323](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L323)*

Execute the query to find at least one document matching all
filters (if specified)

**`memberof`** AbstractFirestoreRepository

**Returns:** *Promise‹T | null›*

One document that matched the filters
(if specified), or null if none exists.

___

### `Protected` initializeSubCollections

▸ **initializeSubCollections**(`entity`: T, `tran?`: Transaction, `tranRefStorage?`: [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage)): *void*

*Defined in [src/AbstractFirestoreRepository.ts:83](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | T |
`tran?` | Transaction |
`tranRefStorage?` | [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage) |

**Returns:** *void*

___

###  limit

▸ **limit**(`limitVal`: number): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:267](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L267)*

Returns a new QueryBuilder with a maximum number of results
to return. Can only be used once per query.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`limitVal` | number | maximum number of results to return Must be greater or equal than 0 |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

QueryBuilder A new QueryBuilder with
the specified limit applied

___

###  orderByAscending

▸ **orderByAscending**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:285](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L285)*

Returns a new QueryBuilder with an additional ascending order
specified by @param prop. Can only be used once per query.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be ordered on, where prop could be keyof T or a lambda where T is the first parameter |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
ordering applied.

___

###  orderByDescending

▸ **orderByDescending**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:299](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L299)*

Returns a new QueryBuilder with an additional descending order
specified by @param prop. Can only be used once per query.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be ordered on, where prop could be keyof T or a lambda where T is the first parameter |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
ordering applied.

___

### `Protected` toSerializableObject

▸ **toSerializableObject**(`obj`: T): *Record‹string, unknown›*

*Defined in [src/AbstractFirestoreRepository.ts:61](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | T |

**Returns:** *Record‹string, unknown›*

___

### `Protected` transformFirestoreTypes

▸ **transformFirestoreTypes**(`obj`: Record‹string, unknown›): *object*

*Defined in [src/AbstractFirestoreRepository.ts:64](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | Record‹string, unknown› |

**Returns:** *object*

___

### `Abstract` update

▸ **update**(`item`: T): *Promise‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:409](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L409)*

Updates a document.
Must be implemented by base repositores

**`abstract`** 

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Promise‹T›*

___

###  validate

▸ **validate**(`item`: T): *Promise‹[ValidationError](validationerror.md)[]›*

*Defined in [src/AbstractFirestoreRepository.ts:333](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L333)*

Uses class-validator to validate an entity using decorators set in the collection class

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`item` | T | class or object representing an entity |

**Returns:** *Promise‹[ValidationError](validationerror.md)[]›*

An array of class-validator errors

___

###  whereArrayContains

▸ **whereArrayContains**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:223](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L223)*

Returns a new QueryBuilder with a filter specifying that the
value in @param val must be contained in @param prop.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be filtered on, where prop could be keyof T or a lambda where T is the first parameter |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) | value to compare in the filter |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
query applied.

___

###  whereArrayContainsAny

▸ **whereArrayContainsAny**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)[]): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:238](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L238)*

Returns a new QueryBuilder with a filter specifying that the
field @param prop is an array that contains one or more of the comparison values in @param val

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be filtered on, where prop could be keyof T or a lambda where T is the first parameter |
`val` | [IFirestoreVal](../globals.md#ifirestoreval)[] | array of values to compare in the filter (max 10 items in array) |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
query applied.

___

###  whereEqualTo

▸ **whereEqualTo**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:148](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L148)*

Returns a new QueryBuilder with a filter specifying that the
value in @param prop must be equal to @param val.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be filtered on, where prop could be keyof T or a lambda where T is the first parameter |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) | value to compare in the filter |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
query applied.

___

###  whereGreaterOrEqualThan

▸ **whereGreaterOrEqualThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:178](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L178)*

Returns a new QueryBuilder with a filter specifying that the
value in @param prop must be greater or equal than @param val.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be filtered on, where prop could be keyof T or a lambda where T is the first parameter |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) | value to compare in the filter |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
query applied.

___

###  whereGreaterThan

▸ **whereGreaterThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:163](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L163)*

Returns a new QueryBuilder with a filter specifying that the
value in @param prop must be greater than @param val.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be filtered on, where prop could be keyof T or a lambda where T is the first parameter |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) | value to compare in the filter |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
query applied.

___

###  whereIn

▸ **whereIn**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)[]): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:253](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L253)*

Returns a new QueryBuilder with a filter specifying that the
field @param prop matches any of the comparison values in @param val

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be filtered on, where prop could be keyof T or a lambda where T is the first parameter |
`val` | [IFirestoreVal](../globals.md#ifirestoreval)[] | - |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
query applied.

___

###  whereLessOrEqualThan

▸ **whereLessOrEqualThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:208](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L208)*

Returns a new QueryBuilder with a filter specifying that the
value in @param prop must be less or equal than @param val.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be filtered on, where prop could be keyof T or a lambda where T is the first parameter |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) | value to compare in the filter |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
query applied.

___

###  whereLessThan

▸ **whereLessThan**(`prop`: [IWherePropParam](../globals.md#iwherepropparam)‹T›, `val`: [IFirestoreVal](../globals.md#ifirestoreval)): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Defined in [src/AbstractFirestoreRepository.ts:193](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L193)*

Returns a new QueryBuilder with a filter specifying that the
value in @param prop must be less than @param val.

**`memberof`** AbstractFirestoreRepository

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prop` | [IWherePropParam](../globals.md#iwherepropparam)‹T› | field to be filtered on, where prop could be keyof T or a lambda where T is the first parameter |
`val` | [IFirestoreVal](../globals.md#ifirestoreval) | value to compare in the filter |

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

A new QueryBuilder with the specified
query applied.
