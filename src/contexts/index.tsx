import { createContext, useState } from "react";

const AnotherContext = createContext({
    data: [] as CharacterInfo[],
    lang: "ko", 
    changeLang: (word: string) => {},
    result: false,
    changeResult: () => {},
    version: "global",
    changeVersion: (value: string) => {},
    inven: [] as number[],
    setInven: (data:number[]) => {},
    addInven: (id:number[]) => {},
    removeInven: (id:number) => {}
})

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AnotherProvider = ({ children }: Props): JSX.Element => {

    const data: Array<CharacterInfo> = require("../data/character.json") 

    const [lang, setLang] = useState(window.localStorage.getItem("a_lan") || "ko");
    const [result, setResult] = useState(window.localStorage.getItem("a_res")==="true")
    const [version, setVersion] = useState(window.localStorage.getItem("a_ver") || "global")
    const [inven, setInven] = useState(() => {
      const convert_data = require("../data/old_to_new.json")

      const local = window.localStorage.getItem("a_inv")?.split(",").map(Number) || [] as number[]
      const new_local = window.localStorage.getItem("a_inv_new") ?
      window.localStorage.getItem("a_inv_new")?.split(",").map(Number) || [] as number[]
      : local.map(a => convert_data[String(a)] ?? -1 )

      const add = data.filter(a => new_local.includes(a.id))
      .map(a => a.from || [] as number[])
      const final = new_local.concat(...add)
      return final
    })
  
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

    const addInven = (id: number[]): void => {
      const newData = [...inven, ...id]
      window.localStorage.setItem("a_inv_new", newData.join(","))
      setInven(newData);
    };
    const removeInven = (id: number): void => {
      const newData = inven.filter(a => a !== id)
      window.localStorage.setItem("a_inv_new", newData.join(","))
      setInven(newData);
    };
  
    return (
      <AnotherContext.Provider
        value={{
          data,
          lang,
          changeLang,
          result,
          changeResult,
          version,
          changeVersion,
          inven,
          setInven,
          addInven,
          removeInven,
        }}>
        {children}
      </AnotherContext.Provider>
    );
};
  
export { AnotherContext, AnotherProvider }