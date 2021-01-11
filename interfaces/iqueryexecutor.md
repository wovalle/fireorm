
# Interface: IQueryExecutor ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **IQueryExecutor**

## Implemented by

* [FakeExecutor](../classes/fakeexecutor.md)

## Index

### Methods

* [execute](iqueryexecutor.md#execute)

## Methods

###  execute

▸ **execute**(`queries`: [IFireOrmQueryLine](ifireormqueryline.md)[], `limitVal?`: number, `orderByObj?`: [IOrderByParams](iorderbyparams.md), `single?`: boolean): *Promise‹T[]›*

*Defined in [src/types.ts:62](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/types.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`queries` | [IFireOrmQueryLine](ifireormqueryline.md)[] |
`limitVal?` | number |
`orderByObj?` | [IOrderByParams](iorderbyparams.md) |
`single?` | boolean |

**Returns:** *Promise‹T[]›*
