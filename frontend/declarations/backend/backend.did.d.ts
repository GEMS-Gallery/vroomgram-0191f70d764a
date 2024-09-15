import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : bigint,
  'title' : string,
  'createdAt' : bigint,
  'description' : string,
  'likes' : bigint,
  'imageUrl' : string,
}
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string, string], bigint>,
  'getPosts' : ActorMethod<[], Array<Post>>,
  'likePost' : ActorMethod<[bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
