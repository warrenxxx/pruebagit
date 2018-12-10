import {BaseMongoService} from '../../../common/src/service/base.mongo.service';
import {ProductModel} from '../../../common/src/models/product.model';

export class ProductService  extends BaseMongoService<ProductModel> {
    constructor() {
        super('product');
    }
}

