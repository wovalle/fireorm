
# Class: FirestoreTransaction

## Hierarchy

* **FirestoreTransaction**

## Implements

* [IFirestoreTransaction](../interfaces/ifirestoretransaction.md)

## Index

### Constructors

* [constructor](firestoretransaction.md#constructor)

### Properties

* [tranRefStorage](firestoretransaction.md#private-tranrefstorage)
* [transaction](firestoretransaction.md#private-transaction)

### Methods

* [getRepository](firestoretransaction.md#getrepository)

## Constructors

###  constructor

\+ **new FirestoreTransaction**(`transaction`: Transaction, `tranRefStorage`: [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage)): *[FirestoreTransaction](firestoretransaction.md)*

*Defined in [src/Transaction/FirestoreTransaction.ts:13](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/FirestoreTransaction.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | Transaction |
`tranRefStorage` | [ITransactionReferenceStorage](../globals.md#itransactionreferencestorage) |

**Returns:** *[FirestoreTransaction](firestoretransaction.md)*

## Properties

### `Private` tranRefStorage

• **tranRefStorage**: *[ITransactionReferenceStorage](../globals.md#itransactionreferencestorage)*

*Defined in [src/Transaction/FirestoreTransaction.ts:16](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/FirestoreTransaction.ts#L16)*

___

### `Private` transaction

• **transaction**: *Transaction*

*Defined in [src/Transaction/FirestoreTransaction.ts:15](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/FirestoreTransaction.ts#L15)*

## Methods

###  getRepository

▸ **getRepository**‹**T**›(`entityOrConstructor`: [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T›): *[TransactionRepository](transactionrepository.md)‹T›*

*Implementation of [IFirestoreTransaction](../interfaces/ifirestoretransaction.md)*

*Defined in [src/Transaction/FirestoreTransaction.ts:19](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/Transaction/FirestoreTransaction.ts#L19)*

**Type parameters:**

▪ **T**: *[IEntity](../interfaces/ientity.md)*

**Parameters:**

Name | Type |
------ | ------ |
`entityOrConstructor` | [EntityConstructorOrPath](../globals.md#entityconstructororpath)‹T› |

**Returns:** *[TransactionRepository](transactionrepository.md)‹T›*
