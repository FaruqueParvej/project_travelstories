"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Form from "@components/Form";

function Search() {
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  return <input placeholder="Search..." value={storyId} />;
  {
    /* Assuming you want to use storyId as the value of the input */
  }
}

const EditStory = () => {
  const router = useRouter();
  const { data: session } = useSession();

  <Suspense fallback={<div>Loading...</div>}>
    <Search />
  </Suspense>;

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ story: "", tag: "" });

  useEffect(() => {
    const getStoryDetails = async () => {
      const response = await fetch(`/api/story/${storyId}`);
      const data = await response.json();
      setPost({ story: data.story, tag: data.tag });
    };
    if (storyId) getStoryDetails();
  }, [storyId]);
  const updateStory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!storyId) return alert("story id not found");
    try {
      const response = await fetch(`/api/story/${storyId}`, {
        method: "PATCH",
        body: JSON.stringify({
          story: post.story,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateStory}
    />
  );
};

export default EditStory;

export const EditStoryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditStory />
    </Suspense>
  );
};
