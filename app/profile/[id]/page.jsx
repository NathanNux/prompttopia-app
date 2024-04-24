"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ( { params } ) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);


  return (
    <Suspense fallback={<Loading />} >
        <Profile
        name= {username}
        desc={`Welcome to ${username}'s profile page. Explore their exceptional prompts and get inspired by the power of ${username}'s imagination`}
        data={userPosts}
        />
    </Suspense>
  );
};

export default UserProfile;