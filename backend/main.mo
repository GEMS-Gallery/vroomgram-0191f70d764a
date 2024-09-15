import Bool "mo:base/Bool";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Time "mo:base/Time";

actor {
  // Define the Post type
  public type Post = {
    id: Nat;
    title: Text;
    description: Text;
    imageUrl: Text;
    likes: Nat;
    createdAt: Int;
  };

  // Stable variable to store posts
  stable var posts : [Post] = [];
  stable var nextId : Nat = 0;

  // Create a new post
  public func createPost(title: Text, description: Text, imageUrl: Text) : async Nat {
    let post : Post = {
      id = nextId;
      title = title;
      description = description;
      imageUrl = imageUrl;
      likes = 0;
      createdAt = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    nextId - 1
  };

  // Get all posts
  public query func getPosts() : async [Post] {
    posts
  };

  // Like a post
  public func likePost(id: Nat) : async Bool {
    let index = Array.indexOf<Post>({ id = id; title = ""; description = ""; imageUrl = ""; likes = 0; createdAt = 0 }, posts, func(a, b) { a.id == b.id });
    switch (index) {
      case null { false };
      case (?i) {
        let updatedPost = {
          id = posts[i].id;
          title = posts[i].title;
          description = posts[i].description;
          imageUrl = posts[i].imageUrl;
          likes = posts[i].likes + 1;
          createdAt = posts[i].createdAt;
        };
        posts := Array.tabulate(posts.size(), func (j: Nat) : Post {
          if (j == i) { updatedPost } else { posts[j] }
        });
        true
      };
    }
  };
}