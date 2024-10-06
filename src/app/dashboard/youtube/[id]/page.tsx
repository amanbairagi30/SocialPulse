import CommentFilter from "@/components/youtube-comment-filter";
import { getComments } from "@/lib/youtube";
import React from "react";

const YoutubeComments = async ({ params }: { params: { id: string } }) => {
  const comments = await getComments(params.id);
  return (
    <CommentFilter comments={comments} />
    // <div>
    //   {comments?.map((comment) => (
    //     <div key={comment.id}>
    //       {comment.snippet?.topLevelComment?.snippet?.textOriginal}
    //     </div>
    //   ))}
    // </div>
  );
};

export default YoutubeComments;
