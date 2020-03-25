import Sample from './sample.entity';
import CRUDController from '../crud/crud.controller';


class SampleController extends CRUDController<Sample> {
  constructor() {
    super('sample');
  }
}

export default SampleController;
