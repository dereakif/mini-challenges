import Image from "next/image";
import styles from "./Widget.module.scss";

const Widget = () => {
  return (
    <div className="border border-solid border-gray-300 rounded w-64  shadow-slate-900">
      <div className="border-l-2 border-gray-500 flex justify-between items-center ml-2 px-2 my-3">
        <span className="font-bold text-xs text-gray-700">HAFTALAR</span>
        <Image
          className={styles.moreGrey}
          src="/more.svg"
          alt="more-button"
          height={12}
          width={12}
        />
      </div>
      <div
        className={`${styles.widgetHeight} overflow-y-scroll`}
        style={{ height: "338px" }}
      >
        {[...Array(52)].map((_, index) => (
          <div
            key={index}
            className="font-xs font-bold text-xs border-solid border-t-2 p-2 flex items-center"
          >
            <div className="border rounded-full bg-slate-900 text-white w-6 h-6 text-center flex justify-center items-center">
              {index + 1}
            </div>
            <span className="pl-2">{index + 1}. HAFTA YEAR</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;
