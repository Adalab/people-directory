const URL = 'https://randomuser.me/api/?results=50';

const fetchPeople = () => {
  return fetch(URL).then(res => res.json());
};

export default fetchPeople;
