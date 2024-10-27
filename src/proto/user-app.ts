// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.3
//   protoc               v5.28.2
// source: src/proto/user-app.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "userms";

/** Enum for user roles */
export enum Role {
  USER = 0,
  MANAGER = 1,
  ADMIN = 2,
  UNRECOGNIZED = -1,
}

export function roleFromJSON(object: any): Role {
  switch (object) {
    case 0:
    case "USER":
      return Role.USER;
    case 1:
    case "MANAGER":
      return Role.MANAGER;
    case 2:
    case "ADMIN":
      return Role.ADMIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Role.UNRECOGNIZED;
  }
}

export function roleToJSON(object: Role): string {
  switch (object) {
    case Role.USER:
      return "USER";
    case Role.MANAGER:
      return "MANAGER";
    case Role.ADMIN:
      return "ADMIN";
    case Role.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface HealthCheckRequest {
}

export interface HealthCheckResponse {
  healthy: boolean;
}

/** Message to create a user */
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}

/** Message to update a user */
export interface UpdateUserRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: Role[];
}

/** Message for user ID */
export interface UserIdRequest {
  id: string;
}

/** Response message for a single user */
export interface UserResponse {
  /** ID of the user */
  id: string;
  /** User name */
  name: string;
  /** Email of the user */
  email: string;
  /** string password = 4;       // Password of the user (encrypted/hashed) */
  roles: Role[];
}

/** Response message for multiple users */
export interface UserListResponse {
  users: UserResponse[];
}

/** Empty message */
export interface Empty {
}

export interface DeleteUserRequest {
  id: string;
}

export interface FindUserByIdRequest {
  id: string;
}

function createBaseHealthCheckRequest(): HealthCheckRequest {
  return {};
}

export const HealthCheckRequest: MessageFns<HealthCheckRequest> = {
  encode(_: HealthCheckRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HealthCheckRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthCheckRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): HealthCheckRequest {
    return {};
  },

  toJSON(_: HealthCheckRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthCheckRequest>, I>>(base?: I): HealthCheckRequest {
    return HealthCheckRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthCheckRequest>, I>>(_: I): HealthCheckRequest {
    const message = createBaseHealthCheckRequest();
    return message;
  },
};

function createBaseHealthCheckResponse(): HealthCheckResponse {
  return { healthy: false };
}

export const HealthCheckResponse: MessageFns<HealthCheckResponse> = {
  encode(message: HealthCheckResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.healthy !== false) {
      writer.uint32(8).bool(message.healthy);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HealthCheckResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthCheckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.healthy = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HealthCheckResponse {
    return { healthy: isSet(object.healthy) ? globalThis.Boolean(object.healthy) : false };
  },

  toJSON(message: HealthCheckResponse): unknown {
    const obj: any = {};
    if (message.healthy !== false) {
      obj.healthy = message.healthy;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthCheckResponse>, I>>(base?: I): HealthCheckResponse {
    return HealthCheckResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthCheckResponse>, I>>(object: I): HealthCheckResponse {
    const message = createBaseHealthCheckResponse();
    message.healthy = object.healthy ?? false;
    return message;
  },
};

function createBaseCreateUserRequest(): CreateUserRequest {
  return { name: "", email: "", password: "", roles: [] };
}

export const CreateUserRequest: MessageFns<CreateUserRequest> = {
  encode(message: CreateUserRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    writer.uint32(34).fork();
    for (const v of message.roles) {
      writer.int32(v);
    }
    writer.join();
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateUserRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.password = reader.string();
          continue;
        }
        case 4: {
          if (tag === 32) {
            message.roles.push(reader.int32() as any);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.roles.push(reader.int32() as any);
            }

            continue;
          }

          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateUserRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      roles: globalThis.Array.isArray(object?.roles) ? object.roles.map((e: any) => roleFromJSON(e)) : [],
    };
  },

  toJSON(message: CreateUserRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.roles?.length) {
      obj.roles = message.roles.map((e) => roleToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateUserRequest>, I>>(base?: I): CreateUserRequest {
    return CreateUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateUserRequest>, I>>(object: I): CreateUserRequest {
    const message = createBaseCreateUserRequest();
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.roles = object.roles?.map((e) => e) || [];
    return message;
  },
};

function createBaseUpdateUserRequest(): UpdateUserRequest {
  return { id: "", name: "", email: "", password: "", roles: [] };
}

export const UpdateUserRequest: MessageFns<UpdateUserRequest> = {
  encode(message: UpdateUserRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(34).string(message.password);
    }
    writer.uint32(42).fork();
    for (const v of message.roles) {
      writer.int32(v);
    }
    writer.join();
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UpdateUserRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.password = reader.string();
          continue;
        }
        case 5: {
          if (tag === 40) {
            message.roles.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.roles.push(reader.int32() as any);
            }

            continue;
          }

          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUserRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      roles: globalThis.Array.isArray(object?.roles) ? object.roles.map((e: any) => roleFromJSON(e)) : [],
    };
  },

  toJSON(message: UpdateUserRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.roles?.length) {
      obj.roles = message.roles.map((e) => roleToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserRequest>, I>>(base?: I): UpdateUserRequest {
    return UpdateUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserRequest>, I>>(object: I): UpdateUserRequest {
    const message = createBaseUpdateUserRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.roles = object.roles?.map((e) => e) || [];
    return message;
  },
};

function createBaseUserIdRequest(): UserIdRequest {
  return { id: "" };
}

export const UserIdRequest: MessageFns<UserIdRequest> = {
  encode(message: UserIdRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UserIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserIdRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: UserIdRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserIdRequest>, I>>(base?: I): UserIdRequest {
    return UserIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserIdRequest>, I>>(object: I): UserIdRequest {
    const message = createBaseUserIdRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseUserResponse(): UserResponse {
  return { id: "", name: "", email: "", roles: [] };
}

export const UserResponse: MessageFns<UserResponse> = {
  encode(message: UserResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    writer.uint32(42).fork();
    for (const v of message.roles) {
      writer.int32(v);
    }
    writer.join();
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UserResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        }
        case 5: {
          if (tag === 40) {
            message.roles.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.roles.push(reader.int32() as any);
            }

            continue;
          }

          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      roles: globalThis.Array.isArray(object?.roles) ? object.roles.map((e: any) => roleFromJSON(e)) : [],
    };
  },

  toJSON(message: UserResponse): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.roles?.length) {
      obj.roles = message.roles.map((e) => roleToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserResponse>, I>>(base?: I): UserResponse {
    return UserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserResponse>, I>>(object: I): UserResponse {
    const message = createBaseUserResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.roles = object.roles?.map((e) => e) || [];
    return message;
  },
};

function createBaseUserListResponse(): UserListResponse {
  return { users: [] };
}

export const UserListResponse: MessageFns<UserListResponse> = {
  encode(message: UserListResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.users) {
      UserResponse.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UserListResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.users.push(UserResponse.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserListResponse {
    return {
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => UserResponse.fromJSON(e)) : [],
    };
  },

  toJSON(message: UserListResponse): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => UserResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserListResponse>, I>>(base?: I): UserListResponse {
    return UserListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserListResponse>, I>>(object: I): UserListResponse {
    const message = createBaseUserListResponse();
    message.users = object.users?.map((e) => UserResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty: MessageFns<Empty> = {
  encode(_: Empty, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Empty {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseDeleteUserRequest(): DeleteUserRequest {
  return { id: "" };
}

export const DeleteUserRequest: MessageFns<DeleteUserRequest> = {
  encode(message: DeleteUserRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeleteUserRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteUserRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteUserRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteUserRequest>, I>>(base?: I): DeleteUserRequest {
    return DeleteUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteUserRequest>, I>>(object: I): DeleteUserRequest {
    const message = createBaseDeleteUserRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseFindUserByIdRequest(): FindUserByIdRequest {
  return { id: "" };
}

export const FindUserByIdRequest: MessageFns<FindUserByIdRequest> = {
  encode(message: FindUserByIdRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): FindUserByIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindUserByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindUserByIdRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: FindUserByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindUserByIdRequest>, I>>(base?: I): FindUserByIdRequest {
    return FindUserByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindUserByIdRequest>, I>>(object: I): FindUserByIdRequest {
    const message = createBaseFindUserByIdRequest();
    message.id = object.id ?? "";
    return message;
  },
};

/** ------------------- MAIN APP SERVICE */
export interface HealthCheck {
  Check(request: HealthCheckRequest): Promise<HealthCheckResponse>;
}

export const HealthCheckServiceName = "userms.HealthCheck";
export class HealthCheckClientImpl implements HealthCheck {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || HealthCheckServiceName;
    this.rpc = rpc;
    this.Check = this.Check.bind(this);
  }
  Check(request: HealthCheckRequest): Promise<HealthCheckResponse> {
    const data = HealthCheckRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Check", data);
    return promise.then((data) => HealthCheckResponse.decode(new BinaryReader(data)));
  }
}

/** User service with RPC methods */
export interface UserService {
  /** Create a user */
  CreateUser(request: CreateUserRequest): Promise<UserResponse>;
  /** Fetch all users */
  FindAllUsers(request: Empty): Promise<UserListResponse>;
  /** Fetch a user by ID */
  FindUserById(request: UserIdRequest): Promise<UserResponse>;
  /** Update a user */
  UpdateUser(request: UpdateUserRequest): Promise<UserResponse>;
  /** Delete a user by ID */
  DeleteUser(request: UserIdRequest): Promise<Empty>;
}

export const UserServiceServiceName = "userms.UserService";
export class UserServiceClientImpl implements UserService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || UserServiceServiceName;
    this.rpc = rpc;
    this.CreateUser = this.CreateUser.bind(this);
    this.FindAllUsers = this.FindAllUsers.bind(this);
    this.FindUserById = this.FindUserById.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
  }
  CreateUser(request: CreateUserRequest): Promise<UserResponse> {
    const data = CreateUserRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateUser", data);
    return promise.then((data) => UserResponse.decode(new BinaryReader(data)));
  }

  FindAllUsers(request: Empty): Promise<UserListResponse> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(this.service, "FindAllUsers", data);
    return promise.then((data) => UserListResponse.decode(new BinaryReader(data)));
  }

  FindUserById(request: UserIdRequest): Promise<UserResponse> {
    const data = UserIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FindUserById", data);
    return promise.then((data) => UserResponse.decode(new BinaryReader(data)));
  }

  UpdateUser(request: UpdateUserRequest): Promise<UserResponse> {
    const data = UpdateUserRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateUser", data);
    return promise.then((data) => UserResponse.decode(new BinaryReader(data)));
  }

  DeleteUser(request: UserIdRequest): Promise<Empty> {
    const data = UserIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteUser", data);
    return promise.then((data) => Empty.decode(new BinaryReader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}