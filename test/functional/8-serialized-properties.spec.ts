import { Collection, getRepository } from '../../src';
import { Serialize } from '../../src/Decorators/Serialize';
import { Band as BandEntity } from '../fixture';
import { getUniqueColName } from '../setup';

describe('Integration test: Serialized properties', () => {
  class Website {
    url: string;
  }

  class Manager {
    name: string;
    @Serialize(Website)
    website: Website;
  }

  @Collection(getUniqueColName('band-serialized-repository'))
  class Band extends BandEntity {
    @Serialize(Website)
    website: Website;
  }

  @Collection(getUniqueColName('band-serialized-repository'))
  class DeepBand extends BandEntity {
    @Serialize(Manager)
    manager: Manager;
  }

  @Collection(getUniqueColName('band-serialized-repository'))
  class FancyBand extends BandEntity {
    @Serialize(Website)
    websites: Website[];
  }

  test('should instantiate serialized objects with the correct class upon retrieval', async () => {
    const bandRepository = getRepository(Band);
    const dt = new Band();
    dt.name = 'DreamTheater';
    dt.formationYear = 1985;
    dt.genres = ['progressive-metal', 'progressive-rock'];
    dt.website = new Website();
    dt.website.url = 'www.dreamtheater.net';

    await bandRepository.create(dt);

    const retrievedBand = await bandRepository.findById(dt.id);

    expect(retrievedBand.website).toBeInstanceOf(Website);
    expect(retrievedBand.website.url).toEqual('www.dreamtheater.net');
  });

  test('should instantiate serialized objects with the correct class upon retrieval recursively', async () => {
    const bandRepository = getRepository(DeepBand);
    const sb = new DeepBand();
    sb.name = 'the Speckled Band';
    sb.formationYear = 1931;
    sb.genres = ['justice', 'karma'];
    sb.manager = new Manager();
    sb.manager.name = 'Mycroft Holmes';
    sb.manager.website = new Website();
    sb.manager.website.url = 'en.wikipedia.org/wiki/Mycroft_Holmes';

    await bandRepository.create(sb);

    const retrievedBand = await bandRepository.findById(sb.id);

    expect(retrievedBand.manager).toBeInstanceOf(Manager);
    expect(retrievedBand.manager.name).toEqual('Mycroft Holmes');
    expect(retrievedBand.manager.website).toBeInstanceOf(Website);
    expect(retrievedBand.manager.website.url).toEqual('en.wikipedia.org/wiki/Mycroft_Holmes');
  });

  test('should instantiate serialized objects arrays with the correct class upon retrieval', async () => {
    const bandRepository = getRepository(FancyBand);
    const dt = new FancyBand();
    dt.name = 'DreamTheater';
    dt.formationYear = 1985;
    dt.genres = ['progressive-metal', 'progressive-rock'];
    dt.websites = [new Website(), new Website()];
    dt.websites[0].url = 'http://www.dreamtheater.net';
    dt.websites[1].url = 'https://www.dreamtheater.net';

    await bandRepository.create(dt);

    const retrievedBand = await bandRepository.findById(dt.id);

    expect(retrievedBand.websites[0]).toBeInstanceOf(Website);
    expect(retrievedBand.websites[1]).toBeInstanceOf(Website);
    expect(retrievedBand.websites[0].url).toEqual('http://www.dreamtheater.net');
    expect(retrievedBand.websites[1].url).toEqual('https://www.dreamtheater.net');
  });
});
