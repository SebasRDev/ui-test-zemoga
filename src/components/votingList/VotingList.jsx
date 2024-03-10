import { useEffect } from "react";
import { Card } from "../../shared/Card";
import "../../styles/components/votingList/VotingList.css";
import { Select } from "../../shared/Select";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const data = [
  {
    name: "Kanye West",
    description:
      "Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.",
    category: "entertainment",
    picture: "kanye.webp",
    lastUpdated: "2024-02-20T23:08:57.892Z",
    votes: {
      positive: 23,
      negative: 36,
    },
  },
  {
    name: "Mark Zuckerberg",
    description:
      "Born in White Plains, New York, Zuckerberg attended Harvard University, where he launched the Facebook social networking service from his dormitory room on February 4, 2004.",
    category: "business",
    picture: "mark.webp",
    lastUpdated: "2024-02-02T23:10:19.134Z",
    votes: {
      positive: 418,
      negative: 324,
    },
  },
  {
    name: "Cristina Fernández de Kirchner",
    description:
      "Her first term of office started with a conflict with the agricultural sector, and her proposed taxation system was rejected.",
    category: "politics",
    picture: "cristina.webp",
    lastUpdated: "2020-12-10T23:41:07.120Z",
    votes: {
      positive: 45,
      negative: 97,
    },
  },
  {
    name: "Malala Yousafzai",
    description:
      "The daughter of educational activist Ziauddin, Yousafzai was born to a Pashtun family in Mingora, Khyber Pakhtunkhwa, Pakistan. Her family came to run a chain of schools in the region.",
    category: "politics",
    picture: "malala.webp",
    lastUpdated: "2020-12-10T23:41:07.120Z",
    votes: {
      positive: 18,
      negative: 3,
    },
  },
  {
    name: "Elon Musk",
    description:
      "In 2002, Musk founded SpaceX, an aerospace manufacturer and space transport services company, of which he is CEO, CTO, and lead designer.",
    category: "business",
    picture: "elon.webp",
    lastUpdated: "2020-12-20T23:43:38.041Z",
    votes: {
      positive: 1237,
      negative: 894,
    },
  },
  {
    name: "Greta Thumberg",
    description:
      "Thunberg's activism started after convincing her parents to adopt several lifestyle choices to reduce their own carbon footprint.",
    category: "environment",
    picture: "greta.webp",
    lastUpdated: "2021-02-26T23:44:50.326Z",
    votes: {
      positive: 118,
      negative: 45,
    },
  },
];

export const VotingList = () => {
  const [storeLayout, setStoreLayout] = useLocalStorage('layout', 'list');
  const [storeData, setStoreData] = useLocalStorage('data', data);

  useEffect(() => {
    document.querySelector('.voting-list__wrapper').classList.add(`voting-list__wrapper--${storeLayout}`);

    return () => {
      document.querySelector('.voting-list__wrapper').classList.remove(`voting-list__wrapper--${storeLayout}`);
    }

  }, [storeLayout])  
  
  const layoutOptions = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
  ];

  const handleChangeLayout = (value) => {
    if (value !== storeLayout) {
      setStoreLayout(value);
    }
  }

  const handleUpdateItem = (item) => {
    const newData = storeData.map((celebrity) => {
      if (celebrity.name === item.name) {
        return item;
      }
      return celebrity;
    });
    setStoreData(newData);
    console.log(item);
  }

  return (
    <div className="voting-list">
      <div className="voting-list__header">
        <h3 className="voting-list__title">Previous Rulings</h3>
        <div className="voting-list__select">
          <Select selected={storeLayout} options={layoutOptions} onChange={handleChangeLayout}/>
        </div>
      </div>
      <div className={`voting-list__wrapper `}>
        {storeData.map((item) => {
          return <Card key={item.name} celebrity={item} handleUpdate={handleUpdateItem}/>;
        })}
      </div>
    </div>
  );
};
