import { Box, Flex, Input, Select, Image, Button } from "@chakra-ui/react";
import { useState } from "react";
import BlogInputTags from "./BlogInputTags";
import uploadFile from "../../hooks/uploadFile";
import { db } from "../../firebase/config";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
export default function BlogInput() {
  const cardTypes = ["image", "video", "text"];
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    card: {
      type: "image",
      data: null,
    },
    link: "",
    date: new Date(),
    description: "",
    type: "",
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogInfo({ ...blogInfo, [name]: value });
  };
  const [uploading, setUploading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBlogInfo((prevInfo) => ({
      ...prevInfo,
      card: { type: "image", data: file },
    }));
  };

  const handleSubmit = async () => {
    // upload image to firebase strorage
    setUploading(true);
    const url = await uploadFile("blog", blogInfo.card.data);

    // upload blog to firebase firestore
    await setDoc(doc(db, "blogPosts", blogInfo.title), {
      ...blogInfo,
      card: { type: "image", data: url },
      tags: selectedTags,
    });

    selectedTags.forEach((tag) => {
      updateDoc(doc(db, "blogTags", tag), {
        posts: arrayUnion(blogInfo.title),
      });
    });
    alert("Blog post created successfully! Good job Duj");
    setUploading(false);
  };

  return (
    <Flex gap="10px" flexDir="column">
      <Input
        name="title"
        placeholder="Title"
        value={blogInfo.title}
        onChange={handleChange}
      />
      <Input
        name="link"
        placeholder="Link"
        value={blogInfo.link}
        onChange={handleChange}
      />
      <Input
        name="type"
        placeholder="Type"
        value={blogInfo.type}
        onChange={handleChange}
      />
      <BlogInputTags setSelectedTags={setSelectedTags} />
      <Select>
        {cardTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
      {blogInfo.card.type === "image" && (
        <Input type="file" accept="image/*" onChange={handleImage} />
      )}
      {!uploading &&
        blogInfo.card.data &&
        blogInfo.card.type === "image" && (
          <Image src={URL.createObjectURL(blogInfo.card.data)} alt="img" />
        )}
      <Input
        name="description"
        placeholder="Description"
        value={blogInfo.description}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Create a blog post</Button>
    </Flex>
  );
}
