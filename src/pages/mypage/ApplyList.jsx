import { useState } from "react";
import { IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";
import styled from "styled-components";
import theme from "../../styles/theme/theme";
import ApplyContent from "../../components/mypage/ApplyContent";
import { useNavigate } from "react-router-dom";
import { MYPAGE_APPLY_TAG } from "../../constants";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TagContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Tag = styled.button`
    outline: none;
    border: 1px solid ${theme.color.lightgray};
    border-radius: 20px;
    padding: 10px 15px;
    background-color: white;
    color: black;
    font-family: "NanumSquareNeo";

    &.active {
        border: 1px solid black;
        background-color: black;
        color: white;
    }
`;

/**DUMMY DATA (삭제 예정) */
const DATA = [
    { id: 12, status: "UNDONE", tag: "APPLY", title: "한국공학대전 무대, 조명, 전시부스 철거", company: "아트플랜" ,img:"https://cafe24.poxo.com/ec01/rainbowtree81/UVTjSep0dwP4/wX7AtHyXO6bEUL260IgzZWiHzbvHSCwWpbQLz54pYhGkVPg29PUXQnuw2Jhlv5+bbb00it4TQ==/_/web/product/big/rainbowtree81_1547.jpg"},
    { id: 11, status: "DONE", tag: "SUCCESS", title: "문화예술회관 하우스 어셔", company: "하우스" ,img:null}
];

function ApplyList() {
    const navigate = useNavigate();
    const [currentTag, setCurrentTag] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [filteredData, setFilteredData] = useState(DATA);

    const handleClickTag = (index) => {
        setCurrentTag(index);
        filterData(index, isChecked);
    };

    const handleRecruitingToggle = () => {
        setIsChecked(!isChecked);
        filterData(currentTag, !isChecked);
    };

    // 데이터 필터링 함수
    const filterData = (tagIndex, recruitingOnly) => {
        const arr = DATA.filter((data) => {
            const matchesTag = tagIndex === 0 || MYPAGE_APPLY_TAG[tagIndex][0] === data.tag; // 전체(All) 혹은 선택된 태그에 맞는 데이터
            const matchesRecruiting = recruitingOnly ? data.status === "UNDONE" : true; // 구인중 필터 체크 여부
            return matchesTag && matchesRecruiting;
        });
        setFilteredData(arr);
    };

    // 지원 취소시 데이터 삭제(예시)
    const handleCancleApply = (id) => {
        const updatedData = filteredData.filter((data) => data.id !== id);
        setFilteredData(updatedData);
    };
    
    return (
        <Container>
            <TagContainer>
                {MYPAGE_APPLY_TAG.map((tag, index) => (
                    <Tag
                        className={index === currentTag ? "active" : ""}
                        key={index}
                        onClick={() => handleClickTag(index)}
                    >
                        {tag[1]}
                    </Tag>
                ))}
            </TagContainer>
            <TagContainer>
                {!isChecked ? (
                    <IconCircle size={28} color={theme.color.lightgray} onClick={handleRecruitingToggle} />
                ) : (
                    <IconCircleCheckFilled size={28} color={theme.color.carrot} onClick={handleRecruitingToggle} />
                )}
                <div style={{ fontSize: "14px" }}>구인중인 공고만 보기</div>
            </TagContainer>
            {filteredData.map((data) => (
                <ApplyContent
                    key={data.id}
                    content={data}
                    onClick={() => navigate("/post", { state: { id: data.id } })}
                    onCancle={handleCancleApply}
                />
            ))}
        </Container>
    );
}

export default ApplyList;
