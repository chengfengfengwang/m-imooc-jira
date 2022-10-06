import { useEffect, useState } from "react";
import * as qs from "qs";
import {cleanObject} from '../utils.js'
export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4001/projects?${qs.stringify(cleanObject(param))}`).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])
  return (
    <div>
      <Search param={param} setParam={setParam}></Search>
      <Table list={list}></Table>
    </div>
  );
}
const Search = ({param, setParam}) => {
  const inputChange = (e) => {
    setParam({...param, name: e.target.value});
  };
  const selectChange = (e) => {
    setParam({...param, personId: e.target.value});
  };
  return (
    <div>
      <input onChange={inputChange} />
      <select onChange={selectChange} name="cars" id="cars">
        <option value="">负责人</option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};
const Table = (props) => {
  const { list } = props;
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
