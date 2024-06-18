import { customerService } from '../../service/customer.service';
import { deferredLoader } from '../shared/utils/loader';

export const customerLoader = deferredLoader(({ params }) => {
    return { response: customerService.getCustomer(params.id ?? '') };
});
