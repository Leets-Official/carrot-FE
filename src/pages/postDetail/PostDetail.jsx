import React, { useState, useRef } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCoinFilled,
  IconCalendarFilled,
  IconClockHour10Filled,
  IconUserFilled,
} from "@tabler/icons-react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
  ImageContainer,
  ImageList,
  Image,
  DotsContainer,
  Dot,
  Content,
  TagWrap,
  Tag,
  ButtonContainer,
} from "../../styles/PostDetail.style";
import { useNavigate, useParams } from "react-router-dom";
import { IconDotsVertical } from "@tabler/icons-react";
import CeoInfo from "./CeoInfo";
import MapContainer from "../../components/MapContainer";
import Button from "../../components/Button";
import theme from "../../styles/theme/theme";
import { ButtonsModal } from "../../components/ButtonsModal";
//<MapContainer location={data.location} />
// 예시 데이터
const data = {
  postId: 1,
  img: [
    "https://i.pinimg.com/550x/5f/fd/2a/5ffd2a1c09352f38e65083e163c58cd9.jpg",
    "https://3.gall-img.com/tdgall/files/attach/images/82/193/178/071/9a2ccc0facd637233f98b0e2b45f7bbf.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdpZi7YXxXv_IeZgkuiuRkRUq95w6AKwKfHUE1vGtV7j6tbS4HYIywWys8GuBe7lk8f3s&usqp=CAU",
    ,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEjLO_r_AFZw9LhXaWs7tJan9d5W0PfuH9iw5vG8F5TDGJhMIulGjW4MassYMvIUxQQ&usqp=CAU",
  ],
  tag: ["기타", "청소", "요리"],
  title: "버섯 수확 아르바이트",
  company: "이담농원",
  type: "단기",
  pay: { type: "시급", money: "10,000" },
  date: ["241102", "241103"], // "장기의 경우" => 요일로 받아옴,
  time: "08:00~19:00",
  time_discussion: true,
  content:
    "버섯 수확 단순 아르바이트입니다. 점심 식대 1만원 지급합니다. 밖에서 드시고 오셔도 되고, 도시락 싸오셔도 무방합니다. 냉방기 가동중인 시원한 하우스 안에서만 근무합니다. 감사합니다.",
  applicant: 3,
  location: "경기도 시흥시 봉화로 285",
  ceoInfo: {
    profile:
      "https://i.pinimg.com/550x/5f/fd/2a/5ffd2a1c09352f38e65083e163c58cd9.jpg",
    name: "제임스",
    number: "2208680034",
    company: "씨앤코스타",
    ceoName: "전현배",
  },
};

function PostDetail() {
  const userType = "USER";
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false); // 사업자 정보 모달
  const [isMode, setIsMode] = useState(false); // 게시글 수정, 삭제 모달창
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageContainerRef = useRef(null);

  // 이미지 슬라이더
  const handleScroll = () => {
    const scrollLeft = imageContainerRef.current.scrollLeft;
    const imageWidth = imageContainerRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / imageWidth);
    setCurrentIndex(newIndex);
  };

  // 이미지 슬라이더 위치 표시
  const handleDotClick = (index) => {
    const scrollTo = index * imageContainerRef.current.clientWidth; // 해당 인덱스에 맞춰 스크롤
    imageContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const handleApply = () => {
    const result = confirm("해당 알바에 지원하시겠습니까?");
    if (result) {
      // 지원하기 API 호출
      // 1. 지원완료 2. 이미 지원한 경우
      alert("지원이 완료되었습니다.");
    }
  };

  return !isOpen ? (
    <Container>
      <HeaderContainer>
        <IconChevronLeft size={30} onClick={() => navigate("/home")} />
        {/**수정/삭제 아이콘은 작성자와 로그인 유저 id가 일치할 경우만 보여줌 */}
        <IconDotsVertical size={30} onClick={() => setIsMode((pre) => !pre)} />
        {isMode && (
          <ButtonsModal
            isMode={isMode}
            postId={data.postId}
            setIsMode={setIsMode}
          />
        )}
      </HeaderContainer>
      <BodyContainer>
        <ImageContainer
          ref={imageContainerRef}
          onScroll={handleScroll}
          style={{ overflowX: "scroll", scrollSnapType: "x mandatory" }}
        >
          {data.img.length !== 0 && (
            <ImageList style={{ display: "flex", scrollSnapAlign: "start" }}>
              {data.img.map((image, index) => (
                <Image key={index} src={image} />
              ))}
            </ImageList>
          )}
        </ImageContainer>
        <DotsContainer>
          {data.img.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </DotsContainer>
        <TagWrap>
          {data.tag.map((tag, i) => {
            return <Tag key={i}>{tag}</Tag>;
          })}
        </TagWrap>
        <Content>
          <div className="title">{data.title}</div>
          <div className="company">{data.company}</div>
        </Content>
        <Content>
          <div className="summary">
            <IconCoinFilled />
            {data.pay.type} {data.pay.money}원
          </div>
          <div className="summary">
            <IconCalendarFilled />
            {data.type == "단기"
              ? `총 ${data.date.length}일 / ${data.date.map((n) => n)}`
              : `${data.date.map((n) => n)}`}
          </div>
          <div className="summary">
            <IconClockHour10Filled />
            {data.time} {data.time_discussion && "협의"}
          </div>
        </Content>
        <Content>{data.content}</Content>
        <Content>
          <div className="applicant">
            <IconUserFilled /> 지원자 {data.applicant} 명
          </div>
        </Content>
        <Content>
          {/* <MapContainer location={data.location} /> */}
        </Content>
        <Content>
          <div className="ceoInfo">
            <div className="title">함께 일할 사업자예요</div>
            <div className="ceo-company" onClick={() => setIsOpen(true)}>
              사업자정보 <IconChevronRight />
            </div>
          </div>
          <div className="ceoInfo">
            <div className="img-box">
              <img src={data.ceoInfo.profile} />
            </div>
            {data.ceoInfo.name}
          </div>
        </Content>
      </BodyContainer>
      {userType === "USER" && (
        <ButtonContainer>
          <Button
            color={theme.color.carrot}
            textcolor="white"
            onClick={handleApply}
          >
            지원하기
          </Button>
        </ButtonContainer>
      )}
    </Container>
  ) : (
    <CeoInfo isClose={() => setIsOpen(false)} />
  );
}

export default PostDetail;
