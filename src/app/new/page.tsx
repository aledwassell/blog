import prisma from '@/db';
import {redirect} from 'next/navigation';
import Link from 'next/link';

async function createTodo(data: FormData) {
  'use server';

  const title = data.get('title')?.valueOf();
  const src = data.get('src')?.valueOf();
  const year = data.get('year')?.valueOf();

  if (typeof title !== 'string' || !title) {
    throw new Error('Invalid Title');
  }

  if (typeof src !== 'string' || !src) {
    throw new Error('Invalid image src');
  }

  if (typeof year !== 'string' || !year) {
    throw new Error('Invalid year');
  }

  await prisma.photo
    .create({data: {title, src, year, width: 300, height: 300}})
    .then(() => redirect('/'));
}

export default function NewPage() {
  return (
    <div className="p-14">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New Page</h1>
      </header>
      <form className="flex gap-2 flex-col max-w-lg" action={createTodo}>
        <input
          type="text"
          required
          name="title"
          placeholder="Image title"
          className="text-input"
        />
        <input
          type="text"
          required
          name="src"
          placeholder="Image source"
          className="text-input"
        />
        <input
          type="text"
          required
          name="year"
          placeholder="Year"
          className="text-input"
        />
        <div className="flex gap-1 justify-end">
          <Link href=".." className="button">
            Back
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
