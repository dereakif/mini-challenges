import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { getWeekOfYear } from "../../modules/date";
import styles from "./Widget.module.scss";

const Widget = () => {
  const allWeeks = Array.from({ length: 52 }, (_, i) => i + 1);

  const date = useMemo(() => new Date(), []);
  const week = useMemo(() => getWeekOfYear(date), [date]);
  const year = useMemo(() => date.getFullYear(), [date]);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    setTimeout(executeScroll, 0);
  }, [scrollRef]);

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
        className={`${styles.widgetHeight} overflow-y-scroll border-t-2 border-gray-200 `}
        style={{ height: "338px" }}
      >
        {allWeeks.map((weekNumber) => (
          <div
            key={weekNumber}
            className="font-xs font-bold text-xs border-solid border-b-2 p-2 flex items-center"
            ref={week === weekNumber ? scrollRef : null}
          >
            <div
              className={`rounded-full bg-slate-900 text-white w-6 h-6 text-center flex justify-center items-center ${
                week === weekNumber
                  ? "bg-green-800"
                  : weekNumber > week
                  ? "bg-gray-500"
                  : ""
              }`}
            >
              {weekNumber}
            </div>
            <span className="pl-2">
              {weekNumber}. HAFTA {year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;
