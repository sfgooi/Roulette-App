import { useState } from "react";
import "./App.css";
import Heading from "./components/atoms/Heading";
import CommonButton from "./components/atoms/CommonButton";
import SettingsModal from "./components/molecules/SettingsModal";
import Roulette from "./components/organisms/Roulette";
import { Member } from "./api/dynamoDB/types";
import { useEffect } from "react";
import { getAllMembers } from "./api/dynamoDB/operations/member";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const members = await getAllMembers();
        setMembers(members);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <>
      <Heading text="幹事ルーレット ver 1.0.0" />
      <CommonButton color="info" onClick={() => setIsModalOpen(true)}>設定</CommonButton>
      <Roulette members={members} />
      <SettingsModal
        members={members}
        setMembers={setMembers}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default App;
