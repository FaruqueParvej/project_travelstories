import EditStory from "@components/EditStory";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EditStory />
      </Suspense>
    </>
  );
};

export default page;
