import { useSelector } from "react-redux";

export default function getAccessToken() {
  const { accessToken } = useSelector((state) => state.localToken);
  if (accessToken !== "") {
    return accessToken;
  } else {
    return "";
  }
}
