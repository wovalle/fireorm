import {
  BaseAlbum,
  BaseLabel,
  BaseMember,
  getInitialBandData,
  getInitialBandMemberData,
  getInitialBandLabelData,
} from '../fixture';
import { GetRepository, Collection, hasMany, belongsTo } from '../../src';
import { getUniqueColName } from '../setup';
import { expect } from 'chai';

describe('Integration test: Relationships', () => {
  // Collection Setup
  @Collection(getUniqueColName('relationships-member'))
  class Member extends BaseMember {}

  @Collection(getUniqueColName('relationships-band'))
  class Band extends BaseAlbum {
    @hasMany(Member)
    members?: Promise<Member[]>;
  }

  @Collection(getUniqueColName('relationships-label'))
  class Label extends BaseLabel {
    @belongsTo(Band)
    bandId: Band;
  }

  const bandRepository = GetRepository(Band);
  const memberRepository = GetRepository(Member);
  const labelRepository = GetRepository(Label);

  before(async () => {
    const bandSeed = getInitialBandData().map(({ albums, ...band }) => band);
    const membersSeed = getInitialBandMemberData();
    const labelsSeed = getInitialBandLabelData();

    await Promise.all(bandSeed.map(b => bandRepository.create(b)));
    await Promise.all(membersSeed.map(m => memberRepository.create(m)));
    await Promise.all(labelsSeed.map(l => labelRepository.create(l)));
  });

  it('should read members from band', async () => {
    const porcupine = await bandRepository.findById('porcupine-tree');
    expect(porcupine.members).instanceOf(Promise);
    const members = await porcupine.members;
    expect(members.length).to.eql(5);

    const names = members.map(m => m.name);
    expect(names).to.eql([
      'Steven Wilson',
      'Richard Barbieri',
      'Chris Maitland',
      'Colin Edwins',
      'Gavin Harrison',
    ]);
  });

  it('should read band labels', async () => {
    const porcupine = await bandRepository.findById('porcupine-tree');
    expect(porcupine.labels).instanceOf(Promise);
    const members = await porcupine.members;
    expect(members.length).to.eql(5);

    const names = members.map(m => m.name);
    expect(names).to.eql([
      'Steven Wilson',
      'Richard Barbieri',
      'Chris Maitland',
      'Colin Edwins',
      'Gavin Harrison',
    ]);
  });
  it('should create');
  it('should update');
  it('should delete');
});
