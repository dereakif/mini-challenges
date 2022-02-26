import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { UserInfo, UserInfoBase } from "../../interfaces/user.interfaces";
import styles from "../../styles/InputForm.module.scss";
import { v4 as uuidv4 } from "uuid";

type Props = {
  input: UserInfo;
  setInput: Dispatch<SetStateAction<UserInfo>>;
  users: UserInfo[];
  setUsers: Dispatch<SetStateAction<UserInfo[]>>;
  errors: UserInfoBase;
  setErrors: Dispatch<SetStateAction<UserInfoBase>>;
  editingId: string | null;
  setEditingId: Dispatch<SetStateAction<string | null>>;
};

function InputForm({
  input,
  setInput,
  setUsers,
  users,
  errors,
  setErrors,
  editingId,
  setEditingId,
}: Props) {
  const validatePhoneNumber = (phoneNumber: string) => {
    let validity = true;
    let error = "";

    if (phoneNumber.length !== 10) {
      validity = false;
      error = "Telefon numarası 10 haneli olmalıdır.";
    }
    const userToCheck = users.find((user) => user.phone === phoneNumber);
    if (userToCheck?.id !== editingId && userToCheck?.phone === phoneNumber) {
      validity = false;
      error = "Bu telefon numarası daha önce kullanılmış.";
    }

    return { validity, error };
  };

  const validateName = (name: string) => {
    let validity = true;
    let error = "";

    if (name.trim() === "") {
      validity = false;
      error = "Bu alan boş bırakılamaz.";
      return { validity, error };
    }
    if (!name.match(/^[a-zA-ZığüşöçİĞÜŞÖÇ ]+$/)) {
      validity = false;
      error = "Bu alan sadece harflerden oluşmalıdır.";
      return { validity, error };
    }
    return { validity, error };
  };

  const validateForm = () => {
    let formIsValid = true;
    Object.keys(input).forEach((key) => {
      if (key === "id") return;
      if (key === "phone") {
        const { validity, error } = validatePhoneNumber(input[key]);
        if (!validity) {
          formIsValid = false;
          setErrors((prevState) => ({
            ...prevState,
            phone: error,
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            phone: "",
          }));
        }
      } else {
        const { validity, error } = validateName(input[key as keyof UserInfo]);
        if (!validity) {
          formIsValid = false;
          setErrors((prevState) => ({ ...prevState, [key]: error }));
        } else {
          setErrors((prevState) => ({ ...prevState, [key]: "" }));
        }
      }
    });

    return formIsValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const userToAdd = { ...input, id: uuidv4() };
      if (editingId) {
        const userIndex = users.findIndex((user) => user.id === editingId);
        if (userIndex !== -1) {
          const newUsers = [...users];
          newUsers[userIndex] = userToAdd;
          setUsers(newUsers);
        }
      } else {
        setUsers((s) => [...s, userToAdd]);
      }
      setEditingId(null);
      setInput({ id: "", firstName: "", lastName: "", phone: "" });
    }
  };

  const checkInput = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setInput({ ...input, phone: onlyDigits });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Ad:</label>
        <input
          type="text"
          name="firstName"
          value={input.firstName}
          onChange={(e) => setInput({ ...input, firstName: e.target.value })}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
      <div className="form-group">
        <label>Soyad:</label>
        <input
          type="text"
          name="lastName"
          value={input.lastName}
          onChange={(e) => setInput({ ...input, lastName: e.target.value })}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div className="form-group">
        <label>Telefon:</label>
        <input
          type="text"
          name="phone"
          value={input.phone}
          maxLength={10}
          onChange={checkInput}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>
      <button className={styles.greenBtn} type="submit">
        {editingId ? "Kaydet" : "Ekle"}
      </button>
    </form>
  );
}

export default InputForm;
