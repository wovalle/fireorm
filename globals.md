
# fireorm🔥

## Index

### Enumerations

* [FirestoreOperators](enums/firestoreoperators.md)

### Classes

* [AbstractFirestoreRepository](classes/abstractfirestorerepository.md)
* [BandRepository](classes/bandrepository.md)
* [BaseFirestoreBatchRepository](classes/basefirestorebatchrepository.md)
* [BaseFirestoreRepository](classes/basefirestorerepository.md)
* [BaseRepository](classes/baserepository.md)
* [FakeExecutor](classes/fakeexecutor.md)
* [FirestoreBatch](classes/firestorebatch.md)
* [FirestoreBatchSingleRepository](classes/firestorebatchsinglerepository.md)
* [FirestoreBatchUnit](classes/firestorebatchunit.md)
* [FirestoreTransaction](classes/firestoretransaction.md)
* [MetadataStorage](classes/metadatastorage.md)
* [NoMetadataError](classes/nometadataerror.md)
* [QueryBuilder](classes/querybuilder.md)
* [Test](classes/test.md)
* [TransactionRepository](classes/transactionrepository.md)
* [ValidationError](classes/validationerror.md)

### Interfaces

* [CollectionMetadata](interfaces/collectionmetadata.md)
* [CollectionMetadataWithSegments](interfaces/collectionmetadatawithsegments.md)
* [FullCollectionMetadata](interfaces/fullcollectionmetadata.md)
* [IBaseRepository](interfaces/ibaserepository.md)
* [IBatchRepository](interfaces/ibatchrepository.md)
* [IEntity](interfaces/ientity.md)
* [IFireOrmQueryLine](interfaces/ifireormqueryline.md)
* [IFirestoreBatch](interfaces/ifirestorebatch.md)
* [IFirestoreBatchSingleRepository](interfaces/ifirestorebatchsinglerepository.md)
* [IFirestoreTransaction](interfaces/ifirestoretransaction.md)
* [ILimitable](interfaces/ilimitable.md)
* [IMetadataStore](interfaces/imetadatastore.md)
* [IOrderByParams](interfaces/iorderbyparams.md)
* [IOrderable](interfaces/iorderable.md)
* [IQueryExecutor](interfaces/iqueryexecutor.md)
* [IQueryable](interfaces/iqueryable.md)
* [ISingleBatchRepository](interfaces/isinglebatchrepository.md)
* [ITransactionReference](interfaces/itransactionreference.md)
* [MetadataStorageConfig](interfaces/metadatastorageconfig.md)
* [RepositoryMetadata](interfaces/repositorymetadata.md)
* [SubCollectionMetadata](interfaces/subcollectionmetadata.md)
* [SubCollectionMetadataWithSegments](interfaces/subcollectionmetadatawithsegments.md)

### Type aliases

* [BatchOperation](globals.md#batchoperation)
* [Constructor](globals.md#constructor)
* [EntityConstructorOrPath](globals.md#entityconstructororpath)
* [EntityConstructorOrPathConstructor](globals.md#entityconstructororpathconstructor)
* [IEntityConstructor](globals.md#ientityconstructor)
* [IEntityRepositoryConstructor](globals.md#ientityrepositoryconstructor)
* [IFirestoreVal](globals.md#ifirestoreval)
* [IQueryBuilder](globals.md#iquerybuilder)
* [IQueryBuilderResult](globals.md#iquerybuilderresult)
* [IRepository](globals.md#irepository)
* [ISubCollection](globals.md#isubcollection)
* [ITransactionReferenceStorage](globals.md#itransactionreferencestorage)
* [ITransactionRepository](globals.md#itransactionrepository)
* [IWherePropParam](globals.md#iwherepropparam)
* [PartialBy](globals.md#partialby)
* [PartialWithRequiredBy](globals.md#partialwithrequiredby)
* [RepositoryType](globals.md#repositorytype)
* [TestTransactionRepository](globals.md#testtransactionrepository)
* [WithOptionalId](globals.md#withoptionalid)

### Variables

* [GetBaseRepository](globals.md#const-getbaserepository)
* [GetCustomRepository](globals.md#const-getcustomrepository)
* [GetRepository](globals.md#const-getrepository)
* [Initialize](globals.md#const-initialize)
* [MockFirebase](globals.md#const-mockfirebase)
* [metadataStorage](globals.md#const-metadatastorage)
* [setCollection](globals.md#const-setcollection)
* [setRepository](globals.md#const-setrepository)

### Functions

* [Collection](globals.md#collection)
* [CustomRepository](globals.md#customrepository)
* [SubCollection](globals.md#subcollection)
* [_getRepository](globals.md#_getrepository)
* [arraysAreEqual](globals.md#arraysareequal)
* [createBatch](globals.md#const-createbatch)
* [extractAllGetters](globals.md#extractallgetters)
* [getBaseRepository](globals.md#getbaserepository)
* [getCustomRepository](globals.md#getcustomrepository)
* [getMetadataStorage](globals.md#const-getmetadatastorage)
* [getRepository](globals.md#getrepository)
* [getStore](globals.md#getstore)
* [initialize](globals.md#const-initialize)
* [initializeMetadataStorage](globals.md#initializemetadatastorage)
* [isDocumentReference](globals.md#isdocumentreference)
* [isGeoPoint](globals.md#isgeopoint)
* [isObject](globals.md#isobject)
* [isTimestamp](globals.md#istimestamp)
* [runTransaction](globals.md#const-runtransaction)
* [serializeEntity](globals.md#serializeentity)

## Type aliases

###  BatchOperation

Ƭ **BatchOperation**: *object*

*Defined in [src/Batch/FirestoreBatchUnit.ts:7](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchUnit.ts#L7)*

#### Type declaration:

* **collectionMetadata**: *[FullCollectionMetadata](interfaces/fullcollectionmetadata.md)*

* **item**: *[IEntity](interfaces/ientity.md)*

* **ref**: *DocumentReference*

* **type**: *"create" | "update" | "delete"*

* **validateModels**: *boolean*

___

###  Constructor

Ƭ **Constructor**: *object*

*Defined in [src/types.ts:124](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L124)*

#### Type declaration:

* **new __type**(): *T*

___

###  EntityConstructorOrPath

Ƭ **EntityConstructorOrPath**: *[Constructor](globals.md#constructor)‹T› | string*

*Defined in [src/types.ts:128](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L128)*

___

###  EntityConstructorOrPathConstructor

Ƭ **EntityConstructorOrPathConstructor**: *object*

*Defined in [src/types.ts:125](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L125)*

#### Type declaration:

* **new __type**(): *T*

___

###  IEntityConstructor

Ƭ **IEntityConstructor**: *[Constructor](globals.md#constructor)‹[IEntity](interfaces/ientity.md)›*

*Defined in [src/types.ts:126](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L126)*

___

###  IEntityRepositoryConstructor

Ƭ **IEntityRepositoryConstructor**: *[Constructor](globals.md#constructor)‹[IRepository](globals.md#irepository)‹[IEntity](interfaces/ientity.md)››*

*Defined in [src/types.ts:127](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L127)*

___

###  IFirestoreVal

Ƭ **IFirestoreVal**: *string | number | Date | boolean | DocumentReference*

*Defined in [src/types.ts:9](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L9)*

___

###  IQueryBuilder

Ƭ **IQueryBuilder**: *[IQueryable](interfaces/iqueryable.md)‹T› & [IOrderable](interfaces/iorderable.md)‹T› & [ILimitable](interfaces/ilimitable.md)‹T›*

*Defined in [src/types.ts:59](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L59)*

___

###  IQueryBuilderResult

Ƭ **IQueryBuilderResult**: *[IFireOrmQueryLine](interfaces/ifireormqueryline.md)[]*

*Defined in [src/types.ts:33](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L33)*

___

###  IRepository

Ƭ **IRepository**: *[IBaseRepository](interfaces/ibaserepository.md)‹T› & [IQueryBuilder](globals.md#iquerybuilder)‹T› & [IQueryExecutor](interfaces/iqueryexecutor.md)‹T›*

*Defined in [src/types.ts:100](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L100)*

___

###  ISubCollection

Ƭ **ISubCollection**: *[IRepository](globals.md#irepository)‹T› & object*

*Defined in [src/types.ts:115](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L115)*

___

###  ITransactionReferenceStorage

Ƭ **ITransactionReferenceStorage**: *Set‹[ITransactionReference](interfaces/itransactionreference.md)›*

*Defined in [src/types.ts:112](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L112)*

___

###  ITransactionRepository

Ƭ **ITransactionRepository**: *[IRepository](globals.md#irepository)‹T›*

*Defined in [src/types.ts:104](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L104)*

___

###  IWherePropParam

Ƭ **IWherePropParam**: *keyof T | function*

*Defined in [src/types.ts:35](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L35)*

___

###  PartialBy

Ƭ **PartialBy**: *Omit‹T, K› & Partial‹Pick‹T, K››*

*Defined in [src/types.ts:3](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L3)*

___

###  PartialWithRequiredBy

Ƭ **PartialWithRequiredBy**: *Pick‹T, K› & Partial‹Omit‹T, K››*

*Defined in [src/types.ts:4](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L4)*

___

###  RepositoryType

Ƭ **RepositoryType**: *"default" | "base" | "custom" | "transaction"*

*Defined in [src/helpers.ts:7](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L7)*

___

###  TestTransactionRepository

Ƭ **TestTransactionRepository**: *Pick‹[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›, "runTransaction"›*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.spec.ts:13](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.spec.ts#L13)*

___

###  WithOptionalId

Ƭ **WithOptionalId**: *Pick‹T, Exclude‹keyof T, "id"›› & Partial‹Pick‹T, "id"››*

*Defined in [src/types.ts:6](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L6)*

## Variables

### `Const` GetBaseRepository

• **GetBaseRepository**: *[getBaseRepository](globals.md#getbaserepository)* = getBaseRepository

*Defined in [src/helpers.ts:86](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L86)*

**`deprecated`** Use getBaseRepository. This will be removed in a future version.

___

### `Const` GetCustomRepository

• **GetCustomRepository**: *[getCustomRepository](globals.md#getcustomrepository)* = getCustomRepository

*Defined in [src/helpers.ts:77](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L77)*

**`deprecated`** Use getCustomRepository. This will be removed in a future version.

___

### `Const` GetRepository

• **GetRepository**: *[getRepository](globals.md#getrepository)* = getRepository

*Defined in [src/helpers.ts:68](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L68)*

**`deprecated`** Use getRepository. This will be removed in a future version.

___

### `Const` Initialize

• **Initialize**: *initialize* = initialize

*Defined in [src/MetadataUtils.ts:45](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataUtils.ts#L45)*

**`deprecated`** Use initialize. This will be removed in a future version.

___

### `Const` MockFirebase

• **MockFirebase**: *any* = require('mock-cloud-firestore')

*Defined in [src/BaseFirestoreRepository.spec.ts:15](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/BaseFirestoreRepository.spec.ts#L15)*

*Defined in [src/helpers.spec.ts:9](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.spec.ts#L9)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.spec.ts:11](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.spec.ts#L11)*

*Defined in [src/Batch/FirestoreBatch.spec.ts:8](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatch.spec.ts#L8)*

*Defined in [src/Transaction/BaseFirestoreTransactionRepository.spec.ts:9](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/BaseFirestoreTransactionRepository.spec.ts#L9)*

*Defined in [src/Transaction/FirestoreTransaction.spec.ts:8](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/FirestoreTransaction.spec.ts#L8)*

___

### `Const` metadataStorage

• **metadataStorage**: *[MetadataStorage](classes/metadatastorage.md)‹›* = getMetadataStorage()

*Defined in [src/Transaction/FirestoreTransaction.ts:11](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/FirestoreTransaction.ts#L11)*

___

### `Const` setCollection

• **setCollection**: *Mock‹any, any›* = jest.fn()

*Defined in [src/Decorators/Collection.spec.ts:3](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Decorators/Collection.spec.ts#L3)*

*Defined in [src/Decorators/SubCollection.spec.ts:5](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Decorators/SubCollection.spec.ts#L5)*

___

### `Const` setRepository

• **setRepository**: *Mock‹any, any›* = jest.fn()

*Defined in [src/Decorators/CustomRepository.spec.ts:4](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Decorators/CustomRepository.spec.ts#L4)*

## Functions

###  Collection

▸ **Collection**(`entityName?`: string): *(Anonymous function)*

*Defined in [src/Decorators/Collection.ts:5](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Decorators/Collection.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`entityName?` | string |

**Returns:** *(Anonymous function)*

___

###  CustomRepository

▸ **CustomRepository**‹**T**›(`entity`: [Constructor](globals.md#constructor)‹T›): *(Anonymous function)*

*Defined in [src/Decorators/CustomRepository.ts:10](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Decorators/CustomRepository.ts#L10)*

**Type parameters:**

▪ **T**: *[IEntity](interfaces/ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | [Constructor](globals.md#constructor)‹T› |

**Returns:** *(Anonymous function)*

___

###  SubCollection

▸ **SubCollection**(`entityConstructor`: [IEntityConstructor](globals.md#ientityconstructor), `entityName?`: string): *(Anonymous function)*

*Defined in [src/Decorators/SubCollection.ts:5](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Decorators/SubCollection.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`entityConstructor` | [IEntityConstructor](globals.md#ientityconstructor) |
`entityName?` | string |

**Returns:** *(Anonymous function)*

___

###  _getRepository

▸ **_getRepository**‹**T**›(`entityConstructorOrPath`: [EntityConstructorOrPath](globals.md#entityconstructororpath)‹T›, `repositoryType`: [RepositoryType](globals.md#repositorytype)): *[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›*

*Defined in [src/helpers.ts:10](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L10)*

**Type parameters:**

▪ **T**: *[IEntity](interfaces/ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`entityConstructorOrPath` | [EntityConstructorOrPath](globals.md#entityconstructororpath)‹T› |
`repositoryType` | [RepositoryType](globals.md#repositorytype) |

**Returns:** *[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›*

___

###  arraysAreEqual

▸ **arraysAreEqual**(`arr1`: unknown[], `arr2`: unknown[]): *boolean*

*Defined in [src/utils.ts:67](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/utils.ts#L67)*

Returns true if arrays are equal

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`arr1` | unknown[] |
`arr2` | unknown[] |

**Returns:** *boolean*

___

### `Const` createBatch

▸ **createBatch**(): *[FirestoreBatch](classes/firestorebatch.md)‹›*

*Defined in [src/helpers.ts:108](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L108)*

**Returns:** *[FirestoreBatch](classes/firestorebatch.md)‹›*

___

###  extractAllGetters

▸ **extractAllGetters**(`obj`: Record‹string, unknown›): *object*

*Defined in [src/utils.ts:9](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/utils.ts#L9)*

Extract getters and object in form of data properties

**Parameters:**

Name | Type |
------ | ------ |
`obj` | Record‹string, unknown› |

**Returns:** *object*

with only data properties

___

###  getBaseRepository

▸ **getBaseRepository**‹**T**›(`entityOrPath`: [EntityConstructorOrPath](globals.md#entityconstructororpath)‹T›): *[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›*

*Defined in [src/helpers.ts:79](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L79)*

**Type parameters:**

▪ **T**: *[IEntity](interfaces/ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`entityOrPath` | [EntityConstructorOrPath](globals.md#entityconstructororpath)‹T› |

**Returns:** *[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›*

___

###  getCustomRepository

▸ **getCustomRepository**‹**T**›(`entityOrPath`: [EntityConstructorOrPath](globals.md#entityconstructororpath)‹T›): *[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›*

*Defined in [src/helpers.ts:70](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L70)*

**Type parameters:**

▪ **T**: *[IEntity](interfaces/ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`entityOrPath` | [EntityConstructorOrPath](globals.md#entityconstructororpath)‹T› |

**Returns:** *[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›*

___

### `Const` getMetadataStorage

▸ **getMetadataStorage**(): *[MetadataStorage](classes/metadatastorage.md)*

*Defined in [src/MetadataUtils.ts:23](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataUtils.ts#L23)*

Return exisiting metadataStorage, otherwise create if not present

**Returns:** *[MetadataStorage](classes/metadatastorage.md)*

___

###  getRepository

▸ **getRepository**‹**T**›(`entityConstructorOrPath`: [EntityConstructorOrPath](globals.md#entityconstructororpath)‹T›): *[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›*

*Defined in [src/helpers.ts:59](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L59)*

**Type parameters:**

▪ **T**: *[IEntity](interfaces/ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`entityConstructorOrPath` | [EntityConstructorOrPath](globals.md#entityconstructororpath)‹T› |

**Returns:** *[BaseFirestoreRepository](classes/basefirestorerepository.md)‹T›*

___

###  getStore

▸ **getStore**(): *[IMetadataStore](interfaces/imetadatastore.md)*

*Defined in [src/MetadataUtils.ts:8](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataUtils.ts#L8)*

**Returns:** *[IMetadataStore](interfaces/imetadatastore.md)*

___

### `Const` initialize

▸ **initialize**(`firestore`: Firestore, `config`: [MetadataStorageConfig](interfaces/metadatastorageconfig.md)): *void*

*Defined in [src/MetadataUtils.ts:30](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataUtils.ts#L30)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`firestore` | Firestore | - |
`config` | [MetadataStorageConfig](interfaces/metadatastorageconfig.md) | { validateModels: false } |

**Returns:** *void*

___

###  initializeMetadataStorage

▸ **initializeMetadataStorage**(): *void*

*Defined in [src/MetadataUtils.ts:12](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataUtils.ts#L12)*

**Returns:** *void*

___

###  isDocumentReference

▸ **isDocumentReference**(`x`: unknown): *x is DocumentReference*

*Defined in [src/TypeGuards.ts:11](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/TypeGuards.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | unknown |

**Returns:** *x is DocumentReference*

___

###  isGeoPoint

▸ **isGeoPoint**(`x`: unknown): *x is GeoPoint*

*Defined in [src/TypeGuards.ts:7](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/TypeGuards.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | unknown |

**Returns:** *x is GeoPoint*

___

###  isObject

▸ **isObject**(`x`: unknown): *x is Record<string, unknown>*

*Defined in [src/TypeGuards.ts:15](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/TypeGuards.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | unknown |

**Returns:** *x is Record<string, unknown>*

___

###  isTimestamp

▸ **isTimestamp**(`x`: unknown): *x is Timestamp*

*Defined in [src/TypeGuards.ts:3](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/TypeGuards.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | unknown |

**Returns:** *x is Timestamp*

___

### `Const` runTransaction

▸ **runTransaction**‹**T**›(`executor`: function): *Promise‹T›*

*Defined in [src/helpers.ts:88](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/helpers.ts#L88)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **executor**: *function*

▸ (`tran`: [FirestoreTransaction](classes/firestoretransaction.md)): *Promise‹T›*

**Parameters:**

Name | Type |
------ | ------ |
`tran` | [FirestoreTransaction](classes/firestoretransaction.md) |

**Returns:** *Promise‹T›*

___

###  serializeEntity

▸ **serializeEntity**‹**T**›(`obj`: Partial‹T›, `subColMetadata`: [SubCollectionMetadata](interfaces/subcollectionmetadata.md)[]): *Record‹string, unknown›*

*Defined in [src/utils.ts:45](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/utils.ts#L45)*

Returns a serializable object from entity<T>

**Type parameters:**

▪ **T**: *[IEntity](interfaces/ientity.md)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | Partial‹T› | - |
`subColMetadata` | [SubCollectionMetadata](interfaces/subcollectionmetadata.md)[] | Subcollection metadata to remove runtime-created fields |

**Returns:** *Record‹string, unknown›*

Serialiable object
