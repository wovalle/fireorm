
# Class: TransactionRepository ‹**T**›

## Type parameters

▪ **T**: *[IEntity](../interfaces/ientity.md)*

## Hierarchy

  ↳ [AbstractFirestoreRepository](abstractfirestorerepository.md)‹T›

  ↳ **TransactionRepository**

## Implements

* [IBaseRepository](../interfaces/ibaserepository.md)‹T, this› & [IQueryable](../interfaces/iqueryable.md)‹T, this› & [IOrderable](../interfaces/iorderable.md)‹T, this› & [ILimitable](../interfaces/ilimitable.md)‹T, this› & [IQueryExecutor](../interfaces/iqueryexecutor.md)‹T, this›
* [IBaseRepository](../interfaces/ibaserepository.md)‹T, this› & [IQueryable](../interfaces/iqueryable.md)‹T, this› & [IOrderable](../interfaces/iorderable.md)‹T, this› & [ILimitable](../interfaces/ilimitable.md)‹T, this› & [IQueryExecutor](../interfaces/iqueryexecutor.md)‹T, this›

## Index

### Constructors

* [constructor](transactionrepository.md#constructor)

### Properties

* [colMetadata](transactionrepository.md#protected-readonly-colmetadata)
* [config](transactionrepository.md#protected-readonly-config)
* [firestoreColRef](transactionrepository.md#protected-readonly-firestorecolref)
* [path](transactionrepository.md#protected-readonly-path)
* [tranRefStorage](transactionrepository.md#private-tranrefstorage)
* [transaction](transactionrepository.md#private-transaction)

### Methods

* [create](transactionrepository.md#create)
* [delete](transactionrepository.md#delete)
* [execute](transactionrepository.md#execute)
* [extractTFromColSnap](transactionrepository.md#protected-extracttfromcolsnap)
* [extractTFromDocSnap](transactionrepository.md#protected-extracttfromdocsnap)
* [find](transactionrepository.md#find)
* [findById](transactionrepository.md#findbyid)
* [findOne](transactionrepository.md#findone)
* [initializeSubCollections](transactionrepository.md#protected-initializesubcollections)
* [limit](transactionrepository.md#limit)
* [orderByAscending](transactionrepository.md#orderbyascending)
* [orderByDescending](transactionrepository.md#orderbydescending)
* [toSerializableObject](transactionrepository.md#protected-toserializableobject)
* [transformFirestoreTypes](transactionrepository.md#protected-transformfirestoretypes)
* [update](transactionrepository.md#update)
* [validate](transactionrepository.md#validate)
* [whereArrayContains](transactionrepository.md#wherearraycontains)
* [whereArrayContainsAny](transactionrepository.md#wherearraycontainsany)
* [whereEqualTo](transactionrepository.md#whereequalto)
* [whereGreaterOrEqualThan](transactionrepository.md#wheregreaterorequalthan)
* [whereGreaterThan](transactionrepository.md#wheregreaterthan)
* [whereIn](transactionrepository.md#wherein)
* [whereLessOrEqualThan](transactionrepository.md#wherelessorequalthan)
* [whereLessThan](transactionrepository.md#wherelessthan)

## Constructors

###  constructor

\+ **new TransactionRepository**(`pathOrConstructor`: [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T›, `transaction`: Transaction, `tranRefStorage`: [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage)): *[TransactionRepository](transactionrepository.md)*

*Overrides [BaseFirestoreRepository](basefirestorerepository.md).[constructor](basefirestorerepository.md#constructor)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:15](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`pathOrConstructor` | [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T› |
`transaction` | Transaction |
`tranRefStorage` | [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage) |

**Returns:** *[TransactionRepository](transactionrepository.md)*

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

___

### `Private` tranRefStorage

• **tranRefStorage**: *[ITransactionReferenceStorage](../globals.md#itransactionreferencestorage)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:19](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L19)*

___

### `Private` transaction

• **transaction**: *Transaction*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:18](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L18)*

## Methods

###  create

▸ **create**(`item`: [WithOptionalId](../globals.md#withoptionalid)‹T›): *Promise‹T›*

*Overrides [AbstractFirestoreRepository](abstractfirestorerepository.md).[create](abstractfirestorerepository.md#abstract-create)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:47](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [WithOptionalId](../globals.md#withoptionalid)‹T› |

**Returns:** *Promise‹T›*

___

###  delete

▸ **delete**(`id`: string): *Promise‹void›*

*Overrides [AbstractFirestoreRepository](abstractfirestorerepository.md).[delete](abstractfirestorerepository.md#abstract-delete)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:83](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹void›*

___

###  execute

▸ **execute**(`queries`: [IFireOrmQueryLine](../interfaces/ifireormqueryline.md)[]): *Promise‹T[]›*

*Overrides [AbstractFirestoreRepository](abstractfirestorerepository.md).[execute](abstractfirestorerepository.md#abstract-execute)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:26](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`queries` | [IFireOrmQueryLine](../interfaces/ifireormqueryline.md)[] |

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

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:37](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L37)*

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

▸ **limit**(): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Overrides [BaseFirestoreRepository](basefirestorerepository.md).[limit](basefirestorerepository.md#limit)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:87](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L87)*

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  orderByAscending

▸ **orderByAscending**(): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Overrides [BaseFirestoreRepository](basefirestorerepository.md).[orderByAscending](basefirestorerepository.md#orderbyascending)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:91](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L91)*

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

___

###  orderByDescending

▸ **orderByDescending**(): *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

*Overrides [BaseFirestoreRepository](basefirestorerepository.md).[orderByDescending](basefirestorerepository.md#orderbydescending)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:95](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L95)*

**Returns:** *[IQueryBuilder](../globals.md#iquerybuilder)‹T›*

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

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.ts:68](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.ts#L68)*

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
