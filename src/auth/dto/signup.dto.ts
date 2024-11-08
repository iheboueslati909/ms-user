import { Role } from "src/user/enums/role.enum";

export class SignUpDto {
    name: string;
    email: string;
    password: string;
    roles: Role[];
}