import { useEffect, useState } from "react";

export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [list, setList] = useState([
    {
      id: 1,
      name: "骑手管理",
      personId: 1,
      organization: "外卖组",
      created: 1604989757139,
    },
  ]);
  // const onParamChange = (type, value) => {
  //   console.log(type, value);
  //   setList([
  //     {
  //       id: 1,
  //       name: "骑手管理a",
  //       personId: 1,
  //       organization: "外卖组",
  //       created: 1604989757139,
  //     },
  //   ]);
  // };
  useEffect(() => {
    console.log('zzz123');
    // setList([
    //   {
    //     id: 1,
    //     name: "骑手管理a",
    //     personId: 1,
    //     organization: "外卖组",
    //     created: 1604989757139,
    //   },
    // ]);
  }, [])
  return (
    <div>
      <Search param={param} setParam={setParam}></Search>
      <Table list={list}></Table>
    </div>
  );
}
const Search = ({param, setParam}) => {
  const inputChange = (e) => {
    console.log('11');
    setParam({...param, name: e.target.value});
  };
  const selectChange = (e) => {
    console.log('22');
    setParam({...param, personId: e.target.value});
  };
  return (
    <div>
      <input onChange={inputChange} />
      <select onChange={selectChange} name="cars" id="cars">
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
