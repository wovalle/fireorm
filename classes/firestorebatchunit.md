
# Class: FirestoreBatchUnit

## Hierarchy

* **FirestoreBatchUnit**

## Index

### Constructors

* [constructor](firestorebatchunit.md#constructor)

### Properties

* [firestoreRef](firestorebatchunit.md#private-firestoreref)
* [operations](firestorebatchunit.md#operations)
* [status](firestorebatchunit.md#private-status)

### Methods

* [add](firestorebatchunit.md#add)
* [commit](firestorebatchunit.md#commit)
* [validate](firestorebatchunit.md#validate)

## Constructors

###  constructor

\+ **new FirestoreBatchUnit**(`firestoreRef`: Firestore): *[FirestoreBatchUnit](firestorebatchunit.md)*

*Defined in [src/Batch/FirestoreBatchUnit.ts:17](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchUnit.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`firestoreRef` | Firestore |

**Returns:** *[FirestoreBatchUnit](firestorebatchunit.md)*

## Properties

### `Private` firestoreRef

• **firestoreRef**: *Firestore*

*Defined in [src/Batch/FirestoreBatchUnit.ts:19](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchUnit.ts#L19)*

___

###  operations

• **operations**: *[BatchOperation](../globals.md#batchoperation)‹[IEntity](../interfaces/ientity.md)›[]* = []

*Defined in [src/Batch/FirestoreBatchUnit.ts:17](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchUnit.ts#L17)*

___

### `Private` status

• **status**: *"pending" | "committing"* = "pending"

*Defined in [src/Batch/FirestoreBatchUnit.ts:16](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchUnit.ts#L16)*

## Methods

###  add

▸ **add**‹**T**›(`type`: BatchOperation<T>["type"], `item`: T, `ref`: DocumentReference, `collectionMetadata`: [FullCollectionMetadata](../interfaces/fullcollectionmetadata.md), `validateModels`: boolean): *void*

*Defined in [src/Batch/FirestoreBatchUnit.ts:21](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchUnit.ts#L21)*

**Type parameters:**

▪ **T**: *[IEntity](../interfaces/ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | BatchOperation<T>["type"] |
`item` | T |
`ref` | DocumentReference |
`collectionMetadata` | [FullCollectionMetadata](../interfaces/fullcollectionmetadata.md) |
`validateModels` | boolean |

**Returns:** *void*

___

###  commit

▸ **commit**(): *Promise‹WriteResult‹›[]›*

*Defined in [src/Batch/FirestoreBatchUnit.ts:37](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchUnit.ts#L37)*

**Returns:** *Promise‹WriteResult‹›[]›*

___

###  validate

▸ **validate**(`item`: [IEntity](../interfaces/ientity.md), `Entity`: [Constructor](../globals.md#constructor)‹[IEntity](../interfaces/ientity.md)›): *Promise‹[ValidationError](validationerror.md)[]›*

*Defined in [src/Batch/FirestoreBatchUnit.ts:80](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Batch/FirestoreBatchUnit.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [IEntity](../interfaces/ientity.md) |
`Entity` | [Constructor](../globals.md#constructor)‹[IEntity](../interfaces/ientity.md)› |

**Returns:** *Promise‹[ValidationError](validationerror.md)[]›*
