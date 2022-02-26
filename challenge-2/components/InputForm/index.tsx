import { Dispatch, FormEvent, SetStateAction } from "react";
import { UserInfo } from "../../interfaces/user.interfaces";
import styles from "../../styles/InputForm.module.scss";

type Props = {
  input: UserInfo;
  setInput: Dispatch<SetStateAction<UserInfo>>;
  setUsers: Dispatch<SetStateAction<UserInfo[]>>;
};

function InputForm({ input, setInput, setUsers }: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    setUsers((s) => [...s, input]);
    setInput({ firstName: "", lastName: "", phone: "" });
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
      </div>
      <div className="form-group">
        <label>Soyad:</label>
        <input
          type="text"
          name="lastName"
          value={input.lastName}
          onChange={(e) => setInput({ ...input, lastName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Telefon:</label>
        <input
          type="text"
          name="phone"
          value={input.phone}
          onChange={(e) => setInput({ ...input, phone: e.target.value })}
        />
      </div>
      <button className={styles.greenBtn} type="submit">
        Ekle
      </button>
    </form>
  );
}

export default InputForm;
