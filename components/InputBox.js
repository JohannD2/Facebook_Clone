import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";

import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase";

function InputBox() {
  const { data: session } = useSession();

  const inputRef = useRef(null);
  const filePickerRef = useRef(null);

  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    const docRef = await addDoc(collection(db, "posts"), {
      message: inputRef.current.value,
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    if (imageToPost) {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);

      await uploadString(imageRef, imageToPost, "data_url")
        .then(async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            postImage: downloadURL,
          });
        })
        .catch((err) => console.log(err));
    }

    inputRef.current.value = "";
    setImageToPost(null);
  };

  const addImageToPost = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="mt-6 rounded-2xl bg-white p-2 font-medium text-gray-500 shadow-md">
      <div className="flex items-center space-x-4 p-4">
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="h-12 flex-grow rounded-full bg-gray-100 px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${session?.user?.name}?`}
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            className="flex transform cursor-pointer flex-col filter transition duration-150 hover:scale-105 hover:brightness-110 "
            onClick={removeImage}
          >
            <img className="h-10 object-contain" src={imageToPost} />
            <p className="text-center text-xs text-red-500">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly border-t p-3">
        <div className="input-icon-custom">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          className="input-icon-custom"
          onClick={() => filePickerRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            onChange={addImageToPost}
            type="file"
            hidden
            ref={filePickerRef}
          />
        </div>
        <div className="input-icon-custom">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
