import { Role } from "src/user/enums/role.enum";
export declare class SignUpDto {
    name: string;
    email: string;
    password: string;
    roles: Role[];
}
