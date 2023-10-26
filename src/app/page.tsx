import Link from 'next/link';
import prisma from '../db';
import {TodoItem} from '@/components/TodoItem';
import {redirect} from 'next/navigation';
import {PhotoItem} from '@/components/PhotoItem';
import {PhotoItemTwo} from '@/components/PhotoItemTwo';

function getTodos() {
  return prisma.todo.findMany();
}

function getPhotos() {
  return prisma.photo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  'use server';

  await prisma.todo.update({where: {id}, data: {complete}});
}

async function deleteTodo(id: string) {
  'use server';

  await prisma.todo.delete({where: {id}});

  redirect('/');
}

export default async function Home() {
  const todos = await getTodos();
  const photos = await getPhotos();

  return (
    <>
      <header className="flex justify-between items-center py-12 px-8">
        <h1 className="text-2xl">\ ALED WASSELL</h1>
        <Link href="/new" className="button">
          New
        </Link>
      </header>

      {/* <div className="flex gap-8 items-center">
        {photos.map((photo, index) => (
          <PhotoItem key={photo.id} {...photo} number={index + 1} />
        ))}
      </div> */}

      <div className="flex flex-wrap">
        {photos.map((photo, index) => (
          <PhotoItemTwo key={photo.id} {...photo} number={index + 1} />
        ))}
      </div>

      <footer className="flex justify-between items-center py-24 px-8">
        <div></div>
        <span>aled wassell \ copyright {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
