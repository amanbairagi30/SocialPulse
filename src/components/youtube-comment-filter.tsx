"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { youtube_v3 } from "googleapis";

export default function CommentFilter({
  comments,
}: {
  comments: youtube_v3.Schema$CommentThread[] | undefined;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [filteredComments, setFilteredComments] = useState<
    youtube_v3.Schema$CommentThread[] | undefined
  >([]);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  useEffect(() => {
    if (tags.length === 0) {
      setFilteredComments(comments);
      return;
    }
    const filteredComments = comments?.filter((comment) =>
      tags.some((tag) =>
        comment?.snippet?.topLevelComment?.snippet?.textOriginal
          ?.toLowerCase()
          .includes(tag.toLowerCase())
      )
    );
    setFilteredComments(filteredComments);
  }, [tags, comments]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>YouTube Comment Filter</CardTitle>
          <CardTitle>{comments?.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button onClick={handleAddTag}>Add Tag</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ✕
                </Badge>
              ))}
            </div>
            <div className="space-y-2 max-h-[50vh] overflow-auto">
              {filteredComments?.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <p className="font-semibold">
                      {
                        comment?.snippet?.topLevelComment?.snippet
                          ?.authorDisplayName
                      }
                    </p>
                    <p>
                      {comment?.snippet?.topLevelComment?.snippet?.textOriginal}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
