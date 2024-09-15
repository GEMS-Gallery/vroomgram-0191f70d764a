import Bool "mo:base/Bool";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Time "mo:base/Time";
import List "mo:base/List";

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
  stable var posts : List.List<Post> = List.nil();
  stable var nextId : Nat = 0;

  // Create a new post
  public func createPost(title: Text, description: Text, imageUrl: Text) : async Post {
    let post : Post = {
      id = nextId;
      title = title;
      description = description;
      imageUrl = imageUrl;
      likes = 0;
      createdAt = Time.now();
    };
    posts := List.push(post, posts);
    nextId += 1;
    post
  };

  // Get all posts
  public query func getPosts() : async [Post] {
    List.toArray(posts)
  };

  // Like a post
  public func likePost(id: Nat) : async Bool {
    posts := List.map<Post, Post>(posts, func (post) {
      if (post.id == id) {
        {
          id = post.id;
          title = post.title;
          description = post.description;
          imageUrl = post.imageUrl;
          likes = post.likes + 1;
          createdAt = post.createdAt;
        }
      } else {
        post
      }
    });
    true
  };
}