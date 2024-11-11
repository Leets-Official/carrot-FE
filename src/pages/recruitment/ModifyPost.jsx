import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const ModifyPost = () => {
    navigate(`/post`, {
      state: {
        mode: "modify", // 수정 모드 설정
        postData: {//세 게시글 데이터
            }, // 현재 게시글 데이터 전달
      },
    });
  };
// const ModifyPost = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { postId } = location.state || {};
//   const [formData, setFormData] = useState(null); // 기존 게시글 데이터를 담을 state

//   // 게시글 상세 정보 가져오기
//   useEffect(() => {
//     if (postId) {
//       getPostDetails(postId).then((data) => {
//         setFormData(data.postData); // 서버에서 받은 데이터 중 postData만 폼 데이터로 설정
//       });
//     }
//   }, [postId]);

//   const handleChange = (key, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   // 게시글 수정 API 호출
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await updatePost(postId, formData);
//     if (response.isSuccess) {
//       alert("게시글이 성공적으로 수정되었습니다.");
//       navigate(`/post/detail/${postId}`); // 수정된 게시글 상세 페이지로 이동하도록 설정
//     } else {
//       alert("게시글 수정에 실패했습니다.");
//     }
//   };

//   return (
//     formData && (
//       <form onSubmit={handleSubmit}>
//         {/* 수정할 폼들을 넣을 필드 이후에 작성 예정, 여기서 handlChange*/}
//         {/* <label>내용</label>
//         <textarea
//           value={formData.content}
//           onChange={(e) => handleChange("content", e.target.value)}
//         ></textarea> */}

//         <button type="submit">저장</button>
//       </form>
//     )
//   );
// };

export default ModifyPost;