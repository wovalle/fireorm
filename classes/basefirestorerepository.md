
# Class: BaseFirestoreRepository ‹**T**›

## Type parameters

▪ **T**: *[IEntity](../interfaces/ientity.md)*

## Hierarchy

  ↳ [AbstractFirestoreRepository](abstractfirestorerepository.md)‹T›

  ↳ **BaseFirestoreRepository**

  ↳ [BandRepository](bandrepository.md)

## Implements

* [IBaseRepository](../interfaces/ibaserepository.md)‹T, this› & [IQueryable](../interfaces/iqueryable.md)‹T, this› & [IOrderable](../interfaces/iorderable.md)‹T, this› & [ILimitable](../interfaces/ilimitable.md)‹T, this› & [IQueryExecutor](../interfaces/iqueryexecutor.md)‹T, this›
* [IBaseRepository](../interfaces/ibaserepository.md)‹T, this› & [IQueryable](../interfaces/iqueryable.md)‹T, this› & [IOrderable](../interfaces/iorderable.md)‹T, this› & [ILimitable](../interfaces/ilimitable.md)‹T, this› & [IQueryExecutor](../interfaces/iqueryexecutor.md)‹T, this›

## Index

### Constructors

* [constructor](basefirestorerepository.md#constructor)

### Properties

* [colMetadata](basefirestorerepository.md#protected-readonly-colmetadata)
* [config](basefirestorerepository.md#protected-readonly-config)
* [firestoreColRef](basefirestorerepository.md#protected-readonly-firestorecolref)
* [path](basefirestorerepository.md#protected-readonly-path)

### Methods

* [create](basefirestorerepository.md#create)
* [createBatch](basefirestorerepository.md#createbatch)
* [delete](basefirestorerepository.md#delete)
* [execute](basefirestorerepository.md#execute)
* [extractTFromColSnap](basefirestorerepository.md#protected-extracttfromcolsnap)
* [extractTFromDocSnap](basefirestorerepository.md#protected-extracttfromdocsnap)
* [find](basefirestorerepository.md#find)
* [findById](basefirestorerepository.md#findbyid)
* [findOne](basefirestorerepository.md#findone)
* [initializeSubCollections](basefirestorerepository.md#protected-initializesubcollections)
* [limit](basefirestorerepository.md#limit)
* [orderByAscending](basefirestorerepository.md#orderbyascending)
* [orderByDescending](basefirestorerepository.md#orderbydescending)
* [runTransaction](basefirestorerepository.md#runtransaction)
* [toSerializableObject](basefirestorerepository.md#protected-toserializableobject)
* [transformFirestoreTypes](basefirestorerepository.md#protected-transformfirestoretypes)
* [update](basefirestorerepository.md#update)
* [validate](basefirestorerepository.md#validate)
* [whereArrayContains](basefirestorerepository.md#wherearraycontains)
* [whereArrayContainsAny](basefirestorerepository.md#wherearraycontainsany)
* [whereEqualTo](basefirestorerepository.md#whereequalto)
* [whereGreaterOrEqualThan](basefirestorerepository.md#wheregreaterorequalthan)
* [whereGreaterThan](basefirestorerepository.md#wheregreaterthan)
* [whereIn](basefirestorerepository.md#wherein)
* [whereLessOrEqualThan](basefirestorerepository.md#wherelessorequalthan)
* [whereLessThan](basefirestorerepository.md#wherelessthan)

## Constructors

###  constructor

\+ **new BaseFirestoreRepository**(`pathOrConstructor`: string | [IEntityConstructor](../globals.md#ientityconstructor)): *[BaseFirestoreRepository](basefirestorerepository.md)*

*Inherited from [BaseFirestoreRepository](basefirestorerepository.md).[constructor](basefirestorerepository.md#constructor)*

*Defined in [src/AbstractFirestoreRepository.ts:38](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`pathOrConstructor` | string &#124; [IEntityConstructor](../globals.md#ientityconstructor) |

**Returns:** *[BaseFirestoreRepository](basefirestorerepository.md)*

## Properties

### `Protected` `Readonly` colMetadata

• **colMetadata**: *[FullCollectionMetadata](../interfaces/fullcollectionmetadata.md)*

*Inherited from [TransactionRepository](transactionrepository.md).[colMetadata](transactionrepository.md#protected-readonly-colmetadata)*

*Defined in [src/AbstractFirestoreRepository.ts:35](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L35)*

___

### `Protected` `Readonly` config

• **config**: *[MetadataStorageConfig](../interfaces/metadatastorageconfig.md)*

*Inherited from [TransactionRepository](transactionrepository.md).[config](transactionrepository.md#protected-readonly-config)*

*Defined in [src/AbstractFirestoreRepository.ts:37](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L37)*

___

### `Protected` `Readonly` firestoreColRef

• **firestoreColRef**: *CollectionReference*

*Inherited from [TransactionRepository](transactionrepository.md).[firestoreColRef](transactionrepository.md#protected-readonly-firestorecolref)*

*Defined in [src/AbstractFirestoreRepository.ts:38](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L38)*

___

### `Protected` `Readonly` path

• **path**: *string*

*Inherited from [TransactionRepository](transactionrepository.md).[path](transactionrepository.md#protected-readonly-path)*

*Defined in [src/AbstractFirestoreRepository.ts:36](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L36)*

## Methods

###  create

▸ **create**(`item`: [PartialBy](../globals.md#partialby)‹T, "id"›): *Promise‹T›*

*Overrides [AbstractFirestoreRepository](abstractfirestorerepository.md).[create](abstractfirestorerepository.md#abstract-create)*

*Defined in [src/BaseFirestoreRepository.ts:27](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/BaseFirestoreRepository.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [PartialBy](../globals.md#partialby)‹T, "id"› |

**Returns:** *Promise‹T›*

___

###  createBatch

▸ **createBatch**(): *[FirestoreBatchSingleRepository](firestorebatchsinglerepository.md)‹[IEntity](../interfaces/ientity.md)›*

*Defined in [src/BaseFirestoreRepository.ts:85](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/BaseFirestoreRepository.ts#L85)*

**Returns:** *[FirestoreBatchSingleRepository](firestorebatchsinglerepository.md)‹[IEntity](../interfaces/ientity.md)›*

___

###  delete

▸ **delete**(`id`: string): *Promise‹void›*

*Overrides [AbstractFirestoreRepository](abstractfirestorerepository.md).[delete](abstractfirestorerepository.md#abstract-delete)*

*Defined in [src/BaseFirestoreRepository.ts:70](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/BaseFirestoreRepository.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹void›*

___

###  execute

▸ **execute**(`queries`: Array‹[IFireOrmQueryLine](../interfaces/ifireormqueryline.md)›, `limitVal?`: number, `orderByObj?`: [IOrderByParams](../interfaces/iorderbyparams.md), `single?`: boolean): *Promise‹T[]›*

*Overrides [AbstractFirestoreRepository](abstractfirestorerepository.md).[execute](abstractfirestorerepository.md#abstract-execute)*

*Defined in [src/BaseFirestoreRepository.ts:90](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/BaseFirestoreRepository.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`queries` | Array‹[IFireOrmQueryLine](../interfaces/ifireormqueryline.md)› |
`limitVal?` | number |
`orderByObj?` | [IOrderByParams](../interfaces/iorderbyparams.md) |
`single?` | boolean |

**Returns:** *Promise‹T[]›*

___

### `Protected` extractTFromColSnap

▸ **extractTFromColSnap**(`q`: QuerySnapshot, `tran?`: Transaction, `tranRefStorage?`: [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage)): *T[]*

*Inherited from [TransactionRepository](transactionrepository.md).[extractTFromColSnap](transactionrepository.md#protected-extracttfromcolsnap)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[extractTFromDocSnap](transactionrepository.md#protected-extracttfromdocsnap)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[find](transactionrepository.md#find)*

*Defined in [src/AbstractFirestoreRepository.ts:310](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L310)*

Execute the query and applies all the filters (if specified)

**`memberof`** AbstractFirestoreRepository

**Returns:** *Promise‹T[]›*

List of documents that matched the filters
(if specified)

___

###  findById

▸ **findById**(`id`: string): *Promise‹T›*

*Overrides [AbstractFirestoreRepository](abstractfirestorerepository.md).[findById](abstractfirestorerepository.md#abstract-findbyid)*

*Defined in [src/BaseFirestoreRepository.ts:20](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/BaseFirestoreRepository.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹T›*

___

###  findOne

▸ **findOne**(): *Promise‹T | null›*

*Inherited from [TransactionRepository](transactionrepository.md).[findOne](transactionrepository.md#findone)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[initializeSubCollections](transactionrepository.md#protected-initializesubcollections)*

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

*Inherited from [BaseFirestoreRepository](basefirestorerepository.md).[limit](basefirestorerepository.md#limit)*

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

*Inherited from [BaseFirestoreRepository](basefirestorerepository.md).[orderByAscending](basefirestorerepository.md#orderbyascending)*

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

*Inherited from [BaseFirestoreRepository](basefirestorerepository.md).[orderByDescending](basefirestorerepository.md#orderbydescending)*

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

###  runTransaction

▸ **runTransaction**‹**R**›(`executor`: function): *Promise‹R›*

*Defined in [src/BaseFirestoreRepository.ts:75](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/BaseFirestoreRepository.ts#L75)*

**Type parameters:**

▪ **R**

**Parameters:**

▪ **executor**: *function*

▸ (`tran`: [ITransactionRepository](../globals.md#itransactionrepository)‹T›): *Promise‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`tran` | [ITransactionRepository](../globals.md#itransactionrepository)‹T› |

**Returns:** *Promise‹R›*

___

### `Protected` toSerializableObject

▸ **toSerializableObject**(`obj`: T): *Record‹string, unknown›*

*Inherited from [TransactionRepository](transactionrepository.md).[toSerializableObject](transactionrepository.md#protected-toserializableobject)*

*Defined in [src/AbstractFirestoreRepository.ts:61](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | T |

**Returns:** *Record‹string, unknown›*

___

### `Protected` transformFirestoreTypes

▸ **transformFirestoreTypes**(`obj`: Record‹string, unknown›): *object*

*Inherited from [TransactionRepository](transactionrepository.md).[transformFirestoreTypes](transactionrepository.md#protected-transformfirestoretypes)*

*Defined in [src/AbstractFirestoreRepository.ts:64](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/AbstractFirestoreRepository.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | Record‹string, unknown› |

**Returns:** *object*

___

###  update

▸ **update**(`item`: T): *Promise‹T›*

*Overrides [AbstractFirestoreRepository](abstractfirestorerepository.md).[update](abstractfirestorerepository.md#abstract-update)*

*Defined in [src/BaseFirestoreRepository.ts:56](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/BaseFirestoreRepository.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *Promise‹T›*

___

###  validate

▸ **validate**(`item`: T): *Promise‹[ValidationError](validationerror.md)[]›*

*Inherited from [TransactionRepository](transactionrepository.md).[validate](transactionrepository.md#validate)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[whereArrayContains](transactionrepository.md#wherearraycontains)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[whereArrayContainsAny](transactionrepository.md#wherearraycontainsany)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[whereEqualTo](transactionrepository.md#whereequalto)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[whereGreaterOrEqualThan](transactionrepository.md#wheregreaterorequalthan)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[whereGreaterThan](transactionrepository.md#wheregreaterthan)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[whereIn](transactionrepository.md#wherein)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[whereLessOrEqualThan](transactionrepository.md#wherelessorequalthan)*

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

*Inherited from [TransactionRepository](transactionrepository.md).[whereLessThan](transactionrepository.md#wherelessthan)*

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
