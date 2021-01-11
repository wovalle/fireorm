
# Class: FirestoreBatchSingleRepository ‹**T**›

This class is only needed to maintain current batch functionality
inside repositories and might be deleted in the next major version

**`export`** 

## Type parameters

▪ **T**: *[IEntity](../interfaces/ientity.md)*

## Hierarchy

* [BaseFirestoreBatchRepository](basefirestorebatchrepository.md)‹T›

  ↳ **FirestoreBatchSingleRepository**

## Implements

* [IBatchRepository](../interfaces/ibatchrepository.md)‹T›
* [IFirestoreBatchSingleRepository](../interfaces/ifirestorebatchsinglerepository.md)‹T›

## Index

### Constructors

* [constructor](firestorebatchsinglerepository.md#constructor)

### Properties

* [batch](firestorebatchsinglerepository.md#protected-batch)
* [colMetadata](firestorebatchsinglerepository.md#protected-colmetadata)
* [colRef](firestorebatchsinglerepository.md#protected-colref)
* [config](firestorebatchsinglerepository.md#protected-config)
* [path](firestorebatchsinglerepository.md#protected-path)
* [pathOrConstructor](firestorebatchsinglerepository.md#protected-pathorconstructor)

### Methods

* [commit](firestorebatchsinglerepository.md#commit)
* [create](firestorebatchsinglerepository.md#create)
* [delete](firestorebatchsinglerepository.md#delete)
* [update](firestorebatchsinglerepository.md#update)

## Constructors

###  constructor

\+ **new FirestoreBatchSingleRepository**(`pathOrConstructor`: [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T›, `batch`: [FirestoreBatchUnit](firestorebatchunit.md)): *[FirestoreBatchSingleRepository](firestorebatchsinglerepository.md)*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[constructor](basefirestorebatchrepository.md#constructor)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:11](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`pathOrConstructor` | [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T› |
`batch` | [FirestoreBatchUnit](firestorebatchunit.md) |

**Returns:** *[FirestoreBatchSingleRepository](firestorebatchsinglerepository.md)*

## Properties

### `Protected` batch

• **batch**: *[FirestoreBatchUnit](firestorebatchunit.md)*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[batch](basefirestorebatchrepository.md#protected-batch)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:15](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L15)*

___

### `Protected` colMetadata

• **colMetadata**: *[FullCollectionMetadata](../interfaces/fullcollectionmetadata.md)*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[colMetadata](basefirestorebatchrepository.md#protected-colmetadata)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:8](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L8)*

___

### `Protected` colRef

• **colRef**: *CollectionReference*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[colRef](basefirestorebatchrepository.md#protected-colref)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:9](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L9)*

___

### `Protected` config

• **config**: *[MetadataStorageConfig](../interfaces/metadatastorageconfig.md)*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[config](basefirestorebatchrepository.md#protected-config)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:10](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L10)*

___

### `Protected` path

• **path**: *string*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[path](basefirestorebatchrepository.md#protected-path)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:11](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L11)*

___

### `Protected` pathOrConstructor

• **pathOrConstructor**: *[EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T›*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[pathOrConstructor](basefirestorebatchrepository.md#protected-pathorconstructor)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:14](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L14)*

## Methods

###  commit

▸ **commit**(): *Promise‹void›*

*Implementation of [IFirestoreBatchSingleRepository](../interfaces/ifirestorebatchsinglerepository.md)*

*Defined in [src/Batch/FirestoreBatchSingleRepository.ts:17](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchSingleRepository.ts#L17)*

**Returns:** *Promise‹void›*

___

###  create

▸ **create**(`item`: [WithOptionalId](../globals.md#withoptionalid)‹T›): *void*

*Implementation of [IFirestoreBatchSingleRepository](../interfaces/ifirestorebatchsinglerepository.md)*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[create](basefirestorebatchrepository.md#create)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:31](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [WithOptionalId](../globals.md#withoptionalid)‹T› |

**Returns:** *void*

___

###  delete

▸ **delete**(`item`: T): *void*

*Implementation of [IFirestoreBatchSingleRepository](../interfaces/ifirestorebatchsinglerepository.md)*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[delete](basefirestorebatchrepository.md#delete)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:50](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*

___

###  update

▸ **update**(`item`: T): *void*

*Implementation of [IFirestoreBatchSingleRepository](../interfaces/ifirestorebatchsinglerepository.md)*

*Inherited from [BaseFirestoreBatchRepository](basefirestorebatchrepository.md).[update](basefirestorebatchrepository.md#update)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:40](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*
