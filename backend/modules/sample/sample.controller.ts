import Sample from './sample';
import CRUDController from '../crud/crud.controller';


class SampleController extends CRUDController<Sample> {
  constructor() {
    super();
  }
}

export default SampleController;
