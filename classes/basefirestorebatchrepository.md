
# Class: BaseFirestoreBatchRepository ‹**T**›

## Type parameters

▪ **T**: *[IEntity](../interfaces/ientity.md)*

## Hierarchy

* **BaseFirestoreBatchRepository**

  ↳ [FirestoreBatchSingleRepository](firestorebatchsinglerepository.md)

## Implements

* [IBatchRepository](../interfaces/ibatchrepository.md)‹T›

## Index

### Constructors

* [constructor](basefirestorebatchrepository.md#constructor)

### Properties

* [batch](basefirestorebatchrepository.md#protected-batch)
* [colMetadata](basefirestorebatchrepository.md#protected-colmetadata)
* [colRef](basefirestorebatchrepository.md#protected-colref)
* [config](basefirestorebatchrepository.md#protected-config)
* [path](basefirestorebatchrepository.md#protected-path)
* [pathOrConstructor](basefirestorebatchrepository.md#protected-pathorconstructor)

### Methods

* [create](basefirestorebatchrepository.md#create)
* [delete](basefirestorebatchrepository.md#delete)
* [update](basefirestorebatchrepository.md#update)

## Constructors

###  constructor

\+ **new BaseFirestoreBatchRepository**(`pathOrConstructor`: [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T›, `batch`: [FirestoreBatchUnit](firestorebatchunit.md)): *[BaseFirestoreBatchRepository](basefirestorebatchrepository.md)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:11](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`pathOrConstructor` | [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T› |
`batch` | [FirestoreBatchUnit](firestorebatchunit.md) |

**Returns:** *[BaseFirestoreBatchRepository](basefirestorebatchrepository.md)*

## Properties

### `Protected` batch

• **batch**: *[FirestoreBatchUnit](firestorebatchunit.md)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:15](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L15)*

___

### `Protected` colMetadata

• **colMetadata**: *[FullCollectionMetadata](../interfaces/fullcollectionmetadata.md)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:8](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L8)*

___

### `Protected` colRef

• **colRef**: *CollectionReference*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:9](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L9)*

___

### `Protected` config

• **config**: *[MetadataStorageConfig](../interfaces/metadatastorageconfig.md)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:10](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L10)*

___

### `Protected` path

• **path**: *string*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:11](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L11)*

___

### `Protected` pathOrConstructor

• **pathOrConstructor**: *[EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T›*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:14](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L14)*

## Methods

###  create

▸ **create**(`item`: [WithOptionalId](../globals.md#withoptionalid)‹T›): *void*

*Implementation of [IBatchRepository](../interfaces/ibatchrepository.md)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:31](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [WithOptionalId](../globals.md#withoptionalid)‹T› |

**Returns:** *void*

___

###  delete

▸ **delete**(`item`: T): *void*

*Implementation of [IBatchRepository](../interfaces/ibatchrepository.md)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:50](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*

___

###  update

▸ **update**(`item`: T): *void*

*Implementation of [IBatchRepository](../interfaces/ibatchrepository.md)*

*Defined in [src/Batch/BaseFirestoreBatchRepository.ts:40](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/BaseFirestoreBatchRepository.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*
