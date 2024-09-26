import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queries";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  // Compute the saved post record safely
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    if (savedPostRecord) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [savedPostRecord]); // Only depend on savedPostRecord

  const handleLikePost = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    const likesArray = likes.includes(userId)
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    setLikes(likesArray);

    // Error handling for likePost
    likePost({ postId: post.$id, likesArray })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  const handleSavePost = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      // Error handling for deleteSavePost
      deleteSavePost(savedPostRecord.$id)
        .catch((error) => {
          console.error("Error deleting saved post:", error);
        });
    } else {
      // Error handling for savePost
      savePost({ userId: userId, postId: post.$id })
        .then(() => {
          setIsSaved(true);
        })
        .catch((error) => {
          console.error("Error saving post:", error);
        });
    }
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img
          src={checkIsLiked(likes, userId)
            ? "/assets/icons/liked.svg"
            : "/assets/icons/like.svg"}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="save"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
      </div>
    </div>
  );
};

export default PostStats;
