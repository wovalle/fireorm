
# Interface: IFirestoreBatch

## Hierarchy

* **IFirestoreBatch**

## Implemented by

* [FirestoreBatch](../classes/firestorebatch.md)

## Index

### Methods

* [commit](ifirestorebatch.md#commit)
* [getRepository](ifirestorebatch.md#getrepository)
* [getSingleRepository](ifirestorebatch.md#getsinglerepository)

## Methods

###  commit

▸ **commit**(): *Promise‹unknown›*

*Defined in [src/types.ts:90](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L90)*

**Returns:** *Promise‹unknown›*

___

###  getRepository

▸ **getRepository**‹**T**›(`entity`: [Constructor](../globals.md#constructor)‹T›): *[IBatchRepository](ibatchrepository.md)‹T›*

*Defined in [src/types.ts:85](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L85)*

**Type parameters:**

▪ **T**: *[IEntity](ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | [Constructor](../globals.md#constructor)‹T› |

**Returns:** *[IBatchRepository](ibatchrepository.md)‹T›*

___

###  getSingleRepository

▸ **getSingleRepository**‹**T**›(`pathOrConstructor`: [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T›): *[IFirestoreBatchSingleRepository](ifirestorebatchsinglerepository.md)‹T›*

*Defined in [src/types.ts:86](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L86)*

**Type parameters:**

▪ **T**: *[IEntity](ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`pathOrConstructor` | [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T› |

**Returns:** *[IFirestoreBatchSingleRepository](ifirestorebatchsinglerepository.md)‹T›*
