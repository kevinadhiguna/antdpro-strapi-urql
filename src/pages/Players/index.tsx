import { Table, Result, Avatar } from 'antd';

import { JUVENTUS } from '@/graphql/query';
import { useQuery } from 'urql';

export type TableListItem = {
  key: number;
  name: string;
  avatar: string;
  number: number;
  age: number;
  country: string;
  appearences: number;
  goals: number;
  minutesPlayed: number;
  position: string;
};

const Players = () => {
  const [ juventusResult ] = useQuery({
    query: JUVENTUS
  });

  const { data } = juventusResult;
  
  if (data !== undefined) {

    console.log("Juventus query result = ", juventusResult);

    console.log("JuventusResult.data = ", data);

    let size = Object.keys(data.juventuses).length;

    let dataArray: TableListItem[] = [];

    for (let i = 0; i < size; i++) {
      dataArray.push({
        key: i,
        name: data.juventuses[i].name,
        avatar: data.juventuses[i].profpic.url,
        number: data.juventuses[i].number,
        age: data.juventuses[i].age,
        country: data.juventuses[i].country,
        appearences: data.juventuses[i].appearences,
        goals: data.juventuses[i].goals,
        minutesPlayed: data.juventuses[i].minutesPlayed,
        position: data.juventuses[i].position,
      });
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        render: (record: any) => (
          // Log 'record' to console to see what is inside for debugging purpose
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} // <- Adjust avatars' responsiveness
            shape="circle"
            src={record}
            alt="juventus player"
          />
        ),
      },
      {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Appearence(s)',
        dataIndex: 'appearences',
        key: 'appearences',
      },
      {
        title: 'Goal(s)',
        dataIndex: 'goals',
        key: 'goals',
      },
      {
        title: 'Minutes Played',
        dataIndex: 'minutesPlayed',
        key: 'minutesPlayed',
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
      },
    ];

    return <Table dataSource={dataArray} columns={columns} />;
  } else {
    console.log("Data is undefined !", data);

    return (
      <Result
        status="error"
        title="Something went wrong..."
        subTitle="oops.. Data is undefined..."
      />
    );
  }
};

export default Players;
