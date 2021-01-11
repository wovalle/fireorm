
# Class: MetadataStorage

## Hierarchy

* **MetadataStorage**

## Index

### Properties

* [collections](metadatastorage.md#readonly-collections)
* [firestoreRef](metadatastorage.md#firestoreref)
* [repositories](metadatastorage.md#protected-readonly-repositories)

### Methods

* [getCollection](metadatastorage.md#getcollection)
* [getRepositories](metadatastorage.md#getrepositories)
* [getRepository](metadatastorage.md#getrepository)
* [setCollection](metadatastorage.md#setcollection)
* [setRepository](metadatastorage.md#setrepository)

### Object literals

* [config](metadatastorage.md#config)

## Properties

### `Readonly` collections

• **collections**: *Array‹[CollectionMetadataWithSegments](../interfaces/collectionmetadatawithsegments.md)›* = []

*Defined in [src/MetadataStorage.ts:38](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L38)*

___

###  firestoreRef

• **firestoreRef**: *Firestore*

*Defined in [src/MetadataStorage.ts:140](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L140)*

___

### `Protected` `Readonly` repositories

• **repositories**: *Map‹[IEntityConstructor](../globals.md#ientityconstructor), [RepositoryMetadata](../interfaces/repositorymetadata.md)›* = new Map()

*Defined in [src/MetadataStorage.ts:39](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L39)*

## Methods

###  getCollection

▸ **getCollection**(`pathOrConstructor`: string | [IEntityConstructor](../globals.md#ientityconstructor)): *object*

*Defined in [src/MetadataStorage.ts:45](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`pathOrConstructor` | string &#124; [IEntityConstructor](../globals.md#ientityconstructor) |

**Returns:** *object*

* **subCollections**: *[SubCollectionMetadataWithSegments](../interfaces/subcollectionmetadatawithsegments.md)[]*

___

###  getRepositories

▸ **getRepositories**(): *Map‹object, [RepositoryMetadata](../interfaces/repositorymetadata.md)›*

*Defined in [src/MetadataStorage.ts:136](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L136)*

**Returns:** *Map‹object, [RepositoryMetadata](../interfaces/repositorymetadata.md)›*

___

###  getRepository

▸ **getRepository**(`param`: [IEntityConstructor](../globals.md#ientityconstructor)): *[RepositoryMetadata](../interfaces/repositorymetadata.md)*

*Defined in [src/MetadataStorage.ts:116](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`param` | [IEntityConstructor](../globals.md#ientityconstructor) |

**Returns:** *[RepositoryMetadata](../interfaces/repositorymetadata.md)*

___

###  setCollection

▸ **setCollection**(`col`: [CollectionMetadata](../interfaces/collectionmetadata.md)): *void*

*Defined in [src/MetadataStorage.ts:83](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`col` | [CollectionMetadata](../interfaces/collectionmetadata.md) |

**Returns:** *void*

___

###  setRepository

▸ **setRepository**(`repo`: [RepositoryMetadata](../interfaces/repositorymetadata.md)): *void*

*Defined in [src/MetadataStorage.ts:120](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`repo` | [RepositoryMetadata](../interfaces/repositorymetadata.md) |

**Returns:** *void*

## Object literals

###  config

### ▪ **config**: *object*

*Defined in [src/MetadataStorage.ts:41](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L41)*

###  validateModels

• **validateModels**: *false* = false

*Defined in [src/MetadataStorage.ts:42](https://github.com/wovalle/fireorm/blob/ad1a9c5/src/MetadataStorage.ts#L42)*
