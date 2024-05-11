"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchMyPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/myPosts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if (session?.user.id) fetchMyPosts();
  }, [session?.user.id]);
  const handleEdit = (post) => {
    router.push(`update-story?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this story?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/story/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredMyPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredMyPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to my personalized profile"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
