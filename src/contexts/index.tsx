import { createContext, useState } from "react";

const AnotherContext = createContext({
    lang: "ko", 
    changeLang: (word: string) => {},
    result: false,
    changeResult: () => {},
    version: "global",
    changeVersion: (value: string) => {},
    inven: [] as number[],
    addInven: (id:number) => {},
    removeInven: (id:number) => {}
})

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AnotherProvider = ({ children }: Props): JSX.Element => {


    const [lang, setLang] = useState(window.localStorage.getItem("a_lan") || "ko");
    const [result, setResult] = useState(window.localStorage.getItem("a_res")==="true")
    const [version, setVersion] = useState(window.localStorage.getItem("a_ver") || "global")
    const [inven, setInven] = useState(window.localStorage.getItem("a_inv")?.split(",").map(Number) || [])
  
    const changeLang = (word: string): void => {
      setLang(word);
      window.localStorage.setItem("a_lan", word)
    };
    const changeResult = (): void => {
      window.localStorage.setItem("a_res", String(!result))
      setResult(!result);
    };
    const changeVersion = (value: string): void => {
      window.localStorage.setItem("a_ver", value)
      setVersion(value);
    };
    const addInven = (id: number): void => {
      const newData = [...inven, id]
      window.localStorage.setItem("a_inv", newData.join(","))
      setInven(newData);
    };
    const removeInven = (id: number): void => {
      const newData = inven.filter(a => a !== id)
      window.localStorage.setItem("a_inv", newData.join(","))
      setInven(newData);
    };
  
    return (
      <AnotherContext.Provider
        value={{
          lang,
          changeLang,
          result,
          changeResult,
          version,
          changeVersion,
          inven,
          addInven,
          removeInven,
        }}>
        {children}
      </AnotherContext.Provider>
    );
};
  
export { AnotherContext, AnotherProvider }