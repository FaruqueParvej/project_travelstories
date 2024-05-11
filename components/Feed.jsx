"use client";

import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";

const StoryCardList = ({ data, handleTagClick }) => {
  // console.log(data);
  return (
    <div className="mt-16 story_layout">
      {data.map((post) => (
        <StoryCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        ></StoryCard>
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/story");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterStorys = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.story)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterStorys(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterStorys(tagName);
    setSearchedResults(searchResult);
  };
  return (
    <section className="feed ">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* All Storys */}
      {searchText ? (
        <StoryCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <StoryCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
