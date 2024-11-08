import styled from "styled-components";

export const PageContainer = styled.div`
  width: 440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 70px;
`;

export const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 440px;
  background-color: #fff;
  border-top: 1px solid #cccccc;
  padding: 10px;
  display: flex;
  justify-content: center;
`;