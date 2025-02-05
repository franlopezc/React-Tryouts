import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';

interface SupabaseTableTest {
  id: number;
  name: string
  age: number
  state: string
}


function SupabaseExample() {
  const [data, setData] = useState<SupabaseTableTest[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("Test") // Replace with your table name
        .select();

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
      setLoading(false);
      console.log(data + " " + error)
    }

    fetchData();
  }, []);


  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Data from Supabase</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default SupabaseExample;
