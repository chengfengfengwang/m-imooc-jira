import React, { useEffect, useState } from "react";
import * as qs from "qs";
import {cleanObject, useDebounce} from '../utils'

interface param {
  name: string,
  personId: string
}
interface project {
  id: number,
  name: string
}
interface searchParam {
  param: param,
  setParam: (param: searchParam['param']) => void
}

export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 2000)
  useEffect(() => {
    fetch(`http://localhost:4001/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debounceParam])
  return (
    <div>
      <Search param={param} setParam={setParam}></Search>
      <Table list={list}></Table>
    </div>
  );
}
const Search = ({param, setParam}: searchParam) => {
  const inputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setParam({...param, name: e.currentTarget.value});
  };
  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParam({...param, personId: e.currentTarget.value});
  };
  return (
    <div>
      <input value={param.name} onChange={inputChange} />
      <select onChange={selectChange} name="cars" id="cars">
        <option value={param.personId}>负责人</option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};
const Table = ({list}:{list: project[]}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>负责人</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
