interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

// declaration merging
// interface PostNewField {
//   newField: string;
// }
// ❌ Грешка 1 — Declaration Merging
interface Post {
  newField: string;
}

interface DraftPost extends Post {
  isDraft: true;
}

// type PostPreview = {
//   id: number;
//   title: Pick<Post, title extends keyof Post>;
// };
type PostPreview = Pick<Post, 'id' | 'title'>;

type PostID = string | number;

const getPostById = (id: PostID): Post => {
  throw new Error('not implemented');
};

console.log(getPostById(1));
