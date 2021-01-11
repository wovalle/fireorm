
# Interface: IBaseRepository ‹**T**›

## Type parameters

▪ **T**: *[IEntity](ientity.md)*

## Hierarchy

* **IBaseRepository**

## Index

### Methods

* [create](ibaserepository.md#create)
* [delete](ibaserepository.md#delete)
* [findById](ibaserepository.md#findbyid)
* [update](ibaserepository.md#update)

## Methods

###  create

▸ **create**(`item`: [PartialBy](../globals.md#partialby)‹T, "id"›): *Promise‹T›*

*Defined in [src/types.ts:95](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [PartialBy](../globals.md#partialby)‹T, "id"› |

**Returns:** *Promise‹T›*

___

###  delete

▸ **delete**(`id`: string): *Promise‹void›*

*Defined in [src/types.ts:97](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹void›*

___

###  findById

▸ **findById**(`id`: string): *Promise‹T | null›*

*Defined in [src/types.ts:94](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹T | null›*

___

###  update

▸ **update**(`item`: [PartialWithRequiredBy](../globals.md#partialwithrequiredby)‹T, "id"›): *Promise‹[PartialWithRequiredBy](../globals.md#partialwithrequiredby)‹T, "id"››*

*Defined in [src/types.ts:96](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [PartialWithRequiredBy](../globals.md#partialwithrequiredby)‹T, "id"› |

**Returns:** *Promise‹[PartialWithRequiredBy](../globals.md#partialwithrequiredby)‹T, "id"››*
