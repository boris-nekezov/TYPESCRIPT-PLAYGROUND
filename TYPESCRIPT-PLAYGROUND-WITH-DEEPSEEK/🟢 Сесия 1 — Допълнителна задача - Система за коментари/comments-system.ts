interface CommentType {
  id: number;
  text: string;
  author: string;
  postId: number;
}

//! Declaration merging
interface CommentType {
  likes?: number;
}

type CommentInput = Pick<CommentType, 'text' | 'author'>;

// type ModeratedComment = Comment & { moderatedBy: string; approved: boolean };

interface ModeratedComment extends CommentType {
  moderatedBy: string;
  approved: boolean;
}

type CommentID = string | number;

const approveComment = (id: CommentID): ModeratedComment | undefined => {
  throw new Error(`Cannot call comment with ID: ${id}`);
};

//

const SomeComment: CommentType = {
  id: 1,
  text: 'Comment text',
  author: 'Borko',
  postId: 1,
};

const SomeCommentWithLikes: CommentType = {
  id: 1,
  text: 'Comment text',
  author: 'Borko',
  postId: 1,
  likes: 100,
};

console.log(SomeComment);
//! FINISHED!!!
