import { createPost } from '@/actions/posts';
import PostForm from '@/components/post-form';

export const metadata = {
	title: 'Create new post',
	description: 'Create and share amazing posts.',
};

export default function NewPostPage() {
	return <PostForm action={createPost} />;
}
