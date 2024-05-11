import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover New Trails
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> & Share Your Tale</span>
      </h1>
      <p className="desc text-center ">
        TravelStories: Where storytelling meets travel. Explore captivating
        tales from around the world and share your own adventures in our global
        community.
      </p>
      <Feed></Feed>
    </section>
  );
};

export default Home;
