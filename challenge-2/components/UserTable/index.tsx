import { Dispatch, SetStateAction, useState } from "react";
import { UserInfo, UserInfoBase } from "../../interfaces/user.interfaces";
import styles from "../../styles/UserTable.module.scss";
import { toTitleCase } from "../../utils/toTitleCase";

const options = [
  {
    label: "Sıralama seçiniz",
    value: "default-default",
  },
  { label: "Ad - A'dan Z'ye", value: "firstName-asc" },
  { label: "Ad - Z'den A'ya", value: "firstName-desc" },
  { label: "Soyad - A'dan Z'ye", value: "lastName-asc" },
  { label: "Soyad - Z'den A'ya", value: "lastName-desc" },
  { label: "Telefon - Artan", value: "phone-asc" },
  { label: "Telefon - Azalan", value: "phone-desc" },
];
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
  const [dropdownValue, setDropdownValue] = useState(options[0].value);

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

  const handleSort = (a: UserInfo, b: UserInfo) => {
    const twoWord = dropdownValue.split("-");
    const field = twoWord[0];
    const sort = twoWord[1];

    if (field === "firstName" || field === "lastName") {
      const nameA = a[field as keyof UserInfo];
      const nameB = b[field as keyof UserInfo];
      if (sort === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    } else if (field === "phone") {
      const numberA = parseInt(a.phone);
      const numberB = parseInt(b.phone);
      if (sort === "asc") {
        return numberA - numberB;
      } else if (sort === "desc") {
        return numberB - numberA;
      }
      return 0;
    } else {
      return 0;
    }
  };
  if (users.length === 0) return null;
  return (
    <table className={styles.styledTable}>
      <thead>
        <tr>
          <th colSpan={3}>
            <div>arama</div>
          </th>
          <th colSpan={1}>
            {/* <label>Sırala </label> */}
            <select
              value={dropdownValue}
              onChange={(e) => {
                setDropdownValue(e.target.value);
              }}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </th>
        </tr>
        <tr>
          <th>Ad</th>
          <th>Soyad</th>
          <th>Telefon</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users
          .sort((a, b) => handleSort(a, b))
          .map((user) => (
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
