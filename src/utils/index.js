// import axios from "axios";

// export const imageUpload = async (imageData) => {
//   const formData = new FormData();
//   formData.append("image", imageData);
  
//   const { data } = await axios.post(
//     `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`,
//     formData
//   );
//   return data?.data?.url;
// };



import axios from "axios";

export const imageUpload = async (ImageData) => {
  const formData = new FormData();
  formData.append("image", ImageData);

  const data = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data?.data?.data?.display_url;
};

// save or update user in db
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  );
  return data;
};
