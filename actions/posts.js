'use server';
import { uploadImage } from '@/lib/cloudinary';
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';

export async function createPost(prevState, formData) {
	const title = formData.get('title');
	const image = formData.get('image');
	const content = formData.get('content');

	let errors = [];

	if (!title || title.trim().length === 0) {
		errors.push('Title is required');
	}
	if (!content || content.trim().length === 0) {
		errors.push('Content is required');
	}
	if (!image || image.size === 0) {
		errors.push('Image is required');
	}

	if (errors.length > 0) {
		return { errors };
	}

	let imageURL;
	try {
		imageURL = await uploadImage(image);
	} catch (error) {
		throw new Error('Image upload failed, try again later.');
	}

	try {
		await storePost({
			imageUrl: imageURL,
			title,
			content,
			userId: 1,
		});
	} catch (error) {
		throw new Error('Post was not created, try again later.');
	}

	redirect('/feed');
}
