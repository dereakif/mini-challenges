import { Dispatch, SetStateAction } from "react";
import { UserInfo } from "../../interfaces/user.interfaces";

type Props = {
  users: UserInfo[];
};
const UserTable = ({ users }: Props) => {
  return <div>{JSON.stringify(users)}</div>;
};

export default UserTable;
