import { Table, Avatar } from 'antd';

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

const PlayerList = () => {
  const [result] = useQuery({
    query: JUVENTUS
  });

  let size = Object.keys(result.data.juventuses).length;

  let dataArray: TableListItem[] = [];

  for (let i = 0; i < size; i++) {
    dataArray.push({
      key: i,
      name: result.data.juventuses[i].name,
      avatar: result.data.juventuses[i].profpic.url,
      number: result.data.juventuses[i].number,
      age: result.data.juventuses[i].age,
      country: result.data.juventuses[i].country,
      appearences: result.data.juventuses[i].appearences,
      goals: result.data.juventuses[i].goals,
      minutesPlayed: result.data.juventuses[i].minutesPlayed,
      position: result.data.juventuses[i].position,
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
};

export default PlayerList;
