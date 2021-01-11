
# Interface: ISingleBatchRepository ‹**T**›

## Type parameters

▪ **T**: *[IEntity](ientity.md)*

## Hierarchy

* [IBatchRepository](ibatchrepository.md)‹T›

  ↳ **ISingleBatchRepository**

## Index

### Methods

* [commit](isinglebatchrepository.md#commit)
* [create](isinglebatchrepository.md#create)
* [delete](isinglebatchrepository.md#delete)
* [update](isinglebatchrepository.md#update)

## Methods

###  commit

▸ **commit**(): *Promise‹unknown›*

*Defined in [src/types.ts:77](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L77)*

**Returns:** *Promise‹unknown›*

___

###  create

▸ **create**(`item`: [WithOptionalId](../globals.md#withoptionalid)‹T›): *void*

*Inherited from [IBatchRepository](ibatchrepository.md).[create](ibatchrepository.md#create)*

*Defined in [src/types.ts:71](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | [WithOptionalId](../globals.md#withoptionalid)‹T› |

**Returns:** *void*

___

###  delete

▸ **delete**(`item`: T): *void*

*Inherited from [IBatchRepository](ibatchrepository.md).[delete](ibatchrepository.md#delete)*

*Defined in [src/types.ts:73](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*

___

###  update

▸ **update**(`item`: T): *void*

*Inherited from [IBatchRepository](ibatchrepository.md).[update](ibatchrepository.md#update)*

*Defined in [src/types.ts:72](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *void*
