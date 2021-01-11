
# Interface: IBatchRepository ‹**T**›

## Type parameters

▪ **T**: *[IEntity](ientity.md)*

## Hierarchy

* **IBatchRepository**

  ↳ [ISingleBatchRepository](isinglebatchrepository.md)

  ↳ [IFirestoreBatchSingleRepository](ifirestorebatchsinglerepository.md)

## Implemented by

* [BaseFirestoreBatchRepository](../classes/basefirestorebatchrepository.md)
* [FirestoreBatchSingleRepository](../classes/firestorebatchsinglerepository.md)

## Index

### Methods

* [create](ibatchrepository.md#create)
* [delete](ibatchrepository.md#delete)
* [update](ibatchrepository.md#update)

## Methods

###  create

▸ **create**(`item`: [WithOptionalId](../globals.md#withoptionalid)‹T›): *void*

*Defined in [src/types.ts:71](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [WithOptionalId](../globals.md#withoptionalid)‹T› |

**Returns:** *void*

___

###  delete

▸ **delete**(`item`: T): *void*

*Defined in [src/types.ts:73](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*

___

###  update

▸ **update**(`item`: T): *void*

*Defined in [src/types.ts:72](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*
