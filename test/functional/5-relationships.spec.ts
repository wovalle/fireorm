import {
  Band,
  getInitialBandData,
  BandMember,
  getInitialBandMemberData,
} from '../fixture';
import { GetRepository, Collection, hasMany } from '../../src';
import { getUniqueColName } from '../setup';
import { expect } from 'chai';

describe.only('Integration test: Relationships', () => {
  // Collection Setup
  @Collection(getUniqueColName('relationships-members'))
  class Member extends BandMember {}

  @Collection(getUniqueColName('relationships-band'))
  class BandWithMembers extends Band {
    @hasMany(Member, { relField: 'bandId' })
    members?: Promise<Member[]>;
  }

  const bandRepository = GetRepository(BandWithMembers);
  const memberRepository = GetRepository(Member);

  before(async () => {
    const bandSeed = getInitialBandData().map(({ albums, ...band }) => band);
    const membersSeed = getInitialBandMemberData();

    await Promise.all(bandSeed.map(b => bandRepository.create(b)));
    await Promise.all(membersSeed.map(m => memberRepository.create(m)));
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
  it('should create');
  it('should update');
  it('should delete');
});
