import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCoinFilled,
  IconCalendarFilled,
  IconClockHour10Filled,
  IconUserCircle,
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
import { postDetailAPI } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import getAccessToken from "../../utils/getAccessToken";
import { DAY_MAPPING } from "../../constants";

function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { userType, userId } = useSelector((state) => state.userInfo);

  const [postData, setPostData] = useState(null); // 상세조회 데이터
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

  useEffect(() => {
    postDetailAPI(accessToken, dispatch, id).then((res) => {
      if (res.isSuccess) {
        setPostData(res.data);
      } else {
        alert(res.message);
      }
    });
  }, []);

  return !isOpen ? (
    <Container>
      <HeaderContainer>
        <IconChevronLeft size={30} onClick={() => navigate("/home")} />
        {/**수정/삭제 아이콘은 작성자와 로그인 유저 id가 일치할 경우만 보여줌 */}
        {userId === postData?.userId && (
          <IconDotsVertical
            size={30}
            onClick={() => setIsMode((pre) => !pre)}
          />
        )}
        {isMode && (
          <ButtonsModal
            isMode={isMode}
            postId={postData?.postId}
            setIsMode={setIsMode}
          />
        )}
      </HeaderContainer>
      <BodyContainer>
        {postData?.postData.imageUrlList.length !== 0 && (
          <>
            <ImageContainer
              ref={imageContainerRef}
              onScroll={handleScroll}
              style={{ overflowX: "scroll", scrollSnapType: "x mandatory" }}
            >
              {postData?.postData.imageUrlList.length !== 0 && (
                <ImageList
                  style={{ display: "flex", scrollSnapAlign: "start" }}
                >
                  {postData?.postData.imageUrlList.map((image, index) => (
                    <Image key={index} src={image} alt="이미지" />
                  ))}
                </ImageList>
              )}
            </ImageContainer>
            <DotsContainer>
              {postData?.postData.imageUrlList.map((_, index) => (
                <Dot
                  key={index}
                  active={index === currentIndex}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </DotsContainer>
          </>
        )}

        <TagWrap>
          {Array.isArray(postData?.postData.workType) ? (
            postData?.postData.workType.map((tag, i) => {
              return <Tag key={i}>{tag}</Tag>;
            })
          ) : (
            <Tag>{postData?.postData.workType}</Tag>
          )}
        </TagWrap>
        <Content>
          <div className="title">{postData?.postData.title}</div>
          <div className="company">{postData?.storeName}</div>
        </Content>
        <Content>
          <div className="summary">
            <IconCoinFilled />
            {postData?.postData.payType} {postData?.postData.pay}원
          </div>
          <div className="summary">
            <IconCalendarFilled />
            {postData?.postData.workDays.map((day, index) => (
              <span key={index}>{DAY_MAPPING[day] || day}</span>
            ))}
          </div>
          <div className="summary">
            <IconClockHour10Filled />
            {`${String(postData?.postData.workStartHour).padStart(
              2,
              "0"
            )}:${String(postData?.postData.workStartMinute).padStart(
              2,
              "0"
            )}~${String(postData?.postData.workEndHour).padStart(
              2,
              "0"
            )}:${String(postData?.postData.workEndTimeMinute).padStart(
              2,
              "0"
            )}`}
            {postData?.postData.isNegotiable && " 협의"}
          </div>
        </Content>
        <Content>{postData?.postData.content}</Content>
        <Content>
          <MapContainer
            location={`${postData?.postData.doName} ${postData?.postData.siName} ${postData?.postData.detailName}`}
          />
        </Content>
        <Content>
          <div className="ceoInfo">
            <div className="title">함께 일할 사업자예요</div>
            <div className="ceo-company" onClick={() => setIsOpen(true)}>
              사업자정보 <IconChevronRight />
            </div>
          </div>
          <div className="ceoInfo">
            <IconUserCircle size={40} color="grey" />
            {postData?.writerNickname}
          </div>
        </Content>
      </BodyContainer>
      {userType === "EMPLOYEE" && (
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
    <CeoInfo ceoId={postData?.userId} isClose={() => setIsOpen(false)} />
  );
}

export default PostDetail;
