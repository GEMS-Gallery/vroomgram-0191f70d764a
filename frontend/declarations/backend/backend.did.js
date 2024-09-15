export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'likes' : IDL.Nat,
    'imageUrl' : IDL.Text,
  });
  return IDL.Service({
    'createPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Post], []),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'likePost' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
