/**
 * !!The PostCard component is a simple card component that displays the title and featured image of a post!!
 * In this component, we are displaying the title and the featured image of a post.
 * We are also using the Link component from react-router-dom to link to the post page.
 * The featured image is displayed using the appwriteService.getFilePreview function,
 * which generates a URL for the file based on the file ID.
 */
import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
