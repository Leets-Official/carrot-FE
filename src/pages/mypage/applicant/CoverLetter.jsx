import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../../styles/MyPage.styles";
import styled from "styled-components";
import { IconLetterX } from "@tabler/icons-react";
import theme from "../../../styles/theme/theme";

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5% 0;
  gap: 10px;
  border-bottom: 1px solid ${theme.color.lightgray};
  .title {
    font-weight: 700;
    font-size: 18px;
  }
  .imgBox {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 5% 0;
  border-bottom: 1px solid ${theme.color.lightgray};

  .title {
    font-weight: 700;
    font-size: 18px;
  }
`;

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
const Tag = styled.div`
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  color: ${({ textcolor }) => textcolor};
`;
const DATA = {
  img: "https://pbs.twimg.com/profile_images/1715217368455213056/lrIZCNs5_400x400.jpg",
  name: "오수빈",
  sex: "여성",
  age: "20대",
  location: "장현동",
  self: "자기소개란어쩌구",
  merit: ["성실해요", "지각안해요"],
  extra: ["보건증 있음", "비흡연"],
  job: [
    {
      title: "뭐타이틀",
      date: { year: "2024", during: "3개월이하" },
      description: "하하핳",
    },
    {
      title: "뭐타이틀",
      date: { year: "2024", during: "6개월이하" },
      description: "하하핳",
    },
  ],
};

function CoverLetter() {
  const { postId } = useParams(); // API이용시 사용
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderContainer>
        <IconLetterX
          size={30}
          onClick={() => {
            navigate(-1);
          }}
        />
        <span>자기소개서</span>
      </HeaderContainer>
      <BodyContainer>
        {/**각 섹션이 존재하는 경우에만 보여줌 */}
        <ProfileSection>
          {DATA.img != null && (
            <div className="imgBox">
              <img src={DATA.img} />
            </div>
          )}
          <div>
            <div className="title">{DATA.name}</div>
            <div>
              {DATA.sex} · {DATA.age} · {DATA.location}
            </div>
          </div>
        </ProfileSection>
        <Section>
          <div className="title">자기소개</div>
          <div>{DATA.self}</div>
        </Section>
        <Section>
          <div className="title">나의 장점</div>
          <TagWrap>
            {DATA.merit.length !== 0 &&
              DATA.merit.map((merit) => {
                return (
                  <Tag color="#E3F2FD" textcolor="#2196F3">
                    {merit}
                  </Tag>
                );
              })}
          </TagWrap>
        </Section>
        <Section>
          <div className="title">추가 정보</div>
          <TagWrap>
            {DATA.extra.length !== 0 &&
              DATA.extra.map((extra) => {
                return (
                  <Tag color={theme.color.lightgray} textcolor="gray">
                    {extra}
                  </Tag>
                );
              })}
          </TagWrap>
        </Section>
        <Section>
          <div className="title">경력</div>
          {DATA.job.length !== 0 &&
            DATA.job.map((job) => {
              return (
                <div>
                  <div>{job.title}</div>
                  <div>
                    {job.date.year} · {job.date.during}
                  </div>
                  <div>{job.description}</div>
                </div>
              );
            })}
        </Section>
      </BodyContainer>
    </Container>
  );
}

export default CoverLetter;
