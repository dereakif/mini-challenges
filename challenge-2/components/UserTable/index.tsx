import { Dispatch, SetStateAction } from "react";
import { UserInfo, UserInfoBase } from "../../interfaces/user.interfaces";
import styles from "../../styles/UserTable.module.scss";
import { toTitleCase } from "../../utils/toTitleCase";

type Props = {
  users: UserInfo[];
  setInput: Dispatch<SetStateAction<UserInfo>>;
  setEditingId: Dispatch<SetStateAction<string | null>>;
  setErrors: Dispatch<SetStateAction<UserInfoBase>>;
  emptyState: UserInfoBase;
  setUsers: Dispatch<SetStateAction<UserInfo[]>>;
};
const UserTable = ({
  users,
  setInput,
  setEditingId,
  setErrors,
  emptyState,
  setUsers,
}: Props) => {
  const phoneFormat = (input: string) => {
    return input.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
  };
  const handleEdit = (user: UserInfo) => {
    setEditingId(user.id);
    setInput(user);
    setErrors({ ...emptyState });
  };
  const handleDelete = (userId: string) => {
    const newUsers = users.filter((user) => user.id !== userId);
    setInput({ id: "", ...emptyState });
    setEditingId(null);
    setErrors({ ...emptyState });
    setUsers(newUsers);
  };

  if (users.length === 0) return null;
  return (
    <table className={styles.styledTable}>
      <thead>
        <tr>
          <th>Ad</th>
          <th>Soyad</th>
          <th>Telefon</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.phone}>
            <td>{toTitleCase(user.firstName)}</td>
            <td>{toTitleCase(user.lastName)}</td>
            <td>+90 {phoneFormat(user.phone)}</td>
            <td>
              <div className="flex justify-around mobile-column">
                <button onClick={() => handleEdit(user)}>duzenle</button>
                <button onClick={() => handleDelete(user.id)}>sil</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
