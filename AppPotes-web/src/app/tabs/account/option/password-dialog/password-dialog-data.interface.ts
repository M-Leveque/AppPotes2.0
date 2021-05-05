import { User } from 'src/app/models/User.model';

export interface DialogData {
    user: User;
    doAfterValidation: Function;
    context: any;
}