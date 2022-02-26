import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { UserInfo } from "../../interfaces/user.interfaces";
import styles from "../../styles/InputForm.module.scss";

type Props = {
  input: UserInfo;
  setInput: Dispatch<SetStateAction<UserInfo>>;
  setUsers: Dispatch<SetStateAction<UserInfo[]>>;
  errors: UserInfo;
  setErrors: Dispatch<SetStateAction<UserInfo>>;
};

function InputForm({ input, setInput, setUsers, errors, setErrors }: Props) {
  const validatePhoneNumber = (phoneNumber: string) => {
    let validity = true;
    let error = "";
    if (phoneNumber.length !== 10) {
      validity = false;
      error = "Telefon numarası 10 haneli olmalıdır.";
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
    if (!name.match(/^[a-zA-Z]+$/)) {
      validity = false;
      error = "Bu alan sadece harflerden oluşmalıdır.";
      return { validity, error };
    }
    return { validity, error };
  };

  const validateForm = () => {
    let formIsValid = true;
    Object.keys(input).forEach((key) => {
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
      setUsers((s) => [...s, input]);
      setInput({ firstName: "", lastName: "", phone: "" });
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
        Ekle
      </button>
    </form>
  );
}

export default InputForm;
