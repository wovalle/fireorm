# Validation

FireORM supports [class-validator](https://github.com/typestack/class-validator) validation decorators in any collection.

```typescript
import { Collection } from 'fireorm';
import { IsEmail } from 'class-validator';

@Collection()
class Band {
  @IsEmail()
  contactEmail: string;
}
```

Use this in the same way that you would your other collections and it will validate whenever a document is saved or updated. [Read more about managing data.](Manage_Data.md)

## Disabling validation

Model validation is enabled by default. It can be disabled by initializing FireORM with the `validateModels: false` option.

```typescript
initialize(firestore, {
  validateModels: false
})
```