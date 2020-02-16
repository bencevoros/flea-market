import Sample from './sample';

export interface Model {
  create: (Sample) => Sample;
  read: () => Sample;
  delete: (Number) => Boolean;
  update: (Sample) => Sample;
}

class SampleModel implements Model {
  public create (body: Sample) {
    body.id = 1;
    return body;
  }
  public read () {
    return { title: 'Hello world!', message: 'It works, so this is a message', id: 0 };
  }
  public update (updates: Sample) {
    return updates;
  }
  public delete (id: Number) {
    const rand = Math.random() * 10;
    if (rand < 5) {
      return true;
    }

    return false;
  }
}

export default SampleModel;
