import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { firestore, auth } from "../../../lib/firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { blogCat } from "../../../atoms/blogCategory";
import Image from "next/image"; // Import next/image
import NavbarNew from "../../../components/NavbarNew";
import CategorySelect from "../../../components/admin/CategorySelect";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => "Loading"
});

const EditBlogPost = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, loading, error] = useAuthState(auth);

  const [post, setPost] = useState(null);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState(post?.content);
  const [fetching, setFetching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useRecoilState(blogCat);

  const blogCategories = [
    { id: 1, name: "Health", unavailable: false },
    { id: 2, name: "Exercise", unavailable: false },
    { id: 3, name: "Work", unavailable: false },
    { id: 4, name: "Dating", unavailable: false },
    { id: 5, name: "Social", unavailable: false }
  ];

  // Memoize getPost to avoid it being redefined on each render
  const getPost = useCallback(async () => {
    if (!id) return;
    const querySnapshot = await getDoc(doc(firestore, "posts", id));

    setPost(querySnapshot.data());
    setTitle(querySnapshot?.data().title);
    setContent(querySnapshot?.data().content);
    setImage(querySnapshot?.data().thumbnailImage);
    setSelectedCategory(querySnapshot.data().category);

    setFetching(false);
  }, [id, setSelectedCategory]);

  useEffect(() => {
    getPost();
  }, [id, getPost]);

  const onSelectImage = event => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = readerEvent => {
      if (readerEvent.target?.result) {
        setImage(readerEvent.target.result);
      }
    };
  };

  const handleCreatePost = async () => {
    const postRef = doc(firestore, "posts", id);
    console.log("REFFF", postRef);

    await updateDoc(postRef, {
      creator: user.uid,
      title: title,
      content: content,
      thumbnailImage: image,
      category: selectedCategory
    });

    setTitle("");
    setContent("");
    setImage("");
  };

  return (
    <div className="grid min-w-screen min-h-screen bg-mainbg justify-center">
      <Head>
        <title>Edit Blog Post</title>
      </Head>
      <NavbarNew />

      {fetching && <h1 className="text-6xl text-white">LOADING </h1>}
      {!fetching && (
        <div className="max-w-5xl mx-auto">
          <h1 className="text-center text-white font-bold lg:text-6xl md:text-5xl sm:text-4xl mt-12 mb-12">
            Edit Blog Post
          </h1>

          {/* Image input */}
          <label
            className="block text-white text-2xl font-bold md:text-left md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Thumbnail Image upload
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full mb-4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="file"
            onChange={e => onSelectImage(e)}
          />
          {image && (
            <Image
              src={image}
              alt={`${post.title} image`}
              className="w-20 h-20"
            />
          )}

          {/* Title input */}
          <div className="mb-4 text-2xl">
            <label
              className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Title
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <label className="block text-white text-2xl font-bold md:text-left mb-1 md:mb-0 pr-4">
            Content
          </label>

          <RichTextEditor value={content} onChange={setContent} id="rte" />

          {/* Category list */}
          <CategorySelect categories={blogCategories} />

          <button
            className="w-64 bg-transparent mt-12 text-white py-2 px-4 border border-white rounded"
            onClick={handleCreatePost}
          >
            Update post
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBlogPost;
